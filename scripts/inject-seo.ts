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

function faqJsonLd(lang: Lang): string {
  const faqs: Record<Lang, Array<{ q: string; a: string }>> = {
    ko: [
      { q: '사주팔자와 자미두수의 차이점은 무엇인가요?', a: '사주팔자는 생년월일시를 천간지지로 변환하여 오행의 균형과 십신 관계를 분석합니다. 자미두수는 12궁의 명반에 108개의 별을 배치하여 인생의 각 영역(관록, 재백, 부처 등)을 상세히 분석합니다. 명운판에서는 두 방식을 모두 무료로 제공합니다.' },
      { q: '출생 시간을 모르면 어떻게 하나요?', a: "'시간 모름' 옵션을 선택하시면 시주(時柱)를 제외한 사주팔자 분석과 서양 점성술 출생차트를 확인하실 수 있습니다. 자미두수는 정확한 시간이 필요하여 이 경우 제공되지 않습니다." },
      { q: 'AI 해석은 어떻게 작동하나요?', a: 'GPT-4o 기반 AI가 사주팔자, 자미두수, 점성술 데이터를 종합 분석하여 성격, 적성, 운세를 쉬운 말로 풀어드립니다. 질문을 통해 특정 영역(연애운, 재물운, 직업운 등)에 대한 심층 해석도 가능합니다.' },
      { q: '개인정보는 안전한가요?', a: '모든 데이터는 사용자의 브라우저 로컬 스토리지에만 저장되며, 서버에는 어떠한 개인정보도 저장되지 않습니다. AI 해석 시에만 OpenAI API를 통해 일시적으로 데이터가 처리되며, 저장되지 않습니다.' },
    ],
    en: [
      { q: 'What is the difference between Saju and Zi Wei Dou Shu?', a: 'Saju (Four Pillars) converts your birth date and time into Heavenly Stems and Earthly Branches to analyze the balance of Five Elements. Zi Wei Dou Shu places 108 stars across 12 palaces to analyze different life areas. Myungunpan offers both for free.' },
      { q: 'What if I don\'t know my birth time?', a: 'Select the "Unknown time" option to get a Saju analysis excluding the Hour Pillar, plus a Western natal chart. Zi Wei Dou Shu requires an exact birth time and won\'t be available in this case.' },
      { q: 'How does the AI interpretation work?', a: 'Our GPT-4o-based AI analyzes your Saju, Zi Wei, and astrological data to provide personality insights, career guidance, and fortune readings in plain language. You can ask follow-up questions about specific areas like love, career, or finances.' },
      { q: 'Is my personal data safe?', a: 'All data is stored only in your browser\'s local storage. No personal information is saved on our servers. Data is temporarily processed through OpenAI\'s API only during AI interpretation and is not retained.' },
    ],
    ja: [
      { q: '四柱推命と紫微斗数の違いは何ですか？', a: '四柱推命は生年月日時を天干地支に変換し、五行のバランスと十神の関係を分析します。紫微斗数は12宮の命盤に108個の星を配置し、人生の各領域を詳細に分析します。命運盤では両方を無料で提供しています。' },
      { q: '出生時間がわからない場合はどうすればいいですか？', a: '「時間不明」オプションを選択すると、時柱を除いた四柱推命分析と西洋占星術の出生チャートをご確認いただけます。紫微斗数は正確な時間が必要なため、この場合はご利用いただけません。' },
      { q: 'AI解釈はどのように機能しますか？', a: 'GPT-4oベースのAIが四柱推命、紫微斗数、占星術のデータを総合分析し、性格、適性、運勢をわかりやすく解説します。恋愛運、財運、仕事運など特定の領域について深い解釈を求めることもできます。' },
      { q: '個人情報は安全ですか？', a: 'すべてのデータはユーザーのブラウザのローカルストレージにのみ保存され、サーバーには一切の個人情報が保存されません。AI解釈時のみOpenAI APIを通じて一時的にデータが処理され、保存されません。' },
    ],
    zh: [
      { q: '四柱八字和紫微斗数有什么区别？', a: '四柱八字将出生日期时间转换为天干地支，分析五行平衡与十神关系。紫微斗数在12宫命盘上放置108颗星，详细分析人生各个领域。命运盘免费提供这两种分析。' },
      { q: '不知道出生时间怎么办？', a: '选择"时间未知"选项，可以获得不含时柱的四柱八字分析和西方占星出生图。紫微斗数需要准确的出生时间，在这种情况下无法使用。' },
      { q: 'AI解读是如何工作的？', a: '基于GPT-4o的AI综合分析您的四柱八字、紫微斗数和占星数据，用通俗易懂的语言解读性格、适性和运势。您还可以就恋爱、财运、事业等特定领域提出深入问题。' },
      { q: '个人信息安全吗？', a: '所有数据仅存储在用户浏览器的本地存储中，服务器不保存任何个人信息。仅在AI解读时通过OpenAI API临时处理数据，且不会被保存。' },
    ],
  }

  const items = faqs[lang]
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
}

