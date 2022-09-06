---
outline: deep
---

<script setup lang="ts">
import { useTimeout } from '@elonehoo/pistachio'

let cancelTimeout;

function show() {
  const { cancel } = useTimeout(() => {
    alert("useTimeout callback invoked");
  }, 2000);
  cancelTimeout = cancel;
}

function cancel() {
  cancelTimeout();
}
</script>

# useTimeout

>The [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout).

## Parameters

```typescript
import { useTimeout } from '@elonehoo/pistachio'

useTimeout(fn, delay)
```

| Parameters | Type       | Required | Default | Description                                                                                                           |
| :--------- | :--------- | :------- | :------ | :-------------------------------------------------------------------------------------------------------------------- |
| fn         | `Function` | `true`   |         | A function to be executed after the timer expires.                                                                    |
| delay      | `number`   | `false`  | `0 `    | The time, in milliseconds (thousandths of a second), the timer should wait before the specified function is executed. |

## State

The `useTimeout` function exposes the following reactive state:

```typescript
import { useTimeout } from '@elonehoo/pistachio'

const { ready } = useTimeout(fn, delay)
```

| State | Type         | Description |
| ----- | ------------ | ---------------------------------------------------------------------------------------------------- |
| ready | `Ref<boolean \| null>` | current timeout state:<br/>&emsp;false - pending <br/>&emsp;true - called <br/>&emsp;null - canceled |

## Methods

The `useTimeout` function exposes the following methods:

```typescript
import { useTimeout } from '@elonehoo/pistachio'

const { cancel } = useTimeout(fn, delay)
```

| Signature | Description        |
| :-------- | :----------------- |
| `cancel`  | cancel the timeout |

## Example

<div>
  <p />
  <button @click="show">Show an alert box after two seconds</button>
  <p />
  <button @click="cancel">Cancel alert before it happens</button>
</div>

```vue
<script setup lang="ts">
import { useTimeout } from '@elonehoo/pistachio'

let cancelTimeout

function show() {
  const { cancel } = useTimeout(() => {
    alert('useTimeout callback invoked')
  }, 2000)
  cancelTimeout = cancel
}

function cancel() {
  cancelTimeout()
}
</script>

<template>
  <div>
    <p />
    <button @click="show">
      Show an alert box after two seconds
    </button>
    <p />
    <button @click="cancel">
      Cancel alert before it happens
    </button>
  </div>
</template>
```
