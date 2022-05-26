import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/docs',
  publicPath: '/docs/',
  title: 'DogWang',
  favicon:
    'https://static-454c783b-73da-4f5e-a7b5-a00a2cb1ebc3.bspapp.com/Dog.png',
  logo: 'https://static-454c783b-73da-4f5e-a7b5-a00a2cb1ebc3.bspapp.com/Dog.png',
  outputPath: 'dist',
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
