import type { Options } from 'tsup'

export default <Options>{
  entryPoints: [
    'src/index.ts',
  ],
  external:[
    "@vue/compiler-dom",
    "@vue/devtools-api",
    "@vue/runtime-dom",
    "@vue/shared",
    'vue'
  ],
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
}
