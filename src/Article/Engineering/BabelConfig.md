---
title: Babel配置
order: 3
nav:
  title: 基础沉淀
  path: /article
group:
  path: /engineering
  title: 前端工程化
  order: 5
---

# 从零到一配置 Babel

## preset 和 plugin 的区别

`Plugin`一般尽可能拆成小的力度，开发者可以按需引进。这样的好处显而易见，既提高了性能，也提高了扩展性。
`Preset`可以简单的理解为`Plugin`的集合。比如 `babel-preset-es2015` 就包含了所有跟 `ES6` 转换有关的插件。

## Plugin 与 Preset 执行顺序

- 1.先执行完所有 Plugin，再执行 Preset。
- 2.多个 Plugin，按照声明次序顺序执行。
- 3.多个 Preset，按照声明次序逆序执行。

## Babel 配置

**1、安装@babel/core**

```
npm install @babel/core -D
```

**2、创建.babelrc 配置文件**

```js
{
    plugins:[],
    presets:[]
}
```

**3、配置相关插件(plugin)或者预设(preset)**

比如需要将 es6+、typescript、tsx(jsx)转成 es5。

```js
// 1、安装@babel/preset-env(es6+转化)
// 2、安装@babel/preset-typescript(typescirpt转化)
// 3、安装@babel/preset-react(tsx转化)
{
  "presets": [
    [
      "@babel/preset-env",
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
}
```

**4、配置 polyfill**

`babel`默认只转换新的 JavaScript 语法，比如箭头函数、扩展运算（spread）。不转换新的 API，例如 `Iterator`、`Generator`、`Set`、`Maps`、`Proxy`、`Reflect`、`Symbol`、`Promise`  等全局对象，以及一些定义在全局对象上的方法（比如  Object.assign）都不会转译。如果想使用这些新的对象和方法，则需要为当前环境提供一个`垫片（polyfill）`。`babel-polyfill` 和 `babel-runtime` 是两种不同的解决方案。

从 `Babel 7.4.0` 开始，`babel-polyfill`已经被弃用，已经被分成 core-js/stable（以 polyfill ECMAScript 功能）和 regenerator-runtime/runtime 这两个包。

在`@babel/preset-env`中，已经默认集成了`polyfill`的功能，只需要简单配置即可。

```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage", // 开启polyfill的模式 usage（按需引入） or entry（全部引入）
        "corejs": 3 // 指定core-js的版本  core-js@3 core-js@2
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
}
```

**5、polyfill 避免污染全局**

在步骤 4 中，虽然解决了 Babel 不转换新 API 的问题，但是直接在代码中插入帮助函数，会导致污染了全局环境，并且不同的代码文件中包含重复的代码，导致编译后的代码体积变大。虽然这对于应用程序或命令行工具来说可能是好事，但如果你的代码打算发布为供其他人使用的库，或你无法完全控制代码运行的环境，则会成为问题。这时就需要考虑另一种 polyfill 的方案了，`babel-runtime`。

```
// 安装@babel/plugin-transform-runtime
{
  "presets": [
    [
      "@babel/preset-env"
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3 // @babel/runtime-corejs3 或者 @babel/runtime-corejs2
      }
    ]
  ]
}
```

## 总结

`@babel/preset-env` 拥有根据 useBuiltIns 参数的多种 polyfill 实现，优点是覆盖面比较全（entry）， 缺点是会污染全局， 推荐在业务项目中使用。
`@babel/runtime` 在 babel 7.4 之后大放异彩， 利用 `corejs3` 也实现了各种内置对象的支持， 并且依靠 `@babel/plugin-transform-runtime` 的能力，沙箱垫片和代码复用， 避免帮助函数重复 inject 过多的问题， 该方式的优点是不会污染全局， 适合在类库开发中使用。

上面 1， 2 两种方式取其一即可， 同时使用没有意义, 还可能造成重复的 polyfill 文件。
