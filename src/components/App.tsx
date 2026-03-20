import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useI18n, type Language } from '../i18n'
import BirthForm from './BirthForm.tsx'
import Guide from './Guide.tsx'
import CopyButton from './CopyButton.tsx'
import InterpretModal from './InterpretModal.tsx'
import Hero from './Hero.tsx'
import History from './History.tsx'
import ShareCard from './ShareCard.tsx'
import CompareView from './CompareView.tsx'
import Settings from './Settings.tsx'
import PrivacyPolicy from './PrivacyPolicy.tsx'
import TermsOfService from './TermsOfService.tsx'
import AboutPage from './AboutPage.tsx'
import ContactPage from './ContactPage.tsx'
import FortuneInfo from './FortuneInfo.tsx'
import AdBanner from './AdBanner.tsx'
import CoupangPartner from './CoupangPartner.tsx'
import SajuView from './saju/SajuView.tsx'
import ZiweiView from './ziwei/ZiweiView.tsx'
import NatalView from './natal/NatalView.tsx'
import { calculateSaju } from '@orrery/core/saju'
import { createChart } from '@orrery/core/ziwei'
import { calculateNatal } from '@orrery/core/natal'
import { sajuToText, ziweiToText, natalToText } from '../utils/text-export.ts'
import type { BirthInput } from '@orrery/core/types'

type Tab = 'saju' | 'ziwei' | 'natal'

const LANGUAGE_LABELS: Record<Language, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '中文',
}

const LANGUAGE_ORDER: Language[] = ['ko', 'en', 'ja', 'zh']

function LanguageToggle() {
  const { language } = useI18n()
  const navigate = useNavigate()

  const handleLanguageChange = (newLang: Language) => {
    localStorage.setItem('language', newLang)
    navigate(`/${newLang}/`)
  }

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-ghost btn-sm gap-1"
        aria-label="언어 전환"
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
      onClick={() => setTheme(t => t === 'oriental' ? 'oriental-dark' : 'oriental')}
      aria-label="테마 전환"
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
  const { t } = useI18n()
  const [tab, setTab] = useState<Tab>('saju')
  const [birthInput, setBirthInput] = useState<BirthInput | null>(null)
  const [showHero, setShowHero] = useState(true)
  const [interpretOpen, setInterpretOpen] = useState(false)
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

  function handleSubmit(input: BirthInput) {
    setBirthInput(input)
    setShowHero(false)
    requestAnimationFrame(() => {
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
    setBirthInput(input)
    setShowHero(false)
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

  return (
    <div className="min-h-screen bg-base-200 bg-hanji">
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
              <span className="hidden sm:inline">궁합</span>
            </button>
          )}
        </div>
        <div className="navbar-end gap-1">
          <button
            className="btn btn-ghost btn-sm btn-circle"
            onClick={() => setInfoOpen(true)}
            aria-label="명리학 가이드"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </button>
          <button
            className="btn btn-ghost btn-sm btn-circle"
            onClick={() => setSettingsOpen(true)}
            aria-label="설정"
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
            <AdBanner slot="SLOT_HERO_BOTTOM" format="horizontal" />
          </div>
        </>
      )}

      {/* 메인 콘텐츠 */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* 입력 폼 */}
        <div ref={formRef} className="card bg-base-100 border-oriental mb-6">
          <div className="card-body p-4 sm:p-6">
            <BirthForm onSubmit={handleSubmit} />
          </div>
        </div>

        {/* 광고: 폼 하단 */}
        <div className="mb-6">
          <AdBanner slot="SLOT_FORM_BOTTOM" format="horizontal" />
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
                    className={`tab tab-lg font-hanja ${tab === 'saju' ? 'tab-active text-primary' : ''}`}
                    onClick={() => setTab('saju')}
                  >
                    四柱八字
                  </button>
                  <button
                    role="tab"
                    className={`tab tab-lg font-hanja ${tab === 'ziwei' ? 'tab-active text-primary' : ''}`}
                    onClick={() => setTab('ziwei')}
                  >
                    紫微斗數
                  </button>
                  <button
                    role="tab"
                    className={`tab tab-lg font-hanja ${tab === 'natal' ? 'tab-active text-primary' : ''}`}
                    onClick={() => setTab('natal')}
                  >
                    出生圖
                  </button>
                </div>
                <div className="ml-2 flex gap-1">
                  <CopyButton
                    label={<span className="text-xs">복사</span>}
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
                  <button
                    className="btn btn-sm btn-primary gap-1"
                    onClick={() => setInterpretOpen(true)}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="text-xs">AI 해석</span>
                  </button>
                </div>
              </div>

              {/* 탭 콘텐츠 */}
              <div className="p-4 sm:p-6">
                {tab === 'saju' && <SajuView input={birthInput} />}
                {tab === 'ziwei' && <ZiweiView input={birthInput} />}
                {tab === 'natal' && <NatalView input={birthInput} />}
              </div>
            </div>
          </div>

          {/* 광고: 결과 하단 */}
          <div className="mt-6">
            <AdBanner slot="SLOT_RESULT_TOP" format="horizontal" />
          </div>

          {/* 쿠팡 파트너스 */}
          <CoupangPartner />
          </>
        )}

        {/* 광고 */}
        <div className="mt-6">
          <AdBanner slot="1234567890" format="horizontal" />
        </div>

        {/* 가이드 */}
        <div className="mt-6">
          <Guide />
        </div>
      </main>

      {/* 모달들 */}
      <InterpretModal
        isOpen={interpretOpen}
        onClose={() => setInterpretOpen(false)}
        getData={getAllData}
      />

      {birthInput && (
        <ShareCard
          input={birthInput}
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
        />
      )}

      <CompareView
        isOpen={compareOpen}
        onClose={() => setCompareOpen(false)}
        initialInput={birthInput}
      />

      <Settings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <PrivacyPolicy
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />

      <TermsOfService
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
      />

      <AboutPage
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
      />

      <ContactPage
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      {/* 명리학 가이드 모달 */}
      <dialog className={`modal ${infoOpen ? 'modal-open' : ''}`}>
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

      {/* 푸터 */}
      <footer className="border-t border-base-300 bg-base-100 mt-8">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-base-content/60">
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
            <div>
              &copy; 2025 {t.footer.copyright}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
