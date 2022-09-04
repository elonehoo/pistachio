<script setup lang="ts">
import { useClipboard } from '@elonehoo/pistachio'
const { text, writeText } = useClipboard()

function copy() {
  writeText(Math.random().toString())
  console.log(text.value)
}
</script>

<template>
  <div>
    <p>click the button to copy a random number</p>
    <button @click="copy">
      copy
    </button>
    <p>Check your dev tools to see what has been copied to your clipboard</p>

    <p>You can also change the clipboard</p>
    <input v-model="text">

    <div>
      <p>Current clipboard:</p>
      <p>{{ text }}</p>
    </div>
  </div>
</template>
