---
outline: deep
---

<script setup lang="ts">
import { useClipboard } from '@elonehoo/pistachio'
const { text, writeText } = useClipboard();

function copy() {
  writeText(Math.random().toString());
  console.log(text.value);
}
</script>

# useClipboard

> [Clipboard_API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)

## State

The `useClipboard` function exposes the following reactive state:

```typescript
import { useClipboard } from '@elonehoo/pistachio'

const { text, supported, write, read } = useClipboard()
```

| State | Type | Description |
| :---- | :--- | :---------- |
| supported | boolean | Returns true if the browser has navigator.clipboard(opens new window) |
| text | Ref\<string \| undefined> | Reactive text in clipboard, also updates the clipboard if changed |
| data | Ref\<DataTransfer \| undefined> | Reactive data in clipboard, it does not update the clipboard on change |

## Example

<div>
  <p>click the button to copy a random number</p>
  <button @click="copy">copy</button>
  <p>Check your dev tools to see what has been copied to your clipboard</p>
  <p>You can also change the clipboard</p>
  <input v-model="text" />
  <div>
    <p>Current clipboard:</p>
    <p>{{ text }}</p>
  </div>
</div>

```vue
<script setup lang="ts">
import { useClipboard } from '@elonehoo/pistachio'
const { text, writeText } = useClipboard()

function copy() {
  writeText(Math.random().toString())
  console.log(text.value)
}
</script>

<template>
  <div>
    <p>click the button to copy a random number</p>
    <button @click="copy">
      copy
    </button>
    <p>Check your dev tools to see what has been copied to your clipboard</p>

    <p>You can also change the clipboard</p>
    <input v-model="text">

    <div>
      <p>Current clipboard:</p>
      <p>{{ text }}</p>
    </div>
  </div>
</template>
```
