<script setup lang="ts">
import { useUndo } from '@elonehoo/pistachio'

const { value, undo, redo, prev, next } = useUndo()
</script>

<template>
  <div>
    <p>Type a text to enable undo and redo</p>
    <input v-model="value">

    <div>
      <button :disabled="!prev.length" @click="undo()">
        Undo
      </button>
      <button :disabled="!next.length" @click="redo()">
        Redo
      </button>
    </div>

    <p>
      <b>Prev</b>
      {{ prev }}
    </p>

    <p>
      <b>Next</b>
      {{ next }}
    </p>
  </div>
</template>
