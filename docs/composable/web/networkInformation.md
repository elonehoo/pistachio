---
outline: deep
---

<script setup lang="ts">
  import { useNetworkInformation } from '@elonehoo/pistachio'

  const networkInformation = useNetworkInformation()
</script>

# useNetworkInformation

> The [NetworkInformation](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation).

## State

The `useNetworkInformation` function exposes the following reactive state:

```typescript
import { useNetworkInformation } from '@elonehoo/pistachio'

const {
  downlink,
  downlinkMax,
  effectiveType,
  rtt,
  saveData,
  supported,
  type
} = useNetworkInformation()
```

| State | Type | Description |
| :---- | :--- | :---------- |
| downlink | number | Returns the effective bandwidth estimate in megabits per second, rounded to the nearest multiple of 25 kilobits per seconds. |
| downlinkMax | number | Returns the maximum downlink speed, in megabits per second (Mbps), for the underlying connection technology. |
| effectiveType | string | Returns the effective type of the connection meaning one of `slow-2g`, `2g`, `3g`, or `4g`. This value is determined using a combination of recently observed round-trip time and downlink values. |
| rtt | number | Returns the estimated effective round-trip time of the current connection, rounded to the nearest multiple of 25 milliseconds. |
| saveData | boolean | Returns true if the user has set a reduced data usage option on the user agent. |
| supported | boolean | If the current browser supports `Network Information API` |
| type | string | Returns the type of connection a device is using to communicate with the network. It will be one of the following values: `bluetooth`, `cellular`, `ethernet`, `none`, `wifi`, `wimax`, `other`, `unknown` |

## Methods

The `useNetworkInformation` function exposes the following methods:

```typescript
import { useNetworkInformation } from '@elonehoo/pistachio'

const { remove } = useNetworkInformation()
```

| Signature | Description |
| :-------- | :---------- |
| remove | Manually removes the event listener |

## Example

<div>
  <h3>Network information</h3>
  <p>
    supported: <b>{{ networkInformation.supported }}</b>
  </p>
  <p>
    downlink: <b>{{ networkInformation.downlink }}</b>
  </p>
  <p>
    downlinkMax: <b>{{ networkInformation.downlinkMax }}</b>
  </p>
  <p>
    effectiveType: <b>{{ networkInformation.effectiveType }}</b>
  </p>
  <p>
    round-trip time: <b>{{ networkInformation.rtt }}</b>
  </p>
  <p>
    saveData: <b>{{ networkInformation.saveData }}</b>
  </p>
  <p>
    type: <b>{{ networkInformation.type }}</b>
  </p>
</div>

```vue
<script setup lang="ts">
import { useNetworkInformation } from '@elonehoo/pistachio'

const networkInformation = useNetworkInformation()
</script>

<template>
  <div>
    <h3>Network information</h3>

    <p>
      supported: <b>{{ networkInformation.supported }}</b>
    </p>
    <p>
      downlink: <b>{{ networkInformation.downlink }}</b>
    </p>
    <p>
      downlinkMax: <b>{{ networkInformation.downlinkMax }}</b>
    </p>
    <p>
      effectiveType: <b>{{ networkInformation.effectiveType }}</b>
    </p>
    <p>
      round-trip time: <b>{{ networkInformation.rtt }}</b>
    </p>
    <p>
      saveData: <b>{{ networkInformation.saveData }}</b>
    </p>
    <p>
      type: <b>{{ networkInformation.type }}</b>
    </p>
  </div>
</template>
```
