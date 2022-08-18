---
outline: deep
---

<script setup lang="ts">
import {ref} from 'vue'
import { useInterval } from '@elonehoo/vue-hooks'

const date = ref()

useInterval(()=>date.value = new Date(),1000)
</script>

# useInterval

> `setInterval` with `start`/`remove` and `clearInterval` on unmounted.

## Parameters

```typescript
import { useInterval } from '@elonehoo/vue-hooks'

useInterval(callback, ms?, ...args)
```

| Parameters | Type | Required | Default | Description |
| :---------- | :---- | :-------- | :------- | :----------- |
| callback | (...args):void | true | `setInterval` callback |
| ms | `number` \| `false` \| `undefined` |	false |	undefined	| callback interval `ms`, if `ms` provided it will `setInterval` automatically |
| ...args |	any |	false |	[ ] | callback args |

## Methods

The `useInterval` function exposes the following methods:

```typescript
import { useInterval } from '@elonehoo/vue-hooks'

const { start, remove } = useInterval()
```

| Signature | Description |
| :-------- | :----------- |
| start | Start |
| remove | Manually clearInterval |

## Example

<div>
  {{date}}
</div>

```vue
<script setup lang="ts">
  import {ref} from 'vue'
  import { useInterval } from '@elonehoo/vue-hooks'

  const date = ref()

  useInterval(()=>date.value = new Date(),1000)
</script>

<template>
  <div>
    {{date}}
  </div>
</template>
```
