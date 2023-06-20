Rollup 是一个用于 JavaScript 的模块打包工具，它使用 JavaScript 的 ES6 版本中包含的新标准化代码模块格式。

**ES 模块允许你自由无缝地组合你最喜欢的库中最有用的个别函数。**

提供应用程序入口点，将所有导入最终编译到单个文件中。

## 配置文件

配置文件是一个 ES 模块，它导出一个默认对象。
`rollup.config.js`、`rollup.config.mjs`、``

### 当使用原生 ES 模块作为配置文件时，有一些需要注意的事项。

#### 获取当前目录

对于 CommonJS 文件，人们经常使用 `__dirname` 访问当前目录并将相对路径解析为绝对路径。这在原生 ES 模块中不被支持。

```js
import { fileURLToPath } from 'node:url'
export default {
  // 为 <currentdir>/src/some-file.js 生成绝对路径
  external: [fileURLToPath(new URL('src/some-file.js', import.meta.url))],
}
```

使用其他语言编写配置文件，比如 TypeScript。为此，安装相应的 Rollup 插件`@rollup/plugin-typescript`

导入使用 NPM 安装的模块、使用 Babel 编译代码、处理 JSON 文件等等。
我们选择 iife 作为格式。该格式会将代码封装起来，以便可以通过浏览器中的 script 标签使用，同时避免与其他代码产生不必要的交互。

## Conclusion

Rollup 的打包源码是 ESM 编写，最终输出的结果是 CJS 规范的代码，同时打包成最终单个文件。

Q1: 如果我在源码中使用第三方库 ES 版本怎么办呢？
需要使用 `@rollup/plugin-node-resolve`
然后编译成 CommonJS 后用 require 导入，这个库不支持 CommonJS 怎么办。答案是无所谓的，人家最终输出的结果是平平无奇的 js 代码。
