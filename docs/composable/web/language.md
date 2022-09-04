---
outline: deep
---

<script setup lang="ts">
import { useLanguage } from '@elonehoo/pistachio'

const { language, languages } = useLanguage()
</script>

# useLanguage

> [NavigatorLanguage](https://developer.mozilla.org/en-US/docs/Web/API/Navigator).

## State

The `useLanguage` function exposes the following reactive state:

```typescript
import { useLanguage } from '@elonehoo/pistachio'

const { language, languages } = useLanguage()
```

## Example

<div>
  <h3>
    Language: <b>{{ language }}</b>
  </h3>
  <div>
    <h4>Preferred Languages</h4>
    <ul>
      <li v-for="l in languages" :key="l">
        {{ l }}
      </li>
    </ul>
  </div>
</div>

```vue
<script setup lang="ts">
import { useLanguage } from '@elonehoo/pistachio'

const { language, languages } = useLanguage()
</script>

<template>
  <div>
    <h3>
      Language: <b>{{ language }}</b>
    </h3>
    <div>
      <h4>Preferred Languages</h4>
      <ul>
        <li v-for="l in languages" :key="l">
          {{ l }}
        </li>
      </ul>
    </div>
  </div>
</template>
```
