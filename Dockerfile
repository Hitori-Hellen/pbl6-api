FROM node:20-alpine AS base
RUN apk update && apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@8.10.5 --activate

RUN pnpm fetch

WORKDIR /app

COPY package*.json ./
RUN pnpm install
RUN pnpm add @prisma/client

COPY prisma ./
RUN pnpm exec prisma generate

COPY . .
RUN pnpm run build

CMD [ "pnpm", "run", "start" ]