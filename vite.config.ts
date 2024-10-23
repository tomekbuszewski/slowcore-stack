import type { UserConfig } from "vite";

import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { remixDevTools } from "remix-development-tools";
import { flatRoutes } from "remix-flat-routes";
import { defineConfig } from "vite";

import { vitePlugin as remix } from "@remix-run/dev";

import { plugins as basePlugins } from "./vite.base.config";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

dotenv.config();

export default defineConfig(({ mode }) => {
  const isTest = mode === "test";
  const plugins: UserConfig["plugins"] = [...basePlugins];

  if (isTest) {
    plugins.push(react());
  } else {
    plugins.push(
      remixDevTools(),
      remix({
        routes: (defineRoutes) => flatRoutes("routes", defineRoutes),
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
        },
      }),
    );
  }

  return {
    envPrefix: "VITE_",
    define: {
      "process.env": process.env,
    },
    test: {
      globals: true,
      environment: "happy-dom",
      setupFiles: ["./config/test.setup.ts"],
    },
    plugins,
  };
});
