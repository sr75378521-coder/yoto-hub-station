export function renderErrorPage(error?: unknown): string {
  const errMsg = error instanceof Error ? error.message : typeof error === 'string' ? error : '';
  const isSupabaseConfigError =
    errMsg.includes("Supabase environment variable") ||
    errMsg.includes("Supabase client is not configured") ||
    errMsg.includes("Missing Supabase environment variable");

  if (isSupabaseConfigError) {
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Connect Supabase to proceed</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 14px/1.5 system-ui, -apple-system, sans-serif; background: #0b0f19; color: #f3f4f6; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; background: #151c2c; border: 1px solid #1e293b; border-radius: 1rem; box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.5); }
      .icon { margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; width: 3rem; height: 3rem; border-radius: 50%; background: rgba(239, 68, 68, 0.1); color: #ef4444; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; font-weight: 600; color: #ffffff; }
      p { color: #9ca3af; margin: 0 0 1.5rem; font-size: 0.9rem; }
      .guide { text-align: left; background: rgba(0, 0, 0, 0.2); padding: 1rem; border-radius: 0.5rem; border: 1px solid rgba(255, 255, 255, 0.05); font-size: 0.8rem; color: #9ca3af; margin-bottom: 1.5rem; }
      .guide-title { font-weight: 600; color: #f3f4f6; margin-bottom: 0.5rem; }
      ol { margin: 0; padding-left: 1.25rem; }
      li { margin-bottom: 0.5rem; line-height: 1.4; }
      ul { margin: 0.25rem 0 0; padding-left: 1.25rem; font-family: monospace; font-size: 0.75rem; color: #e5e7eb; }
      .actions { display: flex; justify-content: center; }
      button { width: 100%; padding: 0.625rem 1rem; border-radius: 0.375rem; font: inherit; font-weight: 500; cursor: pointer; text-decoration: none; border: none; background: #3b82f6; color: #ffffff; transition: background 0.15s; }
      button:hover { background: #2563eb; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
      <h1>Connect Supabase to proceed</h1>
      <p>This application requires a Supabase connection to store players, playlists, and cards.</p>

      <div class="guide">
        <div class="guide-title">How to fix this on Vercel:</div>
        <ol>
          <li>Go to your project in the <strong>Vercel Dashboard</strong>.</li>
          <li>Navigate to <strong>Settings &gt; Environment Variables</strong>.</li>
          <li>Add the following environment variables:
            <ul>
              <li><strong>SUPABASE_URL</strong>: your-supabase-project-url</li>
              <li><strong>SUPABASE_ANON_KEY</strong>: your-anon-key</li>
            </ul>
          </li>
          <li>Go to the <strong>Deployments</strong> tab and redeploy the latest commit to apply the changes.</li>
        </ol>
      </div>

      <div class="actions">
        <button onclick="location.reload()">Try again after setting variables</button>
      </div>
    </div>
  </body>
</html>`;
  }

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .details { text-align: left; margin: 1rem 0; border: 1px solid #e5e7eb; border-radius: 0.375rem; background: #f9fafb; }
      summary { cursor: pointer; padding: 0.5rem; font-size: 0.75rem; color: #6b7280; font-weight: 500; outline: none; }
      .details-content { padding: 0.5rem; font-family: monospace; font-size: 0.7rem; color: #dc2626; border-top: 1px solid #e5e7eb; overflow: auto; max-height: 10rem; white-space: pre-wrap; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>

      ${error ? `
      <details class="details">
        <summary>View error details</summary>
        <div class="details-content">
          <strong>Error:</strong> ${error instanceof Error ? error.message : String(error)}
          ${error instanceof Error && error.stack ? `<br/><br/><strong>Stack:</strong><br/>${error.stack}` : ''}
        </div>
      </details>
      ` : ''}

      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
