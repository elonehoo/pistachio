---
outline: deep
---

<script setup lang="ts">
import { useOnline } from '@elonehoo/pistachio'

const online = useOnline()
</script>

# useOnline

> [Navigator.onLine](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) reacts to the browser online state.

## State

The `useOnline` function exposes the following reactive state:

```typescript
import { useOnline } from '@elonehoo/pistachio'

const { supported, online } = useOnline()
```

| State | Type | Description |
| :---- | :--- | :---------- |
| supported | boolean | Returns true if the browser has [Navigator.onLine](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) |
| online | Ref(boolean) |	browser online |

| Signature | Description |
| :-------- | :---------- |
| remove | Manually removes the event listener |

## Example

<div>
  <h1>Is Online?</h1>
  <h3>
    Online: <b :class="{ green: online, red: !online }">{{ online }}</b>
  </h3>
  <h4>
    Supported: <b>{{ online.supported }}</b>
  </h4>
  <p>To test open dev tools and set your browser to offline (Network tab)</p>
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
import { useOnline } from '@elonehoo/pistachio'

const online = useOnline()
</script>

<template>
  <div>
    <h1>Is Online?</h1>

    <h3>
      Online: <b :class="{ green: online, red: !online }">{{ online }}</b>
    </h3>
    <h4>
      Supported: <b>{{ online.supported }}</b>
    </h4>

    <p>To test open dev tools and set your browser to offline (Network tab)</p>
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
