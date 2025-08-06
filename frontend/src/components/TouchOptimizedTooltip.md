# TouchOptimizedTooltip 组件使用指南

## 概述

TouchOptimizedTooltip 是一个响应式的tooltip组件，能够根据设备类型自动调整交互方式：
- **桌面端**：鼠标悬停显示tooltip
- **移动端**：点击显示/隐藏tooltip

## 基本用法

```tsx
import TouchOptimizedTooltip, { TooltipContent } from './TouchOptimizedTooltip'

// 简单文本tooltip
<TouchOptimizedTooltip content="这是tooltip内容">
  <button>悬停或点击我</button>
</TouchOptimizedTooltip>

// 带图片的tooltip
<TouchOptimizedTooltip 
  content={
    <TooltipContent
      image="/path/to/image.jpg"
      title="标题"
      description="描述文本"
    />
  }
>
  <div>触发元素</div>
</TouchOptimizedTooltip>
```

## API 参考

### TouchOptimizedTooltip Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `children` | `ReactNode` | - | 触发tooltip的子元素 |
| `content` | `ReactNode` | - | tooltip显示的内容 |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | tooltip显示位置 |
| `className` | `string` | - | 自定义CSS类名 |

### TooltipContent Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `image` | `string` | - | 图片URL（可选） |
| `title` | `string` | - | 标题文本 |
| `description` | `string` | - | 描述文本 |
| `alt` | `string` | - | 图片alt文本（可选） |

## 迁移现有代码

### 从现有的tooltip实现迁移

如果你的页面中有类似这样的代码：

```tsx
// 旧的实现
const [hoveredIcon, setHoveredIcon] = useState(null)

<LocationIcon
  onMouseEnter={() => setHoveredIcon(iconData)}
  onMouseLeave={() => setHoveredIcon(null)}
>
  <img src={icon.src} alt={icon.title} />
  {hoveredIcon && (
    <MapTooltip>
      <TooltipImage src={hoveredIcon.image} />
      <TooltipTitle>{hoveredIcon.title}</TooltipTitle>
      <TooltipDesc>{hoveredIcon.desc}</TooltipDesc>
    </MapTooltip>
  )}
</LocationIcon>
```

可以简化为：

```tsx
// 新的实现
<TouchOptimizedTooltip
  content={
    <TooltipContent
      image={iconData.image}
      title={iconData.title}
      description={iconData.desc}
    />
  }
>
  <LocationIcon>
    <img src={icon.src} alt={icon.title} />
  </LocationIcon>
</TouchOptimizedTooltip>
```

### 优势

1. **自动设备检测**：无需手动判断设备类型
2. **简化状态管理**：不需要维护悬停状态
3. **统一交互体验**：桌面和移动端使用相同的组件
4. **响应式设计**：移动端自动调整位置避免溢出
5. **更好的可访问性**：支持键盘导航和触摸交互

## 样式定制

组件使用styled-components，可以通过className或直接修改样式：

```tsx
const CustomTooltip = styled(TouchOptimizedTooltip)`
  /* 自定义样式 */
`
```

## 注意事项

1. **设备检测依赖**：组件需要在DeviceProvider包裹的组件树中使用
2. **移动端交互**：移动端点击外部区域会关闭tooltip
3. **位置调整**：移动端会自动调整left/right位置为top/bottom避免溢出
4. **性能考虑**：组件会自动清理事件监听器，无需手动处理

## 示例页面

查看 `TouchOptimizedTooltipExample.tsx` 文件了解更多使用示例。