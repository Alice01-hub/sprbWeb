#!/bin/bash

# Summer Pockets 巡礼网站重启脚本
echo "🔄 重启 Summer Pockets 巡礼网站服务..."

# 1. 先停止服务
echo "1️⃣ 停止现有服务..."
./stop.sh

# 2. 等待进程完全停止
echo "⏳ 等待进程完全停止..."
sleep 3

# 3. 重新启动服务
echo "2️⃣ 重新启动服务..."
./start.sh 