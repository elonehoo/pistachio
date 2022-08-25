---
outline: deep
---

<script setup lang="ts">
import { useRefShared } from '@elonehoo/vue-hooks'

const myRefVar = useRefShared('Hello world')
</script>

# useRefShared

> Short version, this uses `useSharedRef` in HIVE mode.


## Parameters

```typescript
import { useRefShared } from '@elonehoo/vue-hooks'

const refShared = useRefShared(defaultValue?, id?)
```

| Parameters | Type | Required | Default | Description |
| :---------- | :---- | :-------- | :------- | :---------- |
| defaultValue | T | false | undefined | Default value |
| id | string | false | undefined | BroadcastChannel name, if not provided it will get be default `getCurrentInstance().$vnode.tag` this will allow have 1 shared reference per component |

## State

The `useRefShared` function returns a reactive `ref` variable:

```typescript
import { useRefShared } from '@elonehoo/vue-hooks'

const myShared = useRefShared()
```

## Example

<div>
  <p>
    To test please open 2 or more tabs and edit the input box
  </p>
  <input v-model="myRefVar">
</div>

```vue
<script setup lang="ts">
import { useRefShared } from '@elonehoo/vue-hooks'

const myRefVar = useRefShared('Hello world')
</script>

<template>
  <div>
    <p>
      To test please open 2 or more tabs and edit the input box
    </p>
    <input v-model="myRefVar">
  </div>
</template>
```
