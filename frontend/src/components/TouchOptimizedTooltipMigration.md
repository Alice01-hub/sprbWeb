# TouchOptimizedTooltip 迁移指南

## 概述

本文档提供了将现有页面从旧的tooltip实现迁移到TouchOptimizedTooltip组件的详细步骤。

## 需要迁移的页面

以下页面仍在使用旧的tooltip实现，需要迁移：

1. **NaoshimaPage.tsx** - 直岛页面
2. **CheckinPage.tsx** - 打卡页面  
3. **MegijimaPage.tsx** - 女木岛页面

## 迁移步骤

### 1. 添加导入

在每个页面文件顶部添加：

```tsx
import TouchOptimizedTooltip, { TooltipContent } from '../components/TouchOptimizedTooltip'
```

### 2. 移除旧的样式定义

删除以下样式组件：
- `MapTooltip`
- `TooltipImage` 
- `TooltipTitle`
- `TooltipDesc`

### 3. 移除状态管理

删除hoveredIcon状态：
```tsx
// 删除这行
const [hoveredIcon, setHoveredIcon] = useState<null | {
  x: number;
  y: number;
  title: string;
  image: string;
  desc: string;
}>(null);
```

### 4. 移除事件处理

删除onMouseEnter和onMouseLeave事件处理：
```tsx
// 删除这些事件处理
onMouseEnter={() => {
  const tip = iconTooltips[icon.title];
  if (tip) {
    setHoveredIcon({
      x: icon.x,
      y: icon.y,
      title: icon.title,
      image: tip.image,
      desc: tip.desc,
    });
  }
}}
onMouseLeave={() => setHoveredIcon(null)}
```

### 5. 包装LocationIcon

将LocationIcon包装在TouchOptimizedTooltip中：

```tsx
// 旧代码
<LocationIcon
  // ... props
  onMouseEnter={...}
  onMouseLeave={...}
>
  {/* icon content */}
  {hoveredIcon && (
    <MapTooltip>
      <TooltipImage src={hoveredIcon.image} />
      <TooltipTitle>{hoveredIcon.title}</TooltipTitle>
      <TooltipDesc>{hoveredIcon.desc}</TooltipDesc>
    </MapTooltip>
  )}
</LocationIcon>

// 新代码
const tip = iconTooltips[icon.title];
<TouchOptimizedTooltip
  content={
    tip ? (
      <TooltipContent
        image={tip.image}
        title={icon.title}
        description={tip.desc}
      />
    ) : (
      <div>{icon.title}</div>
    )
  }
  position="top"
>
  <LocationIcon
    // ... props (移除onMouseEnter和onMouseLeave)
  >
    {/* icon content */}
  </LocationIcon>
</TouchOptimizedTooltip>
```

### 6. 移除getTooltipPosition函数

如果存在getTooltipPosition函数，可以删除它，因为TouchOptimizedTooltip会自动处理位置。

## 迁移示例

### 迁移前
```tsx
const [hoveredIcon, setHoveredIcon] = useState(null);

<LocationIcon
  onMouseEnter={() => {
    const tip = iconTooltips[icon.title];
    if (tip) {
      setHoveredIcon({
        title: icon.title,
        image: tip.image,
        desc: tip.desc,
      });
    }
  }}
  onMouseLeave={() => setHoveredIcon(null)}
>
  <span>{icon.emoji}</span>
  {hoveredIcon && hoveredIcon.title === icon.title && (
    <MapTooltip>
      <TooltipImage src={hoveredIcon.image} />
      <TooltipTitle>{hoveredIcon.title}</TooltipTitle>
      <TooltipDesc>{hoveredIcon.desc}</TooltipDesc>
    </MapTooltip>
  )}
</LocationIcon>
```

### 迁移后
```tsx
const tip = iconTooltips[icon.title];
<TouchOptimizedTooltip
  content={
    tip ? (
      <TooltipContent
        image={tip.image}
        title={icon.title}
        description={tip.desc}
      />
    ) : (
      <div>{icon.title}</div>
    )
  }
  position="top"
>
  <LocationIcon>
    <span>{icon.emoji}</span>
  </LocationIcon>
</TouchOptimizedTooltip>
```

## 优势

迁移到TouchOptimizedTooltip后的优势：

1. **自动设备检测** - 无需手动判断设备类型
2. **简化状态管理** - 不需要维护hoveredIcon状态
3. **统一交互体验** - 桌面和移动端使用相同的组件
4. **响应式设计** - 移动端自动调整位置避免溢出
5. **更好的可访问性** - 支持键盘导航和触摸交互
6. **代码简化** - 减少重复代码和维护成本

## 测试

迁移完成后，请测试以下功能：

1. **桌面端** - 鼠标悬停显示tooltip
2. **移动端** - 点击显示/隐藏tooltip
3. **位置调整** - 确保tooltip不会溢出屏幕
4. **内容显示** - 验证图片和文本正确显示
5. **交互响应** - 确保点击外部区域关闭tooltip

## 注意事项

1. 确保DeviceProvider包裹了使用TouchOptimizedTooltip的组件
2. 移动端会自动调整left/right位置为top/bottom避免溢出
3. 组件会自动清理事件监听器，无需手动处理
4. 如果tooltip内容复杂，可以使用自定义的React组件作为content 