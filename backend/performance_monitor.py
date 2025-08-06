"""
性能监控模块
"""
import time
import psutil
from datetime import datetime, timedelta
from typing import Dict, List, Optional

class PerformanceMonitor:
    """性能监控器"""
    
    def __init__(self):
        self.start_time = time.time()
        self.metrics_history = []
        self.max_history_size = 1000
    
    def get_current_metrics(self) -> Dict:
        """获取当前性能指标"""
        current_time = datetime.now()
        
        # CPU和内存信息
        cpu_percent = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('.')
        
        # 进程信息
        current_process = psutil.Process()
        process_memory = current_process.memory_info()
        
        metrics = {
            "timestamp": current_time.isoformat(),
            "uptime_seconds": time.time() - self.start_time,
            "system": {
                "cpu_percent": cpu_percent,
                "memory_total": memory.total,
                "memory_available": memory.available,
                "memory_percent": memory.percent,
                "disk_total": disk.total,
                "disk_free": disk.free,
                "disk_percent": (disk.used / disk.total) * 100
            },
            "process": {
                "memory_rss": process_memory.rss,
                "memory_vms": process_memory.vms,
                "cpu_percent": current_process.cpu_percent(),
                "num_threads": current_process.num_threads()
            }
        }
        
        # 保存到历史记录
        self.metrics_history.append(metrics)
        if len(self.metrics_history) > self.max_history_size:
            self.metrics_history.pop(0)
        
        return metrics
    
    def get_performance_report(self, hours: int = 24) -> Dict:
        """获取性能报告"""
        if not self.metrics_history:
            return {"message": "No metrics available"}
        
        # 过滤指定时间范围内的数据
        cutoff_time = datetime.now() - timedelta(hours=hours)
        filtered_metrics = []
        
        for metric in self.metrics_history:
            metric_time = datetime.fromisoformat(metric["timestamp"])
            if metric_time >= cutoff_time:
                filtered_metrics.append(metric)
        
        if not filtered_metrics:
            return {"message": f"No metrics available for the last {hours} hours"}
        
        # 计算统计信息
        cpu_values = [m["system"]["cpu_percent"] for m in filtered_metrics]
        memory_values = [m["system"]["memory_percent"] for m in filtered_metrics]
        
        report = {
            "period_hours": hours,
            "total_samples": len(filtered_metrics),
            "cpu": {
                "avg": sum(cpu_values) / len(cpu_values),
                "max": max(cpu_values),
                "min": min(cpu_values)
            },
            "memory": {
                "avg": sum(memory_values) / len(memory_values),
                "max": max(memory_values),
                "min": min(memory_values)
            },
            "uptime_hours": (time.time() - self.start_time) / 3600
        }
        
        return report

# 全局监控器实例
_monitor = None

def get_monitor() -> PerformanceMonitor:
    """获取全局监控器实例"""
    global _monitor
    if _monitor is None:
        _monitor = PerformanceMonitor()
    return _monitor