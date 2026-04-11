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
import {
  expandArticleContent,
  splitLongformText,
  type ArticleContentShape,
} from '../src/content/article-longform'
import {
  expandGuidePageContent,
  splitGuideText,
  type GuidePageContent,
} from '../src/content/guide-longform'
import { ko } from '../src/i18n/ko'
import { en } from '../src/i18n/en'
import { ja } from '../src/i18n/ja'
import { zh } from '../src/i18n/zh'
import { GUIDE_PAGE_CONTENT } from '../src/pages/LandingPage'
import {
  SITE_PAGE_CONTENT,
  SITE_PAGE_KEYS,
  SITE_PAGE_ROUTE_SUFFIX,
  getSitePageKeyBySuffix,
} from '../src/content/site-pages'

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

const GUIDE_ROUTE_SUFFIXES = [
  '/guide/saju',
  '/guide/saju/ten-gods',
  '/guide/saju/day-master',
  '/guide/ziwei',
  '/guide/ziwei/12-palaces',
  '/guide/natal',
  '/guide/natal/planets',
  '/guide/natal/houses',
] as const

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
  robots?: string
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

function staticPageSeo(suffix: string): RouteSeo {
  const sitePageKey = getSitePageKeyBySuffix(suffix)
  if (sitePageKey) {
    return {
      suffix,
      title: {
        ko: `${SITE_PAGE_CONTENT[sitePageKey].ko.title} | 명운판`,
        en: `${SITE_PAGE_CONTENT[sitePageKey].en.title} | Myungunpan`,
        ja: `${SITE_PAGE_CONTENT[sitePageKey].ja.title} | 命運盤`,
        zh: `${SITE_PAGE_CONTENT[sitePageKey].zh.title} | 命运盘`,
      },
      description: {
        ko: SITE_PAGE_CONTENT[sitePageKey].ko.description,
        en: SITE_PAGE_CONTENT[sitePageKey].en.description,
        ja: SITE_PAGE_CONTENT[sitePageKey].ja.description,
        zh: SITE_PAGE_CONTENT[sitePageKey].zh.description,
      },
      type: 'website',
    }
  }

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
    '/guide/saju/ten-gods': {
      ko: '십신 가이드 | 명운판',
      en: 'Ten Gods Guide | Myungunpan',
      ja: '十神ガイド | 命運盤',
      zh: '十神指南 | 命运盘',
    },
    '/guide/saju/day-master': {
      ko: '일간 가이드 | 명운판',
      en: 'Day Master Guide | Myungunpan',
      ja: '日主ガイド | 命運盤',
      zh: '日主指南 | 命运盘',
    },
    '/guide/ziwei': {
      ko: '자미두수 가이드 | 명운판',
      en: 'Zi Wei Dou Shu Guide | Myungunpan',
      ja: '紫微斗数ガイド | 命運盤',
      zh: '紫微斗数指南 | 命运盘',
    },
    '/guide/ziwei/12-palaces': {
      ko: '자미두수 십이궁 가이드 | 명운판',
      en: 'Zi Wei 12 Palaces Guide | Myungunpan',
      ja: '紫微斗数十二宮ガイド | 命運盤',
      zh: '紫微斗数十二宫指南 | 命运盘',
    },
    '/guide/natal': {
      ko: '출생차트 가이드 | 명운판',
      en: 'Natal Chart Guide | Myungunpan',
      ja: '出生チャートガイド | 命運盤',
      zh: '出生图指南 | 命运盘',
    },
    '/guide/natal/planets': {
      ko: '점성술 행성 가이드 | 명운판',
      en: 'Astrology Planets Guide | Myungunpan',
      ja: '占星術の惑星ガイド | 命運盤',
      zh: '占星行星指南 | 命运盘',
    },
    '/guide/natal/houses': {
      ko: '점성술 12하우스 가이드 | 명운판',
      en: 'Astrology Houses Guide | Myungunpan',
      ja: '占星術の12ハウスガイド | 命運盤',
      zh: '占星十二宫指南 | 命运盘',
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

  const descriptions: Record<string, Record<Lang, string>> = {
    '/guide': {
      ko: '사주, 자미두수, 점성술 기초를 체계적으로 읽을 수 있는 가이드 허브입니다.',
      en: 'A guide hub for learning the basics of Saju, Zi Wei Dou Shu, and astrology.',
      ja: '四柱推命、紫微斗数、西洋占星術の基礎をまとめたガイド集です。',
      zh: '系统整理四柱、紫微斗数与占星基础概念的指南页。',
    },
    '/guide/saju': {
      ko: '사주팔자의 기본 구조와 읽는 순서를 먼저 잡는 입문 페이지입니다.',
      en: 'An introductory page that explains the structure and reading order of Saju.',
      ja: '四柱推命の基本構造と読み方の順序を整理した入門ページです。',
      zh: '帮助你先抓住四柱八字基本结构与阅读顺序的入门页面。',
    },
    '/guide/saju/ten-gods': {
      ko: '십신이 무엇을 뜻하는지, 사주에서 관계와 역할을 어떻게 읽는지 설명합니다.',
      en: 'Learn what the Ten Gods mean and how they describe roles and relationships in Saju.',
      ja: '十神が何を表し、四柱推命で役割と関係性をどう読むかを説明します。',
      zh: '说明十神代表什么，以及它们如何用于阅读八字中的角色与关系。',
    },
    '/guide/saju/day-master': {
      ko: '일간이 왜 사주 해석의 출발점인지, 핵심 오행을 어떻게 읽는지 안내합니다.',
      en: 'See why the Day Master is the starting point of Saju interpretation and how to read your core element.',
      ja: '日主が四柱推命解釈の出発点である理由と、中心元素の読み方を案内します。',
      zh: '说明为什么日主是八字解读的起点，以及如何阅读核心五行。',
    },
    '/guide/ziwei': {
      ko: '자미두수의 기본 구조와 핵심 용어를 빠르게 훑는 입문 가이드입니다.',
      en: 'A beginner guide to the structure and core terms of Zi Wei Dou Shu.',
      ja: '紫微斗数の基本構造と主要用語を手早く押さえる入門ガイドです。',
      zh: '快速梳理紫微斗数基本结构和核心术语的入门指南。',
    },
    '/guide/ziwei/12-palaces': {
      ko: '자미두수 십이궁이 각각 무엇을 보는지, 어떤 순서로 읽으면 좋은지 정리했습니다.',
      en: 'A practical guide to what each of the 12 palaces covers and how to read them.',
      ja: '紫微斗数の十二宮が何を表し、どの順で読むとよいかを整理しています。',
      zh: '整理紫微斗数十二宫分别代表什么，以及适合的阅读顺序。',
    },
    '/guide/natal': {
      ko: '출생차트를 읽기 위해 필요한 행성, 하우스, 애스펙트의 기본 구조를 설명합니다.',
      en: 'Explains the core structure of planets, houses, and aspects in natal chart reading.',
      ja: '出生チャートを読むために必要な惑星・ハウス・アスペクトの基本構造を説明します。',
      zh: '说明理解本命盘所需的行星、宫位和相位基础结构。',
    },
    '/guide/natal/planets': {
      ko: '점성술에서 각 행성이 무엇을 뜻하는지, 행성을 어떻게 비교해야 하는지 안내합니다.',
      en: 'Learn what each planet represents in astrology and how to compare them in context.',
      ja: '占星術で各惑星が何を表し、どう比較して読むかを案内します。',
      zh: '说明占星中每颗行星代表什么，以及如何放在整体里比较阅读。',
    },
    '/guide/natal/houses': {
      ko: '12하우스가 삶의 어떤 영역을 뜻하는지, 빈 하우스까지 어떻게 읽는지 설명합니다.',
      en: 'See what the 12 houses represent and how to read even the houses without planets.',
      ja: '12ハウスがどの人生領域を表すか、惑星のないハウスまでどう読むかを説明します。',
      zh: '说明十二宫分别代表哪些生活领域，以及如何阅读空宫。',
    },
    '/articles': {
      ko: '사주, 자미두수, 점성술을 주제별로 읽을 수 있는 설명형 기사 모음입니다.',
      en: 'A collection of explanatory articles on Saju, Zi Wei Dou Shu, and astrology.',
      ja: '四柱推命、紫微斗数、西洋占星術をテーマ別に読める解説記事一覧です。',
      zh: '按主题整理的四柱、紫微斗数与占星解释型文章合集。',
    },
    '/privacy': {
      ko: '명운판의 개인정보 처리, 광고 쿠키, 문의 채널을 안내합니다.',
      en: 'Details how Myungunpan handles personal data, ad cookies, and privacy requests.',
      ja: '命運盤の個人情報の取り扱い、広告 Cookie、問い合わせ窓口を案内します。',
      zh: '说明命运盘如何处理个人信息、广告 Cookie 以及隐私相关联系渠道。',
    },
    '/terms': {
      ko: '명운판 서비스 이용 조건과 책임 범위를 정리한 이용약관입니다.',
      en: 'The terms of service for using Myungunpan and its chart tools.',
      ja: '命運盤の利用条件と責任範囲をまとめた利用規約です。',
      zh: '整理命运盘服务使用条件与责任范围的条款页面。',
    },
    '/dream': {
      ko: '꿈 내용을 바탕으로 동양 해몽과 심리 해석을 함께 살펴보는 페이지입니다.',
      en: 'Interpret dreams through both traditional symbolism and modern psychological framing.',
      ja: '夢の内容をもとに、東洋の夢占いと心理的解釈をあわせて見るページです。',
      zh: '结合东方解梦与心理视角，帮助你理解梦境内容的页面。',
    },
    '/pillars': {
      ko: '60갑자 일주별 성향, 관계, 일과 돈의 흐름을 읽는 가이드입니다.',
      en: 'A guide to the 60 Ganji day pillars across personality, relationships, and work.',
      ja: '六十甲子の日柱ごとの性格、関係、仕事とお金の流れを読むガイドです。',
      zh: '按六十甲子日柱整理性格、关系与工作财运的参考指南。',
    },
    '/ziwei/stars': {
      ko: '자미두수 14주성의 기본 의미와 읽는 순서를 정리한 가이드입니다.',
      en: 'A guide to the 14 main Zi Wei stars and how to start reading them.',
      ja: '紫微斗数14主星の基本意味と読み始める順序をまとめたガイドです。',
      zh: '整理紫微斗数十四主星基础含义与阅读顺序的指南。',
    },
    '/sipsin': {
      ko: '십신 각각의 성격, 관계, 일과 돈 해석 포인트를 모아둔 가이드입니다.',
      en: 'A guide to each Ten God and its reading points for personality, relationships, and work.',
      ja: '十神それぞれの性格、関係、仕事とお金の読みどころをまとめたガイドです。',
      zh: '整理每个十神在性格、关系与工作财运中的阅读重点。',
    },
  }

  return {
    suffix,
    title: titles[suffix] ?? titles['/guide']!,
    description: descriptions[suffix] ?? descriptions['/guide']!,
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
    robots: 'noindex, follow',
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
    robots: 'noindex, follow',
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
    robots: 'noindex, follow',
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

type ArticleFallbackContent = ArticleContentShape

const STATIC_SHELL_COPY: Record<Lang, {
  brand: string
  guides: string
  articles: string
  about: string
  contact: string
  editorial: string
  privacy: string
  terms: string
  trustTitle: string
  trustBody: string
  homeHighlightsTitle: string
  homeHighlights: string[]
  collectionTitle: string
  continueTitle: string
  calculator: string
}> = {
  ko: {
    brand: '명운판',
    guides: '가이드',
    articles: '기사',
    about: '소개',
    contact: '문의',
    editorial: '운영 원칙',
    privacy: '개인정보처리방침',
    terms: '이용약관',
    trustTitle: '사이트 운영 정보',
    trustBody: '명운판은 계산 화면, 설명형 콘텐츠, 정책 페이지, 문의 채널을 함께 운영해 읽는 흐름과 신뢰 정보를 분리하지 않도록 관리합니다.',
    homeHighlightsTitle: '명운판에서 바로 할 수 있는 것',
    homeHighlights: [
      '사주팔자, 자미두수, 서양 점성술 출생차트를 한 곳에서 계산',
      '기사와 가이드로 용어와 읽는 순서를 이어서 확인',
      '필요한 경우에만 AI 해석으로 후속 질문 연결',
    ],
    collectionTitle: '바로 읽을 수 있는 대표 콘텐츠',
    continueTitle: '이어보기',
    calculator: '계산 시작',
  },
  en: {
    brand: 'Myungunpan',
    guides: 'Guides',
    articles: 'Articles',
    about: 'About',
    contact: 'Contact',
    editorial: 'Editorial Policy',
    privacy: 'Privacy',
    terms: 'Terms',
    trustTitle: 'Site information',
    trustBody: 'Myungunpan keeps chart tools, explanatory content, policy pages, and contact channels close together so readers can verify both the content and the operation of the site.',
    homeHighlightsTitle: 'What you can do here',
    homeHighlights: [
      'Calculate Saju, Zi Wei Dou Shu, and Western natal charts in one place',
      'Move from chart output into guides and articles without losing context',
      'Continue into AI interpretation only when you want extra depth',
    ],
    collectionTitle: 'Representative content to start with',
    continueTitle: 'Continue',
    calculator: 'Calculator',
  },
  ja: {
    brand: '命運盤',
    guides: 'ガイド',
    articles: '記事',
    about: '紹介',
    contact: 'お問い合わせ',
    editorial: '運営方針',
    privacy: 'プライバシー',
    terms: '利用規約',
    trustTitle: 'サイト運営情報',
    trustBody: '命運盤は、計算ツール、解説コンテンツ、ポリシーページ、問い合わせ窓口を近くに置き、内容と運営の両方を確認しやすくしています。',
    homeHighlightsTitle: 'このサイトでできること',
    homeHighlights: [
      '四柱推命、紫微斗数、西洋占星術の出生チャートを一か所で計算',
      '計算結果からガイドや記事へ自然に読み進める',
      '必要なときだけAI解釈で追加の質問へ進む',
    ],
    collectionTitle: '最初に読む代表コンテンツ',
    continueTitle: '続けて見る',
    calculator: '計算する',
  },
  zh: {
    brand: '命运盘',
    guides: '指南',
    articles: '文章',
    about: '关于',
    contact: '联系',
    editorial: '内容原则',
    privacy: '隐私',
    terms: '条款',
    trustTitle: '站点信息',
    trustBody: '命运盘把计算工具、解释型内容、政策页面和联系渠道放在同一条路径里，方便读者同时确认内容与站点运营信息。',
    homeHighlightsTitle: '你可以在这里做什么',
    homeHighlights: [
      '在一个地方计算四柱八字、紫微斗数和西方出生图',
      '从结果页面继续进入指南和文章，不丢失上下文',
      '只在需要更深入时再进入 AI 解读',
    ],
    collectionTitle: '适合起步的代表内容',
    continueTitle: '继续查看',
    calculator: '开始计算',
  },
}

function buildAbsolutePath(lang: Lang, suffix: string) {
  return `${SITE_URL}/${lang}${suffix}`
}

function buildLocalizedHref(lang: Lang, href: string) {
  if (href.startsWith('https://') || href.startsWith('http://') || href.startsWith('mailto:')) {
    return href
  }
  return buildAbsolutePath(lang, href)
}

function buildLinkChip(lang: Lang, label: string, href: string) {
  return `<a href="${escapeHtml(buildLocalizedHref(lang, href))}" style="display:inline-block;padding:10px 14px;border-radius:999px;border:1px solid rgba(148,163,184,0.35);background:#fffaf2;color:#7c2d12;text-decoration:none;font-size:14px;margin:0 8px 8px 0;">${escapeHtml(label)}</a>`
}

function buildParagraphs(text: string) {
  return splitLongformText(text)
    .map((paragraph, index) => `  <p style="margin:${index === 0 ? '0' : '12px'} 0 0;color:#475569;line-height:1.8;">${escapeHtml(paragraph)}</p>`)
    .join('\n')
}

function buildSection(heading: string, body: string) {
  return [
    '<section style="margin-top:24px;">',
    `  <h2 style="font-size:1.1rem;line-height:1.5;font-weight:700;color:#1f2937;margin:0 0 10px;">${escapeHtml(heading)}</h2>`,
    buildParagraphs(body),
    '</section>',
  ].join('\n')
}

function getArticleFallbackContent(lang: Lang, articleId: string): ArticleFallbackContent | null {
  const meta = ARTICLE_CATALOG.find((item) => item.id === articleId)
  if (!meta) return null

  const article = i18n[lang].articles[meta.key as keyof typeof ko.articles] as ArticleContentShape | undefined
  if (!article || typeof article.title !== 'string' || typeof article.intro !== 'string') {
    return null
  }

  return expandArticleContent(article, meta.cluster, lang)
}

function firstParagraph(text: string) {
  return splitLongformText(text)[0] ?? text
}

function routeSuffixToGuideTopicKey(suffix: string) {
  if (suffix === '/guide' || suffix === '/guide/saju') {
    return 'saju'
  }

  if (!suffix.startsWith('/guide/')) {
    return null
  }

  return suffix.replace(/^\/guide\//, '')
}

function getGuideFallbackContent(lang: Lang, suffix: string): GuidePageContent | null {
  const topicKey = routeSuffixToGuideTopicKey(suffix)
  if (!topicKey) {
    return null
  }

  const content = GUIDE_PAGE_CONTENT[lang]?.[topicKey]
  if (!content) {
    return null
  }

  return expandGuidePageContent(lang, topicKey, content)
}

function resolveGuideFallbackHref(suffix: string, href: string) {
  if (href.startsWith('../')) {
    return '/'
  }

  if (href.startsWith('/')) {
    return href
  }

  if (href === 'saju' || href === 'ziwei' || href === 'natal') {
    return `/guide/${href}`
  }

  const topicKey = routeSuffixToGuideTopicKey(suffix)
  const topicRoot = topicKey?.includes('/') ? topicKey.split('/')[0] : topicKey
  return topicRoot ? `/guide/${topicRoot}/${href}` : `/guide/${href}`
}

function buildHomeFallback(lang: Lang) {
  const copy = STATIC_SHELL_COPY[lang]
  return [
    `<h1 style="font-size:2rem;line-height:1.2;font-weight:800;margin:0;color:#111827;">${escapeHtml(homeSeo().title[lang].replace(/ \| .*$/, ''))}</h1>`,
    `<p style="margin:16px 0 0;color:#475569;line-height:1.85;font-size:1rem;">${escapeHtml(homeSeo().description[lang])}</p>`,
    '<section style="margin-top:28px;padding:20px;border-radius:24px;border:1px solid rgba(180,140,60,0.2);background:linear-gradient(135deg,#fff9ec,#ffffff);">',
    `  <h2 style="margin:0 0 12px;font-size:1.05rem;font-weight:700;color:#7c2d12;">${escapeHtml(copy.homeHighlightsTitle)}</h2>`,
    '  <ul style="margin:0;padding-left:20px;color:#475569;line-height:1.9;">',
    ...copy.homeHighlights.map((item) => `    <li>${escapeHtml(item)}</li>`),
    '  </ul>',
    '</section>',
    '<div style="margin-top:28px;">',
    buildLinkChip(lang, copy.guides, '/guide'),
    buildLinkChip(lang, copy.articles, '/articles'),
    buildLinkChip(lang, copy.about, SITE_PAGE_ROUTE_SUFFIX.about),
    buildLinkChip(lang, copy.contact, SITE_PAGE_ROUTE_SUFFIX.contact),
    '</div>',
  ].join('\n')
}

function buildArticlesIndexFallback(lang: Lang) {
  const copy = STATIC_SHELL_COPY[lang]
  const featured = ARTICLE_CATALOG.slice(0, 6)
    .map((item) => {
      const content = getArticleFallbackContent(lang, item.id)
      if (!content) return ''
      return [
        '<li style="margin-bottom:16px;">',
        `  <a href="${escapeHtml(buildAbsolutePath(lang, `/articles/${item.id}`))}" style="color:#7c2d12;text-decoration:none;font-weight:600;">${escapeHtml(content.title)}</a>`,
        `  <p style="margin:6px 0 0;color:#475569;line-height:1.75;">${escapeHtml(firstParagraph(content.intro))}</p>`,
        '</li>',
      ].join('\n')
    })
    .filter(Boolean)
    .join('\n')

  return [
    `<h1 style="font-size:2rem;line-height:1.2;font-weight:800;margin:0;color:#111827;">${escapeHtml(copy.articles)}</h1>`,
    `<p style="margin:16px 0 0;color:#475569;line-height:1.85;">${escapeHtml(staticPageSeo('/articles').description[lang])}</p>`,
    '<section style="margin-top:28px;">',
    `  <h2 style="font-size:1.05rem;font-weight:700;color:#1f2937;margin:0 0 14px;">${escapeHtml(copy.collectionTitle)}</h2>`,
    `  <ol style="margin:0;padding-left:20px;color:#475569;">${featured}</ol>`,
    '</section>',
  ].join('\n')
}

function buildArticleFallback(lang: Lang, route: RouteSeo) {
  const articleId = route.suffix.replace('/articles/', '')
  const article = getArticleFallbackContent(lang, articleId)
  if (!article) {
    return buildGenericFallback(lang, route)
  }

  const copy = STATIC_SHELL_COPY[lang]

  return [
    `<h1 style="font-size:2rem;line-height:1.2;font-weight:800;margin:0;color:#111827;">${escapeHtml(article.title)}</h1>`,
    article.subtitle
      ? `<p style="margin:12px 0 0;color:#7c2d12;font-weight:600;">${escapeHtml(article.subtitle)}</p>`
      : '',
    `<div style="margin-top:18px;">${buildParagraphs(article.intro)}</div>`,
    article.section1Title && article.section1Text ? buildSection(article.section1Title, article.section1Text) : '',
    article.section2Title && article.section2Text ? buildSection(article.section2Title, article.section2Text) : '',
    article.section3Title && article.section3Text ? buildSection(article.section3Title, article.section3Text) : '',
    article.section4Title && article.section4Text ? buildSection(article.section4Title, article.section4Text) : '',
    `<div style="margin-top:28px;">${buildLinkChip(lang, copy.articles, '/articles')}${buildLinkChip(lang, copy.guides, '/guide')}${buildLinkChip(lang, copy.calculator, '/')}</div>`,
  ].join('\n')
}

function buildGuideFallback(lang: Lang, route: RouteSeo) {
  const content = getGuideFallbackContent(lang, route.suffix)
  if (!content) {
    return buildGenericFallback(lang, route)
  }

  return [
    `<h1 style="font-size:2rem;line-height:1.2;font-weight:800;margin:0;color:#111827;">${escapeHtml(content.title)}</h1>`,
    `<p style="margin:16px 0 0;color:#475569;line-height:1.85;">${escapeHtml(content.description)}</p>`,
    ...content.sections.flatMap((section) => {
      const paragraphs = splitGuideText(section.content)
        .map((paragraph, index) => `  <p style="margin:${index === 0 ? '0' : '12px'} 0 0;color:#475569;line-height:1.8;">${escapeHtml(paragraph)}</p>`)

      return [
        '<section style="margin-top:24px;">',
        `  <h2 style="font-size:1.1rem;line-height:1.5;font-weight:700;color:#1f2937;margin:0 0 10px;">${escapeHtml(section.heading)}</h2>`,
        ...paragraphs,
        '</section>',
      ]
    }),
    content.relatedLinks && content.relatedLinks.length > 0
      ? [
          '<section style="margin-top:28px;">',
          `  <h2 style="font-size:1.05rem;font-weight:700;color:#1f2937;margin:0 0 14px;">${escapeHtml(lang === 'ko' ? '관련 링크' : lang === 'ja' ? '関連リンク' : lang === 'zh' ? '相关链接' : 'Related links')}</h2>`,
          '  <div>',
          ...content.relatedLinks.map((link) =>
            buildLinkChip(lang, link.label, resolveGuideFallbackHref(route.suffix, link.href)),
          ),
          '  </div>',
          '</section>',
        ].join('\n')
      : '',
  ].join('\n')
}

function buildSitePageFallback(lang: Lang, route: RouteSeo) {
  const pageKey = getSitePageKeyBySuffix(route.suffix)
  if (!pageKey) {
    return buildGenericFallback(lang, route)
  }

  const content = SITE_PAGE_CONTENT[pageKey][lang]

  return [
    `<h1 style="font-size:2rem;line-height:1.2;font-weight:800;margin:0;color:#111827;">${escapeHtml(content.title)}</h1>`,
    `<p style="margin:16px 0 0;color:#475569;line-height:1.85;">${escapeHtml(content.description)}</p>`,
    `<p style="margin:14px 0 0;color:#475569;line-height:1.85;">${escapeHtml(content.intro)}</p>`,
    ...content.sections.flatMap((section) => {
      const blocks = [
        '<section style="margin-top:24px;">',
        `  <h2 style="font-size:1.1rem;line-height:1.5;font-weight:700;color:#1f2937;margin:0 0 10px;">${escapeHtml(section.heading)}</h2>`,
        ...section.body.map((paragraph) => `  <p style="margin:0 0 10px;color:#475569;line-height:1.8;">${escapeHtml(paragraph)}</p>`),
      ]

      if (section.bullets && section.bullets.length > 0) {
        blocks.push('  <ul style="margin:6px 0 0;padding-left:20px;color:#475569;line-height:1.85;">')
        blocks.push(...section.bullets.map((bullet) => `    <li>${escapeHtml(bullet)}</li>`))
        blocks.push('  </ul>')
      }

      if (section.links && section.links.length > 0) {
        blocks.push('  <div style="margin-top:14px;">')
        blocks.push(...section.links.map((link) => buildLinkChip(lang, link.label, link.href)))
        blocks.push('  </div>')
      }

      blocks.push('</section>')
      return blocks
    }),
  ].join('\n')
}

function buildGenericFallback(lang: Lang, route: RouteSeo) {
  const copy = STATIC_SHELL_COPY[lang]
  const labelTenGods = lang === 'ko' ? '십신' : lang === 'ja' ? '十神' : lang === 'zh' ? '十神' : 'Ten Gods'
  const labelDayMaster = lang === 'ko' ? '일간' : lang === 'ja' ? '日主' : lang === 'zh' ? '日主' : 'Day Master'
  const labelPalaces = lang === 'ko' ? '십이궁' : lang === 'ja' ? '十二宮' : lang === 'zh' ? '十二宫' : '12 Palaces'
  const labelPlanets = lang === 'ko' ? '행성' : lang === 'ja' ? '惑星' : lang === 'zh' ? '行星' : 'Planets'
  const labelHouses = lang === 'ko' ? '하우스' : lang === 'ja' ? 'ハウス' : lang === 'zh' ? '宫位' : 'Houses'
  const labelPillars = lang === 'ko' ? '60갑자' : lang === 'ja' ? '六十甲子' : lang === 'zh' ? '六十甲子' : '60 Pillars'
  const labelSipsin = lang === 'ko' ? '십신' : lang === 'ja' ? '十神' : lang === 'zh' ? '十神' : 'Sipsin'
  const quickLinks: Array<{ label: string; href: string }> = route.suffix.startsWith('/guide/saju')
    ? [
        { label: copy.guides, href: '/guide/saju' },
        { label: labelTenGods, href: '/guide/saju/ten-gods' },
        { label: labelDayMaster, href: '/guide/saju/day-master' },
      ]
    : route.suffix.startsWith('/guide/ziwei')
      ? [
          { label: copy.guides, href: '/guide/ziwei' },
          { label: labelPalaces, href: '/guide/ziwei/12-palaces' },
          { label: copy.articles, href: '/articles/ziwei-chart-reading' },
        ]
      : route.suffix.startsWith('/guide/natal')
        ? [
            { label: copy.guides, href: '/guide/natal' },
            { label: labelPlanets, href: '/guide/natal/planets' },
            { label: labelHouses, href: '/guide/natal/houses' },
          ]
        : route.suffix.startsWith('/pillars')
          ? [
              { label: labelPillars, href: '/pillars' },
              { label: labelSipsin, href: '/sipsin' },
              { label: copy.articles, href: '/articles' },
            ]
          : [
              { label: copy.guides, href: '/guide' },
              { label: copy.articles, href: '/articles' },
              { label: copy.about, href: SITE_PAGE_ROUTE_SUFFIX.about },
            ]

  return [
    `<h1 style="font-size:2rem;line-height:1.2;font-weight:800;margin:0;color:#111827;">${escapeHtml(route.title[lang].replace(/ \| .*$/, ''))}</h1>`,
    `<p style="margin:16px 0 0;color:#475569;line-height:1.85;">${escapeHtml(route.description[lang])}</p>`,
    '<section style="margin-top:24px;">',
    `  <h2 style="font-size:1.1rem;line-height:1.5;font-weight:700;color:#1f2937;margin:0 0 10px;">${escapeHtml(copy.continueTitle)}</h2>`,
    '  <div>',
    ...quickLinks.map((link) => buildLinkChip(lang, link.label, link.href)),
    '  </div>',
    '</section>',
  ].join('\n')
}

function buildStaticFallback(lang: Lang, route: RouteSeo) {
  const copy = STATIC_SHELL_COPY[lang]
  const content = route.suffix === '/'
    ? buildHomeFallback(lang)
    : route.suffix === '/articles'
      ? buildArticlesIndexFallback(lang)
      : route.suffix.startsWith('/articles/')
        ? buildArticleFallback(lang, route)
        : route.suffix.startsWith('/guide')
          ? buildGuideFallback(lang, route)
        : getSitePageKeyBySuffix(route.suffix)
          ? buildSitePageFallback(lang, route)
          : buildGenericFallback(lang, route)

  return [
    '<div data-static-shell="true" style="min-height:100vh;background:#f5f1e8;color:#0f172a;">',
    '  <main style="max-width:880px;margin:0 auto;padding:32px 16px 48px;">',
    `    <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#92400e;font-weight:700;">${escapeHtml(copy.brand)}</p>`,
    '    <nav style="margin-bottom:22px;">',
    buildLinkChip(lang, copy.guides, '/guide'),
    buildLinkChip(lang, copy.articles, '/articles'),
    buildLinkChip(lang, copy.about, SITE_PAGE_ROUTE_SUFFIX.about),
    buildLinkChip(lang, copy.contact, SITE_PAGE_ROUTE_SUFFIX.contact),
    '    </nav>',
    content,
    '    <section style="margin-top:32px;padding:20px;border-radius:24px;border:1px solid rgba(180,140,60,0.2);background:linear-gradient(135deg,#fff9ec,#ffffff);">',
    `      <h2 style="margin:0 0 10px;font-size:1.05rem;font-weight:700;color:#7c2d12;">${escapeHtml(copy.trustTitle)}</h2>`,
    `      <p style="margin:0;color:#475569;line-height:1.8;">${escapeHtml(copy.trustBody)}</p>`,
    '      <div style="margin-top:14px;">',
    buildLinkChip(lang, copy.editorial, SITE_PAGE_ROUTE_SUFFIX.editorialPolicy),
    buildLinkChip(lang, copy.privacy, '/privacy'),
    buildLinkChip(lang, copy.terms, '/terms'),
    '      </div>',
    '    </section>',
    '  </main>',
    '</div>',
  ].join('\n')
}

function buildSeoBlock(lang: Lang, route: RouteSeo): string {
  const canonical = `${SITE_URL}/${lang}${route.suffix}`
  const robots = route.robots ?? 'index, follow'
  const hreflangs = LANGUAGES.map(
    (l) => `    <link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}${route.suffix}" />`,
  ).join('\n')

  return [
    `    <title>${escapeHtml(route.title[lang])}</title>`,
    `    <meta name="description" content="${escapeHtml(route.description[lang])}" />`,
    `    <meta name="robots" content="${robots}" />`,
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
  const robots = route.robots ?? 'index, follow'

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

  html = html.replace(/<meta name="robots" content="[^"]*" \/>/g, '')

  // Remove hardcoded FAQPage JSON-LD from base HTML (it will be re-injected only where appropriate)
  html = html.replace(/<script type="application\/ld\+json">\s*\{[\s\S]*?"@type":\s*"FAQPage"[\s\S]*?<\/script>/, '')
  html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${buildStaticFallback(lang, route)}</div>`)

  // Insert canonical + hreflang + og tags before </head>
  const seoBlock = [
    `    <meta name="robots" content="${robots}" />`,
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
    ...[
      '/guide',
      ...GUIDE_ROUTE_SUFFIXES,
      '/articles',
      ...SITE_PAGE_KEYS.map((key) => SITE_PAGE_ROUTE_SUFFIX[key]),
      '/privacy',
      '/terms',
      '/dream',
      '/pillars',
      '/ziwei/stars',
      '/sipsin',
    ].map(
      (s) => staticPageSeo(s),
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
