import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import { calculateSaju } from '@orrery/core/saju'
import { createChart } from '@orrery/core/ziwei'
import { calculateNatal } from '@orrery/core/natal'
import type { BirthInput, NatalChart, SajuResult, ZiweiChart, ZodiacSign } from '@orrery/core/types'
import { natalToText, sajuToText, ziweiToText } from '../utils/text-export.ts'

type TabKey = 'saju' | 'ziwei' | 'natal'
type LanguageKey = 'ko' | 'en' | 'ja' | 'zh'
type FollowupQuestionId = 'strength' | 'timing' | 'relationship' | 'career_money' | 'growth'

interface RelatedLink {
  slug: string
  path: string
  title: Record<LanguageKey, string>
  description: Record<LanguageKey, string>
}

interface Props {
  tab: TabKey
  language: LanguageKey
  input: BirthInput
  onOpenInterpret: () => void
  onSelectFollowupQuestion: (questionId: FollowupQuestionId) => void
  onSelectRelatedLink: (targetPath: string) => void
}

const FOLLOWUP_QUESTIONS: Record<TabKey, FollowupQuestionId[]> = {
  saju: ['strength', 'relationship', 'career_money'],
  ziwei: ['timing', 'relationship', 'growth'],
  natal: ['strength', 'career_money', 'growth'],
}

const QUESTION_LABELS: Record<LanguageKey, Record<FollowupQuestionId, string>> = {
  ko: {
    strength: '내 강점이 어디에서 드러나나요?',
    timing: '지금 시기에 가장 중요한 포인트는 뭐예요?',
    relationship: '연애와 인간관계 패턴을 알려줘요',
    career_money: '일과 돈 흐름을 쉽게 설명해줘요',
    growth: '더 잘 풀리려면 어떻게 움직여야 하나요?',
  },
  en: {
    strength: 'Where do my strengths stand out?',
    timing: 'What matters most in this period?',
    relationship: 'Explain my relationship patterns',
    career_money: 'Explain my work and money flow',
    growth: 'How should I move forward from here?',
  },
  ja: {
    strength: '私の強みはどこで出やすいですか？',
    timing: '今の時期で大事なポイントは？',
    relationship: '恋愛と人間関係の傾向を知りたいです',
    career_money: '仕事とお金の流れをわかりやすく教えてください',
    growth: 'もっと良くなるにはどう動けばいいですか？',
  },
  zh: {
    strength: '我的优势最容易体现在哪些地方？',
    timing: '这个阶段最重要的重点是什么？',
    relationship: '请解释我的感情与人际模式',
    career_money: '请用简单的话解释事业与财运',
    growth: '如果想更顺一些，我该怎么行动？',
  },
}

const SECTION_TEXT: Record<LanguageKey, {
  followup: string
  related: string
  relatedDesc: string
  guides: string
  moreAi: string
  aiPreview: string
  aiLoading: string
}> = {
  ko: {
    followup: '후속 질문',
    related: '연관 콘텐츠',
    relatedDesc: '지금 결과와 이어서 읽기 좋은 가이드와 글이에요.',
    guides: '가이드 전체 보기',
    moreAi: 'AI 해석 더 보기',
    aiPreview: 'AI 한 줄 요약',
    aiLoading: '실제 AI 요약을 불러오는 중이에요.',
  },
  en: {
    followup: 'Follow-up prompts',
    related: 'Related content',
    relatedDesc: 'Guides and articles that fit what you just calculated.',
    guides: 'Browse all guides',
    moreAi: 'Open AI interpretation',
    aiPreview: 'AI preview',
    aiLoading: 'Loading a real AI summary.',
  },
  ja: {
    followup: 'フォローアップ',
    related: '関連コンテンツ',
    relatedDesc: '今の結果とあわせて読むとわかりやすい内容です。',
    guides: 'ガイド一覧を見る',
    moreAi: 'AI解釈をもっと見る',
    aiPreview: 'AIの一行要約',
    aiLoading: '実際のAI要約を読み込み中です。',
  },
  zh: {
    followup: '后续问题',
    related: '相关内容',
    relatedDesc: '这些指南和文章更适合接着理解你刚才的结果。',
    guides: '查看全部指南',
    moreAi: '查看更多 AI 解读',
    aiPreview: 'AI 一句话摘要',
    aiLoading: '正在加载真实 AI 摘要。',
  },
}

