---
title: webpack配置
nav:
  title: 优秀文章
  path: /article
group:
  path: /webpack
  title: Webpack
---

# 从零到一配置 webpack

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

- 4、配置公共 config 文件

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

- 5、配置开发环境 config 文件

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

- 6、配置生产环境 config 文件

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
