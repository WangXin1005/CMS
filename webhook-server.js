const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');

const PORT = process.env.WEBHOOK_PORT || 9000;
const SECRET = process.env.WEBHOOK_SECRET || '';

/** 带时间戳的日志输出（北京时间） */
function log(msg) {
  const ts = new Date().toLocaleTimeString("zh-CN", {
    hour12: false,
    timeZone: "Asia/Shanghai",
  });
  console.log(`[${ts}] ${msg}`);
}

function verifySignature(req) {
  const token = req.headers['x-gitee-token'] || '';
  return token === SECRET;
}

function deploy() {
  log('[Webhook] 开始部署...');
  const child = exec('sh /app/deploy.sh', { timeout: 300000 });
  child.stdout.on('data', (data) => process.stdout.write(data));
  child.stderr.on('data', (data) => process.stderr.write(data));
  child.on('close', (code) => {
    if (code === 0) log('[Webhook] 部署完成');
    else log('[Webhook] 部署失败，退出码: ' + code);
  });
  child.on('error', (err) => log('[Webhook] 部署失败: ' + err.message));
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('webhook OK');
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405);
    res.end('Method Not Allowed');
    return;
  }

  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    if (SECRET && !verifySignature(req)) {
      log('[Webhook] 签名验证失败');
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    try {
      const payload = JSON.parse(body);
      const ref = payload.ref || '';
      const pusher = (payload.pusher || {}).name || 'unknown';
      log('[Webhook] 收到推送: ' + ref + ' 来自 ' + pusher);

      if (ref === 'refs/heads/master' || ref === 'refs/heads/main') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Deploy started');
        setTimeout(() => deploy(), 2000);
      } else {
        log('[Webhook] 忽略分支: ' + ref);
        res.writeHead(200);
        res.end('Branch ignored: ' + ref);
      }
    } catch (e) {
      res.writeHead(400);
      res.end('Invalid JSON');
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  log('[Webhook] 服务已启动，端口 ' + PORT);
});
