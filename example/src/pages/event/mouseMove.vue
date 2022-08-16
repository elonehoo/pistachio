<script setup lang="ts">
import { ref } from 'vue'
import { useMouseMove } from '@elonehoo/vue-hooks'

const elref = ref(null)

const { mouseX, mouseY, pageX, pageY, remove } = useMouseMove(elref)
</script>

<template>
  <div ref="elref">
    Mouse Move
    <p>x: {{ mouseX }}</p>
    <p>y: {{ mouseY }}</p>
    <p>pageX: {{ pageX }}</p>
    <p>pageY: {{ pageY }}</p>

    <button @click="remove">
      remove
    </button>
  </div>
</template>
