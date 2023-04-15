import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  externals: [
    "@vue/compiler-dom",
    "@vue/devtools-api",
    "@vue/runtime-dom",
    "@vue/shared",
    "unbuild",
    "vue"
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
})