function articleJsonLd(lang: Lang, route: RouteSeo): string {
  const brandName = lang === 'ko' ? '명운판' : lang === 'ja' ? '命運盤' : lang === 'zh' ? '命运盘' : 'Myungunpan'
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: route.title[lang].replace(/ \| .*$/, ''),
    description: route.description[lang],
    inLanguage: lang,
    mainEntityOfPage: `${SITE_URL}/${lang}${route.suffix}`,
    url: `${SITE_URL}/${lang}${route.suffix}`,
    dateModified: new Date().toISOString().split('T')[0],
    author: { '@type': 'Organization', name: brandName },
    publisher: { '@type': 'Organization', name: brandName, logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.png` } },
    image: `${SITE_URL}/og-image.png`,
  }
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
}

function breadcrumbJsonLd(lang: Lang, route: RouteSeo): string {
  const homeName = lang === 'ko' ? '홈' : lang === 'ja' ? 'ホーム' : lang === 'zh' ? '首页' : 'Home'
  const items: Array<{ name: string; item?: string }> = [
    { name: homeName, item: `${SITE_URL}/${lang}/` },
  ]

  if (route.suffix.startsWith('/articles/')) {
    const articlesName = lang === 'ko' ? '기사' : lang === 'ja' ? '記事' : lang === 'zh' ? '文章' : 'Articles'
    items.push({ name: articlesName, item: `${SITE_URL}/${lang}/articles` })
    items.push({ name: route.title[lang].replace(/ \| .*$/, '') })
  } else if (route.suffix.startsWith('/guide')) {
    const guideName = lang === 'ko' ? '가이드' : lang === 'ja' ? 'ガイド' : lang === 'zh' ? '指南' : 'Guide'
    if (route.suffix === '/guide') {
      items.push({ name: guideName })
    } else {
      items.push({ name: guideName, item: `${SITE_URL}/${lang}/guide` })
      items.push({ name: route.title[lang].replace(/ \| .*$/, '') })
    }
  } else if (route.suffix !== '/') {
    items.push({ name: route.title[lang].replace(/ \| .*$/, '') })
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.item ? { item: item.item } : {}),
    })),
  }

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
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

  // Remove hardcoded FAQPage JSON-LD from base HTML (it will be re-injected per language)
  if (route.suffix === '/') {
    html = html.replace(/<script type="application\/ld\+json">\s*\{[\s\S]*?"@type":\s*"FAQPage"[\s\S]*?<\/script>/, '')
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

  // Build route-specific JSON-LD
  const jsonLdScripts: string[] = []

  // BreadcrumbList for all pages except home
  if (route.suffix !== '/') {
    jsonLdScripts.push(breadcrumbJsonLd(lang, route))
  }

  // Article schema for article pages
  if (route.type === 'article') {
    jsonLdScripts.push(articleJsonLd(lang, route))
  }

  // FAQ schema for home page (replaces the static Korean-only one)
  if (route.suffix === '/') {
    jsonLdScripts.push(faqJsonLd(lang))
  }

  const jsonLdBlock = jsonLdScripts.length > 0 ? '\n' + jsonLdScripts.join('\n') : ''

  html = html.replace('</head>', `${seoBlock}${jsonLdBlock}\n  </head>`)

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
