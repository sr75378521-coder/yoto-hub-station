import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-BFFE07zL.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BwdutfJC.mjs";
import { c as getValidAccessToken, o as deleteConnection, t as YOTO_API_BASE } from "./tokens.server-DlBX-lyG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/players.functions-ZgtkcbsT.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Server-side Yoto REST helper. Attaches bearer token, auto-refreshes on 401.
*/
var YotoNotConnectedError = class extends Error {
	constructor() {
		super("Yoto account not connected");
		this.name = "YotoNotConnectedError";
	}
};
async function yotoFetch(userId, path, init = {}) {
	const token = await getValidAccessToken(userId);
	if (!token) throw new YotoNotConnectedError();
	const headers = new Headers(init.headers);
	headers.set("Authorization", `Bearer ${token}`);
	if (!headers.has("Accept")) headers.set("Accept", "application/json");
	const url = path.startsWith("http") ? path : `${YOTO_API_BASE}${path}`;
	return fetch(url, {
		...init,
		headers
	});
}
async function yotoGetJson(userId, path) {
	const res = await yotoFetch(userId, path);
	const text = await res.text();
	if (!res.ok) throw new Error(`Yoto API ${res.status} ${path}: ${text.slice(0, 300)}`);
	return text ? JSON.parse(text) : void 0;
}
var getDashboardData_createServerFn_handler = createServerRpc({
	id: "4ad7687c7af74a764936c0092d804a47ec918c3278fe4465d0ed7d733c182868",
	name: "getDashboardData",
	filename: "src/lib/players.functions.ts"
}, (opts) => getDashboardData.__executeServer(opts));
var getDashboardData = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getDashboardData_createServerFn_handler, async ({ context }) => {
	try {
		return {
			connected: true,
			players: ((await yotoGetJson(context.userId, "/device-v2/devices/mine")).devices ?? []).map((d) => ({
				deviceId: d.deviceId,
				name: d.name ?? "Yoto Player",
				online: Boolean(d.online),
				deviceType: d.deviceType ?? null,
				deviceFamily: d.deviceFamily ?? null,
				description: d.description ?? null,
				releaseChannel: d.releaseChannel ?? null
			}))
		};
	} catch (e) {
		if (e instanceof YotoNotConnectedError) return {
			connected: false,
			players: []
		};
		return {
			connected: true,
			players: [],
			errorMessage: e instanceof Error ? e.message : "Unknown error"
		};
	}
});
var getYotoConnectionStatus_createServerFn_handler = createServerRpc({
	id: "b8ce384e3dfb39af25ab316c83298c75f13494ac780728d3e72d857739053181",
	name: "getYotoConnectionStatus",
	filename: "src/lib/players.functions.ts"
}, (opts) => getYotoConnectionStatus.__executeServer(opts));
var getYotoConnectionStatus = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getYotoConnectionStatus_createServerFn_handler, async ({ context }) => {
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const { data } = await supabaseAdmin.from("yoto_connections").select("yoto_user_id").eq("user_id", context.userId).maybeSingle();
	return {
		connected: !!data,
		yotoUserId: data?.yoto_user_id ?? null
	};
});
var disconnectYoto_createServerFn_handler = createServerRpc({
	id: "ad85286c0166dd1cb0b9ca387064b4948d27d2a162b0693ae7f1a9db13e9fce3",
	name: "disconnectYoto",
	filename: "src/lib/players.functions.ts"
}, (opts) => disconnectYoto.__executeServer(opts));
var disconnectYoto = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(disconnectYoto_createServerFn_handler, async ({ context }) => {
	await deleteConnection(context.userId);
	return { ok: true };
});
var getFamilyData_createServerFn_handler = createServerRpc({
	id: "8aba62a090e0cb3cad7c0ff4e47368d3c05864fe622049515c0f47069c960cd7",
	name: "getFamilyData",
	filename: "src/lib/players.functions.ts"
}, (opts) => getFamilyData.__executeServer(opts));
var getFamilyData = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getFamilyData_createServerFn_handler, async ({ context }) => {
	try {
		const members = ((await yotoGetJson(context.userId, "/family/users")).users ?? []).map((u) => ({
			userId: u.userId,
			firstName: u.firstName ?? "User",
			lastName: u.lastName ?? "",
			email: u.email ?? "",
			profileImage: u.profileImage ?? "",
			role: u.role ?? "member"
		}));
		let familyPlaylists = [];
		try {
			familyPlaylists = ((await yotoGetJson(context.userId, "/family/playlists")).playlists ?? []).map((p) => ({
				playlistId: p.playlistId,
				name: p.name ?? "Untitled Playlist",
				artwork: p.artwork ?? "",
				duration: p.duration ?? 0,
				trackCount: p.trackCount ?? 0
			}));
		} catch (e) {
			familyPlaylists = [];
		}
		return {
			connected: true,
			members,
			familyPlaylists
		};
	} catch (e) {
		if (e instanceof YotoNotConnectedError) return {
			connected: false,
			members: [],
			familyPlaylists: []
		};
		return {
			connected: true,
			members: [],
			familyPlaylists: [],
			errorMessage: e instanceof Error ? e.message : "Unknown error"
		};
	}
});
var getPlaylistsData_createServerFn_handler = createServerRpc({
	id: "1de804b80a36835f298dcffb5f778b12581776f335cb6b30278a5deaa552742c",
	name: "getPlaylistsData",
	filename: "src/lib/players.functions.ts"
}, (opts) => getPlaylistsData.__executeServer(opts));
var getPlaylistsData = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getPlaylistsData_createServerFn_handler, async ({ context }) => {
	try {
		return {
			connected: true,
			playlists: ((await yotoGetJson(context.userId, "/user/playlists")).playlists ?? []).map((p) => ({
				playlistId: p.playlistId,
				name: p.name ?? "Untitled Playlist",
				type: p.type ?? "playlist",
				artwork: p.artwork ?? "",
				duration: p.duration ?? 0,
				trackCount: p.trackCount ?? 0,
				createdDate: p.createdDate ?? "",
				isEditable: p.isEditable ?? false
			}))
		};
	} catch (e) {
		if (e instanceof YotoNotConnectedError) return {
			connected: false,
			playlists: []
		};
		return {
			connected: true,
			playlists: [],
			errorMessage: e instanceof Error ? e.message : "Unknown error"
		};
	}
});
var getPlaylistDetails_createServerFn_handler = createServerRpc({
	id: "f169d5592292e7c70f8e7dac71b2e880193d5ae5c0be31abe6c8ce89d30ef0dc",
	name: "getPlaylistDetails",
	filename: "src/lib/players.functions.ts"
}, (opts) => getPlaylistDetails.__executeServer(opts));
var getPlaylistDetails = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getPlaylistDetails_createServerFn_handler, async ({ context, data }) => {
	try {
		return {
			success: true,
			playlist: await yotoGetJson(context.userId, `/playlist-v2/playlists/${data.playlistId}`)
		};
	} catch (e) {
		return {
			success: false,
			error: e instanceof Error ? e.message : "Unknown error"
		};
	}
});
var getSettingsData_createServerFn_handler = createServerRpc({
	id: "368851d711642cb62669df807d679de2939ceddbf46cd5476399fc6cdf84485b",
	name: "getSettingsData",
	filename: "src/lib/players.functions.ts"
}, (opts) => getSettingsData.__executeServer(opts));
var getSettingsData = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getSettingsData_createServerFn_handler, async ({ context }) => {
	try {
		const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
		const { data: userData } = await supabaseAdmin.auth.admin.getUserById(context.userId);
		return {
			connected: true,
			settings: {
				theme: "auto",
				notifications: true,
				apiStatus: "connected",
				accountEmail: userData?.user?.email ?? "",
				accountName: userData?.user?.user_metadata?.full_name ?? "User"
			}
		};
	} catch (e) {
		return {
			connected: true,
			settings: {},
			errorMessage: e instanceof Error ? e.message : "Unknown error"
		};
	}
});
//#endregion
export { disconnectYoto_createServerFn_handler, getDashboardData_createServerFn_handler, getFamilyData_createServerFn_handler, getPlaylistDetails_createServerFn_handler, getPlaylistsData_createServerFn_handler, getSettingsData_createServerFn_handler, getYotoConnectionStatus_createServerFn_handler };
