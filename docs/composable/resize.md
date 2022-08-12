---
outline: deep
---

<script setup lang="ts">
import {useResize} from '@elonehoo/vue-hooks'
const { height, width, remove } = useResize(document.body);
</script>

# useResize

> The [resize event](https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event).

## State

The `useResize` function exposes the following reactive state:

```typescript
import { useResize } from "@elonehoo/vue-hooks"

const { height, width } = useResize()
```

| State |	Type | Description |
|:-------|:------|:-------------|
| height | number | element height |
| width |	number | element width |

## Methods

The `useResize` function exposes the following methods:

```typescript
import { useResize } from "@elonehoo/vue-hooks"

const { remove } = useResize()
```

| Signature |	Description |
|:-------|:------|
| remove | Manually removes the event listener |

## Example

<div>
  Window Resize
  <p>height: {{ height }}</p>
  <p>width: {{ width }}</p>
  <button @click="remove">remove</button>
</div>

```vue
<script setup lang="ts">
import {useResize} from '@elonehoo/vue-hooks'

const { height, width, remove } = useResize(document.body);

</script>

<template>
  <div>
    Window Resize
    <p>height: {{ height }}</p>
    <p>width: {{ width }}</p>

    <button @click="remove">remove</button>
  </div>
</template>
```
