# Turborepo Design System Starter

This guide explains how to use a React design system starter powered by:

- 🏎 [Turborepo](https://turbo.build/repo) — High-performance build system for Monorepos
- 🚀 [React](https://reactjs.org/) — JavaScript library for user interfaces
- 🛠 [Tsup](https://github.com/egoist/tsup) — TypeScript bundler powered by esbuild

As well as a few others tools preconfigured:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e design-system
```

### Useful Commands

- `pnpm build` - Build all packages
- `pnpm dev` - Run all packages locally
- `pnpm lint` - Lint all packages
- `pnpm clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)

## Turborepo

[Turborepo](https://turbo.build/repo) is a high-performance build system for JavaScript and TypeScript codebases. It was designed after the workflows used by massive software engineering organizations to ship code at scale. Turborepo abstracts the complex configuration needed for monorepos and provides fast, incremental builds with zero-configuration remote caching.

Using Turborepo simplifies managing your design system monorepo, as you can have a single lint, build, test, and release process for all packages. [Learn more](https://vercel.com/blog/monorepos-are-changing-how-teams-build-software) about how monorepos improve your development workflow.

## Apps & Packages

This Turborepo includes the following packages and applications:

- `apps/blog`: Blog site
- `packages/ui`: Core React components
- `packages/utils`: Shared React utilities
- `packages/typescript-config`: Shared `tsconfig.json`s used throughout the Turborepo
- `packages/eslint-config`: ESLint preset

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/). Workspaces enables us to "hoist" dependencies that are shared between packages to the root `package.json`. This means smaller `node_modules` folders and a better local dev experience. To install a dependency for the entire monorepo, use the `-w` workspaces flag with `pnpm add`.

This example sets up your `.gitignore` to exclude all generated files, other folders like `node_modules` used to store your dependencies.

### Compilation

To make the core library code work across all browsers, we need to compile the raw TypeScript and React code to plain JavaScript. We can accomplish this with `tsup`, which uses `esbuild` to greatly improve performance.

Running `pnpm build` from the root of the Turborepo will run the `build` command defined in each package's `package.json` file. Turborepo runs each `build` in parallel and caches & hashes the output to speed up future builds.

For `acme-core`, the `build` command is the following:

```bash
tsup src/index.tsx --format esm,cjs --dts --external react
```

`tsup` compiles `src/index.tsx`, which exports all of the components in the design system, into both ES Modules and CommonJS formats as well as their TypeScript types. The `package.json` for `acme-core` then instructs the consumer to select the correct format:

```json:acme-core/package.json
{
  "name": "@acme/core",
  "version": "0.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "sideEffects": false,
}
```

Run `pnpm build` to confirm compilation is working correctly. You should see a folder `acme-core/dist` which contains the compiled output.

```bash
acme-core
└── dist
    ├── index.d.ts  <-- Types
    ├── index.js    <-- CommonJS version
    └── index.mjs   <-- ES Modules version
```

## Components

Each file inside of `acme-core/src` is a component inside our design system. For example:

```tsx:acme-core/src/Button.tsx
import * as React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
}

export function Button(props: ButtonProps) {
  return <button>{props.children}</button>;
}

Button.displayName = 'Button';
```

When adding a new file, ensure the component is also exported from the entry `index.tsx` file:

```tsx:acme-core/src/index.tsx
import * as React from "react";
export { Button, type ButtonProps } from "./Button";
// Add new component exports here
```
