---
outline: deep
---

<script setup lang="ts">
import { defineComponent, ref, computed, watchEffect } from 'vue'
import { useWorkerFunction, useDate } from '@elonehoo/pistachio'

const bubbleSort = (input:any) => {
  let swap;
  let n = input.length - 1;
  const sortedArray = input.slice();
  do {
    swap = false;
    for (let index = 0; index < n; index += 1) {
      if (sortedArray[index] > sortedArray[index + 1]) {
        const tmp = sortedArray[index];
        sortedArray[index] = sortedArray[index + 1];
        sortedArray[index + 1] = tmp;
        swap = true;
      }
    }
    n -= 1;
  } while (swap);

  return sortedArray;
};

const timeout = ref(15000);
    const { now } = useDate({ refreshMs: 10 });

    const numbers = [...Array(50000)].map(() =>
      Math.floor(Math.random() * 1000000)
    );

    const sortedNumbers = ref([]);

    const firstSegment = computed(() => sortedNumbers.value.slice(0, 10));
    const lastSegment = computed(() => sortedNumbers.value.slice(-10));

    const sortArray = () => {
      sortedNumbers.value = bubbleSort(numbers);
    };
    const {
      exec,
      loading: working,
      error,
      cancelled
    } = useWorkerFunction(bubbleSort, { timeout });
    const sortWorker = () => {
      exec(numbers)
        .then(x => (sortedNumbers.value = x))
        .catch(x => (sortedNumbers.value = ["error", x]));
    };
</script>

# useWorkerFunction

> Creates a WebWorker based on a function, useful for offloading heavy tasks easily
>
> The `useWorkerFunction` function uses [CancellablePromise](../promise/cancellablePromise)

## Parameters

```typescript
import { useWorkerFunction } from '@elonehoo/pistachio'

useWorkerFunction(fn, options)

interface WebWorkerFunctionOptions {
  dependencies?: RefTyped<string[]>
  timeout?: RefTyped<number>
}
```

| Parameters | Type                       | Required | Default     | Description                               |
| :--------- | :------------------------- | :------- | :---------- | :---------------------------------------- |
| fn         | `Function`                 | `true`   |             | Function we want to execute in the worker |
| options    | `WebWorkerFunctionOptions` | `false`  | `undefined` | Options for the webworker                 |

## State

The `useWorkerFunction` function exposes the following reactive state:

```typescript
import { useWorkerFunction } from '@elonehoo/pistachio'

const { promise, result, loading, error, cancelled } = useWorkerFunction()
```

| State     | Type      | Description                      |
| :-------- | :-------- | :------------------------------- |
| promise   | `Promise` | Current worker process           |
| result    | `any`     | Resolved value                   |
| loading   | `boolean` | Waiting for the worker to finish |
| error     | `any`     | Promise error                    |
| cancelled | `boolean` | Was cancelled                    |

## Methods

The `useWorkerFunction` function exposes the following methods:

```typescript
import { useWorkerFunction } from '@elonehoo/pistachio'

const { exec, cancel } = useWorkerFunction()
```

| Signature        | Description           |
| :--------------- | :-------------------- |
| `exec(args?)`    | Resolves new promise  |
| `cancel(error?)` | Terminates the worker |

## Example

<div>
  <h3>Sort</h3>
  <p>time: {{ now }}</p>
  <h6>
    If UI thread is working the refresh rate should go down and the time will
    stop
  </h6>
  <div>
    <label>Timeout</label>
    <input v-model.number="timeout" type="number" />
  </div>
  <p>
    Numbers:
    <b>{{ firstSegment }}</b
    >...
    <b>{{ lastSegment }}</b>
  </p>
  <ul>
    <li>
      <button @click="sortArray">Function</button>
    </li>
    <li>
      <button @click="sortWorker" :disabled="working">Worker</button>
      <p v-if="cancelled" :style="{ color: 'red' }">{{ error }}</p>
    </li>
  </ul>
</div>

```vue
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
  Math.floor(Math.random() * 1000000)
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
  cancelled
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
```
