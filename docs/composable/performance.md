---
outline: deep
---

<script setup lang="ts">
import { usePerformance } from '@elonehoo/vue-hooks'

const { now } = usePerformance()
</script>

# usePerformance

> Reactive `performance.now()` with specified refresh rate

## Parameters

```typescript
import { usePerformance } from '@elonehoo/vue-hooks'

const now = usePerformance({
  refreshMs?: Number,
  sync?: Boolean
})
```

| Parameters | Type |	Required | Default | Description |
|:------------|:-----|:---------|:----------|:-------------|
| refreshMs |	number | No |	1000 | Refresh rate in milliseconds that the now gets updated |
| sync | boolean | No | true | Sync with the clock by the second |

## State

The `usePerformance` function exposes the following reactive state:

```typescript
import { usePerformance } from '@elonehoo/vue-hooks'

const { now } = usePerformance()
```

| State |	Type | Description |
|:------------|:-----|:------------|
| now |	Ref\<number> |	Current time |

## Methods

The `usePerformance` function exposes the following methods:

```typescript
import { usePerformance } from '@elonehoo/vue-hooks'

const { remove } = usePerformance()
```

| Signature |	Description |
|:------------|:------------|
| remove | Manually stop the now to be refreshed |

## Example

<div>
  <p>
    Performance.now : <b>{{ now }}</b>
  </p>
  <p>
    Created <b>{{ Math.floor(now / 1000) }}</b> seconds ago
  </p>
</div>

```vue
<script setup lang="ts">
import { usePerformance } from '@elonehoo/vue-hooks'

const { now } = usePerformance()
</script>

<template>
  <div>
    <p>
      Performance.now : <b>{{ now }}</b>
    </p>
    <p>
      Created <b>{{ Math.floor(now / 1000) }}</b> seconds ago
    </p>
  </div>
</template>
```
