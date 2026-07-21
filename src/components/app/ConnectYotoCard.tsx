import { useState } from "react";
import { Radio } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export function ConnectYotoCard() {
  const [loading, setLoading] = useState(false);

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

  return (
    <Card className="relative overflow-hidden border-primary/30 bg-card/60 backdrop-blur">
      <div className="absolute inset-0 opacity-60" style={{ background: "var(--gradient-hero)" }} />
      <CardContent className="relative flex flex-col items-start gap-4 p-8 md:flex-row md:items-center md:justify-between">
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
        <Button size="lg" onClick={connect} disabled={loading} className="shrink-0">
          {loading ? "Redirecting…" : "Connect Yoto"}
        </Button>
      </CardContent>
    </Card>
  );
}
