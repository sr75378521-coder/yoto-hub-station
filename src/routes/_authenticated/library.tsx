import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { ConnectYotoCard } from "@/components/app/ConnectYotoCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, Heart, Clock, FileMusic, Disc3, Download as DownloadIcon } from "lucide-react";

export const Route = createFileRoute("/_authenticated/library")({
  head: () => ({
    meta: [
      { title: "Library · Yoto Control Center" },
      {
        name: "description",
        content: "Manage your Yoto library, cards, and downloads.",
      },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  return (
    <AppShell title="Library">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Library</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your MYO cards, favorite content, and downloaded items.
          </p>
        </div>

        <Tabs defaultValue="cards" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="recent">Recently Added</TabsTrigger>
            <TabsTrigger value="downloads">Downloads</TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="space-y-4 mt-6">
            <MyoCardsSection />
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4 mt-6">
            <FavoritesSection />
          </TabsContent>

          <TabsContent value="recent" className="space-y-4 mt-6">
            <RecentlyAddedSection />
          </TabsContent>

          <TabsContent value="downloads" className="space-y-4 mt-6">
            <DownloadsSection />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}

function MyoCardsSection() {
  const cards = [
    {
      id: "1",
      name: "Stories",
      description: "Classic Yoto stories",
      artworkUrl: "",
      trackCount: 15,
    },
    {
      id: "2",
      name: "Music Collection",
      description: "Family music playlist",
      artworkUrl: "",
      trackCount: 42,
    },
    {
      id: "3",
      name: "Podcasts",
      description: "Educational content",
      artworkUrl: "",
      trackCount: 8,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Showing {cards.length} MYO card{cards.length === 1 ? "" : "s"}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.id} className="group hover:shadow-md transition-all">
            <CardHeader>
              <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 mb-3">
                <Disc3 className="size-12 text-primary/40" />
              </div>
              <CardTitle className="line-clamp-1">{card.name}</CardTitle>
              <CardDescription className="line-clamp-2">{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileMusic className="size-3" />
                  {card.trackCount} track{card.trackCount === 1 ? "" : "s"}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View Card
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FavoritesSection() {
  const favorites = [
    {
      id: "1",
      name: "Sleepy Time Stories",
      type: "playlist",
      artist: "Yoto",
      duration: "45m",
    },
    {
      id: "2",
      name: "Morning Routine",
      type: "playlist",
      artist: "Family",
      duration: "30m",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Showing {favorites.length} favorite{favorites.length === 1 ? "" : "s"}
      </div>
      {favorites.length > 0 ? (
        <div className="space-y-2">
          {favorites.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Heart className="size-4 text-red-500" />
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.artist}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-xs">
                      {item.duration}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Heart}
          title="No favorites yet"
          description="Mark your favorite playlists and content to see them here."
        />
      )}
    </div>
  );
}

function RecentlyAddedSection() {
  const recent = [
    {
      id: "1",
      name: "New Stories Vol. 5",
      type: "card",
      addedDate: "2 days ago",
      trackCount: 20,
    },
    {
      id: "2",
      name: "Math Adventure",
      type: "playlist",
      addedDate: "1 week ago",
      trackCount: 12,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Showing {recent.length} recent item{recent.length === 1 ? "" : "s"}
      </div>
      {recent.length > 0 ? (
        <div className="space-y-2">
          {recent.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="capitalize">{item.type}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {item.addedDate}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.trackCount} track{item.trackCount === 1 ? "" : "s"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Clock}
          title="No recent items"
          description="Recently added cards and playlists will appear here."
        />
      )}
    </div>
  );
}

function DownloadsSection() {
  const downloads = [
    {
      id: "1",
      name: "Stories Collection",
      size: "256 MB",
      progress: 100,
      downloaded: true,
    },
    {
      id: "2",
      name: "Music Pack",
      size: "512 MB",
      progress: 65,
      downloaded: false,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Showing {downloads.filter((d) => d.downloaded).length} downloaded items
      </div>
      {downloads.length > 0 ? (
        <div className="space-y-2">
          {downloads.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.size}</p>
                  </div>
                  {item.downloaded ? (
                    <Badge variant="secondary" className="text-xs">
                      <DownloadIcon className="size-3 mr-1" />
                      Downloaded
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      {item.progress}%
                    </Badge>
                  )}
                </div>
                {!item.downloaded && (
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Download}
          title="No downloads yet"
          description="Download playlists and cards to access them offline."
        />
      )}
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border/70 bg-card/40 p-10 text-center">
      <Icon className="mx-auto size-8 text-muted-foreground/50" />
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
