import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-CCQEfgNs.mjs";
import { n as CardContent, t as Card } from "./card-C2pytTEu.mjs";
import { v as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as RefreshCw, n as Wifi, o as Unplug, p as Radio, r as WifiOff } from "../_libs/lucide-react.mjs";
import { n as getDashboardData, o as useServerFn, t as disconnectYoto } from "./players.functions-BaPLagH1.mjs";
import { t as Skeleton } from "./skeleton-DLRLwmh_.mjs";
import { a as useQueryClient, n as queryOptions, r as useSuspenseQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-CEQsK92y.mjs";
import { t as Badge } from "./badge-Bt-nVIZo.mjs";
import { t as ConnectYotoCard } from "./ConnectYotoCard-BWkNvAX1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-BD6Svb5K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PlayerCard({ player }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "group relative overflow-hidden border-border/60 bg-card/70 backdrop-blur transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-x-0 top-0 h-24 opacity-70",
			style: { background: "var(--gradient-player)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "relative flex flex-col gap-4 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: player.online ? "default" : "secondary",
						className: "gap-1",
						children: [player.online ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "size-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "size-3" }), player.online ? "Online" : "Offline"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-base font-semibold leading-tight",
					children: player.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 text-xs text-muted-foreground",
					children: [
						player.deviceType ?? "Yoto",
						" · ",
						player.deviceFamily ?? "player"
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg border border-dashed border-border/70 bg-background/40 p-3 text-xs text-muted-foreground",
					children: "Live playback, battery, and controls arrive with the MQTT slice."
				})
			]
		})]
	});
}
var dashboardQuery = (fn) => queryOptions({
	queryKey: ["dashboard"],
	queryFn: () => fn(),
	refetchInterval: 3e4
});
function DashboardPage() {
	const fetchDashboard = useServerFn(getDashboardData);
	const disconnectFn = useServerFn(disconnectYoto);
	const search = useSearch({ from: "/_authenticated/dashboard" });
	const queryClient = useQueryClient();
	const { data, isFetching, refetch } = useSuspenseQuery(dashboardQuery(fetchDashboard));
	(0, import_react.useEffect)(() => {
		if (search.yoto === "connected") toast.success("Yoto account connected");
		if (search.yoto_error) toast.error(`Yoto: ${search.yoto_error}`);
	}, [search.yoto, search.yoto_error]);
	const disconnect = useMutation({
		mutationFn: () => disconnectFn(),
		onSuccess: () => {
			toast.success("Disconnected");
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Players",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-6xl space-y-8",
			children: !data.connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectYotoCard, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-2xl font-semibold tracking-tight",
						children: [
							data.players.length,
							" player",
							data.players.length === 1 ? "" : "s"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Live status polls every 30 seconds. MQTT real-time is coming next."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => refetch(),
							disabled: isFetching,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `size-4 ${isFetching ? "animate-spin" : ""}` }), "Refresh"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => disconnect.mutate(),
							disabled: disconnect.isPending,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Unplug, { className: "size-4" }), "Disconnect"]
						})]
					})]
				}),
				data.errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive",
					children: data.errorMessage
				}) : null,
				data.players.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyPlayers, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: data.players.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerCard, { player: p }, p.deviceId))
				})
			] })
		})
	});
}
function EmptyPlayers() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-dashed border-border/70 bg-card/40 p-10 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-base font-semibold",
			children: "No players yet"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "We couldn't find any Yoto players on your account. Once one appears here you'll be able to control it."
		})]
	});
}
function DashboardSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
		children: [
			0,
			1,
			2
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-48 rounded-xl" }, i))
	});
}
//#endregion
export { DashboardSkeleton, DashboardPage as component };
