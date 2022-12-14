import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NO_OP, useValidation } from '@elonehoo/pistachio'
import { ref } from 'vue'
import { createVue, nextTick } from '../utils'

describe('validation', () => {
  it('validation', async () => {
    const $value = ref('')
    const $value1 = ref('')

    const validation = useValidation({
      test: {
        $value,
        required(x: string) {
          return !!x
        },
      },
      test1: {
        $value: $value1,
        required(x: string) {
          return !!x
        },
      },
    })

    expect(validation).toMatchObject({
      $anyDirty: false,
      $anyInvalid: true,

      test: {
        $dirty: false,
        $value: $value.value,
        required: {
          $invalid: true,
        },
      },
      test1: {
        $dirty: false,
        $value: $value1.value,
        required: {
          $invalid: true,
        },
      },
    })

    $value.value = 'hello'

    await nextTick()

    expect(validation.test.$value).toBe($value.value)
    expect(validation).toMatchObject({
      $anyDirty: true,
      $anyInvalid: true,

      test: {
        $dirty: true,
        $value: $value.value,
        required: {
          $invalid: false,
        },
      },
      test1: {
        $dirty: false,
        $value: $value1.value,
        required: {
          $invalid: true,
        },
      },
    })
  })

  it('validator should run if dependent of other ref', async () => {
    const password = ref('')
    const form = useValidation({
      password: {
        $value: password,
      },
      password2: {
        $value: ref(''),
        samePassword(r: string, ctx: any) {
          return r === ctx.password.$value
        },
      },
    })

    expect(form.password2.samePassword.$invalid).toBe(false)

    form.password.$value = 'test'
    await nextTick()

    expect(form.password2.samePassword.$invalid).toBe(true)
  })

  it('should keep values with key starting `$`', () => {
    const $args = [1, 2]
    const v = useValidation({
      password: {
        $value: ref(''),
        $args,
      },
    })

    expect(v.password.$args).toStrictEqual($args)
  })

  it('should store error if exception thrown ', async () => {
    const error = new Error('my error')
    const v = useValidation({
      password: {
        $value: ref(''),
        required() {
          throw error
        },
      },
    })

    await nextTick()

    expect(v.password.required.$error).toStrictEqual(error)
    expect(v.password.$errors).toMatchObject([error])
    expect(v.$errors).toMatchObject([[error]])
  })

  it('should handle promise validator', async () => {
    let promiseResolve: Function = NO_OP
    const promise = new Promise<boolean>(
      resolve => (promiseResolve = resolve),
    )

    const v = useValidation({
      password: {
        $value: ref(''),
        required() {
          return promise
        },
      },
    })

    expect(v.password.required.$pending).toBe(true)

    promiseResolve(true)
    await nextTick()

    expect(v.password.required.$pending).toBe(false)
  })

  it('should handle promise validator with objectValidator', async () => {
    let promiseResolve: Function = NO_OP
    const promise = new Promise<boolean>(
      resolve => (promiseResolve = resolve),
    )

    const v = useValidation({
      password: {
        $value: ref(''),
        required: {
          $validator() {
            return promise
          },
          $message: ref('Err'),
        },
      },
    })

    v.password.$value
    expect(v.password.required.$pending).toBe(true)
    expect(v.password.required.$message).toBe('Err')

    promiseResolve(true)
    await nextTick()

    expect(v.password.required.$pending).toBe(false)
    expect(v.password.required.$message).toBe('Err')
  })

  it('should test error ', async () => {
    const v = useValidation({
      input: {
        $value: '',

        required() {
          throw new Error('error 1')
        },
        match() {
          throw new Error('error 2')
        },
      },
    })
    v.input.$value = '1'
    await nextTick()

    expect(v.input.$errors).toStrictEqual([
      new Error('error 1'),
      new Error('error 2'),
    ])
  })

  it('should store $errors if $message is available', () => {
    const $message = 'Invalid value'
    const v = useValidation({
      input: {
        $value: '',
        required: {
          $validator(x: string) {
            return false
          },
          $message,
        },
      },
      otherInput: {
        $value: '',
        required(x: string) {
          return false
        },
      },
    })

    expect(v.input.$errors).toMatchObject([$message])
    expect(v.otherInput.$errors).toMatchObject([true])
  })

  describe('object', () => {
    it('should convert to object', () => {
      const v = useValidation({
        input: {
          $value: '',
          required: {
            $validator(x: string) {
              return false
            },
            $message: 'test',
          },
        },
        otherInput: {
          $value: '',
          required(x: string) {
            return false
          },
        },
      })

      expect(v.toObject()).toMatchObject({ input: '', otherInput: '' })

      v.input.$value = 'test'
      v.otherInput.$value = 'other'

      expect(v.toObject()).toMatchObject({
        input: 'test',
        otherInput: 'other',
      })

      expect(v.input.toObject()).toBe('test')
    })

    it('should convert to object even on nested validations', () => {
      const v = useValidation({
        address: {
          address1: {
            $value: 'address1',
          },
          address2: {
            part1: {
              $value: 'part1',
            },
            part2: {
              $value: 'part2',
            },
          },
        },
      })
      expect(v.toObject()).toMatchObject({
        address: {
          address1: 'address1',
          address2: {
            part1: 'part1',
            part2: 'part2',
          },
        },
      })

      v.address.address2.part1.$value = '1'

      expect(v.toObject()).toMatchObject({
        address: {
          address1: 'address1',
          address2: {
            part1: '1',
            part2: 'part2',
          },
        },
      })

      expect(v.address.toObject()).toMatchObject({
        address1: 'address1',
        address2: {
          part1: '1',
          part2: 'part2',
        },
      })

      expect(v.address.address1.toObject()).toBe(v.address.address1.$value)

      expect(v.address.address2.toObject()).toMatchObject({
        part1: '1',
        part2: 'part2',
      })
    })

    it('should not keep keys starting with \'$\'', () => {
      const v = useValidation({
        $test: 'ddd',
        age: {
          $value: 20,
        },
      }).toObject()

      expect(v.$test).toBe(undefined)
      expect(v).toStrictEqual({
        age: 20,
      })
    })
  })

  describe('render', () => {
    it('should show error', async () => {
      const required = (x: any) => !!x
      const form = useValidation({
        firstName: {
          $value: ref(''),
          required,
          otherRequired: {
            $validator: required,
            $message: ref('password is required'),
          },
        },
      })

      const { mount } = createVue({
        template: `
        <div>
          <input name="firstName" v-model="form.firstName.$value" placeholder="firstName" />

          <p id="form-anyInvalid" v-if="form.$anyInvalid">Invalid</p>
          <p id="form-dirty-anyError" v-if="form.$anyDirty && form.$anyInvalid">Dirty & Invalid</p>
          <p id="firstname-error-required" v-if="form.firstName.$dirty && form.firstName.required.$invalid">
            Invalid
          </p>
          <p id="firstname-error" v-if="form.firstName.$dirty && form.firstName.otherRequired.$invalid">
            {{ form.firstName.otherRequired.$message }}
          </p>
        </div>
        `,
        setup() {
          return {
            form,
          }
        },
      })

      const vm = mount()
      await nextTick()

      const input = document.getElementsByName('firstName')[0]

      const anyInvalid = () => document.getElementById('form-anyInvalid')
      const dirtyInvalid = () => document.getElementById('form-dirty-anyError')
      const nameRequired = () =>
        document.getElementById('firstname-error-required')
      const otherRequired = () => document.getElementById('firstname-error')

      vm.$el

      expect(anyInvalid()).not.toBeNull()
      expect(dirtyInvalid()).toBeNull()
      expect(nameRequired()).toBeNull()
      expect(otherRequired()).toBeNull()

      expect((input as any).value).toBe(form.firstName.$value);

      (input as any).value = 'hello world'
      input.dispatchEvent(new InputEvent('input'))
      await nextTick()

      expect(form.firstName.$value).toBe('hello world')

      expect(dirtyInvalid()).toBeNull()
      expect(nameRequired()).toBeNull()
      expect(otherRequired()).toBeNull()
      expect(anyInvalid()).toBeNull();

      (input as any).value = ''
      input.dispatchEvent(new InputEvent('input'))
      await nextTick()

      expect(dirtyInvalid()).not.toBeNull()
      expect(nameRequired()).not.toBeNull()
      expect(otherRequired()).not.toBeNull()
      expect(anyInvalid()).not.toBeNull()

      expect(otherRequired()!.textContent!.trim()).toBe(
        form.firstName.otherRequired.$message,
      )
    })
  })

  describe('touch/reset', () => {
    it('should run validation', () => {
      const required = (x: any) => !!x
      const v = useValidation({
        test: {
          $value: '',
          required,
        },
        deep: {
          v1: {
            $value: '',
            required,
          },
          v2: {
            $value: '',
            required,
          },
        },
      })

      expect(v.$anyDirty).toBe(false)

      expect(v.test.$dirty).toBe(false)
      expect(v.test.$anyInvalid).toBe(true)
      v.test.$touch()
      expect(v.test.$dirty).toBe(true)
      v.test.$reset()
      expect(v.test.$dirty).toBe(false)

      expect(v.deep.v1.$dirty).toBe(false)
      expect(v.deep.v2.$dirty).toBe(false)
      v.deep.$touch()
      expect(v.deep.v1.$dirty).toBe(true)
      expect(v.deep.v2.$dirty).toBe(true)
      v.deep.$reset()
      expect(v.deep.v1.$dirty).toBe(false)
      expect(v.deep.v2.$dirty).toBe(false)

      v.$touch()
      expect(v.$anyDirty).toBe(true)
      expect(v.test.$dirty).toBe(true)
      expect(v.deep.v1.$dirty).toBe(true)
      expect(v.deep.v2.$dirty).toBe(true)
      v.$reset()
      expect(v.test.$dirty).toBe(false)
      expect(v.deep.v1.$dirty).toBe(false)
      expect(v.deep.v2.$dirty).toBe(false)
      expect(v.$anyDirty).toBe(false)
    })

    it('should update $dirty after $reset on update value', async () => {
      const required = (x: any) => !!x

      const $testValue = ref('')
      const $deepV1Value = ref('')
      const $deepV2Value = ref('')

      const v = useValidation({
        test: {
          $value: $testValue,
          required,
        },
        deep: {
          v1: {
            $value: $deepV1Value,
            required,
          },
          v2: {
            $value: $deepV2Value,
            required,
          },
        },
      })

      expect(v.$anyDirty).toBe(false)

      expect(v.test.$dirty).toBe(false)
      expect(v.test.$anyInvalid).toBe(true)
      $testValue.value += 'test'

      await nextTick()

      expect(v.test.$dirty).toBe(true)
      v.test.$reset()
      expect(v.test.$dirty).toBe(false)

      expect(v.deep.v1.$dirty).toBe(false)
      expect(v.deep.v2.$dirty).toBe(false)
      $deepV1Value.value += 'test'
      $deepV2Value.value += 'test'

      await nextTick()

      expect(v.deep.v1.$dirty).toBe(true)
      expect(v.deep.v2.$dirty).toBe(true)
      v.deep.$reset()
      expect(v.deep.v1.$dirty).toBe(false)
      expect(v.deep.v2.$dirty).toBe(false)
    })
  })
})
