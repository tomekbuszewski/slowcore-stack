import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const BASE_URL = "http://localhost:3000";
const desktopConfig = {
  viewport: { width: 1400, height: 1000 },
};

export default defineConfig({
  testDir: "./app/e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Chromium (Chrome, Edge, Arc etc.)",
      use: {
        ...devices["Desktop Chrome"],
        ...desktopConfig,
      },
    },

    {
      name: "Firefox (Firefox, Floorp, etc.)",
      use: { ...devices["Desktop Firefox"], ...desktopConfig },
    },

    {
      name: "WebKit (Safari, SigmaOS)",
      use: { ...devices["Desktop Safari"], ...desktopConfig },
    },

    // /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "VITE_MOCKS=true pnpm run build && VITE_MOCKS=true pnpm run start",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
  },
});
