# LG UI

LG UI 是一个基于 React 的业务组件库,提供了地图等高质量组件。

## ✨ 特性

- 📦 包含物流地图等业务组件
- 🛡 使用 TypeScript 开发,提供完整类型定义
- ⚡️ 按需加载,减少打包体积
- 🎨 可定制主题,支持灵活配置

## 📦 安装

```bash
npm install lggbond-ui
```

或

```bash
yarn add lggbond-ui
```

## 🔨 示例

```jsx
import { LGMap } from 'lggbond-ui';

export default () => (
  <LGMap 
    logisticsData={[
      {
        position: { lat: 31.2304, lng: 121.4737 },
        label: '起点',
        tooltip: '始发地'
      }
    ]}
    apiKey="您的腾讯地图Key"
  />
);
```

## 🖥 兼容性

- 支持所有现代浏览器和 IE11+
- 支持服务端渲染
- 支持 React 16.9.0 及以上版本

## 🤝 参与贡献

欢迎提交 PR 或 Issue 帮助我们改进组件库。

## ⚖️ 许可证

MIT License
