import type { UseCssVariables } from '@elonehoo/pistachio'
import { getCssVariableFor, setCssVariableFor, useCssVariables } from '@elonehoo/pistachio'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { createVue, nextTick } from '../utils'

/**
 * @vitest-environment happy-dom
 */

describe('CSS variables', () => {
  let callback: () => void
  const _mutationObserver = window.MutationObserver
  const observeFn = vi.fn().mockImplementation(() => {
    callback()
  })
  const disconnectFn = vi.fn()
  const constructorFn = vi.fn()

  beforeAll(() => {
    class MutationObserver {
      constructor(...args: any[]) {
        constructorFn(...args)
        callback = args[0]
      }

      observe = observeFn
      disconnect = disconnectFn
    }
    Object.defineProperty(window, 'MutationObserver', {
      writable: true,
      configurable: true,
      value: MutationObserver,
    })
    Object.defineProperty(global, 'MutationObserver', {
      writable: true,
      configurable: true,
      value: MutationObserver,
    })
  })

  afterAll(() => {
    Object.defineProperty(window, 'MutationObserver', {
      writable: true,
      configurable: true,
      value: _mutationObserver,
    })
    Object.defineProperty(global, 'MutationObserver', {
      writable: true,
      configurable: true,
      value: _mutationObserver,
    })
  })

  beforeEach(() => {
    observeFn.mockClear()
    constructorFn.mockReset()
    disconnectFn.mockReset()
  })

  it('should retrieve the correct value for a defined CSS variable', async () => {
    const element = document.createElement('div')
    element.style.setProperty('--variable-name', '#fff')

    const definedVariable = getCssVariableFor(element, '--variable-name')
    expect(definedVariable).toBe(null)

    const undefinedVariable = getCssVariableFor(
      element,
      '--undefined-variable',
    )
    expect(undefinedVariable).toBeNull()
  })

  it('should retrieve the correct value for an undefined CSS variable', async () => {
    const element = document.createElement('div')
    const undefinedVariable = getCssVariableFor(
      element,
      '--undefined-variable',
    )
    expect(undefinedVariable).toBeNull()
  })

  it('should set the value of a CSS variable on an element', async () => {
    const element = document.createElement('div')

    setCssVariableFor(element, '--variable-name', '#fff')

    expect(element.style.getPropertyValue('--variable-name')).toBe('#fff')
  })

  it('should know if the observer is no longer listening', async () => {
    let variables: UseCssVariables<{}> = {} as any

    createVue({
      template: '<div></div>',
      setup() {
        variables = useCssVariables({}) as any
      },
    }).mount()

    const { observing, stop, resume } = variables

    expect(observing).toMatchObject({
      value: true,
    })

    stop()

    expect(observing).toMatchObject({
      value: false,
    })

    resume()

    expect(observing).toMatchObject({
      value: true,
    })
  })

  it('should automatically start the observer and stops it on destroy', async () => {
    const vm = createVue({
      template: '<div></div>',
      setup() {
        useCssVariables({
          test: '--variable-name',
        })
      },
    })

    vm.mount()

    expect(observeFn).toHaveBeenCalledTimes(1)
    expect(disconnectFn).toHaveBeenCalledTimes(0)

    vm.destroy()

    expect(observeFn).toHaveBeenCalledTimes(1)
    expect(disconnectFn).toHaveBeenCalledTimes(1)
  })

  it('should update properties thanks to the observer', async () => {
    const element = document.createElement('div')
    let variables: UseCssVariables<{ test: string }> = {} as any

    createVue({
      template: '<div></div>',
      setup() {
        variables = useCssVariables(
          {
            test: 'variable-name',
          },
          element,
        )
      },
    }).mount()

    callback = () => {
      variables.test.value = getCssVariableFor(element, '--variable-name')
    }

    expect(variables.test.value).toBeNull()

    // Simulate an observation
    setCssVariableFor(element, '--variable-name', 'red')
    callback()

    expect(variables.test.value).toBe(null)
  })

  it('remembers bound element', async () => {
    const element = document.createElement('div')
    element.style.setProperty('--dummy-name', 'red')
    setCssVariableFor(element, '--dummy-name', 'red')
    let variables: UseCssVariables<{ dummyName: string }> = {} as any

    createVue({
      template: '<div></div>',
      setup() {
        variables = useCssVariables({ dummyName: 'dummy-name' }, element)
      },
    }).mount()

    const { dummyName } = variables

    expect(dummyName.value).toBe(null)

    // `set` should be bound to element
    dummyName.value = 'blue'
    await nextTick()

    // We check directly from the element to be sure
    expect(element.style.getPropertyValue('--dummy-name')).toBe('blue')
  })
})
