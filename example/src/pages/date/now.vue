<script setup lang="ts">
import { useNow } from '@elonehoo/vue-hooks'
let i = 0
const now = useNow({
  timeFn: () => ++i,
})
</script>

<template>
  <div>
    <p>
      Created <b>{{ now.now }}</b> seconds ago
    </p>
  </div>
</template>
