/**
 * inject-seo.ts
 *
 * Vercel에서 puppeteer 없이 실행 가능한 경량 SEO 주입 스크립트.
 * 빌드된 dist/index.html을 읽고, 각 라우트별 디렉토리에
 * 올바른 canonical, hreflang, title, description, og 태그가 포함된
 * index.html을 생성합니다.
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { ARTICLE_CATALOG, ARTICLE_IDS } from '../src/content/article-catalog'
import { ko } from '../src/i18n/ko'
import { en } from '../src/i18n/en'
import { ja } from '../src/i18n/ja'
import { zh } from '../src/i18n/zh'

const DIST_DIR = join(process.cwd(), 'dist')
const SITE_URL = 'https://saju-wheat.vercel.app'
const LANGUAGES = ['ko', 'en', 'ja', 'zh'] as const
type Lang = (typeof LANGUAGES)[number]

const i18n: Record<Lang, typeof ko> = { ko, en, ja, zh }

const OG_LOCALE: Record<Lang, string> = {
  ko: 'ko_KR',
  en: 'en_US',
  ja: 'ja_JP',
  zh: 'zh_CN',
}

interface RouteSeo {
  suffix: string
  title: Record<Lang, string>
  description: Record<Lang, string>
  type: 'website' | 'article'
}

function homeSeo(): RouteSeo {
  return {
    suffix: '/',
    title: {
      ko: '명운판 - 무료 사주팔자 · 자미두수 · 점성술 AI 해석',
      en: 'Myungunpan - Free Saju, Zi Wei Dou Shu, and Natal Chart AI Readings',
      ja: '命運盤 - 無料の四柱推命・紫微斗数・出生チャート AI 解釈',
      zh: '命运盘 - 免费四柱八字、紫微斗数、出生图 AI 解读',
    },
    description: {
      ko: '무료 사주팔자, 자미두수, 서양 점성술 계산과 AI 해석을 한 번에. 출생 시간 모름 옵션, 오늘의 AI 운세, 관련 가이드와 기사까지 제공합니다.',
      en: 'Calculate Saju, Zi Wei Dou Shu, and Western natal charts for free, then continue into AI interpretation, daily fortune prompts, guides, and articles.',
      ja: '四柱推命、紫微斗数、西洋占星術の出生チャートを無料で計算し、そのままAI解釈、今日の運勢、ガイド記事へ進めます。',
      zh: '免费计算四柱八字、紫微斗数与西方出生图，并继续查看 AI 解读、今日运势、指南和文章。',
    },
    type: 'website',
  }
}

function staticPageSeo(suffix: string, titleKey: string): RouteSeo {
  const titles: Record<string, Record<Lang, string>> = {
    '/guide': {
      ko: '명리학 가이드 | 명운판',
      en: 'Fortune Guide | Myungunpan',
      ja: '命理学ガイド | 命運盤',
      zh: '命理学指南 | 命运盘',
    },
    '/guide/saju': {
      ko: '사주팔자 가이드 | 명운판',
      en: 'Saju Guide | Myungunpan',
      ja: '四柱推命ガイド | 命運盤',
      zh: '四柱八字指南 | 命运盘',
    },
    '/guide/ziwei': {
      ko: '자미두수 가이드 | 명운판',
      en: 'Zi Wei Dou Shu Guide | Myungunpan',
      ja: '紫微斗数ガイド | 命運盤',
      zh: '紫微斗数指南 | 命运盘',
    },
    '/guide/natal': {
      ko: '출생차트 가이드 | 명운판',
      en: 'Natal Chart Guide | Myungunpan',
      ja: '出生チャートガイド | 命運盤',
      zh: '出生图指南 | 命运盘',
    },
    '/articles': {
      ko: '명리학 이야기 | 명운판',
      en: 'Destiny Insights | Myungunpan',
      ja: '命理学のおはなし | 命運盤',
      zh: '命理学故事 | 命运盘',
    },
    '/privacy': {
      ko: '개인정보처리방침 | 명운판',
      en: 'Privacy Policy | Myungunpan',
      ja: 'プライバシーポリシー | 命運盤',
      zh: '隐私政策 | 命运盘',
    },
    '/terms': {
      ko: '이용약관 | 명운판',
      en: 'Terms of Service | Myungunpan',
      ja: '利用規約 | 命運盤',
      zh: '服务条款 | 命运盘',
    },
    '/dream': {
      ko: '꿈 해몽 - AI 꿈 해석 | 명운판',
      en: 'Dream Interpretation - AI Dream Analysis | Myungunpan',
      ja: '夢占い - AI 夢解釈 | 命運盤',
      zh: '解梦 - AI 梦境解读 | 命运盘',
    },
  }

  const descriptions: Record<Lang, string> = homeSeo().description

  return {
    suffix,
    title: titles[suffix] ?? titles['/guide']!,
    description: descriptions,
    type: 'website',
  }
}

function articleSeo(articleId: string): RouteSeo {
  const meta = ARTICLE_CATALOG.find((a) => a.id === articleId)
  if (!meta) throw new Error(`Article not found: ${articleId}`)

  const title: Record<Lang, string> = {} as Record<Lang, string>
  const description: Record<Lang, string> = {} as Record<Lang, string>

  for (const lang of LANGUAGES) {
    const article = i18n[lang].articles[meta.key as keyof typeof ko.articles] as
      | { title: string; intro: string }
      | undefined
    if (article && typeof article === 'object' && 'title' in article) {
      const brandSuffix = lang === 'ko' ? ' | 명운판' : lang === 'ja' ? ' | 命運盤' : lang === 'zh' ? ' | 命运盘' : ' | Myungunpan'
      title[lang] = article.title + brandSuffix
      description[lang] = article.intro
    } else {
      title[lang] = homeSeo().title[lang]
      description[lang] = homeSeo().description[lang]
    }
  }

  return { suffix: `/articles/${articleId}`, title, description, type: 'article' }
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function buildSeoBlock(lang: Lang, route: RouteSeo): string {
  const canonical = `${SITE_URL}/${lang}${route.suffix}`
  const hreflangs = LANGUAGES.map(
    (l) => `    <link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}${route.suffix}" />`,
  ).join('\n')

  return [
    `    <title>${escapeHtml(route.title[lang])}</title>`,
    `    <meta name="description" content="${escapeHtml(route.description[lang])}" />`,
    `    <meta name="robots" content="index, follow" />`,
    `    <link rel="canonical" href="${canonical}" />`,
    hreflangs,
    `    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/ko${route.suffix}" />`,
    `    <meta property="og:title" content="${escapeHtml(route.title[lang])}" />`,
    `    <meta property="og:description" content="${escapeHtml(route.description[lang])}" />`,
    `    <meta property="og:url" content="${canonical}" />`,
    `    <meta property="og:type" content="${route.type}" />`,
    `    <meta property="og:locale" content="${OG_LOCALE[lang]}" />`,
    `    <meta property="og:image" content="${SITE_URL}/og-image.png" />`,
  ].join('\n')
}

function injectIntoHtml(baseHtml: string, lang: Lang, route: RouteSeo): string {
  let html = baseHtml

  // Replace <html lang="ko"> with correct language
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)

  // Replace <title>...</title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(route.title[lang])}</title>`)

  // Replace or add meta description
  if (html.includes('<meta name="description"')) {
    html = html.replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${escapeHtml(route.description[lang])}" />`,
    )
  }

  // Insert canonical + hreflang + og tags before </head>
  const seoBlock = [
    `    <link rel="canonical" href="${SITE_URL}/${lang}${route.suffix}" />`,
    ...LANGUAGES.map(
      (l) => `    <link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}${route.suffix}" />`,
    ),
    `    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/ko${route.suffix}" />`,
    `    <meta property="og:title" content="${escapeHtml(route.title[lang])}" />`,
    `    <meta property="og:description" content="${escapeHtml(route.description[lang])}" />`,
    `    <meta property="og:url" content="${SITE_URL}/${lang}${route.suffix}" />`,
    `    <meta property="og:type" content="${route.type}" />`,
    `    <meta property="og:locale" content="${OG_LOCALE[lang]}" />`,
    `    <meta property="og:image" content="${SITE_URL}/og-image.png" />`,
  ].join('\n')

  html = html.replace('</head>', `${seoBlock}\n  </head>`)

  return html
}

async function main() {
  const baseHtml = await readFile(join(DIST_DIR, 'index.html'), 'utf8')

  const routes: RouteSeo[] = [
    homeSeo(),
    ...['/guide', '/guide/saju', '/guide/ziwei', '/guide/natal', '/articles', '/privacy', '/terms', '/dream'].map(
      (s) => staticPageSeo(s, s),
    ),
    ...ARTICLE_IDS.map((id) => articleSeo(id)),
  ]

  let count = 0

  for (const route of routes) {
    for (const lang of LANGUAGES) {
      const path = `/${lang}${route.suffix}`
      const filePath = path.endsWith('/')
        ? join(DIST_DIR, path, 'index.html')
        : join(DIST_DIR, `${path}/index.html`)

      const html = injectIntoHtml(baseHtml, lang, route)
      await mkdir(dirname(filePath), { recursive: true })
      await writeFile(filePath, html, 'utf8')
      count++
    }
  }

  console.log(`SEO injected into ${count} route files.`)
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
