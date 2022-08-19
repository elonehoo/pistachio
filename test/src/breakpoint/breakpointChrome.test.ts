import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { useBreakpoint, useBreakpointChrome } from '@elonehoo/vue-hooks'

describe.skip('breakpointChrome', () => {
  it('should call breakpoint with chrome breakpoints', () => {
    const expected = {
      a: 1,
    }

    expect(useBreakpointChrome()).toBe(expected)

    expect(useBreakpoint).toHaveBeenCalledWith({
      mobileS: 320,
      mobileM: 375,
      mobileL: 425,
      tablet: 768,
      laptop: 1024,
      laptopL: 1440,
      desktop4K: 2560,
    })
  })
})
