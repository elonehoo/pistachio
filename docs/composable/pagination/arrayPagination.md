---
outline: deep
---

<script setup lang="ts">
import { useArrayPagination } from '@elonehoo/pistachio'
const array = new Array(1000).fill(0).map((_, i) => i);
const { result, next, prev, currentPage, lastPage } = useArrayPagination(
  array,
  {
    pageSize: 3
  }
);
</script>

# useArrayPagination

> Paginates array, if the array changes size, it will handle the update

## State

The `useArrayPagination` function exposes the following reactive state:

```typescript
import { useArrayPagination } from '@elonehoo/pistachio'

const {
  pageSize,
  total,
  currentPage,
  offset,
  lastPage,
  result
} = useArrayPagination()
```

| State       | Type     | Description                                   |
| :---------- | :------- | :-------------------------------------------- |
| pageSize    | `number` | Current page size, allows to set the pageSize |
| total       | `number` | Total elements                                |
| currentPage | `number` | Current page                                  |
| offset      | `number` | Current page offset from the beginning        |
| lastPage    | `number` | Last page number                              |
| result      | `Array`  | Current page items                            |

## Methods

he `useArrayPagination` function exposes the following methods:

```js
import { useArrayPagination } from '@elonehoo/pistachio'

const { next, prev, first, last } = useArrayPagination()
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
    <li v-for="n in result" :key="n">
      {{ n }}
    </li>
  </ul>
</div>

```vue
<script setup lang="ts">
import { useArrayPagination } from '@elonehoo/pistachio'
const array = new Array(1000).fill(0).map((_, i) => i)
const { result, next, prev, currentPage, lastPage } = useArrayPagination(
  array,
  {
    pageSize: 3
  }
)
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
