import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet, useParams } from 'react-router'
import { I18nProvider, type Language } from './i18n'
import App from './components/App'

// Lazy-load secondary pages for code splitting
const GuideIndex = lazy(() => import('./pages/GuideIndex'))
const LandingPage = lazy(() => import('./pages/LandingPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const ArticlesIndex = lazy(() => import('./pages/ArticlesIndex'))
const ArticlePage = lazy(() => import('./pages/ArticlePage'))
const DreamPage = lazy(() => import('./pages/DreamPage'))
const PillarsIndex = lazy(() => import('./pages/PillarsIndex'))
const PillarPage = lazy(() => import('./pages/PillarPage'))
const ZiweiStarsIndex = lazy(() => import('./pages/ZiweiStarsIndex'))
const ZiweiStarPage = lazy(() => import('./pages/ZiweiStarPage'))
const SipsinIndex = lazy(() => import('./pages/SipsinIndex'))
const SipsinPage = lazy(() => import('./pages/SipsinPage'))
const FortuneIndex = lazy(() => import('./pages/FortuneIndex'))
const FortunePage = lazy(() => import('./pages/FortunePage'))

const SUPPORTED_LANGUAGES: Language[] = ['ko', 'en', 'ja', 'zh']

function getDefaultLanguage(): Language {
  // 1. localStorage 확인
  const saved = localStorage.getItem('language')
  if (saved && SUPPORTED_LANGUAGES.includes(saved as Language)) {
    return saved as Language
  }

  // 2. 브라우저 언어 감지
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('ko')) return 'ko'
  if (browserLang.startsWith('ja')) return 'ja'
  if (browserLang.startsWith('zh')) return 'zh'
  return 'en'
}

// Layout component that provides i18n context based on URL
function LanguageLayout() {
  const { lang } = useParams<{ lang: string }>()
  const language = SUPPORTED_LANGUAGES.includes(lang as Language)
    ? (lang as Language)
    : 'ko'

  return (
    <I18nProvider initialLanguage={language}>
      <Suspense fallback={<div className="min-h-screen" />}>
        <Outlet />
      </Suspense>
    </I18nProvider>
  )
}

// Root redirect based on browser language
function RootRedirect() {
  const defaultLang = getDefaultLanguage()
  return <Navigate to={`/${defaultLang}/`} replace />
}

// Legacy query param redirect (for backwards compatibility)
function LegacyRedirect() {
  const params = new URLSearchParams(window.location.search)
  const langParam = params.get('lang')
  if (langParam && SUPPORTED_LANGUAGES.includes(langParam as Language)) {
    return <Navigate to={`/${langParam}/`} replace />
  }
  return <RootRedirect />
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LegacyRedirect />,
  },
  {
    path: '/:lang',
    element: <LanguageLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'guide',
        element: <GuideIndex />,
      },
      {
        path: 'guide/:topic',
        element: <LandingPage />,
      },
      {
        path: 'guide/:topic/:subtopic',
        element: <LandingPage />,
      },
      {
        path: 'privacy',
        element: <PrivacyPage />,
      },
      {
        path: 'terms',
        element: <TermsPage />,
      },
      {
        path: 'articles',
        element: <ArticlesIndex />,
      },
      {
        path: 'articles/:articleId',
        element: <ArticlePage />,
      },
      {
        path: 'dream',
        element: <DreamPage />,
      },
      {
        path: 'pillars',
        element: <PillarsIndex />,
      },
      {
        path: 'pillars/:pillarId',
        element: <PillarPage />,
      },
      {
        path: 'ziwei/stars',
        element: <ZiweiStarsIndex />,
      },
      {
        path: 'ziwei/stars/:starId',
        element: <ZiweiStarPage />,
      },
      {
        path: 'sipsin',
        element: <SipsinIndex />,
      },
      {
        path: 'sipsin/:sipsinId',
        element: <SipsinPage />,
      },
      {
        path: 'fortune',
        element: <FortuneIndex />,
      },
      {
        path: 'fortune/:year',
        element: <FortunePage />,
      },
    ],
  },
  // Catch-all redirect
  {
    path: '*',
    element: <RootRedirect />,
  },
])
