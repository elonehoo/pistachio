---
outline: deep
---

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useMouse } from "@elonehoo/vue-hooks"

const elref = ref<any>(null);
const state = reactive({
  x: 0,
  y: 0
});
const remove = useMouse(elref, "mousemove", (e) => {
  state.x = e.x;
  state.y = e.y;
});
</script>

# useMouse

Base composable used in the other element composables

## Methods

The useMouse function returns a remove function

```typescript
import { useMouse } from '@elonehoo/vue-hooks'

const remove = useMouse(element, name, listener)
```

## Example

<div ref="elref">
  Mouse
  <p>x: {{ state.x }}</p>
  <p>y: {{ state.y }}</p>
  <button @click="remove">remove</button>
</div>

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useMouse } from '@elonehoo/vue-hooks'

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

<template>
  <div id="elref" ref="elref">
    Mouse
    <p>x: {{ state.x }}</p>
    <p>y: {{ state.y }}</p>

    <button @click="remove">
      remove
    </button>
  </div>
</template>
```


