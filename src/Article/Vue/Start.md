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

## 第一个 vue3 程序

```vue
<template>
  <div class="app-container">
    <div class="description-item">
      <span>姓名：</span>
      <span>{{ name }}</span>
    </div>

    <div class="description-item">
      <span>工作：</span>
      <span>{{ otherInfo.job }}</span>
    </div>
    <button @click="updateName">我要改名字</button>
    <button @click="updateJob">我要换工作</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
export default defineComponent({
  setup() {
    const name = ref<string>('泰罗奥特曼');

    const otherInfo = reactive<{ job: string }>({
      job: '打怪兽',
    });

    const updateName = () => {
      name.value = '奥特之父';
    };

    const updateJob = () => {
      otherInfo.job = '照顾小奥特曼';
    };

    return {
      name,
      otherInfo,
      updateName,
      updateJob,
    };
  },
});
</script>
```

### defineComponent

defineComponent 本身的功能很简单，但是最主要的功能是为了 ts 下的类型推到。对于一个 ts 文件，如果我们直接写

```js
export default {};
```

这个时候，对于编辑器而言，{} 只是一个 Object 的类型，无法有针对性的提示我们对于 vue 组件来说 {} 里应该有哪些属性。但是增加一层 defineComponet 的话，

```
export default defineComponent({})
```

这时，{} 就变成了 defineComponent 的参数，那么对参数类型的提示，就可以实现对 {} 中属性的提示，外还可以进行对参数的一些类型推导等操作。

### 最后附上[github 地址](https://github.com/wmjchf/vue3.git)
