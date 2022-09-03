---
outline: deep
---

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { useIntersectionObserver } from '@elonehoo/pistachio'

const el = ref(null);
const {isIntersecting} = useIntersectionObserver(el)
</script>

# useIntersectionObserver

> The [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

## State

The `useIntersectionObserver` function exposes the following reactive state:

```typescript
import { useIntersectionObserver } from '@elonehoo/pistachio'

const { supported, elements, isIntersecting } = useIntersectionObserver( options )
```

| State | Type | Description |
| :---- | :--- | :---------- |
| supported | boolean | Is supported |
| elements | Ref\<IntersectionObserverEntry[]> | [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) |
| isIntersecting| Ref\<boolean> | Returns true if all observed elements are intersection |

## Methods

The `useIntersectionObserver` function exposes the following methods:

```typescript
import { useIntersectionObserver } from '@elonehoo/pistachio'

const { observe, unobserve, disconnect, debug } = useIntersectionObserver()
```

| Signature | Description |
| :-------- | :---------- |
| observe(Element) | Starts observing Element |
| unobserve(Element) | Stops observing Element |
| disconnect() | [IntersectionObserver.disconnect](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/disconnect) |

## Example

<div>
  Visible: {{ isIntersecting }}

  <p>Scroll down</p>

  <div style="height:500px" />

  <div ref="el" style="background:lightgreen">
    Hide me
  </div>

  <p>Scroll up</p>
</div>

```vue
<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useIntersectionObserver } from '@elonehoo/pistachio'

const el = ref(null)
const { isIntersecting } = useIntersectionObserver(el)
</script>

<template>
  <div>
    Visible: {{ isIntersecting }}

    <p>Scroll down</p>

    <div style="height:500px" />

    <div ref="el" style="background:lightgreen">
      Hide me
    </div>

    <p>Scroll up</p>
  </div>
</template>
```
