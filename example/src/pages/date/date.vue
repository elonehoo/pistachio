<script setup lang="ts">
import { useDate } from '@elonehoo/vue-hooks'

const { now } = useDate()
</script>

<template>
  <div>
    <p>
      Current date: {{ now }}: <b>{{ new Date(now) }}</b>
    </p>
  </div>
</template>
