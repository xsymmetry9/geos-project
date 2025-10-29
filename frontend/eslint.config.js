// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint"; // ✅ flat presets + parser + plugin
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Ignore build artifacts
  { ignores: ["node_modules/**", "dist/**", "build/**"] },

  // Base recommended configs (flat)
  js.configs.recommended,
  ...tseslint.configs.recommended,           // ✅ flat TS presets
  react.configs.flat.recommended,            // ✅ flat React preset
  // (optional) you can add import plugin’s flat preset if you like:
  // (uncomment if you want rules) import { default as importFlat } from "eslint-plugin-import/config/recommended.js";
  // importFlat,

  // Your project-specific settings and rules LAST (so they override)
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,               // ✅ use tseslint parser, not string
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        // If you want type-aware rules, add:
        // project: ["./tsconfig.json"]
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin, // ✅ ts plugin from umbrella
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
        alias: { map: [["@", "./src"]], extensions: [".ts", ".tsx", ".js", ".jsx"] },
      },
    },
    rules: {
      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // Prefer the TS version of the rule
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      "no-console": "warn",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
    },
  },
];
