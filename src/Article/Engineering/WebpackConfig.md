---
title: Webpack配置
order: 1
nav:
  title: 基础沉淀
  path: /article
group:
  path: /engineering
  title: 前端工程化
  order: 5
---

# 从零到一配置 Webpack

## 对 webpack 的理解

正如官网所说本质上，`webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具`，`webpack` 侧重模块化打包，在它看来，万物皆模块，然后它基于入口，自动地递归解析入口所需要加载的所有资源文件（即模块），但是它只认识 `javascript`和本身只提供模块打包的功能，所以需要用不同的`Loader`来处理不同的文件，用`Plugin`来扩展`webpack`功能（压缩、合并等）。总体来说`webpack`本身更倾向于向前端开发者的提供思路——模块化开发。

## webpack 使用所有场景吗？

webpack 模块化是强，但是他胖啊，不是所有人都抱得动，主要是他为了提供更多的功能封装进了太多东西，所以选择上还是需要因地制宜。如果单纯只是打包 js（多页应用往往是这种需求），完全可以使用 rollup，browserify 这种小而美的实现，因为他们只做一件事——打包 js。而如果需要将图片，样式，字体等所有静态资源全部打包，webpack 毫无疑问是首选。这也是为什么越来越多的流行库和框架开始从 webpack 转向使用 rollup 进行打包，因为他们只需要打包 js，webpack 好多强大功能根本用不到。连 rollup 官网也坦言如果你在构建一个库，rollup 绝对是首选，但如果是构建一个应用，那么请选 webpack。

## 基础配置

- **1、安装`webpack`,`webpack-cli`。**

```
npm install webpack webpack-cli -D
```

- **2、创建`webpck`配置文件,一般我们会把 webpack 的公共配置抽离出来，然后分为`开发环境`和`生产环境`。**

```
// 首先要安装webpack-merge
npm install webpack-merge -D
// 然后创建common、dev、prod配置文件，文件名随意发挥。
common.webpack.js、dev.webpack.js、prod.webpack.js
```

- 3、为了方便，我们会把`webpack`命令配置在`package.json script`脚本当中。（这步不是必须）。

```js
"scripts": {
    "build:pro": "webpack --config ./webpack/pro.config.js",
    "build:dev": "webpack --config ./webpack/dev.config.js"
}
```

- **4、配置公共 config 文件。**

```js
const config = {
  // 入口文件（单入口）
  entry: '入口文件文件地址',
  // 打包之后的输出文件目录
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: '输出文件目录',
  },
};

module.exports = config;

// example
/**
 * common.config.js
 */
const config = {
  entry: './src/index.js',
  output: {
    filename: './js/bundle.[contenthash:8].js',
  },
};

module.exports = config;
```

- **5、配置开发环境 config 文件。**

```js
/**
 * dev.config.js
 */
const { merge } = require('webpack-merge');
const common = require('./common.config.js');
const config = merge(common, {
  mode: 'development',
});

module.exports = config;
```

- **6、配置生产环境 config 文件。**

```js
/**
 * prod.config.js
 */
const { merge } = require('webpack-merge');
const common = require('./common.config.js');
const config = merge(common, {
  mode: 'production',
});

module.exports = config;
```

至此，运行`npm run build:dev`即可。运行完之后在`dist/js`文件夹中可以找到打包的文件，在`html`文件中引用此打包文件就可以使用了。但是这里不够方便，需要手动创建 `html` 文件并引入打包的文件，才能看到 js 运行的结果。

- 7、安装`html-webpack-plugin`并且配置,自动引入打包文件。

```js
npm install html-webpack-plugin -D
/**
 * public/index.html
*/
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body></body>
</html>

/**
* common.config.js
*/
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack构建项目",
      template: "./public/index.html", // 需要提前创建此模板。
    }),
  ],
};

module.exports = config;
```

至此，运行`npm run build:dev`即可。运行完之后在`dist`文件夹中可以看到`index.html`文件。但是这里还是不够方便，需要手动打开`index.html`，而且`js`修改之后不能实时看到打包结果。

- 8、安装`webpack-dev-server`，启动一个本地服务。（只针对开发环境）

```js
npm install webpack-dev-server -D

/**
* 修改package.json脚本，开发环境用webpack-dev-server打包
*/
"build:dev": "webpack server --config ./webpack/dev.config.js"

/**
 * dev.config.js
*/
{
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    static: "./dist",
  },
}
```

至此，运行`npm run build:dev`即可。自动打开浏览器，并且能够实时更新打包。

## 进阶配置

### 集成 `typescript` 和 `es6`

- 0、resolve.extensions 配置,自动配置文件后缀名。

```js
resolve: {
    extensions: [".ts", "..."],
},
```

- **1、安装`typescript`、`@babel/core`、`@babel/preset-typescript`、`@babel/preset-env`、`babel-loader`。**

```js
npm install typescript @babel/core @babel/preset-typescript @babel/preset-env babel-loader -D
```

- 2、配置 webpack

```
module: {
    rules: [
      {
        test: /\.ts/,
        use: ["babel-loader"],
      }
    ],
  },
```

- 3、Babel 配置

[可参考 Babel 配置](/article/engineering/babel-config)

至此，集成 `typescript` 和 `es6`完成。

### 集成 `less`

- 1、安装`less-loader`、`css-loader`、`style-loader`、`less`

```
npm install less-loader css-loader style-loader less -D
```

- 2、webpack 配置

```js
module: {
    rules: [
      {
        test: /\.less/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
```
