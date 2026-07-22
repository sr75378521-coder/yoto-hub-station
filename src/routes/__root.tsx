import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { supabase } from "@/integrations/supabase/client";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  const isSupabaseConfigError =
    error?.message?.includes("Supabase environment variable") ||
    error?.message?.includes("Supabase client is not configured") ||
    error?.message?.includes("Missing Supabase environment variable");

  if (isSupabaseConfigError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-6">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <h1 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
            Connect Supabase to proceed
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This application requires a Supabase connection to store players, playlists, and cards.
          </p>

          <div className="mt-5 text-left rounded-lg bg-muted/60 p-4 border border-border/40 text-xs text-muted-foreground space-y-3">
            <p className="font-semibold text-foreground">How to fix this on Vercel:</p>
            <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
              <li>Go to your project in the <strong className="text-foreground">Vercel Dashboard</strong>.</li>
              <li>Navigate to <strong className="text-foreground">Settings &gt; Environment Variables</strong>.</li>
              <li>Add the following environment variables:
                <ul className="list-disc list-inside pl-4 mt-1 space-y-1 text-[11px] font-mono">
                  <li><strong className="text-foreground">SUPABASE_URL</strong>: your-supabase-project-url</li>
                  <li><strong className="text-foreground">SUPABASE_ANON_KEY</strong>: your-anon-key</li>
                </ul>
              </li>
              <li>Go to the <strong className="text-foreground">Deployments</strong> tab and redeploy the latest commit to apply the changes.</li>
            </ol>
            <p className="pt-2 text-[11px] leading-relaxed border-t border-border/20">
              💡 <strong>Pro tip:</strong> If using Lovable, click "Connect Supabase" in the Lovable editor to automatically configure these variables for you.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => {
                router.invalidate();
                reset();
              }}
              className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Try again after setting variables
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Yoto Control Center — Manage every Yoto player" },
      {
        name: "description",
        content:
          "A modern dashboard for every Yoto player, playlist, and MYO card. Real-time controls, family view, and MYO playlist editing.",
      },
      { name: "author", content: "Yoto Control Center" },
      { property: "og:title", content: "Yoto Control Center — Manage every Yoto player" },
      {
        property: "og:description",
        content:
          "A modern dashboard for every Yoto player, playlist, and MYO card. Real-time controls, family view, and MYO playlist editing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yoto Control Center — Manage every Yoto player" },
      { name: "twitter:description", content: "A modern dashboard for every Yoto player, playlist, and MYO card. Real-time controls, family view, and MYO playlist editing." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7af3aa7d-b019-4d0d-8bcc-8c59bd1e5467/id-preview-75745274--65272925-719d-4f89-ab58-d897d4f056e0.lovable.app-1784656861101.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7af3aa7d-b019-4d0d-8bcc-8c59bd1e5467/id-preview-75745274--65272925-719d-4f89-ab58-d897d4f056e0.lovable.app-1784656861101.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  // Extract public Supabase variables on the server-side to pass them safely to the client.
  const supabaseUrl = typeof process !== "undefined" ? process.env.SUPABASE_URL : undefined;
  const supabasePublishableKey = typeof process !== "undefined"
    ? (process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY)
    : undefined;

  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        {supabaseUrl && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__SUPABASE_URL__ = ${JSON.stringify(supabaseUrl)};`,
            }}
          />
        )}
        {supabasePublishableKey && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__SUPABASE_PUBLISHABLE_KEY__ = ${JSON.stringify(supabasePublishableKey)};`,
            }}
          />
        )}
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    let sub: { subscription: { unsubscribe: () => void } } | undefined;
    try {
      sub = supabase.auth.onAuthStateChange((event) => {
        if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
        router.invalidate();
        if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
      }) as typeof sub;
    } catch (e) {
      console.error('[Supabase] Auth listener setup failed:', e);
    }
    return () => sub?.subscription.unsubscribe();
  }, [queryClient, router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}

