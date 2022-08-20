---
outline: deep
---

<script setup lang="ts">
  import {ref} from 'vue'
  import {useLockScroll} from '@elonehoo/vue-hooks'

  const elref = ref<any>(null);

  const { locked, remove } = useLockScroll(elref);
</script>

# useLockScroll

> Add `no-scroll` class to a element or selector.

## Parameters

```typescript
import { useLockScroll } from '@elonehoo/vue-hooks'

const options = {
    lockedClass: String,
    auto: Boolean,
    onChange(el: Element, lock: Boolean)
}

const selector = '.selector'
const lockClass = 'lock-class'
const element = ref<HTMLElement>()
const elements = [element]

useLockScroll(selector, options?)
useLockScroll(selector, lockClass?)

useLockScroll(element)
useLockScroll(element, options?)
useLockScroll(element, lockClass?)

useLockScroll(elements)
useLockScroll(elements, options?)
useLockScroll(elements, lockClass?)
```

| Parameters | Type | Required | Default | Description |
| :---------- | :---- | :-------- | :------- | :----------- |
| selector | string | true | | string selector |
| element | Ref\<Element> \| Element | true | |	template element |
| elements | Ref\<Elements[]> \| Elements[] | true | | list of elements |
| options | Options | false | | Options for useLockScroll |
| lockClass | string | false | no-scroll | custom lockClass |

## State

The `useLockScroll` function exposes the following reactive state:

```typescript
import { useLockScroll } from '@elonehoo/vue-hooks'

const { locked } = useLockScroll()
```

|State | Type | Description |
| :---- | :---- | :----------- |
| locked | Ref\<boolean> | Is currently locked |

## Example

<div>
  Toggle
  <b>locked</b> to enable or disable
  <b>scroll</b>
  <div ref="elref" class="scroll-component">
    <p v-for="x in 10" :key="x">{{ x }}</p>
  </div>
  <button @click="remove">remove</button>
  <span>
    <input type="checkbox" v-model="locked" />
    Locked
  </span>
</div>

<style scoped>
.scroll-component {
  overflow: scroll;
  height: 70px;
  background: gray;
}

.no-scroll {
  overflow: hidden !important;
}
</style>

```vue
<script setup lang="ts">
  import {ref} from 'vue'
  import {useLockScroll} from '@elonehoo/vue-hooks'

  const elref = ref<any>(null);

  const { locked, remove } = useLockScroll(elref);
</script>

<template>
  <div>
    Toggle
    <b>locked</b> to enable or disable
    <b>scroll</b>
    <div ref="elref" class="scroll-component">
      <p v-for="x in 10" :key="x">{{ x }}</p>
    </div>

    <button @click="remove">remove</button>
    <span>
      <input type="checkbox" v-model="locked" />
      Locked
    </span>
  </div>
</template>

<style scoped>
.scroll-component {
  overflow: scroll;
  height: 70px;
  background: gray;
}

.no-scroll {
  overflow: hidden !important;
}
</style>
```
