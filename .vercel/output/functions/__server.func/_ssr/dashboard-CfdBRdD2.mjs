import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-CCQEfgNs.mjs";
import { t as Skeleton } from "./skeleton-DLRLwmh_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-CfdBRdD2.js
var import_jsx_runtime = require_jsx_runtime();
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
var SplitErrorComponent = ({ error, reset }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "p-8",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-lg font-semibold",
			children: "Couldn't load players"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: error.message
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: reset,
			className: "mt-4",
			children: "Try again"
		})
	]
});
//#endregion
export { DashboardSkeleton, SplitErrorComponent as errorComponent };
