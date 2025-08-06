#!/usr/bin/env python3
"""
SPRB 进度页面服务器
简单的HTTP服务器，用于托管开发进度页面
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

# 配置
PORT = 3002
DIRECTORY = Path(__file__).parent

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        # 添加CORS头，允许跨域访问
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        # 如果访问根路径，返回index.html
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

def main():
    """启动服务器"""
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            print(f"🚀 SPRB 进度页面服务器已启动")
            print(f"📁 服务目录: {DIRECTORY}")
            print(f"🌐 访问地址: http://localhost:{PORT}")
            print(f"🌐 访问地址: http://0.0.0.0:{PORT}")
            print("按 Ctrl+C 停止服务器")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 服务器已停止")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ 端口 {PORT} 已被占用，请先停止其他服务")
            sys.exit(1)
        else:
            print(f"❌ 启动服务器时出错: {e}")
            sys.exit(1)

if __name__ == "__main__":
    main() 