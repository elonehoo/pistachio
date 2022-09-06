<script setup lang="ts">
import { useTimeout } from '@elonehoo/pistachio'

let cancelTimeout

function show() {
  const { cancel } = useTimeout(() => {
    alert('useTimeout callback invoked')
  }, 2000)
  cancelTimeout = cancel
}

function cancel() {
  cancelTimeout()
}
</script>

<template>
  <div>
    <p />
    <button @click="show">
      Show an alert box after two seconds
    </button>
    <p />
    <button @click="cancel">
      Cancel alert before it happens
    </button>
  </div>
</template>
