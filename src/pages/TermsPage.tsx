import { Link, useParams } from 'react-router'
import { useI18n } from '../i18n'
import SeoHead from '../components/SeoHead'

export default function TermsPage() {
  const { t, language } = useI18n()
  const { lang } = useParams()
  const currentLang = (lang || language) as 'ko' | 'en' | 'ja' | 'zh'
  const seoTitle = currentLang === 'ko'
    ? '이용약관 | 명운판'
    : currentLang === 'ja'
      ? '利用規約 | 命運盤'
      : currentLang === 'zh'
        ? '服务条款 | 命运盘'
        : 'Terms of Service | Myungunpan'
  const seoDescription = currentLang === 'ko'
    ? '명운판 서비스 이용 조건과 책임 범위를 정리한 이용약관입니다.'
    : currentLang === 'ja'
      ? '命運盤の利用条件と責任範囲をまとめた利用規約です。'
      : currentLang === 'zh'
        ? '整理命运盘服务使用条件与责任范围的条款页面。'
        : 'The terms of service for using Myungunpan and its chart tools.'

  return (
    <div className="min-h-screen bg-base-200">
      <SeoHead
        language={currentLang}
        title={seoTitle}
        description={seoDescription}
        pathByLanguage={{
          ko: '/ko/terms',
          en: '/en/terms',
          ja: '/ja/terms',
          zh: '/zh/terms',
        }}
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link to={`/${lang || language}/`} className="btn btn-ghost btn-sm mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t.common.close}
        </Link>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h1 className="text-2xl font-bold mb-2">{t.terms.title}</h1>
            <p className="text-sm text-base-content/70 mb-6">{t.terms.effectiveDate}</p>

            <div className="prose prose-sm max-w-none">
              <h2>{t.terms.article1Title}</h2>
              <p>{t.terms.article1Text}</p>

              <h2>{t.terms.article2Title}</h2>
              <p>{t.terms.article2Intro}</p>
              <ul>
                {t.terms.article2Items.split('|').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h2>{t.terms.article3Title}</h2>
              <p>{t.terms.article3Text}</p>

              <h2>{t.terms.article4Title}</h2>
              <ol>
                {t.terms.article4Items.split('|').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>

              <h2>{t.terms.article5Title}</h2>
              <p>{t.terms.article5Text}</p>
              <p>
                <a href="https://github.com/whalelake/saju" target="_blank" rel="noopener noreferrer" className="link link-primary">
                  https://github.com/whalelake/saju
                </a>
              </p>

              <h2>{t.terms.article6Title}</h2>
              <p>{t.terms.article6Text}</p>

              <h2>{t.terms.article7Title}</h2>
              <p>{t.terms.article7Text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
