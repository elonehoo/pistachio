---
outline: deep
---

<script setup lang="ts">
import { useSharedRef } from '@elonehoo/pistachio'
import { computed } from 'vue'

const sharedRef = useSharedRef('test-shared-ref', 0)

const mindDescription = computed(() => {
  switch (sharedRef.mind.value) {
    case 0:
      return 'HIVE'
    case 1:
      return 'MASTER'
  }
})
const changeMind = () => {
  sharedRef.setMind((sharedRef.mind.value + 1) % 2)
}
</script>

# useSharedRef

> Share the same value across multiple tabs (within the same origin) in the same browser.

:::warning
This relies on [BroadcastChannel API](./broadcastChannel). Safari doesn't support it.
:::

:::tip
You can use short version [refShared](./refShared)
:::

## Parameters

```typescript
import { useSharedRef } from '@elonehoo/pistachio'

const sharedRef = useSharedRef(name, defaultValue?)
```

| Parameters | Type | Required | Default | Description |
| :--------- | :---- | :-------- | :------- | :---------- |
| name | String | true | | Name of the BroadcastChannel |
| defaultValue | T | false | undefined | Default value |

## State

The `useSharedRef` function exposes the following reactive state:

```typescript
import { useSharedRef } from '@elonehoo/pistachio'

const { supported, id, data, master, mind, editable, targets } = useSharedRef()
```

## Methods

The `useSharedRef` function exposes the following methods:

```typescript
import { useSharedRef } from '@elonehoo/pistachio'

const { ping, setMind, addListener } = useSharedRef()
```

## Information

### Mind

This is how the multiple tabs interact with each other, is possible to have two modes:

- 0: Hive (default)
- 1: Master

```typescript
const { setMind } = useSharedRef();
// javascript
setMind(0); // set mind to HIVE
setMind(1); // set mind to MASTER

// typescript
import { SharedRefMind } from "vue-composable";
setMind(SharedRefMind.HIVE); // set mind to HIVE
setMind(SharedRefMind.MASTER); // set mind to MASTER
```

:::tip
When a `useSharedRef(id)` is called it will try to sync with other tabs, `setMind` only needs to set in one intance.
:::

#### HIVE MODE

This interaction allows the `ref` to be updated by everyone. If you have 5 tabs open every tab is allowed to update and everyone will sync to the latest modified value.

#### MASTER MODE

This interaction only allows the `master` to send updates to the other tabs. In `master` mode if the reference is not master the `data` **value changes will be ignored.**

:::warning
If the master instance gets destroyed (the component unmounted or tab closed) a new `master` will be assigned automatically (it will be the oldest instance)
:::

## Example


<div>
  <p>Supported: {{ sharedRef.supported }}</p>
  <p>
    Mind: {{ mindDescription }} <button @click="changeMind">
      Change
    </button>
  </p>
  <p>IsMaster: {{ sharedRef.master }}</p>
  <input v-model="sharedRef.data.value" :disabled="!sharedRef.editable.value">
  <p>targets: {{ sharedRef.targets.value.length }}</p>
</div>

```vue
<script setup lang="ts">
import { useSharedRef } from '@elonehoo/pistachio'
import { computed } from 'vue'

const sharedRef = useSharedRef('test-shared-ref', 0)

const mindDescription = computed(() => {
  switch (sharedRef.mind.value) {
    case 0:
      return 'HIVE'
    case 1:
      return 'MASTER'
  }
})
const changeMind = () => {
  sharedRef.setMind((sharedRef.mind.value + 1) % 2)
}
</script>

<template>
  <div>
    <p>Supported: {{ sharedRef.supported }}</p>
    <p>
      Mind: {{ mindDescription }} <button @click="changeMind">
        Change
      </button>
    </p>
    <p>IsMaster: {{ sharedRef.master }}</p>

    <input v-model="sharedRef.data.value" :disabled="!sharedRef.editable.value">

    <p>targets: {{ sharedRef.targets.value.length }}</p>
  </div>
</template>
```
