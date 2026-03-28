import { Link, useParams } from 'react-router'
import { useI18n, type Language } from '../i18n'
import SeoHead from '../components/SeoHead'
import {
  SIPSIN_SLUGS,
  SIPSIN_PAIRS,
  SIPSIN_CONTENT,
  SIPSIN_LABELS,
  SIPSIN_RELATION_TYPE,
  RELATION_COLORS,
  RELATION_TYPE_LABELS,
} from '../content/sipsin-content'

export default function SipsinIndex() {
  const { t, language } = useI18n()
  const { lang } = useParams()
  const currentLang = (lang || language) as Language
  const isKo = currentLang === 'ko'
  const isJa = currentLang === 'ja'
  const isZh = currentLang === 'zh'

  const labels = SIPSIN_LABELS[currentLang]

  const seoTitle = isKo
    ? '십신(十神) 완전 가이드 - 사주 십신 해석'
    : isJa
      ? '十神完全ガイド - 四柱推命の十神解説'
      : isZh
        ? '十神完全指南 - 四柱八字十神详解'
        : 'Ten Gods (十神) Complete Guide - Saju Ten Gods Explained'

  const seoDescription = isKo
    ? '사주 십신(十神)의 의미와 성격, 직업, 연애 스타일을 알아보세요. 비견, 겁재, 식신, 상관, 편재, 정재, 편관, 정관, 편인, 정인 완전 해석.'
    : isJa
      ? '四柱推命の十神の意味と性格、仕事、恋愛スタイルを解説。比肩・劫財・食神・傷官・偏財・正財・偏官・正官・偏印・正印を徹底解説。'
      : isZh
        ? '了解四柱八字十神的含义与性格、事业、恋爱风格。比肩、劫财、食神、伤官、偏财、正财、偏官、正官、偏印、正印全面解析。'
        : 'Explore the Ten Gods (十神) of Saju — Bi-gyeon, Geop-jae, Sik-sin, Sang-gwan, and more. Personality, career, and relationship insights for each.'

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
          ko: '/ko/sipsin',
          en: '/en/sipsin',
          ja: '/ja/sipsin',
          zh: '/zh/sipsin',
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

        {SIPSIN_PAIRS.map(([left, right]) => {
          const relationType = SIPSIN_RELATION_TYPE[left]
          const colors = RELATION_COLORS[relationType]
          const groupLabel = RELATION_TYPE_LABELS[relationType][currentLang]

          return (
            <section key={left} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-bold">{groupLabel}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[left, right].map((hanja) => {
                  const content = SIPSIN_CONTENT[hanja][currentLang]
                  const slug = SIPSIN_SLUGS[hanja]

                  return (
                    <Link
                      key={hanja}
                      to={`/${currentLang}/sipsin/${slug}`}
                      className={`card ${colors.bg} shadow-sm hover:shadow-md transition-shadow`}
                    >
                      <div className="card-body p-5">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="text-xl font-bold font-hanja">{hanja}</div>
                            <div className="text-base font-semibold mt-0.5">{content.name}</div>
                          </div>
                          <span className={`badge ${colors.badge} badge-sm`}>
                            {content.interaction}
                          </span>
                        </div>
                        <p className={`text-sm ${colors.text} font-medium mb-2`}>
                          {content.nickname}
                        </p>
                        <p className="text-sm text-base-content/60 line-clamp-2">
                          {content.overview}
                        </p>
                      </div>
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
