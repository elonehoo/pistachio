import { isBoolean } from '../utils'
import type { NowOptions, NowReturn } from './now'
import { useNow } from './now'

export function usePerformance(options?: NowOptions): NowReturn {
  const refreshMs = (options && options.refreshMs) || 1000
  const sync = options && isBoolean(options.sync) ? options.sync : true

  return useNow({
    refreshMs,
    sync,
    timeFn: () => performance.now(),
  })
}
