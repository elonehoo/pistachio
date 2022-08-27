# useSessionStorage

> [SessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).

## Parameters

 ```typescript
import { useSessionStorage } from '@elonehoo/vue-hooks'

const SessionStorage = useSessionStorage(key, defaultValue?, sync?)
 ```
| Parameters | Type | Required | Default | Description |
| :---------- | :---- | :-------- | :------- | :---------- |
| key | string, ref\<string> | true | | Key that will be used to store in SessionStorage |
| defaultValue | object | false | undefined | default value stored in the SessionStorage |
| sync | boolean | false | true | sets the storage to sync automatically between tabs |

## Methods

The `useSessionStorage` function exposes the following methods:

```typescript
import { useSessionStorage } from '@elonehoo/vue-hooks'

const { remove, clear, setSync } = useSessionStorage(key)
```

