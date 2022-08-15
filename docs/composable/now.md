---
outline: deep
---

<script setup lang="ts">
  import {useNow} from '@elonehoo/vue-hooks'
  let i = 0;
  const now = useNow({
    timeFn: () => ++i
  })
</script>

# useNow

> Reactive custom timer with specified refresh rate

## Parameters

```typescript
import { useNow } from '@elonehoo/vue-hooks'

const now = useNow({
  refreshMs?: Number,
  sync?: Boolean,
  timeFn?: Function<Boolean>
})
```

| Parameters | Type |	Required | Default |	Description |
|:------------|:-----|:---------|:----------|:-------------|
| refreshMs |	Number | No |	1000 | Refresh rate in milliseconds that the now gets updated |
|sync |	Boolean |	No | true |	Sync with the clock by the second |
|timeFn |	Function\<Boolean> | NO | Date.now | Function called when refresh the date |

## State

The `useNow` function exposes the following reactive state:

```typescript
import { useNow } from '@elonehoo/vue-hooks'

const { now } = useNow()
```

| State | Type | Description |
|:------------|:-----|:-------------|
| now |	Ref\<Number> | Current time |

## Methods

The `useNow` function exposes the following methods:

```typescript
import { useNow } from '@elonehoo/vue-hooks'

const { remove } = useNow()
```

| Signature |	Description |
|:------------|:-----|
| remove | Manually stop the now to be refreshed |

## Example

<div>
  <p>
    Created <b>{{ now.now }}</b> seconds ago
  </p>
</div>

```vue
<script setup lang="ts">
import {useNow} from '@elonehoo/vue-hooks'
let i = 0
const now = useNow({
  timeFn: () => ++i
})
</script>

<template>
<div>
  <p>
    Created <b>{{ now.now }}</b> seconds ago
  </p>
</div>
</template>
```
