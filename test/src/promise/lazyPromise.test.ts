import { beforeEach, describe, expect, it, vi } from 'vitest'

import { usePromise, usePromiseLazy } from '@elonehoo/pistachio'

vi.mock('usePromise', () => {
  return {
    default: { default: vi.fn() },
    usePromise: vi.fn(),
  }
})

describe.skip('lazyPromise', () => {
  it('should usePromise with lazy: true', () => {
    const factory = () => {}
    usePromiseLazy(factory)

    expect(usePromise).toHaveBeenCalledWith(
      factory,
      expect.objectContaining({
        lazy: true,
        throwException: false,
      }),
    )
  })

  it('should usePromise with throwException: true', () => {
    const factory = () => {}
    usePromiseLazy(factory, true)

    expect(usePromise).toHaveBeenCalledWith(
      factory,
      expect.objectContaining({
        lazy: true,
        throwException: true,
      }),
    )
  })
})
