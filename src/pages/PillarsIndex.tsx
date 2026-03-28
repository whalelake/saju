import { Link, useParams } from 'react-router'
import { useI18n, type Language } from '../i18n'
import SeoHead from '../components/SeoHead'
import { PILLAR_SLUGS, PILLAR_LABELS, STEM_CONTENT } from '../content/pillar-content'
import { HGANJI, STEM_INFO, BRANCH_ELEMENT, ELEMENT_HANJA, SKY, SKY_KR, EARTH_KR } from '@orrery/core/constants'

const ELEMENT_KR: Record<string, string> = {
  tree: '목', fire: '화', earth: '토', metal: '금', water: '수',
}

const ELEMENT_EN: Record<string, string> = {
  tree: 'Wood', fire: 'Fire', earth: 'Earth', metal: 'Metal', water: 'Water',
}

/** Group 60 ganji into 10 groups by heavenly stem */
function groupByStem(): { stem: string; stemKr: string; element: string; ganjis: { ganji: string; slug: string; stemKr: string; branchKr: string; element: string }[] }[] {
  const groups: ReturnType<typeof groupByStem> = []

  for (let si = 0; si < 10; si++) {
    const stem = SKY[si]
    const stemKr = SKY_KR[si]
    const element = STEM_INFO[stem].element
    const ganjis: typeof groups[0]['ganjis'] = []

    for (const ganji of HGANJI) {
      if (ganji[0] === stem) {
        const branch = ganji[1]
        const branchIdx = '子丑寅卯辰巳午未申酉戌亥'.indexOf(branch)
        ganjis.push({
          ganji,
          slug: PILLAR_SLUGS[ganji],
          stemKr,
          branchKr: EARTH_KR[branchIdx],
          element: BRANCH_ELEMENT[branch],
        })
      }
    }

    groups.push({ stem, stemKr, element, ganjis })
  }

  return groups
}

export default function PillarsIndex() {
  const { t, language } = useI18n()
  const { lang } = useParams()
  const currentLang = (lang || language) as Language
  const isKo = currentLang === 'ko'
  const isJa = currentLang === 'ja'
  const isZh = currentLang === 'zh'

  const labels = PILLAR_LABELS[currentLang]
  const groups = groupByStem()

  const seoTitle = isKo
    ? '60갑자 일주 - 사주 일주론 총정리'
    : isJa
      ? '六十甲子 日柱一覧 - 四柱推命の日柱解説'
      : isZh
        ? '六十甲子日柱 - 四柱八字日柱详解'
        : '60 Ganji Day Pillars - Complete Saju Day Pillar Guide'

  const seoDescription = isKo
    ? '60갑자 일주별 성격, 직업 적성, 연애 스타일, 궁합을 한눈에 확인하세요. 천간과 지지의 오행 조합으로 보는 일주 해석.'
    : isJa
      ? '六十甲子の日柱ごとに性格、仕事適性、恋愛スタイル、相性を一覧で確認できます。'
      : isZh
        ? '按六十甲子日柱查看性格、职业、恋爱风格与配对分析。'
        : 'Explore all 60 Ganji day pillars with personality traits, career aptitudes, relationship styles, and compatibility insights.'

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
          ko: '/ko/pillars',
          en: '/en/pillars',
          ja: '/ja/pillars',
          zh: '/zh/pillars',
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

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{labels.indexTitle}</h1>
          <p className="text-base-content/70">{labels.indexSubtitle}</p>
        </div>

        {groups.map((group) => {
          const stemElement = group.element
          const elementHanja = ELEMENT_HANJA[stemElement]
          const elementKr = ELEMENT_KR[stemElement]

          return (
            <section key={group.stem} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-bold font-hanja">
                  {group.stem}({group.stemKr})
                </h2>
                <span className={`badge bg-el-solid-${stemElement} text-xs`}>
                  {elementHanja}{elementKr}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {group.ganjis.map((item) => {
                  const branchElement = item.element

                  return (
                    <Link
                      key={item.ganji}
                      to={`/${currentLang}/pillars/${item.slug}`}
                      className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow p-4 text-center"
                    >
                      <div className="text-2xl font-bold font-hanja mb-1">{item.ganji}</div>
                      <div className="text-sm text-base-content/70 mb-2">
                        {item.stemKr}{item.branchKr}
                      </div>
                      <span className={`badge badge-sm bg-el-solid-${branchElement} mx-auto`}>
                        {ELEMENT_HANJA[branchElement]}{ELEMENT_KR[branchElement]}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
