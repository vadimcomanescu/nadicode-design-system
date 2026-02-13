import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    exclude: ["e2e/**", "node_modules/**"],
    setupFiles: ["./vitest-setup.ts"],
    coverage: {
      include: [
        "src/app/**/*.{ts,tsx}",
        "src/hooks/**/*.{ts,tsx}",
        "src/lib/**/*.{ts,tsx}",
      ],
      exclude: [
        "**/*.test.*",
        // Vendored design system utilities (covered by integrity suite)
        "src/hooks/use-is-in-view.tsx",
        "src/hooks/use-mobile.ts",
        "src/hooks/use-motion-value-state.tsx",
        "src/hooks/use-reduced-motion.ts",
        "src/hooks/use-token.ts",
        "src/lib/animation-dials.ts",
        "src/lib/animation.tokens.ts",
        "src/lib/get-strict-context.tsx",
        "src/lib/motion.ts",
        "src/lib/patterns.ts",
      ],
      thresholds: {
        statements: 90,
        branches: 85,
        functions: 90,
        lines: 90,
      },
    },
  },
});
