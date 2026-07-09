const http = require('http');
const crypto = require('crypto');
const { execSync } = require('child_process');

const PORT = process.env.WEBHOOK_PORT || 9000;
const SECRET = process.env.WEBHOOK_SECRET || '';

// 验证 Gitee Webhook 签名（X-Gitee-Token 即密码）
function verifySignature(req) {
  const token = req.headers['x-gitee-token'] || '';
  return token === SECRET;
}

// 执行部署脚本
function deploy() {
  console.log('[Webhook] 开始部署...');
  try {
    const result = execSync('sh /app/deploy.sh', { timeout: 300000, encoding: 'utf-8' });
    console.log('[Webhook] 部署成功:\n' + result);
    return true;
  } catch (err) {
    console.error('[Webhook] 部署失败:', err.message);
    if (err.stdout) console.error(err.stdout);
    if (err.stderr) console.error(err.stderr);
    return false;
  }
}

const server = http.createServer((req, res) => {
  // 健康检查
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('webhook OK');
    return;
  }

  // 只接受 POST
  if (req.method !== 'POST') {
    res.writeHead(405);
    res.end('Method Not Allowed');
    return;
  }

  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    // 验证签名
    if (SECRET && !verifySignature(req)) {
      console.log('[Webhook] 签名验证失败');
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    // 解析 Gitee 推送事件
    try {
      const payload = JSON.parse(body);
      const ref = payload.ref || '';
      const pusher = (payload.pusher || {}).name || 'unknown';
      
      console.log('[Webhook] 收到推送: ' + ref + ' 来自 ' + pusher);

      // 只响应 master/main 分支推送
      if (ref === 'refs/heads/master' || ref === 'refs/heads/main') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Deploy started');

        // 异步部署，避免请求超时
        setTimeout(() => deploy(), 1000);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Branch ignored: ' + ref);
      }
    } catch (e) {
      res.writeHead(400);
      res.end('Invalid JSON');
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('[Webhook] 服务已启动，端口 ' + PORT);
});
