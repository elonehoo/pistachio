<script setup lang="ts">
import { useMatchMedia } from '@elonehoo/pistachio'

const { matches } = useMatchMedia('(max-width: 600px)')
</script>

<template>
  <div>
    <p>
      Screen less than 600px: <b>{{ matches }}</b>
    </p>
  </div>
</template>
