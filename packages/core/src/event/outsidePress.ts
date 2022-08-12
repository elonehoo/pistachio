import {Ref} from 'vue'
import {RemoveEventFunction,useMouse} from './mouse'
import { RefTyped, RefElement, wrap, isClient } from '../utils'


const events: Array<keyof DocumentEventMap> = ["mousedown", "touchstart"];

export function useOutsidePress(
  el: RefTyped<Window>,
  onOutsidePressCallback: (ev: MouseEvent) => void
): RemoveEventFunction;

export function useOutsidePress(
  el: RefElement,
  onOutsidePressCallback: (ev: MouseEvent) => void
): RemoveEventFunction;

export function useOutsidePress<T extends Element>(
  el: Ref<T> | Ref<T | null>,
  onOutsidePressCallback: (ev: MouseEvent) => void
): RemoveEventFunction;

export function useOutsidePress<T extends Element>(
  el: Ref<T | null>,
  onOutsidePressCallback: (ev: MouseEvent) => void
): RemoveEventFunction;

export function useOutsidePress(
  el: RefElement,
  onOutsidePressCallback: (ev: MouseEvent) => void
): RemoveEventFunction;
export function useOutsidePress(
  el: any,
  onOutsidePressCallback: (ev: MouseEvent) => void
): RemoveEventFunction {
  if (!isClient) {
    return () => {};
  }
  const element: Ref<Element | null> = wrap(el);
  const handler = (e: MouseEvent) =>
    element.value &&
    !element.value.contains(e.target as Node) &&
    onOutsidePressCallback(e);

  const event = events.find(x => `on${x}` in document.documentElement)!;
  return useMouse(document, event, handler, { passive: true });
}
