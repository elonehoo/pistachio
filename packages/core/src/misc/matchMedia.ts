import type { Ref } from 'vue'
import { onUnmounted, ref } from 'vue'
import { NO_OP, PASSIVE_EV, isClient } from '../utils'

export function useMatchMedia(query: string) {
  const supported = isClient ? 'matchMedia' in window : false

  let mediaQueryList: Ref<MediaQueryList> = undefined as any
  let matches: Ref<boolean> = undefined as any

  const remove = NO_OP

  if (supported) {
    mediaQueryList = ref<MediaQueryList>(matchMedia(query))
    matches = ref(mediaQueryList.value.matches)

    const process = (e: MediaQueryListEvent) => {
      matches.value = e.matches
    }

    mediaQueryList.value.addEventListener('change', process, PASSIVE_EV)

    const remove = () =>
      mediaQueryList.value.removeEventListener('change', process)

    onUnmounted(remove)
  }
  else {
    /* istanbul ignore else */
    console.warn('[matchMedia] not supported')
    mediaQueryList = ref<MediaQueryList>({} as MediaQueryList)
    matches = ref(false)
  }

  return {
    supported,

    mediaQueryList,
    matches,

    remove,
  }
}
