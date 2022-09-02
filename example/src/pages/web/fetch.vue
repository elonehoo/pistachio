<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFetch } from '@elonehoo/pistachio'

const id = ref(1);
    const { json, loading, exec, status } = useFetch();

    watch(id, id => {
      exec("https://reqres.in/api/user/" + id);
    });
</script>

<template>
  <div id="fetch">
    <h3>Using <b>reqres.in</b> API</h3>
    <p>current Id {{ id }}</p>
    <p>
      <button @click="id--">prev</button>
      &nbsp;
      <button @click="id++">next</button>
    </p>
    <p v-if="loading">
      loading...
    </p>
    <div v-else>
      <p>Status: {{ status }}</p>
      {{ json }}
    </div>
  </div>
</template>
