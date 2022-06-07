---
title: 构建工具如何选择
nav:
  title: 组件库搭建
  path: /cthink
  order: 1
order: 1
---

# 构建工具如何选择

## webpack

## rollup

## 总结

对于 `Webpack` 大而全，`Rollup` 小而美，我的选择基本原则是应用开发优先 `webpack`，类库或框架开发使用 `Rollup`。这是因为在开发 `js` 库时，`webpack` 的繁琐和打包后的文件体积太大，而 `rollup` 就是针对 `js` 库和框架开发的，它只是生成代码将我们的代码转为目标 `js`。
