import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { k as isRedirect, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-m67FgyjB.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CRe_Pmmk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/players.functions-BWROVmmQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getDashboardData = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("4ad7687c7af74a764936c0092d804a47ec918c3278fe4465d0ed7d733c182868"));
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("b8ce384e3dfb39af25ab316c83298c75f13494ac780728d3e72d857739053181"));
var disconnectYoto = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("ad85286c0166dd1cb0b9ca387064b4948d27d2a162b0693ae7f1a9db13e9fce3"));
var getFamilyData = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("8aba62a090e0cb3cad7c0ff4e47368d3c05864fe622049515c0f47069c960cd7"));
var getPlaylistsData = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("1de804b80a36835f298dcffb5f778b12581776f335cb6b30278a5deaa552742c"));
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("f169d5592292e7c70f8e7dac71b2e880193d5ae5c0be31abe6c8ce89d30ef0dc"));
var getSettingsData = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("368851d711642cb62669df807d679de2939ceddbf46cd5476399fc6cdf84485b"));
//#endregion
export { getSettingsData as a, getPlaylistsData as i, getDashboardData as n, useServerFn as o, getFamilyData as r, disconnectYoto as t };
