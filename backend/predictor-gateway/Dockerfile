FROM node:16-alpine AS node

FROM node AS node-with-gyp
RUN apk add g++ make python3

FROM node-with-gyp AS builder
WORKDIR /search
ADD ./package.json .
ADD ./package-lock.json .
RUN npm install

ADD ./ .
RUN npm run build

FROM node AS deps-builder
COPY --from=builder /package.json .
COPY --from=builder /package-lock.json .
RUN npm install --production

FROM node:16-alpine AS indexer
WORKDIR /search
COPY --from=builder /dist/apps/search .
COPY --from=deps-builder /node_modules ./node_modules

EXPOSE 3000

CMD ["node", "main.js"]
