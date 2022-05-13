---
title: 为什么要使用Typescript
nav:
  title: 优秀文章
  path: /article
group:
  path: /typescript
  title: Typescript
---

# 为什么要使用 Typescript

**1、TypeScript 是一门静态类型的语言，然后配合 Typescript 的类型系统，使得开发者在编码时就可以避免大多数类型错误的情况发生。**
类型系统按照「类型检查的时机」来分类，可以分为：

- 动态类型：在运行时才会进行类型检查，往往会导致运行时错误。
- 静态类型：指编译阶段就能确定每个变量的类型，往往会导致语法错误。
  JavaScript 就是一门解释型语言，没有编译阶段，所以它是动态类型：

  ```
  let foo = 1;
  foo.split(' ');
  // Uncaught TypeError: foo.split is not a function
  // 运行时会报错（foo.split 不是一个函数），造成线上 bug
  ```

  TypeScript 在运行前需要先编译为 JavaScript，而在编译阶段就会进行类型检查，所以 TypeScript 是静态类型，这段 TypeScript 代码在编译阶段就会报错了：

  ```
  let foo = 1;
  foo.split(' ');
  // Property 'split' does not exist on type 'number'.
  // 编译时会报错（数字没有 split 方法），无法通过编译
  ```

  **2、 TypeScript 是添加了类型系统的 JavaScript，增加了代码的可读性和可维护性，并且增强了编辑器（IDE）的功能，提供了代码补全、接口提示、跳转到定义、代码重构等能力，这在很大程度上提高了开发效率。**
