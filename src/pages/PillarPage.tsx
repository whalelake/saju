import { useParams, Link, Navigate } from 'react-router'
import { useI18n, type Language } from '../i18n'
import SeoHead from '../components/SeoHead'
import { SLUG_TO_GANJI, STEM_CONTENT, BRANCH_CONTENT, INTERACTION_DESC, PILLAR_LABELS, PILLAR_SLUGS } from '../content/pillar-content'
import { STEM_INFO, BRANCH_ELEMENT, ELEMENT_HANJA, JIJANGGAN, SKY_KR, EARTH_KR, SKY, EARTH, HGANJI, BRANCH_COMBINES_6, TRIPLE_COMPOSES, BRANCH_CLASHES } from '@orrery/core/constants'
import { getTwelveMeteor } from '@orrery/core/pillars'

const ELEMENT_KR: Record<string, string> = {
  tree: '목', fire: '화', earth: '토', metal: '금', water: '수',
}

const ELEMENT_EN: Record<string, string> = {
  tree: 'Wood', fire: 'Fire', earth: 'Earth', metal: 'Metal', water: 'Water',
}

const ELEMENT_JA: Record<string, string> = {
  tree: '木', fire: '火', earth: '土', metal: '金', water: '水',
}

/** 오행 상생/상극 관계 텍스트 */
function getElementRelation(stemEl: string, branchEl: string, lang: Language): string {
  if (stemEl === branchEl) {
    return lang === 'ko' ? '비화 (같은 오행)'
      : lang === 'ja' ? '比和（同じ五行）'
      : lang === 'zh' ? '比和（相同五行）'
      : 'Harmony (same element)'
  }

  const cycle = ['tree', 'fire', 'earth', 'metal', 'water']
  const si = cycle.indexOf(stemEl)
  const bi = cycle.indexOf(branchEl)

  // 상생: tree->fire->earth->metal->water->tree
  if (cycle[(si + 1) % 5] === branchEl) {
    return lang === 'ko' ? '상생 (천간이 지지를 생함)'
      : lang === 'ja' ? '相生（天干が地支を生む）'
      : lang === 'zh' ? '相生（天干生地支）'
      : 'Generating (stem produces branch)'
  }
  if (cycle[(bi + 1) % 5] === stemEl) {
    return lang === 'ko' ? '상생 (지지가 천간을 생함)'
      : lang === 'ja' ? '相生（地支が天干を生む）'
      : lang === 'zh' ? '相生（地支生天干）'
      : 'Generating (branch produces stem)'
  }

  // 상극: tree->earth->water->fire->metal->tree
  if (cycle[(si + 2) % 5] === branchEl) {
    return lang === 'ko' ? '상극 (천간이 지지를 극함)'
      : lang === 'ja' ? '相剋（天干が地支を剋す）'
      : lang === 'zh' ? '相克（天干克地支）'
      : 'Controlling (stem controls branch)'
  }
  if (cycle[(bi + 2) % 5] === stemEl) {
    return lang === 'ko' ? '상극 (지지가 천간을 극함)'
      : lang === 'ja' ? '相剋（地支が天干を剋す）'
      : lang === 'zh' ? '相克（地支克天干）'
      : 'Controlling (branch controls stem)'
  }

  return ''
}

/** Find compatible pillars (六合, 三合) */
function getCompatiblePillars(branch: string): string[] {
  const compatible = new Set<string>()

  // 六合
  for (const key of Object.keys(BRANCH_COMBINES_6)) {
    const [a, b] = key.split(',')
    if (a === branch) compatible.add(b)
    if (b === branch) compatible.add(a)
  }

  // 三合
  for (const trio of TRIPLE_COMPOSES) {
    if (trio.includes(branch)) {
      for (const b of trio) {
        if (b !== branch) compatible.add(b)
      }
    }
  }

  return Array.from(compatible)
}

/** Find clashing pillars (沖) */
function getClashingPillars(branch: string): string[] {
  const clashing: string[] = []

  for (const key of Object.keys(BRANCH_CLASHES)) {
    const [a, b] = key.split(',')
    if (a === branch) clashing.push(b)
    if (b === branch) clashing.push(a)
  }

  return clashing
}

/** Find pillars with a given branch from 60 ganji */
function findPillarsByBranch(branch: string): string[] {
  return HGANJI.filter((g) => g[1] === branch)
}

