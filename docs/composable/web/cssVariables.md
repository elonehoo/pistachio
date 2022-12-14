---
outline: deep
---

<script setup lang="ts">
import { useCssVariables } from '@elonehoo/pistachio'
import { ref, defineComponent } from 'vue'

const textDiv = ref(null);

const { supported, stop, resume, observing, foreground } = useCssVariables(
  {
    foreground: {
      name: "color-foreground",
      value: "red"
    }
  },
  textDiv
);
</script>

# useCssVariables

> Expose the CSS variables of your choice to reactive properties. Using [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

## Parameters

```typescript
import { useCssVariables } from '@elonehoo/pistachio'

useCssVariables(variables)
useCssVariables(variables, options)
useCssVariables(variables, element, options)

useCssVariables({
  backgroundColor: "color-background", // value is css as --color-background
  foregroundColor: "--color-foreground", // value is css as --color-foreground
  onBackgroundColor: {
    name: "color-on-background",
    value: "red"
  }
});

/**
 * API to assign a value to the css variable
 */
export interface CssVarDefinition {
  name: string
  value: RefTyped<string>
}

/**
 * Possible configuration
 */
export type CssVarDef = CssVarDefinition | string

const defaultOptions = {
  attributes: true,
  childList: true,
  subtree: true
}
```

| Parameters | Type | Required | Default | Description |
| :--------- | :--- | :------- | :------ | :---------- |
| variables | Record\<`string` \| `CssVarDef`> | true	|	| dictionary with the cssVariable name you wish to track/change |
| options | MutationObserverInit | false | `defaultOptions` | Options passed to `MutationObserver.observe` [MutationObserverInit](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit) |
| element | HTMLElement | false | `document.documentElement` | element to keep track of CssVariables, it will default to document.documentElement if is in a client browser |

## State

The `useCssVariables` function exposes the following reactive states:

```typescript
import { useCssVariables } from '@elonehoo/pistachio'

const {
  supported,
  observing,
  backgroundColor,
  onBackgroundColor
} = useCssVariables({
  backgroundColor: "color-background",
  onBackgroundColor: {
    name: "color-on-background",
    value: "red"
  }
});

// backgroundColor contains the `--color-background` CSS variable
// onBackgroundColor sets `--color-on-background` CSS variable with the value 'red'
// observing is true

backGroundColor.value = "yellow"; // updates the cssVariable to yellow
```

| State | Type | Description |
| :---- | :--- | :---------- |
| supported | `boolean` | Returns true if `MutationObserver` is supported |
| observing | `Ref\<boolean>` | A value that indicates if the observer is listening to CSS variable changes |
| ...variables | `Ref\<TVariables>` | Object with the same keys but with reactive CSS variable value |

## Methods

The `useCssVariables` function exposes the following methods:

```typescript
import { useCssVariables } from '@elonehoo/pistachio'

const { resume, stop } = useCssVariables()
```

| Signature | Description |
| :-------- | :---------- |
| resume | Start observing the changes again |
| stop | Stops observing the changes |

::: tip
Calling `stop()` will stop observing for changes in the `DOM`, changes made to the ref will still update/override the style values.

Check the example bellow.
:::

## Example

<div>
  <div>
    <label for="foreground-value">
      Override the value for
      <code>--color-foreground</code>:
    </label>
    <input type="text" id="foreground-value" v-model="foreground" />
  </div>
  <div ref="textDiv" class="text" style="color: var(--color-foreground)">
    <span v-if="observing">I am a text with the following color:</span>
    <span v-else>My color will be updated but not my label:</span>
    {{ foreground }}
  </div>
  <div>
    <button type="button" @click="stop" :disabled="!observing">
      Stop observing
    </button>
    <button type="button" @click="resume" :disabled="observing">
      Resume observing
    </button>
  </div>
</div>

<style scoped>
div > div {
  margin-top: 15px;
}

.text {
  margin: 15px 0;
}
</style>

```vue
<script setup lang="ts">
import { useCssVariables } from '@elonehoo/pistachio'
import { defineComponent, ref } from 'vue'

const textDiv = ref(null)

const { supported, stop, resume, observing, foreground } = useCssVariables(
  {
    foreground: {
      name: 'color-foreground',
      value: 'red'
    }
  },
  textDiv
)
</script>

<template>
  <div>
    <div>
      <label for="foreground-value">
        Override the value for
        <code>--color-foreground</code>:
      </label>
      <input id="foreground-value" v-model="foreground" type="text">
    </div>

    <div ref="textDiv" class="text" style="color: var(--color-foreground)">
      <span v-if="observing">I am a text with the following color:</span>
      <span v-else>My color will be updated but not my label:</span>
      {{ foreground }}
    </div>

    <div>
      <button type="button" :disabled="!observing" @click="stop">
        Stop observing
      </button>
      <button type="button" :disabled="observing" @click="resume">
        Resume observing
      </button>
    </div>
  </div>
</template>

<style scoped>
div > div {
  margin-top: 15px;
}

.text {
  margin: 15px 0;
}
</style>
```
