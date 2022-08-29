import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
import type { UseIntervalReturn, UseIntervalReturnArgs, UseIntervalReturnMs } from '@elonehoo/pistachio'
import { useInterval } from '@elonehoo/pistachio'
import { createVue } from '../utils'

describe.skip('interval', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterAll(() => {
    vi.useRealTimers()
  })
  it('should work', async () => {
    const callback = vi.fn()
    const ms = 100

    let interval: UseIntervalReturn & UseIntervalReturnMs = {} as any
    const { mount, destroy } = createVue({
      template: '<div></div>',
      setup() {
        interval = useInterval(callback, ms)
      },
    })

    mount()

    expect(clearInterval).not.toHaveBeenCalled()
    expect(setInterval).toHaveBeenCalledWith(callback, ms)

    interval.start()
    expect(clearInterval).toHaveBeenCalled()
    expect(setInterval).toHaveBeenNthCalledWith(2, callback, ms)

    interval.remove()

    expect(clearInterval).toHaveBeenCalledTimes(2)

    interval.start()

    destroy()

    expect(clearInterval).toHaveBeenCalledTimes(3)
  })

  it('should remove at unmount', () => {
    const callback = vi.fn()
    const ms = 100

    const { mount, destroy } = createVue({
      template: '<div></div>',
      setup() {
        useInterval(callback, ms)
      },
    })

    mount()

    expect(clearInterval).not.toHaveBeenCalled()
    expect(setInterval).toHaveBeenCalledWith(callback, ms)

    destroy()

    expect(clearInterval).toHaveBeenCalled()
  })

  it('should not start if ms are not passed', () => {
    const callback = vi.fn()
    const ms = 100

    let interval: UseIntervalReturn = {} as any
    const { mount, destroy } = createVue({
      template: '<div></div>',
      setup() {
        interval = useInterval(callback)
      },
    })

    mount()

    expect(clearInterval).not.toHaveBeenCalled()
    expect(setInterval).not.toHaveBeenCalled()

    interval.start(ms)
    expect(setInterval).toHaveBeenCalledWith(callback, ms)

    destroy()
  })

  it('should override ms on start()', () => {
    const callback = vi.fn()
    const ms = 100

    let interval: UseIntervalReturn & UseIntervalReturnMs = {} as any
    const { mount, destroy } = createVue({
      template: '<div></div>',
      setup() {
        interval = useInterval(callback, ms)
      },
    })

    mount()

    expect(clearInterval).not.toHaveBeenCalled()
    expect(setInterval).toHaveBeenCalled()

    interval.start(20)
    expect(setInterval).toHaveBeenLastCalledWith(callback, 20)

    destroy()
  })

  it('should override args on start()', () => {
    const callback = vi.fn((x: number) => x)
    const ms = 100

    let interval: UseIntervalReturn &
    UseIntervalReturnArgs<[number]> = {} as any
    const { mount, destroy } = createVue({
      template: '<div></div>',
      setup() {
        interval = useInterval(callback, ms, 1)
      },
    })

    mount()

    expect(clearInterval).not.toHaveBeenCalled()
    expect(setInterval).toHaveBeenLastCalledWith(callback, ms, 1)

    interval.start(undefined, 2)
    expect(setInterval).toHaveBeenLastCalledWith(callback, ms, 2)

    destroy()
  })

  it('should not start if no ms passed', () => {
    const callback = vi.fn((x: number) => x)
    let interval: UseIntervalReturnMs = {} as any
    const { mount, destroy } = createVue({
      template: '<div></div>',
      setup() {
        // @ts-expect-error
        interval = useInterval(callback)
      },
    })

    mount()

    expect(clearInterval).not.toHaveBeenCalled()
    interval.start()
    expect(setInterval).not.toHaveBeenCalled()

    destroy()
  })
})
