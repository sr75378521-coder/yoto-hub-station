/**
 * Yoto token persistence + refresh, keyed by authenticated app user id.
 * Uses the Supabase service-role client because the OAuth callback route
 * is not scoped through RLS, and refresh must succeed regardless of RLS.
 */
import { YOTO_AUTH_BASE } from "./config";
import { encryptToken, decryptToken } from "@/lib/crypto.server";

export interface YotoTokenSet {
  access_token: string;
  refresh_token: string;
  scope?: string;
  token_type?: string;
  expires_in: number; // seconds
  yoto_user_id?: string | null;
}

export interface YotoTokenExchangeParams {
  code: string;
  codeVerifier: string;
  redirectUri: string;
}

async function tokenRequest(body: URLSearchParams): Promise<YotoTokenSet> {
  const clientId = process.env.YOTO_CLIENT_ID;
  const clientSecret = process.env.YOTO_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("YOTO_CLIENT_ID/SECRET not configured");
  body.set("client_id", clientId);
  body.set("client_secret", clientSecret);

  const res = await fetch(`${YOTO_AUTH_BASE}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Yoto token endpoint ${res.status}: ${text}`);
  const json = JSON.parse(text) as {
    access_token: string;
    refresh_token: string;
    scope?: string;
    token_type?: string;
    expires_in: number;
    id_token?: string;
  };

  // Best-effort extract yoto user id from id_token (JWT) if present
  let yoto_user_id: string | null = null;
  if (json.id_token) {
    try {
      const payload = json.id_token.split(".")[1];
      const decoded = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
      yoto_user_id = decoded.sub ?? null;
    } catch {
      yoto_user_id = null;
    }
  }
  return { ...json, yoto_user_id };
}

export function exchangeCodeForTokens(params: YotoTokenExchangeParams) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: params.code,
    code_verifier: params.codeVerifier,
    redirect_uri: params.redirectUri,
  });
  return tokenRequest(body);
}

export function refreshTokens(refreshToken: string) {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });
  return tokenRequest(body);
}

export async function upsertConnection(userId: string, tokens: YotoTokenSet) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString();
  const { error } = await supabaseAdmin.from("yoto_connections").upsert(
    {
      user_id: userId,
      yoto_user_id: tokens.yoto_user_id ?? null,
      access_token_ciphertext: encryptToken(tokens.access_token),
      refresh_token_ciphertext: encryptToken(tokens.refresh_token),
      scope: tokens.scope ?? null,
      token_type: tokens.token_type ?? "Bearer",
      expires_at: expiresAt,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (error) throw error;
}

/** Get a valid access token, refreshing if expired/near expiry. Returns null if not connected. */
export async function getValidAccessToken(userId: string): Promise<string | null> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("yoto_connections")
    .select("access_token_ciphertext, refresh_token_ciphertext, expires_at")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;

  const expiresAt = new Date(data.expires_at).getTime();
  const skewMs = 60_000; // refresh 60s before expiry
  if (Date.now() < expiresAt - skewMs) {
    return decryptToken(data.access_token_ciphertext);
  }

  // Refresh
  const refresh = decryptToken(data.refresh_token_ciphertext);
  const next = await refreshTokens(refresh);
  await upsertConnection(userId, { ...next, refresh_token: next.refresh_token ?? refresh });
  return next.access_token;
}

export async function deleteConnection(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("yoto_connections").delete().eq("user_id", userId);
  if (error) throw error;
}
