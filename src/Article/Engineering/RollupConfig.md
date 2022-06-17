---
title: Rollup配置
order: 2
nav:
  title: 基础沉淀
  path: /article
group:
  path: /engineering
  title: 前端工程化
  order: 5
---

# 从零到一配置 Rollup

## 基础配置

- **安装 rollup**

```
npm install rollup -D
```

- **创建 rollup.config.js 配置文件**

```js
// 最简单的配置，包括输入和输出
export default {
  input: 'src/index.js',
  output: {
    file: 'bundle.js',
    format: 'iife',
  },
};
```

- **执行下面命令进行打包**

```
rollup -c
```

至此全部完成。

## 进阶配置

上面的基础配置，通过相对路径，将一个入口文件和一个模块创建成了一个简单的 bundle。随着构建更复杂的 bundle，通常需要更大的灵活性——引入 npm 安装的模块、通过 Babel 编译代码、和 JSON 文件打交道等。

为此，我们可以用 `插件(plugins)` 在打包的关键过程中更改 `Rollup` 的行为。

这里以`@rollup/plugin-babel`为例。
