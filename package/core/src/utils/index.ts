import { ref, isRef,Ref} from 'vue'

export type RefTyped<T> = T | Ref<T>
export type RefElement = Element | Ref<Element | undefined>
export type WrapRef<T> = T extends Ref<any> ? T : Ref<T>

export function unwrap<T>(value: RefTyped<T>): T
export function unwrap<T>(value: RefTyped<T>): T {
  return isRef(value) ? value.value : value;
}

export function wrap(o: RefElement): Ref<Element>
export function wrap<T>(o: RefTyped<T>): Ref<T>
export function wrap(o: any): any {
  return isRef(o) ? o : ref(o)
}

export const isArray = Array.isArray
