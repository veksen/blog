FROM node:22-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN --mount=type=cache,target=/root/.npm npm i -g turbo@^2
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
RUN turbo prune blog --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN --mount=type=cache,target=/root/.npm npm ci

# Build the project
COPY --from=builder /app/out/full/ .
RUN npm run build

RUN npm prune --omit=dev

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 vite
USER vite

ENV HOSTNAME=0.0.0.0
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
CMD ["node", "/app/apps/blog/dist/server/entry.mjs"]
