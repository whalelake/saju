import { Link, useParams, Navigate } from 'react-router'
import { useI18n, type Language } from '../i18n'
import SeoHead from '../components/SeoHead'
import {
  FORTUNE_YEARS,
  YEAR_GANJI,
  YEAR_OVERVIEW,
  ZODIAC_KEYS,
  ZODIAC_FORTUNE,
  FORTUNE_LABELS,
  type FortuneYear,
} from '../content/fortune-content'

const ELEMENT_EMOJI: Record<string, string> = {
  tree: '🌿', fire: '🔥', earth: '🏔️', metal: '⚔️', water: '💧',
}

export default function FortunePage() {
  const { t, language } = useI18n()
  const { lang, year: yearParam } = useParams()
  const currentLang = (lang || language) as Language
  const labels = FORTUNE_LABELS[currentLang]
  const isKo = currentLang === 'ko'
  const isJa = currentLang === 'ja'
  const isZh = currentLang === 'zh'

  const yearNum = Number(yearParam)
  if (!FORTUNE_YEARS.includes(yearNum as FortuneYear)) {
    return <Navigate to={`/${currentLang}/fortune`} replace />
  }

  const year = yearNum as FortuneYear
  const ganji = YEAR_GANJI[year]
  const overview = YEAR_OVERVIEW[year][currentLang]
  const emoji = ELEMENT_EMOJI[ganji.element] || ''

  const seoTitle = overview.title
  const seoDescription = isKo
    ? `${year}년 ${ganji.hanja}(${ganji.korean})년 띠별 운세 — 직업운, 연애운, 건강운 총정리`
    : isJa
      ? `${year}年${ganji.hanja}年の干支別運勢 — 仕事・恋愛・健康の総合ガイド`
      : isZh
        ? `${year}年${ganji.hanja}年生肖运势 — 事业、爱情、健康全面分析`
        : `${year} ${ganji.hanja} Year Zodiac Fortune — Career, Love, and Health Guide`

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
        item: `https://saju-wheat.vercel.app/${currentLang}/fortune`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${year}${isKo ? '년' : isJa ? '年' : isZh ? '年' : ''}`,
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
          ko: `/ko/fortune/${year}`,
          en: `/en/fortune/${year}`,
          ja: `/ja/fortune/${year}`,
          zh: `/zh/fortune/${year}`,
        }}
        structuredData={breadcrumbData}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Navigation */}
        <Link to={`/${currentLang}/fortune`} className="btn btn-ghost btn-sm mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {labels.indexTitle}
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-4xl mb-3">{emoji}</div>
          <h1 className="text-3xl font-bold mb-1">
            {year}
            <span className="font-hanja ml-2">{ganji.hanja}</span>
            <span className="text-base-content/60 ml-1 text-xl">({ganji.korean})</span>
          </h1>
          <p className="text-base-content/70 mt-2">{overview.subtitle}</p>
        </div>

        {/* Year Overview */}
        <section className="card bg-base-100 shadow-md mb-8">
          <div className="card-body">
            <h2 className="card-title text-xl mb-4">{labels.yearOverview}</h2>
            <p className="text-base-content/80 mb-4">{overview.overview}</p>

            <div className="bg-base-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold mb-2">
                {isKo ? '오행 에너지' : isJa ? '五行エネルギー' : isZh ? '五行能量' : 'Five Elements Energy'}
              </h3>
              <p className="text-sm text-base-content/70">{overview.element}</p>
            </div>

            <div className={`bg-el-light-${ganji.element} rounded-lg p-4`}>
              <h3 className="font-semibold mb-2">
                {isKo ? '올해의 조언' : isJa ? '今年のアドバイス' : isZh ? '年度建议' : 'Advice for the Year'}
              </h3>
              <p className="text-sm">{overview.advice}</p>
            </div>
          </div>
        </section>

        {/* Zodiac Fortune */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">{labels.byZodiac}</h2>

          <div className="grid gap-4">
            {ZODIAC_KEYS.map((branch) => {
              const fortune = ZODIAC_FORTUNE[year][branch][currentLang]

              return (
                <div key={branch} className="card bg-base-100 shadow-sm">
                  <div className="card-body">
                    {/* Zodiac Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl font-hanja">{branch}</span>
                      <h3 className="text-lg font-bold">{fortune.animal}</h3>
                    </div>

                    {/* Overall */}
                    <div className="mb-4">
                      <span className="badge badge-primary badge-sm mb-2">{labels.overall}</span>
                      <p className="text-base-content/80">{fortune.overall}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div className="bg-base-200 rounded-lg p-3">
                        <div className="text-xs font-semibold text-base-content/60 mb-1">{labels.career}</div>
                        <p className="text-sm">{fortune.career}</p>
                      </div>
                      <div className="bg-base-200 rounded-lg p-3">
                        <div className="text-xs font-semibold text-base-content/60 mb-1">{labels.love}</div>
                        <p className="text-sm">{fortune.love}</p>
                      </div>
                      <div className="bg-base-200 rounded-lg p-3">
                        <div className="text-xs font-semibold text-base-content/60 mb-1">{labels.health}</div>
                        <p className="text-sm">{fortune.health}</p>
                      </div>
                    </div>

                    {/* Lucky / Caution Months */}
                    <div className="flex flex-wrap gap-3 mt-3">
                      <div className="flex items-center gap-1.5">
                        <span className="badge badge-success badge-xs" />
                        <span className="text-xs text-base-content/60">{labels.luckyMonths}:</span>
                        <span className="text-xs font-medium">{fortune.luckyMonth}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="badge badge-warning badge-xs" />
                        <span className="text-xs text-base-content/60">{labels.cautionMonths}:</span>
                        <span className="text-xs font-medium">{fortune.cautionMonth}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="card bg-primary text-primary-content shadow-lg mt-10">
          <div className="card-body text-center">
            <p className="text-lg mb-4">{labels.ctaText}</p>
            <Link to={`/${currentLang}/`} className="btn btn-secondary btn-lg mx-auto">
              {labels.ctaButton}
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
