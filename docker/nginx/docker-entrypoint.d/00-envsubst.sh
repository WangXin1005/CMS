#!/bin/sh
# 替换 nginx 配置中的 ${DOMAIN} 环境变量
set -e
ME=$(basename "$0")
echo "$ME: 替换 ${DOMAIN} = ${DOMAIN:-localhost}"
envsubst '${DOMAIN}' < /etc/nginx/conf.d/default.conf > /tmp/default.conf.tmp
mv /tmp/default.conf.tmp /etc/nginx/conf.d/default.conf
