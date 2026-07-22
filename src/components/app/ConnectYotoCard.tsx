import { useState } from "react";
import { Radio, Settings2, ChevronDown, ChevronUp, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface ScopeOption {
  id: string;
  label: string;
  description: string;
  requiredFor: string;
}

const AVAILABLE_SCOPES: ScopeOption[] = [
  {
    id: "offline_access",
    label: "offline_access",
    description: "Enables offline token refresh (keep signed in)",
    requiredFor: "General session persistence",
  },
  {
    id: "profile",
    label: "profile",
    description: "Retrieve user email and name",
    requiredFor: "Settings page display",
  },
  {
    id: "family:devices:view",
    label: "family:devices:view",
    description: "View list of Yoto devices",
    requiredFor: "Dashboard Player list",
  },
  {
    id: "family:devices:control",
    label: "family:devices:control",
    description: "Control player playback/volume/timers",
    requiredFor: "Dashboard controls",
  },
  {
    id: "family:devices:manage",
    label: "family:devices:manage",
    description: "Manage device settings",
    requiredFor: "Settings API controls",
  },
  {
    id: "family:view",
    label: "family:view",
    description: "View family members details",
    requiredFor: "Family page list",
  },
  {
    id: "family:library:view",
    label: "family:library:view",
    description: "View card library",
    requiredFor: "Library page cards list",
  },
  {
    id: "family:library:manage",
    label: "family:library:manage",
    description: "Manage card library",
    requiredFor: "Advanced Library tools",
  },
  {
    id: "user:content:view",
    label: "user:content:view",
    description: "View MYO playlists and content",
    requiredFor: "Playlists page list",
  },
  {
    id: "user:content:manage",
    label: "user:content:manage",
    description: "Create and edit MYO playlists",
    requiredFor: "Playlist creator/editor",
  },
];

export function ConnectYotoCard() {
  const [loading, setLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedScopes, setSelectedScopes] = useState<string[]>(AVAILABLE_SCOPES.map((s) => s.id));
  const [audience, setAudience] = useState("https://api.yotoplay.com");
  const [skipAudience, setSkipAudience] = useState(false);

  const toggleScope = (scopeId: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scopeId) ? prev.filter((s) => s !== scopeId) : [...prev, scopeId],
    );
  };

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

      const scopesParam = selectedScopes.join(" ");
      const audienceParam = skipAudience ? "skip" : audience;

      let authUrl = `/api/yoto/authorize?access_token=${encodeURIComponent(token)}`;
      if (scopesParam) {
        authUrl += `&scopes=${encodeURIComponent(scopesParam)}`;
      }
      if (audienceParam) {
        authUrl += `&audience=${encodeURIComponent(audienceParam)}`;
      }

      window.location.href = authUrl;
    } catch (e) {
      setLoading(false);
      toast.error(e instanceof Error ? e.message : "Failed to start OAuth");
    }
  };

  return (
    <Card className="relative overflow-hidden border-primary/30 bg-card/60 backdrop-blur">
      <div className="absolute inset-0 opacity-60" style={{ background: "var(--gradient-hero)" }} />
      <CardContent className="relative flex flex-col gap-6 p-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
              <Radio className="size-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Connect your Yoto account</h2>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                Sign in with Yoto to see every player, control playback, edit MYO playlists, and
                manage your family — all from one place.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                setShowAdvanced(!showAdvanced);
              }}
              className="flex items-center gap-1.5"
            >
              <Settings2 className="size-4" />
              Advanced
              {showAdvanced ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
            </Button>
            <Button size="lg" onClick={connect} disabled={loading}>
              {loading ? "Redirecting…" : "Connect Yoto"}
            </Button>
          </div>
        </div>

        {showAdvanced && (
          <div className="mt-4 rounded-xl border border-border/60 bg-background/50 p-6 space-y-6 text-left">
            <div className="rounded-lg bg-primary/5 p-4 text-sm text-foreground flex items-start gap-3 border border-primary/10">
              <Info className="size-5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium text-primary">Dynamic OAuth Configurations</p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  If your Yoto Client ID does not support certain advanced scopes (which triggers an{" "}
                  <strong>access_denied</strong> error from Auth0), you can uncheck them below. In
                  most cases, selecting only <code>offline_access</code>, <code>profile</code>, and{" "}
                  <code>family:devices:view</code> is the safest minimal fallback.
                </p>
              </div>
            </div>

            {/* Scope selection */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold tracking-wide">Request Scopes</Label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {AVAILABLE_SCOPES.map((s) => {
                  const isChecked = selectedScopes.includes(s.id);
                  return (
                    <div
                      key={s.id}
                      onClick={() => toggleScope(s.id)}
                      className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-all ${
                        isChecked
                          ? "border-primary/50 bg-primary/5 shadow-sm"
                          : "border-border hover:border-border/80 bg-card/20"
                      }`}
                    >
                      <Checkbox
                        id={`scope-${s.id}`}
                        checked={isChecked}
                        onCheckedChange={() => toggleScope(s.id)}
                        className="mt-0.5"
                      />
                      <div className="space-y-0.5 select-none">
                        <Label
                          htmlFor={`scope-${s.id}`}
                          className="font-mono text-xs font-semibold cursor-pointer"
                        >
                          {s.label}
                        </Label>
                        <p className="text-muted-foreground text-[11px] leading-tight">
                          {s.description}
                        </p>
                        <p className="text-primary/70 text-[10px] font-medium italic">
                          Used for: {s.requiredFor}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Audience selection */}
            <div className="space-y-3 pt-4 border-t border-border/40">
              <Label className="text-sm font-semibold tracking-wide">Audience Parameter</Label>
              <div className="space-y-4 max-w-md">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="skip-audience"
                    checked={skipAudience}
                    onCheckedChange={(checked) => setSkipAudience(Boolean(checked))}
                  />
                  <Label
                    htmlFor="skip-audience"
                    className="text-xs font-medium text-muted-foreground cursor-pointer select-none"
                  >
                    Skip sending the Audience parameter entirely
                  </Label>
                </div>

                {!skipAudience && (
                  <div className="space-y-1.5">
                    <Label htmlFor="audience-input" className="text-xs font-medium">
                      Audience URL
                    </Label>
                    <Input
                      id="audience-input"
                      type="text"
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      placeholder="e.g. https://api.yotoplay.com"
                      className="bg-background/80"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
