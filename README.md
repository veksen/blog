# My personal website

My personal site with a blog for my rambles about programming and life, built with Astro and React.

## Tech Stack

- 🚀 [Astro](https://astro.build/) — Static site generator with excellent performance
- ⚛️ [React](https://reactjs.org/) — JavaScript library for user interfaces
- 📝 [MDX](https://mdxjs.com/) — Markdown for the component era
- 🏎 [Turborepo](https://turbo.build/repo) — High-performance build system for Monorepos

## Project Structure

This is running as a monorepo using Turborepo:

- `apps/blog`: The main website, built with Astro
- `packages/ui`: Shared React components used in the blog
- `packages/typescript-config`: Shared TypeScript configurations
- `packages/eslint-config`: Shared ESLint configurations

## Useful Commands

- `npm run build` - Build the blog and all packages
- `npm run dev` - Run the blog locally for development
- `npm run lint` - Lint all code
- `npm run lint:fix` - Lint and fix issues
- `npm run clean` - Clean up all `node_modules` and build folders
- `npm run format` - Format code with Prettier
