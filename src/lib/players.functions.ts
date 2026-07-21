import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { yotoGetJson, YotoNotConnectedError } from "@/lib/yoto/api.server";
import { deleteConnection } from "@/lib/yoto/tokens.server";

export interface PlayerSummary {
  deviceId: string;
  name: string;
  online: boolean;
  deviceType?: string | null;
  deviceFamily?: string | null;
  description?: string | null;
  releaseChannel?: string | null;
}

export interface DashboardData {
  connected: boolean;
  players: PlayerSummary[];
  errorMessage?: string;
}

interface YotoDevicesResponse {
  devices?: Array<{
    deviceId: string;
    name?: string;
    online?: boolean;
    deviceType?: string;
    deviceFamily?: string;
    description?: string;
    releaseChannel?: string;
  }>;
}

export const getDashboardData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<DashboardData> => {
    try {
      const data = await yotoGetJson<YotoDevicesResponse>(
        context.userId,
        "/device-v2/devices/mine",
      );
      const players: PlayerSummary[] = (data.devices ?? []).map((d) => ({
        deviceId: d.deviceId,
        name: d.name ?? "Yoto Player",
        online: Boolean(d.online),
        deviceType: d.deviceType ?? null,
        deviceFamily: d.deviceFamily ?? null,
        description: d.description ?? null,
        releaseChannel: d.releaseChannel ?? null,
      }));
      return { connected: true, players };
    } catch (e) {
      if (e instanceof YotoNotConnectedError) {
        return { connected: false, players: [] };
      }
      return {
        connected: true,
        players: [],
        errorMessage: e instanceof Error ? e.message : "Unknown error",
      };
    }
  });

export const getYotoConnectionStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ connected: boolean; yotoUserId: string | null }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("yoto_connections")
      .select("yoto_user_id")
      .eq("user_id", context.userId)
      .maybeSingle();
    return { connected: !!data, yotoUserId: data?.yoto_user_id ?? null };
  });

export const disconnectYoto = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await deleteConnection(context.userId);
    return { ok: true };
  });
