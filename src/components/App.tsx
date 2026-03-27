import { useRef, useState, useEffect, lazy, Suspense } from 'react'
import { Link, useParams } from 'react-router'
import { useI18n, type Language } from '../i18n'
import BirthForm from './BirthForm.tsx'
import Guide from './Guide.tsx'
import CopyButton from './CopyButton.tsx'
import Hero from './Hero.tsx'
import History from './History.tsx'
import Settings, { useSettings } from './Settings.tsx'
import AdBanner from './AdBanner.tsx'
import ResultEngagementPanel from './ResultEngagementPanel.tsx'
import SeoHead from './SeoHead.tsx'
import SajuView from './saju/SajuView.tsx'

// Lazy loaded components
const ZiweiView = lazy(() => import('./ziwei/ZiweiView.tsx'))
const NatalView = lazy(() => import('./natal/NatalView.tsx'))
const InterpretModal = lazy(() => import('./InterpretModal.tsx'))
const ShareCard = lazy(() => import('./ShareCard.tsx'))
const CompareView = lazy(() => import('./CompareView.tsx'))
const PrivacyPolicy = lazy(() => import('./PrivacyPolicy.tsx'))
const TermsOfService = lazy(() => import('./TermsOfService.tsx'))
const AboutPage = lazy(() => import('./AboutPage.tsx'))
const ContactPage = lazy(() => import('./ContactPage.tsx'))
const FortuneInfo = lazy(() => import('./FortuneInfo.tsx'))
import { calculateSaju } from '@orrery/core/saju'
import { createChart } from '@orrery/core/ziwei'
import { calculateNatal } from '@orrery/core/natal'
import { sajuToText, ziweiToText, natalToText } from '../utils/text-export.ts'
import type { BirthInput } from '@orrery/core/types'
import { getFollowupPrompt, type FollowupQuestionId, type LanguageKey, type TabKey } from '../utils/followup-prompts.ts'

type Tab = TabKey
type InterpretType = 'personality' | 'advice' | 'general'
type ContextType = 'self' | 'child' | 'partner' | 'friend' | 'other'

interface InterpretPreset {
  question?: string
  type?: InterpretType
  context?: ContextType
}

interface StoredHistoryItem {
  id: string
  input: BirthInput
  createdAt: number
  label?: string
}

const LANGUAGE_LABELS: Record<Language, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '中文',
}

const LANGUAGE_ORDER: Language[] = ['ko', 'en', 'ja', 'zh']

const HOME_SEO: Record<Language, { title: string; description: string }> = {
  ko: {
    title: '명운판 - 무료 사주팔자 · 자미두수 · 점성술 AI 해석',
    description: '무료 사주팔자, 자미두수, 서양 점성술 계산과 AI 해석을 한 번에. 출생 시간 모름 옵션, 오늘의 AI 운세, 관련 가이드와 기사까지 제공합니다.',
  },
  en: {
    title: 'Myungunpan - Free Saju, Zi Wei Dou Shu, and Natal Chart AI Readings',
    description: 'Calculate Saju, Zi Wei Dou Shu, and Western natal charts for free, then continue into AI interpretation, daily fortune prompts, guides, and articles.',
  },
  ja: {
    title: '命運盤 - 無料の四柱推命・紫微斗数・出生チャート AI 解釈',
    description: '四柱推命、紫微斗数、西洋占星術の出生チャートを無料で計算し、そのままAI解釈、今日の運勢、ガイド記事へ進めます。',
  },
  zh: {
    title: '命运盘 - 免费四柱八字、紫微斗数、出生图 AI 解读',
    description: '免费计算四柱八字、紫微斗数与西方出生图，并继续查看 AI 解读、今日运势、指南和文章。',
  },
}

const HISTORY_STORAGE_KEY = 'orrery-history'

