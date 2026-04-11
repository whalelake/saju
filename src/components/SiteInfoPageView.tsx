import { Link, useParams } from 'react-router'
import { useI18n, type Language } from '../i18n'
import Breadcrumb from './Breadcrumb'
import SeoHead from './SeoHead'
import {
  SITE_PAGE_CONTENT,
  getSitePagePathByLanguage,
  type SitePageKey,
} from '../content/site-pages'

interface SiteInfoPageViewProps {
  pageKey: SitePageKey
}

function resolveHref(language: Language, href: string) {
  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')) {
    return href
  }
  return `/${language}${href}`
}

export default function SiteInfoPageView({ pageKey }: SiteInfoPageViewProps) {
  const { language: currentLanguage, t } = useI18n()
  const { lang } = useParams<{ lang: string }>()
  const language = (lang || currentLanguage) as Language
  const content = SITE_PAGE_CONTENT[pageKey][language] ?? SITE_PAGE_CONTENT[pageKey].ko
  const pathByLanguage = getSitePagePathByLanguage(pageKey)

  return (
    <div className="min-h-screen bg-base-200">
      <SeoHead
        language={language}
        title={`${content.title} | ${language === 'ko' ? '명운판' : 'Myungunpan'}`}
        description={content.description}
        pathByLanguage={pathByLanguage}
      />

      <header className="navbar bg-base-100 border-b border-base-300 sticky top-0 z-40">
        <div className="navbar-start">
          <Link to={`/${language}/`} className="btn btn-ghost text-xl font-hanja">
            {t.hero.title}
          </Link>
        </div>
        <div className="navbar-end">
          <Link to={`/${language}/`} className="btn btn-primary btn-sm">
            {t.hero.cta}
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: content.navLabel },
          ]}
        />

        <article className="card bg-base-100 border-oriental">
          <div className="card-body gap-8">
            <header className="border-b border-base-300 pb-6">
              <h1 className="text-3xl font-bold text-base-content">{content.title}</h1>
              <p className="mt-3 text-base text-base-content/75 leading-relaxed">
                {content.description}
              </p>
              <p className="mt-4 text-sm text-base-content/65 leading-relaxed">
                {content.intro}
              </p>
            </header>

            <div className="space-y-8">
              {content.sections.map((section) => (
                <section key={section.heading} className="space-y-4">
                  <h2 className="text-xl font-semibold text-base-content">{section.heading}</h2>
                  <div className="space-y-3 text-base-content/80 leading-relaxed">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-2 rounded-2xl bg-base-200/60 px-4 py-4 text-sm text-base-content/80">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span className="text-primary shrink-0">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.links && section.links.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {section.links.map((link) => (
                        <a
                          key={link.label + link.href}
                          href={resolveHref(language, link.href)}
                          className="btn btn-outline btn-sm"
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noopener noreferrer' : undefined}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>

            <section className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-5 sm:p-6">
              <h2 className="text-xl font-bold text-base-content">
                {language === 'ko' ? '바로 이어서 보기' :
                 language === 'ja' ? '続けて見る' :
                 language === 'zh' ? '继续查看' :
                 'Continue browsing'}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {content.ctaLinks.map((link) => (
                  <a
                    key={link.label + link.href}
                    href={resolveHref(language, link.href)}
                    className="btn btn-primary btn-sm"
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </section>
          </div>
        </article>
      </main>
    </div>
  )
}
