import type { ComputedRef, Ref } from 'vue'
import { computed } from 'vue'
import type { RemoveEventFunction } from '../event'
import { useMouseMove } from '../event'
import type { RefTyped } from '../utils'
import { NO_OP, isClient, unwrap } from '../utils'

export interface MouseDistanceReturn {
  distance: ComputedRef<number>
  remove: RemoveEventFunction
}

export function useMouseInElement(
  el: RefTyped<HTMLElement>,
  wait: number
): MouseDistanceReturn

export function useMouseInElement<T extends HTMLElement>(
  el: Ref<T> | Ref<T | null>,
  options?: boolean | AddEventListenerOptions,
  wait?: number
): MouseDistanceReturn

export function useMouseInElement<T extends HTMLElement>(
  el: Ref<T | null>,
  wait: number
): MouseDistanceReturn

export function useMouseInElement(
  el: RefTyped<HTMLElement>,
  options?: boolean | AddEventListenerOptions,
  wait?: number
): MouseDistanceReturn

export function useMouseInElement(
  el: any,
  options?: number | boolean | AddEventListenerOptions,
  wait?: number,
): MouseDistanceReturn {
  let distance: ComputedRef<number> | undefined
  let remove: RemoveEventFunction = NO_OP

  if (isClient) {
    // @ts-expect-error
    const { pageX, pageY, remove: removeMouseEvent } = useMouseMove(
      window,
      options,
      wait,
    )

    distance = computed(() => {
      const elem = unwrap(el)
      if (!elem)
        return 0

      return Math.floor(
        Math.sqrt(
          Math.pow(pageX.value - (elem.offsetLeft + elem.clientWidth / 2), 2)
            + Math.pow(pageY.value - (elem.offsetTop + elem.clientHeight / 2), 2),
        ),
      )
    })

    remove = removeMouseEvent
  }
  else {
    distance = computed(() => -1)
  }

  return {
    distance,

    remove,
  }
}
