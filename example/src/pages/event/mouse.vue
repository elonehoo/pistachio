<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useMouse } from '@elonehoo/pistachio'

const elref = ref<any>(null)
const state = reactive({
  x: 0,
  y: 0,
})
const remove = useMouse(elref, 'mousemove', (e) => {
  state.x = e.x
  state.y = e.y
})
</script>

<template>
  <div id="elref" ref="elref">
    Mouse
    <p>x: {{ state.x }}</p>
    <p>y: {{ state.y }}</p>

    <button @click="remove">
      remove
    </button>
  </div>
</template>

<style></style>
