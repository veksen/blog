const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * typescript packages.
 */

module.exports = {
  extends: [
    "turbo",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  overrides: [
    {
      files: ["*.js"],
      parser: "espree",
      parserOptions: {
        ecmaVersion: 2020,
      },
    },
  ],
  plugins: ["prettier", "import", "@typescript-eslint"],
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    project,
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "spaced-comment": 1,
    "import/order": [
      1,
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
        },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "never",
        pathGroups: [
          {
            group: "external",
            pattern: "astro/*",
            position: "before",
          },
          {
            group: "external",
            pattern: "astro:*",
            position: "before",
          },
          {
            group: "external",
            pattern: "astro",
            position: "before",
          },
          {
            group: "external",
            pattern: "react*",
            position: "before",
          },
          {
            group: "internal",
            pattern: "@veksen/**",
          },
          {
            group: "internal",
            pattern: "components/**",
          },
          {
            group: "internal",
            pattern: "hooks/**",
          },
          {
            group: "internal",
            pattern: "pages/**",
          },
          {
            group: "internal",
            pattern: "styles/**",
          },
          {
            group: "internal",
            pattern: "types",
          },
        ],
        pathGroupsExcludedImportTypes: ["react*", "astro*", "external, builtin"],
      },
    ],
  },
  ignorePatterns: ["node_modules/", "dist/"],
};
