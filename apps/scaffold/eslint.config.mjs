import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/components/**/*.{ts,tsx}"],
    rules: {
      // Design-system demo components intentionally include raw <img> for dynamic/preview sources.
      "@next/next/no-img-element": "off",
    },
  },
  {
    rules: {
      // Enforce hooks rules as errors, not warnings
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      // Ban any
      "@typescript-eslint/no-explicit-any": "error",
      // No unused vars (allow underscore prefix for intentional ignores)
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "blob-report/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
