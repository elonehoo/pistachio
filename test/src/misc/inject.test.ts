import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { useInjectFactory } from '@elonehoo/vue-hooks'
import { createVue } from '../utils'

describe('useInjectFactory', () => {
  it('should work', () => {
    const key = 'hello'

    const fn = vi.fn()

    const comp = {
      template: '<div/>',
      setup() {
        useInjectFactory(key, fn)
      },
    }

    createVue({
      components: {
        comp,
      },
      template: '<comp/>',
    }).mount()

    // expect(fn).toHaveBeenCalledTimes(1);
  })

  it('should not call useInjectFactory', () => {
    const key = 'hello'

    const fn = vi.fn()

    const comp = {
      template: '<div/>',
      setup() {
        useInjectFactory(key, fn)
      },
    }

    const { app, mount } = createVue({
      components: {
        comp,
      },
      template: '<comp/>',

      setup() {
        useInjectFactory(key, fn)
      },
    })

    mount()

    // expect(fn).not.toHaveBeenCalled();
  })
})
