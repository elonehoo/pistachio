import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { useLanguage } from '@elonehoo/pistachio'

describe.skip('language', () => {
  const windowEventSpy = vi.fn()
  const windowEvent = window.addEventListener

  const raiseLanguageChange = () => windowEventSpy.mock.calls[0][1]()

  const languageGetter = vi.spyOn(navigator, 'language', 'get')
  const languagesGetter = vi.spyOn(navigator, 'languages', 'get')

  const updateLanguage = (language: string, languages: string[]) => {
    languageGetter.mockImplementation(() => language)
    languagesGetter.mockImplementation(() => languages)

    raiseLanguageChange()
  }

  beforeAll(() => {
    window.addEventListener = windowEventSpy
  })
  afterAll(() => {
    window.addEventListener = windowEvent
  })

  it('should only add event listener once', () => {
    expect(windowEventSpy).not.toHaveBeenCalled()

    useLanguage()
    useLanguage()

    expect(windowEventSpy).toHaveBeenCalled()
    expect(windowEventSpy).toHaveBeenCalledTimes(1)

    expect(windowEventSpy).toHaveBeenCalledWith(
      'languagechange',
      expect.anything(),
      expect.objectContaining({ passive: true }),
    )
  })

  it('should update languages', () => {
    const { language, languages } = useLanguage()

    expect(language.value).toBe(navigator.language)
    expect(languages.value).toBe(navigator.languages)

    let lang = 'en-GB'
    let pref = ['en-GB', 'en-EN', 'en']

    updateLanguage(lang, pref)
    expect(language.value).toBe(lang)
    expect(languages.value).toStrictEqual(pref)

    lang = 'en-EN'
    pref = ['pt-PT', 'en-EN', 'en']

    updateLanguage(lang, pref)
    expect(language.value).toBe(lang)
    expect(languages.value).toStrictEqual(pref)
  })
})
