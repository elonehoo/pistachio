import { ref, isRef,Ref} from 'vue'

export type RefTyped<T> = T | Ref<T>


