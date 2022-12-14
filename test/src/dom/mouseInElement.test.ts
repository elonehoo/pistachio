import type { Ref } from 'vue'
import { ref } from 'vue'
import { useMouseInElement, useMouseMove } from '@elonehoo/pistachio'
import type { Mock } from 'vitest'
import { beforeEach, describe, expect, it, test, vi } from 'vitest'
import { nextTick } from '../utils'

vi.mock('../event/mouseMove.ts')

describe.skip('useMouseInElement', () => {
  const useMouseMoveMock: Mock<typeof useMouseMove> = useMouseMove as any

  const pageXMock = ref(100)
  const pageYMock = ref(0)
  const removeMock = vi.fn()

  const mockElement = ref({
    offsetLeft: 100,
    offsetTop: 100,
    clientHeight: 10,
    clientWidth: 10,
  })

  const element = (mockElement as unknown) as Ref<HTMLElement>

  beforeEach(() => {
    useMouseMoveMock.mockClear()
    useMouseMoveMock.mockReturnValue({
      pageX: pageXMock,
      pageY: pageYMock,
      remove: removeMock,
    } as any)

    mockElement.value = {
      offsetLeft: 100,
      offsetTop: 100,
      clientHeight: 10,
      clientWidth: 10,
    }
  })

  it('should use useMouseEvent', () => {
    const options = { test: 1 } as any
    const wait = 10
    useMouseInElement(element, options, wait)

    expect(useMouseMoveMock).toHaveBeenCalledWith(window, options, wait)
  })
  it('should calculate the distance', () => {
    const { distance } = useMouseInElement(element)

    expect(distance.value).toBe(105)
  })

  it('should return 0 if the element is null', () => {
    expect(useMouseInElement(ref(null)).distance.value).toBe(0)
    expect(useMouseInElement(null as any).distance.value).toBe(0)
  })

  it('should remove the event', () => {
    const { remove } = useMouseInElement(element)

    expect(removeMock).not.toHaveBeenCalled()
    remove()
    expect(removeMock).toHaveBeenCalled()
  })

  describe('distance change', () => {
    beforeEach(() => {
      useMouseMoveMock.mockClear()
      useMouseMoveMock.mockReturnValue({
        pageX: pageXMock,
        pageY: pageYMock,
        remove: removeMock,
      } as any)

      mockElement.value = {
        offsetLeft: 100,
        offsetTop: 100,
        clientHeight: 10,
        clientWidth: 10,
      }
    })

    test('mouseX', async () => {
      mockElement.value.offsetTop = 0
      pageYMock.value = 5
      pageXMock.value = 0

      const { distance } = useMouseInElement(element)

      expect(distance.value).toBe(105)

      pageXMock.value += 5

      await nextTick()
      expect(distance.value).toBe(100)
    })

    test('mouseY', async () => {
      mockElement.value.offsetLeft = 0
      pageYMock.value = 0
      pageXMock.value = 5

      const { distance } = useMouseInElement(element)

      expect(distance.value).toBe(105)

      pageYMock.value += 5

      await nextTick()
      expect(distance.value).toBe(100)
    })

    test('element position', async () => {
      mockElement.value.offsetLeft = 0
      pageYMock.value = 0
      pageXMock.value = 5

      const { distance } = useMouseInElement(element)

      expect(distance.value).toBe(105)

      mockElement.value.offsetTop -= 5

      await nextTick()
      expect(distance.value).toBe(100)
    })

    test('element', async () => {
      mockElement.value.offsetLeft = 0
      pageYMock.value = 0
      pageXMock.value = 5

      const { distance } = useMouseInElement(element)

      expect(distance.value).toBe(105)

      mockElement.value = {
        ...mockElement.value,
        offsetTop: mockElement.value.offsetTop - 5,
      }

      await nextTick()
      expect(distance.value).toBe(100)
    })
  })
})
