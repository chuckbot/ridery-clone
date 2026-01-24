# Stage 1: Base & Dependencies
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY . .

# Stage 2: Build
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm install --frozen-lockfile
RUN pnpm run --filter @ridery/shared build
RUN pnpm run --filter server build

# Stage 3: Runner (Producción)
FROM node:20-slim
WORKDIR /app
RUN corepack enable
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-workspace.yaml ./
COPY --from=build /app/pnpm-lock.yaml ./
COPY --from=build /app/apps/server/package.json ./apps/server/
COPY --from=build /app/apps/server/dist ./apps/server/dist
COPY --from=build /app/packages/shared ./packages/shared

# Instalamos solo dependencias de producción
RUN pnpm install --prod --frozen-lockfile
EXPOSE 3000
CMD ["node", "apps/server/dist/server.js"]