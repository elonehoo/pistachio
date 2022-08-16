<script setup lang="ts">
import { ref } from 'vue'
import { useOutsidePress } from '@elonehoo/vue-hooks'

const elref = ref(null)

useOutsidePress(elref, () => console.log('clicked outside'))
</script>

<template>
  <div>
    <div ref="elref" style="background: #99CC99;width:100px">
      Click Outside or inside
    </div>
    <p>check the console</p>
  </div>
</template>
