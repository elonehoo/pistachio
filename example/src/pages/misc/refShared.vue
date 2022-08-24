<script setup lang="ts">
import { useRefShared } from '@elonehoo/vue-hooks'

const myRefVar = useRefShared('Hello world')
</script>

<template>
  <div>
    <p>
      To test please open 2 or more tabs and edit the input box
    </p>
    <input v-model="myRefVar">
  </div>
</template>
