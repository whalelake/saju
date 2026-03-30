import { Link, useParams } from 'react-router'
import { useI18n, type Language } from '../i18n'
import SeoHead from '../components/SeoHead'
import { FORTUNE_YEARS, YEAR_GANJI, YEAR_OVERVIEW, FORTUNE_LABELS } from '../content/fortune-content'

const ELEMENT_EMOJI: Record<string, string> = {
  tree: '🌿', fire: '🔥', earth: '🏔️', metal: '⚔️', water: '💧',
}

export default function FortuneIndex() {
  const { t, language } = useI18n()
  const { lang } = useParams()
  const currentLang = (lang || language) as Language
  const labels = FORTUNE_LABELS[currentLang]
  const isKo = currentLang === 'ko'
  const isJa = currentLang === 'ja'
  const isZh = currentLang === 'zh'

  const seoTitle = labels.indexTitle
  const seoDescription = isKo
    ? '2025년, 2026년 띠별 운세 — 직업, 연애, 건강 총정리'
    : isJa
      ? '2025年・2026年の干支別運勢 — 仕事・恋愛・健康を総まとめ'
      : isZh
        ? '2025年、2026年生肖运势 — 事业、爱情、健康全面分析'
        : '2025 & 2026 Zodiac Fortune — Career, Love, and Health Overview'

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
        name: labels.indexTitle,
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
          ko: '/ko/fortune',
          en: '/en/fortune',
          ja: '/ja/fortune',
          zh: '/zh/fortune',
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

        <div className="grid gap-6">
          {FORTUNE_YEARS.map((year) => {
            const ganji = YEAR_GANJI[year]
            const overview = YEAR_OVERVIEW[year][currentLang]
            const emoji = ELEMENT_EMOJI[ganji.element] || ''

            return (
              <Link
                key={year}
                to={`/${currentLang}/fortune/${year}`}
                className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{emoji}</span>
                    <div>
                      <h2 className="text-2xl font-bold">
                        {year}
                        <span className="font-hanja ml-2 text-lg text-base-content/70">
                          {ganji.hanja}
                        </span>
                        <span className="ml-1 text-lg text-base-content/50">
                          ({ganji.korean})
                        </span>
                      </h2>
                      <p className="text-sm text-base-content/60">{overview.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-base-content/80 line-clamp-2 mt-2">{overview.overview}</p>
                  <div className="card-actions justify-end mt-4">
                    <span className={`badge bg-el-solid-${ganji.element}`}>
                      {labels.byZodiac}
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
