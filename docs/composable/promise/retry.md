---
outline: deep
---

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  exponentialDelay,
  useDate,
  useFetch,
  useRetry,
} from '@elonehoo/pistachio'

const id = ref(1)
const throwError = ref(false)
const delay = ref(200)
const mode = ref('delay')

const { now } = useDate({
  refreshMs: 10,
})

const retryDelay = (n: any) => {
  switch (mode.value) {
    case 'delay':
      return delay.value
    case 'backoff':
      return exponentialDelay(n)
  }
}

const { json, loading, exec: fetchExec, status } = useFetch()
const { isRetrying, nextRetry, retryCount, exec } = useRetry({
  retryDelay,
})

watch(id, (id) => {
  exec(() => {
    if (throwError.value)
      throw new Error('blocked')

    return fetchExec(`https://reqres.in/api/user/${id}`)
  })
})

// just to have a nice countdown
const nextRetryIn = computed(() => Math.floor(nextRetry.value - now.value))
</script>

# useRetry

> this [Retry](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Retry-After)

## State

The `useRetry` function exposes the following reactive state:

```typescript
import { useRetry } from '@elonehoo/pistachio'

const { retryCount, nextRetry, isRetrying, retryErrors } = useRetry()
```

| State       | Type         | Description                                                   |
| :---------- | :----------- | :------------------------------------------------------------ |
| retryCount  | `number`     | Current attempt number                                        |
| nextRetry   | `number`     | When it should retry, `new Date(nextRetry.value)`             |
| isRetrying  | `boolean`    | Get the current state, set to true after the first failure    |
| retryErrors | `Array<any>` | List of all the errors occurred in since the last `exec` call |

## Methods

The `useRetry` function exposes the following methods:

```typescript
import { useRetry } from '@elonehoo/pistachio'

const { cancel, exec } = useRetry()
```

| Signature   | Description                               |
| :---------- | :---------------------------------------- |
| `cancel`    | Stops the retrying                        |
| `exec(fn?)` | executes function or the factory provided |

## Example

<div>
  <p>current Id {{ id }}</p>
  <p>
    <button @click="id--">
      prev
    </button>
    <button @click="id++">
      next
    </button>
  </p>
  <div>
    <label for="throwError">Throw error</label>
    <input v-model="throwError" type="checkbox" name="throwError">
  </div>
  <div>
    <label for="retryMode">Retry mode:</label>
    <select v-model="mode" name="retryMode">
      <option value="delay">
        Delay
      </option>
      <option value="backoff">
        Exponential backoff
      </option>
    </select>
  </div>
  <div v-if="mode === 'delay'">
    <label for="delay">Delay</label>
    <input v-model.number="delay" type="number" name="delay">
  </div>
  <p v-if="loading">
    loading...
  </p>
  <p v-else-if="isRetrying">
    retrying in {{ nextRetryIn }}ms
    <span>Current: {{ retryCount }} retries</span>
  </p>
  <div v-else>
    <p>Status: {{ status }}</p>
    <span>{{ json }}</span>
  </div>
</div>

```vue
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  exponentialDelay,
  useDate,
  useFetch,
  useRetry,
} from '@elonehoo/pistachio'

const id = ref(1)
const throwError = ref(false)
const delay = ref(200)
const mode = ref('delay')

const { now } = useDate({
  refreshMs: 10,
})

const retryDelay = (n: any) => {
  switch (mode.value) {
    case 'delay':
      return delay.value
    case 'backoff':
      return exponentialDelay(n)
  }
}

const { json, loading, exec: fetchExec, status } = useFetch()
const { isRetrying, nextRetry, retryCount, exec } = useRetry({
  retryDelay,
})

watch(id, (id) => {
  exec(() => {
    if (throwError.value)
      throw new Error('blocked')

    return fetchExec(`https://reqres.in/api/user/${id}`)
  })
})

// just to have a nice countdown
const nextRetryIn = computed(() => Math.floor(nextRetry.value - now.value))
</script>

<template>
  <div>
    <p>current Id {{ id }}</p>
    <p>
      <button @click="id--">
        prev
      </button>
      <button @click="id++">
        next
      </button>
    </p>
    <div>
      <label for="throwError">Throw error</label>
      <input v-model="throwError" type="checkbox" name="throwError">
    </div>
    <div>
      <label for="retryMode">Retry mode:</label>
      <select v-model="mode" name="retryMode">
        <option value="delay">
          Delay
        </option>
        <option value="backoff">
          Exponential backoff
        </option>
      </select>
    </div>
    <div v-if="mode === 'delay'">
      <label for="delay">Delay</label>
      <input v-model.number="delay" type="number" name="delay">
    </div>
    <p v-if="loading">
      loading...
    </p>
    <p v-else-if="isRetrying">
      retrying in {{ nextRetryIn }}ms
      <span>Current: {{ retryCount }} retries</span>
    </p>
    <div v-else>
      <p>Status: {{ status }}</p>
      <span>{{ json }}</span>
    </div>
  </div>
</template>
```
