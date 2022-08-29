<script setup lang="ts">
import { ref } from 'vue'
import { useScroll } from '@elonehoo/pistachio'
const elref = ref(null)

const { scrollTop, scrollLeft, remove } = useScroll(elref)
</script>

<template>
  <div>
    Scroll
    <p>top: {{ scrollTop }}</p>
    <p>left: {{ scrollLeft }}</p>
    <div ref="elref" style="overflow:scroll;height:70px;background:gray">
      <p v-for="x in 10" :key="x">
        {{ x }}
      </p>
    </div>
    <button @click="remove">
      remove
    </button>
  </div>
</template>
