import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-x8mwJyt5.js
function isNewSupabaseApiKey(value) {
	return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}
function createSupabaseFetch(supabaseKey) {
	return (input, init) => {
		const headers = new Headers(typeof Request !== "undefined" && input instanceof Request ? input.headers : void 0);
		if (init?.headers) new Headers(init.headers).forEach((value, key) => headers.set(key, value));
		if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) headers.delete("Authorization");
		headers.set("apikey", supabaseKey);
		return fetch(input, {
			...init,
			headers
		});
	};
}
function createSupabaseClient() {
	const SUPABASE_URL = (typeof window !== "undefined" ? window.__SUPABASE_URL__ : void 0) || (typeof process !== "undefined" ? process.env.SUPABASE_URL : void 0);
	const SUPABASE_PUBLISHABLE_KEY = (typeof window !== "undefined" ? window.__SUPABASE_PUBLISHABLE_KEY__ : void 0) || (typeof process !== "undefined" ? process.env.SUPABASE_PUBLISHABLE_KEY : void 0) || (typeof process !== "undefined" ? process.env.SUPABASE_ANON_KEY : void 0);
	if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
		const message = `Missing Supabase environment variable(s): ${[...!SUPABASE_URL ? ["SUPABASE_URL"] : [], ...!SUPABASE_PUBLISHABLE_KEY ? ["SUPABASE_PUBLISHABLE_KEY / SUPABASE_ANON_KEY"] : []].join(", ")}. Add them in your Vercel project settings.`;
		console.error(`[Supabase] ${message}`);
		throw new Error(message);
	}
	return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
		global: { fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY) },
		auth: {
			storage: typeof window !== "undefined" ? localStorage : void 0,
			persistSession: true,
			autoRefreshToken: true
		}
	});
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) try {
		_supabase = createSupabaseClient();
	} catch (e) {
		console.error("[Supabase] Client initialization failed:", e);
		_supabase = null;
	}
	if (!_supabase) throw new Error("Supabase client is not configured. Add SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY (or SUPABASE_ANON_KEY) to your environment variables.");
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };
