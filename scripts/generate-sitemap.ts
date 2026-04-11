import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ARTICLE_IDS } from '../src/content/article-catalog'

const SITE_URL = 'https://saju-wheat.vercel.app'
const LANGUAGES = ['ko', 'en', 'ja', 'zh'] as const
const LASTMOD = new Date().toISOString().slice(0, 10)

const GUIDE_ROUTE_SUFFIXES = [
  '/guide/saju',
  '/guide/saju/ten-gods',
  '/guide/saju/day-master',
  '/guide/ziwei',
  '/guide/ziwei/12-palaces',
  '/guide/natal',
  '/guide/natal/planets',
  '/guide/natal/houses',
]

const TRUST_ROUTE_SUFFIXES = [
  '/about',
  '/contact',
  '/editorial-policy',
]

type Language = (typeof LANGUAGES)[number]

type RouteGroup = {
  pathsByLanguage: Record<Language, string>
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: string
}

const sharedPathGroup = (
  suffix: string,
  changefreq: RouteGroup['changefreq'],
  priority: RouteGroup['priority'],
): RouteGroup => ({
  pathsByLanguage: {
    ko: `/ko${suffix}`,
    en: `/en${suffix}`,
    ja: `/ja${suffix}`,
    zh: `/zh${suffix}`,
  },
  changefreq,
  priority,
})

const routeGroups: RouteGroup[] = [
  sharedPathGroup('/', 'weekly', '1.0'),
  sharedPathGroup('/guide', 'weekly', '0.9'),
  ...GUIDE_ROUTE_SUFFIXES.map((suffix) =>
    sharedPathGroup(suffix, 'monthly', '0.8'),
  ),
  sharedPathGroup('/articles', 'weekly', '0.9'),
  ...TRUST_ROUTE_SUFFIXES.map((suffix) =>
    sharedPathGroup(suffix, 'monthly', '0.5'),
  ),
  sharedPathGroup('/privacy', 'yearly', '0.3'),
  sharedPathGroup('/terms', 'yearly', '0.3'),
  sharedPathGroup('/dream', 'weekly', '0.85'),
  ...ARTICLE_IDS.map((articleId) =>
    sharedPathGroup(`/articles/${articleId}`, 'monthly', '0.8'),
  ),
  sharedPathGroup('/pillars', 'weekly', '0.9'),
  sharedPathGroup('/ziwei/stars', 'weekly', '0.9'),
  sharedPathGroup('/sipsin', 'weekly', '0.9'),
  sharedPathGroup('/fortune', 'weekly', '0.9'),
  sharedPathGroup('/fortune/2025', 'monthly', '0.7'),
  sharedPathGroup('/fortune/2026', 'weekly', '0.9'),
]

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function buildUrlEntry(group: RouteGroup, language: Language) {
  const loc = `${SITE_URL}${group.pathsByLanguage[language]}`
  const alternateLinks = LANGUAGES.map((lang) => {
    const href = `${SITE_URL}${group.pathsByLanguage[lang]}`
    return `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(href)}" />`
  }).join('\n')

  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${LASTMOD}</lastmod>`,
    `    <changefreq>${group.changefreq}</changefreq>`,
    `    <priority>${group.priority}</priority>`,
    alternateLinks,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(
      `${SITE_URL}${group.pathsByLanguage.ko}`,
    )}" />`,
    '  </url>',
  ].join('\n')
}

function buildPagesSitemap() {
  const entries = routeGroups.flatMap((group) =>
    LANGUAGES.map((language) => buildUrlEntry(group, language)),
  )

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n')
}

function buildSitemapIndex() {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <sitemap>',
    `    <loc>${SITE_URL}/sitemap-pages.xml</loc>`,
    `    <lastmod>${LASTMOD}</lastmod>`,
    '  </sitemap>',
    '</sitemapindex>',
    '',
  ].join('\n')
}

async function main() {
  const publicDir = join(process.cwd(), 'public')
  await mkdir(publicDir, { recursive: true })
  await writeFile(join(publicDir, 'sitemap-pages.xml'), buildPagesSitemap(), 'utf8')
  await writeFile(join(publicDir, 'sitemap.xml'), buildSitemapIndex(), 'utf8')
  console.log(`Generated sitemap index and pages sitemap (${LASTMOD}).`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
