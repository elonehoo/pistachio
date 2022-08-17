<script setup lang="ts">
import { ref } from 'vue'
import child from './child.vue'

const myValue = ref("MyValue");

</script>

<template>
  <div>
    <p>myValue: {{ myValue }}</p>

    <child v-model:value="myValue"/>
  </div>
</template>
