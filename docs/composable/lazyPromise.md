## useLazyPromise

> Sugar for [usePromise](./promise)
>
> This is only a sugar method to call Promise, passing the option for lazy, might not be clear enough.

## Parameters

```typescript
import { usePromiseLazy } from '@elonehoo/pistachio'

const use = usePromiseLazy(fn, throwException?)
```

| Parameters     | Type       | Required | Default | Description                   |
| :------------- | :--------- | :------- | :------ | :---------------------------- |
| fn             | `Function` | true     |         | Promise factory               |
| throwException | `boolean`  | false    | false   | Exposes exception on `exec()` |

## State

Check [usePromise#State](./promise#state)

## Methods

Check [usePromise#Methods](./promise#methods)

## Implementation

```typescript
// this is basically the code for this with no typings

function usePromiseLazy(fn, throwException) {
  return usePromise(fn, {
    lazy: true,
    throwException
  })
}
```
