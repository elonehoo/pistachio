import type { ResizeResult } from '@elonehoo/pistachio'
import { promisedTimeout, useResize } from '@elonehoo/pistachio'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { createVue, nextTick } from '../utils'

describe('resize', () => {
  const windowEventSpy = vi.fn()
  const windowEvent = window.addEventListener
  const windowRemoveEvent = window.removeEventListener

  beforeAll(() => {
    window.addEventListener = windowEventSpy
  })
  afterAll(() => {
    window.addEventListener = windowEvent
    window.removeEventListener = windowRemoveEvent
  })

  it('should add the correct event', async () => {
    const element: Element = {
      removeEventListener: vi.fn(),
      clientHeight: 0,
      clientWidth: 0,
    } as any

    windowEventSpy.mockImplementation((name, listener) => {
      expect(name).toBe('resize')
      handler = listener
    })

    let handler: ((ev: Partial<MouseEvent>) => void) | undefined
    let use: ResizeResult | undefined

    createVue({
      template: '<div></div>',
      setup() {
        use = useResize(element)
      },
    }).mount()

    expect(window.addEventListener).toHaveBeenCalled()

    expect(use).toMatchObject({
      height: { value: 0 },
      width: { value: 0 },
    });

    (element as any).clientHeight = 50;
    (element as any).clientWidth = 50

    handler!({})
    await nextTick()

    expect(use).toMatchObject({
      height: { value: 50 },
      width: { value: 50 },
    })
  })

  it('should removeEventListener if `remove` is called', () => {
    const element: Element = {
      addEventListener: vi.fn(),
      clientHeight: 0,
      clientWidth: 0,
    } as any
    let use: ResizeResult | undefined
    window.removeEventListener = vi.fn()

    createVue({
      template: '<div></div>',
      setup() {
        use = useResize(element)
      },
    }).mount()
    expect(window.removeEventListener).not.toHaveBeenCalled()

    use!.remove()

    expect(window.removeEventListener).toHaveBeenCalled()
  })

  it('should debounce if wait is passed', async () => {
    const element: Element = {
      removeEventListener: vi.fn(),
      clientHeight: 0,
      clientWidth: 0,
    } as any
    windowEventSpy.mockImplementation((name, listener) => {
      expect(name).toBe('resize')
      handler = listener
    })
    let use: ResizeResult | undefined
    let handler: ((ev: Partial<MouseEvent>) => void) | undefined
    const wait = 50

    createVue({
      template: '<div></div>',
      setup() {
        use = useResize(element, wait)
      },
    }).mount()
    expect(window.addEventListener).toHaveBeenCalled()

    for (let i = 0; i < 10; i++) {
      (element as any).clientHeight = 10 + i;
      (element as any).clientWidth = 10 + i

      handler!({})
    }

    await nextTick()

    // still waiting to set the values
    expect(use).toMatchObject({
      height: { value: 0 },
      width: { value: 0 },
    })

    await promisedTimeout(wait)
    expect(use).toMatchObject({
      height: { value: 19 },
      width: { value: 19 },
    })
  })

  it('should pass options to the event listener', () => {
    const element: Element = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      clientHeight: 0,
      clientWidth: 0,
    } as any
    const options = {
      passive: true,
    }

    createVue({
      template: '<div></div>',
      setup() {
        return useResize(element, options)
      },
    }).mount()
    expect(window.addEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
      options,
    )
  })

  it('should pass options to the event listener and be debounced', async () => {
    const element: Element = {
      removeEventListener: vi.fn(),
      clientHeight: 0,
      clientWidth: 0,
    } as any
    windowEventSpy.mockImplementation((name, listener) => {
      expect(name).toBe('resize')
      handler = listener
    })
    let use: ResizeResult | undefined
    let handler: ((ev: Partial<MouseEvent>) => void) | undefined
    const wait = 50
    const options = {
      passive: true,
    }

    createVue({
      template: '<div></div>',
      setup() {
        use = useResize(element, options, wait)
      },
    }).mount()
    expect(window.addEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
      options,
    )

    for (let i = 0; i < 10; i++) {
      (element as any).clientHeight = 10 + i;
      (element as any).clientWidth = 10 + i

      handler!({})
    }

    await nextTick()

    expect(use).toMatchObject({
      height: { value: 0 },
      width: { value: 0 },
    })

    await promisedTimeout(wait)
    expect(use).toMatchObject({
      height: { value: 19 },
      width: { value: 19 },
    })
  })

  it('should set value on mount', () => {
    let resize: any

    const { mount } = createVue({
      template: '<div ref="el"></div>',
      setup() {
        const el = ref<HTMLElement | null>(null)
        resize = useResize(el)

        return {
          el,
        }
      },
    })

    mount()

    expect(resize).toMatchObject({
      height: {
        value: 0,
      },
      width: {
        value: 0,
      },
    })
  })
})
