import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as cn, t as Button } from "./button-CCQEfgNs.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-C2pytTEu.mjs";
import { C as Heart, E as Disc3, O as Clock, T as Download, w as FileMusic } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-CEQsK92y.mjs";
import { t as Badge } from "./badge-Bt-nVIZo.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-B07IPtmG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function LibraryPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Library",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl space-y-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Library"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Manage your MYO cards, favorite content, and downloaded items."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "cards",
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "grid w-full grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "cards",
								children: "Cards"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "favorites",
								children: "Favorites"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "recent",
								children: "Recently Added"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "downloads",
								children: "Downloads"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "cards",
						className: "space-y-4 mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MyoCardsSection, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "favorites",
						className: "space-y-4 mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavoritesSection, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "recent",
						className: "space-y-4 mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentlyAddedSection, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "downloads",
						className: "space-y-4 mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadsSection, {})
					})
				]
			})]
		})
	});
}
function MyoCardsSection() {
	const cards = [
		{
			id: "1",
			name: "Stories",
			description: "Classic Yoto stories",
			artworkUrl: "",
			trackCount: 15
		},
		{
			id: "2",
			name: "Music Collection",
			description: "Family music playlist",
			artworkUrl: "",
			trackCount: 42
		},
		{
			id: "3",
			name: "Podcasts",
			description: "Educational content",
			artworkUrl: "",
			trackCount: 8
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-sm text-muted-foreground",
			children: [
				"Showing ",
				cards.length,
				" MYO card",
				cards.length === 1 ? "" : "s"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "group hover:shadow-md transition-all",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-32 w-full items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 mb-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disc3, { className: "size-12 text-primary/40" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "line-clamp-1",
						children: card.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						className: "line-clamp-2",
						children: card.description
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileMusic, { className: "size-3" }),
							card.trackCount,
							" track",
							card.trackCount === 1 ? "" : "s"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						className: "w-full",
						children: "View Card"
					})]
				}) })]
			}, card.id))
		})]
	});
}
function FavoritesSection() {
	const favorites = [{
		id: "1",
		name: "Sleepy Time Stories",
		type: "playlist",
		artist: "Yoto",
		duration: "45m"
	}, {
		id: "2",
		name: "Morning Routine",
		type: "playlist",
		artist: "Family",
		duration: "30m"
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-sm text-muted-foreground",
			children: [
				"Showing ",
				favorites.length,
				" favorite",
				favorites.length === 1 ? "" : "s"
			]
		}), favorites.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: favorites.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-4 text-red-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-sm",
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: item.artist
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "text-xs",
							children: item.duration
						})
					})]
				})
			}) }, item.id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Heart,
			title: "No favorites yet",
			description: "Mark your favorite playlists and content to see them here."
		})]
	});
}
function RecentlyAddedSection() {
	const recent = [{
		id: "1",
		name: "New Stories Vol. 5",
		type: "card",
		addedDate: "2 days ago",
		trackCount: 20
	}, {
		id: "2",
		name: "Math Adventure",
		type: "playlist",
		addedDate: "1 week ago",
		trackCount: 12
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-sm text-muted-foreground",
			children: [
				"Showing ",
				recent.length,
				" recent item",
				recent.length === 1 ? "" : "s"
			]
		}), recent.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: recent.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-sm",
						children: item.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-xs text-muted-foreground mt-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "capitalize",
								children: item.type
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), item.addedDate]
							})
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "text-xs",
						children: [
							item.trackCount,
							" track",
							item.trackCount === 1 ? "" : "s"
						]
					})]
				})
			}) }, item.id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Clock,
			title: "No recent items",
			description: "Recently added cards and playlists will appear here."
		})]
	});
}
function DownloadsSection() {
	const downloads = [{
		id: "1",
		name: "Stories Collection",
		size: "256 MB",
		progress: 100,
		downloaded: true
	}, {
		id: "2",
		name: "Music Pack",
		size: "512 MB",
		progress: 65,
		downloaded: false
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-sm text-muted-foreground",
			children: [
				"Showing ",
				downloads.filter((d) => d.downloaded).length,
				" downloaded items"
			]
		}), downloads.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: downloads.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-sm",
						children: item.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: item.size
					})] }), item.downloaded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "secondary",
						className: "text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3 mr-1" }), "Downloaded"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "text-xs",
						children: [item.progress, "%"]
					})]
				}), !item.downloaded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full bg-muted rounded-full h-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-primary h-2 rounded-full transition-all",
						style: { width: `${item.progress}%` }
					})
				})]
			}) }, item.id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Download,
			title: "No downloads yet",
			description: "Download playlists and cards to access them offline."
		})]
	});
}
function EmptyState({ icon: Icon, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-dashed border-border/70 bg-card/40 p-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mx-auto size-8 text-muted-foreground/50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 text-base font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: description
			})
		]
	});
}
//#endregion
export { LibraryPage as component };
