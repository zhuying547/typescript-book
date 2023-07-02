使用 TypeScript 进行代码编写，然后要确保编译后的 JavaScript 代码能在浏览器中运行。

TS系统中的 `import(somePath)` 仅仅是导入模块声明。

## FAQ

### 在 Node 环境中运行 ESM

在CJS规范中，导入 JavaScript 模块是不需要写扩展名的：`require('foo')`

在ESM中要求必须写文件扩展名，但是ts编写的代码中是不需要后缀名的，甚至你补充ts后缀名还会报错。

最终的方案是：`node --es-module-specifier-resolution=node main.js` 

### extends

在 tsconfig.json 文件中使用 extends 去扩展其它配置文件，这时 extends 配置的优先级是最低的。类似继承的规则，如果当前 tsconfig.json 存在相同的配置，那么会使用当前 tsconfig.json 的配置。如果当前 tsconfig.json 中没有该配置则继承 extends 扩展文件中的配置。

### references

在tsconfig.json里配置references具体的影响在哪里呢？

使用项目引用改善编辑器的交互时间，执行组件之间的逻辑分离，并以新的和改进的方式组织你的代码。

`tsc --build` 与 project references 一起工作开启更快的 TypeScript 构建。

当引用一个项目中会发生下面的事：

- 从引用的项目导入模块时，会加载其输出的声明文件（.d.ts）而不是源代码文件。

tsconfig.json 的文件就是在运行 tsc 对ts文件进行编译时的配置。如果我不在tsconfig.json配置好项目引用的话，那么我在tsc编译ts代码的时候就会出现模块未找到的报错。所以这个时候我就得配置project references，注意此时project references还需要考虑顺序的。

如果没有项目引用的话，导入另一个项目的模块会变得非常难用。

create-vue的那种格式就一个问题，就是在编译的时候使用的是tsconfig.json吗？

那么问题来了，vite 是如何处理ts的转译的？esbuild是如何处理的

esbuild会将代码进行转译，当然用的是esbuild内置的配置，这个时候需要单独通过tsc去检测类型，注意测试的配置需要和esbuild的默认行为保持一致。esbuild只会使用tsconfig.json中的某些配置。

```json
// tsconfig.json
{
  "compilerOptions": {
    "isolatedModules": true,
    "esModuleInterop": true
  }
}
```

我在项目中可以使用tsconfig.node.json和tsconfig.app.json编译后的模块。

所以当我在.vue文件中使用import时，导入的其实是被tsconfig.app.json的模块声明。

只有哪些引用的模块才会被tsconfig.app.json或tsconfig.node.json处理。其它的则是被 tsconfig.json 处理的也会被esbuild尊重。当然像volar这样的插件也会尊重tsconfig.json不会去处理其它的引用项目的。
