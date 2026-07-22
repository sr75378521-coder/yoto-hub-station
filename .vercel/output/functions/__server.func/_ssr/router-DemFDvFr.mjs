import { r as __toESM } from "../_runtime.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as supabase } from "./client-xXoXHqVY.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { M as redirect, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { a as YOTO_SCOPES, i as YOTO_CALLBACK_PATH, l as upsertConnection, n as YOTO_AUDIENCE, r as YOTO_AUTH_BASE, s as exchangeCodeForTokens } from "./tokens.server-cGAib_13.mjs";
import { n as objectType, r as stringType, t as enumType } from "../_libs/zod.mjs";
import { createHash, randomBytes } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DemFDvFr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var styles_default = "/assets/styles-CjXVN9m4.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$10 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Yoto Control Center — Manage every Yoto player" },
			{
				name: "description",
				content: "A modern dashboard for every Yoto player, playlist, and MYO card. Real-time controls, family view, and MYO playlist editing."
			},
			{
				name: "author",
				content: "Yoto Control Center"
			},
			{
				property: "og:title",
				content: "Yoto Control Center — Manage every Yoto player"
			},
			{
				property: "og:description",
				content: "A modern dashboard for every Yoto player, playlist, and MYO card. Real-time controls, family view, and MYO playlist editing."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Yoto Control Center — Manage every Yoto player"
			},
			{
				name: "twitter:description",
				content: "A modern dashboard for every Yoto player, playlist, and MYO card. Real-time controls, family view, and MYO playlist editing."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7af3aa7d-b019-4d0d-8bcc-8c59bd1e5467/id-preview-75745274--65272925-719d-4f89-ab58-d897d4f056e0.lovable.app-1784656861101.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7af3aa7d-b019-4d0d-8bcc-8c59bd1e5467/id-preview-75745274--65272925-719d-4f89-ab58-d897d4f056e0.lovable.app-1784656861101.png"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$10.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		let sub;
		try {
			sub = supabase.auth.onAuthStateChange((event) => {
				if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
				router.invalidate();
				if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
			});
		} catch (e) {
			console.error("[Supabase] Auth listener setup failed:", e);
		}
		return () => sub?.subscription.unsubscribe();
	}, [queryClient, router]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-right"
		})]
	});
}
var $$splitComponentImporter$7 = () => import("./routes-4r1yxi32.mjs");
var Route$9 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Yoto Control Center — Manage every Yoto player" },
		{
			name: "description",
			content: "A modern dashboard for every Yoto player, playlist, and MYO card. Real-time controls, family view, and MYO playlist editing."
		},
		{
			property: "og:title",
			content: "Yoto Control Center — Manage every Yoto player"
		},
		{
			property: "og:description",
			content: "A modern dashboard for every Yoto player, playlist, and MYO card. Real-time controls, family view, and MYO playlist editing."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./route-Di7iQBCH.mjs");
var Route$8 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		try {
			const { data, error } = await supabase.auth.getUser();
			if (error || !data.user) throw redirect({ to: "/auth" });
			return { user: data.user };
		} catch (e) {
			if (e && typeof e === "object" && "status" in e) throw e;
			throw redirect({ to: "/auth" });
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./auth-Ch20MfL9.mjs");
var Route$7 = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "Sign in · Yoto Control Center" },
		{
			name: "description",
			content: "Sign in to Yoto Control Center."
		},
		{
			property: "og:title",
			content: "Sign in · Yoto Control Center"
		},
		{
			property: "og:description",
			content: "Sign in to Yoto Control Center."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitErrorComponentImporter$3 = () => import("./dashboard-CfdBRdD2.mjs");
var $$splitComponentImporter$4 = () => import("./dashboard-BHjScYsh.mjs");
var searchSchema = objectType({
	yoto: enumType(["connected"]).optional(),
	yoto_error: stringType().optional()
});
var Route$6 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [
		{ title: "Players · Yoto Control Center" },
		{
			name: "description",
			content: "See and control every Yoto player linked to your account."
		},
		{
			property: "og:title",
			content: "Yoto Control Center"
		},
		{
			property: "og:description",
			content: "A modern dashboard for every Yoto player, playlist and MYO card."
		}
	] }),
	validateSearch: searchSchema,
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$3, "errorComponent")
});
var $$splitErrorComponentImporter$2 = () => import("./family-CpAul8We.mjs");
var $$splitComponentImporter$3 = () => import("./family-Eim6HUYe.mjs");
var Route$5 = createFileRoute("/_authenticated/family")({
	head: () => ({ meta: [{ title: "Family · Yoto Control Center" }, {
		name: "description",
		content: "Manage your Yoto family members and their permissions."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$2, "errorComponent")
});
var $$splitComponentImporter$2 = () => import("./library-DVjTS9tX.mjs");
var Route$4 = createFileRoute("/_authenticated/library")({
	head: () => ({ meta: [{ title: "Library · Yoto Control Center" }, {
		name: "description",
		content: "Manage your Yoto library, cards, and downloads."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitErrorComponentImporter$1 = () => import("./playlists-DCAV5RKo.mjs");
var $$splitComponentImporter$1 = () => import("./playlists-CZso_nIQ.mjs");
var Route$3 = createFileRoute("/_authenticated/playlists")({
	head: () => ({ meta: [{ title: "Playlists · Yoto Control Center" }, {
		name: "description",
		content: "Manage and create MYO playlists for your Yoto players."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$1, "errorComponent")
});
var $$splitErrorComponentImporter = () => import("./settings-D6bbbHUY.mjs");
var $$splitComponentImporter = () => import("./settings-CqSinzj0.mjs");
var Route$2 = createFileRoute("/_authenticated/settings")({
	head: () => ({ meta: [{ title: "Settings · Yoto Control Center" }, {
		name: "description",
		content: "Manage your Yoto Control Center settings and preferences."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
function generateCodeVerifier() {
	return randomBytes(32).toString("base64url");
}
function codeChallengeFromVerifier(verifier) {
	return createHash("sha256").update(verifier).digest("base64url");
}
function generateState() {
	return randomBytes(24).toString("base64url");
}
/**
* Start the Yoto OAuth flow.
* The client passes its Supabase access_token as a query param because this is
* a top-level browser navigation (not an XHR that could carry an Authorization header).
*/
var Route$1 = createFileRoute("/api/yoto/authorize")({ server: { handlers: { GET: async ({ request }) => {
	const url = new URL(request.url);
	const accessToken = url.searchParams.get("access_token") ?? "";
	if (!accessToken) return new Response("Missing access_token", { status: 401 });
	const supabaseUrl = process.env.SUPABASE_URL;
	const publishable = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
	if (!supabaseUrl || !publishable) {
		console.error("[yoto/authorize] Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY");
		return new Response("Server configuration error: missing Supabase env vars", { status: 500 });
	}
	const { data: userData, error: userErr } = await createClient(supabaseUrl, publishable, {
		auth: { persistSession: false },
		global: { headers: { Authorization: `Bearer ${accessToken}` } }
	}).auth.getUser(accessToken);
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
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const { error: insertErr } = await supabaseAdmin.from("yoto_oauth_states").insert({
		state,
		user_id: userId,
		code_verifier: verifier,
		redirect_to: "/dashboard",
		expires_at: new Date(Date.now() + 600 * 1e3).toISOString()
	});
	if (insertErr) {
		console.error("[yoto/authorize] Failed to store PKCE state:", insertErr.message);
		return new Response(`Failed to store state: ${insertErr.message}`, { status: 500 });
	}
	const redirectUri = `${url.origin}${YOTO_CALLBACK_PATH}`;
	const authorize = new URL(`${YOTO_AUTH_BASE}/authorize`);
	authorize.searchParams.set("response_type", "code");
	authorize.searchParams.set("client_id", clientId);
	authorize.searchParams.set("redirect_uri", redirectUri);
	authorize.searchParams.set("scope", YOTO_SCOPES);
	if (YOTO_AUDIENCE) authorize.searchParams.set("audience", YOTO_AUDIENCE);
	authorize.searchParams.set("state", state);
	authorize.searchParams.set("code_challenge", challenge);
	authorize.searchParams.set("code_challenge_method", "S256");
	console.log("[yoto/authorize] Redirecting to Yoto authorization endpoint", {
		client_id: clientId,
		redirect_uri: redirectUri,
		scope: YOTO_SCOPES,
		audience: YOTO_AUDIENCE ?? "(omitted)",
		response_type: "code",
		code_challenge_method: "S256",
		state_length: state.length
	});
	throw redirect({ href: authorize.toString() });
} } } });
/**
* Yoto OAuth redirect target. Exchanges the code, stores encrypted tokens,
* then bounces the user back into the app.
*/
var Route = createFileRoute("/api/yoto/callback")({ server: { handlers: { GET: async ({ request }) => {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const error = url.searchParams.get("error");
	const errorDescription = url.searchParams.get("error_description") ?? "No description";
	if (error) {
		console.error("[yoto/callback] Authorization server returned error:", {
			error,
			error_description: errorDescription
		});
		const detail = `${error}: ${errorDescription}`;
		throw redirect({ href: `/dashboard?yoto_error=${encodeURIComponent(detail)}` });
	}
	if (!code || !state) {
		console.error("[yoto/callback] Missing code or state param");
		return new Response("Missing code/state", { status: 400 });
	}
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const { data: row, error: sErr } = await supabaseAdmin.from("yoto_oauth_states").select("user_id, code_verifier, redirect_to, expires_at").eq("state", state).maybeSingle();
	if (sErr || !row) {
		console.error("[yoto/callback] Invalid or expired state:", sErr?.message);
		return new Response("Invalid or expired state", { status: 400 });
	}
	if (new Date(row.expires_at).getTime() < Date.now()) {
		console.error("[yoto/callback] State has expired");
		return new Response("Expired state", { status: 400 });
	}
	await supabaseAdmin.from("yoto_oauth_states").delete().eq("state", state);
	const redirectUri = `${url.origin}${YOTO_CALLBACK_PATH}`;
	console.log("[yoto/callback] Exchanging code for tokens", {
		user_id: row.user_id,
		redirect_uri: redirectUri
	});
	try {
		const tokens = await exchangeCodeForTokens({
			code,
			codeVerifier: row.code_verifier,
			redirectUri
		});
		await upsertConnection(row.user_id, tokens);
		console.log("[yoto/callback] Tokens stored successfully for user", row.user_id);
	} catch (e) {
		const msg = e instanceof Error ? e.message : "Unknown error";
		console.error("[yoto/callback] Token exchange failed:", msg);
		throw redirect({ href: `/dashboard?yoto_error=${encodeURIComponent(msg)}` });
	}
	throw redirect({ href: (row.redirect_to ?? "/dashboard") + "?yoto=connected" });
} } } });
var IndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$10
});
var AuthenticatedRouteRoute = Route$8.update({
	id: "/_authenticated",
	getParentRoute: () => Route$10
});
var AuthRoute = Route$7.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$10
});
var AuthenticatedDashboardRoute = Route$6.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFamilyRoute = Route$5.update({
	id: "/family",
	path: "/family",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedLibraryRoute = Route$4.update({
	id: "/library",
	path: "/library",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPlaylistsRoute = Route$3.update({
	id: "/playlists",
	path: "/playlists",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSettingsRoute = Route$2.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var ApiYotoAuthorizeRoute = Route$1.update({
	id: "/api/yoto/authorize",
	path: "/api/yoto/authorize",
	getParentRoute: () => Route$10
});
var ApiYotoCallbackRoute = Route.update({
	id: "/api/yoto/callback",
	path: "/api/yoto/callback",
	getParentRoute: () => Route$10
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedDashboardRoute,
	AuthenticatedFamilyRoute,
	AuthenticatedLibraryRoute,
	AuthenticatedPlaylistsRoute,
	AuthenticatedSettingsRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	ApiYotoAuthorizeRoute,
	ApiYotoCallbackRoute
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
