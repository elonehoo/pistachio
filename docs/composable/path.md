---
outline: deep
---

<script setup lang="ts">
  import { usePath } from '@elonehoo/pistachio'
  import { ref, computed } from 'vue'

  const inputPath = ref("user.name");
  const json = ref(JSON.stringify({ user: { name: "test" } }));

  const inputValue = usePath(
    computed(() => JSON.parse(json.value)),
    inputPath,
    ".",
    () => "Not Found"
  );
</script>

# usePath

> Retrieve object value based on string path

## Parameters

```typescript
import { usePath } from '@elonehoo/pistachio'

const value = usePath(source, path, separator?, notFoundReturn)
```

| Parameters | Type |	Required | Default | Description |
|:------------|:------|:----------|:---------|:-------------|
| source | Object\|Ref\<Object> |	true |	| Object source |
| path | String\|Ref\<String> |	true | | string path to value |
| separator | String | false | `.` | path separator |
| notFoundReturn | Function |	false |	|	Not found or invalid path handler |

## State

The `usePath` function exposes the following reactive state:

```typescript
import { usePath } from '@elonehoo/pistachio'

const name = usePath({ user: { name: "test" } }, "user.name")
// or typed
const name = usePath<string>({ user: { name: "test" } }, "user.name")
```

| State |	Type | Description |
|:------|:------|:------------|
|name |	Ref\<T> |	Readonly ref with the object value for the path |

## Access

```typescript
const o = {
  a: {
    a: 1,
    b: [
      2,
      {
        c: {
          ["a-b-c-d"]: 3
        }
      }
    ]
  }
};

usePath(o, "a[a]"); // result: 1 | equivalent: a.a
usePath(o, "[a]['a']"); // result: 1  | equivalent: a.a
usePath(o, '["a"][`b`][0]'); // result: 2 | equivalent: a.b["0"]
usePath(o, "a.b[1].c[a-b-c-d]"); // result: 3  | equivalent: a.b[1].c["a-b-c-d"]
```

## Limitations

The access in `[]` is limited to this regex expression:

```typescript
/\[[`'"]?([^`'"\]]*)[`'"]?\]/g
```

## Example

<div id="format">
  <div>
    <h4>Path example</h4>
    <div>
      Path:
      <input v-model="inputPath" />
    </div>
    <div>
      <p>Object</p>
      <textarea v-text="json" />
    </div>
    <div>
      <p>Value:</p>
      <textarea v-text="inputValue" disabled />
    </div>
  </div>
</div>

```vue
<script setup lang="ts">
import { usePath } from '@elonehoo/pistachio'
import { computed, ref } from 'vue'

const inputPath = ref('user.name')
const json = ref(JSON.stringify({ user: { name: 'test' } }))

const inputValue = usePath(
  computed(() => JSON.parse(json.value)),
  inputPath,
  '.',
  () => 'Not Found'
)
</script>

<template>
  <div id="format">
    <div>
      <h4>Path example</h4>
      <div>
        Path:
        <input v-model="inputPath">
      </div>
      <div>
        <p>Object</p>
        <textarea v-text="json" />
      </div>

      <div>
        <p>Value:</p>
        <textarea disabled v-text="inputValue" />
      </div>
    </div>
  </div>
</template>
```
