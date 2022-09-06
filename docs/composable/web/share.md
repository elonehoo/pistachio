---
outline: deep
---

<script setup lang="ts">
import { reactive } from 'vue'
import { useShare } from '@elonehoo/pistachio'

const data = reactive({
  url: "https://pistachio.elonehoo.xyz/",
  text: "Built with ❤️",
  title: "You need to use this, just amazing"
})
const { supported, share, canShare, shared, cancelled } = useShare()
</script>

# useShare

> The [WebShare API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share).

## Parameters

```typescript
import { useShare } from '@elonehoo/pistachio'

useShare(data?)
```

| Parameters | Type                 | Required | Default     | Description                                                                                                  |
| :--------- | :------------------- | :------- | :---------- | :----------------------------------------------------------------------------------------------------------- |
| data       | `NavigatorShareData` | `false`  | `undefined` | An object containing data to share. [Info](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) |

## State

The `useShare` function exposes the following reactive state:

```typescript
import { useShare } from '@elonehoo/pistachio'

const { supported, shared, cancelled } = useShare()
```

| State     | Type           | Description                                                                                            |
| :-------- | :------------- | :----------------------------------------------------------------------------------------------------- |
| supported | `boolean`      | Is supported - [compatibility table](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) |
| shared    | `Ref<boolean>` | Has been shared                                                                                        |
| cancelled | `Ref<boolean>` | Has been cancelled by the user                                                                         |

## Methods

The `useShare` function exposes the following methods:

```typescript
import { useShare } from '@elonehoo/pistachio'

const { share, canShare } = useShare()
```

| Signature  | Description                     |
| :--------- | :------------------------------ |
| `share`    | Shares `data`. Return `Promise` |
| `canShare` | returns `true` or `false`       |

## Example

<div>
  <table>
    <tbody>
      <tr>
        <td colspan="2">
          <p>
            Supported:
            <b>{{ supported }}</b>
          </p>
        </td>
      </tr>
      <tr>
        <td>
          <label for="title">Title</label>
        </td>
        <td>
          <input name="title" v-model="data.title" />
        </td>
      </tr>
      <tr>
        <td>
          <label for="text">Text</label>
        </td>
        <td>
          <input name="text" v-model="data.text" />
        </td>
      </tr>
      <tr>
        <td>
          <label for="url">URL</label>
        </td>
        <td>
          <input name="url" v-model="data.url" />
        </td>
      </tr>
      <tr>
        <td>
          <p v-if="canShare(data)">You can share</p>
          <p v-else>Can't share</p>
        </td>
        <td>
          <button @click="share(data)">Share</button>
        </td>
      </tr>
      <tr>
        <td>Shared</td>
        <td>{{ shared }}</td>
      </tr>
      <tr>
        <td>Cancelled</td>
        <td>{{ cancelled }}</td>
      </tr>
    </tbody>
  </table>
</div>

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import { useShare } from '@elonehoo/pistachio'

const data = reactive({
  url: 'https://pistachio.elonehoo.xyz/',
  text: 'Built with ❤️',
  title: 'You need to use this, just amazing'
})
const { supported, share, canShare, shared, cancelled } = useShare()
</script>

<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td colspan="2">
            <p>
              Supported:
              <b>{{ supported }}</b>
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <label for="title">Title</label>
          </td>
          <td>
            <input v-model="data.title" name="title">
          </td>
        </tr>
        <tr>
          <td>
            <label for="text">Text</label>
          </td>
          <td>
            <input v-model="data.text" name="text">
          </td>
        </tr>
        <tr>
          <td>
            <label for="url">URL</label>
          </td>
          <td>
            <input v-model="data.url" name="url">
          </td>
        </tr>
        <tr>
          <td>
            <p v-if="canShare(data)">
              You can share
            </p>
            <p v-else>
              Can't share
            </p>
          </td>
          <td>
            <button @click="share(data)">
              Share
            </button>
          </td>
        </tr>
        <tr>
          <td>Shared</td>
          <td>{{ shared }}</td>
        </tr>

        <tr>
          <td>Cancelled</td>
          <td>{{ cancelled }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
```
