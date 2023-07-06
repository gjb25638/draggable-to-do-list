# 使用 Node 的版本
FROM node:16-alpine as build

# development or
ENV NODE_ENV production

RUN npm install -g pnpm

WORKDIR /var/www/client

COPY . .

RUN pnpm install

# 僅僅聲明容器打算使用的port，主要mapping還是要靠執行時使用 -p <宿主port>:<容器port>
EXPOSE 2800

CMD ["pnpm", "build"]