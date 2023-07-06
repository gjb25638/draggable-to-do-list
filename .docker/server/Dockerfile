# 使用 Node 的版本
FROM node:16-alpine

RUN npm install -g pnpm

WORKDIR /var/www/server

# 僅僅聲明容器打算使用的port，主要mapping還是要靠執行時使用 -p <宿主port>:<容器port>
EXPOSE 3000

# Init command
CMD ["sh", "-c", "pnpm install && pnpm start && pnpm store prune"]