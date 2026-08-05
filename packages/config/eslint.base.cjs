/**
 * Shared ESLint baseline for Lumbre workspaces.
 * Extend from apps/packages: `extends: [require.resolve('@lumbre/config/eslint.base.cjs')]`
 * Requires eslint + typescript-eslint installed in the consuming package.
 */
module.exports = {
  root: false,
  env: {
    es2022: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  ignorePatterns: ["dist/", "node_modules/", "coverage/", ".expo/"],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { prefer: "type-imports", fixStyle: "separate-type-imports" },
    ],
    "no-console": ["warn", { allow: ["warn", "error"] }],
  },
};