const SIGN_LABELS: Record<LanguageKey, Record<ZodiacSign, string>> = {
  ko: {
    Aries: '양자리',
    Taurus: '황소자리',
    Gemini: '쌍둥이자리',
    Cancer: '게자리',
    Leo: '사자자리',
    Virgo: '처녀자리',
    Libra: '천칭자리',
    Scorpio: '전갈자리',
    Sagittarius: '사수자리',
    Capricorn: '염소자리',
    Aquarius: '물병자리',
    Pisces: '물고기자리',
  },
  en: {
    Aries: 'Aries',
    Taurus: 'Taurus',
    Gemini: 'Gemini',
    Cancer: 'Cancer',
    Leo: 'Leo',
    Virgo: 'Virgo',
    Libra: 'Libra',
    Scorpio: 'Scorpio',
    Sagittarius: 'Sagittarius',
    Capricorn: 'Capricorn',
    Aquarius: 'Aquarius',
    Pisces: 'Pisces',
  },
  ja: {
    Aries: '牡羊座',
    Taurus: '牡牛座',
    Gemini: '双子座',
    Cancer: '蟹座',
    Leo: '獅子座',
    Virgo: '乙女座',
    Libra: '天秤座',
    Scorpio: '蠍座',
    Sagittarius: '射手座',
    Capricorn: '山羊座',
    Aquarius: '水瓶座',
    Pisces: '魚座',
  },
  zh: {
    Aries: '白羊座',
    Taurus: '金牛座',
    Gemini: '双子座',
    Cancer: '巨蟹座',
    Leo: '狮子座',
    Virgo: '处女座',
    Libra: '天秤座',
    Scorpio: '天蝎座',
    Sagittarius: '射手座',
    Capricorn: '摩羯座',
    Aquarius: '水瓶座',
    Pisces: '双鱼座',
  },
}

