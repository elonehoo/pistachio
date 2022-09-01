<script setup lang="ts">
import { ref } from 'vue'
import { useCancellablePromise } from '@elonehoo/pistachio'

const {
  exec,
  loading,
  cancel,
  error,
  cancelled,
  result,
} = useCancellablePromise(delay =>
  fetch(`https://reqres.in/api/users?delay=${delay}`).then(x => x.json()),
)

const delay = ref(1)
</script>

<template>
  <div>
    <div>
      <label for="delayPromise">Delay seconds</label>
      <input v-model="delay" name="delayPromise">
    </div>
    <div>
      <button :disabled="loading" @click="exec(delay)">
        Execute
      </button>
      <button :disabled="!loading" @click="cancel()">
        Cancel
      </button>
    </div>

    <div v-if="loading">
      loading...
    </div>
    <div v-else-if="cancelled">
      <p>Request cancelled</p>
      <p>Result: {{ result }}</p>
      <p>Error: {{ error }}</p>
    </div>
    <div v-else>
      <p>Result: {{ result }}</p>
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>