const DAILY_FORTUNE_COPY: Record<Language, {
  title: string
  description: string
  button: string
  helper: string
  currentReady: string
  historyReady: string
}> = {
  ko: {
    title: '오늘의 AI 운세',
    description: '최근 기록을 불러와서 오늘의 흐름을 짧고 선명하게 읽어드려요.',
    button: '오늘의 흐름 보기',
    helper: '기록이 있으면 계산을 다시 입력하지 않아도 돼요.',
    currentReady: '현재 명식 준비됨',
    historyReady: '최근 기록 준비됨',
  },
  en: {
    title: 'Today’s AI Fortune',
    description: 'Reuse your latest chart and get a short reading for today.',
    button: 'See today’s reading',
    helper: 'If you have history, you do not need to enter everything again.',
    currentReady: 'Current chart ready',
    historyReady: 'Recent chart ready',
  },
  ja: {
    title: '今日のAI運勢',
    description: '最近の記録を使って、今日の流れを短く読み解きます。',
    button: '今日の流れを見る',
    helper: '履歴があれば、もう一度入力しなくて大丈夫です。',
    currentReady: '現在の命式で準備完了',
    historyReady: '最近の履歴で準備完了',
  },
  zh: {
    title: '今日 AI 运势',
    description: '直接使用最近记录，快速查看今天的整体走势。',
    button: '查看今日走势',
    helper: '如果有历史记录，就不用重新输入了。',
    currentReady: '当前命盘已就绪',
    historyReady: '最近记录已就绪',
  },
}

const WEEKLY_READING_COPY: Record<Language, {
  title: string
  description: string
  button: string
  helper: string
}> = {
  ko: {
    title: '이번 주 읽기',
    description: '이번 주 흐름을 감정, 관계, 일과 돈 중심으로 한 번 더 정리해드려요.',
    button: '이번 주 흐름 보기',
    helper: ‘매주 새로운 흐름을 확인하고, 한 주를 더 잘 준비해보세요.’,
  },
  en: {
    title: ‘This week’s reading’,
    description: ‘Get a weekly reading focused on emotions, relationships, work, and money.’,
    button: ‘See this week’,
    helper: ‘Check in each week to stay aligned with your evolving energy.’,
  },
  ja: {
    title: ‘今週の読みもの’,
    description: ‘今週の流れを感情、関係、仕事、お金を中心にまとめます。’,
    button: ‘今週の流れを見る’,
    helper: ‘毎週の流れを確認して、一週間をより良く過ごしましょう。’,
  },
  zh: {
    title: ‘本周解读’,
    description: ‘围绕情绪、关系、工作和金钱，快速整理本周走势。’,
    button: ‘查看本周走势’,
    helper: ‘每周查看最新走势，更好地规划您的一周。’,
  },
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

function trackEvent(eventName: string, params: Record<string, string | number | boolean | undefined>) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: eventName, ...params })
  }
}

