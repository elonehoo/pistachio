import type { App } from 'vue'
import type { DevtoolsPluginApi } from '@vue/devtools-api'
import { NO_OP } from '../utils'
import ProxyApi from './proxy'
import { setDevtools } from './api'

const setupDevtoolsPlugin: Function = NO_OP

export const UseDevtoolsApp = (
  app: App,
  id = 'pistachio',
  label = 'pistachio devtools plugin',
) => {
  const promise = new Promise<DevtoolsPluginApi<unknown>>((res) => {
    setupDevtoolsPlugin(
      {
        id,
        label,
        app,
      },
      res,
    )
  })

  setDevtools(app, ProxyApi(promise))
}
