import { Link, useParams, Navigate } from 'react-router'
import { useI18n } from '../i18n'
import SeoHead from '../components/SeoHead'

type ArticleContent = {
  title: string
  subtitle: string
  intro: string
  section1Title: string
  section1Text: string
  section2Title: string
  section2Text: string
  section3Title: string
  section3Text: string
  section4Title: string
  section4Text: string
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

function trackEvent(eventName: string, params: Record<string, string | number | boolean | undefined>) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: eventName, ...params })
  }
}

export default function ArticlePage() {
  const { t, language } = useI18n()
  const { lang, articleId } = useParams()
  const currentLang = (lang || language) as typeof language

  const articleCards = [
    { id: 'what-is-saju', content: t.articles.whatIsSaju },
    { id: 'five-elements', content: t.articles.fiveElements },
    { id: 'what-is-ziwei', content: t.articles.whatIsZiwei },
    { id: 'unknown-time-saju', content: t.articles.unknownTimeSaju },
    { id: 'love-and-relationships', content: t.articles.loveAndRelationships },
    { id: 'career-and-money', content: t.articles.careerAndMoney },
    { id: 'day-master-types', content: t.articles.dayMasterTypes },
    { id: 'ten-gods-for-beginners', content: t.articles.tenGodsForBeginners },
    { id: 'big-three-astrology', content: t.articles.bigThreeAstrology },
  ]

  const articlesMap: Record<string, ArticleContent> = {
    'what-is-saju': t.articles.whatIsSaju,
    'five-elements': t.articles.fiveElements,
    'what-is-ziwei': t.articles.whatIsZiwei,
    'unknown-time-saju': t.articles.unknownTimeSaju,
    'love-and-relationships': t.articles.loveAndRelationships,
    'career-and-money': t.articles.careerAndMoney,
    'day-master-types': t.articles.dayMasterTypes,
    'ten-gods-for-beginners': t.articles.tenGodsForBeginners,
    'big-three-astrology': t.articles.bigThreeAstrology,
  }

  const relatedArticleMap: Record<string, string[]> = {
    'what-is-saju': ['day-master-types', 'ten-gods-for-beginners', 'career-and-money'],
    'five-elements': ['what-is-saju', 'career-and-money', 'big-three-astrology'],
    'what-is-ziwei': ['love-and-relationships', 'career-and-money', 'big-three-astrology'],
    'unknown-time-saju': ['day-master-types', 'ten-gods-for-beginners', 'what-is-saju'],
    'love-and-relationships': ['career-and-money', 'big-three-astrology', 'what-is-saju'],
    'career-and-money': ['ten-gods-for-beginners', 'day-master-types', 'big-three-astrology'],
    'day-master-types': ['ten-gods-for-beginners', 'career-and-money', 'what-is-saju'],
    'ten-gods-for-beginners': ['day-master-types', 'unknown-time-saju', 'career-and-money'],
    'big-three-astrology': ['love-and-relationships', 'career-and-money', 'what-is-ziwei'],
  }

  const article = articleId ? articlesMap[articleId] : null
  const relatedIds = articleId ? relatedArticleMap[articleId] ?? [] : []
  const relatedArticles = [
    ...relatedIds
      .map((id) => articleCards.find((item) => item.id === id))
      .filter((item): item is { id: string; content: ArticleContent } => Boolean(item)),
    ...articleCards.filter((item) => item.id !== articleId && !relatedIds.includes(item.id)),
  ].slice(0, 3)

  if (!article) {
    return <Navigate to={`/${currentLang}/articles`} replace />
  }

  const articlePathByLanguage = {
    ko: `/ko/articles/${articleId}`,
    en: `/en/articles/${articleId}`,
    ja: `/ja/articles/${articleId}`,
    zh: `/zh/articles/${articleId}`,
  } as const

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.intro,
    inLanguage: currentLang,
    mainEntityOfPage: `https://saju-wheat.vercel.app${articlePathByLanguage[currentLang]}`,
    url: `https://saju-wheat.vercel.app${articlePathByLanguage[currentLang]}`,
    dateModified: '2026-03-21',
    author: {
      '@type': 'Organization',
      name: currentLang === 'ko' ? '명운판' : 'Myungunpan',
    },
    publisher: {
      '@type': 'Organization',
      name: currentLang === 'ko' ? '명운판' : 'Myungunpan',
      logo: {
        '@type': 'ImageObject',
        url: 'https://saju-wheat.vercel.app/og-image.png',
      },
    },
    image: 'https://saju-wheat.vercel.app/og-image.png',
  }

  function handleArticleCtaClick(entry: string, target: string) {
    trackEvent('article_cta_click', {
      lang: currentLang,
      article_id: articleId,
      entry,
      target,
    })
  }

  return (
    <div className="min-h-screen bg-base-200">
      <SeoHead
        language={currentLang}
        title={`${article.title} | ${currentLang === 'ko' ? '명운판' : 'Myungunpan'}`}
        description={article.intro}
        pathByLanguage={articlePathByLanguage}
        type="article"
        structuredData={articleStructuredData}
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link to={`/${currentLang}/articles`} className="btn btn-ghost btn-sm mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t.articles.backToArticles}
        </Link>

        <article className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <header className="mb-6 border-b border-base-300 pb-6">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{article.title}</h1>
              <p className="text-primary">{article.subtitle}</p>
            </header>

            <div className="prose prose-sm sm:prose max-w-none">
              <p className="lead text-lg text-base-content/80 mb-8">
                {article.intro}
              </p>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">{article.section1Title}</h2>
                <p>{article.section1Text}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">{article.section2Title}</h2>
                <p>{article.section2Text}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">{article.section3Title}</h2>
                <p>{article.section3Text}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">{article.section4Title}</h2>
                <p>{article.section4Text}</p>
              </section>
            </div>

            <section className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-base-content">
                    {language === 'ko' ? '읽은 내용 바로 적용해보기' :
                     language === 'ja' ? '読んだ内容をそのまま試す' :
                     language === 'zh' ? '马上把刚读的内容用起来' :
                     'Apply what you just read'}
                  </h2>
                  <p className="text-sm text-base-content/70 mt-1">
                    {language === 'ko' ? '지금 계산하고 AI 해석까지 이어보면 이해가 훨씬 빨라져요.' :
                     language === 'ja' ? '今すぐ計算してAI解釈まで進むと理解がぐっと早くなります。' :
                     language === 'zh' ? '现在直接去计算并查看 AI 解读，会更容易理解这些内容。' :
                     'Run your chart now and continue straight into AI interpretation.'}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/${currentLang}/`}
                    className="btn btn-primary btn-sm"
                    onClick={() => handleArticleCtaClick('article_apply', 'home_calculator')}
                  >
                    {language === 'ko' ? '내 명식 계산하기' :
                     language === 'ja' ? '自分の命式を計算する' :
                     language === 'zh' ? '计算我的命盘' :
                     'Calculate my chart'}
                  </Link>
                  <Link
                    to={`/${currentLang}/guide`}
                    className="btn btn-outline btn-sm"
                    onClick={() => handleArticleCtaClick('article_apply', 'guide_index')}
                  >
                    {language === 'ko' ? '가이드 더 보기' :
                     language === 'ja' ? 'ガイドを見る' :
                     language === 'zh' ? '查看更多指南' :
                     'Browse guides'}
                  </Link>
                </div>
              </div>
            </section>

            <section className="mt-8">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-base-content">
                    {language === 'ko' ? '이어서 읽기 좋은 글' :
                     language === 'ja' ? '続けて読むとよい記事' :
                     language === 'zh' ? '适合继续阅读的文章' :
                     'Read next'}
                  </h2>
                  <p className="text-sm text-base-content/60">
                    {language === 'ko' ? '계산이나 AI 해석으로 이어지기 좋은 주제만 골랐어요.' :
                     language === 'ja' ? '計算やAI解釈につながりやすいテーマを選びました。' :
                     language === 'zh' ? '这些主题更适合继续进入计算和 AI 解读。' :
                     'These topics connect well to calculation and AI interpretation.'}
                  </p>
                </div>
                <Link to={`/${currentLang}/articles`} className="text-sm text-primary">
                  {language === 'ko' ? '전체 보기' :
                   language === 'ja' ? '一覧を見る' :
                   language === 'zh' ? '查看全部' :
                   'See all'}
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {relatedArticles.map((item) => (
                  <Link
                    key={item.id}
                    to={`/${currentLang}/articles/${item.id}`}
                    className="rounded-xl border border-base-300 bg-base-200 p-4 transition-colors hover:border-primary hover:bg-base-100"
                  >
                    <h3 className="font-semibold text-base-content">{item.content.title}</h3>
                    <p className="text-sm text-primary mt-1">{item.content.subtitle}</p>
                    <p className="text-sm text-base-content/70 mt-2 line-clamp-3">{item.content.intro}</p>
                  </Link>
                ))}
              </div>
            </section>

            <footer className="mt-8 pt-6 border-t border-base-300">
              <Link
                to={`/${currentLang}/`}
                className="btn btn-primary"
                onClick={() => handleArticleCtaClick('article_footer', 'home_calculator')}
              >
                {language === 'ko' ? '명식 계산하기' :
                 language === 'ja' ? '命式を計算する' :
                 language === 'zh' ? '计算命盘' :
                 'Calculate My Chart'}
              </Link>
            </footer>
          </div>
        </article>
      </div>
    </div>
  )
}
