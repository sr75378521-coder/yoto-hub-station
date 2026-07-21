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

// Family Data Types
export interface FamilyMember {
  userId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profileImage?: string;
  role?: string;
}

export interface FamilyData {
  connected: boolean;
  members: FamilyMember[];
  errorMessage?: string;
}

interface YotoFamilyResponse {
  users?: Array<{
    userId: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    profileImage?: string;
    role?: string;
  }>;
}

export const getFamilyData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<FamilyData> => {
    try {
      const data = await yotoGetJson<YotoFamilyResponse>(
        context.userId,
        "/family/users",
      );
      const members: FamilyMember[] = (data.users ?? []).map((u) => ({
        userId: u.userId,
        firstName: u.firstName ?? "User",
        lastName: u.lastName ?? "",
        email: u.email ?? "",
        profileImage: u.profileImage ?? "",
        role: u.role ?? "member",
      }));
      return { connected: true, members };
    } catch (e) {
      if (e instanceof YotoNotConnectedError) {
        return { connected: false, members: [] };
      }
      return {
        connected: true,
        members: [],
        errorMessage: e instanceof Error ? e.message : "Unknown error",
      };
    }
  });

// Playlist Types
export interface PlaylistTrack {
  trackId: string;
  title?: string;
  duration?: number;
  artist?: string;
  artwork?: string;
}

export interface PlaylistSummary {
  playlistId: string;
  name: string;
  type?: string;
  artwork?: string;
  duration?: number;
  trackCount?: number;
  createdDate?: string;
  isEditable?: boolean;
}

export interface PlaylistData {
  connected: boolean;
  playlists: PlaylistSummary[];
  errorMessage?: string;
}

interface YotoPlaylistsResponse {
  playlists?: Array<{
    playlistId: string;
    name?: string;
    type?: string;
    artwork?: string;
    duration?: number;
    trackCount?: number;
    createdDate?: string;
    isEditable?: boolean;
  }>;
}

export const getPlaylistsData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<PlaylistData> => {
    try {
      const data = await yotoGetJson<YotoPlaylistsResponse>(
        context.userId,
        "/playlist-v2/playlists",
      );
      const playlists: PlaylistSummary[] = (data.playlists ?? []).map((p) => ({
        playlistId: p.playlistId,
        name: p.name ?? "Untitled Playlist",
        type: p.type ?? "playlist",
        artwork: p.artwork ?? "",
        duration: p.duration ?? 0,
        trackCount: p.trackCount ?? 0,
        createdDate: p.createdDate ?? "",
        isEditable: p.isEditable ?? false,
      }));
      return { connected: true, playlists };
    } catch (e) {
      if (e instanceof YotoNotConnectedError) {
        return { connected: false, playlists: [] };
      }
      return {
        connected: true,
        playlists: [],
        errorMessage: e instanceof Error ? e.message : "Unknown error",
      };
    }
  });

export const getPlaylistDetails = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context, data }: { context: any; data: { playlistId: string } }) => {
    try {
      const response = await yotoGetJson<any>(
        context.userId,
        `/playlist-v2/playlists/${data.playlistId}`,
      );
      return { success: true, playlist: response };
    } catch (e) {
      return {
        success: false,
        error: e instanceof Error ? e.message : "Unknown error",
      };
    }
  });

// Settings Types
export interface UserSettings {
  theme?: string;
  notifications?: boolean;
  apiStatus?: string;
  accountEmail?: string;
  accountName?: string;
}

export interface SettingsData {
  connected: boolean;
  settings: UserSettings;
  errorMessage?: string;
}

export const getSettingsData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<SettingsData> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: userData } = await supabaseAdmin.auth.admin.getUserById(context.userId);
      const accountEmail = userData?.user?.email ?? "";
      const accountName = userData?.user?.user_metadata?.full_name ?? "User";

      return {
        connected: true,
        settings: {
          theme: "auto",
          notifications: true,
          apiStatus: "connected",
          accountEmail,
          accountName,
        },
      };
    } catch (e) {
      return {
        connected: true,
        settings: {},
        errorMessage: e instanceof Error ? e.message : "Unknown error",
      };
    }
  });
