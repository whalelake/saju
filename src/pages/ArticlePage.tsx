import { Link, useParams, Navigate } from 'react-router'
import { useI18n } from '../i18n'
import SeoHead from '../components/SeoHead'
import AdBanner from '../components/AdBanner'
import { ARTICLE_CATALOG, ARTICLE_RELATED_MAP, type ArticleKey } from '../content/article-catalog'

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

type LanguageKey = 'ko' | 'en' | 'ja' | 'zh'

const ARTICLE_COPY: Record<LanguageKey, {
  sponsored: string
  topAdLabel: string
  midAdLabel: string
  bottomAdLabel: string
  applyTitle: string
  applyDescription: string
  applyPrimary: string
  applySecondary: string
  inlineTitle: string
  inlineDescription: string
  inlinePrimary: string
  inlineSecondary: string
  relatedTitle: string
  relatedDescription: string
  relatedAll: string
  aiTitle: string
  aiDescription: string
  aiPrimary: string
  aiSecondary: string
  footerPrimary: string
}> = {
  ko: {
    sponsored: '광고',
    topAdLabel: '이 글을 다 읽기 전에 참고할 만한 영역',
    midAdLabel: '읽는 흐름을 해치지 않는 중간 광고',
    bottomAdLabel: '다음 읽기로 넘어가기 전 광고',
    applyTitle: '읽은 내용 바로 적용해보기',
    applyDescription: '지금 계산하고 AI 해석까지 이어보면 이해가 훨씬 빨라져요.',
    applyPrimary: '내 명식 계산하기',
    applySecondary: '가이드 더 보기',
    inlineTitle: '본문 중간에서 바로 계산해보기',
    inlineDescription: '개념을 읽은 직후 계산으로 넘어가면, 내 결과와 연결해서 이해하기 쉬워집니다.',
    inlinePrimary: '지금 계산 이어가기',
    inlineSecondary: '사주 가이드 보기',
    relatedTitle: '이어서 읽기 좋은 글',
    relatedDescription: '계산이나 AI 해석으로 이어지기 좋은 주제만 골랐어요.',
    relatedAll: '전체 보기',
    aiTitle: '이 주제로 AI 해석까지 이어가기',
    aiDescription: '계산 후 바로 AI에게 성격, 관계, 일과 돈 흐름을 이어서 물어볼 수 있어요.',
    aiPrimary: '계산 후 AI 질문 시작',
    aiSecondary: '관련 가이드 먼저 보기',
    footerPrimary: '명식 계산하기',
  },
  en: {
    sponsored: 'Sponsored',
    topAdLabel: 'A sponsored spot before you continue reading',
    midAdLabel: 'A mid-article ad placed away from action buttons',
    bottomAdLabel: 'A sponsored block before the next action',
    applyTitle: 'Apply what you just read',
    applyDescription: 'Run your chart now and continue straight into AI interpretation.',
    applyPrimary: 'Calculate my chart',
    applySecondary: 'Browse guides',
    inlineTitle: 'Calculate while the concept is still fresh',
    inlineDescription: 'Jumping into calculation right after the explanation makes the topic easier to connect to your own chart.',
    inlinePrimary: 'Continue to calculation',
    inlineSecondary: 'Read the Saju guide',
    relatedTitle: 'Read next',
    relatedDescription: 'These topics connect well to calculation and AI interpretation.',
    relatedAll: 'See all',
    aiTitle: 'Continue into AI interpretation on this topic',
    aiDescription: 'After calculation, you can ask AI about personality, relationships, work, and money right away.',
    aiPrimary: 'Start AI questions after calculation',
    aiSecondary: 'Read a related guide first',
    footerPrimary: 'Calculate My Chart',
  },
  ja: {
    sponsored: '広告',
    topAdLabel: '読み進める前のスポンサード枠',
    midAdLabel: '操作ボタンから距離を取った中段広告',
    bottomAdLabel: '次の行動に進む前の広告枠',
    applyTitle: '読んだ内容をそのまま試す',
    applyDescription: '今すぐ計算してAI解釈まで進むと理解がぐっと早くなります。',
    applyPrimary: '自分の命式を計算する',
    applySecondary: 'ガイドを見る',
    inlineTitle: '本文の途中でそのまま計算してみる',
    inlineDescription: '概念を読んだ直後に計算へ進むと、自分の結果に結びつけて理解しやすくなります。',
    inlinePrimary: '今すぐ計算へ進む',
    inlineSecondary: '四柱推命ガイドを見る',
    relatedTitle: '続けて読むとよい記事',
    relatedDescription: '計算やAI解釈につながりやすいテーマを選びました。',
    relatedAll: '一覧を見る',
    aiTitle: 'このテーマでAI解釈まで進む',
    aiDescription: '計算後すぐに、性格・関係・仕事・お金についてAIに続けて質問できます。',
    aiPrimary: '計算してAI質問へ進む',
    aiSecondary: '関連ガイドを見る',
    footerPrimary: '命式を計算する',
  },
  zh: {
    sponsored: '广告',
    topAdLabel: '继续阅读前的赞助位',
    midAdLabel: '与操作按钮保持距离的中段广告',
    bottomAdLabel: '进入下一步前的广告位',
    applyTitle: '马上把刚读的内容用起来',
    applyDescription: '现在直接去计算并查看 AI 解读，会更容易理解这些内容。',
    applyPrimary: '计算我的命盘',
    applySecondary: '查看更多指南',
    inlineTitle: '读到一半时直接去计算',
    inlineDescription: '刚看完概念就进入计算，更容易把内容和自己的命盘联系起来。',
    inlinePrimary: '继续去计算',
    inlineSecondary: '查看四柱指南',
    relatedTitle: '适合继续阅读的文章',
    relatedDescription: '这些主题更适合继续进入计算和 AI 解读。',
    relatedAll: '查看全部',
    aiTitle: '围绕这个主题继续进入 AI 解读',
    aiDescription: '完成计算后，你可以继续向 AI 提问性格、关系、工作和金钱。',
    aiPrimary: '计算后开始 AI 提问',
    aiSecondary: '先看相关指南',
    footerPrimary: '计算命盘',
  },
}

