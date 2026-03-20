import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { ko } from './ko'
import { en } from './en'
import { ja } from './ja'
import { zh } from './zh'

// Language type
export type Language = 'ko' | 'en' | 'ja' | 'zh'
export type Translations = typeof ko

const translations: Record<Language, Translations> = {
  ko,
  en,
  ja,
  zh,
}

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // 1. URL 파라미터 우선 확인 (?lang=ja 등)
    const params = new URLSearchParams(window.location.search)
    const langParam = params.get('lang')
    if (langParam === 'ko' || langParam === 'en' || langParam === 'ja' || langParam === 'zh') {
      return langParam
    }

    // 2. localStorage 확인
    const saved = localStorage.getItem('language')
    if (saved === 'ko' || saved === 'en' || saved === 'ja' || saved === 'zh') return saved

    // 3. 브라우저 언어 감지
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith('ko')) return 'ko'
    if (browserLang.startsWith('ja')) return 'ja'
    if (browserLang.startsWith('zh')) return 'zh'
    return 'en'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    // HTML lang 속성 업데이트
    document.documentElement.lang = lang
  }

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const value: I18nContextType = {
    language,
    setLanguage,
    t: translations[language],
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}
