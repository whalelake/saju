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

// 60 Ganji pillar data: [slug, korean, hanja, romanized]
const SIXTY_PILLARS: Array<[string, string, string, string]> = [
  ['gap-ja', '갑자', '甲子', 'Gap-ja'],
  ['eul-chuk', '을축', '乙丑', 'Eul-chuk'],
  ['byeong-in', '병인', '丙寅', 'Byeong-in'],
  ['jeong-myo', '정묘', '丁卯', 'Jeong-myo'],
  ['mu-jin', '무진', '戊辰', 'Mu-jin'],
  ['gi-sa', '기사', '己巳', 'Gi-sa'],
  ['gyeong-o', '경오', '庚午', 'Gyeong-o'],
  ['sin-mi', '신미', '辛未', 'Sin-mi'],
  ['im-sin', '임신', '壬申', 'Im-sin'],
  ['gye-yu', '계유', '癸酉', 'Gye-yu'],
  ['gap-sul', '갑술', '甲戌', 'Gap-sul'],
  ['eul-hae', '을해', '乙亥', 'Eul-hae'],
  ['byeong-ja', '병자', '丙子', 'Byeong-ja'],
  ['jeong-chuk', '정축', '丁丑', 'Jeong-chuk'],
  ['mu-in', '무인', '戊寅', 'Mu-in'],
  ['gi-myo', '기묘', '己卯', 'Gi-myo'],
  ['gyeong-jin', '경진', '庚辰', 'Gyeong-jin'],
  ['sin-sa', '신사', '辛巳', 'Sin-sa'],
  ['im-o', '임오', '壬午', 'Im-o'],
  ['gye-mi', '계미', '癸未', 'Gye-mi'],
  ['gap-sin', '갑신', '甲申', 'Gap-sin'],
  ['eul-yu', '을유', '乙酉', 'Eul-yu'],
  ['byeong-sul', '병술', '丙戌', 'Byeong-sul'],
  ['jeong-hae', '정해', '丁亥', 'Jeong-hae'],
  ['mu-ja', '무자', '戊子', 'Mu-ja'],
  ['gi-chuk', '기축', '己丑', 'Gi-chuk'],
  ['gyeong-in', '경인', '庚寅', 'Gyeong-in'],
  ['sin-myo', '신묘', '辛卯', 'Sin-myo'],
  ['im-jin', '임진', '壬辰', 'Im-jin'],
  ['gye-sa', '계사', '癸巳', 'Gye-sa'],
  ['gap-o', '갑오', '甲午', 'Gap-o'],
  ['eul-mi', '을미', '乙未', 'Eul-mi'],
  ['byeong-sin', '병신', '丙申', 'Byeong-sin'],
  ['jeong-yu', '정유', '丁酉', 'Jeong-yu'],
  ['mu-sul', '무술', '戊戌', 'Mu-sul'],
  ['gi-hae', '기해', '己亥', 'Gi-hae'],
  ['gyeong-ja', '경자', '庚子', 'Gyeong-ja'],
  ['sin-chuk', '신축', '辛丑', 'Sin-chuk'],
  ['im-in', '임인', '壬寅', 'Im-in'],
  ['gye-myo', '계묘', '癸卯', 'Gye-myo'],
  ['gap-jin', '갑진', '甲辰', 'Gap-jin'],
  ['eul-sa', '을사', '乙巳', 'Eul-sa'],
  ['byeong-o', '병오', '丙午', 'Byeong-o'],
  ['jeong-mi', '정미', '丁未', 'Jeong-mi'],
  ['mu-sin', '무신', '戊申', 'Mu-sin'],
  ['gi-yu', '기유', '己酉', 'Gi-yu'],
  ['gyeong-sul', '경술', '庚戌', 'Gyeong-sul'],
  ['sin-hae', '신해', '辛亥', 'Sin-hae'],
  ['im-ja', '임자', '壬子', 'Im-ja'],
  ['gye-chuk', '계축', '癸丑', 'Gye-chuk'],
  ['gap-in', '갑인', '甲寅', 'Gap-in'],
  ['eul-myo', '을묘', '乙卯', 'Eul-myo'],
  ['byeong-jin', '병진', '丙辰', 'Byeong-jin'],
  ['jeong-sa', '정사', '丁巳', 'Jeong-sa'],
  ['mu-o', '무오', '戊午', 'Mu-o'],
  ['gi-mi', '기미', '己未', 'Gi-mi'],
  ['gyeong-sin', '경신', '庚申', 'Gyeong-sin'],
  ['sin-yu', '신유', '辛酉', 'Sin-yu'],
  ['im-sul', '임술', '壬戌', 'Im-sul'],
  ['gye-hae', '계해', '癸亥', 'Gye-hae'],
]

