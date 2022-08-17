---
outline: deep
---

<script setup lang="ts">
import { useBreakpoint } from '@elonehoo/vue-hooks'

const {current,S,L,XL} = useBreakpoint({ XL: 1280, L: 768, S: "(min-width: 320px)" });
</script>

# useBreakpoint

> Allows to get reactive object on the current windows size.

:::warning
If `number` or `{number}px` it checks the defined breakpoint against `window.innerWidth`. `bp >= window.innerWidth` If `MediaQuery` is passed it will not be able to resolve the `current` breakpoint
:::

## State

The `useBreakpoint` function exposes the following reactive state:

```typescript
import { useBreakpoint } from '@elonehoo/vue-hooks'

const { current, /* properties from the arguments */ L, XL } = useBreakpoint({
  L: 720,
  XL: 1280,
  S: "(min-width: 320px)" // also supports media query - it uses `useMatchMedia`
});
```

| State |	Type | Description |
|:-------|:------|:-------------|
| current |	String | Smallest breakpoint key. where the breakpoint is an Number |
| ...args | Args | returns the object with the same keys but with reactive boolean value |

## Methods

The `useBreakpoint` function exposes the following methods:

```typescript
import { useBreakpoint } from '@elonehoo/vue-hooks'

const { remove } = useBreakpoint()
```

| Signature |	Description |
|:-------|:-------------|
| remove | Manually removes the event listener |

## Example

<div>
  <div>Current breakpoint {{ current || "none" }}</div>
  <div>valid breakpoints:</div>
  <p><b v-if="S">Small</b></p>
  <p><b v-if="L">Large</b></p>
  <p><b v-if="XL">Extra Large</b></p>
</div>

```vue
<script setup lang="ts">
import { useBreakpoint } from '@elonehoo/vue-hooks'

const {current,S,L,XL} = useBreakpoint({ XL: 1280, L: 768, S: "(min-width: 320px)" });
</script>

<template>
  <div>
    <div>Current breakpoint {{ current || "none" }}</div>
    <div>valid breakpoints:</div>
    <p><b v-if="S">Small</b></p>
    <p><b v-if="L">Large</b></p>
    <p><b v-if="XL">Extra Large</b></p>
  </div>
</template>
```
