import { Link, useParams } from 'react-router'
import { useI18n } from '../i18n'
import SeoHead from '../components/SeoHead'

export default function PrivacyPage() {
  const { t, language } = useI18n()
  const { lang } = useParams()
  const currentLang = (lang || language) as 'ko' | 'en' | 'ja' | 'zh'
  const seoTitle = currentLang === 'ko'
    ? '개인정보처리방침 | 명운판'
    : currentLang === 'ja'
      ? 'プライバシーポリシー | 命運盤'
      : currentLang === 'zh'
        ? '隐私政策 | 命运盘'
        : 'Privacy Policy | Myungunpan'
  const seoDescription = currentLang === 'ko'
    ? '명운판의 개인정보 처리, 광고 쿠키, 문의 채널을 안내합니다.'
    : currentLang === 'ja'
      ? '命運盤の個人情報の取り扱い、広告 Cookie、問い合わせ窓口を案内します。'
      : currentLang === 'zh'
        ? '说明命运盘如何处理个人信息、广告 Cookie 以及隐私相关联系渠道。'
        : 'Details how Myungunpan handles personal data, ad cookies, and privacy requests.'

  return (
    <div className="min-h-screen bg-base-200">
      <SeoHead
        language={currentLang}
        title={seoTitle}
        description={seoDescription}
        pathByLanguage={{
          ko: '/ko/privacy',
          en: '/en/privacy',
          ja: '/ja/privacy',
          zh: '/zh/privacy',
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
            <h1 className="text-2xl font-bold mb-2">{t.privacy.title}</h1>
            <p className="text-sm text-base-content/70 mb-6">{t.privacy.effectiveDate}</p>

            <div className="prose prose-sm max-w-none">
              <h2>{t.privacy.section1Title}</h2>
              <p>{t.privacy.section1Intro}</p>
              <ul>
                {t.privacy.section1Items.split('|').map((item, i) => {
                  const [key, ...rest] = item.split(':')
                  return <li key={i}><strong>{key}:</strong>{rest.join(':')}</li>
                })}
              </ul>

              <h2>{t.privacy.section2Title}</h2>
              <p>{t.privacy.section2Text}</p>

              <h2>{t.privacy.section3Title}</h2>
              <p>{t.privacy.section3Text}</p>

              <h2>{t.privacy.section4Title}</h2>
              <p>{t.privacy.section4Text}</p>
              <ul>
                {t.privacy.section4Links.split('|').map((item, i) => (
                  <li key={i}>
                    {i === 0 ? (
                      <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="link link-primary">{item}</a>
                    ) : (
                      <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="link link-primary">{item}</a>
                    )}
                  </li>
                ))}
              </ul>

              <h2>{t.privacy.section5Title}</h2>
              <p>{t.privacy.section5Text}</p>

              <h2>{t.privacy.section6Title}</h2>
              <p>{t.privacy.section6Text}</p>
              <p>
                <a href="https://github.com/whalelake/saju/issues" target="_blank" rel="noopener noreferrer" className="link link-primary">
                  https://github.com/whalelake/saju/issues
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
