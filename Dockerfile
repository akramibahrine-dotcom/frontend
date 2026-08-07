FROM node:20-alpine AS base



WORKDIR /app



FROM base AS deps

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./

RUN npm ci



FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules

COPY . .



# Baked into the client bundle at build time (required for Next.js)

ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000

ARG NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

ARG NEXT_PUBLIC_DEFAULT_CURRENCY=SAR

ARG NEXT_PUBLIC_META_PIXEL_ID=1577459200319485
ARG NEXT_PUBLIC_TIKTOK_PIXEL_ID=CVJG25BC77U8PJBE49O0
ARG NEXT_PUBLIC_SNAP_PIXEL_ID=1f9d07ef-8b06-44e1-81a5-c8340434bcc8
ARG NEXT_PUBLIC_CLARITY_PROJECT_ID=x6jwsts6w0

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

ENV NEXT_PUBLIC_DEFAULT_CURRENCY=$NEXT_PUBLIC_DEFAULT_CURRENCY

ENV NEXT_PUBLIC_META_PIXEL_ID=$NEXT_PUBLIC_META_PIXEL_ID
ENV NEXT_PUBLIC_TIKTOK_PIXEL_ID=$NEXT_PUBLIC_TIKTOK_PIXEL_ID
ENV NEXT_PUBLIC_SNAP_PIXEL_ID=$NEXT_PUBLIC_SNAP_PIXEL_ID
ENV NEXT_PUBLIC_CLARITY_PROJECT_ID=$NEXT_PUBLIC_CLARITY_PROJECT_ID



ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_OUTPUT_STANDALONE=true
# Keep Node heap modest so Docker + OS still have RAM (OOM-killer cancels otherwise)
ENV NODE_OPTIONS="--max-old-space-size=768"
ENV NEXT_PRIVATE_WORKER_THREADS=false
ENV UV_THREADPOOL_SIZE=1

# compile mode skips "Collecting page data" / SSG — that phase OOMs small VPS hosts.
# Pages render on demand at runtime (standalone server).
RUN npm run build -- --experimental-build-mode=compile



FROM base AS runner

WORKDIR /app



ENV NODE_ENV=production

ENV NEXT_TELEMETRY_DISABLED=1



RUN addgroup --system --gid 1001 nodejs

RUN adduser --system --uid 1001 nextjs



COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static



USER nextjs

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"



CMD ["node", "server.js"]

