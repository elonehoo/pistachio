---
outline: deep
---

<script setup lang="ts">
import { usePageVisibility } from '@elonehoo/pistachio'
import { watch } from 'vue'

const { visibility, hidden } = usePageVisibility();
watch(visibility, () => {
  console.log("visibility changed", {
    visibility: visibility.value,
    hidden: hidden.value
  });
});
</script>

# usePageVisibility

> [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API).

## State

The `usePageVisibility` function exposes the following reactive state:

```typescript
import { usePageVisibility } from '@elonehoo/pistachio'

const { visibility, hidden } = usePageVisibility()
```

| State      | Type                   | Description                       |
| :--------- | :--------------------- | :-------------------------------- |
| visibility | `Ref(VisibilityState)` | Current document visibility state |
| hidden     | `Ref(boolean)`         | `document.hidden`                 |

## Example

<div>
  <h4>
    Hidden: <b>{{ hidden }}</b>
  </h4>
  <h4>
    State: <b>{{ visibility }}</b>
  </h4>
  <p>You can change the state by switching tab - Check console</p>
  <p>
    <a
      href="https://sqa.stackexchange.com/a/32355"
      target="_blank"
      rel="noopener noreferrer"
      >Check this link</a
    >
  </p>
</div>

```vue
<script setup lang="ts">
import { usePageVisibility } from '@elonehoo/pistachio'
import { watch } from 'vue'

const { visibility, hidden } = usePageVisibility()
watch(visibility, () => {
  console.log('visibility changed', {
    visibility: visibility.value,
    hidden: hidden.value
  })
})
</script>

<template>
  <div>
    <h4>
      Hidden: <b>{{ hidden }}</b>
    </h4>
    <h4>
      State: <b>{{ visibility }}</b>
    </h4>
    <p>You can change the state by switching tab - Check console</p>
    <p>
      <a
        href="https://sqa.stackexchange.com/a/32355"
        target="_blank"
        rel="noopener noreferrer"
      >Check this link</a>
    </p>
  </div>
</template>
```