const LINK_LIBRARY: Record<string, RelatedLink> = {
  guideSaju: {
    slug: 'guide-saju',
    path: '/guide/saju',
    title: {
      ko: '사주팔자란?',
      en: 'What is Saju?',
      ja: '四柱推命とは？',
      zh: '什么是四柱八字？',
    },
    description: {
      ko: '사주의 구조와 읽는 법을 한 번에 정리해요.',
      en: 'A quick primer on the Four Pillars system.',
      ja: '四柱推命の基本構造を整理します。',
      zh: '快速理解四柱八字的基本结构。',
    },
  },
  guideTenGods: {
    slug: 'guide-ten-gods',
    path: '/guide/saju/ten-gods',
    title: {
      ko: '십신 해설',
      en: 'Ten Gods Explained',
      ja: '十神の解説',
      zh: '十神详解',
    },
    description: {
      ko: '관계성과 성향을 읽는 핵심 포인트예요.',
      en: 'Understand the relationship logic inside your chart.',
      ja: '命式の関係性を読むポイントです。',
      zh: '理解命局关系的核心入口。',
    },
  },
  guideZiwei: {
    slug: 'guide-ziwei',
    path: '/guide/ziwei',
    title: {
      ko: '자미두수란?',
      en: 'What is Zi Wei Dou Shu?',
      ja: '紫微斗数とは？',
      zh: '什么是紫微斗数？',
    },
    description: {
      ko: '명반 구조와 별 체계를 먼저 훑어봐요.',
      en: 'Start with the core structure of the Zi Wei chart.',
      ja: '命盤の構造と星の考え方を先に押さえます。',
      zh: '先了解命盘结构与星曜体系。',
    },
  },
  guidePalaces: {
    slug: 'guide-12-palaces',
    path: '/guide/ziwei/12-palaces',
    title: {
      ko: '십이궁 설명',
      en: 'The 12 Palaces',
      ja: '十二宮の見方',
      zh: '十二宫说明',
    },
    description: {
      ko: '인생 각 영역을 어디서 읽는지 정리해요.',
      en: 'See how each life area is mapped in the chart.',
      ja: '人生の各領域をどこで読むか整理します。',
      zh: '理解人生各领域在命盘中的位置。',
    },
  },
  guideNatal: {
    slug: 'guide-natal',
    path: '/guide/natal',
    title: {
      ko: '출생차트 가이드',
      en: 'Birth Chart Guide',
      ja: '出生チャートガイド',
      zh: '出生图指南',
    },
    description: {
      ko: '출생차트를 처음 읽는 사람에게 맞는 시작점이에요.',
      en: 'A solid starting point for first-time chart readers.',
      ja: '出生図を初めて読む人向けの出発点です。',
      zh: '适合第一次阅读出生图的人。',
    },
  },
  guidePlanets: {
    slug: 'guide-planets',
    path: '/guide/natal/planets',
    title: {
      ko: '행성의 의미',
      en: 'Planets in Astrology',
      ja: '惑星の意味',
      zh: '行星含义',
    },
    description: {
      ko: '태양, 달, 행성이 어떤 역할을 하는지 정리해요.',
      en: 'Understand the role of the Sun, Moon, and planets.',
      ja: '太陽・月・惑星の役割を整理します。',
      zh: '理解太阳、月亮与各行星的作用。',
    },
  },
  guideHouses: {
    slug: 'guide-houses',
    path: '/guide/natal/houses',
    title: {
      ko: '12 하우스 설명',
      en: 'The 12 Houses',
      ja: '12ハウスの見方',
      zh: '12宫位说明',
    },
    description: {
      ko: '삶의 영역이 차트에 어떻게 배치되는지 보여줘요.',
      en: 'See how life areas are distributed across the chart.',
      ja: '人生の領域がどう配置されるかを見ます。',
      zh: '查看人生领域如何分布在星盘中。',
    },
  },
  articleUnknownTime: {
    slug: 'article-unknown-time-saju',
    path: '/articles/unknown-time-saju',
    title: {
      ko: '출생 시간이 없을 때 사주 보는 법',
      en: 'Read Saju Without Birth Time',
      ja: '出生時間がない四柱推命の読み方',
      zh: '没有出生时间的四柱怎么看',
    },
    description: {
      ko: '시간 모름 결과를 어디부터 읽어야 할지 정리해요.',
      en: 'A practical reading guide when the hour pillar is missing.',
      ja: '時柱なしで何から見ればよいかを整理します。',
      zh: '缺少时柱时，先看哪里最有效。',
    },
  },
  articleDayMaster: {
    slug: 'article-day-master-types',
    path: '/articles/day-master-types',
    title: {
      ko: '일간의 종류로 성격 읽기',
      en: 'Read Personality Through Day Masters',
      ja: '日干の種類で性格を読む',
      zh: '通过日干类型读性格',
    },
    description: {
      ko: '내 일간이 어떤 흐름을 우선하는지 빠르게 이해해요.',
      en: 'A quick way to see what your day master prioritizes.',
      ja: '自分の日干が何を優先するかをすばやく掴めます。',
      zh: '快速理解你的日干更重视什么。',
    },
  },
  articleTenGods: {
    slug: 'article-ten-gods-for-beginners',
    path: '/articles/ten-gods-for-beginners',
    title: {
      ko: '십신 초심자를 위한 빠른 정리',
      en: 'Ten Gods for Beginners',
      ja: '十神初心者のための早わかり',
      zh: '十神新手快速上手',
    },
    description: {
      ko: '십신 구조를 짧게 익히고 AI 질문으로 연결해요.',
      en: 'Learn the core ten-god logic and continue into AI questions.',
      ja: '十神の基本を短く押さえてAI質問へつなげます。',
      zh: '先抓住十神结构，再继续 AI 提问。',
    },
  },
  articleZiweiIntro: {
    slug: 'article-what-is-ziwei',
    path: '/articles/what-is-ziwei',
    title: {
      ko: '자미두수 이야기',
      en: 'The Story of Zi Wei Dou Shu',
      ja: '紫微斗数の世界',
      zh: '紫微斗数入门故事',
    },
    description: {
      ko: '자미두수의 분위기와 큰 흐름을 쉽게 잡아주는 글이에요.',
      en: 'A lighter introduction to the Zi Wei worldview.',
      ja: '紫微斗数の世界観をやさしくつかむ記事です。',
      zh: '更轻松理解紫微斗数世界观的文章。',
    },
  },
  articleLove: {
    slug: 'article-love-and-relationships',
    path: '/articles/love-and-relationships',
    title: {
      ko: '연애운은 어떻게 읽어야 할까',
      en: 'How to Read Love Luck',
      ja: '恋愛運の読み方',
      zh: '如何看恋爱运',
    },
    description: {
      ko: '관계 패턴을 해석으로 이어가기 좋은 주제예요.',
      en: 'A strong bridge from chart reading into relationship interpretation.',
      ja: '関係パターンの読み方へ自然につながる記事です。',
      zh: '适合衔接到关系解读的文章。',
    },
  },
  articleBigThree: {
    slug: 'article-big-three-astrology',
    path: '/articles/big-three-astrology',
    title: {
      ko: '빅 쓰리로 감정과 표현 읽기',
      en: 'Read the Big Three',
      ja: 'ビッグスリーで感情と表現を読む',
      zh: '大三读情绪与表达',
    },
    description: {
      ko: '태양, 달, 상승궁을 한 번에 이해하는 가장 빠른 글이에요.',
      en: 'The fastest primer on Sun, Moon, and Rising together.',
      ja: '太陽・月・アセンダントをまとめて理解できます。',
      zh: '最快理解太阳、月亮、上升的入门文。',
    },
  },
  articleCareer: {
    slug: 'article-career-and-money',
    path: '/articles/career-and-money',
    title: {
      ko: '직업운은 어떻게 봐야 할까',
      en: 'How to Read Career Luck',
      ja: '仕事運の読み方',
      zh: '如何看事业运',
    },
    description: {
      ko: '일과 돈 흐름에서 먼저 봐야 할 포인트를 정리해요.',
      en: 'A practical reading order for work and money themes.',
      ja: '仕事とお金の流れを見る順番を整理します。',
      zh: '整理工作与财运的阅读顺序。',
    },
  },
}

