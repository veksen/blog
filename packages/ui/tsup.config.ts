import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entryPoints: ["src/bubbly-background.tsx", "src/button.tsx", "src/logo.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  external: ["react"],
  ...options,
}));