// 14 Ziwei main stars: [slug, korean, hanja, english]
const ZIWEI_STARS: Array<[string, string, string, string]> = [
  ['zi-wei', '자미성', '紫微', 'Zi Wei'],
  ['tian-ji', '천기성', '天機', 'Tian Ji'],
  ['tai-yang', '태양성', '太陽', 'Tai Yang'],
  ['wu-qu', '무곡성', '武曲', 'Wu Qu'],
  ['tian-tong', '천동성', '天同', 'Tian Tong'],
  ['lian-zhen', '염정성', '廉貞', 'Lian Zhen'],
  ['tian-fu', '천부성', '天府', 'Tian Fu'],
  ['tai-yin', '태음성', '太陰', 'Tai Yin'],
  ['tan-lang', '탐랑성', '貪狼', 'Tan Lang'],
  ['ju-men', '거문성', '巨門', 'Ju Men'],
  ['tian-xiang', '천상성', '天相', 'Tian Xiang'],
  ['tian-liang', '천량성', '天梁', 'Tian Liang'],
  ['qi-sha', '칠살성', '七殺', 'Qi Sha'],
  ['po-jun', '파군성', '破軍', 'Po Jun'],
]

// 10 Sipsin (Ten Gods): [slug, korean, hanja, english]
const SIPSIN_LIST: Array<[string, string, string, string]> = [
  ['bi-gyeon', '비견', '比肩', 'Bi-gyeon'],
  ['geop-jae', '겁재', '劫財', 'Geop-jae'],
  ['sik-sin', '식신', '食神', 'Sik-sin'],
  ['sang-gwan', '상관', '傷官', 'Sang-gwan'],
  ['pyeon-jae', '편재', '偏財', 'Pyeon-jae'],
  ['jeong-jae', '정재', '正財', 'Jeong-jae'],
  ['pyeon-gwan', '편관', '偏官', 'Pyeon-gwan'],
  ['jeong-gwan', '정관', '正官', 'Jeong-gwan'],
  ['pyeon-in', '편인', '偏印', 'Pyeon-in'],
  ['jeong-in', '정인', '正印', 'Jeong-in'],
]

