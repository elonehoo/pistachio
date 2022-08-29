---
outline: deep
---

<script setup lang="ts">
  import {ref} from 'vue'
  import {useMouseMove} from '@elonehoo/pistachio'

  const elref = ref(null);

  const { mouseX, mouseY, pageX, pageY, remove } = useMouseMove(elref);
</script>

# useMouseMove

> The [mousemove event](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event).

## State

The `useMouseMove` function exposes the following reactive state:

```typescript
import { useMouseMove } from '@elonehoo/pistachio'

const { mouseX, mouseY } = useMouseMove()
```

| State | Type | Description |
| :------ | :---- | :----------- |
| mouseX | number | Mouse X position |
| mouseY | number | Mouse Y position |
| pageX | number | Page X (opens new window)position |
| pageY | number | Page Y (opens new window)position |

## Methods

The useOnMouseMove function exposes the following methods:

```typescript
import { useMouseMove } from '@elonehoo/pistachio'

const { remove } = useMouseMove()
```

| Signature | Description |
| :------ | :----------- |
| remove | Manually removes the event listener |

## Example

<div>
  Mouse Move
  <p>x: {{ mouseX }}</p>
  <p>y: {{ mouseY }}</p>
  <p>pageX: {{ pageX }}</p>
  <p>pageY: {{ pageY }}</p>
  <button @click="remove">remove</button>
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useMouseMove } from '@elonehoo/pistachio'

const elref = ref(null)

const { mouseX, mouseY, pageX, pageY, remove } = useMouseMove(elref)
</script>

<template>
  <div ref="elref">
    Mouse Move
    <p>x: {{ mouseX }}</p>
    <p>y: {{ mouseY }}</p>
    <p>pageX: {{ pageX }}</p>
    <p>pageY: {{ pageY }}</p>

    <button @click="remove">
      remove
    </button>
  </div>
</template>

```
