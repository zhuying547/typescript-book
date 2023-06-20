import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: './dist/main.js',
  output: [
    {
      file: 'bundle.js',
      format: 'cjs',
    },
  ],
  plugins: [resolve()],
}
