<script setup lang="ts">
import { usePerformance } from '@elonehoo/vue-hooks'

const { now } = usePerformance()
</script>

<template>
<div>
    <p>
      Performance.now : <b>{{ now }}</b>
    </p>
    <p>
      Created <b>{{ Math.floor(now / 1000) }}</b> seconds ago
    </p>
  </div>
</template>
