<script setup lang="ts">
import { useSharedRef } from '@elonehoo/pistachio'
import { computed } from 'vue'

const sharedRef = useSharedRef('test-shared-ref', 0)

const mindDescription = computed(() => {
  switch (sharedRef.mind.value) {
    case 0:
      return 'HIVE'
    case 1:
      return 'MASTER'
  }
})
const changeMind = () => {
  sharedRef.setMind((sharedRef.mind.value + 1) % 2)
}
</script>

<template>
  <div>
    <p>Supported: {{ sharedRef.supported }}</p>
    <p>
      Mind: {{ mindDescription }} <button @click="changeMind">
        Change
      </button>
    </p>
    <p>IsMaster: {{ sharedRef.master }}</p>

    <input v-model="sharedRef.data.value" :disabled="!sharedRef.editable.value">

    <p>targets: {{ sharedRef.targets.value.length }}</p>
  </div>
</template>
