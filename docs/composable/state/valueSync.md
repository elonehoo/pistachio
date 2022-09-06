---
outline: deep
---

<script setup lang="ts">
import { ref } from 'vue'
import { useValueSync } from '@elonehoo/pistachio'

const value = ref('')
const list = useValueSync(value, ref(1), ref('1'))
</script>

# useValueSync

> Syncs variables value, across multiple `ref`

## Parameters

```typescript
import { useValueSync } from '@elonehoo/pistachio'

useValueSync(main, list?)
useValueSync(main, arg1, arg2, arg3)
```

| Parameters | Type                        | Required | Default     | Description                             |
| :--------- | :-------------------------- | :------- | :---------- | :-------------------------------------- |
| main       | `Ref<T>`                    | `true`   |             | Main variable to keep the other synched |
| list       | `Ref<Ref<T[]>>` \| `Ref<T>[]` | `false`  | `[]`        | List of `ref` to keep values synched    |
| arg1, arg2 | `Ref<T>`                    | `true`   | `undefined` | `ref` to keep values synched            |

## State

The `useValueSync` function exposes the following reactive state:

```typescript
import { useValueSync } from '@elonehoo/pistachio'

const list = useValueSync()
```

| State | Type            | Description            |
| :---- | :-------------- | :--------------------- |
| list  | `Ref<Ref<T>[]>` | List of tracked `ref`  |

## Example

<div>
  <input v-model="value">

  <p>{{ list }}</p>
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useValueSync } from '@elonehoo/pistachio'

const value = ref('')
const list = useValueSync(value, ref(1), ref('1'))
</script>

<template>
  <div>
    <input v-model="value">

    <p>{{ list }}</p>
  </div>
</template>
```
