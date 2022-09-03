# useRefDebounced

debounces the update value of a ref

## Parameters

```typescript
import { refDebounced } from '@elonehoo/pistachio'

refDebounced(delay)
refDebounced(value, delay)
```

| Parameters | Type | Required | Default | Description |
| :---------- | :---- | :-------- | :------- | :---------- |
| delay | number | true | | debounce delay |
| value | T | false | undefined |	initial value |

## State

The refDebounced function retuns a ref:

```typescript
import { refDebounced } from '@elonehoo/pistachio'

const debouncedValue = refDebounced()
```

| State | Type | Description |
| :----- | :---- | :---------- |
| debouncedValue | Ref\<T> | debounced ref |
