// ./node_modules/lodash
// 如果是文件夹 ./node_modules/lodash/index.ts
// ./node_modules/lodash/package.json 的 types 指定文件
// ./node_modules/lodash/package.json 的 main 文件
import { chunk } from 'lodash-es';
console.log(chunk(['a', 'b', 'c', 'd'], 2));
