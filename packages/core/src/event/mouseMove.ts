import type { Ref } from 'vue'
import { ref } from 'vue'
import type { RefElement, RefTyped } from '../utils'
import { isNumber } from '../utils'
import { useDebounce } from '../debounce'
import type { RemoveEventFunction } from './mouse'
import { useMouse } from './mouse'

export interface MouseMoveResult {
  mouseX: Ref<number>
  mouseY: Ref<number>
  pageX: Ref<number>
  pageY: Ref<number>
  remove: RemoveEventFunction
}

export function useMouseMove(
  el: RefTyped<Window>,
  wait: number
): MouseMoveResult
export function useMouseMove(
  el: RefTyped<Window>,
  options?: boolean | AddEventListenerOptions,
  wait?: number
): MouseMoveResult
export function useMouseMove(el: RefElement, wait: number): MouseMoveResult

export function useMouseMove<T extends Element>(
  el: Ref<T> | Ref<T | null>,
  options?: boolean | AddEventListenerOptions,
  wait?: number
): MouseMoveResult

export function useMouseMove<T extends Element>(
  el: Ref<T | null>,
  wait: number
): MouseMoveResult

export function useMouseMove(
  el: RefElement,
  options?: boolean | AddEventListenerOptions,
  wait?: number
): MouseMoveResult
export function useMouseMove(
  el: any,
  options?: number | boolean | AddEventListenerOptions,
  wait?: number,
): MouseMoveResult {
  const mouseX = ref(0)
  const mouseY = ref(0)
  const pageX = ref(0)
  const pageY = ref(0)

  let handler = (ev: MouseEvent) => {
    mouseX.value = ev.x
    mouseY.value = ev.y
    pageX.value = ev.pageX
    pageY.value = ev.pageY
  }

  const [eventOptions, ms] = isNumber(options)
    ? [undefined, options]
    : [options, wait]

  if (ms)
    handler = useDebounce(handler, wait)

  const remove = useMouse(el, 'mousemove', handler, eventOptions)

  return {
    mouseX,
    mouseY,
    pageX,
    pageY,

    remove,
  }
}

