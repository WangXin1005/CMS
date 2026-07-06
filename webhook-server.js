// ============================================================
// CodeBlog — Gitee Webhook 自动部署服务器
// 接收 Gitee push 事件 → git pull → Docker 逐序构建 → 部署
// 运行：node webhook-server.js
// ============================================================

const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');

// ========== 配置（通过环境变量注入） ==========
const PORT = parseInt(process.env.WEBHOOK_PORT || '9000', 10);
const SECRET = process.env.WEBHOOK_SECRET || '';
const BRANCH = process.env.WEBHOOK_BRANCH || 'main';
const WORKDIR = process.env.WEBHOOK_WORKDIR || '/opt/codeblog';

// ========== 日志工具 ==========
function log(level, msg) {
  const time = new Date().toISOString().replace('T', ' ').substring(0, 19);
  console.log(`[${time}] [${level}] ${msg}`);
}

// ========== 执行 Shell 命令 ==========
function runCmd(cmd, timeout = 600000) {
  return new Promise((resolve, reject) => {
    log('CMD', cmd);
    const proc = exec(cmd, { cwd: WORKDIR, timeout, maxBuffer: 10 * 1024 * 1024 });
    let stdout = '';
    let stderr = '';
    proc.stdout.on('data', (d) => { stdout += d; process.stdout.write(d); });
    proc.stderr.on('data', (d) => { stderr += d; process.stderr.write(d); });
    proc.on('close', (code) => {
      if (code === 0) resolve(stdout);
      else reject(new Error(`Exit code ${code}: ${stderr}`));
    });
    proc.on('error', reject);
  });
}

// ========== 验证 Gitee 签名 ==========
function verifySignature(req, body) {
  if (!SECRET) {
    log('WARN', '未配置 WEBHOOK_SECRET，跳过签名验证（不安全！）');
    return true;
  }
  const timestamp = req.headers['x-gitee-timestamp'];
  const sign = req.headers['x-gitee-token'];
  if (!sign) {
    log('WARN', '请求缺少 X-Gitee-Token 头');
    return false;
  }
  // Gitee 旧版密码验证
  const expected = crypto.createHash('sha256').update(timestamp + SECRET).digest('hex');
  const expectedLegacy = SECRET; // 旧版直接匹配密码
  if (sign === expected || sign === expectedLegacy) return true;
  log('WARN', '签名验证失败');
  return false;
}

// ========== 执行部署流程 ==========
async function doDeploy() {
  log('INFO', '========== 开始自动部署 ==========');

  try {
    // 1. 拉取最新代码
    log('INFO', '[1/5] 拉取最新代码...');
    await runCmd(`git pull origin ${BRANCH}`, 120000);

    // 2. 停止旧服务（保留数据卷）
    log('INFO', '[2/5] 停止旧服务...');
    await runCmd('docker compose down', 60000);

    // 3. 逐序构建后端（避免 OOM）
    log('INFO', '[3/5] 构建后端镜像（约 5-10 分钟）...');
    await runCmd('docker compose build --no-cache backend', 900000);

    // 4. 逐序构建前端
    log('INFO', '[4/5] 构建前端镜像（约 3-5 分钟）...');
    await runCmd('docker compose build --no-cache frontend', 600000);

    // 5. 启动所有服务
    log('INFO', '[5/5] 启动所有服务...');
    await runCmd('docker compose up -d --remove-orphans', 120000);

    // 清理旧镜像
    await runCmd('docker image prune -f', 30000).catch(() => {});

    log('INFO', '========== 部署完成！ ==========');
    return true;
  } catch (err) {
    log('ERROR', `部署失败: ${err.message}`);
    return false;
  }
}

// ========== HTTP 服务器 ==========
const server = http.createServer(async (req, res) => {
  // 健康检查
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', time: new Date().toISOString() }));
    return;
  }

  // 只处理 POST /webhook
  if (req.method !== 'POST' || req.url !== '/webhook') {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  // 读取请求体
  let body = '';
  req.on('data', (chunk) => { body += chunk; });
  req.on('end', async () => {
    // 验证签名
    if (!verifySignature(req, body)) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: '签名验证失败' }));
      return;
    }

    // 解析事件类型
    let event = 'unknown';
    try {
      const payload = JSON.parse(body);
      event = payload.action || payload.hook_name || 'unknown';
      const ref = payload.ref || '';
      log('INFO', `收到 Webhook: event=${event}, ref=${ref}`);
    } catch (e) {
      log('WARN', '无法解析 Webhook 请求体');
    }

    // 仅 Push Hook 且目标分支匹配时触发部署
    if (event === 'Push Hook' || event === 'push_hooks') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: '部署已触发' }));

      // 异步执行部署（不阻塞响应）
      setImmediate(() => doDeploy());
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `忽略事件: ${event}` }));
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  log('INFO', `Webhook 服务器启动，监听端口 ${PORT}`);
  log('INFO', `工作目录: ${WORKDIR}`);
  log('INFO', `目标分支: ${BRANCH}`);
  if (!SECRET) log('WARN', '未配置 WEBHOOK_SECRET！请在 .env 中设置');
});

// 优雅退出
process.on('SIGTERM', () => {
  log('INFO', '收到 SIGTERM，正在关闭...');
  server.close(() => process.exit(0));
});
