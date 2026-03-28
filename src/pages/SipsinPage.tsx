import { useParams, Link, Navigate } from 'react-router'
import { useI18n, type Language } from '../i18n'
import SeoHead from '../components/SeoHead'
import {
  SLUG_TO_SIPSIN,
  SIPSIN_SLUGS,
  SIPSIN_CONTENT,
  SIPSIN_LABELS,
  SIPSIN_PAIRS,
  SIPSIN_RELATION_TYPE,
  RELATION_COLORS,
  RELATION_TYPE_LABELS,
} from '../content/sipsin-content'

/** Find the paired sipsin (e.g., 比肩 <-> 劫財) */
function getPairedSipsin(hanja: string): string | null {
  for (const [a, b] of SIPSIN_PAIRS) {
    if (a === hanja) return b
    if (b === hanja) return a
  }
  return null
}

/** Find adjacent pair (the pair before and after in the 5-pair list) */
function getAdjacentPairs(hanja: string): string[] {
  const pairIdx = SIPSIN_PAIRS.findIndex(([a, b]) => a === hanja || b === hanja)
  if (pairIdx === -1) return []

  const adjacent: string[] = []

  // Previous pair
  if (pairIdx > 0) {
    adjacent.push(SIPSIN_PAIRS[pairIdx - 1][0])
    adjacent.push(SIPSIN_PAIRS[pairIdx - 1][1])
  }

  // Next pair
  if (pairIdx < SIPSIN_PAIRS.length - 1) {
    adjacent.push(SIPSIN_PAIRS[pairIdx + 1][0])
    adjacent.push(SIPSIN_PAIRS[pairIdx + 1][1])
  }

  return adjacent
}

/** Get related sipsin: paired opposite + adjacent pair members */
function getRelatedSipsin(hanja: string): { hanja: string; slug: string }[] {
  const related: string[] = []

  // Paired opposite
  const paired = getPairedSipsin(hanja)
  if (paired) related.push(paired)

  // Adjacent pair members (up to 2 more)
  const adjacent = getAdjacentPairs(hanja)
  for (const adj of adjacent) {
    if (!related.includes(adj) && adj !== hanja) {
      related.push(adj)
      if (related.length >= 3) break
    }
  }

  return related.map((h) => ({ hanja: h, slug: SIPSIN_SLUGS[h] }))
}

export default function SipsinPage() {
  const { t, language } = useI18n()
  const { lang, sipsinId: slug } = useParams()
  const currentLang = (lang || language) as Language
  const isKo = currentLang === 'ko'
  const isJa = currentLang === 'ja'
  const isZh = currentLang === 'zh'

  if (!slug || !SLUG_TO_SIPSIN[slug]) {
    return <Navigate to={`/${currentLang}/sipsin`} replace />
  }

  const hanja = SLUG_TO_SIPSIN[slug]
  const content = SIPSIN_CONTENT[hanja][currentLang]
  const labels = SIPSIN_LABELS[currentLang]
  const relationType = SIPSIN_RELATION_TYPE[hanja]
  const colors = RELATION_COLORS[relationType]
  const relationLabel = RELATION_TYPE_LABELS[relationType][currentLang]
  const relatedSipsin = getRelatedSipsin(hanja)

  const seoTitle = isKo
    ? `${content.name} — 성격, 직업, 연애 완전 해석 | 십신`
    : isJa
      ? `${content.name} — 性格・仕事・恋愛を徹底解説 | 十神`
      : isZh
        ? `${content.name} — 性格、事业、感情全面解析 | 十神`
        : `${content.name} — Personality, Career & Love Guide | Ten Gods`

  const seoDescription = isKo
    ? `${content.name}의 성격, 직업 적성, 연애 스타일, 강점과 약점을 자세히 알아보세요. 사주 십신 해석.`
    : isJa
      ? `${content.name}の性格、仕事適性、恋愛スタイル、強みと弱みを詳しく解説します。`
      : isZh
        ? `详细了解${content.name}的性格、职业适性、恋爱风格、优势与不足。`
        : `Discover the personality, career aptitude, relationship style, strengths and growth areas of ${content.name}.`

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
        name: isKo ? '십신(十神)' : isJa ? '十神' : isZh ? '十神' : 'Ten Gods',
        item: `https://saju-wheat.vercel.app/${currentLang}/sipsin`,
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
          ko: `/ko/sipsin/${slug}`,
          en: `/en/sipsin/${slug}`,
          ja: `/ja/sipsin/${slug}`,
          zh: `/zh/sipsin/${slug}`,
        }}
        structuredData={breadcrumbData}
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back navigation */}
        <Link to={`/${currentLang}/sipsin`} className="btn btn-ghost btn-sm mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {labels.backToIndex}
        </Link>

        {/* Header */}
        <header className="text-center mb-8">
          <div className="text-4xl font-bold font-hanja mb-2">{hanja}</div>
          <h1 className="text-2xl font-bold mb-1">{content.name}</h1>
          <p className={`text-lg ${colors.text} font-medium mb-3`}>{content.nickname}</p>
          <div className="flex justify-center gap-2">
            <span className={`badge ${colors.badge}`}>{relationLabel}</span>
            <span className="badge badge-outline">{content.element}</span>
          </div>
        </header>

        {/* Section 1: Overview */}
        <section className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-3">{labels.overview}</h2>
            <div className={`rounded-xl ${colors.bg} p-4 mb-3`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-base-content/60">{labels.interaction}</span>
                <span className={`badge badge-sm ${colors.badge}`}>{content.interaction}</span>
              </div>
              <p className="text-sm text-base-content/60">{content.element}</p>
            </div>
            <p className="text-base-content/80">{content.overview}</p>
          </div>
        </section>

        {/* Section 2: Personality */}
        <section className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-3">{labels.personality}</h2>
            <p className="text-base-content/70">{content.personality}</p>
          </div>
        </section>

        {/* Section 3: Career */}
        <section className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-3">{labels.career}</h2>
            <p className="text-base-content/70">{content.career}</p>
          </div>
        </section>

        {/* Section 4: Relationship */}
        <section className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-3">{labels.relationship}</h2>
            <p className="text-base-content/70">{content.relationship}</p>
          </div>
        </section>

        {/* Section 5: Strengths */}
        <section className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-3">{labels.strength}</h2>
            <p className="text-base-content/70">{content.strength}</p>
          </div>
        </section>

        {/* Section 6: Growth Areas */}
        <section className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-3">{labels.weakness}</h2>
            <p className="text-base-content/70">{content.weakness}</p>
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

        {/* Related Sipsin */}
        {relatedSipsin.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4">{labels.relatedSipsin}</h2>
            <div className="grid grid-cols-3 gap-3">
              {relatedSipsin.map((rs) => {
                const rsContent = SIPSIN_CONTENT[rs.hanja][currentLang]
                const rsRelation = SIPSIN_RELATION_TYPE[rs.hanja]
                const rsColors = RELATION_COLORS[rsRelation]

                return (
                  <Link
                    key={rs.hanja}
                    to={`/${currentLang}/sipsin/${rs.slug}`}
                    className={`card ${rsColors.bg} shadow-sm hover:shadow-md transition-shadow p-4 text-center`}
                  >
                    <div className="text-2xl font-bold font-hanja mb-1">{rs.hanja}</div>
                    <div className="text-sm text-base-content/70">{rsContent.name}</div>
                    <div className="text-xs text-base-content/50 mt-1">{rsContent.nickname}</div>
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
