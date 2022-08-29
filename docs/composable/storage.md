---
outline: deep
---

<script setup lang="ts">
import { useLocalStorage, useStorage } from '@elonehoo/pistachio'
import { ref, watch } from 'vue'

const key = '__vue_storage_example'
const tabSync = ref(false)
const supportedSync = ref(true)

const { supported, storage, setSync, remove } = useStorage(key, 1)

watch(tabSync, (s) => {
  if (setSync(s) === false)
    supportedSync.value = false
})
</script>

# useStorage

> [LocalStorage](./localStorage) but falls back if not supported to [SessionStorage](./sessionStorage)

## Example

<div>
  storage: {{ storage }}
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
    <p>Sync supported: {{ supportedSync }}</p>
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

<style>
.red {
  color: red;
}
.green {
  color: green;
}
</style>

```vue
<script setup lang="ts">
import { useLocalStorage, useStorage } from '@elonehoo/pistachio'
import { ref, watch } from 'vue'

const key = '__vue_storage_example'
const tabSync = ref(false)
const supportedSync = ref(true)

const { supported, storage, setSync, remove } = useStorage(key, 1)

watch(tabSync, (s) => {
  if (setSync(s) === false)
    supportedSync.value = false
})
</script>

<template>
  <div>
    storage: {{ storage }}
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
      <p>Sync supported: {{ supportedSync }}</p>
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

<style>
.red {
  color: red;
}
.green {
  color: green;
}
</style>
```
