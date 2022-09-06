---
outline: deep
---

<script setup lang="ts">
import { useUndo } from '@elonehoo/pistachio'

const { value, undo, redo, prev, next } = useUndo()
</script>

# useUndo

> Tracks variable history, to allow `undo` and `redo`

## Parameters

```typescript
import { useUndo } from '@elonehoo/pistachio'

export interface UndoOptions<T> {
  /**
   * Watch `deep` option for changes
   */
  deep: boolean

  /**
   * Max history change
   * @default MAX_ARRAY_SIZE
   */
  maxLength: number

  /**
   * Clone strategy
   * @default (x)=>x
   */
  clone: (entry: T) => T
}

const defaultOptions = {
  deep: undefined,


  maxLength: MAX_ARRAY_SIZE,

  clone(x) {
    return x
  }
}

useUndo(defaultValue?, options?)
```

| Parameters   | Type        | Required | Default          | Description           |
| :----------- | :---------- | :------- | :--------------- | :-------------------- |
| defaultValue | `Ref<T>\|T`  | `false`  | `undefined`      | Default value         |
| options      | `(x: T)=>T` | `false`  | `defaultOptions` | Configuration options |

::: tip
If tracking object please provide a `options.clone` function.

```typescript
// example
function clone(e) {
  return JSON.parse(JSON.stringify(e));
}
```
:::

## State

The `useUndo` function exposes the following reactive state:

```typescript
import { useUndo } from '@elonehoo/pistachio'

const { value, prev, next } = useUndo()
```

| State | Type       | Description                                |
| :---- | :--------- | :----------------------------------------- |
| value | `Ref<T>`   | State value                                |
| prev  | `Ref<T[]>` | Array of prev states                       |
| next  | `Ref<T[]>` | Array of next states, only if you `undo()` |

## Methods

The `useUndo` function exposes the following methods:

```typescript
import { useUndo } from '@elonehoo/pistachio'

const { jump, undo, redo } = useUndo()
```

| Signature     | Description                                                                                  |
| :------------ | :------------------------------------------------------------------------------------------- |
| `jump(delta)` | moves the cursor to `delta`, if delta is positive it will `undo`, if negative it will `redo` |
| `undo(n?)`    | Undo the state to `n` default to 1                                                           |
| `redo(n?)`    | Redo the state to `n` default to 1                                                           |

## Example

<div>
  <p>Type a text to enable undo and redo</p>
  <input v-model="value">
  <div>
    <button :disabled="!prev.length" @click="undo()">
      Undo
    </button>
    <button :disabled="!next.length" @click="redo()">
      Redo
    </button>
  </div>
  <p>
    <b>Prev</b>
    {{ prev }}
  </p>
  <p>
    <b>Next</b>
    {{ next }}
  </p>
</div>

```vue
<script setup lang="ts">
import { useUndo } from '@elonehoo/pistachio'

const { value, undo, redo, prev, next } = useUndo()
</script>

<template>
  <div>
    <p>Type a text to enable undo and redo</p>
    <input v-model="value">

    <div>
      <button :disabled="!prev.length" @click="undo()">
        Undo
      </button>
      <button :disabled="!next.length" @click="redo()">
        Redo
      </button>
    </div>

    <p>
      <b>Prev</b>
      {{ prev }}
    </p>

    <p>
      <b>Next</b>
      {{ next }}
    </p>
  </div>
</template>
```
