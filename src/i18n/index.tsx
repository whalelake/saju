import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { ko } from './ko'
import { en } from './en'

export type Language = 'ko' | 'en'
export type Translations = typeof ko

const translations: Record<Language, Translations> = {
  ko,
  en,
}

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language')
    if (saved === 'ko' || saved === 'en') return saved
    // 브라우저 언어 감지
    const browserLang = navigator.language.toLowerCase()
    return browserLang.startsWith('ko') ? 'ko' : 'en'
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
