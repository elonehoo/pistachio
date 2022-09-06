---
outline: deep
---

<script setup lang="ts">
import { ref } from 'vue'
import { useTimeline } from '@elonehoo/pistachio'

const value = ref("");
const timeline = useTimeline(value);
</script>

# useTimeline

> Tracks variable history

## Parameters

```typescript
import { useTimeline } from '@elonehoo/pistachio'

const options = { deep: Boolean, maxLength: Number, clone(entry: T): T }

const timeline = useTimeline(value, options);
```

| Parameters | Type                 | Required | Default                                                     | Description            |
| :--------- | :------------------- | :------- | :---------------------------------------------------------- | :--------------------- |
| value      | `Ref<T>`             | `true`   |                                                             | `ref` to track history |
| options    | `TimelineOptions<T>` | `false`  | `{ deep: false, maxLength: MAX_ARRAY_SIZE, clone: (x)=>x }` | timeline options       |

::: tip

If tracking object please provide a `options.clone` function.

```typescript
// example
function clone(e) {
  return JSON.parse(JSON.stringify(e));
}
```

:::

## State

The `useTimeline` function exposes the following reactive state:

```typescript
import { useTimeline } from '@elonehoo/pistachio'

const timeline = useTimeline()
```

| State    | Type                           | Description      |
| :------- | :----------------------------- | :--------------- |
| timeline | `Ref<{item: T, date: Date}[]>` | `timeline` array |

## Example

<div>
  <p>Type a text to enable undo and redo</p>
  <input v-model="value" />
  <p>
    <b>History</b>
    {{ timeline }}
  </p>
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useTimeline } from '@elonehoo/pistachio'

const value = ref('')
const timeline = useTimeline(value)
</script>

<template>
  <div>
    <p>Type a text to enable undo and redo</p>
    <input v-model="value">

    <p>
      <b>History</b>
      {{ timeline }}
    </p>
  </div>
</template>
```
