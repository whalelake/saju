import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet, useParams } from 'react-router'
import { I18nProvider, type Language } from './i18n'
import App from './components/App'

const GuideIndex = lazy(() => import('./pages/GuideIndex'))
const LandingPage = lazy(() => import('./pages/LandingPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const EditorialPolicyPage = lazy(() => import('./pages/EditorialPolicyPage'))
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
const CompatibilityIndex = lazy(() => import('./pages/CompatibilityIndex'))
const CompatibilityPage = lazy(() => import('./pages/CompatibilityPage'))

const SUPPORTED_LANGUAGES: Language[] = ['ko', 'en', 'ja', 'zh']

const ROUTE_LOADING_COPY: Record<Language, { badge: string; title: string; description: string; guide: string; articles: string }> = {
  ko: {
    badge: '명운판',
    title: '콘텐츠를 불러오는 중입니다',
    description: '직접 진입한 페이지가 바로 보이도록 라우트 콘텐츠를 준비하고 있습니다.',
    guide: '가이드',
    articles: '기사',
  },
  en: {
    badge: 'Myungunpan',
    title: 'Loading this page',
    description: 'Preparing the content so direct-entry routes stay readable right away.',
    guide: 'Guide',
    articles: 'Articles',
  },
  ja: {
    badge: '命運判',
    title: 'ページを読み込んでいます',
    description: '直接アクセスしたページでも、すぐに内容を追えるよう準備しています。',
    guide: 'ガイド',
    articles: '記事',
  },
  zh: {
    badge: '命运判',
    title: '页面加载中',
    description: '正在准备当前内容，让直接进入页面时也能尽快看到可读信息。',
    guide: '指南',
    articles: '文章',
  },
}

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

function RouteLoadingShell({ language }: { language: Language }) {
  const copy = ROUTE_LOADING_COPY[language]

  return (
    <div className="min-h-screen bg-base-200">
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">{copy.badge}</p>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-base-content">{copy.title}</h1>
              <p className="text-base-content/70">{copy.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href={`/${language}/guide`} className="btn btn-outline btn-sm">
                {copy.guide}
              </a>
              <a href={`/${language}/articles`} className="btn btn-outline btn-sm">
                {copy.articles}
              </a>
            </div>
            <div className="flex items-center gap-3 pt-2 text-sm text-base-content/50">
              <span className="loading loading-spinner loading-sm" />
              <span>{copy.description}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Layout component that provides i18n context based on URL
function LanguageLayout() {
  const { lang } = useParams<{ lang: string }>()
  const language = SUPPORTED_LANGUAGES.includes(lang as Language)
    ? (lang as Language)
    : 'ko'

  return (
    <I18nProvider initialLanguage={language}>
      <Suspense fallback={<RouteLoadingShell language={language} />}>
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
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'editorial-policy',
        element: <EditorialPolicyPage />,
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
      {
        path: 'compatibility',
        element: <CompatibilityIndex />,
      },
      {
        path: 'compatibility/:stemId',
        element: <CompatibilityPage />,
      },
    ],
  },
  // Catch-all redirect
  {
    path: '*',
    element: <RootRedirect />,
  },
])
