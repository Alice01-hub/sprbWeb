#!/usr/bin/env python3
"""
Summer Pockets 巡礼网站 - 简化性能监控
"""

import time
from datetime import datetime, timedelta
from typing import Dict, Any

class SimplePerformanceMonitor:
    """简化的性能监控器"""
    
    def __init__(self):
        self.start_time = time.time()
        self.request_count = 0
        self.error_count = 0
    
    def record_request(self, success: bool = True):
        """记录请求"""
        self.request_count += 1
        if not success:
            self.error_count += 1
    
    def get_current_metrics(self) -> Dict[str, Any]:
        """获取当前性能指标"""
        uptime = time.time() - self.start_time
        
        return {
            "uptime_seconds": uptime,
            "uptime_formatted": str(timedelta(seconds=int(uptime))),
            "request_count": self.request_count,
            "error_count": self.error_count,
            "success_rate": (self.request_count - self.error_count) / max(self.request_count, 1) * 100,
            "timestamp": datetime.now().isoformat()
        }
    
    def get_performance_report(self, hours: int = 24) -> Dict[str, Any]:
        """获取性能报告（简化版本）"""
        return {
            "period_hours": hours,
            "current_metrics": self.get_current_metrics(),
            "summary": "简化版本 - 基础性能监控",
            "timestamp": datetime.now().isoformat()
        }

# 全局监控实例
_monitor = SimplePerformanceMonitor()

def get_monitor() -> SimplePerformanceMonitor:
    """获取监控实例"""
    return _monitor