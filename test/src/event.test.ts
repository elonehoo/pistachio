import { describe, expect, it, vi } from 'vitest'
import { useEvent } from '@elonehoo/vue-hooks'
import { createVue } from './utils'

describe('event', () => {
  it('should add event listener', () => {
    const element: Element = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as any
    const mockHandler = vi.fn()
    const options = {}

    const { mount, destroy } = createVue({
      template: '<div></div>',
      setup() {
        useEvent(element, 'load', mockHandler, options)
      },
    })
    expect(element.addEventListener).not.toHaveBeenCalled()
    expect(element.removeEventListener).not.toHaveBeenCalled()

    mount()

    expect(element.addEventListener).toHaveBeenCalledWith(
      'load',
      mockHandler,
      options,
    )

    expect(element.addEventListener).toHaveBeenCalledTimes(1)
    expect(element.removeEventListener).not.toHaveBeenCalled()

    destroy()

    expect(element.removeEventListener).toHaveBeenCalledWith(
      'load',
      mockHandler,
    )
  })
})
