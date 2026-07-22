import { createFileRoute, redirect } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { YOTO_AUTH_BASE, YOTO_AUDIENCE, YOTO_SCOPES, YOTO_CALLBACK_PATH } from "@/lib/yoto/config";
import {
  generateCodeVerifier,
  codeChallengeFromVerifier,
  generateState,
} from "@/lib/yoto/pkce.server";

/**
 * Start the Yoto OAuth flow.
 * The client passes its Supabase access_token as a query param because this is
 * a top-level browser navigation (not an XHR that could carry an Authorization header).
 */
export const Route = createFileRoute("/api/yoto/authorize")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const accessToken = url.searchParams.get("access_token") ?? "";
        if (!accessToken) return new Response("Missing access_token", { status: 401 });

        // Identify the user with their Supabase access token
        const supabaseUrl = process.env.SUPABASE_URL;
        const publishable = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
        if (!supabaseUrl || !publishable) {
          console.error("[yoto/authorize] Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY");
          return new Response("Server configuration error: missing Supabase env vars", {
            status: 500,
          });
        }

        const sb = createClient(supabaseUrl, publishable, {
          auth: { persistSession: false },
          global: { headers: { Authorization: `Bearer ${accessToken}` } },
        });
        const { data: userData, error: userErr } = await sb.auth.getUser(accessToken);
        if (userErr || !userData.user) {
          console.error("[yoto/authorize] Supabase auth failed:", userErr?.message);
          return new Response("Unauthorized", { status: 401 });
        }
        const userId = userData.user.id;

        const clientId = process.env.YOTO_CLIENT_ID;
        if (!clientId) {
          console.error("[yoto/authorize] YOTO_CLIENT_ID is not set in environment");
          return new Response("Server missing YOTO_CLIENT_ID", { status: 500 });
        }

        const verifier = generateCodeVerifier();
        const challenge = codeChallengeFromVerifier(verifier);
        const state = generateState();

        // Persist PKCE state via service role (route is not auth-middleware'd)
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error: insertErr } = await supabaseAdmin.from("yoto_oauth_states").insert({
          state,
          user_id: userId,
          code_verifier: verifier,
          redirect_to: "/dashboard",
          expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 min
        });
        if (insertErr) {
          console.error("[yoto/authorize] Failed to store PKCE state:", insertErr.message);
          return new Response(`Failed to store state: ${insertErr.message}`, { status: 500 });
        }

        const redirectUri = `${url.origin}${YOTO_CALLBACK_PATH}`;

        // Support custom scopes and audience via query parameters to resolve potential access_denied
        const scopes = url.searchParams.get("scopes") || YOTO_SCOPES;
        const reqAudience = url.searchParams.get("audience");
        const audience =
          reqAudience === "skip" ? null : reqAudience !== null ? reqAudience : YOTO_AUDIENCE;

        const authorize = new URL(`${YOTO_AUTH_BASE}/authorize`);
        authorize.searchParams.set("response_type", "code");
        authorize.searchParams.set("client_id", clientId);
        authorize.searchParams.set("redirect_uri", redirectUri);
        authorize.searchParams.set("scope", scopes);
        if (audience) {
          authorize.searchParams.set("audience", audience);
        }
        authorize.searchParams.set("state", state);
        authorize.searchParams.set("code_challenge", challenge);
        authorize.searchParams.set("code_challenge_method", "S256");

        // Log the full authorization URL params (no secrets exposed)
        console.log("[yoto/authorize] Redirecting to Yoto authorization endpoint", {
          client_id: clientId,
          redirect_uri: redirectUri,
          scope: scopes,
          audience: audience ?? "(omitted)",
          response_type: "code",
          code_challenge_method: "S256",
          state_length: state.length,
        });

        throw redirect({ href: authorize.toString() });
      },
    },
  },
});
