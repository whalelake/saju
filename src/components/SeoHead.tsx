import { useEffect } from 'react'
import type { Language } from '../i18n'

const SITE_URL = 'https://saju-wheat.vercel.app'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

type StructuredData = Record<string, unknown> | Array<Record<string, unknown>>

interface Props {
  language: Language
  title: string
  description: string
  pathByLanguage: Record<Language, string>
  type?: 'website' | 'article'
  structuredData?: StructuredData
}

const OG_LOCALE: Record<Language, string> = {
  ko: 'ko_KR',
  en: 'en_US',
  ja: 'ja_JP',
  zh: 'zh_CN',
}

function setMeta(selector: string, attributes: Record<string, string>, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement('meta')
    Object.entries(attributes).forEach(([key, value]) => {
      element?.setAttribute(key, value)
    })
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function setLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLLinkElement>(selector)

  if (!element) {
    element = document.createElement('link')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

function removeLinks(selector: string) {
  document.head.querySelectorAll(selector).forEach((node) => node.remove())
}

function buildAbsoluteUrl(path: string) {
  return `${SITE_URL}${path}`
}

export default function SeoHead({
  language,
  title,
  description,
  pathByLanguage,
  type = 'website',
  structuredData,
}: Props) {
  useEffect(() => {
    const canonicalPath = pathByLanguage[language]
    const canonicalUrl = buildAbsoluteUrl(canonicalPath)

    document.title = title

    setMeta('meta[name="description"]', { name: 'description' }, description)
    setMeta('meta[name="robots"]', { name: 'robots' }, 'index, follow')
    setMeta('meta[property="og:title"]', { property: 'og:title' }, title)
    setMeta('meta[property="og:description"]', { property: 'og:description' }, description)
    setMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl)
    setMeta('meta[property="og:type"]', { property: 'og:type' }, type)
    setMeta('meta[property="og:locale"]', { property: 'og:locale' }, OG_LOCALE[language])
    setMeta('meta[property="og:image"]', { property: 'og:image' }, DEFAULT_OG_IMAGE)
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, title)
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description)
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, DEFAULT_OG_IMAGE)
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image')

    removeLinks('link[rel="canonical"]')
    removeLinks('link[rel="alternate"][hreflang]')

    setLink('link[rel="canonical"]', {
      rel: 'canonical',
      href: canonicalUrl,
    })

    ;(['ko', 'en', 'ja', 'zh'] as Language[]).forEach((langKey) => {
      setLink(`link[rel="alternate"][hreflang="${langKey}"]`, {
        rel: 'alternate',
        hreflang: langKey,
        href: buildAbsoluteUrl(pathByLanguage[langKey]),
      })
    })

    setLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: 'alternate',
      hreflang: 'x-default',
      href: buildAbsoluteUrl(pathByLanguage.ko),
    })

    const existingJsonLd = document.head.querySelector<HTMLScriptElement>('script[data-seo-json-ld="true"]')
    if (existingJsonLd) {
      existingJsonLd.remove()
    }

    if (structuredData) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-seo-json-ld', 'true')
      script.textContent = JSON.stringify(structuredData)
      document.head.appendChild(script)
    }
  }, [description, language, pathByLanguage, structuredData, title, type])

  return null
}

