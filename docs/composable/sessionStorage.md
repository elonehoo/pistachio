---
outline: deep
---

<script setup lang="ts">
import {useSessionStorage} from '@elonehoo/vue-hooks'

const key = "__vue_sessionStorage_example";
const { supported, storage, remove } = useSessionStorage(key, 1);
</script>

# useSessionStorage

> [SessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).

## Parameters

 ```typescript
import { useSessionStorage } from '@elonehoo/vue-hooks'

const SessionStorage = useSessionStorage(key, defaultValue?, sync?)
 ```
| Parameters | Type | Required | Default | Description |
| :---------- | :---- | :-------- | :------- | :---------- |
| key | string, ref\<string> | true | | Key that will be used to store in SessionStorage |
| defaultValue | object | false | undefined | default value stored in the SessionStorage |
| sync | boolean | false | true | sets the storage to sync automatically between tabs |

## Methods

The `useSessionStorage` function exposes the following methods:

```typescript
import { useSessionStorage } from '@elonehoo/vue-hooks'

const { remove, clear, setSync } = useSessionStorage(key)
```

| Signature | Description |
| :--------- | :----------- |
| remove() | Removes key from the SessionStorage, equivalent as `storage.value = undefined` |
| clear() | Clears all used SessionStorage used so far |
| setSync(boolean) | Does nothing, since the session is only available on the tab, this is here to allow the same API as `useLocalStorage`. Returns `false` |

## Example

<div>
  sessionStorage: {{ storage }}
  <p>
    supported:
    <b :class="{ green: supported, red: !supported }">{{ supported }}</b>
  </p>
  <p>
    <b>Check the value in the dev tools: `{{ key }}`</b>
  </p>
  <label for="storage">
    <input name="storage" v-model="storage" />
  </label>
  <div>
    <button @click="remove">Remove</button>
  </div>
</div>

<style>
.red {
  color: red;
}
.green {
  color: green;
}
</style>

```vue
<script setup lang="ts">
import {useSessionStorage} from '@elonehoo/vue-hooks'

const key = "__vue_sessionStorage_example";
const { supported, storage, remove } = useSessionStorage(key, 1);
</script>

<template>
  <div>
    sessionStorage: {{ storage }}
    <p>
      supported:
      <b :class="{ green: supported, red: !supported }">{{ supported }}</b>
    </p>
    <p>
      <b>Check the value in the dev tools: `{{ key }}`</b>
    </p>
    <label for="storage">
      <input name="storage" v-model="storage" />
    </label>

    <div>
      <button @click="remove">Remove</button>
    </div>
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
```
