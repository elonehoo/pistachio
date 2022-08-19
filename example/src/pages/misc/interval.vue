<script setup lang="ts">
import { ref } from 'vue'
import { useInterval } from '@elonehoo/vue-hooks'

const date = ref()

useInterval(() => date.value = new Date(), 1000)
</script>

<template>
  <div>
    {{ date }}
  </div>
</template>
