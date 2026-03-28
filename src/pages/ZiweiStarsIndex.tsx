import { Link, useParams } from 'react-router'
import { useI18n, type Language } from '../i18n'
import SeoHead from '../components/SeoHead'
import { STAR_SLUGS, STAR_CONTENT, STAR_LABELS } from '../content/star-content'
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
  // Dual elements: use primary
  if (elementText.includes('목수') || elementText.includes('Wood-Water')) return 'tree'
  if (elementText.includes('금화') || elementText.includes('Metal-Fire')) return 'metal'
  return 'earth'
}

export default function ZiweiStarsIndex() {
  const { t, language } = useI18n()
  const { lang } = useParams()
  const currentLang = (lang || language) as Language
  const isKo = currentLang === 'ko'
  const isJa = currentLang === 'ja'
  const isZh = currentLang === 'zh'

  const labels = STAR_LABELS[currentLang]

  const seoTitle = isKo
    ? '자미두수 14주성 가이드 - 성격, 직업, 연애, 사화 변환'
    : isJa
      ? '紫微斗数 14主星ガイド - 性格・仕事・恋愛・四化'
      : isZh
        ? '紫微斗数14主星指南 - 性格、事业、感情、四化'
        : '14 Main Stars of Zi Wei Dou Shu - Personality, Career, Love & Si Hua'

  const seoDescription = isKo
    ? '자미두수의 14개 주성(자미, 천기, 태양, 무곡, 천동, 염정, 천부, 태음, 탐랑, 거문, 천상, 천량, 칠살, 파군)별 성격, 직업 적성, 연애 스타일, 사화 변환을 알아보세요.'
    : isJa
      ? '紫微斗数の14主星（紫微、天機、太陽、武曲、天同、廉貞、天府、太陰、貪狼、巨門、天相、天梁、七殺、破軍）の性格・仕事・恋愛・四化を解説。'
      : isZh
        ? '详细了解紫微斗数14主星的性格、事业、感情及四化变换。'
        : 'Explore the personality, career, relationships, and Four Transformations of all 14 main stars in Zi Wei Dou Shu.'

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
      },
    ],
  }

  function renderStarCard(star: string) {
    const slug = STAR_SLUGS[star]
    const content = STAR_CONTENT[star][currentLang]
    const elColor = getElementColor(content.element)

    return (
      <Link
        key={star}
        to={`/${currentLang}/ziwei/stars/${slug}`}
        className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow p-4 text-center"
      >
        <div className={`text-2xl font-bold font-hanja mb-1 el-${elColor}`}>{star}</div>
        <div className="text-sm font-semibold mb-1">{content.nickname}</div>
        <div className="text-xs text-base-content/60 mb-2">{content.name}</div>
        <span className={`badge badge-sm bg-el-solid-${elColor} mx-auto`}>
          {content.element}
        </span>
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-base-200">
      <SeoHead
        language={currentLang}
        title={seoTitle}
        description={seoDescription}
        pathByLanguage={{
          ko: '/ko/ziwei/stars',
          en: '/en/ziwei/stars',
          ja: '/ja/ziwei/stars',
          zh: '/zh/ziwei/stars',
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

        {/* Ziwei Series */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">{labels.ziweiSeries}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {ZIWEI_SERIES_STARS.map(renderStarCard)}
          </div>
        </section>

        {/* Tianfu Series */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">{labels.tianfuSeries}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {TIANFU_SERIES_STARS.map(renderStarCard)}
          </div>
        </section>
      </div>
    </div>
  )
}
