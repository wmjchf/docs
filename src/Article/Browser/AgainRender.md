---
title: 重新认识HTML渲染过程
nav:
  title: 基础沉淀
  path: /article
group:
  path: /browser
  title: 浏览器
  order: 2
order: 1
---

# 重新认识 HTML 渲染过程

## 之前的渲染过程

`构建DOM 树` -> `构建CSSOM 树` -> `构建render 树` -> `布局(layout)` -> `绘制(paint)` -> `合成（composition）`。

## 现在的渲染过程

**1、构建 DOM 树**

第一步构建 DOM 树都是一样的。

**2、样式计算**

以前都说是 `构建CSSOM树`。`样式计算`的过程分为三步：

- 第一步是转换成浏览器能够理解的`结构（styleSheets）`，把`link 引入`、`style 标签内`、`行内样式`整合变成样式表，可以通过 document.styleSheets 查看。

- 第二步是把属性值进行标准化：我们设置样式为 rem、bold、red 等，最终会被解析成 px、700、rgb(255, 0, 0)，这就是属性值标准化。

-
