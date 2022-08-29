import { describe, expect, it } from 'vitest'
import { useStorage } from '@elonehoo/pistachio'

describe('storage', () => {
  it('should get localStorage if supported', () => {
    const { storage } = useStorage('')

    expect(storage).not.toBeNull()
  })
})
