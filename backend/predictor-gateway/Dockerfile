FROM node:16-alpine AS node

FROM node AS node-with-gyp
RUN apk add g++ make python3

FROM node-with-gyp AS builder
WORKDIR /search
ADD ./package.json .
ADD ./package-lock.json .
RUN npm install

ADD ./ .
RUN node node_modules/nx/bin/nx build search --configuration=production

FROM node AS deps-builder
COPY --from=builder /search/dist/apps/search/package.json .
COPY --from=builder /search/package-lock.json .
RUN npm install --production

FROM node:16-alpine AS indexer
WORKDIR /search
COPY --from=builder /search/dist/apps/search .
COPY --from=deps-builder /node_modules ./node_modules

CMD ["node", "main.js"]
