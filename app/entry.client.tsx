/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { getEnv } from "@env";
import { RemixBrowser } from "@remix-run/react";

async function enableMocking() {
  if (getEnv("VITE_MOCKS") === "true") {
    const { browserWorker } = await import("@mocks/browser");
    return browserWorker.start();
  }

  return Promise.resolve()
}

enableMocking()
  .then(() => {
    startTransition(() => {
      hydrateRoot(
        document,
        <StrictMode>
          <RemixBrowser />
        </StrictMode>,
      );
    });
  })
  .catch(() => console.log("cannot enable mocking"));

