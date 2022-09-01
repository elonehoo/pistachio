import type { DevtoolsPluginApi, Hooks } from '@vue/devtools-api/lib/esm'
import { promisedTimeout } from '../utils'

interface OnEvent { type: Hooks; args: any[] }
interface ApiEvent { type: keyof DevtoolsPluginApi<unknown>; args: any[] }

let apiProxyFactory: (
  promiseApi: Promise<DevtoolsPluginApi<unknown>>
) => DevtoolsPluginApi<unknown> = undefined as any

async function pushEventsToApi(
  api: DevtoolsPluginApi<unknown>,
  EventQueue: OnEvent[],
  ApiQueue: ApiEvent[],
) {
  setTimeout(async () => {
    const priority: (keyof DevtoolsPluginApi<unknown>)[] = [
      'addTimelineLayer',
      'addInspector',
      'sendInspectorTree',
      'sendInspectorState',
      'addTimelineEvent',
    ]

    for (const k of priority) {
      for (const it of ApiQueue.filter(x => x.type === k)) {
        // @ts-expect-error
        api[k](...it.args)
      }
      await promisedTimeout(20)
    }

    new Set(
      ApiQueue.filter(x => x.type === 'notifyComponentUpdate').map(
        x => x.args[0],
      ),
    ).forEach(x => api.notifyComponentUpdate(x))

    // @ts-expect-error
    EventQueue.forEach(x => api.on[x.type](...x.args))

    EventQueue.length = 0
    ApiQueue.length = 0
  }, 100)
}
apiProxyFactory = (promiseApi) => {
  let api: DevtoolsPluginApi<unknown>
  const EventQueue: OnEvent[] = []
  const ApiQueue: ApiEvent[] = []
  const onProxy = new Proxy(
    {},
    {
      get: (target, prop: Hooks) => {
        if (api) {
          // @ts-expect-error
          return api.on[prop]
        }
        else if (prop in target) {
          // @ts-expect-error
          return target[prop]
        }
        else {
          // @ts-expect-error
          return (target[prop] = (...args) => {
            EventQueue.push({
              type: prop,
              args,
            })
          })
        }
      },
    },
  )
  const proxy = new Proxy(
    {
      on: onProxy,
    },
    {
      get: (target, prop: keyof DevtoolsPluginApi<unknown>) => {
        if (prop === 'on')
          return target.on

        if (api)
          return api[prop]

        if (prop in target) {
          // @ts-expect-error
          return target[prop]
        }
        // @ts-expect-error
        return (target[prop] = (...args) => {
          ApiQueue.push({
            type: prop,
            args,
          })
        })
      },
    },
  )
  promiseApi.then((x) => {
    api = x
    pushEventsToApi(api, EventQueue, ApiQueue)
  })
  return proxy as any
}

export default apiProxyFactory

