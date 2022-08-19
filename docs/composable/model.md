---
outline: deep
---

<script setup lang="ts">
import { ref } from 'vue'
import child from '../components/child.vue'

const myValue = ref("MyValue");

</script>

# useModel

> helper to wrap model update into a `ref`

## Parameters

```typescript
import { useModel } from '@elonehoo/vue-hooks'

useModel(props, propName)
```

| Parameters | Type | Required | Description |
| :---------- | :---- | :-------- | :----------- |
| props |	Props |	true | Props object from the setup(props) |
| propName | string | true | Prop key, used to access property value |

## State

The `useModel` function exposes the following reactive state:

```typescript
import { useModel } from '@elonehoo/vue-hooks'

const myValue = useModel(props, "myValue")
```

| State |	Type | Description |
| :---- | :---- | :----------- |
| myValue |	Ref\<T> |	Value for the prop |


<div>
  <p>myValue: {{ myValue }}</p>

  <child v-model:value="myValue" />
</div>

```vue
<!-- child.vue -->
<script setup lang="ts">
import { computed, getCurrentInstance, ref, } from 'vue'

</script>

<script setup lang="ts">
import child from './child.vue'

const props = defineProps(['value'])

function useModel(props: any, name: any) {
  const instance = getCurrentInstance()
  if (!instance)
    return ref()

  return computed({
    get() {
      return props[name]
    },
    set(v) {
      instance.emit(`update:${name}`, v)
    }
  })
}

const value = useModel(props, 'value')

const myValue = ref('MyValue')

</script>

<!-- index.vue -->
<template>
  <div>
    <label>Update value:</label>
    <input v-model="value" name="child-input">
  </div>
</template>

<template>
  <div>
    <p>myValue: {{ myValue }}</p>

    <child v-model:value="myValue"/>
  </div>
</template>
```
