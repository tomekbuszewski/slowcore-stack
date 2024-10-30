import { getEnv } from "@env";

/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */
async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { browserWorker } = await import("@mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return browserWorker.start();
}

import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { RemixBrowser } from "@remix-run/react";

if (getEnv("VITE_MOCKS") === "true") {
  enableMocking().catch(() => console.log("cannot enable mocking"));
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>,
  );
});
