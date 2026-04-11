import { ARTICLE_CATALOG } from '../src/content/article-catalog'
import { expandArticleContent, type ArticleContentShape } from '../src/content/article-longform'
import { expandGuidePageContent } from '../src/content/guide-longform'
import { en } from '../src/i18n/en'
import { ja } from '../src/i18n/ja'
import { ko } from '../src/i18n/ko'
import { zh } from '../src/i18n/zh'
import { GUIDE_PAGE_CONTENT } from '../src/pages/LandingPage'

const LANGUAGES = ['ko', 'en', 'ja', 'zh'] as const
type Language = (typeof LANGUAGES)[number]

const I18N = { ko, en, ja, zh }

function countWords(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}

function countChars(text: string) {
  return text.replace(/\s+/g, '').length
}

function flattenArticle(article: ArticleContentShape) {
  return [
    article.intro,
    article.section1Text,
    article.section2Text,
    article.section3Text,
    article.section4Text,
  ].join('\n\n')
}

function flattenGuide(content: { sections: Array<{ content: string }> }) {
  return content.sections.map((section) => section.content).join('\n\n')
}

function printAuditBlock(title: string) {
  console.log(`\n${title}`)
  console.log('-'.repeat(title.length))
}

for (const language of LANGUAGES) {
  const expandedArticles = ARTICLE_CATALOG.map((meta) => {
    const content = I18N[language].articles[meta.key as keyof typeof ko.articles] as ArticleContentShape
    const expanded = expandArticleContent(content, meta.cluster, language)
    const flattened = flattenArticle(expanded)

    return {
      id: meta.id,
      words: countWords(flattened),
      chars: countChars(flattened),
    }
  })

  const expandedGuides = Object.entries(GUIDE_PAGE_CONTENT[language]).map(([topicKey, content]) => {
    const expanded = expandGuidePageContent(language, topicKey, content)
    const flattened = flattenGuide(expanded)

    return {
      topicKey,
      words: countWords(flattened),
      chars: countChars(flattened),
    }
  })

  const articleWords = expandedArticles.map((item) => item.words)
  const articleChars = expandedArticles.map((item) => item.chars)
  const guideWords = expandedGuides.map((item) => item.words)
  const guideChars = expandedGuides.map((item) => item.chars)

  const thinnestArticle = expandedArticles.reduce((lowest, current) =>
    current.chars < lowest.chars ? current : lowest,
  )
  const thinnestGuide = expandedGuides.reduce((lowest, current) =>
    current.chars < lowest.chars ? current : lowest,
  )

  printAuditBlock(`Locale: ${language}`)
  console.log(
    `Articles: ${expandedArticles.length} pages | avg ${Math.round(articleWords.reduce((sum, value) => sum + value, 0) / expandedArticles.length)} words | avg ${Math.round(articleChars.reduce((sum, value) => sum + value, 0) / expandedArticles.length)} chars`,
  )
  console.log(
    `Thinnest article: ${thinnestArticle.id} | ${thinnestArticle.words} words | ${thinnestArticle.chars} chars`,
  )
  console.log(
    `Guides: ${expandedGuides.length} pages | avg ${Math.round(guideWords.reduce((sum, value) => sum + value, 0) / expandedGuides.length)} words | avg ${Math.round(guideChars.reduce((sum, value) => sum + value, 0) / expandedGuides.length)} chars`,
  )
  console.log(
    `Thinnest guide: ${thinnestGuide.topicKey} | ${thinnestGuide.words} words | ${thinnestGuide.chars} chars`,
  )
}
