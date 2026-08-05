FROM node:20.19.4-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/shared/package.json packages/shared/package.json
COPY packages/ui/package.json packages/ui/package.json
COPY packages/config/package.json packages/config/package.json
COPY apps/mobile/package.json apps/mobile/package.json
COPY apps/api-nest/package.json apps/api-nest/package.json
RUN npm ci --ignore-scripts

FROM deps AS build
WORKDIR /app
COPY packages/shared packages/shared
COPY packages/config packages/config
COPY apps/api apps/api
RUN npm run shared:build && npm run api:build

FROM node:20.19.4-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages/shared ./packages/shared
COPY --from=build /app/apps/api ./apps/api
EXPOSE 3333
CMD ["npm", "run", "start", "--workspace=@neuropi/api"]
