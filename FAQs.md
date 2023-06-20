## package.json

在 package.json 文件中添加 `"type": "module"`，其目的是告知 Node 中以 ESM 语法运行代码（指的是 tsc 编译后的 js 代码）。

此时 tsconfig.json 中设置 `"compilerOptions": { "module": "ES6" }` 确保编译后的 js 代码为 ESM 模块。

### import 缺少后缀名导致的问题

此时最重要的是 Node 在解析 ES 模块的代码时由于导入没有后缀名会导致异常。解决方案：`node --es-module-specifier-resolution=node`

`--es-module-specifier-resolution=node` 会将解析策略设置为 `node` 。这样，在使用 ECMAScript 模块语法时，可以直接使用文件路径而不需要指定文件扩展名。

在 TypeScript 中，直接在导入语句中使用 ts 文件后缀名是不允许的。这是因为 TypeScript 编译器假设你在导入语句中引用的是 JavaScript 文件，而不是 TypeScript 文件。在模块解析过程中，它会自动查找对应的 JavaScript 文件。

由于 TS 编译的最终 ESM 是没有后缀名的，这就导致 ES 的导入既不能在 Node 中运行又不能在浏览器中运行。这时就需要打包，同时由于 export default 导致 import 时不支持 default 还需要做解构，麻烦的一比。
