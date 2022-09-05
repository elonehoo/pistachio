<script setup lang="ts">
import { defineComponent, ref, computed, watchEffect, watch } from 'vue'
import { useWorker, useDate,exposeWorker } from '@elonehoo/pistachio'

const timeout = ref(1500);
  const { now } = useDate({ refreshMs: 10 });
  const numbers = [...Array(50000)].map(() =>
    Math.floor(Math.random() * 1000000)
  );
  const sortedNumbers = ref([]);
  const firstSegment = computed(() => sortedNumbers.value.slice(0, 10));
  const lastSegment = computed(() => sortedNumbers.value.slice(-10));
  const { postMessage, data, errored, errorEvent } = useWorker(
    "/worker.example.js"
  );
  watch(
    data,
    d => {
      sortedNumbers.value = d;
    },
    { lazy: true }
  );
  watch(
    errorEvent,
    e => {
      sortedNumbers.value = ["error", e.returnValue];
    },
    { lazy: true }
  );
  const sortWorker = () => {
    postMessage(numbers);
  };
</script>

<template>
  <div>
    <h3>Sort</h3>
    <p>time: {{ now }}</p>
    <h6>
      The worker can take more than 10 seconds to finish, the timer shouldn't
      stop while the worker is processing
    </h6>

    <p>
      Numbers:
      <b>{{ firstSegment }}</b
      >...
      <b>{{ lastSegment }}</b>
    </p>

    <ul>
      <li>
        <button @click="sortWorker">Worker</button>
        <p v-if="errored" :style="{ color: 'red' }">{{ errorEvent }}</p>
      </li>
    </ul>
  </div>
</template>
