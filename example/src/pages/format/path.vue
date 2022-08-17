<script setup lang="ts">
import { usePath } from '@elonehoo/vue-hooks'
import { computed, ref } from 'vue'

const inputPath = ref('user.name')
const json = ref(JSON.stringify({ user: { name: 'test' } }))

const inputValue = usePath(
  computed(() => JSON.parse(json.value)),
  inputPath,
  '.',
  () => 'Not Found',
)
</script>

<template>
  <div id="format">
    <div>
      <h4>Path example</h4>
      <div>
        Path:
        <input v-model="inputPath">
      </div>
      <div>
        <p>Object</p>
        <textarea v-text="json" />
      </div>

      <div>
        <p>Value:</p>
        <textarea disabled v-text="inputValue" />
      </div>
    </div>
  </div>
</template>
