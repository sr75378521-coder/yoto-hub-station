/**
 * Yoto OAuth + API configuration.
 * Endpoints follow Yoto's public Auth0 tenant.
 */
export const YOTO_AUTH_BASE = "https://login.yotoplay.com";
export const YOTO_API_BASE = "https://api.yotoplay.com";

// Audience is optional — if the Yoto OAuth client isn't authorized for this
// audience, Auth0 returns access_denied. Set YOTO_AUDIENCE env var to override
// or set it to "skip" to omit the audience param entirely.
const envAudience = process.env.YOTO_AUDIENCE;
export const YOTO_AUDIENCE: string | null =
  envAudience === "skip" ? null : (envAudience ?? "https://api.yotoplay.com");

// Server endpoint for user's personal playlists (requires server-side proxy)
export const YOTO_CONTENT_SERVER = "https://content.yotoplay.com";

// Scopes requested during OAuth. The client must be authorized for each scope.
// If a scope is not permitted, Auth0 returns access_denied.
// Default to the minimum scopes needed for authentication + device access.
export const YOTO_SCOPES =
  process.env.YOTO_SCOPES ?? "openid profile offline_access family:devices:view";

// Additional scopes for MYO playlist editing and content reading.
// These are optional — if they cause access_denied, set YOTO_SCOPES env var
// to reduce to just the essential scopes.
export const YOTO_EXTENDED_SCOPES =
  "myo:playlists:view myo:playlists:edit content:read";

export const YOTO_CALLBACK_PATH = "/api/yoto/callback";
