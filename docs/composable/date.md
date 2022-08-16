---
outline: deep
---

<script setup lang="ts">
import {useDate} from '@elonehoo/vue-hooks'

const { now } = useDate()
</script>

# useDate

> Reactive `Date.now()` with specified refresh rate

## Parameters

```typescript
import { useDate } from '@elonehoo/vue-hooks'

const now = useDate({
  refreshMs?: Number,
  sync?: Boolean
})
```

| Parameters | Type |	Required | Default | Description |
|:------------|:-----|:---------|:---------|:-------------|
| refreshMs | `number` | No |1000 |	Refresh rate in milliseconds that the now gets updated |
| sync | `Boolean` | No |	true | Sync with the clock by the second |

## State

The `useDate` function exposes the following reactive state:

```typescript
import { useDate } from '@elonehoo/vue-hooks'

const { now } = useDate()
```

| State |	Type | Description |
|:------|:------|:------------|
|now | Ref\<number> |	Current time |

## Methods

The `useDate` function exposes the following methods:

```typescript
import { useDate } from '@elonehoo/vue-hooks'

const { remove } = useDate()
```

| Signature |	Description |
|:---------|:------------|
| remove | Manually stop the now to be refreshed |

## Example

<div>
  <p>
    Current date: {{ now }}: <b>{{ new Date(now) }}</b>
  </p>
</div>

```vue
<script setup lang="ts">
import {useDate} from '@elonehoo/vue-hooks'

const { now } = useDate()
</script>

<template>
  <div>
    <p>
      Current date: {{ now }}: <b>{{ new Date(now) }}</b>
    </p>
  </div>
</template>
```
