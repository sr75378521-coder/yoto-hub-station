/**
 * Yoto OAuth + API configuration.
 * Endpoints follow Yoto's public Auth0 tenant.
 */
export const YOTO_AUTH_BASE = "https://login.yotoplay.com";
export const YOTO_API_BASE = "https://api.yotoplay.com";
export const YOTO_AUDIENCE = "https://api.yotoplay.com";
// Server endpoint for user's personal playlists (requires server-side proxy)
export const YOTO_CONTENT_SERVER = "https://content.yotoplay.com";
export const YOTO_SCOPES = "openid profile offline_access family:devices:view";
export const YOTO_CALLBACK_PATH = "/api/yoto/callback";
