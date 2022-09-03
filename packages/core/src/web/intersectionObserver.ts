import type { Ref } from 'vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import type { RefElement, RefTyped } from '../utils'
import { NO_OP, isClient, isElement, unwrap, wrap } from '../utils'

export interface IntersectionObserverOptions {
  root?: RefTyped<Element> | null
  rootMargin?: RefTyped<string> | string
  threshold?: RefTyped<number | number[]> | number | number[]
}

export interface IntersectionObserverResult {
  supported: boolean

  elements: Ref<IntersectionObserverEntry[]>

  observe: (el: RefTyped<Element>) => void
  unobserve: (el: RefTyped<Element>) => void
  disconnect: () => void
  readonly isIntersecting: Ref<boolean>
}

export function useIntersectionObserver(
  el: RefElement,
  options?: RefTyped<IntersectionObserverOptions>
): IntersectionObserverResult
export function useIntersectionObserver(
  options: RefTyped<IntersectionObserverOptions>
): IntersectionObserverResult
export function useIntersectionObserver(
  refEl?: any,
  refOptions?: RefTyped<IntersectionObserverOptions>,
): IntersectionObserverResult {
  const supported = isClient && 'IntersectionObserver' in window
  const wrappedElement = refEl ? wrap(refEl) : undefined
  const element
    = wrappedElement && (isElement(wrappedElement.value) || !wrappedElement.value)
      ? (wrappedElement as Ref<Element>)
      : undefined

  const options = computed(() =>
    refOptions
      ? unwrap(refOptions)
      : !element
          ? unwrap(refEl as RefTyped<IntersectionObserverOptions>)
          : undefined,
  )

  const elements = ref([]) as Ref<IntersectionObserverEntry[]>

  const isIntersecting = computed(
    () =>
      elements.value.length > 0 && elements.value.every(x => x.isIntersecting),
  )

  const handling = (entries: IntersectionObserverEntry[]) => {
    elements.value = entries
  }

  const observer = ref<IntersectionObserver>()

  if (supported) {
    watch(
      options,
      (options) => {
        if (observer.value)
          observer.value.disconnect()

        const opts: IntersectionObserverInit | undefined
          = (options
            && options && {
            root: unwrap(options.root),
            rootMargin: unwrap(options.rootMargin),
            threshold: unwrap(options.threshold),
          })
          || undefined
        observer.value = new IntersectionObserver(handling, opts)

        const targets = elements.value.map(x => x.target)
        targets.forEach(observer.value.observe)
      },
      { deep: true, immediate: true },
    )
  }

  const observe = supported
    ? (element: RefTyped<Element>) => {
        const e = unwrap(element)
        observer.value!.observe(e)
      }
    : NO_OP
  const unobserve = supported
    ? (element: RefTyped<Element>) => {
        const e = unwrap(element)
        observer.value!.unobserve(e)
      }
    : NO_OP

  const disconnect = () => observer.value!.disconnect()

  // if the element is passed we should add hooks
  if (element) {
    // if value is defined it is already being observed
    onMounted(() => {
      if (element.value)
        observe(element)
    })
    // }

    onUnmounted(() => {
      disconnect()
    })
  }

  return {
    supported,

    elements,
    observe,
    unobserve,
    disconnect,

    isIntersecting,
  }
}

