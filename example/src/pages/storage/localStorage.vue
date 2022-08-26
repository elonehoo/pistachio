<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLocalStorage } from '@elonehoo/vue-hooks'

const key = '__vue_localStorage_example'
const tabSync = ref(false)
const { supported, storage, setSync, remove } = useLocalStorage(key, 1)
watch(tabSync, setSync)
</script>

<template>
  <div>
    localStorage: {{ storage }}
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
      <p>Enable tab sync? <input v-model="tabSync" type="checkbox"></p>
      <p v-if="tabSync">
        Now this tab is listening for changes, please change the storage value
        in other tab
      </p>
    </div>
    <div>
      <button @click="remove">
        Remove
      </button>
    </div>
  </div>
</template>
