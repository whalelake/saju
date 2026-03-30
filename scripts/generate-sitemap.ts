import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ARTICLE_IDS } from '../src/content/article-catalog'

const ZIWEI_STAR_SLUGS = [
  'zi-wei', 'tian-ji', 'tai-yang', 'wu-qu', 'tian-tong', 'lian-zhen',
  'tian-fu', 'tai-yin', 'tan-lang', 'ju-men', 'tian-xiang', 'tian-liang',
  'qi-sha', 'po-jun',
]

const SIPSIN_SLUGS = [
  'bi-gyeon', 'geop-jae', 'sik-sin', 'sang-gwan', 'pyeon-jae',
  'jeong-jae', 'pyeon-gwan', 'jeong-gwan', 'pyeon-in', 'jeong-in',
]

const PILLAR_SLUGS = [
  'gap-ja', 'eul-chuk', 'byeong-in', 'jeong-myo', 'mu-jin',
  'gi-sa', 'gyeong-o', 'sin-mi', 'im-sin', 'gye-yu',
  'gap-sul', 'eul-hae', 'byeong-ja', 'jeong-chuk', 'mu-in',
  'gi-myo', 'gyeong-jin', 'sin-sa', 'im-o', 'gye-mi',
  'gap-sin', 'eul-yu', 'byeong-sul', 'jeong-hae', 'mu-ja',
  'gi-chuk', 'gyeong-in', 'sin-myo', 'im-jin', 'gye-sa',
  'gap-o', 'eul-mi', 'byeong-sin', 'jeong-yu', 'mu-sul',
  'gi-hae', 'gyeong-ja', 'sin-chuk', 'im-in', 'gye-myo',
  'gap-jin', 'eul-sa', 'byeong-o', 'jeong-mi', 'mu-sin',
  'gi-yu', 'gyeong-sul', 'sin-hae', 'im-ja', 'gye-chuk',
  'gap-in', 'eul-myo', 'byeong-jin', 'jeong-sa', 'mu-o',
  'gi-mi', 'gyeong-sin', 'sin-yu', 'im-sul', 'gye-hae',
]

const SITE_URL = 'https://saju-wheat.vercel.app'
const LANGUAGES = ['ko', 'en', 'ja', 'zh'] as const
const LASTMOD = new Date().toISOString().slice(0, 10)

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
  sharedPathGroup('/guide/saju', 'monthly', '0.8'),
  sharedPathGroup('/guide/ziwei', 'monthly', '0.8'),
  sharedPathGroup('/guide/natal', 'monthly', '0.8'),
  sharedPathGroup('/articles', 'weekly', '0.9'),
  sharedPathGroup('/privacy', 'yearly', '0.3'),
  sharedPathGroup('/terms', 'yearly', '0.3'),
  sharedPathGroup('/dream', 'weekly', '0.85'),
  ...ARTICLE_IDS.map((articleId) =>
    sharedPathGroup(`/articles/${articleId}`, 'monthly', '0.8'),
  ),
  sharedPathGroup('/pillars', 'weekly', '0.9'),
  ...PILLAR_SLUGS.map((slug) =>
    sharedPathGroup(`/pillars/${slug}`, 'monthly', '0.8'),
  ),
  sharedPathGroup('/ziwei/stars', 'weekly', '0.9'),
  ...ZIWEI_STAR_SLUGS.map((slug) =>
    sharedPathGroup(`/ziwei/stars/${slug}`, 'monthly', '0.8'),
  ),
  sharedPathGroup('/sipsin', 'weekly', '0.9'),
  ...SIPSIN_SLUGS.map((slug) =>
    sharedPathGroup(`/sipsin/${slug}`, 'monthly', '0.8'),
  ),
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
