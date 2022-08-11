<script setup lang="ts">
import {useResize} from '@elonehoo/vue-hooks'

const { height, width, remove } = useResize(document.body);

</script>

<template>
  <div>
    Window Resize
    <p>height: {{ height }}</p>
    <p>width: {{ width }}</p>

    <button @click="remove">remove</button>
  </div>
</template>
