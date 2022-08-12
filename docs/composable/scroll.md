---
outline: deep
---

<script setup lang="ts">
import { ref} from 'vue'
import {useScroll} from '@elonehoo/vue-hooks'
const elref = ref(null)

const { scrollTop, scrollLeft, remove } = useScroll(elref);
</script>

# useScroll

> The [scroll event](https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event).

## Parameters

```typescript
import { useScroll } from "@elonehoo/vue-hooks"

const scroll = useScroll()
const scroll = useScroll(wait)
const scroll = useScroll(options, wait?)
const scroll = useScroll(element, options?, wait?)
```

| Parameters | Type |	Required | Default | Description |
| :---------- | :---- | :-------- | :------- | :----------- |
| element |	Ref\<Element> \| Element | `false` |	`window` |	DOM element used to track scroll position |
| options |	boolean \| AddEventListenerOptions |	`false` |	`{passive: true}` |	Listener options |
| wait | number | `false` |	`undefined` |	Debounce event in ms |

:::tip TIP
If no **element** is passed it will use **window** to get the scroll of the page
:::

## State

```typescript
import { useScroll } from "@elonehoo/vue-hooks"

const { scrollTop, scrollLeft } = useScroll()
```

| State |	Type | Description |
| :---------- | :---- | :-------- |
| scrollTop |	`number` |	Scroll top position, if value is set it will call scrollTopTo |
| scrollLeft | `number` |	Scroll let position, if value is set it will call scrollLeftTo |

## Methods

```typescript
import { useScroll } from "@elonehoo/vue-hooks"

const { remove, scrollTo, scrollLeftTo, scrollTopTo } = useScroll()
```

| Signature | Description |
| :---------- | :----------- |
| `remove` | Manually removes the event listener |
| `scrollTo` | Same as calling [element.scrollTo()](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo) |
| `scrollBy` | Same as calling [element.scrollBy()](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollBy) |
| `scrollIntoView` | Same as calling [element.scrollIntoView()](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) |
| `scrollLeftTo` | Calls scrollTo with left argument |
| `scrollTopTo` | Calls scrollTo with top argumen |

## Example

<div>
  Scroll
  <p>top: {{ scrollTop }}</p>
  <p>left: {{ scrollLeft }}</p>
  <div ref="elref" style="overflow:scroll;height:70px;background:gray">
    <p v-for="x in 10" :key="x">{{ x }}</p>
  </div>
  <button @click="remove">remove</button>
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useScroll } from '@elonehoo/vue-hooks'
const elref = ref(null)

const { scrollTop, scrollLeft, remove } = useScroll(elref);
</script>

<template>
<div>
  Scroll
  <p>top: {{ scrollTop }}</p>
  <p>left: {{ scrollLeft }}</p>
  <div ref="elref" style="overflow:scroll;height:70px;background:gray">
    <p v-for="x in 10" :key="x">{{ x }}</p>
  </div>
  <button @click="remove">remove</button>
</div>
</template>

```
