# SPRB图片优化工具

这个目录包含了SPRB项目的图片优化工具，用于将原始图片转换为WebP格式，减少网站加载压力。

## 文件说明

### 主要脚本
- `optimize_images.py` - 图片优化Python脚本
- `start_optimize.sh` - 一键启动脚本（本地）
- `optimize_images_global.sh` - 全局启动脚本（可在任何位置运行）

### 目录结构
```
graphs/
├── originGraphs/          # 原始图片目录
├── webpGraphs/           # 优化后的WebP图片目录
├── optimize_images.py     # Python优化脚本
├── start_optimize.sh     # 本地启动脚本
├── optimize_images_global.sh  # 全局启动脚本
└── README.md            # 说明文档
```

## 使用方法

### 方法1：使用全局启动脚本（推荐）
在任何位置运行：
```bash
/home/devbox/project/sprb-web/素材/graphs/optimize_images_global.sh
```

### 方法2：使用本地启动脚本
在graphs目录下运行：
```bash
cd /home/devbox/project/sprb-web/素材/graphs
./start_optimize.sh
```

### 方法3：直接运行Python脚本
```bash
cd /home/devbox/project/sprb-web/素材/graphs
python optimize_images.py
```

## 功能特点

### 🔧 自动环境管理
- 自动检测并激活 `sprb-web` 虚拟环境
- 自动检查并安装必要的依赖库（Pillow）
- 支持conda和系统Python

### 📁 智能目录管理
- 自动检查输入目录是否存在
- 自动创建输出目录
- 按岛屿分类存放图片

### 🎨 图片优化
- 转换为WebP格式（质量85%）
- 保持原始尺寸
- 支持多种图片格式：JPG, JPEG, PNG, BMP, TIFF

### 📊 详细日志
- 彩色输出，易于阅读
- 显示处理进度和统计信息
- 错误处理和提示

## 配置说明

### 输入输出目录
- **输入目录**: `/home/devbox/project/sprb-web/素材/graphs/originGraphs`
- **输出目录**: `/home/devbox/project/sprb-web/素材/graphs/webpGraphs`

### 优化参数
- **WebP质量**: 85%
- **尺寸**: 保持原尺寸
- **分类**: 按岛屿分类存放

## 支持的图片格式

### 输入格式
- JPG/JPEG
- PNG
- BMP
- TIFF/TIF

### 输出格式
- WebP

## 岛屿分类

脚本会自动根据文件名将图片分类到以下目录：
- `男木岛/` - 男木岛相关图片
- `女木岛/` - 女木岛相关图片
- `直岛/` - 直岛相关图片

## 错误处理

脚本包含完善的错误处理机制：
- 检查目录是否存在
- 检查依赖库是否安装
- 检查虚拟环境是否可用
- 提供详细的错误信息和解决建议

## 日志文件

优化过程会生成详细的日志文件：
- `image_optimization.log` - 详细的处理日志

## 注意事项

1. **备份原始图片**: 建议在运行前备份原始图片
2. **磁盘空间**: 确保有足够的磁盘空间存储优化后的图片
3. **权限**: 确保脚本有执行权限
4. **网络**: 首次运行可能需要下载依赖库

## 故障排除

### 常见问题

1. **虚拟环境激活失败**
   ```bash
   conda activate sprb-web
   ```

2. **Pillow库未安装**
   ```bash
   pip install Pillow
   ```

3. **权限问题**
   ```bash
   chmod +x start_optimize.sh
   chmod +x optimize_images_global.sh
   ```

4. **目录不存在**
   ```bash
   mkdir -p /home/devbox/project/sprb-web/素材/graphs/originGraphs
   mkdir -p /home/devbox/project/sprb-web/素材/graphs/webpGraphs
   ```

## 更新日志

- **v1.0**: 初始版本，支持基本的图片优化功能
- **v1.1**: 添加一键启动脚本和全局访问功能
- **v1.2**: 完善错误处理和日志输出 