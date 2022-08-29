<script setup lang="ts">
import { useSessionStorage } from '@elonehoo/pistachio'

const key = '__vue_sessionStorage_example'
const { supported, storage, remove } = useSessionStorage(key, 1)
</script>

<template>
  <div>
    sessionStorage: {{ storage }}
    <p>
      supported:
      <b :class="{ green: supported, red: !supported }">{{ supported }}</b>
    </p>
    <p>
      <b>Check the value in the dev tools: `{{ key }}`</b>
    </p>
    <label for="storage">
      <input v-model="storage" name="storage">
    </label>

    <div>
      <button @click="remove">
        Remove
      </button>
    </div>
  </div>
</template>
