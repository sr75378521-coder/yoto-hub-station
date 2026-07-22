import { t as supabase } from "./client-x8mwJyt5.mjs";
import { n as createStart, t as createMiddleware } from "./createStart-Dt05N14y.mjs";
import { t as renderErrorPage } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/start-BaBnjtFO.js
var attachSupabaseAuth = createMiddleware({ type: "function" }).client(async ({ next }) => {
	try {
		const { data } = await supabase.auth.getSession();
		const token = data.session?.access_token;
		return next({ headers: token ? { Authorization: `Bearer ${token}` } : {} });
	} catch {
		return next({ headers: {} });
	}
});
var errorMiddleware = createMiddleware().server(async ({ next }) => {
	try {
		return await next();
	} catch (error) {
		if (error != null && typeof error === "object" && "statusCode" in error) throw error;
		console.error(error);
		return new Response(renderErrorPage(error), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
});
var startInstance = createStart(() => ({
	functionMiddleware: [attachSupabaseAuth],
	requestMiddleware: [errorMiddleware]
}));
//#endregion
export { startInstance };
