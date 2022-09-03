<script setup lang="ts">
import { useOnline } from '@elonehoo/pistachio'

const online = useOnline()
</script>

<template>
  <div>
    <h1>Is Online?</h1>

    <h3>
      Online: <b :class="{ green: online, red: !online }">{{ online }}</b>
    </h3>
    <h4>
      Supported: <b>{{ online.supported }}</b>
    </h4>

    <p>To test open dev tools and set your browser to offline (Network tab)</p>
  </div>
</template>

<style>
  .red {
    color: red;
  }
  .green {
    color: green;
  }
</style>
