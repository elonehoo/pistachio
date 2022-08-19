<script setup lang="ts">
import { useBreakpoint } from '@elonehoo/vue-hooks'

const { current, S, L, XL } = useBreakpoint({ XL: 1280, L: 768, S: '(min-width: 320px)' })
</script>

<template>
  <div>
    <div>Current breakpoint {{ current || "none" }}</div>
    <div>valid breakpoints:</div>
    <p><b v-if="S">Small</b></p>
    <p><b v-if="L">Large</b></p>
    <p><b v-if="XL">Extra Large</b></p>
  </div>
</template>
