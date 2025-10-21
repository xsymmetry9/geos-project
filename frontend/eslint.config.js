import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginImport from "eslint-plugin-import";
import pluginTs from "@typescript-eslint/eslint-plugin";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["node_modules/", "dist/", "build/**/*"],
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"], // Include TS & TSX here
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: "@typescript-eslint/parser", // Use TS parser
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "jsx-a11y": pluginJsxA11y,
      import: pluginImport,
      "@typescript-eslint": pluginTs,
    },
    rules: {
      // React Rules
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // General JavaScript Rules
      "no-unused-vars": "off", // Turn off base rule, use TS version below
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Use TS rule
      "no-console": "warn",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],

      // Add any TypeScript specific rules here if needed
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"], // add TS extensions
        },
        alias: [["@", "./src"]],
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginTs.configs.recommended, // Add recommended TS rules
];
