---
outline: deep
---

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useValidation } from '@elonehoo/pistachio'

const required = (x: any) => !!x

const name = ref('')
const surname = ref('')
const password = ref('')

const form = useValidation({
  firstName: {
    $value: name,
    required,
  },
  lastName: {
    $value: surname,
    required,
  },
  password: {
    $value: password,
    required: {
      $validator: required,
      $message: ref('password is required'),
    },
  },
  samePassword: {
    $value: ref(''),

    match: {
      $validator(x) {
        return x === password.value
      },
      $message: 'Password don\'t match',
    },
  },
})

const submitText = computed(() => {
  if (form.$anyDirty && form.$anyInvalid)
    return 'Invalid form'

  if (!form.$anyDirty)
    return 'Please populate the form'

  if (form.$errors.length > 0) {
    console.log(form.$errors)
    return 'Error'
  }

  return 'Submit'
})

const onSubmit = (e) => {
  e.preventDefault()
  if (form.$anyInvalid) {
    alert('invalid form')
  }
  else {
    const o = form.toObject()
    alert(`submit form "${JSON.stringify(o)}"`)
    console.log('submitted', o)
  }
}
</script>

# useValidation

> `validation` composable inspired by [vuelidate](https://github.com/vuelidate/vuelidate)

:::warning
Currently there's no exported `validators`.
:::

## Parameters

```typescript
import { useValidation } from '@elonehoo/pistachio'

const form = useValidation(options)
```

| Parameters | Type     | Required | Default | Description             |
| :--------- | :------- | :------- | :------ | :---------------------- |
| options    | `Object` | `true`   |         | Validation input object |

## State

The `useValidation` function exposes the following reactive state:

```typescript
import { useValidation } from '@elonehoo/pistachio'

const form = useValidation(options)
```

| State | Type                                     | Description                         |
| :---- | :--------------------------------------- | :---------------------------------- |
| form  | `Reactive<Options & Validation<Object>>` | **Reactive** form validation object |

::: warning
The returned value is an `reactive()` object, **do not** deconstruct it.
:::

## Example

<div class="about">
  <h1>Form validation</h1>
  <form @submit="onSubmit">
    <input v-model="form.firstName.$value" placeholder="firstName">
    <input v-model="form.lastName.$value" placeholder="lastName">
    <input v-model="form.password.$value" placeholder="password">
    <input v-model="form.samePassword.$value" placeholder="password2">
    <p v-if="form.samePassword.$dirty && form.samePassword.match.$invalid">
      {{ form.samePassword.match.$message }}
    </p>
    <br>
    <input
      v-model="submitText"
      type="submit"
      :class="{
        invalid: form.$anyDirty && form.$anyInvalid,
        dirty: form.$anyDirty && !form.$anyInvalid,
        error: form.$errors.length > 0,
      }"
    >
  </form>
</div>

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useValidation } from '@elonehoo/pistachio'

const required = (x: any) => !!x

const name = ref('')
const surname = ref('')
const password = ref('')

const form = useValidation({
  firstName: {
    $value: name,
    required,
  },
  lastName: {
    $value: surname,
    required,
  },
  password: {
    $value: password,
    required: {
      $validator: required,
      $message: ref('password is required'),
    },
  },
  samePassword: {
    $value: ref(''),

    match: {
      $validator(x) {
        return x === password.value
      },
      $message: 'Password don\'t match',
    },
  },
})

const submitText = computed(() => {
  if (form.$anyDirty && form.$anyInvalid)
    return 'Invalid form'

  if (!form.$anyDirty)
    return 'Please populate the form'

  if (form.$errors.length > 0) {
    console.log(form.$errors)
    return 'Error'
  }

  return 'Submit'
})

const onSubmit = (e) => {
  e.preventDefault()
  if (form.$anyInvalid) {
    alert('invalid form')
  }
  else {
    const o = form.toObject()
    alert(`submit form "${JSON.stringify(o)}"`)
    console.log('submitted', o)
  }
}

</script>

<template>
  <div class="about">
    <h1>Form validation</h1>
    <form @submit="onSubmit">
      <input v-model="form.firstName.$value" placeholder="firstName">
      <input v-model="form.lastName.$value" placeholder="lastName">
      <input v-model="form.password.$value" placeholder="password">
      <input v-model="form.samePassword.$value" placeholder="password2">
      <p v-if="form.samePassword.$dirty && form.samePassword.match.$invalid">
        {{ form.samePassword.match.$message }}
      </p>

      <br>
      <input
        v-model="submitText"
        type="submit"
        :class="{
          invalid: form.$anyDirty && form.$anyInvalid,
          dirty: form.$anyDirty && !form.$anyInvalid,
          error: form.$errors.length > 0,
        }"
      >
    </form>
  </div>
</template>
```