interface ArticleCard {
  id: string
  key: ArticleKey
  content: ArticleContent
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
  const currentLang = (lang || language) as LanguageKey
  const copy = ARTICLE_COPY[currentLang]

  const articleCards: ArticleCard[] = ARTICLE_CATALOG.map((item) => ({
    id: item.id,
    key: item.key,
    content: t.articles[item.key],
  }))

  const article = articleId ? articleCards.find((item) => item.id === articleId)?.content ?? null : null
  const relatedIds = articleId ? ARTICLE_RELATED_MAP[articleId] ?? [] : []
  const relatedArticles = [
    ...relatedIds
      .map((id) => articleCards.find((item) => item.id === id))
      .filter((item): item is ArticleCard => Boolean(item)),
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

            <section className="mb-8 rounded-2xl border border-base-300 bg-base-200/70 p-4">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="badge badge-outline">{copy.sponsored}</div>
                <p className="text-xs text-base-content/50">{copy.topAdLabel}</p>
              </div>
              <AdBanner slot="SLOT_ARTICLE_TOP" format="horizontal" />
            </section>

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

              <section className="not-prose mb-8 rounded-2xl border border-secondary/20 bg-secondary/5 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-base-content">{copy.inlineTitle}</h2>
                    <p className="text-sm text-base-content/70 mt-1">{copy.inlineDescription}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/${currentLang}/`}
                      className="btn btn-primary btn-sm"
                      onClick={() => handleArticleCtaClick('article_inline', 'home_calculator')}
                    >
                      {copy.inlinePrimary}
                    </Link>
                    <Link
                      to={`/${currentLang}/guide/saju`}
                      className="btn btn-outline btn-sm"
                      onClick={() => handleArticleCtaClick('article_inline', 'guide_saju')}
                    >
                      {copy.inlineSecondary}
                    </Link>
                  </div>
                </div>
              </section>

              <section className="not-prose mb-8 rounded-2xl border border-base-300 bg-base-200/70 p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="badge badge-outline">{copy.sponsored}</div>
                  <p className="text-xs text-base-content/50">{copy.midAdLabel}</p>
                </div>
                <AdBanner slot="SLOT_ARTICLE_MID" format="horizontal" />
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
                  <h2 className="text-lg font-bold text-base-content">{copy.applyTitle}</h2>
                  <p className="text-sm text-base-content/70 mt-1">{copy.applyDescription}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/${currentLang}/`}
                    className="btn btn-primary btn-sm"
                    onClick={() => handleArticleCtaClick('article_apply', 'home_calculator')}
                  >
                    {copy.applyPrimary}
                  </Link>
                  <Link
                    to={`/${currentLang}/guide`}
                    className="btn btn-outline btn-sm"
                    onClick={() => handleArticleCtaClick('article_apply', 'guide_index')}
                  >
                    {copy.applySecondary}
                  </Link>
                </div>
              </div>
            </section>

            <section className="mt-8">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-base-content">{copy.relatedTitle}</h2>
                  <p className="text-sm text-base-content/60">{copy.relatedDescription}</p>
                </div>
                <Link to={`/${currentLang}/articles`} className="text-sm text-primary">
                  {copy.relatedAll}
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {relatedArticles.map((item) => (
                  <Link
                    key={item.id}
                    to={`/${currentLang}/articles/${item.id}`}
                    className="rounded-xl border border-base-300 bg-base-200 p-4 transition-colors hover:border-primary hover:bg-base-100"
                    onClick={() => handleArticleCtaClick('article_related', item.id)}
                  >
                    <h3 className="font-semibold text-base-content">{item.content.title}</h3>
                    <p className="text-sm text-primary mt-1">{item.content.subtitle}</p>
                    <p className="text-sm text-base-content/70 mt-2 line-clamp-3">{item.content.intro}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-8 rounded-2xl border border-base-300 bg-base-200/70 p-4">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="badge badge-outline">{copy.sponsored}</div>
                <p className="text-xs text-base-content/50">{copy.bottomAdLabel}</p>
              </div>
              <AdBanner slot="SLOT_ARTICLE_BOTTOM" format="horizontal" />
            </section>

            <section className="mt-8 rounded-2xl border border-accent/20 bg-accent/10 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-base-content">{copy.aiTitle}</h2>
                  <p className="text-sm text-base-content/70 mt-1">{copy.aiDescription}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/${currentLang}/`}
                    className="btn btn-primary btn-sm"
                    onClick={() => handleArticleCtaClick('article_ai', 'home_ai_flow')}
                  >
                    {copy.aiPrimary}
                  </Link>
                  <Link
                    to={`/${currentLang}/guide`}
                    className="btn btn-outline btn-sm"
                    onClick={() => handleArticleCtaClick('article_ai', 'guide_index')}
                  >
                    {copy.aiSecondary}
                  </Link>
                </div>
              </div>
            </section>

            <footer className="mt-8 pt-6 border-t border-base-300">
              <Link
                to={`/${currentLang}/`}
                className="btn btn-primary"
                onClick={() => handleArticleCtaClick('article_footer', 'home_calculator')}
              >
                {copy.footerPrimary}
              </Link>
            </footer>
          </div>
        </article>
      </div>
    </div>
  )
}