/** Get related pillar slugs: same stem, same branch, complement (六合 branch) */
function getRelatedPillars(ganji: string): { ganji: string; slug: string }[] {
  const stem = ganji[0]
  const branch = ganji[1]
  const related = new Set<string>()

  // Same stem (pick first one that isn't current)
  for (const g of HGANJI) {
    if (g[0] === stem && g !== ganji) {
      related.add(g)
      if (related.size >= 1) break
    }
  }

  // Same branch (pick first one that isn't current)
  for (const g of HGANJI) {
    if (g[1] === branch && g !== ganji) {
      related.add(g)
      if (related.size >= 2) break
    }
  }

  // 六合 complement branch
  const complementBranches = getCompatiblePillars(branch).slice(0, 1)
  for (const cb of complementBranches) {
    for (const g of HGANJI) {
      if (g[1] === cb && !related.has(g)) {
        related.add(g)
        if (related.size >= 3) break
      }
    }
    if (related.size >= 3) break
  }

  return Array.from(related).slice(0, 3).map((g) => ({ ganji: g, slug: PILLAR_SLUGS[g] }))
}

/** Format hidden stems (지장간) with spaces removed */
function formatJijanggan(branch: string): string {
  const hidden = JIJANGGAN[branch]
  if (!hidden) return ''
  return hidden.replace(/\s/g, '')
}

