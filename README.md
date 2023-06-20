# typescript-book

深入理解 TypeScript

## TypeScript 项目

### 编译上下文

编译上下文告诉 TypeScript 哪些文件是有效的，哪些是无效的，还包含有正在被使用的编译选项的信息。
在项目的根目录下创建一个空 JSON 文件。通过这种方式，TypeScript 将会把此目录和子目录下的所有 .ts 文件作为编译上下文的一部分，它还会包含一部分默认的编译选项。

### 声明空间

类型声明空间与变量声明空间。

#### 类型声明空间

类型声明空间包含用来当做类型注解的内容，例如下面的类型声明：

```ts
type Bas = {}
let bas: Bas
```

#### 变量声明空间

变量声明空间包含可用作变量的内容。

### 模块

#### 全局模块

在默认情况下，当你开始在一个新的 TypeScript 文件中写下代码时，它处于全局命名空间中。
**使用全局变量空间是危险的，因为它会与文件内的代码命名冲突。**

#### 文件模块

如果在你的 TypeScript 文件的根级别位置含有 `import` 或者 `export`，那么它会在这个文件中创建一个本地的作用域。

#### 文件模块详情

你可以根据不同的 `module` 选项来把 TypeScript 编译成不同的 JavaScript 模块类型：

- AMD：不要使用它，它仅能在浏览器工作；
- SystemJS：这是一个好的实验，已经被 ES 模块替代；

推荐使用 ES 模块语法书写 TypeScript 模块。

## TypeScript 类型系统

### 概览

#### 基本注解

类型注解使用 `:TypeAnnotation` 语法。
使用了变量、函数参数以及函数返回值的类型注解。

```ts
const num: number = 123
function identity(num: number): number {
  return num
}
```

#### 接口

接口能合并众多类型声明至一个类型声明。

```ts
interface Name {
  first: string
  second: string
}
let name: Name
```

#### 类型别名

```ts
type StrOrNum = string | number
let sample: StrOrNum
```

### 从 JavaScript 迁移

为第三方 JavaScript 代码定义环境声明。

#### TypeScript 类型定义的仓库

使用 npm 获取声明文件，编译器会自动引入这些类型。

#### 第三方代码

创建一个针对于特定库的声明文件

#### 额外的非 JavaScript 资源

这里代码写在 `global.d.ts` 文件中：

```ts
declare module '*.css'
```

### @types

#### 使用 @types

安装完之后，不需要特别的配置。

#### 控制全局

通过配置 `compilerOptions.types: [ "jquery" ]` 后，只允许使用 jquery 的 @types 包，即使这个人安装了另一个声明文件，比如 npm install @types/node，它的全局变量（例如 process）也不会泄漏到你的代码中，直到你将它们添加到 tsconfig.json 类型选项。

### 环境声明

#### 声明文件

你可以通过 `declare` 关键字来告诉 TypeScript，你正在试图表述一个其他地方已经存在的代码。
如果一个文件有扩展名 `.d.ts`，这意味着每个根级别的声明都必须以 `declare` 关键字作为前缀。

### lib.d.ts

这个文件包含 JavaScript 运行时以及 DOM 中存在各种常见的环境声明。

#### 编译目标对 lib.d.ts 的影响

设置编译目标为 es6 时，能导致 lib.d.ts 包含更多像 Promise 现代（es6）内容的环境声明。

`lib`分类：

- JavaScript 功能
- 运行环境
- ESNext 功能选项

### 异常处理

JavaScript 有一个 Error 类，用于处理异常。你可以通过 throw 关键字来抛出一个错误。然后通过 try/catch 块来捕获此错误
