<script setup lang="ts">
import { ref } from 'vue'
import { usePromise } from '@elonehoo/pistachio'

const timeout = ref(1000)
const throwError = ref(false)
const { exec, error, loading, result } = usePromise((ms) => {
  if (throwError.value)
    return Promise.reject(new Error('Throw Error checked'))

  return new Promise(res => setTimeout(() => res('sucess'), ms))
})
</script>

<template>
  <div>
    <label for="timeout">
      Duration (ms)
      <input v-model.number="timeout" type="number" name="timeout">
    </label>
    <label for="error">
      Reject promise
      <input v-model="throwError" type="checkbox" name="error">
    </label>

    <button @click="exec(timeout)">
      Execute
    </button>

    <div v-if="loading">
      loading...
    </div>
    <div v-else-if="result">
      {{ result }}
    </div>
    <div v-else>
      <p>error: {{ error }}</p>
    </div>
  </div>
</template>
