import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AppShell } from "@/components/app/AppShell";
import { ConnectYotoCard } from "@/components/app/ConnectYotoCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getFamilyData, type FamilyData } from "@/lib/players.functions";
import { Mail, Shield, RefreshCw } from "lucide-react";

const familyQuery = (fn: () => Promise<FamilyData>) =>
  queryOptions({
    queryKey: ["family"],
    queryFn: () => fn(),
    refetchInterval: 60_000,
  });

export const Route = createFileRoute("/_authenticated/family")({
  head: () => ({
    meta: [
      { title: "Family · Yoto Control Center" },
      {
        name: "description",
        content: "Manage your Yoto family members and their permissions.",
      },
    ],
  }),
  component: FamilyPage,
  errorComponent: ({ error, reset }) => (
    <div className="p-8">
      <h2 className="text-lg font-semibold">Couldn't load family</h2>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <Button onClick={reset} className="mt-4">
        Try again
      </Button>
    </div>
  ),
});

function FamilyPage() {
  const fetchFamily = useServerFn(getFamilyData);
  const { data, isFetching, refetch } = useSuspenseQuery(familyQuery(fetchFamily));

  return (
    <AppShell title="Family">
      <div className="mx-auto max-w-4xl space-y-8">
        {!data.connected ? (
          <ConnectYotoCard />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {data.members.length} family member{data.members.length === 1 ? "" : "s"}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage your family group and member permissions.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={isFetching}
              >
                <RefreshCw className={`size-4 ${isFetching ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>

            {data.errorMessage ? (
              <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
                {data.errorMessage}
              </div>
            ) : null}

            {data.members.length === 0 ? (
              <EmptyFamily />
            ) : (
              <div className="grid gap-4">
                {data.members.map((member) => (
                  <FamilyMemberCard key={member.userId} member={member} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </AppShell>
  );
}

function FamilyMemberCard({ member }: { member: any }) {
  const initials = `${member.firstName?.[0] ?? ""}${member.lastName?.[0] ?? ""}`.toUpperCase() || "U";
  const fullName = `${member.firstName ?? ""} ${member.lastName ?? ""}`.trim();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={member.profileImage} alt={fullName} />
              <AvatarFallback className="bg-primary/10">{initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="font-medium leading-none">{fullName || "Family Member"}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="size-3" />
                {member.email || "No email"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="capitalize">
              <Shield className="size-3 mr-1" />
              {member.role || "Member"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyFamily() {
  return (
    <Card className="border-dashed">
      <CardContent className="p-10 text-center">
        <h3 className="text-base font-semibold">No family members yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Invite family members to share control of your Yoto players.
        </p>
        <Button className="mt-4">Invite Family Member</Button>
      </CardContent>
    </Card>
  );
}

export function FamilySkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} className="h-20 rounded-lg" />
      ))}
    </div>
  );
}
