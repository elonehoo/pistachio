import type { Ref } from 'vue'
import { onUnmounted, ref } from 'vue'

interface UseTimeoutReturn {
  /**
   * current timeout state:
   *     false - pending
   *     true - called
   *     null - canceled
   */
  ready: Ref<boolean | null>
  /**
   * cancel the timeout
   */
  cancel: () => void
}
/**
 * @param fn setTimeout callback
 * @param delay If this parameter is omitted, a value of 0 is used
 * (https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)
 */
export function useTimeout(
  fn: () => void,
  delay = 0,
): UseTimeoutReturn {
  const ready: Ref<boolean | null> = ref(false)

  const timeoutId = setTimeout(() => {
    ready.value = true
    fn()
  }, delay)

  const cancel = () => {
    ready.value = null
    clearTimeout(timeoutId)
  }

  onUnmounted(cancel)

  return {
    ready,
    cancel,
  }
}
