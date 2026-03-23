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

interface I18nProviderProps {
  children: ReactNode
  initialLanguage?: Language
}

export function I18nProvider({ children, initialLanguage }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // 1. URL 경로에서 전달된 언어 우선 사용
    if (initialLanguage) {
      return initialLanguage
    }

    // 2. localStorage 확인 (fallback)
    const saved = localStorage.getItem('language')
    if (saved === 'ko' || saved === 'en' || saved === 'ja' || saved === 'zh') return saved

    // 3. 브라우저 언어 감지 (fallback)
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith('ko')) return 'ko'
    if (browserLang.startsWith('ja')) return 'ja'
    if (browserLang.startsWith('zh')) return 'zh'
    return 'en'
  })

  // URL 경로 변경 시 언어 동기화
  useEffect(() => {
    if (initialLanguage && initialLanguage !== language) {
      setLanguageState(initialLanguage)
    }
  }, [initialLanguage])

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
