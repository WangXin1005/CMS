const fs = require('fs');
const content = [
  '# ===== 构建阶段 =====',
  'FROM node:22-alpine AS builder',
  'WORKDIR /app',
  '# 配置 DNS 和 npm 镜像',
  'RUN echo "nameserver 114.114.114.114" > /etc/resolv.conf && npm config set registry https://registry.npmmirror.com',
  'COPY package*.json ./',
  'RUN npm install',
  'COPY . .',
  'RUN npm run build',
  '',
  '# ===== 运行阶段 =====',
  'FROM node:22-alpine',
  'WORKDIR /app',
  'RUN addgroup -S appgroup && adduser -S appuser -G appgroup',
  'COPY --from=builder /app/.output ./.output',
  'RUN chown -R appuser:appgroup /app',
  'USER appuser',
  'EXPOSE 3000',
  'ENV NITRO_HOST=0.0.0.0',
  'ENV NITRO_PORT=3000',
  'CMD ["node", ".output/server/index.mjs"]',
  ''
].join('\n');
fs.writeFileSync('D:/projects/nuxtProject/nuxt-test/Dockerfile', content, 'utf8');
console.log('done');
