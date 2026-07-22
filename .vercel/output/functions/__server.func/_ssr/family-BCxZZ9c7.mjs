import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as cn, t as Button } from "./button-CCQEfgNs.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-C2pytTEu.mjs";
import { E as Disc3, O as Clock, f as RefreshCw, h as Music, l as Shield, v as Mail } from "../_libs/lucide-react.mjs";
import { o as useServerFn, r as getFamilyData } from "./players.functions-BhWWIwRF.mjs";
import { t as Skeleton } from "./skeleton-DLRLwmh_.mjs";
import { n as queryOptions, r as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-Cw-RdHZ4.mjs";
import { t as Badge } from "./badge-Bt-nVIZo.mjs";
import { t as ConnectYotoCard } from "./ConnectYotoCard-DCmYcZca.mjs";
import { n as AvatarFallback$1, r as AvatarImage$1, t as Avatar$1 } from "../_libs/radix-ui__react-avatar.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/family-BCxZZ9c7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Avatar = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
	ref,
	className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
	...props
}));
Avatar.displayName = Avatar$1.displayName;
var AvatarImage = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage$1, {
	ref,
	className: cn("aspect-square h-full w-full", className),
	...props
}));
AvatarImage.displayName = AvatarImage$1.displayName;
var AvatarFallback = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback$1, {
	ref,
	className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
	...props
}));
AvatarFallback.displayName = AvatarFallback$1.displayName;
var familyQuery = (fn) => queryOptions({
	queryKey: ["family"],
	queryFn: () => fn(),
	refetchInterval: 6e4
});
function FamilyPage() {
	const { data, isFetching, refetch } = useSuspenseQuery(familyQuery(useServerFn(getFamilyData)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Family",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-6xl space-y-8",
			children: !data.connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectYotoCard, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-2xl font-semibold tracking-tight",
						children: [
							data.members.length,
							" family member",
							data.members.length === 1 ? "" : "s"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Manage your family group and member permissions."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => refetch(),
						disabled: isFetching,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `size-4 ${isFetching ? "animate-spin" : ""}` }), "Refresh"]
					})]
				}),
				data.errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive mb-6",
					children: data.errorMessage
				}) : null,
				data.members.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyFamily, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4",
					children: data.members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FamilyMemberCard, { member }, member.userId))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t pt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-2xl font-semibold tracking-tight",
						children: [
							data.familyPlaylists.length,
							" family playlist",
							data.familyPlaylists.length === 1 ? "" : "s"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Playlists shared across your family accounts."
					})]
				}), data.familyPlaylists.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-dashed border-border/70 bg-card/40 p-10 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "mx-auto size-8 text-muted-foreground/50" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 text-base font-semibold",
							children: "No family playlists yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Create playlists in the Playlists tab to share with your family."
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: data.familyPlaylists.map((playlist) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FamilyPlaylistCard, { playlist }, playlist.playlistId))
				})]
			})] })
		})
	});
}
function FamilyMemberCard({ member }) {
	const initials = `${member.firstName?.[0] ?? ""}${member.lastName?.[0] ?? ""}`.toUpperCase() || "U";
	const fullName = `${member.firstName ?? ""} ${member.lastName ?? ""}`.trim();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "hover:shadow-md transition-shadow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						className: "h-12 w-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
							src: member.profileImage,
							alt: fullName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
							className: "bg-primary/10",
							children: initials
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium leading-none",
							children: fullName || "Family Member"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3" }), member.email || "No email"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "capitalize",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3 mr-1" }), member.role || "Member"]
					})
				})]
			})
		})
	});
}
function FamilyPlaylistCard({ playlist }) {
	const hours = Math.floor((playlist.duration ?? 0) / 3600);
	const minutes = Math.floor((playlist.duration ?? 0) % 3600 / 60);
	const durationStr = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "group hover:shadow-md transition-all hover:border-primary/50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "space-y-3",
			children: [playlist.artwork ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: playlist.artwork,
				alt: playlist.name,
				className: "h-32 w-full rounded-lg object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-32 w-full items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "size-12 text-primary/40" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "line-clamp-2",
				children: playlist.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
				className: "mt-1",
				children: "Family Playlist"
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4 text-sm text-muted-foreground",
			children: [playlist.trackCount !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disc3, { className: "size-3" }),
					playlist.trackCount,
					" track",
					playlist.trackCount === 1 ? "" : "s"
				]
			}), playlist.duration && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), durationStr]
			})]
		}) })]
	});
}
function EmptyFamily() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "border-dashed",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-base font-semibold",
					children: "No family members yet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Invite family members to share control of your Yoto players."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					children: "Invite Family Member"
				})
			]
		})
	});
}
function FamilySkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: [
			0,
			1,
			2
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 rounded-lg" }, i))
	});
}
//#endregion
export { FamilySkeleton, FamilyPage as component };
