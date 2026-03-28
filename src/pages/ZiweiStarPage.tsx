import { useParams, Link, Navigate } from 'react-router'
import { useI18n, type Language } from '../i18n'
import SeoHead from '../components/SeoHead'
import { SLUG_TO_STAR, STAR_CONTENT, STAR_LABELS, STAR_SLUGS } from '../content/star-content'
import { ZIWEI_SERIES_OFFSETS, TIANFU_SERIES_OFFSETS } from '@orrery/core/constants'

const ZIWEI_SERIES_STARS = Object.keys(ZIWEI_SERIES_OFFSETS)
const TIANFU_SERIES_STARS = Object.keys(TIANFU_SERIES_OFFSETS)

/** Map element text to Tailwind color class */
function getElementColor(elementText: string): string {
  if (elementText.includes('木') || elementText.includes('Wood')) return 'tree'
  if (elementText.includes('火') || elementText.includes('Fire')) return 'fire'
  if (elementText.includes('土') || elementText.includes('Earth')) return 'earth'
  if (elementText.includes('金') || elementText.includes('Metal')) return 'metal'
  if (elementText.includes('水') || elementText.includes('Water')) return 'water'
  if (elementText.includes('목수') || elementText.includes('Wood-Water')) return 'tree'
  if (elementText.includes('금화') || elementText.includes('Metal-Fire')) return 'metal'
  return 'earth'
}

/** Get related stars from the same series (excluding current) */
function getRelatedStars(star: string): string[] {
  const isZiweiSeries = ZIWEI_SERIES_STARS.includes(star)
  const seriesStars = isZiweiSeries ? ZIWEI_SERIES_STARS : TIANFU_SERIES_STARS
  const others = seriesStars.filter((s) => s !== star)

  // Pick up to 3 related stars: next ones in the series list
  const idx = seriesStars.indexOf(star)
  const result: string[] = []
  for (let i = 1; result.length < 3 && i < seriesStars.length; i++) {
    const nextIdx = (idx + i) % seriesStars.length
    result.push(seriesStars[nextIdx])
  }
  return result
}

export default function ZiweiStarPage() {
  const { t, language } = useI18n()
  const { lang, starId: slug } = useParams()
  const currentLang = (lang || language) as Language
  const isKo = currentLang === 'ko'
  const isJa = currentLang === 'ja'
  const isZh = currentLang === 'zh'

  if (!slug || !SLUG_TO_STAR[slug]) {
    return <Navigate to={`/${currentLang}/ziwei/stars`} replace />
  }

  const star = SLUG_TO_STAR[slug]
  const content = STAR_CONTENT[star][currentLang]
  const labels = STAR_LABELS[currentLang]
  const elColor = getElementColor(content.element)
  const relatedStars = getRelatedStars(star)

  const seoTitle = isKo
    ? `${content.name} - ${content.nickname} | 자미두수 주성`
    : isJa
      ? `${content.name} - ${content.nickname} | 紫微斗数主星`
      : isZh
        ? `${content.name} - ${content.nickname} | 紫微斗数主星`
        : `${content.name} - ${content.nickname} | Zi Wei Dou Shu`

  const seoDescription = content.overview

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
        name: isKo ? '자미두수 주성' : isJa ? '紫微斗数 主星' : isZh ? '紫微斗数主星' : 'Ziwei Main Stars',
        item: `https://saju-wheat.vercel.app/${currentLang}/ziwei/stars`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: content.name,
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
          ko: `/ko/ziwei/stars/${slug}`,
          en: `/en/ziwei/stars/${slug}`,
          ja: `/ja/ziwei/stars/${slug}`,
          zh: `/zh/ziwei/stars/${slug}`,
        }}
        structuredData={breadcrumbData}
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back navigation */}
        <Link to={`/${currentLang}/ziwei/stars`} className="btn btn-ghost btn-sm mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {labels.backToIndex}
        </Link>

        {/* Header */}
        <header className="text-center mb-8">
          <div className={`inline-block text-5xl font-bold font-hanja mb-2 el-${elColor}`}>
            {star}
          </div>
          <h1 className="text-2xl font-bold mb-1">
            {content.name}
          </h1>
          <p className="text-lg text-base-content/70 mb-3">
            {content.nickname}
          </p>
          <div className="flex justify-center gap-2">
            <span className={`badge bg-el-solid-${elColor}`}>
              {labels.element}: {content.element}
            </span>
            <span className="badge badge-outline">
              {labels.series}: {content.series}
            </span>
          </div>
        </header>

        {/* Overview */}
        <section className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-3">{labels.overview}</h2>
            <p className="text-base-content/80 leading-relaxed">{content.overview}</p>
          </div>
        </section>

        {/* Personality */}
        <section className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-3">{labels.personality}</h2>
            <p className="text-base-content/80 leading-relaxed">{content.personality}</p>
          </div>
        </section>

        {/* Career */}
        <section className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-3">{labels.career}</h2>
            <p className="text-base-content/80 leading-relaxed">{content.career}</p>
          </div>
        </section>

        {/* Relationship */}
        <section className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-3">{labels.relationship}</h2>
            <p className="text-base-content/80 leading-relaxed">{content.relationship}</p>
          </div>
        </section>

        {/* Sihua (Four Transformations) */}
        <section className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-3">{labels.sihua}</h2>
            <p className="text-base-content/80 leading-relaxed">{content.sihua}</p>
          </div>
        </section>

        {/* Companion Stars */}
        <section className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-3">{labels.companion}</h2>
            <p className="text-base-content/80 leading-relaxed">{content.companion}</p>
          </div>
        </section>

        {/* CTA */}
        <div className="card bg-primary/10 border border-primary/20 mb-8">
          <div className="card-body text-center">
            <h2 className="text-lg font-bold">{labels.ctaText}</h2>
            <Link to={`/${currentLang}/`} className="btn btn-primary btn-sm mx-auto mt-2">
              {labels.ctaButton}
            </Link>
          </div>
        </div>

        {/* Related Stars */}
        {relatedStars.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4">{labels.relatedStars}</h2>
            <div className="grid grid-cols-3 gap-3">
              {relatedStars.map((rs) => {
                const rsContent = STAR_CONTENT[rs][currentLang]
                const rsElColor = getElementColor(rsContent.element)
                const rsSlug = STAR_SLUGS[rs]
                return (
                  <Link
                    key={rs}
                    to={`/${currentLang}/ziwei/stars/${rsSlug}`}
                    className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow p-4 text-center"
                  >
                    <div className={`text-2xl font-bold font-hanja mb-1 el-${rsElColor}`}>{rs}</div>
                    <div className="text-sm text-base-content/70">{rsContent.nickname}</div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
