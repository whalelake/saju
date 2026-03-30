import { Link, useParams } from 'react-router'
import { useI18n, type Language } from '../i18n'
import SeoHead from '../components/SeoHead'
import { COMPAT_SLUGS, COMPAT_OVERVIEW, COMPAT_LABELS, STEMS } from '../content/compatibility-content'
import { STEM_INFO } from '@orrery/core/constants'

const ELEMENT_COLOR: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  tree: { bg: 'bg-green-50 dark:bg-green-950/30', border: 'border-green-300 dark:border-green-700', text: 'text-green-700 dark:text-green-400', badge: 'badge-success' },
  fire: { bg: 'bg-red-50 dark:bg-red-950/30', border: 'border-red-300 dark:border-red-700', text: 'text-red-700 dark:text-red-400', badge: 'badge-error' },
  earth: { bg: 'bg-yellow-50 dark:bg-yellow-950/30', border: 'border-yellow-300 dark:border-yellow-700', text: 'text-yellow-700 dark:text-yellow-400', badge: 'badge-warning' },
  metal: { bg: 'bg-gray-50 dark:bg-gray-900/30', border: 'border-gray-300 dark:border-gray-600', text: 'text-gray-700 dark:text-gray-400', badge: 'badge-neutral' },
  water: { bg: 'bg-blue-50 dark:bg-blue-950/30', border: 'border-blue-300 dark:border-blue-700', text: 'text-blue-700 dark:text-blue-400', badge: 'badge-info' },
}

const ELEMENT_LABEL: Record<Language, Record<string, string>> = {
  ko: { tree: '목(木)', fire: '화(火)', earth: '토(土)', metal: '금(金)', water: '수(水)' },
  en: { tree: 'Wood', fire: 'Fire', earth: 'Earth', metal: 'Metal', water: 'Water' },
  ja: { tree: '木', fire: '火', earth: '土', metal: '金', water: '水' },
  zh: { tree: '木', fire: '火', earth: '土', metal: '金', water: '水' },
}

const YINYANG_LABEL: Record<Language, Record<string, string>> = {
  ko: { '+': '양', '-': '음' },
  en: { '+': 'Yang', '-': 'Yin' },
  ja: { '+': '陽', '-': '陰' },
  zh: { '+': '阳', '-': '阴' },
}

export default function CompatibilityIndex() {
  const { t, language } = useI18n()
  const { lang } = useParams()
  const currentLang = (lang || language) as Language
  const isKo = currentLang === 'ko'
  const isJa = currentLang === 'ja'
  const isZh = currentLang === 'zh'

  const labels = COMPAT_LABELS[currentLang]

  const seoTitle = isKo
    ? '일간 궁합 가이드 - 천간으로 보는 사주 궁합'
    : isJa
      ? '日干相性ガイド - 天干で見る四柱推命の相性'
      : isZh
        ? '日干合盘指南 - 通过天干看四柱八字合盘'
        : 'Day Master Compatibility Guide - Saju Compatibility by Heavenly Stems'

  const seoDescription = isKo
    ? '사주 일간(日干) 궁합을 알아보세요. 갑을병정무기경신임계, 10개 천간별 관계 패턴과 궁합 점수를 확인하세요.'
    : isJa
      ? '四柱推命の日干相性をチェック。甲乙丙丁戊己庚辛壬癸、10天干の関係パターンと相性スコアを確認。'
      : isZh
        ? '了解四柱八字日干合盘。甲乙丙丁戊己庚辛壬癸，10天干的关系模式与合盘评分。'
        : 'Explore Saju Day Master compatibility. Check relationship patterns and compatibility scores for all 10 Heavenly Stems.'

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        position: 1,
        name: isKo ? '홈' : isJa ? 'ホーム' : isZh ? '首页' : 'Home',
        item: `https://saju-wheat.vercel.app/${currentLang}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isKo ? '일간 궁합' : isJa ? '日干相性' : isZh ? '日干合盘' : 'Compatibility',
      },
    ],
  }

  return (
    <div className="min-h-screen bg-base-200">
      <SeoHead
        language={currentLang}
        title={seoTitle}
        description={seoDescription}
        pathByLanguage={{
          ko: '/ko/compatibility',
          en: '/en/compatibility',
          ja: '/ja/compatibility',
          zh: '/zh/compatibility',
        }}
        structuredData={breadcrumbData}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to={`/${currentLang}/`} className="btn btn-ghost btn-sm mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t.common.close}
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">{labels.indexTitle}</h1>
          <p className="text-base-content/70">{labels.indexSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STEMS.map((stem) => {
            const info = STEM_INFO[stem]
            const colors = ELEMENT_COLOR[info.element]
            const overview = COMPAT_OVERVIEW[stem][currentLang]
            const slug = COMPAT_SLUGS[stem]
            const elLabel = ELEMENT_LABEL[currentLang][info.element]
            const yyLabel = YINYANG_LABEL[currentLang][info.yinyang]

            return (
              <Link
                key={stem}
                to={`/${currentLang}/compatibility/${slug}`}
                className={`card ${colors.bg} border ${colors.border} shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="card-body p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-2xl font-bold font-hanja">{stem}</div>
                      <div className="text-base font-semibold mt-0.5">{overview.title.split('(')[0].trim()}</div>
                    </div>
                    <span className={`badge ${colors.badge} badge-sm`}>
                      {yyLabel} {elLabel}
                    </span>
                  </div>
                  <p className="text-sm text-base-content/60 line-clamp-2 mb-3">
                    {overview.overview}
                  </p>
                  <div className="flex gap-2 text-xs">
                    <span className={`${colors.text} font-medium`}>
                      {labels.bestMatch}: {overview.bestMatch}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