function LanguageToggle() {
  const { language, t } = useI18n()

  const handleLanguageChange = (newLang: Language) => {
    localStorage.setItem('language', newLang)
    window.location.href = `/${newLang}/`
  }

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-ghost btn-sm gap-1"
        aria-label={t.header.languageSwitch}
      >
        <span className="text-sm font-bold uppercase">{language}</span>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-50 w-32 p-2 shadow-lg border border-base-300"
      >
        {LANGUAGE_ORDER.map(lang => (
          <li key={lang}>
            <button
              className={lang === language ? 'active' : ''}
              onClick={() => handleLanguageChange(lang)}
            >
              {LANGUAGE_LABELS[lang]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ThemeToggle() {
  const { t } = useI18n()
  const [theme, setTheme] = useState<'oriental' | 'oriental-dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved === 'oriental' || saved === 'oriental-dark') return saved
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oriental-dark' : 'oriental'
    }
    return 'oriental'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      className="btn btn-ghost btn-sm btn-circle"
      onClick={() => setTheme(th => th === 'oriental' ? 'oriental-dark' : 'oriental')}
      aria-label={t.header.themeSwitch}
    >
      {theme === 'oriental' ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  )
}

export default function App() {
  const { t, language } = useI18n()
  const { lang } = useParams()
  const currentLang = lang || language
  const seoLanguage = currentLang as Language
  const { settings, updateSettings } = useSettings()
  const [tab, setTab] = useState<Tab>(() => settings.defaultTab)
  const [birthInput, setBirthInput] = useState<BirthInput | null>(null)
  const [showHero, setShowHero] = useState(true)
  const [interpretOpen, setInterpretOpen] = useState(false)
  const [interpretPreset, setInterpretPreset] = useState<InterpretPreset | undefined>()
  const [historySeedInput, setHistorySeedInput] = useState<BirthInput | null>(null)
  const [pendingPreset, setPendingPreset] = useState<{ preset: InterpretPreset; entry: 'home_daily' } | null>(null)
  const [shareOpen, setShareOpen] = useState(false)
  const [compareOpen, setCompareOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const dailyFortuneInput = birthInput ?? historySeedInput
  const dailyFortuneCopy = DAILY_FORTUNE_COPY[currentLang as Language]
  const weeklyReadingCopy = WEEKLY_READING_COPY[currentLang as Language]
  const dailyFortuneStatus = birthInput
    ? dailyFortuneCopy.currentReady
    : dailyFortuneCopy.historyReady

  function handleSubmit(input: BirthInput) {
    trackEvent('calc_submit', {
      lang: currentLang,
      tab_default: tab,
      unknown_time: input.unknownTime,
    })
    setBirthInput(input)
    setShowHero(false)
    requestAnimationFrame(() => {
      trackEvent('calc_complete', {
        lang: currentLang,
        tab,
        unknown_time: input.unknownTime,
      })
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  function handleStart() {
    setShowHero(false)
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  function handleHistorySelect(input: BirthInput) {
    setHistorySeedInput(input)
    setBirthInput(input)
    setShowHero(false)
    requestAnimationFrame(() => {
      trackEvent('calc_complete', {
        lang: currentLang,
        tab,
        unknown_time: input.unknownTime,
      })
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  function openInterpret(entry: 'result_summary' | 'ai_teaser' | 'followup_card' | 'home_daily' = 'result_summary', preset?: InterpretPreset) {
    setInterpretPreset(preset)
    setInterpretOpen(true)
    trackEvent('ai_open', {
      lang: currentLang,
      tab,
      entry,
    })
  }

  function handleFollowupQuestion(questionId: FollowupQuestionId) {
    const followup = getFollowupPrompt(currentLang as LanguageKey, tab, questionId)
    const preset: InterpretPreset = {
      question: followup.prompt,
      type: followup.type,
      context: 'self',
    }
    trackEvent('ai_followup_click', {
      lang: currentLang,
      tab,
      question_id: questionId,
    })
    openInterpret('followup_card', preset)
  }

  function handleRelatedArticleClick(targetPath: string) {
    trackEvent('related_article_click', {
      lang: currentLang,
      tab,
      target_slug: targetPath,
    })
  }

  function handleOpenWeeklyReading() {
    const preset: InterpretPreset = {
      question: '이번 주 흐름을 짧고 실용적으로 알려줘. 감정, 관계, 일과 돈 중심으로 정리해줘.',
      type: 'advice',
      context: 'self',
    }

    if (birthInput) {
      trackEvent('weekly_reading_open', {
        lang: currentLang,
        entry: 'home_weekly',
      })
      openInterpret('home_daily', preset)
      return
    }

    if (!historySeedInput) return

    setBirthInput(historySeedInput)
    setShowHero(false)
    setPendingPreset({ preset, entry: 'home_daily' })
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  async function getAllData(): Promise<string> {
    if (!birthInput) return ''
    const saju = calculateSaju(birthInput)
    const parts = [sajuToText(saju)]
    if (!birthInput.unknownTime) {
      const chart = createChart(birthInput.year, birthInput.month, birthInput.day, birthInput.hour, birthInput.minute, birthInput.gender === 'M')
      parts.push(ziweiToText(chart))
    }
    const natal = await calculateNatal(birthInput)
    parts.push(natalToText(natal))
    return parts.join('\n\n')
  }

  function handleOpenDailyFortune() {
    const preset: InterpretPreset = {
      question: '오늘의 흐름을 짧고 선명하게 알려줘. 감정, 관계, 일과 돈 중심으로 정리해줘.',
      type: 'advice',
      context: 'self',
    }

    if (birthInput) {
      trackEvent('daily_ai_fortune_open', {
        lang: currentLang,
        entry: 'home_daily',
      })
      openInterpret('home_daily', preset)
      return
    }

    if (!historySeedInput) return

    setBirthInput(historySeedInput)
    setShowHero(false)
    setPendingPreset({ preset, entry: 'home_daily' })
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  useEffect(() => {
    if (birthInput || typeof window === 'undefined') return

    const saved = localStorage.getItem(HISTORY_STORAGE_KEY)
    if (!saved) return

    try {
      const parsed = JSON.parse(saved) as StoredHistoryItem[]
      if (Array.isArray(parsed) && parsed.length > 0) {
        setHistorySeedInput(parsed[0].input)
      }
    } catch {
      // ignore malformed history
    }
  }, [birthInput])

  useEffect(() => {
    if (!pendingPreset || !birthInput) return

    trackEvent('daily_ai_fortune_open', {
      lang: currentLang,
      entry: pendingPreset.entry,
    })
    openInterpret('home_daily', pendingPreset.preset)
    setPendingPreset(null)
  }, [pendingPreset, birthInput, currentLang])

  return (
    <div className="min-h-screen bg-base-200 bg-hanji">
      <SeoHead
        language={seoLanguage}
        title={HOME_SEO[seoLanguage].title}
        description={HOME_SEO[seoLanguage].description}
        pathByLanguage={{
          ko: '/ko/',
          en: '/en/',
          ja: '/ja/',
          zh: '/zh/',
        }}
      />
      {/* 헤더 */}
      <header className="navbar bg-base-100 border-b border-base-300 sticky top-0 z-40">
        <div className="navbar-start">
          <History onSelect={handleHistorySelect} currentInput={birthInput} />
        </div>
        <div className="navbar-center">
          {birthInput && (
            <button
              className="btn btn-ghost btn-sm gap-1"
              onClick={() => setCompareOpen(true)}
            >
              <span className="font-hanja">合</span>
              <span className="hidden sm:inline">{t.header.compatibility}</span>
            </button>
          )}
        </div>
        <div className="navbar-end gap-1">
          <button
            className="btn btn-ghost btn-sm btn-circle"
            onClick={() => setInfoOpen(true)}
            aria-label={t.header.guide}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </button>
          <button
            className="btn btn-ghost btn-sm btn-circle"
            onClick={() => setSettingsOpen(true)}
            aria-label={t.header.settings}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <LanguageToggle />
          <ThemeToggle />
          <a
            href="https://github.com/whalelake/saju"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
        </div>
      </header>

      {/* 히어로 섹션 */}
      {showHero && !birthInput && (
        <>
          <Hero onStart={handleStart} />
          {/* 광고: Hero 하단 */}
          <div className="max-w-2xl mx-auto px-4 mt-4">
            <AdBanner slot="hero_bottom" format="horizontal" />
          </div>
        </>
      )}

      {/* 메인 콘텐츠 */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {dailyFortuneInput && (
          <section className="grid gap-4 mb-6 md:grid-cols-2">
            <div className="card border border-primary/25 bg-gradient-to-br from-primary/15 via-base-100 to-secondary/10 shadow-sm overflow-hidden">
              <div className="card-body gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="badge badge-primary badge-outline">AI</div>
                  <div className="badge badge-secondary badge-outline">{dailyFortuneStatus}</div>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-primary">{dailyFortuneCopy.title}</p>
                    <p className="text-sm text-base-content/80 mt-1">{dailyFortuneCopy.description}</p>
                  </div>
                  <button className="btn btn-primary btn-sm shrink-0" onClick={handleOpenDailyFortune}>
                    {dailyFortuneCopy.button}
                  </button>
                </div>
                <div className="rounded-2xl border border-base-200 bg-base-100/80 px-4 py-3">
                  <p className="text-xs text-base-content/60">{dailyFortuneCopy.helper}</p>
                </div>
              </div>
            </div>

            <div className="card border border-secondary/25 bg-gradient-to-br from-secondary/12 via-base-100 to-primary/8 shadow-sm overflow-hidden">
              <div className="card-body gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="badge badge-secondary badge-outline">AI</div>
                  <div className="badge badge-outline">WEEK</div>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-secondary">{weeklyReadingCopy.title}</p>
                    <p className="text-sm text-base-content/80 mt-1">{weeklyReadingCopy.description}</p>
                  </div>
                  <button className="btn btn-secondary btn-sm shrink-0" onClick={handleOpenWeeklyReading}>
                    {weeklyReadingCopy.button}
                  </button>
                </div>
                <div className="rounded-2xl border border-base-200 bg-base-100/80 px-4 py-3">
                  <p className="text-xs text-base-content/60">{weeklyReadingCopy.helper}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 입력 폼 */}
        <div ref={formRef} className="card bg-base-100 border-oriental mb-6">
          <div className="card-body p-4 sm:p-6">
            <BirthForm onSubmit={handleSubmit} />
          </div>
        </div>

        {/* 광고: 폼 하단 */}
        <div className="mb-6">
          <AdBanner slot="form_bottom" format="horizontal" />
        </div>

        {/* 결과 영역 */}
        {birthInput && (
          <>
            <div ref={resultsRef} className="card bg-base-100 border-oriental">
            <div className="card-body p-0">
              {/* 탭 네비게이션 */}
              <div className="flex items-center border-b border-base-300 px-2 sm:px-4">
                <div role="tablist" className="tabs tabs-bordered flex-1">
                  <button
                    role="tab"
                    className={`tab tab-lg ${tab === 'saju' ? 'tab-active text-primary' : ''}`}
                    onClick={() => setTab('saju')}
                  >
                    {t.display.sajuTab}
                  </button>
                  <button
                    role="tab"
                    className={`tab tab-lg ${tab === 'ziwei' ? 'tab-active text-primary' : ''}`}
                    onClick={() => setTab('ziwei')}
                  >
                    {t.display.ziweiTab}
                  </button>
                  <button
                    role="tab"
                    className={`tab tab-lg ${tab === 'natal' ? 'tab-active text-primary' : ''}`}
                    onClick={() => setTab('natal')}
                  >
                    {t.display.natalTab}
                  </button>
                </div>
                <div className="ml-2 flex flex-col items-end gap-1">
                  <div className="flex gap-1">
                    <CopyButton
                      label={<span className="text-xs">{t.common.copy}</span>}
                      getText={getAllData}
                    />
                    <button
                      className="btn btn-sm btn-ghost gap-1"
                      onClick={() => setShareOpen(true)}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                  </div>
                  <button
                    className="btn btn-sm btn-primary gap-1"
                    onClick={() => openInterpret('result_summary')}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="text-xs">{t.results.aiInterpret}</span>
                  </button>
                </div>
              </div>

              {/* 탭 콘텐츠 */}
              <div className="p-4 sm:p-6">
                {tab === 'saju' && <SajuView input={birthInput} />}
                <Suspense fallback={<div className="flex justify-center py-8"><span className="loading loading-spinner loading-lg" /></div>}>
                  {tab === 'ziwei' && <ZiweiView input={birthInput} />}
                  {tab === 'natal' && <NatalView input={birthInput} />}
                </Suspense>

                <ResultEngagementPanel
                  tab={tab}
                  language={currentLang as Language}
                  input={birthInput}
                  onOpenInterpret={() => openInterpret('ai_teaser')}
                  onSelectFollowupQuestion={handleFollowupQuestion}
                  onSelectRelatedLink={handleRelatedArticleClick}
                />
                <div className="border-t border-base-300 bg-base-100 px-4 py-4">
                  <p className="text-xs text-base-content/70 mb-2">{t.results.nextReading}</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className={`btn btn-outline btn-sm rounded-full ${tab === 'saju' ? 'btn-primary text-white' : 'text-base-content'}`}
                      onClick={() => setTab('saju')}
                    >
                      {t.display.sajuTab}
                    </button>
                    <button
                      type="button"
                      className={`btn btn-outline btn-sm rounded-full ${tab === 'ziwei' ? 'btn-primary text-white' : 'text-base-content'}`}
                      onClick={() => setTab('ziwei')}
                    >
                      {t.display.ziweiTab}
                    </button>
                    <button
                      type="button"
                      className={`btn btn-outline btn-sm rounded-full ${tab === 'natal' ? 'btn-primary text-white' : 'text-base-content'}`}
                      onClick={() => setTab('natal')}
                    >
                      {t.display.natalTab}
                    </button>
                    <Link
                      to={`/${currentLang}/guide`}
                      className="btn btn-outline btn-sm rounded-full text-base-content"
                    >
                      {t.guide.title}
                    </Link>
                    <Link
                      to={`/${currentLang}/articles`}
                      className="btn btn-outline btn-sm rounded-full text-base-content"
                    >
                      {t.articles.title}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 광고: 결과 하단 */}
          <div className="mt-6">
            <AdBanner slot="result_top" format="horizontal" />
          </div>

          </>
        )}

        {/* 광고 */}
        <div className="mt-6">
          <AdBanner slot="result_bottom" format="horizontal" />
        </div>

        {/* 가이드 */}
        {settings.showGuide && (
          <div className="mt-6">
            <Guide />
          </div>
        )}
      </main>

      {/* 모달들 */}
      <Suspense fallback={null}>
        {interpretOpen && (
          <InterpretModal
            isOpen={interpretOpen}
            onClose={() => {
              setInterpretOpen(false)
              setInterpretPreset(undefined)
            }}
            getData={getAllData}
            preset={interpretPreset}
            onComplete={({ type, context, question }) => {
              trackEvent('ai_complete', {
                lang: currentLang,
                tab,
                type,
                context,
                question: question || undefined,
              })
            }}
          />
        )}

        {birthInput && shareOpen && (
          <ShareCard
            input={birthInput}
            isOpen={shareOpen}
            onClose={() => setShareOpen(false)}
          />
        )}

        {compareOpen && (
          <CompareView
            isOpen={compareOpen}
            onClose={() => setCompareOpen(false)}
            initialInput={birthInput}
          />
        )}

        {privacyOpen && (
          <PrivacyPolicy
            isOpen={privacyOpen}
            onClose={() => setPrivacyOpen(false)}
          />
        )}

        {termsOpen && (
          <TermsOfService
            isOpen={termsOpen}
            onClose={() => setTermsOpen(false)}
          />
        )}

        {aboutOpen && (
          <AboutPage
            isOpen={aboutOpen}
            onClose={() => setAboutOpen(false)}
          />
        )}

        {contactOpen && (
          <ContactPage
            isOpen={contactOpen}
            onClose={() => setContactOpen(false)}
          />
        )}

        {/* 명리학 가이드 모달 */}
        {infoOpen && (
          <dialog className="modal modal-open">
            <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setInfoOpen(false)}
              >
                ✕
              </button>
              <FortuneInfo />
            </div>
            <form method="dialog" className="modal-backdrop" onClick={() => setInfoOpen(false)}>
              <button>close</button>
            </form>
          </dialog>
        )}
      </Suspense>

      <Settings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSettingsChange={(newSettings) => {
          updateSettings(newSettings)
          if (newSettings.defaultTab) setTab(newSettings.defaultTab)
        }}
      />

      {/* 푸터 */}
      <footer className="border-t border-base-300 bg-base-100 mt-8">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-4 text-sm text-base-content/60">
            <div className="flex gap-4 flex-wrap justify-center">
              <button
                className="hover:text-base-content transition-colors"
                onClick={() => setAboutOpen(true)}
              >
                {t.about.title}
              </button>
              <button
                className="hover:text-base-content transition-colors"
                onClick={() => setInfoOpen(true)}
              >
                {t.guide.title}
              </button>
              <Link
                to={`/${currentLang}/articles`}
                className="hover:text-base-content transition-colors"
              >
                {t.footer.articles}
              </Link>
              <button
                className="hover:text-base-content transition-colors"
                onClick={() => setPrivacyOpen(true)}
              >
                {t.footer.privacy}
              </button>
              <button
                className="hover:text-base-content transition-colors"
                onClick={() => setTermsOpen(true)}
              >
                {t.footer.terms}
              </button>
              <button
                className="hover:text-base-content transition-colors"
                onClick={() => setContactOpen(true)}
              >
                {t.footer.contact}
              </button>
            </div>
            <div className="text-center text-xs text-base-content/50 max-w-md">
              <p>{t.footer.disclaimer}</p>
              <p className="mt-1">{t.footer.disclaimerEn}</p>
              <p className="mt-1">{t.footer.noDataStored}</p>
            </div>
            <div>
              &copy; 2025 {t.footer.copyright}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
