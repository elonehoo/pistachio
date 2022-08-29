---
outline: deep
---

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePagination } from '@elonehoo/vue-hooks'

const arrayRef = ref(new Array(100).fill(1).map((_, i) => i));
    // paginate array
    const {
      currentPage,
      lastPage,
      next,
      prev,
      offset,
      pageSize
    } = usePagination({
      currentPage: 1,
      pageSize: 10,
      total: computed(() => arrayRef.value.length)
    });

    const result = computed(() => {
      const array = arrayRef.value;
      if (!Array.isArray(array)) return [];
      return array.slice(offset.value, offset.value + pageSize.value);
    });
</script>

# usePagination

> Generic pagination control, handles all the pagination logic

## State

The `usePagination` function exposes the following reactive state:

```typescript
import { usePagination } from '@elonehoo/vue-hooks'

const { pageSize, total, currentPage, offset, lastPage } = usePagination()
```

| State       | Type     | Description                                   |
| :---------- | :------- | :------------------------------------------ |
| pageSize    | `number` | Current page size, allows to set the pageSize |
| total       | `number` | Total elements                                |
| currentPage | `number` | Current page                                  |
| offset      | `number` | Current page offset from the beginning        |
| lastPage    | `number` | Last page number                              |

## Methods

The `usePagination` function exposes the following methods:

```typescript
import { usePagination } from '@elonehoo/vue-hooks'

const { next, prev, first, last } = usePagination()
```

| Signature | Description                   |
| :-------- | :---------------------------- |
| `next()`  | Increments currentPage        |
| `prev()`  | Decrements currentPage        |
| `first()` | Sets currentPage to `1`       |
| `last()`  | Sets currentPage = `lastPage` |

## Example

<div>
  <p>page {{ currentPage }} of {{ lastPage }}</p>
  <p>
    <button @click="prev">prev</button>
    &nbsp;
    <button @click="next">next</button>
  </p>
  <ul>
    <li v-for="n in result" :key="n">{{ n }}</li>
  </ul>
</div>


```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePagination } from '@elonehoo/vue-hooks'

const arrayRef = ref(new Array(100).fill(1).map((_, i) => i))
// paginate array
const {
  currentPage,
  lastPage,
  next,
  prev,
  offset,
  pageSize
} = usePagination({
  currentPage: 1,
  pageSize: 10,
  total: computed(() => arrayRef.value.length)
})

const result = computed(() => {
  const array = arrayRef.value
  if (!Array.isArray(array))
    return []
  return array.slice(offset.value, offset.value + pageSize.value)
})
</script>

<template>
  <div>
    <p>page {{ currentPage }} of {{ lastPage }}</p>
    <p>
      <button @click="prev">
        prev
      </button>
      <button @click="next">
        next
      </button>
    </p>
    <ul>
      <li v-for="n in result" :key="n">
        {{ n }}
      </li>
    </ul>
  </div>
</template>
```
