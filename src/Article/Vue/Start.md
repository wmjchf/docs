---
title: 初识Vue3
nav:
  title: 优秀文章
  path: /article
group:
  path: /vue
  title: Vue3
---

# 初识 Vue3

## webpack 集成 vue3

webpack 基本配置可以移步到[这里](/article/webpack/start)。

- 1、安装`vue-loader`、`@vue/compiler-sfc`、`vue`

```
npm install vue --save

npm install vue-loader @vue/compiler-sfc -D
```

- 2、配置 webpack

```js
// 第一步
const { VueLoaderPlugin } = require("vue-loader");
// 第二步
extensions: [".ts", ".vue", "..."],
// 第三步
{
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader"
          }
        ]
},
// 第四步
plugins: [
    new VueLoaderPlugin()
]
```

- 3、babel 配置

```js
[
  '@babel/preset-typescript',
  {
    allExtensions: true, // vue支持ts
  },
];
```

- 4、创建 `shims-vue.d.ts`，识别`.vue` 文件

```ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```

- 5、将`ts`相关的文件添加到`tsconfig.json`中。

```js
{
  "include": ["src/**/*","shims-vue.d.ts"]
}
```

至此，配置全部完成。
