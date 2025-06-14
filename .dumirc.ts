import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  favicons: ['/logo.png'],
  themeConfig: {
    name: 'LG UI',
    logo: '/logo.png',
    nav: [
      { title: '介绍', link: '/guide' },
      { title: '组件', link: '/components' },
    ],
    sidebar: {
      '/components': [
        {
          title: '基础组件',
          children: []
        },
        {
          title: '数据展示',
          children: []
        },
        {
          title: '地图组件',
          children: [
            { title: 'LGMap 地图', link: '/components/lg-map' }
          ],
        }
      ],
    },
    footer: `Copyright © ${new Date().getFullYear()} by LG UI`,
    socialLinks: {
      github: 'https://github.com/your-username/lg-ui',
    },
  },
  theme: {
    '@c-primary': '#1890ff',
  }
});
