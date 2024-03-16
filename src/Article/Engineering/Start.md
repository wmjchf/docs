---
title: 对前端工程化的理解
order: 0
nav:
  title: 基础沉淀
  path: /article
group:
  path: /engineering
  title: 前端工程化
  order: 5
---

# 前端工程化

`前端工程化`的主要目标就是解放生产力、提高生产效率。通过制定一系列的规范，借助工具和框架解决前端开发以及前后端协作过程中的痛点和难度问题。

前端越来越重，复杂度越来越高，配套的前端工程体系也在不断发展和完善，可简单分为开发、构建、发布 3 条主线：

- 前端框架：插件化（jQuery） -> 模块化（RequireJS） -> 组件化（React）
- 构建工具：任务化（grunt/gulp） -> 系统化（webpack）
- CI/CD：工具化（Jenkins） -> 自动化（Web Hook）

三大主线撑起了前端工程体系，系统地覆盖了前端开发的主流程，其中的工程方法也彼此互补、相互影响。

## 工程化 ≠ 某个工具

为什么这样说呢？因为在现阶段有部分的工具过于强大，比如说像 Webpack，导致了很多新手就误认为工程化就是 Webpack。这样的工具并不是工程化的核心，工程化的核心应该是对项目整体的一种规划或者架构，而工具在这个过程当中，只是用来去落地去实现这种规划和架构的一种手段。

## 工程化与 Node.js

工程化的一切都应该归功于 Node.js。之前，有人说 Ajax 给前端带来了新的生命力，那我个人觉得 Node.js 对于前端而言，它除了让 JavaScript 有了一个新的舞台，它更多的是让我们整个前端行业进行了一次工业革命，可以毫不夸张的说，没有 Node.js 就没有今天的前端，而且在接下来很长一段时间当中，我们用到的工具几乎都是用 Node.js 去开发的。所以说，前端工程化是 Node.js 强力驱动的。

## webpack 简介

> 本质上，webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 依赖图(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。

webpack 的作用有以下几点：

- 模块打包。可以将不同模块的文件打包整合在一起，并且保证它们之间的引用正确，执行有序。利用打包我们就可以在开发的时候根据我们自己的业务自由划分文件模块，保证项目结构的清晰和可读性。
- 编译兼容。在前端的“上古时期”，手写一堆浏览器兼容代码一直是令前端工程师头皮发麻的事情，而在今天这个问题被大大的弱化了，通过`webpack` 的 `Loader` 机制，不仅仅可以帮助我们对代码做 `polyfill`，还可以编译转换诸如`.less`, `.vue`, `.jsx` 这类在浏览器无法识别的格式文件，让我们在开发的时候可以使用新特性和新语法做开发，提高开发效率。
- 能力扩展。通过 `webpack` 的 `Plugin` 机制，我们在实现模块化打包和编译兼容的基础上，可以进一步实现诸如按需加载，代码压缩等一系列功能，帮助我们进一步提高自动化程度，工程效率以及打包输出的质量。

### 打包运行原理

- 1、读取 `webpack` 的配置参数；
- 2、启动 `webpack`，创建 `Compiler` 对象并开始解析项目；
- 3、从入口文件（`entry`）开始解析，并且找到其导入的依赖模块，递归遍历分析，形成依赖关系树；
- 4、对不同文件类型的依赖模块文件使用对应的 Loader 进行编译，最终转为 Javascript 文件；
- 5、整个过程中 webpack 会通过发布订阅模式，向外抛出一些 hooks，而 webpack 的插件即可通过监听这些关键的事件节点，执行插件任务进而达到干预输出结果的目的。

其中文件的解析与构建是一个比较复杂的过程，在 `webpack` 源码中主要依赖于 `compiler` 和 `compilation` 两个核心对象实现。

`compiler` 对象是一个全局单例，他负责把控整个 `webpack` 打包的构建流程。`compilation` 对象是每一次构建的上下文对象，它包含了当次构建所需要的所有信息，每次热更新和重新构建，`compiler` 都会重新生成一个新的 `compilation` 对象，负责此次更新的构建过程。

而每个模块间的依赖关系，则依赖于 `AST` 语法树。每个模块文件在通过 `Loader` 解析完成之后，会通过 `acorn` 库生成模块代码的 `AST` 语法树，通过语法树就可以分析这个模块是否还有依赖的模块，进而继续循环执行下一个模块的编译解析。

## rollup 简介

> Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中，而不是以前的特殊解决方案，如 CommonJS 和 AMD。ES6 模块可以使你自由、无缝地使用你最喜爱的 library 中那些最有用独立函数，而你的项目不必携带其他未使用的代码。ES6 模块最终还是要由浏览器原生实现，但当前 Rollup 可以使你提前体验。

相比其他 JavaScript 打包工具，`Rollup` 总能打出更小，更快的包。因为 `Rollup` 基于 `ES2015` 模块，比 `Webpack` 和 `Browserify` 使用的 `CommonJS` 模块机制更高效。这也让 `Rollup` 从模块中删除无用的代码，即 tree-shaking 变得更容易。

### ES2015 模块打包支持

这个也是其他构建工具所不具备的。Rollup 直接不需要通过 babel 将 import 转化成 Commonjs 的 require 方式，极大地利用 ES2015 模块的优势。

## webpack 和 rollup

其实，通过分别对 Webpack 和 Rollup 的介绍，不难看出，Webpack 和 Rollup 在不同场景下，都能发挥自身优势作用。Webpack 对于代码分割和静态资源导入有着“先天优势”，并且支持热模块替换(HMR)，而 Rollup 并不支持，所以当项目需要用到以上，则可以考虑选择 Webpack。但是，Rollup 对于代码的 Tree-shaking 和 ES6 模块有着算法优势上的支持，若你项目只需要打包出一个简单的 bundle 包，并是基于 ES6 模块开发的，可以考虑使用 Rollup。

其实 Webpack 从 2.0 开始支持 Tree-shaking，并在使用 babel-loader 的情况下支持了 es6 module 的打包了，实际上，Rollup 已经在渐渐地失去了当初的优势了。但是它并没有被抛弃，反而因其简单的 API、使用方式被许多库开发者青睐，如 React、Vue 等，都是使用 Rollup 作为构建工具的。而 Webpack 目前在中大型项目中使用得非常广泛。最后，用一句话概括就是：在开发应用时使用 Webpack，开发库时使用 Rollup。