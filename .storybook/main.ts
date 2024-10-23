import type { StorybookConfig } from "@storybook/react-vite";

export default {
  stories: ["../app/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: "./vite.base.config.ts",
      },
    },
  },
  core: {
    disableTelemetry: true,
  },
} satisfies StorybookConfig;
