import { unwrap, useFormat } from '@elonehoo/pistachio'
import { ref } from 'vue'
import { describe, expect, it } from 'vitest'
import { nextTick } from '../utils'

describe('format', () => {
  it('should format', () => {
    const r = useFormat('my name is {name}', { name: 'elone' })
    expect(r.value).toBe('my name is elone')
  })

  it('should format with multiple', () => {
    expect(
      useFormat('hello {name} the number is {n}, please {name}', {
        name: 'elone',
        n: 42,
      }).value,
    ).toBe('hello elone the number is 42, please elone')
  })

  it('should format with array', () => {
    const arr = ['hello', 'world', ref('how'), 'you']
    expect(useFormat('{0}{1}{2}{3}', arr).value).toBe(arr.map(unwrap).join(''))
  })

  it('should format with ref<array>', () => {
    const arr = ref(['hello', 'world', ref('how'), 'you'])
    expect(useFormat('{0}{1}{2}{3}', arr).value).toBe(
      arr.value.map(unwrap).join(''),
    )
  })

  it('should update the result if args change', async () => {
    const arr = [ref('how')]
    const e = 'how are you'
    const f = useFormat('{0}', arr)

    expect(f.value).toBe(arr.map(unwrap).join(''))

    arr[0].value = e

    await nextTick()
    expect(f.value).toBe(arr.map(unwrap).join(''))
    expect(f.value).toBe(e)
  })

  it('should update if the format changes', async () => {
    const x = 'how'
    const format = ref('{0}')
    const f = useFormat(format, [x])

    expect(f.value).toBe(x)

    format.value = '{0}{0}'

    await nextTick()

    expect(f.value).toBe([x, x].join(''))
  })

  it('should not replace if key not found', () => {
    expect(useFormat('{0}', []).value).toBe('{0}')
  })

  it('should escape {{ xx }}', () => {
    expect(useFormat('{{0}}', [1]).value).toBe('{0}')
  })
})
