export function renderErrorPage(error?: unknown): string {
  const errorMsg = error instanceof Error ? error.message : String(error || "Unknown SSR error");
  const stack = error instanceof Error ? error.stack : "";

  // Check env vars safely on server
  const supabaseUrl = process.env.SUPABASE_URL || "";
  const supabaseAnon = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || "";
  const supabaseService = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const yotoClientId = process.env.YOTO_CLIENT_ID || "";
  const yotoClientSecret = process.env.YOTO_CLIENT_SECRET || "";
  const yotoTokenEncKey = process.env.YOTO_TOKEN_ENC_KEY || "";

  const envs = [
    { name: "SUPABASE_URL", status: !!supabaseUrl, desc: "Supabase Project URL" },
    { name: "SUPABASE_ANON_KEY", status: !!supabaseAnon, desc: "Supabase Anonymous API key" },
    {
      name: "SUPABASE_SERVICE_ROLE_KEY",
      status: !!supabaseService,
      desc: "Supabase Admin Service Role key (for OAuth state persistence)",
    },
    { name: "YOTO_CLIENT_ID", status: !!yotoClientId, desc: "Yoto Developer Portal Client ID" },
    {
      name: "YOTO_CLIENT_SECRET",
      status: !!yotoClientSecret,
      desc: "Yoto Developer Portal Client Secret",
    },
    {
      name: "YOTO_TOKEN_ENC_KEY",
      status: !!yotoTokenEncKey,
      desc: "Any custom secret string (used to encrypt tokens at rest)",
    },
  ];

  const envListHtml = envs
    .map(
      (env) => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; border-bottom: 1px solid #e5e7eb; font-size: 0.875rem;">
      <div style="text-align: left;">
        <strong style="font-family: monospace; font-size: 0.9rem; color: #111;">${env.name}</strong>
        <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.1rem;">${env.desc}</div>
      </div>
      <div>
        ${
          env.status
            ? '<span style="background: #d1fae5; color: #065f46; padding: 0.125rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;">Configured</span>'
            : '<span style="background: #fee2e2; color: #991b1b; padding: 0.125rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;">Missing</span>'
        }
      </div>
    </div>
  `,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Yoto Hub Diagnostics</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 14px/1.5 system-ui, -apple-system, sans-serif; background: #f3f4f6; color: #1f2937; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 1.5rem; box-sizing: border-box; }
      .card { max-width: 36rem; width: 100%; background: #ffffff; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); padding: 2.25rem; box-sizing: border-box; }
      h1 { font-size: 1.5rem; margin: 0 0 0.5rem; color: #111827; font-weight: 700; display: flex; align-items: center; gap: 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; font-size: 0.95rem; line-height: 1.5; }
      .env-panel { border: 1px solid #e5e7eb; border-radius: 0.5rem; overflow: hidden; margin-bottom: 1.5rem; background: #fafafa; }
      .env-header { background: #f9fafb; padding: 0.75rem; font-weight: 600; border-bottom: 1px solid #e5e7eb; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; color: #4b5563; text-align: left; }
      .actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin-top: 1.5rem; }
      a, button { padding: 0.625rem 1.25rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; font-weight: 500; display: inline-flex; align-items: center; gap: 0.375rem; }
      .primary { background: #2563eb; color: #fff; }
      .primary:hover { background: #1d4ed8; }
      .secondary { background: #fff; color: #374151; border-color: #d1d5db; }
      .secondary:hover { background: #f9fafb; }
      .error-details { background: #fee2e2; border: 1px solid #fca5a5; border-radius: 0.5rem; padding: 1rem; color: #991b1b; text-align: left; font-size: 0.825rem; margin-bottom: 1.5rem; overflow-x: auto; }
      .error-title { font-weight: 700; margin-bottom: 0.25rem; }
      .error-stack { font-family: monospace; white-space: pre-wrap; font-size: 0.75rem; margin-top: 0.5rem; max-height: 12rem; overflow-y: auto; background: rgba(255, 255, 255, 0.5); padding: 0.5rem; border-radius: 0.25rem; }
      .badge-logo { background: #ff5a00; color: white; border-radius: 0.5rem; width: 2rem; height: 2rem; display: inline-flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.2rem; }
    </style>
  </head>
  <body>
    <div class="card">
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
        <div class="badge-logo">Y</div>
        <h1 style="margin: 0;">Yoto Hub Connection Diagnostics</h1>
      </div>

      <p>
        The server encountered an issue while loading the application page. This is usually caused by missing or incorrect environment variables in your deployment.
      </p>

      ${
        errorMsg
          ? `
        <div class="error-details">
          <div class="error-title">Technical Error Detail:</div>
          <div>${errorMsg}</div>
          ${stack ? `<div class="error-stack">${stack}</div>` : ""}
        </div>
      `
          : ""
      }

      <div class="env-panel">
        <div class="env-header">Required Environment Variables</div>
        ${envListHtml}
      </div>

      <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 0.5rem; padding: 1rem; margin-bottom: 1.5rem; text-align: left; font-size: 0.85rem;">
        <strong style="color: #1e40af;">How to fix:</strong>
        <ol style="margin: 0.5rem 0 0; padding-left: 1.25rem; color: #1e3a8a; line-height: 1.4;">
          <li>Go to your <strong>Vercel Project Dashboard</strong>.</li>
          <li>Navigate to <strong>Settings</strong> &gt; <strong>Environment Variables</strong>.</li>
          <li>Add the missing environment variables shown above.</li>
          <li><strong>Redeploy</strong> your project on Vercel for the changes to take effect.</li>
        </ol>
      </div>

      <div class="actions">
        <button class="primary" onclick="location.reload()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline;"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.72 2.78L21 8"></path><polyline points="21 3 21 8 16 8"></polyline></svg>
          Try again
        </button>
        <a class="secondary" href="/">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline;"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Go home
        </a>
      </div>
    </div>
  </body>
</html>`;
}
