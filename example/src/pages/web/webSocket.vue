<script setup lang="ts">
import { useWebSocket } from '@elonehoo/pistachio'

const { isOpen, isClosed, data, errored, send, close } = useWebSocket('wss://javascript.info/article/websocket/demo/hello')
</script>

<template>
  <div>
    <button :disabled="!isOpen" @click="send">
      Send
    </button>
    <button :disabled="!isOpen" @click="close(1000)">
      Close
    </button>
    <p>open: {{ isOpen }}</p>
    <p>closed: {{ isClosed }}</p>
    <p>data: {{ data }}</p>
    <p>errored: {{ errored }}</p>
  </div>
</template>
