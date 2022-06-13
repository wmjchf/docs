---
title: 工程化搭建组件库
nav:
  title: 组件库搭建
  path: /cthink
  order: 1
order: 1
---

# 从工程化的角度搭建组件库

## 开发流程应该怎么规范

熟话说，不以规矩，不能成方圆。良好的代码规范，不管是对于个人还是团队都非常重要。为了提供代码质量和统一代码规范，我选择了 eslint 来做代码检查，并且在最后提交到 git 仓库时用 husky 搭配 lint-stage 进行预检查，保证线上仓库的代码符合要求。

## eslint 配置

**1、vscode 安装插件 eslint 和 npm 安装 eslint**

```
npm install eslint -D
```

**2、新建.eslintrc 配置文件**

```js
{
  "rules": {
        "semi": [
            "error",
            "always"
        ],
        "quotes": [
            "error",
            "double"
        ]
    }
}
```

**3、vscode 的 setting.json 配置 eslint.validate**

```js
// 支持typescirpt文件检查
"eslint.validate": [
    "typescript"
],
// 支持保存根据配置自动格式化
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
}
```

现在 eslint 配置 vscode 就可以正常使用了。上面的配置只是 eslint 的入门配置，在实际项目开发中，需要有更加复杂的配置如下。

**4、parse 解析器配置**
ESLint 的默认解析器和(espree)核心规则只支持最新的最终 ECMAScript 标准，不支持 Babel 提供的实验性（如新特性）和 non-standard（如流或 TypeScript 类型）语法，此时这里可以自定义解析器。

```
{
    "parser": "@typescript-eslint/parser"
    // 先调用typescript模块，生成标准的 TypeScript AST，
    // 然后再将它转换成兼容 ESLint的ESTree
}

```

**6、env 设置编码环境**

```js
// 设置环境
// 设置您的脚本在哪种环境中运行。每个环境都会带来一组特定的预定义全局变量。
// 可以简单理解为批量设置全局变量，这些环境不是互斥的，因此您一次可以定义多个环境。
// 开启全部环境
"env": {
    "browser": true,             // 浏览器全局变量
    "node": true,                // Node.js 全局变量和 Node.js 作用域
    "commonjs": true,            // CommonJS 全局变量和 CommonJS 作用域 (启用此环境用于使用 Browserify/WebPack 的 browser-only 代码)
    "es6": true,                 // 启用除 modules 以外的所有 ECMAScript 6 特性  (这会自动将 `ecmaVersion` 解析器选项设置为 6)
    "es2017": true,              // 添加所有 ECMAScript 2017 的全局变量并且自动设置 `ecmaVersion` 解析器选项设置为 8
    "es2020": true,              // 添加所有 ECMAScript 2020 的全局变量并且自动设置 `ecmaVersion` 解析器选项设置为 11
    "es2021": true,              // 添加所有 ECMAScript 2021 的全局变量并且自动设置 `ecmaVersion` 解析器选项设置为 12
    "amd": true,                 // 根据 amd 规范定义 `require()` 和 `define()` 作为全局变量
}
```

**7、globals 设置全局变量**

```js
// 全局变量
// 如果访问未在同一文件中定义的变量，将会出现 no-undef 警告。如果要在文件内部使用全局变量，为了让 ESLint 不会出现警告，需要进行定义。
// readonly-可读不可写 writable-可读可写
"globals": {
    "WX": "readonly",
    "Wang":"writable"
}
```

**8、plugins 自定义规则**
虽然官方提供了很多规则，但是总有覆盖不到的情况。这时候可以使用 plugin 定义自己的规则。引入 plugin 可以理解为引入了额外的 rules，需要在 rules、extends 中定义后才会生效。

```
"plugins": ["@typescript-eslint"],
```

**9、extends 批量扩展规则**
规则集，批量扩展规则。对于不同项目，如果希望使用相同的 rules，直接复制粘贴显然不是一个好方法，一是 rules 太多，配置文件会显得很乱，二是无法同步更新。推荐使用的方法是把所需的 rules 抽离成一个 npm 包，需要的时候再通过 `extends` 引用。

```
"extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
],
```

**10、rules 逐条配置规则**
优先级最高，会覆盖 extends 的规则，同样也是要先配置 plugin，plugin 定义的规则才会生效。

```
rules:{
  //  根据自己或者团队的规范配置
}
```

至此，配置全部完成。

## 组件库需要具备哪些特点

- 按需加载，默认支持基于 ES modules 的 tree shaking。

- Typescript，提供了完整的定义文件。

以上两点对于组件库是非常重要的。