const AI_TEASER_QUESTIONS: Record<LanguageKey, string> = {
  ko: '방금 계산한 결과를 바탕으로 한 줄 또는 두 문장 이내의 매우 짧은 요약만 해줘. 제목, 목록, 마크다운 없이 바로 요약문만 써줘.',
  en: 'Using this chart, give only a very short summary in one or two sentences. No headings, bullets, or markdown. Return only the summary.',
  ja: 'この結果をもとに、一行から二文以内のとても短い要約だけを書いてください。見出し、箇条書き、マークダウンは不要です。',
  zh: '请基于这份结果只写一到两句话的简短摘要，不要标题、列表或 Markdown，只返回摘要本身。',
}

function getInputKey(input: BirthInput) {
  return [
    input.year,
    input.month,
    input.day,
    input.hour,
    input.minute,
    input.gender,
    input.cityName || 'city',
    input.latitude || 'lat',
    input.longitude || 'lng',
    input.unknownTime ? 'unknown' : 'known',
  ].join('-')
}

function normalizeAiTeaser(raw: string) {
  const candidate = raw
    .split('\n')
    .map(line => line.replace(/^#+\s*/, '').replace(/^\s*[-*]\s*/, '').replace(/\*\*/g, '').trim())
    .filter(Boolean)
    .find(line => !/^(\d+\.|[0-9]+\)|[•●])/.test(line))

  if (!candidate) return ''

  const stripped = candidate
    .replace(/^(한 줄 요약|one-line summary|summary|要約|摘要)\s*[:：-]\s*/i, '')
    .trim()

  return stripped.length > 180 ? `${stripped.slice(0, 177).trimEnd()}...` : stripped
}

function getSajuTeaser(result: SajuResult, language: LanguageKey) {
  const dayPillar = result.pillars[1]
  const monthPillar = result.pillars[2]

  if (language === 'ko') {
    return `${dayPillar.pillar.stem} 일간이 중심인 사주예요. ${monthPillar.branchSipsin} 흐름과 ${dayPillar.unseong} 기운이 같이 보여서 성향과 현실 감각을 함께 읽는 타입에 가까워요.`
  }
  if (language === 'ja') {
    return `${dayPillar.pillar.stem}日干が中心の命式です。${monthPillar.branchSipsin}の流れと${dayPillar.unseong}の気配が重なり、性格と現実感覚を一緒に読むタイプです。`
  }
  if (language === 'zh') {
    return `这张命式以${dayPillar.pillar.stem}日干为中心。${monthPillar.branchSipsin}的关系与${dayPillar.unseong}的气势同时出现，更适合一起看性格与现实感。`
  }
  return `Your chart centers on the ${dayPillar.pillar.stem} day master, with ${monthPillar.branchSipsin} themes and a ${dayPillar.unseong} tone shaping personality and practical flow together.`
}

function getZiweiTeaser(chart: ZiweiChart, language: LanguageKey) {
  const mingPalace = chart.palaces['命宮']
  const mainStars = mingPalace?.stars.slice(0, 2).map(star => star.name).join(', ') || ''

  if (language === 'ko') {
    return mainStars
      ? `명궁이 ${mingPalace.ganZhi}에 놓이고 ${mainStars}의 기운이 먼저 보여요. 관계 감각과 인생의 흐름을 같이 읽으면 이해가 빨라져요.`
      : `명궁이 ${mingPalace.ganZhi}에 놓인 명반이에요. 관계와 시기 흐름을 함께 읽을수록 해석이 또렷해져요.`
  }
  if (language === 'ja') {
    return mainStars
      ? `命宮は${mingPalace.ganZhi}にあり、${mainStars}の気配が先に見えます。人間関係と運の流れを合わせて読むと理解しやすい命盤です。`
      : `命宮は${mingPalace.ganZhi}にあります。人間関係と流れを一緒に読むと輪郭がはっきりする命盤です。`
  }
  if (language === 'zh') {
    return mainStars
      ? `命宫落在${mingPalace.ganZhi}，先看到的是${mainStars}的气质。把关系与时机一起看，会更容易理解这张命盘。`
      : `命宫落在${mingPalace.ganZhi}。如果把关系与时机放在一起看，这张命盘会更清晰。`
  }
  return mainStars
    ? `Your Life Palace sits in ${mingPalace.ganZhi}, and ${mainStars} stand out first. This chart reads best when relationships and timing are considered together.`
    : `Your Life Palace sits in ${mingPalace.ganZhi}, and the chart becomes clearer when you read relationships and timing together.`
}

function getNatalTeaser(chart: NatalChart, language: LanguageKey) {
  const sun = chart.planets.find(planet => planet.id === 'Sun')
  const moon = chart.planets.find(planet => planet.id === 'Moon')
  const asc = chart.angles?.asc

  if (!sun || !moon) {
    if (language === 'ko') return '출생차트의 핵심 행성 흐름을 기준으로 성향과 감정 패턴을 읽어드려요.'
    if (language === 'ja') return '出生図の主要な惑星配置から性質と感情パターンを読み解きます。'
    if (language === 'zh') return '我们会根据星盘核心行星的位置来理解你的性格与情绪模式。'
    return 'We read your personality and emotional patterns through the core planetary placements.'
  }

  const signLabels = SIGN_LABELS[language]
  const sunSign = signLabels[sun.sign]
  const moonSign = signLabels[moon.sign]

  if (language === 'ko') {
    return `태양 ${sunSign}, 달 ${moonSign}${asc ? `, 상승궁 ${signLabels[asc.sign]}` : ''} 흐름이 핵심이에요. 겉으로 보이는 분위기와 감정 반응을 같이 보면 해석이 훨씬 쉬워져요.`
  }
  if (language === 'ja') {
    return `太陽は${sunSign}、月は${moonSign}${asc ? `、アセンダントは${signLabels[asc.sign]}` : ''}です。外から見える印象と感情の反応を一緒に読むと理解しやすくなります。`
  }
  if (language === 'zh') {
    return `太阳在${sunSign}，月亮在${moonSign}${asc ? `，上升在${signLabels[asc.sign]}` : ''}。把外在气质与情绪反应一起看，会更容易读懂这张星盘。`
  }
  return `Your chart is led by Sun in ${sunSign}, Moon in ${moonSign}${asc ? `, and Rising in ${signLabels[asc.sign]}` : ''}. Reading outward style and emotional response together makes it easier to understand.`
}

function getDefaultNatalTeaser(language: LanguageKey) {
  if (language === 'ko') return '출생차트의 핵심 행성과 감정 패턴을 읽는 중이에요.'
  if (language === 'ja') return '出生図の主要な惑星と感情パターンを読んでいます。'
  if (language === 'zh') return '正在整理星盘中的核心行星与情绪模式。'
  return 'Reading the core planets and emotional pattern in your chart.'
}

function getRelatedLinks(tab: TabKey, input: BirthInput) {
  if (tab === 'saju') {
    if (input.unknownTime) {
      return [LINK_LIBRARY.articleUnknownTime, LINK_LIBRARY.articleTenGods, LINK_LIBRARY.guideTenGods]
    }
    return [LINK_LIBRARY.articleDayMaster, LINK_LIBRARY.articleTenGods, LINK_LIBRARY.articleCareer]
  }

  if (tab === 'ziwei') {
    return [LINK_LIBRARY.guideZiwei, LINK_LIBRARY.guidePalaces, LINK_LIBRARY.articleLove]
  }

  return [LINK_LIBRARY.articleBigThree, LINK_LIBRARY.guidePlanets, LINK_LIBRARY.guideHouses]
}

async function buildInterpretData(tab: TabKey, input: BirthInput) {
  if (tab === 'saju') {
    return sajuToText(calculateSaju(input))
  }

  if (tab === 'ziwei') {
    if (input.unknownTime) return ''
    const chart = createChart(input.year, input.month, input.day, input.hour, input.minute, input.gender === 'M')
    return ziweiToText(chart)
  }

  const chart = await calculateNatal(input)
  return natalToText(chart)
}

async function requestAiTeaser(tab: TabKey, input: BirthInput, language: LanguageKey) {
  const data = await buildInterpretData(tab, input)
  if (!data) return null

  const response = await fetch('/api/interpret', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data,
      type: 'general',
      context: 'self',
      question: AI_TEASER_QUESTIONS[language],
      language,
    }),
  })

  if (!response.ok) {
    throw new Error('AI teaser request failed')
  }

  const payload = await response.json()
  return normalizeAiTeaser(payload.interpretation || '')
}

