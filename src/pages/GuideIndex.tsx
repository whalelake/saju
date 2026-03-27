import { Link, useParams } from 'react-router'
import { useI18n, type Language } from '../i18n'
import Breadcrumb from '../components/Breadcrumb'
import AdBanner from '../components/AdBanner'
import SeoHead from '../components/SeoHead'

interface GuideCategory {
  title: string
  description: string
  topics: {
    slug: string
    title: string
    description: string
  }[]
}

const guideContent: Record<Language, GuideCategory[]> = {
  en: [
    {
      title: 'Saju (Four Pillars)',
      description: 'Learn the ancient Chinese system of Four Pillars of Destiny',
      topics: [
        { slug: 'saju', title: 'What is Saju?', description: 'A complete introduction to Four Pillars of Destiny' },
        { slug: 'saju/ten-gods', title: 'Ten Gods Explained', description: 'Understanding the relationships in your chart' },
        { slug: 'saju/day-master', title: 'Day Master Types', description: 'Discover your elemental nature' },
      ],
    },
    {
      title: 'Zi Wei Dou Shu',
      description: 'Explore Purple Star Astrology from Chinese tradition',
      topics: [
        { slug: 'ziwei', title: 'What is Zi Wei Dou Shu?', description: 'Introduction to Purple Star calculation' },
        { slug: 'ziwei/12-palaces', title: 'The 12 Palaces', description: 'Life areas in your Zi Wei chart' },
      ],
    },
    {
      title: 'Western Astrology',
      description: 'Understand your Western natal chart',
      topics: [
        { slug: 'natal', title: 'Birth Chart Guide', description: 'Learn to read your natal chart' },
        { slug: 'natal/planets', title: 'Planets in Astrology', description: 'The meaning of each planet' },
        { slug: 'natal/houses', title: 'The 12 Houses', description: 'Life areas in Western astrology' },
      ],
    },
  ],
  ja: [
    {
      title: '四柱推命',
      description: '古代中国の四柱推命を学ぶ',
      topics: [
        { slug: 'saju', title: '四柱推命とは？', description: '四柱推命の完全入門' },
        { slug: 'saju/ten-gods', title: '十神の解説', description: '命式の関係性を理解する' },
      ],
    },
    {
      title: '紫微斗数',
      description: '中国伝統の紫微斗数を探る',
      topics: [
        { slug: 'ziwei', title: '紫微斗数とは？', description: '紫微斗数の入門' },
        { slug: 'ziwei/12-palaces', title: '十二宮', description: '紫微命盤の各宮位' },
      ],
    },
    {
      title: '西洋占星術',
      description: '西洋のネイタルチャートを理解する',
      topics: [
        { slug: 'natal', title: '出生チャートガイド', description: 'ネイタルチャートの読み方' },
        { slug: 'natal/planets', title: '惑星の意味', description: '各惑星の象徴' },
      ],
    },
  ],
  ko: [
    {
      title: '사주팔자',
      description: '동양 명리학의 사주팔자를 배워보세요',
      topics: [
        { slug: 'saju', title: '사주팔자란?', description: '사주팔자 완벽 입문 가이드' },
        { slug: 'saju/ten-gods', title: '십신 해설', description: '사주의 관계성 이해하기' },
        { slug: 'saju/day-master', title: '일간의 종류', description: '나의 오행 성향 알아보기' },
      ],
    },
    {
      title: '자미두수',
      description: '중국 전통 명리학 자미두수 탐구',
      topics: [
        { slug: 'ziwei', title: '자미두수란?', description: '자미두수 입문 가이드' },
        { slug: 'ziwei/12-palaces', title: '십이궁', description: '자미명반의 각 궁위 설명' },
      ],
    },
    {
      title: '서양 점성술',
      description: '서양 출생차트 이해하기',
      topics: [
        { slug: 'natal', title: '출생차트 가이드', description: '네이탈 차트 읽는 법' },
        { slug: 'natal/planets', title: '행성의 의미', description: '각 행성의 상징' },
        { slug: 'natal/houses', title: '12 하우스', description: '서양 점성술의 하우스' },
      ],
    },
  ],
  zh: [
    {
      title: '四柱八字',
      description: '学习中国古代四柱八字',
      topics: [
        { slug: 'saju', title: '什么是四柱八字？', description: '四柱八字完整入门' },
        { slug: 'saju/ten-gods', title: '十神详解', description: '理解命局中的关系' },
      ],
    },
    {
      title: '紫微斗数',
      description: '探索中国传统紫微斗数',
      topics: [
        { slug: 'ziwei', title: '什么是紫微斗数？', description: '紫微斗数入门' },
        { slug: 'ziwei/12-palaces', title: '十二宫', description: '紫微命盘的各宫位' },
      ],
    },
    {
      title: '西方占星术',
      description: '理解西方本命盘',
      topics: [
        { slug: 'natal', title: '出生图指南', description: '学习阅读本命盘' },
        { slug: 'natal/planets', title: '行星含义', description: '各行星的象征' },
      ],
    },
  ],
}

