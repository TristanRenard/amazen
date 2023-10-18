FROM node:18-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN pnpm i --frozen-lockfile
COPY . .

RUN pnpm run build

RUN pnpm prune --production

FROM node:alpine

WORKDIR /app

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

EXPOSE 3000

CMD ["pnpm", "run", "start"]