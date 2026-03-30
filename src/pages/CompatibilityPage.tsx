import { useParams, Link, Navigate } from 'react-router'
import { useI18n, type Language } from '../i18n'
import SeoHead from '../components/SeoHead'
import {
  SLUG_TO_STEM,
  COMPAT_SLUGS,
  COMPAT_CONTENT,
  COMPAT_OVERVIEW,
  COMPAT_LABELS,
  STEMS,
  getTenGodRelation,
} from '../content/compatibility-content'
import { STEM_INFO } from '@orrery/core/constants'

const ELEMENT_COLOR: Record<string, { bg: string; text: string; badge: string; ring: string }> = {
  tree: { bg: 'bg-green-50 dark:bg-green-950/30', text: 'text-green-700 dark:text-green-400', badge: 'badge-success', ring: 'ring-green-300' },
  fire: { bg: 'bg-red-50 dark:bg-red-950/30', text: 'text-red-700 dark:text-red-400', badge: 'badge-error', ring: 'ring-red-300' },
  earth: { bg: 'bg-yellow-50 dark:bg-yellow-950/30', text: 'text-yellow-700 dark:text-yellow-400', badge: 'badge-warning', ring: 'ring-yellow-300' },
  metal: { bg: 'bg-gray-50 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-400', badge: 'badge-neutral', ring: 'ring-gray-300' },
  water: { bg: 'bg-blue-50 dark:bg-blue-950/30', text: 'text-blue-700 dark:text-blue-400', badge: 'badge-info', ring: 'ring-blue-300' },
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

const STEM_KR = '갑을병정무기경신임계'

function getScoreColor(score: number): string {
  if (score >= 4) return 'text-success'
  if (score === 3) return 'text-warning'
  return 'text-error'
}

function getScoreBg(score: number): string {
  if (score >= 4) return 'bg-success/10 border-success/30'
  if (score === 3) return 'bg-warning/10 border-warning/30'
  return 'bg-error/10 border-error/30'
}

function ScoreDots({ score }: { score: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full ${
            i <= score
              ? score >= 4
                ? 'bg-success'
                : score === 3
                  ? 'bg-warning'
                  : 'bg-error'
              : 'bg-base-300'
          }`}
        />
      ))}
    </div>
  )
}

const TEN_GOD_LABELS: Record<string, Record<Language, string>> = {
  '比肩': { ko: '비견', en: 'Bi-gyeon', ja: '比肩', zh: '比肩' },
  '劫財': { ko: '겁재', en: 'Geop-jae', ja: '劫財', zh: '劫财' },
  '食神': { ko: '식신', en: 'Sik-sin', ja: '食神', zh: '食神' },
  '傷官': { ko: '상관', en: 'Sang-gwan', ja: '傷官', zh: '伤官' },
  '偏財': { ko: '편재', en: 'Pyeon-jae', ja: '偏財', zh: '偏财' },
  '正財': { ko: '정재', en: 'Jeong-jae', ja: '正財', zh: '正财' },
  '偏官': { ko: '편관', en: 'Pyeon-gwan', ja: '偏官', zh: '偏官' },
  '正官': { ko: '정관', en: 'Jeong-gwan', ja: '正官', zh: '正官' },
  '偏印': { ko: '편인', en: 'Pyeon-in', ja: '偏印', zh: '偏印' },
  '正印': { ko: '정인', en: 'Jeong-in', ja: '正印', zh: '正印' },
}

export default function CompatibilityPage() {
  const { stemId } = useParams<{ stemId: string }>()
  const { t, language } = useI18n()
  const { lang } = useParams()
  const currentLang = (lang || language) as Language
  const isKo = currentLang === 'ko'
  const isJa = currentLang === 'ja'
  const isZh = currentLang === 'zh'

  if (!stemId || !SLUG_TO_STEM[stemId]) {
    return <Navigate to={`/${currentLang}/compatibility`} replace />
  }

  const stem = SLUG_TO_STEM[stemId]
  const stemInfo = STEM_INFO[stem]
  const colors = ELEMENT_COLOR[stemInfo.element]
  const overview = COMPAT_OVERVIEW[stem][currentLang]
  const labels = COMPAT_LABELS[currentLang]
  const stemIdx = STEMS.indexOf(stem as typeof STEMS[number])
  const stemKr = STEM_KR[stemIdx]

  const seoTitle = isKo
    ? `${overview.title} - 사주 일간 궁합`
    : isJa
      ? `${overview.title} - 四柱推命日干相性`
      : isZh
        ? `${overview.title} - 四柱八字日干合盘`
        : `${overview.title} - Saju Day Master Compatibility`

  const seoDescription = isKo
    ? `${stemKr}(${stem}) 일간과 다른 천간의 궁합을 알아보세요. ${overview.overview}`
    : overview.overview

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
        item: `https://saju-wheat.vercel.app/${currentLang}/compatibility`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: overview.title,
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
          ko: `/ko/compatibility/${stemId}`,
          en: `/en/compatibility/${stemId}`,
          ja: `/ja/compatibility/${stemId}`,
          zh: `/zh/compatibility/${stemId}`,
        }}
        structuredData={breadcrumbData}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex items-center gap-2 mb-6">
          <Link to={`/${currentLang}/compatibility`} className="btn btn-ghost btn-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {isKo ? '일간 궁합' : isJa ? '日干相性' : isZh ? '日干合盘' : 'Compatibility'}
          </Link>
        </div>

        {/* Header */}
        <div className={`card ${colors.bg} border border-base-300 mb-8`}>
          <div className="card-body">
            <div className="flex items-center gap-4 mb-4">
              <div className={`text-5xl font-bold font-hanja ${colors.text}`}>{stem}</div>
              <div>
                <h1 className="text-2xl font-bold">{overview.title}</h1>
                <p className="text-base-content/60 text-sm">
                  {overview.subtitle} · {YINYANG_LABEL[currentLang][stemInfo.yinyang]} {ELEMENT_LABEL[currentLang][stemInfo.element]}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-sm font-semibold text-base-content/50 mb-1">{labels.overview}</h2>
              <p className="text-base-content/80">{overview.overview}</p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="font-semibold text-success">{labels.bestMatch}:</span>{' '}
                <span className="font-hanja">{overview.bestMatch}</span>
              </div>
              <div>
                <span className="font-semibold text-error">{labels.cautionMatch}:</span>{' '}
                <span className="font-hanja">{overview.cautionMatch}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compatibility Grid */}
        <div className="space-y-4">
          {STEMS.map((targetStem) => {
            const entry = COMPAT_CONTENT[stem][targetStem][currentLang]
            const targetInfo = STEM_INFO[targetStem]
            const targetColors = ELEMENT_COLOR[targetInfo.element]
            const tenGod = getTenGodRelation(stem, targetStem)
            const tenGodLabel = TEN_GOD_LABELS[tenGod]?.[currentLang] || tenGod
            const targetIdx = STEMS.indexOf(targetStem as typeof STEMS[number])
            const targetKr = STEM_KR[targetIdx]
            const targetSlug = COMPAT_SLUGS[targetStem]

            return (
              <div
                key={targetStem}
                className={`card border ${getScoreBg(entry.score)} shadow-sm`}
              >
                <div className="card-body p-4 sm:p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/${currentLang}/compatibility/${targetSlug}`}
                        className={`text-3xl font-bold font-hanja ${targetColors.text} hover:opacity-70 transition-opacity`}
                      >
                        {targetStem}
                      </Link>
                      <div>
                        <div className="font-semibold">
                          {isKo ? `${targetKr}(${targetStem})` : targetStem}
                          <span className="text-base-content/50 text-sm ml-2">
                            {YINYANG_LABEL[currentLang][targetInfo.yinyang]} {ELEMENT_LABEL[currentLang][targetInfo.element]}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`badge badge-xs ${targetColors.badge}`}>
                            {labels.tenGod}: {tenGodLabel} ({tenGod})
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <ScoreDots score={entry.score} />
                      <div className={`text-xs font-semibold mt-1 ${getScoreColor(entry.score)}`}>
                        {labels.scoreLabels[entry.score]}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-base-content/80 mb-3">{entry.summary}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="bg-success/5 rounded-lg p-3">
                      <div className="font-semibold text-success text-xs mb-1">{labels.strength}</div>
                      <p className="text-base-content/70">{entry.strength}</p>
                    </div>
                    <div className="bg-error/5 rounded-lg p-3">
                      <div className="font-semibold text-error text-xs mb-1">{labels.challenge}</div>
                      <p className="text-base-content/70">{entry.challenge}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="card bg-base-100 border border-base-300 mt-8">
          <div className="card-body text-center">
            <p className="text-base-content/70 mb-3">{labels.ctaText}</p>
            <Link to={`/${currentLang}/`} className="btn btn-primary btn-sm w-fit mx-auto">
              {labels.ctaButton}
            </Link>
          </div>
        </div>

        {/* Other Day Masters */}
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">
            {isKo ? '다른 일간 보기' : isJa ? '他の日干を見る' : isZh ? '查看其他日干' : 'Other Day Masters'}
          </h2>
          <div className="flex flex-wrap gap-2">
            {STEMS.filter((s) => s !== stem).map((s) => {
              const sInfo = STEM_INFO[s]
              const sColors = ELEMENT_COLOR[sInfo.element]
              const sIdx = STEMS.indexOf(s as typeof STEMS[number])
              return (
                <Link
                  key={s}
                  to={`/${currentLang}/compatibility/${COMPAT_SLUGS[s]}`}
                  className={`btn btn-sm ${sColors.bg} ${sColors.text} border ${sColors.ring.replace('ring', 'border')}`}
                >
                  <span className="font-hanja">{s}</span>
                  {isKo && <span className="text-xs">{STEM_KR[sIdx]}</span>}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