export default function GuideIndex() {
  const { lang } = useParams<{ lang: string }>()
  const { t } = useI18n()
  const language = (lang || 'ko') as Language
  const seoTitle = language === 'ko'
    ? '명리학 가이드 - 사주, 자미두수, 점성술 배우기'
    : language === 'ja'
      ? '占術ガイド - 四柱推命・紫微斗数・西洋占星術を学ぶ'
      : language === 'zh'
        ? '命理指南 - 学习四柱、紫微斗数与西方占星'
        : 'Fortune Guide - Learn Saju, Zi Wei Dou Shu, and Astrology'
  const seoDescription = language === 'ko'
    ? '사주팔자, 자미두수, 서양 점성술을 쉽게 이해할 수 있도록 주제별로 정리한 가이드 모음입니다.'
    : language === 'ja'
      ? '四柱推命、紫微斗数、西洋占星術をテーマ別に学べるガイド一覧です。'
      : language === 'zh'
        ? '按主题整理的四柱、紫微斗数与西方占星指南合集。'
        : 'A topic-based guide hub for learning Saju, Zi Wei Dou Shu, and Western astrology.'

  const categories = guideContent[language] || guideContent.ko

  const breadcrumbItems = [
    { label: t.guide.title },
  ]

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', position: 1, name: language === 'ko' ? '홈' : language === 'ja' ? 'ホーム' : language === 'zh' ? '首页' : 'Home', item: `https://saju-wheat.vercel.app/${language}/` },
      { '@type': 'ListItem', position: 2, name: t.guide.title },
    ],
  }

  return (
    <div className="min-h-screen bg-base-200">
      <SeoHead
        language={language}
        title={seoTitle}
        description={seoDescription}
        pathByLanguage={{
          ko: '/ko/guide',
          en: '/en/guide',
          ja: '/ja/guide',
          zh: '/zh/guide',
        }}
        structuredData={breadcrumbData}
      />
      <header className="navbar bg-base-100 border-b border-base-300 sticky top-0 z-40">
        <div className="navbar-start">
          <Link to={`/${lang}/`} className="btn btn-ghost text-xl font-hanja">
            {t.hero.title}
          </Link>
        </div>
        <div className="navbar-end">
          <Link to={`/${lang}/`} className="btn btn-primary btn-sm">
            {t.hero.cta}
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-base-content mb-2">
            {t.guide.title}
          </h1>
          <p className="text-base-content/70">
            {language === 'ko' ? '동양 명리학과 서양 점성술을 쉽게 배워보세요.' :
             language === 'ja' ? '東洋の命理学と西洋の占星術を分かりやすく学びましょう。' :
             language === 'zh' ? '轻松学习东方命理学和西方占星术。' :
             'Learn Eastern metaphysics and Western astrology with easy-to-understand guides.'}
          </p>
        </div>

        <AdBanner slot="guide_top" format="horizontal" />

        <div className="space-y-6 mt-6">
          {categories.map((category, catIndex) => (
            <section key={catIndex} className="card bg-base-100 border-oriental">
              <div className="card-body">
                <h2 className="card-title text-base-content font-hanja">
                  {category.title}
                </h2>
                <p className="text-base-content/70 text-sm mb-4">
                  {category.description}
                </p>
                <div className="space-y-3">
                  {category.topics.map((topic, topicIndex) => (
                    <Link
                      key={topicIndex}
                      to={`/${lang}/guide/${topic.slug}`}
                      className="block p-3 rounded-lg border border-base-300 hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      <h3 className="font-medium text-base-content">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-base-content/60">
                        {topic.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to={`/${lang}/`} className="btn btn-primary btn-lg">
            {t.hero.cta}
          </Link>
        </div>
      </main>

      <footer className="border-t border-base-300 bg-base-100 mt-8">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center text-sm text-base-content/60">
          &copy; 2025 {t.footer.copyright}
        </div>
      </footer>
    </div>
  )
}
