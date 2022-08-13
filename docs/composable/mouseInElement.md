---
outline: deep
---

<script setup lang="ts">
import { ref } from 'vue'
import { useMouseInElement } from '@elonehoo/vue-hooks'

const el = ref(null)
const { distance } = useMouseInElement(el)
</script>

# useMouseInElement

> Distance in pixels from an element

## Parameters

```typescript
import { useMouseInElement } from '@elonehoo/vue-hooks'

useMouseInElement(element, options?, wait?)
```

| Parameters | Type |	Required | Default | Description |
| :----------- | :---- | :-------- | :------- | :----------- |
| element |	Ref\<HTMLElement> \| HTMLElement | true |	| Element |
| options |	boolean \| AddEventListenerOptions | false | `{passive: true}` |	Listener options
| wait | number | false |	undefined |	Debounce event in ms |

## State

The `useMouseInElement` function exposes the following reactive state:

```typescript
import { useMouseInElement } from '@elonehoo/vue-hooks'

const { distance } = useMouseInElement()
```

| State |	Type | Description |
| :----------- | :---- | :----------- |
| distance | Computed\<number> | Distance in pixels from Element center |

## Methods

The `useMouseInElement` function exposes the following methods:


```typescript
import { useMouseInElement } from '@elonehoo/vue-hooks'

const { remove } = useMouseInElement()
```

| Signature |	Description |
| :----------- | :----------- |
| remove | Manually removes the event listener |

## Example

<div>
  Mouse distance: <b>{{ distance }}px</b>
  <div ref="el" style="height: 10px; width: 10px; background: #99CC99"></div>
</div>

```vue
<script setup lang="ts">
  import { ref } from 'vue'
  import { useMouseInElement } from '@elonehoo/vue-hooks'

  const el = ref(null)
  const { distance } = useMouseInElement(el)
</script>

<template>
  <div>
    Mouse distance: <b>{{ distance }}px</b>
    <div ref="el" style="height: 10px; width: 10px; background: #99CC99"></div>
  </div>
</template>
```
