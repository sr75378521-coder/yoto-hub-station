import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime, _ as DialogTrigger$1, d as DialogClose, f as DialogContent$1, g as DialogTitle$1, h as DialogPortal$1, m as DialogOverlay$1, p as DialogDescription$1, u as Dialog$1 } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as cn, t as Button } from "./button-CCQEfgNs.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-C2pytTEu.mjs";
import { t as Input } from "./input-DoD5W07l.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as Disc3, O as Clock, d as Search, f as RefreshCw, h as Music, m as Plus, t as X } from "../_libs/lucide-react.mjs";
import { i as getPlaylistsData, o as useServerFn } from "./players.functions-BaPLagH1.mjs";
import { t as Skeleton } from "./skeleton-DLRLwmh_.mjs";
import { n as queryOptions, r as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-CEQsK92y.mjs";
import { t as ConnectYotoCard } from "./ConnectYotoCard-BWkNvAX1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/playlists-BqmAmhMx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var playlistsQuery = (fn) => queryOptions({
	queryKey: ["playlists"],
	queryFn: () => fn(),
	refetchInterval: 6e4
});
function PlaylistsPage() {
	const { data, isFetching, refetch } = useSuspenseQuery(playlistsQuery(useServerFn(getPlaylistsData)));
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [isCreating, setIsCreating] = (0, import_react.useState)(false);
	const [newPlaylistName, setNewPlaylistName] = (0, import_react.useState)("");
	const filteredPlaylists = data.playlists.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Playlists",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-6xl space-y-8",
			children: !data.connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectYotoCard, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-2xl font-semibold tracking-tight",
							children: [
								data.playlists.length,
								" playlist",
								data.playlists.length === 1 ? "" : "s"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Create and edit MYO playlists to customize your Yoto experience."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => refetch(),
								disabled: isFetching,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `size-4 ${isFetching ? "animate-spin" : ""}` }), "Refresh"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatePlaylistDialog, { onCreated: () => {
								setNewPlaylistName("");
								toast.success("Playlist created");
								refetch();
							} })]
						})]
					}), data.playlists.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Search playlists...",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							className: "pl-9"
						})]
					})]
				}),
				data.errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive",
					children: data.errorMessage
				}) : null,
				data.playlists.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyPlaylists, {}) : filteredPlaylists.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-dashed border-border/70 bg-card/40 p-10 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-semibold",
						children: "No playlists found"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Try adjusting your search query."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: filteredPlaylists.map((playlist) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaylistCard, { playlist }, playlist.playlistId))
				})
			] })
		})
	});
}
function PlaylistCard({ playlist }) {
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
				children: playlist.type === "myo_playlist" ? "MYO Playlist" : "Playlist"
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "sm",
					className: "flex-1",
					children: "Edit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					className: "flex-1",
					children: "Play"
				})]
			})]
		}) })]
	});
}
function CreatePlaylistDialog({ onCreated }) {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const handleCreate = () => {
		if (!name.trim()) {
			toast.error("Please enter a playlist name");
			return;
		}
		setName("");
		setIsOpen(false);
		onCreated();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open: isOpen,
		onOpenChange: setIsOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New Playlist"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Create New Playlist" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Create a new MYO playlist to customize your Yoto content." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "text-sm font-medium",
				children: "Playlist Name"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				placeholder: "My Awesome Playlist",
				value: name,
				onChange: (e) => setName(e.target.value),
				onKeyDown: (e) => {
					if (e.key === "Enter") handleCreate();
				},
				autoFocus: true,
				className: "mt-2"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setIsOpen(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleCreate,
					children: "Create"
				})]
			})]
		})] })]
	});
}
function EmptyPlaylists() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "border-dashed",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "mx-auto size-12 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-4 text-base font-semibold",
					children: "No playlists yet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Create your first MYO playlist to start building custom content."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Create Playlist"]
				})
			]
		})
	});
}
function PlaylistsSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
		children: [
			0,
			1,
			2
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 rounded-lg" }, i))
	});
}
//#endregion
export { PlaylistsSkeleton, PlaylistsPage as component };
