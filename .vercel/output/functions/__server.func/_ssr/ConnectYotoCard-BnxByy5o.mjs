import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-2LJXHoF3.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-CCQEfgNs.mjs";
import { n as CardContent, t as Card } from "./card-C2pytTEu.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { p as Radio } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ConnectYotoCard-BnxByy5o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ConnectYotoCard() {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const connect = async () => {
		setLoading(true);
		try {
			const { data } = await supabase.auth.getSession();
			const token = data.session?.access_token;
			if (!token) {
				toast.error("Please sign in again");
				setLoading(false);
				return;
			}
			window.location.href = `/api/yoto/authorize?access_token=${encodeURIComponent(token)}`;
		} catch (e) {
			setLoading(false);
			toast.error(e instanceof Error ? e.message : "Failed to start OAuth");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "relative overflow-hidden border-primary/30 bg-card/60 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 opacity-60",
			style: { background: "var(--gradient-hero)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "relative flex flex-col items-start gap-4 p-8 md:flex-row md:items-center md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "Connect your Yoto account"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-md text-sm text-muted-foreground",
					children: "Sign in with Yoto to see every player, control playback, edit MYO playlists, and manage your family — all from one place."
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "lg",
				onClick: connect,
				disabled: loading,
				className: "shrink-0",
				children: loading ? "Redirecting…" : "Connect Yoto"
			})]
		})]
	});
}
//#endregion
export { ConnectYotoCard as t };
