<script setup lang="ts">
import { ref } from 'vue'
import { useMouseInElement } from '@elonehoo/vue-hooks'

const el = ref(null)
const { distance } = useMouseInElement(el)
</script>

<template>
  <div>
    Mouse distance: <b>{{ distance }}px</b>
    <div ref="el" style="height: 10px; width: 10px; background: #99CC99" />
  </div>
</template>
