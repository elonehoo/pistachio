# Get Started

## Install

```bash
# npm
npm install @elonehoo/pistachio

# yarn
yarn add @elonehoo/pistachio

#pnpm
pnpm install @elonehoo/pistachio
```

::: tip NOTE
Pistachio requires vue >= v3.2
:::

## Demos

[Vue3 + vite](https://github.com/elonehoo/pistachio/tree/main/example)

## Usage Example

Simply importing the functions you need from `@elonehoo/pistachio`

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useMouse } from '@elonehoo/pistachio'

const elref = ref<any>(null)
const state = reactive({
  x: 0,
  y: 0
})
const remove = useMouse(elref, 'mousemove', (e) => {
  state.x = e.x
  state.y = e.y
})
</script>
```
