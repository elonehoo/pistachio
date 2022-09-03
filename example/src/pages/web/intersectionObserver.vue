<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useIntersectionObserver } from '@elonehoo/pistachio'

const el = ref(null)
const { isIntersecting } = useIntersectionObserver(el)
</script>

<template>
  <div>
    Visible: {{ isIntersecting }}

    <p>Scroll down</p>

    <div style="height:5000px" />

    <div ref="el" style="background:lightgreen">
      Hide me
    </div>

    <p>Scroll up</p>
  </div>
</template>
