# useInjectFactory

> Wrapper on [inject](https://vuejs.org/api/composition-api-dependency-injection.html#inject) with `treatDefaultAsFactory: true` argument

## Parameters

```typescript
import { useInjectFactory } from '@elonehoo/vue-hooks'

const value = useInjectFactory(key, factory)
```

| Parameters | Type | Required | Description |
| :---------- | :---- | :-------- | :----------- |
| key |	String \| Symbol | true | key |
| factory |	Function\<T> \| Function\<Promise\<T>> | true | Will be called if there's no value provided |

## Example

```typescript
import { useInjectFactory } from '@elonehoo/vue-hooks'

const users = useInjectFactory("myValue", () => {
  if (new Date().getDate() === 2) {
    return {
      a: 1,
    };
  }

  return {
    b: 1,
  };
});

// promise
const users = useInjectFactory("myValue", () =>
  axios.get("/users").then((x) => x.data)
);
if (isPromise(users)) {
  // no value found, we can handle it
} else {
  // users provided
}
```
