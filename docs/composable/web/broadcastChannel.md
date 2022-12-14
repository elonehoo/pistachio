---
outline: deep
---

<script setup lang="ts">
import { ref } from 'vue'
import { useBroadcastChannel } from '@elonehoo/pistachio'

const { supported, data, send } = useBroadcastChannel("composable-example");
const message = ref("");
const submitMessage = () => {
  send(message.value);
  message.value = "";
};
</script>

# useBroadcastChannel

> [BroadcastChannel](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API).

## Parameters

```typescript
import { useBroadcastChannel } from '@elonehoo/pistachio'

const scroll = useBroadcastChannel(name, onBeforeClose?)
```

| Parameters | Type | Required | Default | Description |
| :---------- | :---- | :------- | :----- | :---------- |
| name | String | true | Name of the channel to be created | |
| onBeforeClose | Funcion | false | Passed function will be called before the broadcastChannel closes | |

## State

The `useBroadcastChannel` function exposes the following reactive state:

```typescript
import { useBroadcastChannel } from '@elonehoo/pistachio'

const {
  supported,
  data,
  messageEvent,
  errorEvent,
  errored,
  isClosed
} = useBroadcastChannel()
```

| State | Type | Description |
| :----- | :---- | :--------- |
| supported | boolean | return true if the browser supports it |
| data | Ref\<T> | last message data |
| messageEvent | Ref\<MessageEvent> | Last event received |
| errorEvent | Ref\<MessageError> | Last error Event (opens new window)received |
| errored | Ref\<boolean> | true if received an invalid event |
| isClosed | Ref\<boolean> | true if the broadcastChannel is closed |

## Methods

The `useBroadcastChannel` function exposes the following methods:

```typescript
import { useBroadcastChannel } from '@elonehoo/pistachio'

const { send, close, addListener } = useBroadcastChannel()
```

| Signature | Description |
| :-------- | :---------- |
| send(data) | send data |
| close | closes BroadcastChannel |
| addListener(cb, options?) | Add new message listener |

## Example

<div>
  <p>
    Supported: <b>{{ supported }}</b>
  </p>
  <p>
    To test please open 2 or more tabs, press send and all the other tabs
    should show the message
  </p>
  <p v-if="data">received: {{ data }}</p>
  <div>
    <input
      v-model="message"
      placeholder="Write a message"
      @keydown.enter="submitMessage"
    />
    <button @click="submitMessage">send</button>
  </div>
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useBroadcastChannel } from '@elonehoo/pistachio'

const { supported, data, send } = useBroadcastChannel('composable-example')
const message = ref('')
const submitMessage = () => {
  send(message.value)
  message.value = ''
}
</script>

<template>
  <div>
    <p>
      Supported: <b>{{ supported }}</b>
    </p>
    <p>
      To test please open 2 or more tabs, press send and all the other tabs
      should show the message
    </p>

    <p v-if="data">
      received: {{ data }}
    </p>

    <div>
      <input
        v-model="message"
        placeholder="Write a message"
        @keydown.enter="submitMessage"
      >
      <button @click="submitMessage">
        send
      </button>
    </div>
  </div>
</template>
```
