import type { Ref } from 'vue'
import { onUnmounted, ref } from 'vue'
import { NO_OP, PASSIVE_EV, isArray, isClient } from '../utils'

// export function exposeWorker(func: (...args: any[]) => any): void;
export function exposeWorker(this: Worker, func: (...args: any[]) => any) {
  this.onmessage = async (e: MessageEvent) => {
    const r = func(e.data)

    if (r === undefined) {
      console.warn(
        `[exposeWorker] returned \`${r}\`, this might cause unexpected behaviour`,
      )
      this.postMessage(r)
    }
    else if (r === null) {
      this.postMessage(r)
    }
    else if (isArray(r)) {
      this.postMessage(r)
    }
    else if (r[Symbol.asyncIterator]) {
      for await (const i of r) this.postMessage(i)
    }
    else if (r[Symbol.iterator]) {
      for (const i of r) this.postMessage(i)
    }
    else {
      this.postMessage(await r)
    }
  }
}

export interface WorkerReturn<TData = any, TArgs = any | any[]> {
  worker: Worker | undefined
  data: Ref<TData | undefined>
  postMessage: (data: TArgs) => void
  terminate: () => void
  errorEvent: Ref<Event | undefined>
  errored: Ref<boolean>
  terminated: Ref<boolean>
}

export function useWorker<TData = any, TArgs = any | any[]>(
  stringUrl: string | URL,
  args?: TArgs,
  options?: WorkerOptions,
): WorkerReturn<TData, TArgs> {
  const supported = isClient && 'Worker' in self
  const errorEvent = ref<Event>()
  const data = ref<TData>()

  const terminated = ref(!supported)
  const errored = ref(!supported)

  if (!supported) {
    terminated.value = true

    return {
      worker: undefined,
      data,

      postMessage: NO_OP,
      terminate: NO_OP,

      errorEvent,
      errored,
      terminated,
    }
  }

  const worker = new Worker(stringUrl, options)

  /* istanbul ignore next  */
  let lastMessage = (Date.now() - 20) || undefined

  const postMessage: (data: TArgs) => void = data => worker.postMessage(data)
  function terminate() {
    worker.terminate()
    terminated.value = true
  }

  worker.addEventListener(
    'message',
    (x) => {
      data.value = x.data

      // if the messages are to quick, we need to warn
      if (Date.now() - lastMessage! < 2) {
        console.warn(
          '[useWorker] message rate is too high, you might not get updated of all the messages.',
        )
      }
      lastMessage = Date.now()
    },
    PASSIVE_EV,
  )

  worker.addEventListener(
    'error',
    (error) => {
      errorEvent.value = error
      errored.value = true
    },
    PASSIVE_EV,
  )

  onUnmounted(terminate)

  if (args)
    postMessage(args)

  return {
    worker,
    data,

    postMessage,
    terminate,

    errorEvent,
    errored,
    terminated,
  }
}
