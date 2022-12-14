import type { IWindow } from 'happy-dom'
import { describe, expect, it, vi } from 'vitest'
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { MouseMoveResult } from '@elonehoo/pistachio'
import { promisedTimeout, useMouseMove } from '@elonehoo/pistachio'
import { createVue, nextTick } from '../utils'

declare global {
  interface Window extends IWindow {}
}

describe('mouse move', () => {
  it('should add the correct event', () => {
    const element: Element = {
      addEventListener: vi.fn().mockImplementation((name, listener) => {
        expect(name).toBe('mousemove')
        handler = listener
      }),
      removeEventListener: vi.fn(),
    } as any
    let handler: ((ev: Partial<MouseEvent>) => void) | undefined
    let use: MouseMoveResult | undefined

    createVue({
      template: '<div></div>',
      setup() {
        use = useMouseMove(element)
      },
    }).mount()

    expect(element.addEventListener).toHaveBeenCalled()

    expect(use).toMatchObject({
      mouseX: { value: 0 },
      mouseY: { value: 0 },
      pageX: { value: 0 },
      pageY: { value: 0 },
    })

    handler!({
      x: 50,
      y: 50,
      pageX: 30,
      pageY: 40,
    })

    expect(use).toMatchObject({
      mouseX: { value: 50 },
      mouseY: { value: 50 },
      pageX: { value: 30 },
      pageY: { value: 40 },
    })
  })

  it('should removeEventListener if `remove` is called', () => {
    const element: Element = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as any
    let use: MouseMoveResult | undefined

    createVue({
      template: '<div></div>',
      setup() {
        use = useMouseMove(element)
      },
    }).mount()
    expect(element.removeEventListener).not.toHaveBeenCalled()

    use!.remove()

    expect(element.removeEventListener).toHaveBeenCalled()
  })

  it('should debounce if wait is passed', async () => {
    const element: Element = {
      addEventListener: vi.fn().mockImplementation((name, listener) => {
        expect(name).toBe('mousemove')
        handler = listener
      }),
      removeEventListener: vi.fn(),
    } as any
    let use: MouseMoveResult | undefined
    let handler: ((ev: Partial<MouseEvent>) => void) | undefined
    const wait = 50

    createVue({
      template: '<div></div>',
      setup() {
        use = useMouseMove(element, wait)
      },
    }).mount()
    expect(element.addEventListener).toHaveBeenCalled()

    for (let i = 0; i < 10; i++) {
      handler!({
        x: 10 + i,
        y: 10 + i,
      })
    }

    await nextTick()

    // still waiting to set the values
    expect(use).toMatchObject({
      mouseX: { value: 0 },
      mouseY: { value: 0 },
    })

    await promisedTimeout(wait)
    expect(use).toMatchObject({
      mouseX: { value: 19 },
      mouseY: { value: 19 },
    })
  })

  it('should pass options to the event listener', () => {
    const element: Ref<Element> = ref({
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }) as any
    const options = {
      passive: true,
    }

    createVue({
      template: '<div></div>',
      setup() {
        return useMouseMove(element, options)
      },
    }).mount()
    expect(element.value.addEventListener).toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function),
      options,
    )
  })

  it('should pass options to the event listener and be debounced', async () => {
    const element: Element = {
      addEventListener: vi.fn().mockImplementation((name, listener) => {
        expect(name).toBe('mousemove')
        handler = listener
      }),
      removeEventListener: vi.fn(),
    } as any
    let use: MouseMoveResult | undefined
    let handler: ((ev: Partial<MouseEvent>) => void) | undefined
    const wait = 50
    const options = {
      passive: true,
    }

    createVue({
      template: '<div></div>',
      setup() {
        use = useMouseMove(element, options, wait)
      },
    }).mount()
    expect(element.addEventListener).toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function),
      options,
    )

    for (let i = 0; i < 10; i++) {
      handler!({
        x: 10 + i,
        y: 10 + i,
      })
    }

    await nextTick()

    // still waiting to set the values
    expect(use).toMatchObject({
      mouseX: { value: 0 },
      mouseY: { value: 0 },
    })

    await promisedTimeout(wait)
    expect(use).toMatchObject({
      mouseX: { value: 19 },
      mouseY: { value: 19 },
    })
  })
})
