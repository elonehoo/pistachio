<script setup lang="ts">
import { useArrayPagination } from '@elonehoo/pistachio'
const array = new Array(1000).fill(0).map((_, i) => i)
const { result, next, prev, currentPage, lastPage } = useArrayPagination(
  array,
  {
    pageSize: 3,
  },
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