export default function PillarPage() {
  const { t, language } = useI18n()
  const { lang, slug } = useParams()
  const currentLang = (lang || language) as Language
  const isKo = currentLang === 'ko'
  const isJa = currentLang === 'ja'
  const isZh = currentLang === 'zh'

  if (!slug || !SLUG_TO_GANJI[slug]) {
    return <Navigate to={`/${currentLang}/pillars`} replace />
  }

  const ganji = SLUG_TO_GANJI[slug]
  const stem = ganji[0]
  const branch = ganji[1]
  const stemIdx = SKY.indexOf(stem)
  const branchIdx = EARTH.indexOf(branch)
  const stemKr = SKY_KR[stemIdx]
  const branchKr = EARTH_KR[branchIdx]
  const stemEl = STEM_INFO[stem].element
  const branchEl = BRANCH_ELEMENT[branch]
  const stemYinyang = STEM_INFO[stem].yinyang
  const labels = PILLAR_LABELS[currentLang]
  const meteor = getTwelveMeteor(stem, branch)
  const hiddenStems = formatJijanggan(branch)
  const elementRelation = getElementRelation(stemEl, branchEl, currentLang)

  const stemContent = STEM_CONTENT[stem][currentLang]
  const branchContent = BRANCH_CONTENT[branch][currentLang]
  const interactionDesc = INTERACTION_DESC[ganji]?.[currentLang] ?? ''

  // Compatibility
  const compatBranches = getCompatiblePillars(branch)
  const compatPillars = compatBranches
    .flatMap((b) => findPillarsByBranch(b))
    .filter((g) => g !== ganji)
    .slice(0, 3)

  const clashBranches = getClashingPillars(branch)
  const cautionPillars = clashBranches
    .flatMap((b) => findPillarsByBranch(b))
    .filter((g) => g !== ganji)
    .slice(0, 2)

  const relatedPillars = getRelatedPillars(ganji)

  const stemElHanja = ELEMENT_HANJA[stemEl]
  const branchElHanja = ELEMENT_HANJA[branchEl]
  const stemElKr = ELEMENT_KR[stemEl]
  const branchElKr = ELEMENT_KR[branchEl]

  const yinyangLabel = stemYinyang === '+'
    ? (isKo ? '양' : isJa ? '陽' : isZh ? '阳' : 'Yang')
    : (isKo ? '음' : isJa ? '陰' : isZh ? '阴' : 'Yin')

  const seoTitle = isKo
    ? `${ganji} 일주 (${stemKr}${branchKr}) - 성격, 직업, 연애, 궁합`
    : isJa
      ? `${ganji}日柱（${stemKr}${branchKr}）- 性格・仕事・恋愛・相性`
      : isZh
        ? `${ganji}日柱 - 性格、职业、恋爱、配对详解`
        : `${ganji} Day Pillar - Personality, Career, Love & Compatibility`

  const seoDescription = isKo
    ? `${ganji}(${stemKr}${branchKr}) 일주의 성격과 기질, 직업 적성, 연애 스타일, 궁합 분석을 확인하세요.`
    : isJa
      ? `${ganji}日柱の性格・仕事適性・恋愛スタイル・相性を詳しく解説します。`
      : isZh
        ? `详细解读${ganji}日柱的性格、职业适性、恋爱风格与配对分析。`
        : `Discover the personality, career aptitude, relationship style, and compatibility of the ${ganji} day pillar.`

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
        name: isKo ? '60갑자 일주' : isJa ? '六十甲子 日柱' : isZh ? '六十甲子日柱' : '60 Ganji Day Pillars',
        item: `https://saju-wheat.vercel.app/${currentLang}/pillars`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${ganji} ${isKo ? '일주' : isJa ? '日柱' : isZh ? '日柱' : 'Day Pillar'}`,
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
          ko: `/ko/pillars/${slug}`,
          en: `/en/pillars/${slug}`,
          ja: `/ja/pillars/${slug}`,
          zh: `/zh/pillars/${slug}`,
        }}
        structuredData={breadcrumbData}
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back navigation */}
        <Link to={`/${currentLang}/pillars`} className="btn btn-ghost btn-sm mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {labels.backToIndex}
        </Link>

        {/* Header */}
        <header className="text-center mb-8">
          <div className={`inline-block text-5xl font-bold font-hanja mb-2 el-${stemEl}`}>
            {ganji}
          </div>
          <h1 className="text-2xl font-bold mb-1">
            {ganji} {labels.dayPillar}
          </h1>
          <p className="text-base-content/70">
            {stemKr}({stem}) · {branchKr}({branch})
          </p>
          <div className="flex justify-center gap-2 mt-3">
            <span className={`badge bg-el-solid-${stemEl}`}>
              {stemElHanja}{stemElKr}
            </span>
            <span className="badge badge-outline">{yinyangLabel}</span>
          </div>
        </header>

        {/* Quick Info Card */}
        <div className="card bg-base-100 shadow-md mb-8">
          <div className="card-body p-5">
            <h2 className="text-lg font-bold mb-3">{labels.quickInfo}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-base-content/50 mb-1">{labels.stemElement}</div>
                <div className="font-semibold">
                  <span className={`inline-block w-3 h-3 rounded-full bg-el-solid-${stemEl} mr-1`} />
                  {stemElHanja}({stemElKr})
                </div>
              </div>
              <div>
                <div className="text-base-content/50 mb-1">{labels.branchElement}</div>
                <div className="font-semibold">
                  <span className={`inline-block w-3 h-3 rounded-full bg-el-solid-${branchEl} mr-1`} />
                  {branchElHanja}({branchElKr})
                </div>
              </div>
              <div>
                <div className="text-base-content/50 mb-1">{labels.elementRelation}</div>
                <div className="font-semibold">{elementRelation}</div>
              </div>
              <div>
                <div className="text-base-content/50 mb-1">{labels.twelveMeteor}</div>
                <div className="font-semibold font-hanja">{meteor}</div>
              </div>
              <div>
                <div className="text-base-content/50 mb-1">{labels.hiddenStems}</div>
                <div className="font-semibold font-hanja">{hiddenStems}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: 일주란? */}
        <section className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-3">{labels.section1Title}</h2>
            {interactionDesc && (
              <p className="text-base-content/80 mb-3">{interactionDesc}</p>
            )}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="rounded-xl bg-base-200 p-4 text-center">
                <div className={`text-3xl font-bold font-hanja el-${stemEl} mb-1`}>{stem}</div>
                <div className="text-sm text-base-content/70">{stemKr} · {stemElHanja}{stemElKr}</div>
                <div className="text-xs text-base-content/50 mt-1">{labels.heavenlyStem}</div>
              </div>
              <div className="rounded-xl bg-base-200 p-4 text-center">
                <div className={`text-3xl font-bold font-hanja el-${branchEl} mb-1`}>{branch}</div>
                <div className="text-sm text-base-content/70">{branchKr} · {branchElHanja}{branchElKr}</div>
                <div className="text-xs text-base-content/50 mt-1">{labels.earthlyBranch}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 성격과 기질 */}
        <section className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-3">{labels.section2Title}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-base-content/80 mb-1">{labels.nature}</h3>
                <p className="text-base-content/70">{stemContent.nature}</p>
              </div>
              <div>
                <h3 className="font-semibold text-base-content/80 mb-1">{labels.strengths}</h3>
                <p className="text-base-content/70">{stemContent.strengths}</p>
              </div>
              <div>
                <h3 className="font-semibold text-base-content/80 mb-1">{labels.branchNature}</h3>
                <p className="text-base-content/70">{branchContent.nature}</p>
              </div>
              <div>
                <h3 className="font-semibold text-base-content/80 mb-1">{labels.socialStyle}</h3>
                <p className="text-base-content/70">{branchContent.socialStyle}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 직업과 재물 */}
        <section className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-3">{labels.section3Title}</h2>
            <div className="space-y-4">
              <div>
                <p className="text-base-content/70">{stemContent.career}</p>
              </div>
              <div>
                <h3 className="font-semibold text-base-content/80 mb-1">{labels.branchEnergy}</h3>
                <p className="text-base-content/70">{branchContent.energy}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: 연애와 관계 */}
        <section className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-3">{labels.section4Title}</h2>
            <div className="space-y-4">
              <div>
                <p className="text-base-content/70">{stemContent.relationship}</p>
              </div>
              <div>
                <h3 className="font-semibold text-base-content/80 mb-1">{labels.socialStyle}</h3>
                <p className="text-base-content/70">{branchContent.socialStyle}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: 궁합 */}
        <section className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-3">{labels.section5Title}</h2>

            {compatPillars.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-success mb-2">{labels.bestMatch}</h3>
                <div className="flex flex-wrap gap-2">
                  {compatPillars.map((g) => {
                    const pillarSlug = PILLAR_SLUGS[g]
                    const gStemIdx = SKY.indexOf(g[0])
                    const gBranchIdx = EARTH.indexOf(g[1])
                    return (
                      <Link
                        key={g}
                        to={`/${currentLang}/pillars/${pillarSlug}`}
                        className="badge badge-lg badge-outline badge-success gap-1 hover:bg-success/10 transition-colors"
                      >
                        <span className="font-hanja">{g}</span>
                        <span className="text-xs">({SKY_KR[gStemIdx]}{EARTH_KR[gBranchIdx]})</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {cautionPillars.length > 0 && (
              <div>
                <h3 className="font-semibold text-error mb-2">{labels.caution}</h3>
                <div className="flex flex-wrap gap-2">
                  {cautionPillars.map((g) => {
                    const pillarSlug = PILLAR_SLUGS[g]
                    const gStemIdx = SKY.indexOf(g[0])
                    const gBranchIdx = EARTH.indexOf(g[1])
                    return (
                      <Link
                        key={g}
                        to={`/${currentLang}/pillars/${pillarSlug}`}
                        className="badge badge-lg badge-outline badge-error gap-1 hover:bg-error/10 transition-colors"
                      >
                        <span className="font-hanja">{g}</span>
                        <span className="text-xs">({SKY_KR[gStemIdx]}{EARTH_KR[gBranchIdx]})</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <div className="card bg-primary/10 border border-primary/20 mb-8">
          <div className="card-body text-center">
            <h2 className="text-lg font-bold">{labels.ctaTitle}</h2>
            <p className="text-base-content/70 text-sm mb-3">{labels.ctaDescription}</p>
            <Link to={`/${currentLang}/`} className="btn btn-primary btn-sm mx-auto">
              {labels.ctaButton}
            </Link>
          </div>
        </div>

        {/* Related pillars */}
        {relatedPillars.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4">{labels.relatedPillars}</h2>
            <div className="grid grid-cols-3 gap-3">
              {relatedPillars.map((rp) => {
                const rpStemIdx = SKY.indexOf(rp.ganji[0])
                const rpBranchIdx = EARTH.indexOf(rp.ganji[1])
                const rpEl = STEM_INFO[rp.ganji[0]].element
                return (
                  <Link
                    key={rp.ganji}
                    to={`/${currentLang}/pillars/${rp.slug}`}
                    className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow p-4 text-center"
                  >
                    <div className={`text-2xl font-bold font-hanja mb-1 el-${rpEl}`}>{rp.ganji}</div>
                    <div className="text-sm text-base-content/70">
                      {SKY_KR[rpStemIdx]}{EARTH_KR[rpBranchIdx]}
                    </div>
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
