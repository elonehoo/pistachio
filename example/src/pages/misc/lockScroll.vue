<script setup lang="ts">
import { ref } from 'vue'
import { useLockScroll } from '@elonehoo/pistachio'

const elref = ref<any>(null)

const { locked, remove } = useLockScroll(elref)
</script>

<template>
  <div>
    Toggle
    <b>locked</b> to enable or disable
    <b>scroll</b>
    <div ref="elref" class="scroll-component">
      <p v-for="x in 10" :key="x">
        {{ x }}
      </p>
    </div>

    <button @click="remove">
      remove
    </button>
    <span>
      <input v-model="locked" type="checkbox">
      Locked
    </span>
  </div>
</template>

<style scoped>
.scroll-component {
  overflow: scroll;
  height: 70px;
  background: gray;
}

.no-scroll {
  overflow: hidden !important;
}
</style>
