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
