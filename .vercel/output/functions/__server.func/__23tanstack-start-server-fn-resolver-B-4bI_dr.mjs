//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-B-4bI_dr.js
var manifest = {
	"1de804b80a36835f298dcffb5f778b12581776f335cb6b30278a5deaa552742c": {
		functionName: "getPlaylistsData_createServerFn_handler",
		importer: () => import("./_ssr/players.functions-DNaUj61p.mjs")
	},
	"368851d711642cb62669df807d679de2939ceddbf46cd5476399fc6cdf84485b": {
		functionName: "getSettingsData_createServerFn_handler",
		importer: () => import("./_ssr/players.functions-DNaUj61p.mjs")
	},
	"4ad7687c7af74a764936c0092d804a47ec918c3278fe4465d0ed7d733c182868": {
		functionName: "getDashboardData_createServerFn_handler",
		importer: () => import("./_ssr/players.functions-DNaUj61p.mjs")
	},
	"8aba62a090e0cb3cad7c0ff4e47368d3c05864fe622049515c0f47069c960cd7": {
		functionName: "getFamilyData_createServerFn_handler",
		importer: () => import("./_ssr/players.functions-DNaUj61p.mjs")
	},
	"ad85286c0166dd1cb0b9ca387064b4948d27d2a162b0693ae7f1a9db13e9fce3": {
		functionName: "disconnectYoto_createServerFn_handler",
		importer: () => import("./_ssr/players.functions-DNaUj61p.mjs")
	},
	"b8ce384e3dfb39af25ab316c83298c75f13494ac780728d3e72d857739053181": {
		functionName: "getYotoConnectionStatus_createServerFn_handler",
		importer: () => import("./_ssr/players.functions-DNaUj61p.mjs")
	},
	"f169d5592292e7c70f8e7dac71b2e880193d5ae5c0be31abe6c8ce89d30ef0dc": {
		functionName: "getPlaylistDetails_createServerFn_handler",
		importer: () => import("./_ssr/players.functions-DNaUj61p.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