export default function ResultEngagementPanel({
  tab,
  language,
  input,
  onOpenInterpret,
  onSelectFollowupQuestion,
  onSelectRelatedLink,
}: Props) {
  const questions = FOLLOWUP_QUESTIONS[tab]
  const links = useMemo(() => getRelatedLinks(tab, input), [tab, input])
  const labels = QUESTION_LABELS[language]
  const text = SECTION_TEXT[language]
  const [fallbackTeaser, setFallbackTeaser] = useState(() => getDefaultNatalTeaser(language))
  const [aiTeaser, setAiTeaser] = useState<string | null>(null)
  const [isAiLoading, setIsAiLoading] = useState(false)
  const teaserCacheRef = useRef<Record<string, string>>({})

  useEffect(() => {
    let cancelled = false

    if (tab === 'saju') {
      setFallbackTeaser(getSajuTeaser(calculateSaju(input), language))
      return () => {
        cancelled = true
      }
    }

    if (tab === 'ziwei') {
      const nextTeaser = input.unknownTime
        ? language === 'ko'
          ? '출생 시간이 있으면 자미두수 흐름을 더 정확하게 읽을 수 있어요.'
          : language === 'ja'
            ? '出生時刻があると紫微斗数の流れをより正確に読めます。'
            : language === 'zh'
              ? '如果有出生时间，就能更准确地阅读紫微斗数的流向。'
              : 'With a known birth time, Zi Wei timing can be read much more accurately.'
        : getZiweiTeaser(createChart(input.year, input.month, input.day, input.hour, input.minute, input.gender === 'M'), language)

      setFallbackTeaser(nextTeaser)
      return () => {
        cancelled = true
      }
    }

    setFallbackTeaser(getDefaultNatalTeaser(language))

    calculateNatal(input)
      .then((chart) => {
        if (!cancelled) {
          setFallbackTeaser(getNatalTeaser(chart, language))
        }
      })
      .catch(() => {
        if (!cancelled) {
          setFallbackTeaser(
            language === 'ko'
              ? '출생차트의 핵심 행성과 감정 패턴을 기준으로 흐름을 읽어드려요.'
              : language === 'ja'
                ? '出生図の主要な惑星と感情パターンを基準に流れを読みます。'
                : language === 'zh'
                  ? '我们会根据核心行星与情绪模式来整理这张星盘。'
                  : 'We will explain this chart through its core planets and emotional pattern.',
          )
        }
      })

    return () => {
      cancelled = true
    }
  }, [tab, input, language])

  useEffect(() => {
    let cancelled = false
    const cacheKey = `${tab}-${language}-${getInputKey(input)}`

    setAiTeaser(null)

    if (tab === 'ziwei' && input.unknownTime) {
      setIsAiLoading(false)
      return () => {
        cancelled = true
      }
    }

    const cached = teaserCacheRef.current[cacheKey]
    if (cached) {
      setAiTeaser(cached)
      setIsAiLoading(false)
      return () => {
        cancelled = true
      }
    }

    setIsAiLoading(true)

    requestAiTeaser(tab, input, language)
      .then((summary) => {
        if (!cancelled && summary) {
          teaserCacheRef.current[cacheKey] = summary
          setAiTeaser(summary)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAiTeaser(null)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsAiLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [tab, input, language])

  const teaser = aiTeaser ?? fallbackTeaser

  return (
    <section className="card bg-base-100 border border-base-300 shadow-sm mt-6">
      <div className="card-body space-y-5">
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/5 to-transparent p-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="badge badge-outline badge-primary">{text.aiPreview}</span>
            {isAiLoading && <span className="text-xs text-base-content/60">{text.aiLoading}</span>}
          </div>
          <p className="text-sm sm:text-base text-base-content/80 leading-relaxed">
            {teaser}
          </p>
          <button
            className="btn btn-primary btn-sm mt-3"
            type="button"
            onClick={onOpenInterpret}
          >
            {text.moreAi}
          </button>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-bold text-base-content">
            {text.followup}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {questions.map((questionId) => (
              <button
                key={questionId}
                type="button"
                onClick={() => onSelectFollowupQuestion(questionId)}
                className="btn btn-outline btn-sm h-auto min-h-0 whitespace-normal justify-start rounded-2xl bg-base-200 px-4 py-3 text-left"
              >
                {labels[questionId]}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-base-300 pt-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">{text.related}</p>
              <p className="text-xs text-base-content/60">{text.relatedDesc}</p>
            </div>
            <Link to={`/${language}/guide`} className="text-xs text-primary shrink-0">
              {text.guides}
            </Link>
          </div>
          <div className="mt-3 grid gap-3">
            {links.map((link) => (
              <Link
                key={link.slug}
                to={`/${language}${link.path}`}
                onClick={() => onSelectRelatedLink(link.path)}
                className="flex flex-col rounded-xl border border-base-300 p-3 bg-base-200 hover:border-primary hover:bg-base-100 transition-colors"
              >
                <span className="text-sm font-medium">{link.title[language]}</span>
                <span className="text-xs text-base-content/60 mt-1">
                  {link.description[language]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
