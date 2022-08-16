---
outline: deep
---

<script setup lang="ts">
import { ref } from 'vue';
import { useOutsidePress } from '@elonehoo/vue-hooks'

const elref = ref(null);

useOutsidePress(elref, () => console.log("clicked outside"))
</script>

# useOutsidePress

> Execute callback when click is outside of element

## Parameters

```typescript
import { useOutsidePress } from '@elonehoo/vue-hooks'

useOutsidePress(element, callback)
```

| Parameters | Type |	Required | Default | Description |
|:------------|:------|:----------|:---------|:-------------|
| element |	`Ref\<Element>` |	`true` | Element to keep track if clicked outside |
| callback | `(e: MouseEvent) => void` | `true` |	Callback when clicked outside |

## Methods

The `useOutsidePress` function exposes the following methods:

```typescript
import { useOutsidePress } from '@elonehoo/vue-hooks'

const remove = useOutsidePress()
```
|Signature | Description|
|:---------|:------------|
|remove |	Manually removes the event listener |

## Example

<div>
  <div ref="elref" style="background: #99CC99;width:100px">
    Click Outside or inside
  </div>
  <p>check the console</p>
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useOutsidePress } from '@elonehoo/vue-hooks'

const elref = ref(null)

useOutsidePress(elref, () => console.log('clicked outside'))
</script>

<template>
  <div>
    <div ref="elref" style="background: #99CC99;width:100px">
      Click Outside or inside
    </div>
    <p>check the console</p>
  </div>
</template>
```
