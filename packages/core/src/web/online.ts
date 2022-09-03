import type { Ref } from 'vue'
import { ref } from 'vue'
import { PASSIVE_EV, isClient } from '../utils'

let online: Ref<boolean> | undefined
export function useOnline() {
  const supported = isClient && 'onLine' in navigator

  // not sure how to test this :/
  if (!supported)
    online = ref(false)

  if (!online) {
    online = ref(navigator.onLine)
    window.addEventListener(
      'offline',
      () => (online!.value = false),
      PASSIVE_EV,
    )
    window.addEventListener('online', () => (online!.value = true), PASSIVE_EV)
  }

  return {
    supported,
    online,
  }
}
