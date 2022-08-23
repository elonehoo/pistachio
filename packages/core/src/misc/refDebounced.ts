import type { Ref } from 'vue'
import { customRef, ref } from 'vue'
import { debounce } from '../debounce'
import type { RefTyped } from '../utils'
import { isNumber } from '../utils'

export function useRefDebounced<T>(value: RefTyped<T>, delay: number): Ref<T>
export function useRefDebounced<T>(delay: number): Ref<T | undefined>
export function useRefDebounced<T>(value: T | number, delay?: number): Ref<T> {
  const [v, d]
    = arguments.length === 1 && isNumber(value) && typeof delay === 'undefined'
      ? [ref(), value]
      : [ref(value), delay]
  return customRef<T>((track, trigger) => ({
    get() {
      track()
      return v.value as any
    },
    set: debounce((val) => {
      v.value = val
      trigger()
    }, d),
  }))
}
