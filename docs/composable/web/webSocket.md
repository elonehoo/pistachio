---
outline: deep
---

<script setup lang="ts">
import { useWebSocket } from '@elonehoo/pistachio'

const { isOpen, isClosed, data, errored, send, close } = useWebSocket("wss://javascript.info/article/websocket/demo/hello")
</script>

# useWebSocket

> The [Websocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket).

## State

The `useWebSocket` function exposes the following reactive state:

```typescript
import { useWebSocket } from '@elonehoo/pistachio'

const {
  supported,
  ws,
  messageEvent,
  errorEvent,
  data,
  isOpen,
  isClosed,
  errored
} = useWebSocket()
```

| State        | Type                     | Description                                                 |
| :----------- | :----------------------- | :---------------------------------------------------------- |
| supported    | `boolean`                | Is supported                                                |
| ws           | `WebSocket\|null`         | WebSocket instance, returns `null` if `supported === false` |
| messageEvent | `Ref<MessageEvent\|null>` | Last message event received                                 |
| errorEvent   | `Ref<ErrorEvent>`        | Error event                                                 |
| data         | `Ref<any>`               | Last data received                                          |
| isOpen       | `Ref<boolean>`           | Is websocket open                                           |
| isClosed     | `Ref<boolean>`           | Is websocket closed                                         |
| errored      | `Ref<boolean>`           | Is websocket errored                                        |

## Methods

The `useWebSocket` function exposes the following methods:

```typescript
import { useWebSocket } from '@elonehoo/pistachio'

const { send, close } = useWebSocket()
```

| Signature | Description                     |
| :-------- | :------------------------------ |
| `send`    | Sends message through WebSocket |
| `close`   | Closes WebSocket connection     |

## Example

<div>
  <button @click="send" :disabled="!isOpen">Send</button>
  <button @click="close(1000)" :disabled="!isOpen">Close</button>
  <p>open: {{ isOpen }}</p>
  <p>closed: {{ isClosed }}</p>
  <p>data: {{ data }}</p>
  <p>errored: {{ errored }}</p>
</div>

```vue
<script setup lang="ts">
import { useWebSocket } from '@elonehoo/pistachio'

const { isOpen, isClosed, data, errored, send, close } = useWebSocket("wss://javascript.info/article/websocket/demo/hello")
</script>

<template>
  <div>
    <button @click="send" :disabled="!isOpen">Send</button> &nbsp;
    <button @click="close(1000)" :disabled="!isOpen">Close</button>
    <p>open: {{ isOpen }}</p>
    <p>closed: {{ isClosed }}</p>
    <p>data: {{ data }}</p>
    <p>errored: {{ errored }}</p>
  </div>
</template>

```