// Fortune year data: [year, hanja, korean]
const FORTUNE_YEARS: Array<[number, string, string]> = [
  [2025, '乙巳', '을사'],
  [2026, '丙午', '병오'],
]

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
    '/pillars': {
      ko: '60갑자 일주 가이드 — 성격, 연애, 직업, 궁합 | 명운판',
      en: '60 Ganji Day Pillar Guide — Personality, Love, Career | Myungunpan',
      ja: '六十甲子 日柱ガイド — 性格・恋愛・仕事・相性 | 命運盤',
      zh: '六十甲子 日柱指南 — 性格、恋爱、事业、合盘 | 命运盘',
    },
    '/ziwei/stars': {
      ko: '자미두수 14주성 가이드 | 명운판',
      en: 'Zi Wei Dou Shu 14 Main Stars Guide | Myungunpan',
      ja: '紫微斗数14主星ガイド | 命運盤',
      zh: '紫微斗数十四主星指南 | 命运盘',
    },
    '/sipsin': {
      ko: '십신(十神) 완전 가이드 | 명운판',
      en: 'Ten Gods (Sipsin) Complete Guide | Myungunpan',
      ja: '十神完全ガイド | 命運盤',
      zh: '十神完全指南 | 命运盘',
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

function pillarSeo(slug: string, korean: string, hanja: string, romanized: string): RouteSeo {
  return {
    suffix: `/pillars/${slug}`,
    title: {
      ko: `${korean}(${hanja}) 일주 — 성격, 연애, 직업, 궁합 | 명운판`,
      en: `${romanized} (${hanja}) Day Pillar — Personality, Love, Career | Myungunpan`,
      ja: `${hanja}日柱 — 性格・恋愛・仕事・相性 | 命運盤`,
      zh: `${hanja}日柱 — 性格、恋爱、事业、合盘 | 命运盘`,
    },
    description: {
      ko: `${korean}(${hanja}) 일주의 성격, 연애 스타일, 직업 적성, 궁합을 자세히 알아보세요.`,
      en: `Discover the personality, love style, career aptitude, and compatibility of the ${romanized} (${hanja}) Day Pillar.`,
      ja: `${hanja}日柱の性格、恋愛スタイル、職業適性、相性を詳しくご紹介します。`,
      zh: `详细了解${hanja}日柱的性格、恋爱风格、职业适性和合盘。`,
    },
    type: 'article',
  }
}

function ziweiStarSeo(slug: string, korean: string, hanja: string, english: string): RouteSeo {
  return {
    suffix: `/ziwei/stars/${slug}`,
    title: {
      ko: `${korean}(${hanja}) — 성격, 직업, 연애, 사화 해석 | 명운판`,
      en: `${english} Star — Personality, Career, Love | Myungunpan`,
      ja: `${hanja}星 — 性格・仕事・恋愛・四化 | 命運盤`,
      zh: `${hanja}星 — 性格、事业、恋爱、四化 | 命运盘`,
    },
    description: {
      ko: `${korean}(${hanja})의 성격, 직업 적성, 연애 스타일, 사화 해석을 자세히 알아보세요.`,
      en: `Discover the personality, career aptitude, love style, and Four Transformations of the ${english} Star (${hanja}).`,
      ja: `${hanja}星の性格、職業適性、恋愛スタイル、四化の解釈を詳しくご紹介します。`,
      zh: `详细了解${hanja}星的性格、职业适性、恋爱风格和四化解读。`,
    },
    type: 'article',
  }
}

function sipsinSeo(slug: string, korean: string, hanja: string, english: string): RouteSeo {
  return {
    suffix: `/sipsin/${slug}`,
    title: {
      ko: `${korean}(${hanja}) — 성격, 직업, 연애 해석 | 명운판`,
      en: `${english} — Personality, Career, Love | Myungunpan`,
      ja: `${hanja} — 性格・仕事・恋愛 | 命運盤`,
      zh: `${hanja} — 性格、事业、恋爱 | 命运盘`,
    },
    description: {
      ko: `${korean}(${hanja})의 성격, 직업 적성, 연애 스타일을 자세히 알아보세요.`,
      en: `Discover the personality, career aptitude, and love style of ${english} (${hanja}).`,
      ja: `${hanja}の性格、職業適性、恋愛スタイルを詳しくご紹介します。`,
      zh: `详细了解${hanja}的性格、职业适性和恋爱风格。`,
    },
    type: 'article',
  }
}

function fortuneIndexSeo(): RouteSeo {
  return {
    suffix: '/fortune',
    title: {
      ko: '연간 운세 — 띠별 운세와 올해의 기운 | 명운판',
      en: 'Annual Fortune — Zodiac Forecast & Year Energy | Myungunpan',
      ja: '年間運勢 — 干支別運勢と今年の気運 | 命運盤',
      zh: '年度运势 — 生肖运势与年度能量 | 命运盘',
    },
    description: {
      ko: '띠별 연간 운세와 올해의 기운을 확인하세요. 각 해의 운세를 자세히 분석합니다.',
      en: 'Check your annual zodiac fortune and year energy. Detailed fortune analysis for each year.',
      ja: '干支別の年間運勢と今年の気運をチェック。各年の運勢を詳しく分析します。',
      zh: '查看生肖年度运势与年度能量。详细分析每年的运势。',
    },
    type: 'website',
  }
}

function fortuneYearSeo(year: number, hanja: string, korean: string): RouteSeo {
  return {
    suffix: `/fortune/${year}`,
    title: {
      ko: `${year}년 ${korean}년 운세 — 띠별 운세 총정리 | 명운판`,
      en: `${year} Fortune (${hanja} Year) — Complete Zodiac Forecast | Myungunpan`,
      ja: `${year}年${hanja}年の運勢 — 干支別運勢 | 命運盤`,
      zh: `${year}年${hanja}年运势 — 生肖运势总汇 | 命运盘`,
    },
    description: {
      ko: `${year}년 ${korean}(${hanja})년 띠별 운세를 총정리합니다. 올해의 기운과 각 띠별 운세를 확인하세요.`,
      en: `Complete zodiac forecast for ${year} (${hanja} Year). Check your fortune and year energy by zodiac sign.`,
      ja: `${year}年${hanja}年の干支別運勢を総まとめ。今年の気運と各干支の運勢をチェック。`,
      zh: `${year}年${hanja}年生肖运势总汇。查看年度能量与各生肖运势。`,
    },
    type: 'article',
  }
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
  } else if (route.suffix.startsWith('/pillars/')) {
    const pillarsName = lang === 'ko' ? '60갑자 일주' : lang === 'ja' ? '六十甲子 日柱' : lang === 'zh' ? '六十甲子 日柱' : '60 Ganji Pillars'
    items.push({ name: pillarsName, item: `${SITE_URL}/${lang}/pillars` })
    items.push({ name: route.title[lang].replace(/ \| .*$/, '') })
  } else if (route.suffix.startsWith('/ziwei/stars/')) {
    const ziweiStarsName = lang === 'ko' ? '자미두수 14주성' : lang === 'ja' ? '紫微斗数14主星' : lang === 'zh' ? '紫微斗数十四主星' : 'Ziwei 14 Stars'
    items.push({ name: ziweiStarsName, item: `${SITE_URL}/${lang}/ziwei/stars` })
    items.push({ name: route.title[lang].replace(/ \| .*$/, '') })
  } else if (route.suffix.startsWith('/sipsin/')) {
    const sipsinName = lang === 'ko' ? '십신(十神)' : lang === 'ja' ? '十神' : lang === 'zh' ? '十神' : 'Ten Gods (Sipsin)'
    items.push({ name: sipsinName, item: `${SITE_URL}/${lang}/sipsin` })
    items.push({ name: route.title[lang].replace(/ \| .*$/, '') })
  } else if (route.suffix.startsWith('/fortune/')) {
    const fortuneName = lang === 'ko' ? '연간 운세' : lang === 'ja' ? '年間運勢' : lang === 'zh' ? '年度运势' : 'Annual Fortune'
    items.push({ name: fortuneName, item: `${SITE_URL}/${lang}/fortune` })
    items.push({ name: route.title[lang].replace(/ \| .*$/, '') })
  } else if (route.suffix === '/fortune') {
    const fortuneName = lang === 'ko' ? '연간 운세' : lang === 'ja' ? '年間運勢' : lang === 'zh' ? '年度运势' : 'Annual Fortune'
    items.push({ name: fortuneName })
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
    ...['/guide', '/guide/saju', '/guide/ziwei', '/guide/natal', '/articles', '/privacy', '/terms', '/dream', '/pillars', '/ziwei/stars', '/sipsin'].map(
      (s) => staticPageSeo(s, s),
    ),
    ...ARTICLE_IDS.map((id) => articleSeo(id)),
    ...SIXTY_PILLARS.map(([slug, korean, hanja, romanized]) => pillarSeo(slug, korean, hanja, romanized)),
    ...ZIWEI_STARS.map(([slug, korean, hanja, english]) => ziweiStarSeo(slug, korean, hanja, english)),
    ...SIPSIN_LIST.map(([slug, korean, hanja, english]) => sipsinSeo(slug, korean, hanja, english)),
    fortuneIndexSeo(),
    ...FORTUNE_YEARS.map(([year, hanja, korean]) => fortuneYearSeo(year, hanja, korean)),
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
