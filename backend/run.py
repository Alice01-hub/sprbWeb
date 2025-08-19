#!/usr/bin/env python3
"""
Summer Pockets 巡礼网站后端 - 简化启动脚本
"""

import uvicorn
from config_loader import ConfigLoader

if __name__ == "__main__":
    # 加载配置
    config = ConfigLoader.get_server_config()
    
    print("🚀 启动 Summer Pockets 巡礼网站后端服务...")
    print(f"📍 服务地址: http://{config['host']}:{config['port']}")
    print(f"🔧 开发模式: {'开启' if config['reload'] else '关闭'}")
    print(f"📚 API文档: http://{config['host']}:{config['port']}/docs")
    
    # 启动服务
    uvicorn.run(
        "app:app",
        host=config['host'],
        port=config['port'],
        reload=config['reload'],
        log_level="info"
    )
