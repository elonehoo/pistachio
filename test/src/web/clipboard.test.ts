import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import type { UseClipboard } from '@elonehoo/pistachio'
import { useClipboard } from '@elonehoo/pistachio'
import { createVue } from '../utils'

describe('clipboard tets', () => {
  it('not supported on node vitest', () => {
    // TODO write mocks

    // @ts-expect-error
    let clipboard: UseClipboard

    createVue({
      setup() {
        clipboard = useClipboard()
      },
    }).mount()
    expect(clipboard.supported).toBe(false)
  })
})
