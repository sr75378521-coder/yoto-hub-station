import { createFileRoute, redirect } from "@tanstack/react-router";
import { YOTO_CALLBACK_PATH } from "@/lib/yoto/config";
import { exchangeCodeForTokens, upsertConnection } from "@/lib/yoto/tokens.server";

/**
 * Yoto OAuth redirect target. Exchanges the code, stores encrypted tokens,
 * then bounces the user back into the app.
 */
export const Route = createFileRoute("/api/yoto/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const code = url.searchParams.get("code");
        const state = url.searchParams.get("state");
        const error = url.searchParams.get("error");
        const errorDescription = url.searchParams.get("error_description") ?? "No description";

        if (error) {
          console.error("[yoto/callback] Authorization server returned error:", {
            error,
            error_description: errorDescription,
          });
          const detail = `${error}: ${errorDescription}`;
          throw redirect({ href: `/dashboard?yoto_error=${encodeURIComponent(detail)}` });
        }

        if (!code || !state) {
          console.error("[yoto/callback] Missing code or state param");
          return new Response("Missing code/state", { status: 400 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: row, error: sErr } = await supabaseAdmin
          .from("yoto_oauth_states")
          .select("user_id, code_verifier, redirect_to, expires_at")
          .eq("state", state)
          .maybeSingle();

        if (sErr || !row) {
          console.error("[yoto/callback] Invalid or expired state:", sErr?.message);
          return new Response("Invalid or expired state", { status: 400 });
        }
        if (new Date(row.expires_at).getTime() < Date.now()) {
          console.error("[yoto/callback] State has expired");
          return new Response("Expired state", { status: 400 });
        }

        // One-time use — delete before exchange so a replay fails
        await supabaseAdmin.from("yoto_oauth_states").delete().eq("state", state);

        const redirectUri = `${url.origin}${YOTO_CALLBACK_PATH}`;
        console.log("[yoto/callback] Exchanging code for tokens", {
          user_id: row.user_id,
          redirect_uri: redirectUri,
        });

        try {
          const tokens = await exchangeCodeForTokens({
            code,
            codeVerifier: row.code_verifier,
            redirectUri,
          });
          await upsertConnection(row.user_id, tokens);
          console.log("[yoto/callback] Tokens stored successfully for user", row.user_id);
        } catch (e) {
          const msg = e instanceof Error ? e.message : "Unknown error";
          console.error("[yoto/callback] Token exchange failed:", msg);
          throw redirect({ href: `/dashboard?yoto_error=${encodeURIComponent(msg)}` });
        }

        throw redirect({ href: (row.redirect_to ?? "/dashboard") + "?yoto=connected" });
      },
    },
  },
});
