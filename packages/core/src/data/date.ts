import {useNow,NowOptions,NowReturn} from './now'
import { isBoolean } from '../utils'

export function useDate(options?: NowOptions): NowReturn {
  const refreshMs = (options && options.refreshMs) || 1000;
  const sync = options && isBoolean(options.sync) ? options.sync : true;

  return useNow({
    refreshMs,
    sync,
    timeFn: Date.now
  });
}
