# CodeBlog 部署指南

## 流程

```
本地构建(mvn+npm) → git push → 服务器 git pull → docker build(仅COPY) → up -d
```

服务器端 Docker 构建只是 COPY 预编译产物，无 Maven/npm 编译，2核2G 完全够用。

## 内存预算（2GB）

| 服务 | 限制 |
|------|:----:|
| MySQL | 384MB |
| 后端 JVM | 128MB |
| 前端 Node | 128MB |
| Nginx | 48MB |
| Webhook | 48MB |
| **合计** | **~736MB** |

## 一、本地构建（Windows）

```powershell
.\scripts\build-local.ps1
```

产物：
- 后端 `java-backend/target/*.jar`
- 前端 `nuxt-test/.output/`

然后提交推送：

```bash
git add .
git commit -m "构建"
git push
```

## 二、服务器部署

### 首次部署

```bash
git clone https://gitee.com/用户名/仓库.git /opt/codeblog
cd /opt/codeblog
cp .env.example .env && vim .env
docker compose up -d --build
```

### 后续更新

```bash
cd /opt/codeblog && git pull && docker compose up -d --build
```

或通过 Webhook 自动触发。

## 三、Gitee Webhook

仓库 → 管理 → Webhooks → 添加：
- URL: `http://服务器IP:9000`
- 密钥: 与 `.env` 一致
- 勾选 Push

## 四、运维

```bash
docker compose ps              # 状态
docker compose logs -f 服务名   # 日志
docker compose restart 服务名   # 重启
docker system prune -f         # 清理
```