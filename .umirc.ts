import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'DogWang',
  favicon:
    'https://static-7dd14d21-a904-4449-a093-dac30aeeac47.bspapp.com/static/logo.png',
  logo: 'https://static-7dd14d21-a904-4449-a093-dac30aeeac47.bspapp.com/static/logo.png',
  outputPath: 'docs-dist',
  mode: 'site',
  // more config: https://d.umijs.org/config
  themeConfig: {
    carrier: 'dogc', // 设备状态栏左侧的文本内容
    hd: {
      // umi-hd 的 750 高清方案（默认值）
      rules: [{ mode: 'vw', options: [100, 750] }],

      // 更多 rule 配置访问 https://github.com/umijs/dumi/blob/master/packages/theme-mobile/src/typings/config.d.ts#L7
    },
  },
});
