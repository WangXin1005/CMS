# ===== 构建阶段 =====
FROM node:22-alpine AS builder
WORKDIR /app
# 安装原生模块编译依赖
RUN apk add --no-cache python3 make g++
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com && npm install
COPY . .
RUN npm run build

# ===== 运行阶段 =====
FROM node:22-alpine
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/.output ./.output
RUN chown -R appuser:appgroup /app
USER appuser
EXPOSE 3000
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000
CMD ["node", ".output/server/index.mjs"]
