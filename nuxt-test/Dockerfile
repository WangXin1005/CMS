# ===== 构建阶段 =====
FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --no-audit --no-fund --ignore-scripts
COPY . .
ENV NODE_OPTIONS=--max-old-space-size=384
RUN npx nuxt prepare && npm run build -- --log-level verbose

# ===== 运行阶段 =====
FROM node:22-bookworm-slim
WORKDIR /app
RUN groupadd -r appgroup && useradd -r -g appgroup appuser
COPY --from=builder /app/.output ./.output
RUN chown -R appuser:appgroup /app
USER appuser
EXPOSE 3000
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000
CMD ["node", ".output/server/index.mjs"]
