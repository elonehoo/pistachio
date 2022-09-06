---
outline: deep
---

<script setup lang="ts">
import { useTitle } from '@elonehoo/pistachio'

const title = useTitle()
</script>


# useTitle

> Reactive [Document.title](https://developer.mozilla.org/en-US/docs/Web/API/Document/title).

## Parameters

```typescript
import { useTitle } from '@elonehoo/pistachio'

const title = useTitle(newTitle?)
```

| Parameters | Type     | Required | Default     | Description                |
| :--------- | :------- | :------- | :---------- | :------------------------- |
| newTitle   | `string` | `false`  | `undefined` | Overrides `document.title` |

## State

The `useTitle` function exposes the following reactive state:

```typescript
import { useTitle } from '@elonehoo/pistachio'

const title = useTitle()
```

| State | Type          | Description                                                                               |
| :---- | :------------ | :---------------------------------------------------------------------------------------- |
| title | `Ref<string>` | Ref for `document.title`, watches for `document.title` changes or set to update the title |

## Example

<div>
  <label for="title-updater">document.title:</label>
  <input name="title-updater" v-model="title" />
</div>

```vue
<script setup lang="ts">
import { useTitle } from '@elonehoo/pistachio'

const title = useTitle()
</script>

<template>
  <div>
    <label for="title-updater">document.title:</label>
    <input name="title-updater" v-model="title" />
  </div>
</template>
```
