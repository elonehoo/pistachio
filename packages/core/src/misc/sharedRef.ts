import type { ComputedRef, Ref } from 'vue'
import { computed, getCurrentInstance, onUnmounted, ref, watch } from 'vue'
import type { RefTyped } from '../utils'
import { PASSIVE_EV, isClient, isObject } from '../utils'
import type { BroadcastMessageEvent } from '../web'
import { useBroadcastChannel } from '../web'

export const enum RefSharedMessageType {
  INIT,
  SYNC,
  UPDATE,

  // changes the master to
  SET_MIND,

  LEAVE,

  PING,
  PONG,
}

export const enum SharedRefMind {
  // everyone can update
  HIVE,

  // only master can update
  MASTER,
}

export interface RefSharedMessageInit { type: RefSharedMessageType.INIT }
export interface RefSharedMessageSync<T> {
  type: RefSharedMessageType.SYNC
  value: T
  mind: SharedRefMind
}
export interface RefSharedMessageUpdate<T> {
  type: RefSharedMessageType.UPDATE
  value: T
  mind: SharedRefMind
}
export interface RefSharedMessageSetMind {
  type: RefSharedMessageType.SET_MIND
  mind: SharedRefMind
  id: number
}
export interface RefSharedMessagePing {
  type: RefSharedMessageType.PING
  id: number
}
export interface RefSharedMessagePong {
  type: RefSharedMessageType.PONG
  id: number
}

export interface RefSharedMessageLeave {
  type: RefSharedMessageType.LEAVE
  id: number
}

export type RefSharedMessage<T = any> =
  | RefSharedMessageInit
  | RefSharedMessageSync<T>
  | RefSharedMessageLeave
  | RefSharedMessageUpdate<T>
  | RefSharedMessageSetMind
  | RefSharedMessagePing
  | RefSharedMessagePong

export interface SharedRefReturn<T = any> {
  supported: boolean
  id: number
  data: Ref<T>
  master: Ref<false> | Ref<true>
  mind: Ref<SharedRefMind.HIVE> | Ref<SharedRefMind.MASTER>
  editable: ComputedRef<boolean>
  targets: Ref<number[]>
  ping: () => void
  setMind: (t: SharedRefMind) => void
  addListener: (
    cb: (ev: BroadcastMessageEvent<RefSharedMessage<T>>) => void,
    options?: boolean | AddEventListenerOptions | undefined
  ) => void
}

export function useSharedRef<T = any>(
  name: string,
  defaultValue?: T,
): SharedRefReturn<T> {
  const { addListener, send, close, supported } = useBroadcastChannel<
    RefSharedMessage<T>
  >(name, () => disconnect())

  const id = Date.now()
  const master = ref(false)
  const mind = ref(SharedRefMind.HIVE)
  const editable = computed(() =>
    mind.value === SharedRefMind.MASTER ? master.value : true,
  )

  // who's listening to this broadcast
  const targets = ref<number[]>([])
  const data: Ref<T> = ref(defaultValue!) as any

  // if the state was updated by an event it sets to true
  let updateState = false
  let masterId: number | undefined

  send({ type: RefSharedMessageType.INIT })

  const ping = () => send({ type: RefSharedMessageType.PING, id })

  const disconnect = () => {
    if (targets.value.length === 0)
      return
    if (master.value) {
      send({
        type: RefSharedMessageType.SET_MIND,
        mind: SharedRefMind.MASTER,
        id: Math.min(...targets.value),
      })
    }
    send({
      type: RefSharedMessageType.LEAVE,
      id,
    })
  }

  const setMind = (t: SharedRefMind) => {
    switch (t) {
      case SharedRefMind.MASTER: {
        master.value = true
        break
      }
      case SharedRefMind.HIVE: {
        master.value = false
        break
      }
    }
    mind.value = t
    send({
      type: RefSharedMessageType.SET_MIND,
      id,
      mind: mind.value,
    })
  }

  addListener((e) => {
    switch (e.data.type) {
      case RefSharedMessageType.INIT: {
        send({
          type: RefSharedMessageType.UPDATE,
          value: data.value as T,
          mind: mind.value,
        })
        break
      }
      case RefSharedMessageType.LEAVE: {
        const index = targets.value.indexOf(e.data.id)
        if (index >= 0)
          targets.value.splice(index, 1)

        // if master disconnects
        if (masterId === e.data.id && targets.value.length > 0) {
          send({
            type: RefSharedMessageType.SET_MIND,
            mind: SharedRefMind.MASTER,
            id: Math.min(id, ...targets.value),
          })
        }
        break
      }
      case RefSharedMessageType.UPDATE: {
        updateState = true
        data.value = e.data.value
        mind.value = e.data.mind
        break
      }
      case RefSharedMessageType.SET_MIND: {
        mind.value = e.data.mind
        masterId
          = (e.data.mind === SharedRefMind.MASTER && e.data.id) || undefined
        master.value = masterId === id
        if (master.value) {
          targets.value = []
          ping()
        }
        break
      }
      case RefSharedMessageType.PING: {
        targets.value = [e.data.id]
        send({
          type: RefSharedMessageType.PONG,
          id,
        })
        break
      }
      case RefSharedMessageType.PONG: {
        targets.value.push(e.data.id)
        break
      }
    }
  }, PASSIVE_EV)

  ping()

  watch(
    data,
    (v, o) => {
      if (updateState) {
        updateState = false
        return
      }
      // mind is set to MASTER and we are not master, we shouldn't update!
      if (mind.value === SharedRefMind.MASTER && master.value === false) {
        updateState = true
        data.value = o
        return
      }

      send({
        type: RefSharedMessageType.UPDATE,
        mind: mind.value,
        value: isObject(v) ? { ...v } : v,
      })
      updateState = false
    },
    { deep: true, immediate: false },
  )

  if (isClient)
    window.addEventListener('unload', disconnect, PASSIVE_EV)

  onUnmounted(() => {
    disconnect()
    close()
  })

  return {
    supported,
    id,

    data,

    master,
    mind,
    editable,

    targets,

    ping,
    setMind,

    addListener: addListener as (
      cb: (ev: BroadcastMessageEvent<RefSharedMessage<T>>) => void,
      options?: boolean | AddEventListenerOptions
    ) => void,
  }
}

let shared: Set<string> | undefined

export function useRefShared<T = any>(
  defaultValue?: RefTyped<T>,
  id?: string,
): Ref<RefTyped<T>> {
  const vm = getCurrentInstance()!
  const name = id || (vm as any).vnode.scopeId

  if (!name) {
    console.warn('[useRefShared] please assign an id, returning `ref`')
    return ref(defaultValue) as Ref<T>
  }

  /* istanbul ignore else  */
  if (!shared)
    shared = new Set()

  if (shared.has(name)) {
    console.warn(
      '[useRefShared] You can only have one refShared per component, if you need more please assign pass an id refShared(defaultValue, id)',
    )
  }
  shared.add(name)

  const { data, supported } = useSharedRef(name, defaultValue)

  /* istanbul ignore next  */
  if (!supported)
    console.warn('[useRefShared] is dependent of BroadcastChannel')

  return data
}

