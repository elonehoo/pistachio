import type { Ref } from 'vue'
import { isRef, ref } from 'vue'

export type RefTyped<T> = T | Ref<T>
export type RefElement = Element | Ref<Element | undefined>
export type WrapRef<T> = T extends Ref<any> ? T : Ref<T>

export function unwrap<T>(value: RefTyped<T>): T
export function unwrap<T>(value: RefTyped<T>): T {
  return isRef(value) ? value.value : value
}

export function wrap(o: RefElement): Ref<Element>
export function wrap<T>(o: RefTyped<T>): Ref<T>
export function wrap(o: any): any {
  return isRef(o) ? o : ref(o)
}

export const isArray = Array.isArray
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isBoolean = (val: unknown): val is Boolean => typeof val === 'boolean'
export const isElement = (val: unknown): val is Element => isObject(val) && !!val.tagName
export const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isFunction = (val: unknown): val is Function => typeof val === 'function'
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}
export const isDate = (val: unknown): val is Date => isObject(val) && isFunction(val.getTime)

export const NO_OP = () => {}
export const FALSE_OP = () => false
export const MAX_ARRAY_SIZE = 2 ** 32 - 2

export const PASSIVE_EV: AddEventListenerOptions = { passive: true }

export const isClient = typeof window != 'undefined'

export function promisedTimeout(timeout: number): Promise<void> {
  return new Promise((res) => {
    setTimeout(res, timeout)
  })
}

export function minMax(val: number, min: number, max: number) {
  if (val < min)
    return min
  if (val > max)
    return max
  return val
}
