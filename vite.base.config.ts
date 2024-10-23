import react from "@vitejs/plugin-react";
import { type PluginOption, defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export const plugins: PluginOption[] = [tsconfigPaths(), svgr()];

export default defineConfig({
  plugins: [react(), ...plugins],
});
