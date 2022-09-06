<script setup lang="ts">
import { useTitle } from '@elonehoo/pistachio'

const title = useTitle()
</script>

<template>
  <div>
    <label for="title-updater">document.title:</label>
    <input name="title-updater" v-model="title" />
  </div>
</template>
