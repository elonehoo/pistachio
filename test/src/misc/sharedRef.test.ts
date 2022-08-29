import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import type { BroadcastMessageEvent, RefSharedMessage } from '@elonehoo/pistachio'
import { RefSharedMessageType, SharedRefMind, useRefShared, useSharedRef } from '@elonehoo/pistachio'
import { getCurrentInstance } from 'vue'
import { createVue, nextTick } from '../utils'

describe('sharedRef', () => {
  const _broadcastChannel = window.BroadcastChannel
  const addEventListenerFn = vi.fn()
  const removeEventListenerFn = vi.fn()
  const postMessageFn = vi.fn()
  const closeFn = vi.fn()
  const constructorFn = vi.fn()
  beforeAll(() => {
    class BroadcastChannel {
      constructor(...args: any[]) {
        constructorFn(...args)
      }

      addEventListener = addEventListenerFn
      postMessage = postMessageFn
      close = closeFn
      removeEventListener = removeEventListenerFn
    }
    Object.defineProperty(window, 'BroadcastChannel', {
      writable: true,
      configurable: true,
      value: BroadcastChannel,
    })
    Object.defineProperty(global, 'BroadcastChannel', {
      writable: true,
      configurable: true,
      value: BroadcastChannel,
    })
  })

  afterAll(() => {
    Object.defineProperty(window, 'BroadcastChannel', {
      writable: true,
      configurable: true,
      value: _broadcastChannel,
    })
    Object.defineProperty(global, 'BroadcastChannel', {
      writable: true,
      configurable: true,
      value: _broadcastChannel,
    })
  })

  beforeEach(() => {
    addEventListenerFn.mockReset()
    postMessageFn.mockReset()
    constructorFn.mockReset()
    closeFn.mockReset()
    removeEventListenerFn.mockReset()
  })

  it('should create sharedRef', () => {
    const { mount, destroy } = createVue({
      template: '<div ref=\'el\'></div>',
      setup() {
        const { data, targets } = useSharedRef('test')

        expect(constructorFn).toHaveBeenCalledTimes(1)

        expect(data.value).toBeUndefined()
        expect(targets.value).toHaveLength(0)

        expect(postMessageFn).toBeCalledWith(
          expect.objectContaining({
            type: 5,
          } as RefSharedMessage<any>),
        )
        expect(addEventListenerFn).toHaveBeenCalledTimes(3)
        expect(closeFn).not.toHaveBeenCalled()
        return {}
      },
    })
    mount()
    expect(closeFn).not.toHaveBeenCalled()

    destroy()
    expect(closeFn).toHaveBeenCalled()
  })

  it('should create using default value and allow update', () => {
    const { mount } = createVue({
      template: '<div ref=\'el\'></div>',
      setup() {
        const v = {
          data: 1,
        }
        const { data, editable } = useSharedRef('test', v)

        expect(data.value).toMatchObject(v)
        expect(editable.value).toBe(true)

        data.value = {
          data: 12,
        }
        expect(data.value.data).toBe(12)

        return {}
      },
    })
    mount()
  })

  it('should update to specific mind', () => {
    const { mount, destroy } = createVue({
      template: '<div ref=\'el\'></div>',
      setup() {
        const { mind, setMind, master, editable, targets } = useSharedRef(
          'test',
        )

        expect(mind.value).toBe(0)
        expect(master.value).toBe(false)
        expect(editable.value).toBe(true)

        setMind(1)

        expect(mind.value).toBe(1)
        expect(master.value).toBe(true)
        expect(editable.value).toBe(true)

        expect(postMessageFn).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 3,
            mind: 1,
          } as RefSharedMessage<any>),
        )

        setMind(0)

        expect(mind.value).toBe(0)
        expect(master.value).toBe(false)
        expect(editable.value).toBe(true)

        expect(postMessageFn).toHaveBeenLastCalledWith(
          expect.objectContaining({
            type: 3,
            mind: 0,
          } as RefSharedMessage<any>),
        )

        targets.value.push(1, 2, 3, 0)

        return {}
      },
    })
    mount()

    destroy()

    expect(postMessageFn).lastCalledWith(
      expect.objectContaining({
        type: 4,
      } as RefSharedMessage),
    )
  })

  it('should send update events', (done) => {
    const { mount } = createVue({
      template: '<div ref=\'el\'></div>',
      setup() {
        const { /* mind, setMind, master, */ data } = useSharedRef('test', {
          v: 1,
        })

        const listenerFn
          = addEventListenerFn.mock.calls[
            addEventListenerFn.mock.calls.length - 1
          ][1]

        expect(listenerFn).toBeDefined()
        expect(data.value).toBeDefined()
        expect(postMessageFn).toHaveBeenCalledTimes(2)

        data.value.v++

        nextTick().then(async (x) => {
          // expect(postMessageFn).toHaveBeenCalledTimes(2);
          expect(postMessageFn).lastCalledWith(
            expect.objectContaining({
              type: 2,
              value: data.value,
            } as RefSharedMessage),
          )

          const n = {
            x: 1234,
            v: 1234,
          }

          data.value = n

          await nextTick()

          expect(postMessageFn).lastCalledWith(
            expect.objectContaining({
              type: 2,
              value: n,
            } as RefSharedMessage),
          )

          data.value = 1 as any

          await nextTick()

          expect(postMessageFn).lastCalledWith(
            expect.objectContaining({
              type: 2,
              value: 1,
            } as RefSharedMessage),
          )
        })
        return {}
      },
    })
    mount()
  })

  it('should reply to events', () => {
    const { mount, destroy } = createVue({
      template: '<div ref=\'el\'></div>',
      setup() {
        const v = { v: 1 }
        const { mind, /* setMind, master, */ data, targets, id } = useSharedRef(
          'test',
          v,
        )

        const listenerFn: (e: BroadcastMessageEvent<RefSharedMessage>) => void
          = addEventListenerFn.mock.calls[
            addEventListenerFn.mock.calls.length - 1
          ][1]

        /* INIT */
        // If init is received it should reply with UPDATE
        listenerFn({
          data: {
            type: 0,
          } as RefSharedMessage,
        } as any)

        expect(postMessageFn).lastCalledWith(
          expect.objectContaining({
            type: 2,
            value: data.value,
            mind: mind.value,
          } as RefSharedMessage),
        )
        /* /INIT */

        /* LEAVE */
        // if LEAVE is received we should remove the id from the targets

        targets.value = [1, -1, 111]
        listenerFn({
          data: {
            type: 4,
            id: 111,
          } as RefSharedMessage,
        } as any)

        expect(targets.value).toMatchObject([1, -1])

        // set to master the smallest id and then call the leave again
        listenerFn({
          data: {
            type: 3,
            mind: 1,
            id,
          } as RefSharedMessage,
        } as any)

        expect(mind.value).toBe(1)

        targets.value = [1, -1]

        listenerFn({
          data: {
            type: 4,
            id,
          } as RefSharedMessage,
        } as any)

        expect(postMessageFn).lastCalledWith(
          expect.objectContaining({
            type: 3,
            mind: 1,
            id: -1,
          } as RefSharedMessage),
        )

        listenerFn({
          data: {
            type: 3,
            mind: 0,
            id,
          } as RefSharedMessage,
        } as any)
        expect(mind.value).toBe(0)

        targets.value = []

        /* /LEAVE */

        /* UPDATE */
        // if UPDATE received we should update data and mind

        listenerFn({
          data: {
            type: 2,
            mind: 1,
            value: 1,
          } as RefSharedMessage,
        } as any)

        expect(data.value).toBe(1)
        expect(mind.value).toBe(1)

        // restore
        listenerFn({
          data: {
            type: 3,
            mind: 0,
            id,
          } as RefSharedMessage,
        } as any)

        /* UPDATE */

        /* PING */
        // if PING received it should send pong event

        targets.value = [1, 2]

        listenerFn({
          data: {
            type: 5,
            id,
          } as RefSharedMessage,
        } as any)

        // targets are reset and the id is assigned
        expect(targets.value).toStrictEqual([id])

        expect(postMessageFn).lastCalledWith(
          expect.objectContaining({
            type: 6,
            id,
          } as RefSharedMessage),
        )

        targets.value = []
        /* PING */

        /* PONG */
        // if PONG received it should append to targets
        targets.value = [1]

        listenerFn({
          data: {
            type: 6,
            id,
          } as RefSharedMessage,
        } as any)

        expect(targets.value).toStrictEqual([1, id])

        /* PONG */

        // set values for disconnect

        listenerFn({
          data: {
            type: 3,
            mind: 1,
            id,
          } as RefSharedMessage,
        } as any)

        targets.value.push(1, 2, 34, 5, 0)

        return {}
      },
    })
    mount()

    /* ON DISCONNECT */
    destroy()

    expect(postMessageFn).toHaveBeenNthCalledWith(
      postMessageFn.mock.calls.length - 1,
      expect.objectContaining({
        type: 3,
        mind: 1,
        id: 0,
      } as RefSharedMessage),
    )

    expect(postMessageFn).lastCalledWith(
      expect.objectContaining({
        type: 4,
      } as RefSharedMessage),
    )

    expect(closeFn).toHaveBeenCalled()
    /* /ON DISCONNECT */
  })

  it('should reply multiple broadcasts', (done) => {
    const { mount } = createVue({
      template: '<div ref=\'el\'></div>',
      setup() {
        const all = [
          useSharedRef('test'),
          useSharedRef('test'),
          useSharedRef('test'),
        ]
        const [b1, b2, b3] = all

        expect(all.map(x => x.master.value)).toStrictEqual([
          false,
          false,
          false,
        ])

        b1.setMind(1)
        b3.mind.value = b2.mind.value = 1

        nextTick().then(async () => {
          expect(all.map(x => x.master.value)).toStrictEqual([
            true,
            false,
            false,
          ])

          expect(all.map(x => x.mind.value)).toStrictEqual([
            1,
            1,
            1,
          ])

          expect(all.map(x => x.editable.value)).toStrictEqual([
            true,
            false,
            false,
          ])

          b2.data.value = 12
          b3.data.value = 22

          await nextTick()
          expect(b2.data.value).toBe(b1.data.value)
          expect(b3.data.value).toBe(b1.data.value)

          all.forEach(x => x.setMind(0))
          await nextTick()

          b2.data.value = 12
          b3.data.value = 22

          expect(b2.data.value).not.toBe(b1.data.value)
          expect(b3.data.value).not.toBe(b1.data.value)
        })

        return {}
      },
    })
    mount()
  })

  describe('helper ref', () => {
    // vi.spyOn(compositionApi, 'getCurrentInstance').mockImplementation(() => 'vue-test-vm');
    it('should create a broadcastChannel', async () => {
      // var el: any = undefined;
      const { mount, destroy } = createVue({
        template: '<div ></div>',
        setup(props: any, ctx: any) {
          const vm = getCurrentInstance()!;

          // istanbul ignore if
          (vm as any).vnode.scopeId = 'vue-test-vm'
          const r = useRefShared()
          expect(r.value).toBeUndefined()

          expect(constructorFn).toHaveBeenCalled()

          return {}
        },
      })

      mount()
      expect(closeFn).not.toHaveBeenCalled()

      destroy()
      await nextTick()
      expect(closeFn).toHaveBeenCalled()
    })

    it('should set the defaultValue and id ', () => {
      const { mount, destroy } = createVue({
        template: '<div ref=\'el\'></div>',
        setup() {
          const r = useRefShared(11, '11')
          expect(r.value).toBe(11)

          expect(constructorFn).toHaveBeenCalled()

          return {}
        },
      })
      mount()
      expect(closeFn).not.toHaveBeenCalled()

      destroy()
      expect(closeFn).toHaveBeenCalled()
    })

    it('should warn if used multiple times in the same component', () => {
      const warnSpy = vi.spyOn(console, 'warn')

      createVue({
        template: '<div ref=\'el\'></div>',
        setup(_: any, ctx: any) {
          const vm = getCurrentInstance()! as any;
          // istanbul ignore if
          (vm as any).vnode.scopeId = 'vue-test-vm'

          const r = useRefShared()
          const r2 = useRefShared()

          expect(warnSpy).toHaveBeenCalledWith(
            '[useRefShared] You can only have one useRefShared per component, if you need more please assign pass an id useRefShared(defaultValue, id)',
          )

          return { r, r2 }
        },
      })
    })
  })
})
