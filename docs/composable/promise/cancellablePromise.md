---
outline: deep
---

<script setup lang="ts">
import { ref } from 'vue'
import { useCancellablePromise } from '@elonehoo/pistachio'

const {
  exec,
  loading,
  cancel,
  error,
  cancelled,
  result
} = useCancellablePromise(delay =>
  fetch(`https://reqres.in/api/users?delay=${delay}`).then(x => x.json())
);

const delay = ref(1);
</script>

# useCancellablePromise

> Prevents result to be set if the `cancel` is called
>
> This uses [usePromise](./promise)

:::warning
Javascript doesn't provide a way to cancel promises, so this will execute the promise until the end.
:::

## Parameters

```typescript
import { useCancellablePromise } from '@elonehoo/pistachio'

const cancellablePromise = useCancellablePromise(factory, lazy?)

const options = {
   /**
   * if `true` allows to catch exception when `exec()`
   * @default false
   */
  throwException?: boolean

  /**
   * Only executes on `exec`
   * @default false
   */
  lazy?: boolean
  /**
   * @description cancel the promise on component unmount
   * @default true
   */
  unmountCancel?: boolean
}

const cancellablePromise = useCancellablePromise(factory, options?)
```

| Parameters | Type       | Required | Default | Description                                                                                                   |
| :--------- | :--------- | :------- | :------ | :------------------------------------------------------------------------------------------------------------ |
| factory    | `Function` | `true`   |         | Factory will be called every time the exec is called, the arguments will be passed to the factory. `Required` |
| lazy       | `boolean`  | `false`  | `false` |                                                                                                               |

## State

The `useCancellablePromise` function exposes the following reactive state:

```typescript
import { useCancellablePromise } from '@elonehoo/pistachio'

const { promise, result, loading, error, cancelled } = useCancellablePromise()
```

| State     | Type      | Description                            |
| :-------- | :-------- | :------------------------------------- |
| promise   | `Promise` | Current promise                        |
| result    | `any`     | Resolved value                         |
| loading   | `boolean` | Waiting for the promise to be resolved |
| error     | `any`     | Promise error                          |
| cancelled | `boolean` | Was cancelled                          |

## Methods

The `useCancellablePromise` function exposes the following methods:

```typescript
import { useCancellablePromise } from '@elonehoo/pistachio'

const { exec, cancel } = useCancellablePromise()
```

| Signature        | Description                  |
| :--------------- | :--------------------------- |
| `exec(args?)`    | Resolves new promise         |
| `cancel(error?)` | Cancels by rejecting promise |

## Example

<div>
  <div>
    <label for="delayPromise">Delay seconds</label>
    <input name="delayPromise" v-model="delay" />
  </div>
  <div>
    <button @click="exec(delay)" :disabled="loading">Execute</button>
    <button @click="cancel()" :disabled="!loading">Cancel</button>
  </div>
  <div v-if="loading">loading...</div>
  <div v-else-if="cancelled">
    <p>Request cancelled</p>
    <p>Result: {{ result }}</p>
    <p>Error: {{ error }}</p>
  </div>
  <div v-else>
    <p>Result: {{ result }}</p>
    <p>Error: {{ error }}</p>
  </div>
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useCancellablePromise } from '@elonehoo/pistachio'

const {
  exec,
  loading,
  cancel,
  error,
  cancelled,
  result
} = useCancellablePromise(delay =>
  fetch(`https://reqres.in/api/users?delay=${delay}`).then(x => x.json())
)

const delay = ref(1)
</script>

<template>
  <div>
    <div>
      <label for="delayPromise">Delay seconds</label>
      <input v-model="delay" name="delayPromise">
    </div>
    <div>
      <button :disabled="loading" @click="exec(delay)">
        Execute
      </button>
      <button :disabled="!loading" @click="cancel()">
        Cancel
      </button>
    </div>

    <div v-if="loading">
      loading...
    </div>
    <div v-else-if="cancelled">
      <p>Request cancelled</p>
      <p>Result: {{ result }}</p>
      <p>Error: {{ error }}</p>
    </div>
    <div v-else>
      <p>Result: {{ result }}</p>
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>
```
