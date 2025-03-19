FROM node:18-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Omit --production flag for TypeScript devDependencies
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
    else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
    fi

# Adjust the files and folders that should be copied to the build container
COPY app ./app
COPY components ./components
COPY lib ./lib
COPY hooks ./hooks
COPY components.json ../
COPY drizzle.config.ts ../
COPY middleware.ts ../
COPY next.config.ts ../
COPY postcss.config.mjs ../
COPY tailwind.config.ts ../
COPY tsconfig.json ../

# Environment variables must be present at build time
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ENV POSTGRES_URL=${DATABASE_URL}
ARG STRIPE_SECRET_KEY
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
ARG STRIPE_WEBHOOK_SECRET
ENV STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}

# pnpm db:migrate
RUN \
    if [ -f yarn.lock ]; then yarn db:migrate; \
    elif [ -f package-lock.json ]; then npm db:migrate; \
    elif [ -f pnpm-lock.yaml ]; then pnpm db:migrate; \
    else npm db:migrate; \
    fi
# pnpm db:seed
RUN \
    npx tsx ./lib/db/seed.ts

# Build Next.js based on the preferred package manager
RUN \
    if [ -f yarn.lock ]; then yarn build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then pnpm build; \
    else npm run build; \
    fi

# Step 2. Production image, copy all the files and run next
FROM base AS runner

RUN apk --no-cache add curl

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Environment variables must be redefined at run time
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME=0.0.0.0 node server.js
