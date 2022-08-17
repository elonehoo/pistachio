---
outline: deep
---

<script setup lang="ts">
import { useMatchMedia } from '@elonehoo/vue-hooks'

const {matches} = useMatchMedia("(max-width: 600px)")
</script>

# useMatchMedia

> The [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).

## Parameters

```typescript
import { useMatchMedia } from '@elonehoo/vue-hooks'

const matchMedia = useMatchMedia(mediaQueryString)
```

| Parameters | Type | Required | Description |
| :---------- | :---- | :-------- | :----------- |
| mediaQueryString | string |	true | A string representing the media query to parse. |

## State

The `useMatchMedia` function exposes the following reactive state:

```typescript
import { useMatchMedia } from '@elonehoo/vue-hooks'

const { supported, mediaQueryList, matches } = useMatchMedia()
```

| State | Type | Description |
| :------- | :---- | :----------- |
| supported |	Boolean | Is MatchMedia supported |
| mediaQueryList | [MediaQueryList](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList) | List of objects stores information on a media query |
| matches |	Ref\<boolean> |	A Boolean that returns true if the document currently matches the media query list, or false if not. |

## Methods

The `useMatchMedia` function exposes the following methods:

```typescript
import { useMatchMedia } from '@elonehoo/vue-hooks'

const { remove } = useMatchMedia()
```

| Signature | Description |
| :---------- | :----------- |
| remove | Manually removes the event listener |

## Example

<div>
  <p>
    Screen less than 600px: <b>{{ matches }}</b>
  </p>
</div>

```vue
<script setup lang="ts">
import { useMatchMedia } from '@elonehoo/vue-hooks'

const { matches } = useMatchMedia('(max-width: 600px)')
</script>

<template>
  <div>
    <p>
      Screen less than 600px: <b>{{ matches }}</b>
    </p>
  </div>
</template>
```
