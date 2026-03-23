import { Link, useParams } from 'react-router'
import { useI18n, type Language } from '../i18n'
import SeoHead from '../components/SeoHead'

export default function ArticlesIndex() {
  const { t, language } = useI18n()
  const { lang } = useParams()
  const currentLang = (lang || language) as Language
  const isKo = currentLang === 'ko'
  const isJa = currentLang === 'ja'
  const isZh = currentLang === 'zh'
  const seoTitle = isKo
    ? '명리학 이야기 - 사주, 자미두수, 점성술 입문 콘텐츠'
    : isJa
      ? '命理学のおはなし - 四柱推命・紫微斗数・占星術の入門記事'
      : isZh
        ? '命理学故事 - 四柱、紫微斗数、占星入门文章'
        : 'Destiny Insights - Beginner Guides to Saju, Zi Wei, and Astrology'
  const seoDescription = isKo
    ? '사주, 자미두수, 점성술을 쉽게 이해할 수 있는 입문 기사와 실전 해석 글을 모았습니다.'
    : isJa
      ? '四柱推命、紫微斗数、西洋占星術をわかりやすく学べる入門記事をまとめています。'
      : isZh
        ? '汇总适合入门的四柱、紫微斗数与西方占星内容，方便继续进入计算与 AI 解读。'
        : 'Browse beginner-friendly articles on Saju, Zi Wei Dou Shu, and Western astrology, built to lead into calculation and AI interpretation.'

  const articles = [
    {
      id: 'what-is-saju',
      category: isKo ? '입문' : isJa ? '入門' : isZh ? '入门' : 'Starter',
      title: t.articles.whatIsSaju.title,
      subtitle: t.articles.whatIsSaju.subtitle,
      intro: t.articles.whatIsSaju.intro,
    },
    {
      id: 'five-elements',
      category: isKo ? '기초 이론' : isJa ? '基礎理論' : isZh ? '基础理论' : 'Basics',
      title: t.articles.fiveElements.title,
      subtitle: t.articles.fiveElements.subtitle,
      intro: t.articles.fiveElements.intro,
    },
    {
      id: 'what-is-ziwei',
      category: isKo ? '입문' : isJa ? '入門' : isZh ? '入门' : 'Starter',
      title: t.articles.whatIsZiwei.title,
      subtitle: t.articles.whatIsZiwei.subtitle,
      intro: t.articles.whatIsZiwei.intro,
    },
    {
      id: 'unknown-time-saju',
      category: isKo ? '실전 팁' : isJa ? '実戦ヒント' : isZh ? '实战技巧' : 'Practical',
      title: t.articles.unknownTimeSaju.title,
      subtitle: t.articles.unknownTimeSaju.subtitle,
      intro: t.articles.unknownTimeSaju.intro,
    },
    {
      id: 'love-and-relationships',
      category: isKo ? '관계 해석' : isJa ? '関係解釈' : isZh ? '关系解读' : 'Relationships',
      title: t.articles.loveAndRelationships.title,
      subtitle: t.articles.loveAndRelationships.subtitle,
      intro: t.articles.loveAndRelationships.intro,
    },
    {
      id: 'career-and-money',
      category: isKo ? '커리어' : isJa ? '仕事とお金' : isZh ? '事业财运' : 'Career',
      title: t.articles.careerAndMoney.title,
      subtitle: t.articles.careerAndMoney.subtitle,
      intro: t.articles.careerAndMoney.intro,
    },
    {
      id: 'day-master-types',
      category: isKo ? '사주 심화' : isJa ? '四柱深掘り' : isZh ? '四柱进阶' : 'Saju Deep Dive',
      title: t.articles.dayMasterTypes.title,
      subtitle: t.articles.dayMasterTypes.subtitle,
      intro: t.articles.dayMasterTypes.intro,
    },
    {
      id: 'ten-gods-for-beginners',
      category: isKo ? '사주 심화' : isJa ? '四柱深掘り' : isZh ? '四柱进阶' : 'Saju Deep Dive',
      title: t.articles.tenGodsForBeginners.title,
      subtitle: t.articles.tenGodsForBeginners.subtitle,
      intro: t.articles.tenGodsForBeginners.intro,
    },
    {
      id: 'big-three-astrology',
      category: isKo ? '점성술' : isJa ? '占星術' : isZh ? '占星' : 'Astrology',
      title: t.articles.bigThreeAstrology.title,
      subtitle: t.articles.bigThreeAstrology.subtitle,
      intro: t.articles.bigThreeAstrology.intro,
    },
  ]

  const featuredArticles = [articles[0], articles[6], articles[8]]
  const collections = [
    {
      title: isKo ? '처음 보는 사람에게' : isJa ? '最初に読む3本' : isZh ? '新手先看这三篇' : 'Start Here',
      description: isKo
        ? '사주, 자미두수, 점성술의 입구부터 잡아주는 글이에요.'
        : isJa
          ? '四柱推命・紫微斗数・占星術の入口を先に押さえます。'
          : isZh
            ? '先抓住四柱、紫微斗数、占星的入口。'
            : 'A simple path into Saju, Zi Wei, and astrology.',
      ids: ['what-is-saju', 'what-is-ziwei', 'big-three-astrology'],
    },
    {
      title: isKo ? '계산 뒤 바로 읽기 좋은 글' : isJa ? '計算後に読みやすい3本' : isZh ? '算完后最适合继续看的三篇' : 'Best After Calculation',
      description: isKo
        ? '결과를 보고 바로 AI 질문으로 이어지기 좋은 주제만 묶었어요.'
        : isJa
          ? '結果を見たあと、そのままAI質問に進みやすいテーマです。'
          : isZh
            ? '这些主题最适合看完结果后直接继续 AI 提问。'
            : 'Topics that bridge naturally into AI interpretation.',
      ids: ['unknown-time-saju', 'career-and-money', 'love-and-relationships'],
    },
  ]

  const collectionItems = collections.map((collection) => ({
    ...collection,
    articles: collection.ids
      .map((id) => articles.find((article) => article.id === id))
      .filter((article): article is typeof articles[number] => Boolean(article)),
  }))

  return (
    <div className="min-h-screen bg-base-200">
      <SeoHead
        language={currentLang}
        title={seoTitle}
        description={seoDescription}
        pathByLanguage={{
          ko: '/ko/articles',
          en: '/en/articles',
          ja: '/ja/articles',
          zh: '/zh/articles',
        }}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to={`/${currentLang}/`} className="btn btn-ghost btn-sm mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t.common.close}
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{t.articles.title}</h1>
          <p className="text-base-content/70">{t.articles.subtitle}</p>
        </div>

        <section className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-5 sm:p-6 mb-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <div className="badge badge-primary badge-outline mb-3">
                {isKo ? '추천 시작점' : isJa ? 'おすすめの入口' : isZh ? '推荐入口' : 'Recommended path'}
              </div>
              <h2 className="text-2xl font-bold text-base-content">
                {isKo ? '지금 읽기 좋은 글부터 먼저 잡아두세요' :
                 isJa ? '今読むべき記事から先に押さえてください' :
                 isZh ? '先从现在最值得读的内容开始' :
                 'Start with the articles that matter right now'}
              </h2>
              <p className="mt-2 text-sm text-base-content/70">
                {isKo
                  ? '처음 보는 사람, 계산을 막 끝낸 사람, AI 질문으로 이어가려는 사람 기준으로 묶었습니다.'
                  : isJa
                    ? '初学者、計算直後、AI質問へ進みたい人向けに分けています。'
                    : isZh
                      ? '按新手、刚算完结果、准备继续 AI 提问三个场景整理好了。'
                      : 'Grouped for first-time readers, post-calculation follow-up, and AI-driven reading.'}
              </p>
            </div>
            <Link to={`/${currentLang}/`} className="btn btn-primary btn-sm lg:mt-1">
              {isKo ? '바로 계산하러 가기' :
               isJa ? '今すぐ計算する' :
               isZh ? '立即去计算' :
               'Calculate now'}
            </Link>
          </div>

          <div className="grid gap-4 mt-6 md:grid-cols-3">
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                to={`/${currentLang}/articles/${article.id}`}
                className="rounded-2xl border border-base-200 bg-base-100/90 p-4 transition-colors hover:border-primary hover:bg-base-100"
              >
                <div className="badge badge-outline badge-secondary mb-3">{article.category}</div>
                <h3 className="font-semibold text-base-content line-clamp-2">{article.title}</h3>
                <p className="text-sm text-base-content/65 mt-2 line-clamp-3">{article.intro}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-4 mb-8 md:grid-cols-2">
          {collectionItems.map((collection) => (
            <div key={collection.title} className="rounded-2xl border border-base-300 bg-base-100 p-5">
              <h2 className="text-lg font-bold">{collection.title}</h2>
              <p className="text-sm text-base-content/65 mt-1">{collection.description}</p>
              <div className="mt-4 space-y-3">
                {collection.articles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/${currentLang}/articles/${article.id}`}
                    className="flex items-start justify-between gap-3 rounded-xl bg-base-200 px-4 py-3 transition-colors hover:bg-base-300"
                  >
                    <div>
                      <div className="text-sm font-medium text-base-content">{article.title}</div>
                      <div className="text-xs text-base-content/60 mt-1">{article.subtitle}</div>
                    </div>
                    <span className="text-xs text-primary shrink-0 mt-0.5">{t.articles.readMore}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        <div className="grid gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/${currentLang}/articles/${article.id}`}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="card-body">
                <div className="badge badge-outline badge-secondary w-fit">{article.category}</div>
                <h2 className="card-title text-xl">{article.title}</h2>
                <p className="text-sm text-primary mb-2">{article.subtitle}</p>
                <p className="text-base-content/70 line-clamp-2">{article.intro}</p>
                <div className="card-actions justify-end mt-4">
                  <span className="btn btn-primary btn-sm">{t.articles.readMore}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
