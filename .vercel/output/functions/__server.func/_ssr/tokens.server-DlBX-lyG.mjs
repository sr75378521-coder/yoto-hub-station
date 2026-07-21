import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/tokens.server-DlBX-lyG.js
/**
* Yoto OAuth + API configuration.
* Endpoints follow Yoto's public Auth0 tenant.
*/
var YOTO_AUTH_BASE = "https://login.yotoplay.com";
var YOTO_API_BASE = "https://api.yotoplay.com";
var YOTO_AUDIENCE = "https://api.yotoplay.com";
var YOTO_SCOPES = "openid profile offline_access family:devices:view";
var YOTO_CALLBACK_PATH = "/api/yoto/callback";
/**
* AES-256-GCM helpers for encrypting Yoto tokens at rest.
* Server-only. The key is derived from YOTO_TOKEN_ENC_KEY (hex or base64).
*/
function key() {
	const raw = process.env.YOTO_TOKEN_ENC_KEY;
	if (!raw) throw new Error("YOTO_TOKEN_ENC_KEY is not set");
	return createHash("sha256").update(raw).digest();
}
function encryptToken(plaintext) {
	const iv = randomBytes(12);
	const cipher = createCipheriv("aes-256-gcm", key(), iv);
	const ct = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
	const tag = cipher.getAuthTag();
	return Buffer.concat([
		iv,
		tag,
		ct
	]).toString("base64");
}
function decryptToken(stored) {
	const buf = Buffer.from(stored, "base64");
	const iv = buf.subarray(0, 12);
	const tag = buf.subarray(12, 28);
	const ct = buf.subarray(28);
	const decipher = createDecipheriv("aes-256-gcm", key(), iv);
	decipher.setAuthTag(tag);
	return Buffer.concat([decipher.update(ct), decipher.final()]).toString("utf8");
}
/**
* Yoto token persistence + refresh, keyed by authenticated app user id.
* Uses the Supabase service-role client because the OAuth callback route
* is not scoped through RLS, and refresh must succeed regardless of RLS.
*/
async function tokenRequest(body) {
	const clientId = process.env.YOTO_CLIENT_ID;
	const clientSecret = process.env.YOTO_CLIENT_SECRET;
	if (!clientId || !clientSecret) throw new Error("YOTO_CLIENT_ID/SECRET not configured");
	body.set("client_id", clientId);
	body.set("client_secret", clientSecret);
	const res = await fetch(`${YOTO_AUTH_BASE}/oauth/token`, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body
	});
	const text = await res.text();
	if (!res.ok) throw new Error(`Yoto token endpoint ${res.status}: ${text}`);
	const json = JSON.parse(text);
	let yoto_user_id = null;
	if (json.id_token) try {
		const payload = json.id_token.split(".")[1];
		yoto_user_id = JSON.parse(Buffer.from(payload, "base64").toString("utf8")).sub ?? null;
	} catch {
		yoto_user_id = null;
	}
	return {
		...json,
		yoto_user_id
	};
}
function exchangeCodeForTokens(params) {
	return tokenRequest(new URLSearchParams({
		grant_type: "authorization_code",
		code: params.code,
		code_verifier: params.codeVerifier,
		redirect_uri: params.redirectUri
	}));
}
function refreshTokens(refreshToken) {
	return tokenRequest(new URLSearchParams({
		grant_type: "refresh_token",
		refresh_token: refreshToken
	}));
}
async function upsertConnection(userId, tokens) {
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const expiresAt = new Date(Date.now() + tokens.expires_in * 1e3).toISOString();
	const { error } = await supabaseAdmin.from("yoto_connections").upsert({
		user_id: userId,
		yoto_user_id: tokens.yoto_user_id ?? null,
		access_token_ciphertext: encryptToken(tokens.access_token),
		refresh_token_ciphertext: encryptToken(tokens.refresh_token),
		scope: tokens.scope ?? null,
		token_type: tokens.token_type ?? "Bearer",
		expires_at: expiresAt,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}, { onConflict: "user_id" });
	if (error) throw error;
}
/** Get a valid access token, refreshing if expired/near expiry. Returns null if not connected. */
async function getValidAccessToken(userId) {
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const { data, error } = await supabaseAdmin.from("yoto_connections").select("access_token_ciphertext, refresh_token_ciphertext, expires_at").eq("user_id", userId).maybeSingle();
	if (error) throw error;
	if (!data) return null;
	const expiresAt = new Date(data.expires_at).getTime();
	if (Date.now() < expiresAt - 6e4) return decryptToken(data.access_token_ciphertext);
	const refresh = decryptToken(data.refresh_token_ciphertext);
	const next = await refreshTokens(refresh);
	await upsertConnection(userId, {
		...next,
		refresh_token: next.refresh_token ?? refresh
	});
	return next.access_token;
}
async function deleteConnection(userId) {
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const { error } = await supabaseAdmin.from("yoto_connections").delete().eq("user_id", userId);
	if (error) throw error;
}
//#endregion
export { YOTO_SCOPES as a, getValidAccessToken as c, YOTO_CALLBACK_PATH as i, upsertConnection as l, YOTO_AUDIENCE as n, deleteConnection as o, YOTO_AUTH_BASE as r, exchangeCodeForTokens as s, YOTO_API_BASE as t };
