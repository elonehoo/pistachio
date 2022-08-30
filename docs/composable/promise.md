---
outline: deep
---

<script setup lang="ts">
import { ref } from 'vue'
import { usePromise } from '@elonehoo/pistachio'

const timeout = ref(1000);
const throwError = ref(false);
const { exec, error, loading, result } = usePromise(ms => {
  if (throwError.value) {
    return Promise.reject(new Error("Throw Error checked"));
  }
  return new Promise(res => setTimeout(() => res("sucess"), ms));
});
</script>

# usePromise

> Provides promise state

## Parameters

```typescript
import { usePromise } from '@elonehoo/pistachio'

usePromise(factory, lazy?)

usePromise(factory, { lazy?, throwException? })
```

| Parameters     | Type       | Required | Default | Description                                                                                                   |
| :------------- | :--------- | :------- | :------ | :------------------------------------------------------------------------------------------------------------ |
| factory        | `Function` | `true`   |         | Factory will be called every time the exec is called, the arguments will be passed to the factory. `Required` |
| lazy           | `boolean`  | `false`  | `false` | Defers execution of the factory until `exec` is called                                                        |
| throwException | `boolean`  | `false`  | `false` | Makes `exec` throw exceptions, when `false` the error will be handled only by the `usePromise`                |

:::warning
If `factory` argument has parameters, if `lazy` is `false` or not specified, the factory will be called without parameters.
A warning will be raised in `dev`, to remove the warning please pass `lazy:false`
:::

## State

The `usePromise` function exposes the following reactive state:

```typescript
import { usePromise } from '@elonehoo/pistachio'

const { promise, result, loading, error } = usePromise()
```

| State   | Type      | Description                            |
| :------ | :-------- | :------------------------------------- |
| promise | `Promise` | Current promise                        |
| result  | `any`     | Resolved value                         |
| loading | `boolean` | Waiting for the promise to be resolved |
| error   | `any`     | Promise error                          |

## Methods

The `usePromise` function exposes the following methods:

| Signature     | Description          |
| :------------ | :------------------- |
| `exec(args?)` | Resolves new promise |

:::tip
You can pass `throwException` on the last argument of the `exec` to override the default behaviour
:::

## Example

<div>
  <label for="timeout">
    Duration (ms)
    <input type="number" name="timeout" v-model.number="timeout" />
  </label>
  <label for="error">
    Reject promise
    <input type="checkbox" name="error" v-model="throwError" />
  </label>
  <button @click="exec(timeout)">Execute</button>
  <div v-if="loading">loading...</div>
  <div v-else-if="result">{{ result }}</div>
  <div v-else>
    <p>error: {{ error }}</p>
  </div>
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { usePromise } from '@elonehoo/pistachio'

const timeout = ref(1000);
const throwError = ref(false);
const { exec, error, loading, result } = usePromise(ms => {
  if (throwError.value) {
    return Promise.reject(new Error("Throw Error checked"));
  }
  return new Promise(res => setTimeout(() => res("sucess"), ms));
});
</script>

<template>
  <div>
    <label for="timeout">
      Duration (ms)
      <input type="number" name="timeout" v-model.number="timeout" />
    </label>
    <label for="error">
      Reject promise
      <input type="checkbox" name="error" v-model="throwError" />
    </label>

    <button @click="exec(timeout)">Execute</button>

    <div v-if="loading">loading...</div>
    <div v-else-if="result">{{ result }}</div>
    <div v-else>
      <p>error: {{ error }}</p>
    </div>
  </div>
</template>
```
