# pass-through Arguments in every stage. See: https://benkyriakou.com/posts/docker-args-empty

# Repository of source code
ARG SOURCE="https://github.com/adambarath/nextjs-starter-medusa.git"
# Branch name
ARG BRANCH="i18n"

# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile


# # Rebuild the source code only when needed
# # ===== PRODUCTION BUILDER STAGE =====
# FROM node:20-alpine AS builder
# ARG BRANCH
# ARG SOURCE

# # If NODE_ENV is set to production the cookie is secure. Hence it needs SSL certificate.
# # https://github.com/medusajs/medusa/issues/2314#issuecomment-1422429232
# # ENV NODE_ENV=development
# ENV NODE_ENV=production
# EXPOSE 8000
# ENV PORT=8000

# # WORKDIR /app/storefront-src
# # RUN apk add --no-cache git && \
# #     git clone --depth 1 --branch ${BRANCH} ${SOURCE} /app/storefront-src

# WORKDIR /app/storefront

# COPY . .

# RUN npm install --only=production
# RUN npm install -g @medusajs/medusa-cli@latest
# RUN npm install -g gatsby-cli

# # RUN yarn install && yarn build


# ------------------------------------------------------------------------------------------------------------------------------------------------
# README
# 
# You have to build YARN locally. Local files will be copied to prod image.
#
# ------------------------------------------------------------------------------------------------------------------------------------------------

# 3. Production image, copy all the files and run next
# ===== PRODUCTION RUNNER STAGE =====
FROM node:20-alpine as prod
ENV NODE_ENV=production
EXPOSE 8000
ENV PORT=8000

WORKDIR /app/storefront

# RUN [ -e .env.local ] && rm .env.local
# RUN [ -e .env.template ] && rm .env.template

COPY package.json ./package.json
RUN npm install --only=production

RUN mkdir .next
COPY .next ./.next
RUN [ -d .next/cache ] && rm -Rf .next/cache

# RUN export PATH="$(yarn global bin):$PATH"
# ENTRYPOINT ["yarn", "start"]
ENTRYPOINT ["next", "start"]