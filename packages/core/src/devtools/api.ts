import type { DevtoolsPluginApi } from '@vue/devtools-api'
import type { App, InjectionKey } from 'vue'
import { inject } from 'vue'
import { isFunction } from '../utils'

// istanbul ignore next
const DEVTOOLS_KEY: InjectionKey<DevtoolsPluginApi<unknown>> = Symbol(('DEVTOOLS_KEY') || '')

/**
 * provide devtools api instance to the app
 * @param app
 * @param api
 */
export function setDevtools(app: App, api: DevtoolsPluginApi<unknown>) {
  if (!isFunction(app.provide)) {
    console.warn('[@elonehoo/pistachio] devtools is not supported for vue 2')
    return
  }
  app.provide(DEVTOOLS_KEY, api)
}

/**
 * Exposes the internal devtools api instance
 */
export function getDevtools(): DevtoolsPluginApi<unknown> | undefined {
  const empty = {}
  const devtools = inject(DEVTOOLS_KEY, empty) as DevtoolsPluginApi<unknown>
  if (devtools === empty) {
    console.warn(
      '[@elonehoo/pistachio] devtools not found, please run app.use(PistachioDevtools)',
    )
    return undefined
  }
  return devtools!
}
