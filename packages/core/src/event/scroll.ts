import type { Ref } from 'vue'
import { isRef, ref, watch } from 'vue'
import type { RefElement, RefTyped } from '../utils'
import { PASSIVE_EV, isBoolean, isClient, isElement, isNumber, wrap } from '../utils'
import { useDebounce } from '../debounce'
import type { RemoveEventFunction } from './mouse'
import { useMouse } from './mouse'

const SCROLL_METHODS = ['scrollBy', 'scrollTo', 'scrollIntoView']
interface ScrollMethods {
  scrollBy: Element['scrollBy']
  scrollTo: Element['scrollTo']
  scrollIntoView: Element['scrollIntoView']
}

export interface ScrollResult {
  scrollTop: Ref<number>
  scrollLeft: Ref<number>
  remove: RemoveEventFunction

  scrollTopTo: (y: number) => void
  scrollLeftTo: (x: number) => void

  scrollTo: Element['scrollTo']
  scrollBy: Element['scrollBy']
  scrollIntoView: Element['scrollIntoView']
}

export function useScroll(): ScrollResult
export function useScroll(wait: number): ScrollResult
export function useScroll(
  options: boolean | AddEventListenerOptions,
  wait?: number
): ScrollResult
export function useScroll(el: RefTyped<Window>, wait: number): ScrollResult
export function useScroll(
  el: RefTyped<Window>,
  options?: boolean | AddEventListenerOptions,
  wait?: number
): ScrollResult
export function useScroll(el: RefElement, wait: number): ScrollResult
export function useScroll(
  el: RefElement,
  options?: boolean | AddEventListenerOptions,
  wait?: number
): ScrollResult

export function useScroll<T extends Element>(
  el: Ref<T> | Ref<T | null>,
  options?: boolean | AddEventListenerOptions,
  wait?: number
): ScrollResult

export function useScroll<T extends Element>(
  el: Ref<T | null>,
  wait: number
): ScrollResult

export function useScroll(
  el?: any,
  options?: number | boolean | AddEventListenerOptions,
  wait?: number,
): ScrollResult {
  const isValidElement = (el: any) =>
    !(isNumber(el) || isBoolean(el) || !(isElement(el) || isRef(el)) || !el)

  const element = isValidElement(el)
    ? wrap(el)
    : ref((isClient && window) || undefined)
  const scrollableElement = isValidElement(el)
    ? element
    : ref((isClient && window.document.scrollingElement) || undefined)

  const scrollTop = ref(
    (scrollableElement.value && scrollableElement.value.scrollTop) || 0,
  )
  const scrollLeft = ref(
    (scrollableElement.value && scrollableElement.value.scrollLeft) || 0,
  )

  let handler = () => {
    scrollTop.value = scrollableElement.value!.scrollTop
    scrollLeft.value = scrollableElement.value!.scrollLeft
  }

  const methods = SCROLL_METHODS.reduce((p, c) => {
    // @ts-expect-error
    p[c] = (...args: any) =>
      // @ts-expect-error
      scrollableElement.value
      // @ts-expect-error
      && scrollableElement.value[c]
      // @ts-expect-error
      && scrollableElement.value[c].apply(scrollableElement.value, args)
    return p
  }, {}) as ScrollMethods

  const scrollTopTo = (top: number) => methods.scrollTo({ top })
  const scrollLeftTo = (left: number) => methods.scrollTo({ left })

  const [eventOptions, ms]
    = isNumber(el) || !el
      ? [PASSIVE_EV, el as number]
      : isNumber(options)
        ? [PASSIVE_EV, options]
        : [options, wait]

  if (ms)
    handler = useDebounce(handler, wait)

  const eventRemove = useMouse(element, 'scroll', handler, eventOptions)
  const watchRemoveTop = watch(scrollTop, scrollTopTo, { immediate: false })
  const watchRemoveLeft = watch(scrollLeft, scrollLeftTo, { immediate: false })
  const remove = () => {
    eventRemove()
    watchRemoveLeft()
    watchRemoveTop()
  }

  return {
    scrollTop,
    scrollLeft,

    remove,
    scrollTopTo,
    scrollLeftTo,

    ...methods,
  }
}
