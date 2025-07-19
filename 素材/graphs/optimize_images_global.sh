#!/bin/bash

# 全局图片优化启动脚本
# 可以在任何位置运行，自动找到并执行优化脚本

# 获取脚本的绝对路径
SCRIPT_PATH="/home/devbox/project/sprb-web/素材/graphs/start_optimize.sh"

# 检查脚本是否存在
if [[ ! -f "$SCRIPT_PATH" ]]; then
    echo "❌ 错误：找不到启动脚本"
    echo "   期望路径: $SCRIPT_PATH"
    exit 1
fi

# 检查脚本是否有执行权限
if [[ ! -x "$SCRIPT_PATH" ]]; then
    echo "❌ 错误：启动脚本没有执行权限"
    echo "   请运行: chmod +x $SCRIPT_PATH"
    exit 1
fi

# 执行启动脚本
echo "🚀 启动图片优化程序..."
echo "📁 脚本路径: $SCRIPT_PATH"
echo ""

# 执行脚本
exec "$SCRIPT_PATH" 