<script setup lang="ts">
import { ref } from 'vue'
import { useTimeline } from '@elonehoo/pistachio'

const value = ref("");
const timeline = useTimeline(value);
</script>

<template>
  <div>
    <p>Type a text to enable undo and redo</p>
    <input v-model="value" />

    <p>
      <b>History</b>
      {{ timeline }}
    </p>
  </div>
</template>
