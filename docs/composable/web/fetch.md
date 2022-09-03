---
outline: deep
---

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFetch } from '@elonehoo/pistachio'

const id = ref(1);
    const { json, loading, exec, status } = useFetch();

    watch(id, id => {
      exec("https://reqres.in/api/user/" + id);
    });
</script>

# useFetch

> The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch).

## Parameters

```typescript
import {useFetch} from '@elonehoo/pistachio'

// string
useFetch(request, optionsInit?)
useFetch(optionsInit?)

interface UseFetchOptions {
  /**
   * @description if the value is `true` it will parse the response automatically `json`
   * @default true
   */
  isJson?: boolean
  /**
   * @description if the value is `true` it will parse the `json` before resolving the promise
   * @default true
   */
  parseImmediate?: boolean
  /**
   * @description cancels the request on component unmount
   * @default true
   */
  unmountCancel?: boolean
}
```

| Parameters | Type | Required | Default | Description |
| :--------- | :--- | :------- | :------ | :---------- |
| request | `Request`\|`string` | `false`| `undefined` | [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) for the first request |
| optionsInit | `UseFetchOptions` & `RequestInit` | `false` | `undefined` | Options for useFetch and [RequestOptions](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) |

:::tip
If `request` is passed, the request will execute immediately, otherwise you need to call `exec(url)`
:::

## State

```typescript
import {useFetch} from '@elonehoo/pistachio'

const {
  promise,
  result,
  loading,
  error,
  json,
  text,
  blob,
  status,
  statusText,
  jsonError
} = useFetch()

exec("./api/")
```

| State      | Type                 | Description                             |
| :--------- | :------------------- | :-------------------------------------- |
| promise    | `Ref<Promise>`       | Last result promise.                    |
| result     | `Ref<Response>`      | The response.                           |
| loading    | `Ref<boolean>`       | If the request is loading.              |
| error      | `Ref<any>`           | If the request threw exception.         |
| json       | `Ref<T>`             | The response body as JSON.              |
| text       | `Ref<string>`        | The response body as text.              |
| blob       | `Ref<Blob>`          | The response body as BLOB.              |
| status     | `Ref<number \| null>` | The HTTP status code.                   |
| statusText | `Ref<number \| null>` | The HTTP status text, eg: "OK" for 200. |
| jsonError  | `Ref<any>`           | Error parsing the `json`.               |

## Methods

The `useFetch` function exposes the following methods:

```typescript
import {useFetch} from '@elonehoo/pistachio'

const { exec, cancel } = useFetch()
```

| Signature | Description |
| :-------- | :---------- |
| `cancel` | Cancels the fetch request if browser supports `AbortController`, otherwise the request will complete but will not update the state. |
| `exec` | Executes the request similar to `fetch`. It returns [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) |

:::tip
You can pass `throwException` on the last argument of the `exec` to override the default behaviour
:::

## Example

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

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFetch } from '@elonehoo/pistachio'

const id = ref(1)
const { json, loading, exec, status } = useFetch()

watch(id, (id) => {
  exec(`https://reqres.in/api/user/${id}`)
})
</script>

<template>
  <div id="fetch">
    <h3>Using <b>reqres.in</b> API</h3>
    <p>current Id {{ id }}</p>
    <p>
      <button @click="id--">
        prev
      </button>
      &nbsp;
      <button @click="id++">
        next
      </button>
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
```
