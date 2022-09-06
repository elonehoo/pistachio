<script setup lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue'
import { useDate, useWorkerFunction } from '@elonehoo/pistachio'

const bubbleSort = (input: any) => {
  let swap
  let n = input.length - 1
  const sortedArray = input.slice()
  do {
    swap = false
    for (let index = 0; index < n; index += 1) {
      if (sortedArray[index] > sortedArray[index + 1]) {
        const tmp = sortedArray[index]
        sortedArray[index] = sortedArray[index + 1]
        sortedArray[index + 1] = tmp
        swap = true
      }
    }
    n -= 1
  } while (swap)

  return sortedArray
}

const timeout = ref(15000)
const { now } = useDate({ refreshMs: 10 })

const numbers = [...Array(50000)].map(() =>
  Math.floor(Math.random() * 1000000),
)

const sortedNumbers = ref([])

const firstSegment = computed(() => sortedNumbers.value.slice(0, 10))
const lastSegment = computed(() => sortedNumbers.value.slice(-10))

const sortArray = () => {
  sortedNumbers.value = bubbleSort(numbers)
}
const {
  exec,
  loading: working,
  error,
  cancelled,
} = useWorkerFunction(bubbleSort, { timeout })
const sortWorker = () => {
  exec(numbers)
    .then(x => (sortedNumbers.value = x))
    .catch(x => (sortedNumbers.value = ['error', x]))
}

</script>

<template>
  <div>
    <h3>Sort</h3>
    <p>time: {{ now }}</p>
    <h6>
      If UI thread is working the refresh rate should go down and the time will
      stop
    </h6>
    <div>
      <label>Timeout</label>
      <input v-model.number="timeout" type="number">
    </div>

    <p>
      Numbers:
      <b>{{ firstSegment }}</b>...
      <b>{{ lastSegment }}</b>
    </p>

    <ul>
      <li>
        <button @click="sortArray">
          Function
        </button>
      </li>
      <li>
        <button :disabled="working" @click="sortWorker">
          Worker
        </button>
        <p v-if="cancelled" :style="{ color: 'red' }">
          {{ error }}
        </p>
      </li>
    </ul>
  </div>
</template>
