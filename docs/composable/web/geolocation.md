---
outline: deep
---

<script setup lang="ts">
import { useGeolocation } from '@elonehoo/pistachio'

const {supported, refresh, coords, error} = useGeolocation({ immediate: true })
</script>

# useGeolocation

> [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API).

## Parameters

```typescript
import { useGeolocation } from '@elonehoo/pistachio'

const geolocation = useGeolocation(options?)
```

| Parameters | Type | Required | Default | Description |
| :--------- | :--- | :------- | :------ | :---------- |
| options | `PositionOptions` \& `{immediate?: boolean}` |	 | `{ immediate: true }` | Options to handle geoLocation, immediate will trigger watchPosition on mounting |

## State

The `useGeolocation` function exposes the following reactive state:

```typescript
import { useGeolocation } from '@elonehoo/pistachio'

const { supported, coords, highAccuracy, error, timestamp } = useGeolocation()
```

| State        | Type                 | Description                                |
| :----------- | :------------------- | :----------------------------------------- |
| supported    | `boolean`            | Checks if the browser supports Geolocation |
| coords       | `Ref<Position>`      | Position object                            |
| highAccuracy | `Ref<boolean>`       | enable or disable highAccuracy mode        |
| error        | `Ref<PositionError>` | last position error                        |
| timestamp    | `Ref<number>`        | Timestamp of the last position or error    |

## Methods

The `useGeolocation` function exposes the following methods:

```js
import { useGeolocation } from '@elonehoo/pistachio'

const { refresh } = useGeolocation()
```

| Signature | Description |
| refresh | Refreshes the location. If `immediate:false` it will add a watch on `watchPosition` and if called multiple times will call `getCurrentPosition` |

## Example

<div>
  <h6>
    Supported: <b>{{ supported }}</b>
  </h6>
  <button @click="refresh">Request location</button>
  <div>
    coords:
    <ul v-if="coords">
      <li>latitude: {{ coords.latitude }}</li>
      <li>longitude: {{ coords.longitude }}</li>
      <li>altitude : {{ coords.altitude }}</li>
      <li>accuracy: {{ coords.accuracy }}</li>
      <li>altitudeAccuracy: {{ coords.altitudeAccuracy }}</li>
      <li>heading : {{ coords.heading }}</li>
      <li>speed : {{ coords.speed }}</li>
    </ul>
    <div v-else-if="error">
      <p><b>Error:</b> {{ error }}</p>
    </div>
    <div v-else>
      No coords
    </div>
  </div>
</div>

```vue
<script setup lang="ts">
import { useGeolocation } from '@elonehoo/pistachio'

const { supported, refresh, coords, error } = useGeolocation({ immediate: true })
</script>

<template>
  <div>
    <h6>
      Supported: <b>{{ supported }}</b>
    </h6>
    <button @click="refresh">
      Request location
    </button>
    <div>
      coords:
      <ul v-if="coords">
        <li>latitude: {{ coords.latitude }}</li>
        <li>longitude: {{ coords.longitude }}</li>
        <li>altitude : {{ coords.altitude }}</li>
        <li>accuracy: {{ coords.accuracy }}</li>
        <li>altitudeAccuracy: {{ coords.altitudeAccuracy }}</li>
        <li>heading : {{ coords.heading }}</li>
        <li>speed : {{ coords.speed }}</li>
      </ul>
      <div v-else-if="error">
        <p><b>Error:</b> {{ error }}</p>
      </div>
      <div v-else>
        No coords
      </div>
    </div>
  </div>
</template>
```
