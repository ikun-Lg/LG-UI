# LGMap 地图组件

基于腾讯地图封装的物流轨迹展示组件，支持自定义标记点、路线展示和信息窗口等功能。

## 基础用法

```jsx
import { LGMap } from 'lggbond-ui';

const logisticsData = [
  {
    position: { lat: 31.2304, lng: 121.4737 },
    label: '始发地',
    tooltip: '始发地详细信息',
  },
  {
    position: { lat: 31.2324, lng: 121.4757 },
    label: '目的地',
    tooltip: '目的地详细信息',
  },
];

export default () => (
  <LGMap
    logisticsData={logisticsData}
    apiKey="4QKBZ-2KU6J-VHZFY-XTTJW-JSZU6-ZSFXS"
  />
);
```

## 模拟物流路线

通过启用 `enableMock` 属性，可以在两个点之间自动生成随机的中转站点。

```jsx
import { LGMap } from 'lggbond-ui';

// 模拟物流数据
const logisticsData = [
  {
    position: { lat: 31.2304, lng: 121.4737 },
    label: '始发地',
    tooltip: '始发地',
  },
  {
    position: { lat: 31.2324, lng: 121.4757 },
    label: '目的地',
    tooltip: '目的地',
  },
];

export default () => (
  <LGMap
    logisticsData={logisticsData}
    enableMock
    apiKey="4QKBZ-2KU6J-VHZFY-XTTJW-JSZU6-ZSFXS"
  />
);
```

## 3D 视图模式

支持设置地图的视图模式和视角。

```jsx
import { LGMap } from 'lggbond-ui';

const logisticsData = [
  {
    position: { lat: 31.2304, lng: 121.4737 },
    label: '始发地',
    tooltip: '始发地',
  },
  {
    position: { lat: 31.2324, lng: 121.4757 },
    label: '目的地',
    tooltip: '目的地',
  },
];

export default () => (
  <LGMap
    logisticsData={logisticsData}
    viewMode="3D"
    customMapOptions={{
      pitch: 75,
      rotation: 45,
    }}
    apiKey="4QKBZ-2KU6J-VHZFY-XTTJW-JSZU6-ZSFXS"
  />
);
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| logisticsData | 物流轨迹点数据 | `LogisticsPoint[]` | `[]` |
| apiKey | 腾讯地图 API Key | `string` | - |
| showLabel | 是否显示标签 | `boolean` | `true` |
| showTooltip | 是否显示信息窗口 | `boolean` | `true` |
| showMarker | 是否显示标记点 | `boolean` | `true` |
| enableMock | 是否启用模拟数据（在两点间生成随机中转站） | `boolean` | `false` |
| viewMode | 地图视图模式，支持 '2D' 或 '3D' | `string` | `'3D'` |
| customMapOptions | 自定义地图配置项 | `Record<string, any>` | `{}` |

### LogisticsPoint 数据结构

```typescript
interface Position {
  lat: number;  // 纬度
  lng: number;  // 经度
}

interface LogisticsPoint {
  position: Position;  // 位置坐标
  label: string;      // 标签文本
  tooltip?: string;   // 信息窗口内容
}
```

### customMapOptions 配置项

支持腾讯地图的标准配置项，常用的包括：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| zoom | 地图缩放级别 | `number` | `18` |
| pitch | 地图俯仰角度（3D模式） | `number` | `70` |
| rotation | 地图旋转角度 | `number` | `0` |
