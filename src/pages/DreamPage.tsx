import { useState, useRef } from 'react'
import { Link } from 'react-router'
import { useI18n, type Language } from '../i18n'
import SeoHead from '../components/SeoHead'
import AdBanner from '../components/AdBanner'
import { DREAM_CATEGORIES, matchDreamCategories, type DreamCategoryKey } from '../content/dream-categories'
import { ARTICLE_CATALOG } from '../content/article-catalog'

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export default function DreamPage() {
  const { t, language } = useI18n()
  const [dreamText, setDreamText] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [matchedCategories, setMatchedCategories] = useState<DreamCategoryKey[]>([])
  const resultRef = useRef<HTMLDivElement>(null)

  const dreamT = t.dream as {
    title: string
    subtitle: string
    description: string
    inputLabel: string
    inputPlaceholder: string
    submitButton: string
    analyzing: string
    resultTitle: string
    newDream: string
    relatedArticles: string
    tryCalculator: string
    tryCalculatorCta: string
    categories: Record<DreamCategoryKey, string>
    categoryMatch: string
    minLengthError: string
    apiError: string
  }

  function handleInputChange(value: string) {
    setDreamText(value)
    const matches = matchDreamCategories(value, language)
    setMatchedCategories(matches)
  }

  async function handleSubmit() {
    if (dreamText.trim().length < 10) {
      setError(dreamT.minLengthError)
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/dream-interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dream: dreamText,
          categories: matchedCategories,
          language,
        }),
      })

      if (!response.ok) throw new Error('API error')

      const data = await response.json()
      setResult(data.interpretation)

      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'dream_interpret_complete',
          dream_categories: matchedCategories.join(','),
          dream_length: dreamText.length,
        })
      }

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch {
      setError(dreamT.apiError)
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setDreamText('')
    setResult(null)
    setError(null)
    setMatchedCategories([])
  }

  const dreamArticles = ARTICLE_CATALOG.filter(a => a.cluster === 'dream')

  const seoTitle: Record<Language, string> = {
    ko: '꿈 해몽 - AI 꿈 해석 | 명운판',
    en: 'Dream Interpretation - AI Dream Analysis | Myungunpan',
    ja: '夢占い - AI 夢解釈 | 命運盤',
    zh: '解梦 - AI 梦境解读 | 命运盘',
  }
  const seoDescription: Record<Language, string> = {
    ko: '꿈의 내용을 자세히 적으면 AI가 전통 해몽과 심리학적 해석을 결합하여 따뜻한 풀이를 드립니다.',
    en: 'Describe your dream in detail and get a warm AI interpretation combining traditional dream analysis with psychological insights.',
    ja: '夢の内容を詳しく書くと、AIが伝統的な夢占いと心理学的解釈を組み合わせて温かい解釈をお届けします。',
    zh: '详细描述您的梦境，AI将结合传统解梦与心理学分析，为您提供温暖的解读。',
  }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', position: 1, name: language === 'ko' ? '홈' : language === 'ja' ? 'ホーム' : language === 'zh' ? '首页' : 'Home', item: `https://saju-wheat.vercel.app/${language}/` },
      { '@type': 'ListItem', position: 2, name: (t.dream as { title: string }).title },
    ],
  }

  return (
    <div className="min-h-screen bg-base-100">
      <SeoHead
        language={language as Language}
        title={seoTitle[language as Language]}
        description={seoDescription[language as Language]}
        pathByLanguage={{
          ko: '/ko/dream',
          en: '/en/dream',
          ja: '/ja/dream',
          zh: '/zh/dream',
        }}
        structuredData={breadcrumbData}
      />
      {/* Header */}
      <div className="navbar bg-base-200/50 backdrop-blur-sm sticky top-0 z-50 border-b border-base-300">
        <div className="flex-1">
          <Link to={`/${language}/`} className="btn btn-ghost text-lg font-bold">
            {(t.display as { brandChar: string }).brandChar} {(t.display as { brandName: string }).brandName}
          </Link>
        </div>
        <div className="flex-none gap-2">
          <Link to={`/${language}/`} className="btn btn-ghost btn-sm">
            {dreamT.tryCalculator}
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{dreamT.title}</h1>
          <p className="text-base-content/60">{dreamT.subtitle}</p>
        </div>

        <AdBanner slot="dream_top" className="mb-6" />

        {/* Input Form */}
        {!result && (
          <div className="card bg-base-200/50 shadow-lg">
            <div className="card-body">
              <label className="label">
                <span className="label-text text-lg font-medium">{dreamT.inputLabel}</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full h-40 text-base"
                placeholder={dreamT.inputPlaceholder}
                value={dreamText}
                onChange={e => handleInputChange(e.target.value)}
                disabled={loading}
              />

              {matchedCategories.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-base-content/50 mb-2">{dreamT.categoryMatch}:</p>
                  <div className="flex flex-wrap gap-2">
                    {matchedCategories.map(catKey => {
                      const cat = DREAM_CATEGORIES.find(c => c.key === catKey)
                      return (
                        <span key={catKey} className="badge badge-outline gap-1">
                          {cat?.icon} {dreamT.categories[catKey]}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}

              {error && (
                <div className="alert alert-error mt-3">
                  <span>{error}</span>
                </div>
              )}

              <div className="card-actions justify-end mt-4">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleSubmit}
                  disabled={loading || dreamText.trim().length < 10}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      {dreamT.analyzing}
                    </>
                  ) : (
                    dreamT.submitButton
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div ref={resultRef} className="space-y-6">
            <div className="card bg-base-200/50 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">{dreamT.resultTitle}</h2>

                {matchedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {matchedCategories.map(catKey => {
                      const cat = DREAM_CATEGORIES.find(c => c.key === catKey)
                      return (
                        <span key={catKey} className="badge badge-primary badge-outline gap-1">
                          {cat?.icon} {dreamT.categories[catKey]}
                        </span>
                      )
                    })}
                  </div>
                )}

                <div className="prose prose-sm max-w-none">
                  {result.split('\n').map((line, i) => {
                    if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-bold mt-4 mb-2">{line.slice(3)}</h2>
                    if (line.startsWith('### ')) return <h3 key={i} className="text-base font-semibold mt-3 mb-1">{line.slice(4)}</h3>
                    if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-bold mt-2">{line.slice(2, -2)}</p>
                    if (line.trim() === '') return <br key={i} />
                    return <p key={i} className="leading-relaxed">{line}</p>
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="btn btn-outline flex-1" onClick={handleReset}>
                {dreamT.newDream}
              </button>
              <Link to={`/${language}/`} className="btn btn-primary flex-1">
                {dreamT.tryCalculatorCta}
              </Link>
            </div>

            {dreamArticles.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-3">{dreamT.relatedArticles}</h3>
                <div className="grid gap-3">
                  {dreamArticles.map(article => {
                    const content = (t.articles as unknown as Record<string, { title: string; subtitle: string }>)[article.key]
                    if (!content) return null
                    return (
                      <Link
                        key={article.id}
                        to={`/${language}/articles/${article.id}`}
                        className="card card-compact bg-base-200/30 hover:bg-base-200/60 transition-colors"
                      >
                        <div className="card-body">
                          <h4 className="card-title text-sm">{content.title}</h4>
                          <p className="text-xs text-base-content/50">{content.subtitle}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        <AdBanner slot="dream_bottom" className="mt-8" />

        {!result && (
          <div className="text-center mt-8 p-6 bg-base-200/30 rounded-xl">
            <p className="text-base-content/60 mb-3">{dreamT.tryCalculator}</p>
            <Link to={`/${language}/`} className="btn btn-primary">
              {dreamT.tryCalculatorCta}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
