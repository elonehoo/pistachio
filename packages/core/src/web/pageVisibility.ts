import type { Ref } from 'vue'
import { ref } from 'vue'
import { PASSIVE_EV, isClient } from '../utils'

let visibility: Ref<DocumentVisibilityState> | undefined
let hidden: Ref<boolean> | undefined

export function usePageVisibility() {
  if (!hidden)
    hidden = ref(isClient && document.hidden)

  if (!visibility) {
    if (isClient) {
      visibility = ref(document.visibilityState)
      document.addEventListener(
        'visibilitychange',
        () => {
          visibility!.value = document.visibilityState
          hidden!.value = document.hidden
        },
        PASSIVE_EV,
      )
    }
    else {
      visibility = ref<DocumentVisibilityState>('visible')
    }
  }
  return {
    visibility,
    hidden,
  }
}
