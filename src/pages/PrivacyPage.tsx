import { Link, useParams } from 'react-router'
import { useI18n } from '../i18n'

export default function PrivacyPage() {
  const { t, language } = useI18n()
  const { lang } = useParams()

  return (
    <div className="min-h-screen bg-base-200">
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
