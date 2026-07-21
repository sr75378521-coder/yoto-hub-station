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
        if (error) throw redirect({ href: `/dashboard?yoto_error=${encodeURIComponent(error)}` });
        if (!code || !state) return new Response("Missing code/state", { status: 400 });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: row, error: sErr } = await supabaseAdmin
          .from("yoto_oauth_states")
          .select("user_id, code_verifier, redirect_to, expires_at")
          .eq("state", state)
          .maybeSingle();
        if (sErr || !row) return new Response("Invalid or expired state", { status: 400 });
        if (new Date(row.expires_at).getTime() < Date.now()) {
          return new Response("Expired state", { status: 400 });
        }

        // One-time use
        await supabaseAdmin.from("yoto_oauth_states").delete().eq("state", state);

        try {
          const tokens = await exchangeCodeForTokens({
            code,
            codeVerifier: row.code_verifier,
            redirectUri: `${url.origin}${YOTO_CALLBACK_PATH}`,
          });
          await upsertConnection(row.user_id, tokens);
        } catch (e) {
          const msg = e instanceof Error ? e.message : "Unknown error";
          throw redirect({ href: `/dashboard?yoto_error=${encodeURIComponent(msg)}` });
        }

        throw redirect({ href: (row.redirect_to ?? "/dashboard") + "?yoto=connected" });
      },
    },
  },
});
