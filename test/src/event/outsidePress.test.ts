import { useOutsidePress } from '@elonehoo/vue-hooks'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { createVue } from '../utils'

describe('onOutsidePress', () => {
  const addEventListenerMock = vi.fn()
  let addEventListener: any
  beforeAll(() => {
    addEventListener = document.addEventListener
    document.addEventListener = addEventListenerMock
  })

  beforeEach(() => {
    addEventListenerMock.mockClear()
  })

  afterAll(() => {
    document.addEventListener = addEventListener
  })

  it.skip('should work mousedown', () => {
    const element = document.createElement('div')
    let handler: (a: any) => void = {} as any

    addEventListenerMock.mockImplementation((_, h) => {
      handler = h
    })

    const callback = vi.fn()
    const { mount } = createVue({
      template: '<div></div>',
      setup() {
        useOutsidePress(element, callback)
      },
    })
    mount()

    expect(callback).not.toHaveBeenCalled()

    expect(addEventListenerMock).toHaveBeenLastCalledWith(
      'mousedown',
      expect.any(Function),
      { passive: true },
    )

    // inside
    handler({
      target: element,
    })
    expect(callback).not.toHaveBeenCalled()

    // outside
    handler({
      target: document.createElement('div'),
    })
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
