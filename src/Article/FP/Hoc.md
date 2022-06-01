---
title: 高阶函数HOC
nav:
  title: 优秀文章
  path: /article
group:
  path: /fp
  title: 函数式编程
  order: 6
order: 2
---

# 高阶函数 HOC

## 什么是高阶函数

至少满足下列一个条件的函数：

- 接受一个或多个函数作为输入。
- 输出一个函数。

`高阶函数`是一个接收函数作为参数传递或者将函数作为返回值输出的函数。

## 函数作为参数传递

JavaScript 语言中内置了一些高阶函数。例如：Array.prototype.map

- 不使用高阶函数

```js
const arr1 = [1, 2, 3, 4];
const arr2 = [];
for (let i = 0; i < arr1.length; i++) {
  arr2.push(arr1[i] * 2);
}

console.log(arr2);
// [2, 4, 6, 8]
console.log(arr1);
// [1, 2, 3, 4]
```

- 使用高阶函数

```js
// 木易杨
const arr1 = [1, 2, 3, 4];
const arr2 = arr1.map((item) => item * 2);

console.log(arr2);
// [2, 4, 6, 8]
console.log(arr1);
// [1, 2, 3, 4]
```

## 函数作为返回值输出

现在有这么一个场景，需要判断一个变量的数据类型。比较常见的做法是这样：

```js
// 判断是否是字符串
const isString = (obj) =>
  Object.prototype.toString.call(obj) === '[object String]';

// 判断是否是数组
const isArray = (obj) =>
  Object.prototype.toString.call(obj) === '[object Arrat]';
// 判断是否是数字
const isNumber = (obj) =>
  Object.prototype.toString.call(obj) === '[object Number]';
```

可以发现上面三行代码有很多重复代码，只需要把具体的类型抽离出来就可以封装成一个判断类型的方法了，代码如下:

```js
const isType = (type) => (obj) => {
  return Object.prototype.toString.call(obj) === '[object ' + type + ']';
};

isType('String')('123'); // true
isType('Array')([1, 2, 3]); // true
isType('Number')(123); // true
```

## 总结

从上面例子可以看出，`高阶函数`能够很大程度提高代码的复用性、可读性。实际项目中使用`高阶函数`设计系统能够取得更加不可思议的效果和美妙的开发体验。
