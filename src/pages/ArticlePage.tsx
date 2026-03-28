import { Link, useParams, Navigate } from 'react-router'
import { useI18n } from '../i18n'
import SeoHead from '../components/SeoHead'
import AdBanner from '../components/AdBanner'
import { ARTICLE_CATALOG, ARTICLE_RELATED_MAP, type ArticleCluster, type ArticleKey } from '../content/article-catalog'

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
  cluster: ArticleCluster
  content: ArticleContent
}

interface ArticleLinkTarget {
  id: string
  path: string
  title: string
  description: string
}

const GUIDE_PATH_BY_CLUSTER: Record<ArticleCluster, string> = {
  starter: '/guide',
  relationship: '/guide/saju',
  career: '/guide/saju/ten-gods',
  unknown_time: '/guide/saju',
  deep_dive: '/guide/saju/ten-gods',
  astrology: '/guide/natal',
  dream: '/dream',
  ziwei: '/guide/ziwei',
  comparison: '/guide',
}

const GUIDE_COPY: Record<LanguageKey, Record<ArticleCluster, { title: string; description: string; button: string }>> = {
  ko: {
    starter: {
      title: '입문 가이드로 흐름 이어가기',
      description: '기본 개념을 먼저 잡고 계산으로 넘어가면 기사 이해가 훨씬 빨라집니다.',
      button: '입문 가이드 보기',
    },
    relationship: {
      title: '관계 해석 가이드로 이어가기',
      description: '이 글이 관계 패턴 이야기였다면, 다음은 실제 명식에서 관계를 읽는 기준을 잡아보세요.',
      button: '관계 해석 가이드 보기',
    },
    career: {
      title: '일과 돈 해석 기준 더 보기',
      description: '직업과 재물 흐름을 볼 때 자주 쓰는 십신 기준을 먼저 익혀두면 계산 결과가 더 잘 읽힙니다.',
      button: '직업/재물 가이드 보기',
    },
    unknown_time: {
      title: '시간 미상 해석 가이드 보기',
      description: '출생시간이 없을 때 무엇을 먼저 보고 무엇을 보류해야 하는지 정리해둔 가이드입니다.',
      button: '시간 미상 가이드 보기',
    },
    deep_dive: {
      title: '심화 가이드로 더 깊게 읽기',
      description: '십신과 일간 기준을 같이 보면 심화 기사 이해가 훨씬 선명해집니다.',
      button: '심화 가이드 보기',
    },
    astrology: {
      title: '출생차트 가이드로 이어가기',
      description: '행성과 하우스 기초를 먼저 잡으면 점성술 기사와 AI 해석 연결이 쉬워집니다.',
      button: '출생차트 가이드 보기',
    },
    dream: {
      title: '꿈 해몽으로 이어가기',
      description: '꿈에 담긴 메시지를 AI가 전통 해몽과 심리학으로 풀어드립니다.',
      button: '꿈 해몽 해보기',
    },
    ziwei: {
      title: '자미두수 명반 계산하기',
      description: '내 명반에서 주성 배치를 직접 확인해보세요.',
      button: '명반 계산',
    },
    comparison: {
      title: '다른 체계와 비교해보기',
      description: '사주, 점성술, 타로, MBTI의 차이를 이해하면 각 체계를 더 잘 활용할 수 있어요.',
      button: '비교 가이드 보기',
    },
  },
  en: {
    starter: {
      title: 'Continue with the starter guide',
      description: 'A quick guide helps readers move from concept to calculation more naturally.',
      button: 'Open starter guide',
    },
    relationship: {
      title: 'Continue with a relationship guide',
      description: 'If this article was about patterns, the next step is learning how to read those patterns in a real chart.',
      button: 'Open relationship guide',
    },
    career: {
      title: 'See the work and money guide',
      description: 'Learning the core Ten Gods frame makes career and wealth readings much easier to apply.',
      button: 'Open career guide',
    },
    unknown_time: {
      title: 'Read the unknown-time guide',
      description: 'This guide explains what to trust first and what to hold loosely when birth time is missing.',
      button: 'Open unknown-time guide',
    },
    deep_dive: {
      title: 'Move into the deep-dive guide',
      description: 'Pairing Day Master and Ten Gods concepts makes advanced articles much easier to use.',
      button: 'Open deep-dive guide',
    },
    astrology: {
      title: 'Continue with the natal chart guide',
      description: 'Basic planets and houses make astrology articles and AI follow-up much easier to navigate.',
      button: 'Open natal guide',
    },
    dream: {
      title: 'Continue with dream interpretation',
      description: 'Discover hidden messages in your dreams with AI-powered traditional and psychological analysis.',
      button: 'Try dream interpretation',
    },
    ziwei: {
      title: 'Calculate Your Zi Wei Chart',
      description: 'See how the main stars are placed in your birth chart.',
      button: 'Calculate chart',
    },
    comparison: {
      title: 'Understand different systems',
      description: 'Knowing how Saju, astrology, tarot, and MBTI differ helps you get more from each one.',
      button: 'Read comparison guide',
    },
  },
  ja: {
    starter: {
      title: '入門ガイドへ進む',
      description: '基本概念を先に押さえると、計算結果とのつながりが見えやすくなります。',
      button: '入門ガイドを見る',
    },
    relationship: {
      title: '関係解釈ガイドへ進む',
      description: '関係パターンの記事を読んだあとは、実際の命式でどう読むかを押さえると理解が深まります。',
      button: '関係ガイドを見る',
    },
    career: {
      title: '仕事とお金のガイドを見る',
      description: '十神の基準を先に知ると、仕事運と財運の記事がぐっと読みやすくなります。',
      button: '仕事・お金ガイドを見る',
    },
    unknown_time: {
      title: '出生時間不明ガイドを見る',
      description: '時間がないときに何を優先して読むべきかを整理したガイドです。',
      button: '時間不明ガイドを見る',
    },
    deep_dive: {
      title: '深掘りガイドへ進む',
      description: '日干と十神の基準を一緒に見ると、深い記事がより使いやすくなります。',
      button: '深掘りガイドを見る',
    },
    astrology: {
      title: '出生図ガイドへ進む',
      description: '惑星とハウスの基礎を押さえると、占星術記事とAI解釈につながりやすくなります。',
      button: '出生図ガイドを見る',
    },
    dream: {
      title: '夢占いへ進む',
      description: '夢に隠されたメッセージをAIが伝統的な夢占いと心理学で解き明かします。',
      button: '夢占いを試す',
    },
    ziwei: {
      title: '紫微斗数の命盤を計算する',
      description: '自分の命盤で主星の配置を確認してみましょう。',
      button: '命盤計算',
    },
    comparison: {
      title: '他の体系と比較してみる',
      description: '四柱推命、占星術、タロット、MBTIの違いを理解すると、各体系をより活用できます。',
      button: '比較ガイドを見る',
    },
  },
  zh: {
    starter: {
      title: '继续阅读入门指南',
      description: '先把基础概念看清，再去计算，会更容易把文章内容和自己的命盘连起来。',
      button: '查看入门指南',
    },
    relationship: {
      title: '继续阅读关系解读指南',
      description: '如果这篇文章讲的是关系模式，下一步就该看如何在真实命盘里读这些模式。',
      button: '查看关系指南',
    },
    career: {
      title: '查看工作与财运指南',
      description: '先掌握十神的基本框架，会更容易把事业和金钱文章用到自己的命盘上。',
      button: '查看事业财运指南',
    },
    unknown_time: {
      title: '查看时间未知指南',
      description: '这份指南会说明在没有出生时间时，哪些内容可以先看，哪些内容要保守判断。',
      button: '查看时间未知指南',
    },
    deep_dive: {
      title: '继续阅读进阶指南',
      description: '把日干和十神一起看，会让进阶文章更容易真正用起来。',
      button: '查看进阶指南',
    },
    astrology: {
      title: '继续阅读出生图指南',
      description: '先掌握行星和宫位基础，再看占星文章和 AI 解读会轻松很多。',
      button: '查看出生图指南',
    },
    dream: {
      title: '继续解梦',
      description: 'AI结合传统解梦法和心理学，为您解读梦境中的隐藏信息。',
      button: '试试解梦',
    },
    ziwei: {
      title: '计算你的紫微斗数命盘',
      description: '亲自查看命盘中主星的排列位置。',
      button: '计算命盘',
    },
    comparison: {
      title: '了解不同体系的差异',
      description: '弄清四柱、占星、塔罗和 MBTI 的区别，能让你更好地利用每种体系。',
      button: '查看对比指南',
    },
  },
}

const CLUSTER_CTA_COPY: Record<LanguageKey, Record<ArticleCluster, {
  inlineTitle: string
  inlineDescription: string
  inlinePrimary: string
  applyTitle: string
  applyDescription: string
  applyPrimary: string
  aiTitle: string
  aiDescription: string
  aiPrimary: string
}>> = {
  ko: {
    starter: {
      inlineTitle: '기초 개념을 내 명식에 바로 연결해보기',
      inlineDescription: '방금 읽은 개념을 내 계산 결과에 붙여보면 이해 속도가 확실히 빨라집니다.',
      inlinePrimary: '내 명식으로 바로 보기',
      applyTitle: '입문 글을 읽었다면 계산으로 넘어갈 차례예요',
      applyDescription: '이제 내 명식에서 어떤 구조가 보이는지 확인하면 기사 내용이 훨씬 선명해집니다.',
      applyPrimary: '내 명식 계산하기',
      aiTitle: '기초 개념을 AI 해석으로 이어가기',
      aiDescription: '계산 후 성격, 관계, 일과 돈 흐름을 AI에게 바로 물어보면 입문 지식이 실제 해석으로 연결됩니다.',
      aiPrimary: '계산 후 AI 질문 시작',
    },
    relationship: {
      inlineTitle: '이 관계 주제를 내 명식에서 바로 확인해보기',
      inlineDescription: '관계 패턴과 감정 흐름은 내 계산 결과에 연결해볼 때 가장 빨리 체감됩니다.',
      inlinePrimary: '내 관계 흐름 계산하기',
      applyTitle: '관계 글을 읽었다면 이제 내 패턴을 확인해보세요',
      applyDescription: '내 명식에서 관계 흐름을 보고 AI 질문으로 이어가면 이 글의 포인트가 실제로 살아납니다.',
      applyPrimary: '내 관계 패턴 계산하기',
      aiTitle: '이 관계 주제로 AI 해석까지 이어가기',
      aiDescription: '계산 후 연애 패턴, 감정 표현, 지금 관계에서 주의할 점까지 AI에게 바로 물어볼 수 있어요.',
      aiPrimary: '관계 AI 질문 시작',
    },
    career: {
      inlineTitle: '직업과 돈 흐름을 내 명식에서 바로 읽어보기',
      inlineDescription: '일과 재물 주제는 실제 계산 결과와 연결할 때 훨씬 실용적으로 읽힙니다.',
      inlinePrimary: '내 일·돈 흐름 계산하기',
      applyTitle: '일과 돈 글을 읽었다면 이제 내 흐름을 확인해보세요',
      applyDescription: '직업 강점과 재물 타이밍은 내 명식과 대운 흐름을 함께 볼 때 가장 현실적으로 잡힙니다.',
      applyPrimary: '내 커리어 흐름 계산하기',
      aiTitle: '이 직업/재물 주제로 AI 해석까지 이어가기',
      aiDescription: '계산 후 직업 강점, 이직 시기, 지금은 벌 때인지 지킬 때인지까지 AI와 바로 이어볼 수 있어요.',
      aiPrimary: '커리어 AI 질문 시작',
    },
    unknown_time: {
      inlineTitle: '출생시간 없이도 먼저 확인할 수 있어요',
      inlineDescription: '시간이 없어도 큰 흐름과 기본 성향은 먼저 계산해볼 수 있습니다.',
      inlinePrimary: '시간 없이 먼저 계산하기',
      applyTitle: '시간이 애매해도 계산을 시작할 수 있어요',
      applyDescription: '시간 미상 전제로 먼저 계산하고, 가능한 해석 범위부터 AI와 함께 정리해보세요.',
      applyPrimary: '시간 미상으로 계산하기',
      aiTitle: '시간 미상 기준으로 AI 해석 이어가기',
      aiDescription: '계산 후 어떤 부분까지 믿을 수 있는지, 지금 큰 흐름은 어떤지 AI에게 넓게 물어보는 흐름이 좋습니다.',
      aiPrimary: '시간 미상 AI 질문 시작',
    },
    deep_dive: {
      inlineTitle: '심화 개념을 내 명식으로 바로 확인해보기',
      inlineDescription: '일간과 십신은 실제 계산 결과를 볼 때 가장 빠르게 감이 잡힙니다.',
      inlinePrimary: '내 심화 흐름 계산하기',
      applyTitle: '심화 글을 읽었다면 내 구조를 직접 확인해보세요',
      applyDescription: '심화 개념은 내 명식과 AI 해석까지 이어볼 때 이해가 더 단단해집니다.',
      applyPrimary: '내 명식 심화 계산하기',
      aiTitle: '이 심화 주제로 AI 해석 이어가기',
      aiDescription: '계산 후 십신, 일간, 현재 역할 흐름을 AI에게 바로 물어볼 수 있습니다.',
      aiPrimary: '심화 AI 질문 시작',
    },
    astrology: {
      inlineTitle: '출생차트 개념을 내 차트에 바로 붙여보기',
      inlineDescription: '태양, 달, 상승 같은 개념은 내 차트로 볼 때 가장 빨리 이해됩니다.',
      inlinePrimary: '내 출생차트 계산하기',
      applyTitle: '점성술 글을 읽었다면 내 차트로 넘어가보세요',
      applyDescription: '내 차트와 AI 해석을 같이 보면 기사에서 본 개념이 훨씬 입체적으로 읽힙니다.',
      applyPrimary: '내 출생차트 보기',
      aiTitle: '이 점성술 주제로 AI 해석까지 이어가기',
      aiDescription: '계산 후 감정, 관계, 일과 돈 흐름을 출생차트 기준으로 AI에게 바로 물어볼 수 있어요.',
      aiPrimary: '차트 AI 질문 시작',
    },
    dream: {
      inlineTitle: '이 꿈 주제를 AI 해몽으로 바로 확인해보기',
      inlineDescription: '꿈의 상징과 의미를 AI가 전통 해몽과 심리학을 결합하여 풀어드립니다.',
      inlinePrimary: '꿈 해몽 해보기',
      applyTitle: '꿈에 대해 더 알고 싶다면',
      applyDescription: '어젯밤 꿈을 AI에게 들려주면 전통 해몽과 심리학을 결합한 따뜻한 해석을 받을 수 있어요.',
      applyPrimary: '꿈 해몽 시작하기',
      aiTitle: '이 꿈 주제로 AI 해석 이어가기',
      aiDescription: '꿈의 상징, 무의식의 메시지, 실천 조언까지 AI가 따뜻하게 풀어드립니다.',
      aiPrimary: '꿈 AI 해석 시작',
    },
    ziwei: {
      inlineTitle: '내 명반에서 바로 확인해보기',
      inlineDescription: '주성의 배치를 직접 보면 이해가 더 빨라져요.',
      inlinePrimary: '명반 계산하기',
      applyTitle: '읽은 내용 바로 적용해보기',
      applyDescription: '자미두수 명반을 계산하고 AI 해석까지 이어보세요.',
      applyPrimary: '내 명반 계산하기',
      aiTitle: 'AI로 명반 해석 받기',
      aiDescription: '주성 배치의 의미를 AI가 쉽게 풀어드려요.',
      aiPrimary: 'AI 해석 시작',
    },
    comparison: {
      inlineTitle: '사주와 다른 체계를 직접 비교해보기',
      inlineDescription: '사주와 점성술을 둘 다 계산해보면 각 체계의 강점이 더 뚜렷하게 보입니다.',
      inlinePrimary: '사주 계산하기',
      applyTitle: '비교 글을 읽었다면 직접 계산해볼 차례예요',
      applyDescription: '사주와 점성술을 모두 계산해보면 차이점이 훨씬 체감됩니다.',
      applyPrimary: '사주·점성술 둘 다 계산하기',
      aiTitle: '비교 주제를 AI 해석으로 이어가기',
      aiDescription: '계산 후 AI에게 사주와 점성술 결과를 함께 물어보면 각 체계의 해석 차이를 실감할 수 있어요.',
      aiPrimary: '비교 AI 질문 시작',
    },
  },
  en: {
    starter: {
      inlineTitle: 'Connect this concept to your chart right away',
      inlineDescription: 'Applying the idea to your own chart makes the article much easier to retain.',
      inlinePrimary: 'See it in my chart',
      applyTitle: 'If you read the intro, calculation is the next step',
      applyDescription: 'Seeing the same concept inside your own chart turns a basic article into a practical reading.',
      applyPrimary: 'Calculate my chart',
      aiTitle: 'Continue from the basics into AI interpretation',
      aiDescription: 'After calculation, ask AI how the concept shows up in your personality, relationships, work, and money flow.',
      aiPrimary: 'Start AI questions',
    },
    relationship: {
      inlineTitle: 'Check this relationship topic in your own chart',
      inlineDescription: 'Patterns, timing, and emotional style become much clearer when you compare them to your own chart.',
      inlinePrimary: 'Calculate my relationship flow',
      applyTitle: 'You read the topic. Now check your own pattern',
      applyDescription: 'Seeing your relationship flow and then asking AI follow-up questions makes this article much more actionable.',
      applyPrimary: 'Calculate my relationship pattern',
      aiTitle: 'Continue this relationship topic into AI',
      aiDescription: 'After calculation, ask AI about dating patterns, emotional expression, and what to watch in your current relationship timing.',
      aiPrimary: 'Start relationship AI',
    },
    career: {
      inlineTitle: 'Read work and money through your own chart',
      inlineDescription: 'Career and wealth topics become more useful when they are tied to your actual chart and timing.',
      inlinePrimary: 'Calculate my work and money flow',
      applyTitle: 'Now check this work and money topic in your chart',
      applyDescription: 'Career strengths and money timing become practical only when you compare them to your own chart and cycles.',
      applyPrimary: 'Calculate my career flow',
      aiTitle: 'Continue this career topic into AI',
      aiDescription: 'After calculation, you can ask AI about job strengths, transition timing, and whether this is a period to earn, protect, or expand.',
      aiPrimary: 'Start career AI',
    },
    unknown_time: {
      inlineTitle: 'You can still begin without a birth time',
      inlineDescription: 'Even without the hour, you can still calculate broad tendencies and your current larger flow.',
      inlinePrimary: 'Calculate without birth time',
      applyTitle: 'Start anyway, even if your birth time is unclear',
      applyDescription: 'Calculate first with the unknown-time assumption, then ask AI what can be read confidently and what should stay broad.',
      applyPrimary: 'Calculate with unknown time',
      aiTitle: 'Continue the unknown-time reading into AI',
      aiDescription: 'After calculation, ask wider questions about overall pattern and timing rather than narrow event-level predictions.',
      aiPrimary: 'Start unknown-time AI',
    },
    deep_dive: {
      inlineTitle: 'Test this advanced concept in your own chart',
      inlineDescription: 'Day Master and Ten Gods concepts become much easier once you see them inside your actual chart.',
      inlinePrimary: 'Calculate my advanced chart',
      applyTitle: 'Move from theory into your own structure',
      applyDescription: 'Advanced concepts become much more useful once you compare them to your own chart and AI interpretation.',
      applyPrimary: 'Calculate my chart deeply',
      aiTitle: 'Continue this advanced topic into AI',
      aiDescription: 'After calculation, ask AI how your Day Master, Ten Gods, and current role pattern are working together.',
      aiPrimary: 'Start advanced AI',
    },
    astrology: {
      inlineTitle: 'Attach this astrology concept to your own chart',
      inlineDescription: 'Sun, Moon, rising, and planetary patterns make more sense once you see them in your own chart.',
      inlinePrimary: 'Calculate my natal chart',
      applyTitle: 'Take this astrology topic into your own chart',
      applyDescription: 'Your chart plus AI interpretation makes the article much easier to apply to real life.',
      applyPrimary: 'Open my natal chart',
      aiTitle: 'Continue this astrology topic into AI',
      aiDescription: 'After calculation, ask AI about emotional style, relationships, work, and money through your natal chart.',
      aiPrimary: 'Start natal AI',
    },
    dream: {
      inlineTitle: 'Get AI dream interpretation on this topic',
      inlineDescription: 'Our AI combines traditional symbolism with psychology for a warm, personal dream reading.',
      inlinePrimary: 'Try dream interpretation',
      applyTitle: 'Want to know more about your dreams?',
      applyDescription: 'Tell AI about last night\'s dream and get a reading combining Eastern tradition with modern psychology.',
      applyPrimary: 'Start dream interpretation',
      aiTitle: 'Continue this dream topic into AI',
      aiDescription: 'AI will warmly decode dream symbols, subconscious messages, and practical advice.',
      aiPrimary: 'Start dream AI',
    },
    ziwei: {
      inlineTitle: 'Check your chart right now',
      inlineDescription: 'Seeing how stars are placed makes everything click.',
      inlinePrimary: 'Calculate chart',
      applyTitle: 'Apply what you read',
      applyDescription: 'Calculate your Zi Wei chart and continue into AI interpretation.',
      applyPrimary: 'Calculate my chart',
      aiTitle: 'Get AI chart reading',
      aiDescription: 'Let AI explain what your star placements mean.',
      aiPrimary: 'Start AI reading',
    },
    comparison: {
      inlineTitle: 'Compare systems by trying both calculators',
      inlineDescription: 'Running both Saju and astrology calculations makes the differences between systems much clearer.',
      inlinePrimary: 'Calculate Saju',
      applyTitle: 'Try both calculators to feel the difference',
      applyDescription: 'Calculate both Saju and astrology charts to see how each system reads your life differently.',
      applyPrimary: 'Try both Saju and astrology',
      aiTitle: 'Continue this comparison into AI',
      aiDescription: 'After calculation, ask AI to compare what Saju and astrology each reveal about your personality, relationships, and career.',
      aiPrimary: 'Start comparison AI',
    },
  },
  ja: {
    starter: {
      inlineTitle: 'この概念を自分の命式で確かめる',
      inlineDescription: '入門内容は自分の命式に当てると理解が一気に進みます。',
      inlinePrimary: '自分の命式で見る',
      applyTitle: '入門記事の次は計算です',
      applyDescription: '記事で読んだ概念を自分の命式で確認すると、内容がぐっと立体的になります。',
      applyPrimary: '自分の命式を計算する',
      aiTitle: '基礎内容をAI解釈へつなぐ',
      aiDescription: '計算後に性格、関係、仕事、お金の流れへとAI質問をつなげられます。',
      aiPrimary: 'AI質問を始める',
    },
    relationship: {
      inlineTitle: 'この関係テーマを自分の命式で確かめる',
      inlineDescription: '関係パターンや感情の流れは、自分の命式に当てると最もわかりやすくなります。',
      inlinePrimary: '自分の関係運を計算する',
      applyTitle: '関係の記事を読んだら、次は自分の型です',
      applyDescription: '自分の関係の流れを確認し、AI質問へ進むと記事のポイントが実感しやすくなります。',
      applyPrimary: '自分の関係パターンを計算する',
      aiTitle: 'この関係テーマをAI解釈へ進める',
      aiDescription: '計算後に恋愛パターン、感情表現、今の関係での注意点までAIに続けて聞けます。',
      aiPrimary: '関係AIを始める',
    },
    career: {
      inlineTitle: '仕事とお金の流れを自分の命式で見る',
      inlineDescription: '仕事運と財運は、実際の命式と重ねると一気に実用的になります。',
      inlinePrimary: '自分の仕事・お金を計算する',
      applyTitle: '仕事とお金の記事の次は自分の流れを見る番です',
      applyDescription: '仕事の強みや財のタイミングは、自分の命式と運気を合わせて見ると現実的に活かせます。',
      applyPrimary: '自分の仕事運を計算する',
      aiTitle: 'この仕事テーマをAI解釈へ進める',
      aiDescription: '計算後に仕事の強み、転職タイミング、今は稼ぐ時か守る時かをAIに聞けます。',
      aiPrimary: '仕事AIを始める',
    },
    unknown_time: {
      inlineTitle: '出生時間がなくても先に進めます',
      inlineDescription: '時間がなくても、大きな流れと基本傾向は先に計算できます。',
      inlinePrimary: '時間なしで計算する',
      applyTitle: '時間が曖昧でも計算は始められます',
      applyDescription: '時間不明前提で先に計算し、AIで読める範囲を整理する流れが実用的です。',
      applyPrimary: '時間不明で計算する',
      aiTitle: '時間不明のままAI解釈へ進む',
      aiDescription: '計算後は細かい予測より、全体傾向や今の大きな流れをAIに広く聞くのが向いています。',
      aiPrimary: '時間不明AIを始める',
    },
    deep_dive: {
      inlineTitle: 'この深掘り概念を自分の命式で確かめる',
      inlineDescription: '日干や十神の深い内容は、自分の命式を見ると一気に使える知識になります。',
      inlinePrimary: '深掘り計算をする',
      applyTitle: '理論の次は自分の構造確認です',
      applyDescription: '深い概念は、自分の命式とAI解釈までつなげると理解が定着しやすくなります。',
      applyPrimary: '自分の命式を深く見る',
      aiTitle: 'この深掘りテーマをAIへ進める',
      aiDescription: '計算後に日干、十神、今の役割パターンをAIにすぐ聞けます。',
      aiPrimary: '深掘りAIを始める',
    },
    astrology: {
      inlineTitle: 'この占星術テーマを自分のチャートで見る',
      inlineDescription: '太陽、月、アセンダントは自分のチャートで見ると最も理解しやすくなります。',
      inlinePrimary: '自分の出生図を計算する',
      applyTitle: '占星術の記事の次は自分のチャートです',
      applyDescription: '自分のチャートとAI解釈を重ねると、記事で読んだ概念がより実感的になります。',
      applyPrimary: '自分の出生図を見る',
      aiTitle: 'この占星術テーマをAIへ進める',
      aiDescription: '計算後に感情、関係、仕事、お金の流れを出生図ベースでAIに聞けます。',
      aiPrimary: '出生図AIを始める',
    },
    dream: {
      inlineTitle: 'この夢テーマをAI夢占いで確かめる',
      inlineDescription: '伝統的な夢占いと心理学を組み合わせたAI解釈を受けられます。',
      inlinePrimary: '夢占いを試す',
      applyTitle: '夢についてもっと知りたいなら',
      applyDescription: '昨夜の夢をAIに話すと、伝統的な夢占いと心理学を組み合わせた温かい解釈を受けられます。',
      applyPrimary: '夢占いを始める',
      aiTitle: 'この夢テーマをAI解釈へ進める',
      aiDescription: '夢のシンボル、無意識のメッセージ、実践アドバイスまでAIが温かく解き明かします。',
      aiPrimary: '夢AI解釈を始める',
    },
    ziwei: {
      inlineTitle: '自分の命盤で確認する',
      inlineDescription: '主星の配置を直接見ると理解が早くなります。',
      inlinePrimary: '命盤計算',
      applyTitle: '読んだ内容を実践する',
      applyDescription: '紫微斗数の命盤を計算し、AI解釈へ進みましょう。',
      applyPrimary: '命盤を計算する',
      aiTitle: 'AIで命盤を解読',
      aiDescription: '主星配置の意味をAIがわかりやすく解説します。',
      aiPrimary: 'AI解釈を開始',
    },
    comparison: {
      inlineTitle: '四柱推命と他の体系を両方計算して比べる',
      inlineDescription: '四柱推命と占星術を両方計算すると、各体系の違いがはっきり見えます。',
      inlinePrimary: '四柱推命を計算する',
      applyTitle: '比較記事を読んだら両方計算してみましょう',
      applyDescription: '四柱推命と占星術の両方を計算すると、それぞれの読み方の違いを実感できます。',
      applyPrimary: '四柱・占星術を両方計算する',
      aiTitle: 'この比較テーマをAI解釈へ進める',
      aiDescription: '計算後、四柱推命と占星術のそれぞれが性格・関係・仕事をどう読むかAIに比較してもらえます。',
      aiPrimary: '比較AIを始める',
    },
  },
  zh: {
    starter: {
      inlineTitle: '把这个概念立刻放到自己的命盘里看',
      inlineDescription: '入门概念一旦放进自己的命盘，理解速度会明显更快。',
      inlinePrimary: '在我的命盘里查看',
      applyTitle: '入门文章之后，下一步就是计算',
      applyDescription: '把文章里的概念放进自己的命盘里，会比单看文字更容易真正理解。',
      applyPrimary: '计算我的命盘',
      aiTitle: '把基础内容继续带进 AI 解读',
      aiDescription: '计算后可以继续问 AI 性格、关系、工作和金钱流向，让基础知识变成真正的个人解读。',
      aiPrimary: '开始 AI 提问',
    },
    relationship: {
      inlineTitle: '把这个关系主题放进自己的命盘里看',
      inlineDescription: '关系模式和情绪节奏，放到自己的命盘里看会最容易理解。',
      inlinePrimary: '计算我的关系流向',
      applyTitle: '读完关系文章，下一步是看自己的模式',
      applyDescription: '先看自己的关系流向，再接 AI 追问，文章里的重点会更容易真正落地。',
      applyPrimary: '计算我的关系模式',
      aiTitle: '把这个关系主题继续带进 AI',
      aiDescription: '计算后可以继续问 AI 恋爱模式、情绪表达，以及当前关系里最该注意什么。',
      aiPrimary: '开始关系 AI',
    },
    career: {
      inlineTitle: '把工作和财运放进自己的命盘里看',
      inlineDescription: '工作与金钱主题，只有连到自己的实际命盘和时机，才会真正变得有用。',
      inlinePrimary: '计算我的工作财运',
      applyTitle: '读完事业文章，接下来该看自己的流向',
      applyDescription: '职业强项和财运时机，只有放进自己的命盘和大运里看，才会变得现实可用。',
      applyPrimary: '计算我的事业流向',
      aiTitle: '把这个事业主题继续带进 AI',
      aiDescription: '计算后可以继续问 AI 职业强项、转职时机，以及现在更适合赚钱、守成还是扩张。',
      aiPrimary: '开始事业 AI',
    },
    unknown_time: {
      inlineTitle: '没有出生时间也能先开始',
      inlineDescription: '就算没有时辰，仍然可以先看大方向和基础倾向。',
      inlinePrimary: '无时间先计算',
      applyTitle: '时间不清楚，也可以先算',
      applyDescription: '先按时间未知前提做计算，再让 AI 帮你区分哪些内容能看、哪些内容先保守处理。',
      applyPrimary: '按时间未知计算',
      aiTitle: '把时间未知的解读继续带进 AI',
      aiDescription: '计算后更适合问整体倾向和大方向，而不是过细的事件预测。',
      aiPrimary: '开始时间未知 AI',
    },
    deep_dive: {
      inlineTitle: '把这个进阶概念放进自己的命盘里看',
      inlineDescription: '日干和十神这类进阶内容，放进自己的命盘后会更容易真正用起来。',
      inlinePrimary: '做进阶计算',
      applyTitle: '理论之后，下一步是看自己的结构',
      applyDescription: '把进阶概念放进自己的命盘与 AI 解读里，理解会更扎实。',
      applyPrimary: '深入看我的命盘',
      aiTitle: '把这个进阶主题继续带进 AI',
      aiDescription: '计算后可以直接问 AI 日干、十神和当下角色结构是怎么一起运作的。',
      aiPrimary: '开始进阶 AI',
    },
    astrology: {
      inlineTitle: '把这个占星主题放进自己的星盘里看',
      inlineDescription: '太阳、月亮、上升这类概念，放进自己的星盘后最容易真正理解。',
      inlinePrimary: '计算我的出生图',
      applyTitle: '读完占星文章，下一步就是看自己的星盘',
      applyDescription: '把文章里的概念放进自己的星盘和 AI 解读，理解会更立体。',
      applyPrimary: '查看我的出生图',
      aiTitle: '把这个占星主题继续带进 AI',
      aiDescription: '计算后可以继续问 AI 感情、关系、工作和金钱在出生图里是怎么展开的。',
      aiPrimary: '开始星盘 AI',
    },
    dream: {
      inlineTitle: '用AI解梦来解读这个主题',
      inlineDescription: 'AI结合传统解梦法和心理学，为您提供温暖的个人梦境解读。',
      inlinePrimary: '试试解梦',
      applyTitle: '想了解更多关于梦的含义？',
      applyDescription: '把昨晚的梦告诉AI，获得结合东方传统与现代心理学的温暖解读。',
      applyPrimary: '开始解梦',
      aiTitle: '把这个梦境主题继续带进AI',
      aiDescription: 'AI会温暖地解读梦境象征、潜意识信息和实用建议。',
      aiPrimary: '开始梦境AI',
    },
    ziwei: {
      inlineTitle: '立即查看你的命盘',
      inlineDescription: '直接看到主星排列，理解更快。',
      inlinePrimary: '计算命盘',
      applyTitle: '实践刚读到的内容',
      applyDescription: '计算紫微斗数命盘，继续进入 AI 解读。',
      applyPrimary: '计算我的命盘',
      aiTitle: 'AI 解读命盘',
      aiDescription: '让 AI 为您解释主星排列的含义。',
      aiPrimary: '开始 AI 解读',
    },
    comparison: {
      inlineTitle: '同时计算四柱和占星来对比',
      inlineDescription: '把四柱和占星都算一遍，各体系的差异会变得非常清楚。',
      inlinePrimary: '计算四柱',
      applyTitle: '读完对比文章，试试两边都算一下',
      applyDescription: '同时计算四柱和占星的星盘，亲自感受每种体系解读人生的不同方式。',
      applyPrimary: '四柱和占星都试试',
      aiTitle: '把这个对比主题继续带进 AI',
      aiDescription: '计算后可以让 AI 对比四柱和占星各自对性格、关系、事业的不同解读。',
      aiPrimary: '开始对比 AI',
    },
  },
}

const INTERNAL_LINK_COPY: Record<LanguageKey, { title: string; guide: string; index: string }> = {
  ko: { title: '함께 읽으면 좋은 내부 링크', guide: '관련 가이드', index: '기사 전체 보기' },
  en: { title: 'Internal links worth opening next', guide: 'Related guide', index: 'See all articles' },
  ja: { title: '次に開くとよい内部リンク', guide: '関連ガイド', index: '記事一覧を見る' },
  zh: { title: '适合继续打开的内部链接', guide: '相关指南', index: '查看全部文章' },
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
  const internalLinkCopy = INTERNAL_LINK_COPY[currentLang]

  const articleCards: ArticleCard[] = ARTICLE_CATALOG.map((item) => ({
    id: item.id,
    key: item.key,
    cluster: item.cluster,
    content: t.articles[item.key],
  }))

  const articleMeta = articleId ? articleCards.find((item) => item.id === articleId) ?? null : null
  const article = articleMeta?.content ?? null
  const relatedIds = articleId ? ARTICLE_RELATED_MAP[articleId] ?? [] : []
  const allRelatedArticles = [
    ...relatedIds
      .map((id) => articleCards.find((item) => item.id === id))
      .filter((item): item is ArticleCard => Boolean(item)),
    ...articleCards.filter((item) => item.id !== articleId && !relatedIds.includes(item.id)),
  ]
  const relatedArticles = allRelatedArticles.slice(0, 3)

  if (!article) {
    return <Navigate to={`/${currentLang}/articles`} replace />
  }

  const cluster = articleMeta?.cluster ?? 'starter'
  const ctaCopy = CLUSTER_CTA_COPY[currentLang][cluster]
  const guideCopy = GUIDE_COPY[currentLang][cluster]
  const guidePath = GUIDE_PATH_BY_CLUSTER[cluster]
  const topInternalLinks: ArticleLinkTarget[] = [
    {
      id: `guide-${cluster}`,
      path: `/${currentLang}${guidePath}`,
      title: guideCopy.title,
      description: guideCopy.description,
    },
    ...allRelatedArticles.slice(0, 2).map((item) => ({
      id: item.id,
      path: `/${currentLang}/articles/${item.id}`,
      title: item.content.title,
      description: item.content.intro,
    })),
  ]
  const bottomInternalLinks: ArticleLinkTarget[] = [
    ...allRelatedArticles.slice(2, 4).map((item) => ({
      id: item.id,
      path: `/${currentLang}/articles/${item.id}`,
      title: item.content.title,
      description: item.content.intro,
    })),
    {
      id: 'articles-index',
      path: `/${currentLang}/articles`,
      title: internalLinkCopy.index,
      description: copy.relatedDescription,
    },
  ]

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

  const articleBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', position: 1, name: currentLang === 'ko' ? '홈' : currentLang === 'ja' ? 'ホーム' : currentLang === 'zh' ? '首页' : 'Home', item: `https://saju-wheat.vercel.app/${currentLang}/` },
      { '@type': 'ListItem', position: 2, name: currentLang === 'ko' ? '기사' : currentLang === 'ja' ? '記事' : currentLang === 'zh' ? '文章' : 'Articles', item: `https://saju-wheat.vercel.app/${currentLang}/articles` },
      { '@type': 'ListItem', position: 3, name: article.title },
    ],
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
        structuredData={[articleStructuredData, articleBreadcrumb]}
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
              <AdBanner slot="article_top" format="horizontal" />
            </section>

            <div className="prose prose-sm sm:prose max-w-none">
              <p className="lead text-lg text-base-content/80 mb-8">
                {article.intro}
              </p>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">{article.section1Title}</h2>
                <p>{article.section1Text}</p>
              </section>

              <section className="not-prose mb-8 rounded-2xl border border-base-300 bg-base-200/60 p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <p className="text-sm font-semibold text-base-content">{internalLinkCopy.title}</p>
                  <span className="text-xs text-base-content/50">{internalLinkCopy.guide}</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {topInternalLinks.map((link) => (
                    <Link
                      key={link.id}
                      to={link.path}
                      className="rounded-xl border border-base-300 bg-base-100 p-3 transition-colors hover:border-primary hover:bg-base-100/80"
                      onClick={() => handleArticleCtaClick('article_internal_link_top', link.id)}
                    >
                      <div className="text-sm font-medium text-base-content">{link.title}</div>
                      <div className="text-xs text-base-content/60 mt-1 line-clamp-3">{link.description}</div>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">{article.section2Title}</h2>
                <p>{article.section2Text}</p>
              </section>

              <section className="not-prose mb-8 rounded-2xl border border-secondary/20 bg-secondary/5 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-base-content">{ctaCopy.inlineTitle}</h2>
                    <p className="text-sm text-base-content/70 mt-1">{ctaCopy.inlineDescription}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/${currentLang}/`}
                      className="btn btn-primary btn-sm"
                      onClick={() => handleArticleCtaClick('article_inline', 'home_calculator')}
                    >
                      {ctaCopy.inlinePrimary}
                    </Link>
                    <Link
                      to={`/${currentLang}${guidePath}`}
                      className="btn btn-outline btn-sm"
                      onClick={() => handleArticleCtaClick('article_inline', `guide_${cluster}`)}
                    >
                      {guideCopy.button}
                    </Link>
                  </div>
                </div>
              </section>

              <section className="not-prose mb-8 rounded-2xl border border-base-300 bg-base-200/70 p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="badge badge-outline">{copy.sponsored}</div>
                  <p className="text-xs text-base-content/50">{copy.midAdLabel}</p>
                </div>
                <AdBanner slot="article_mid" format="horizontal" />
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">{article.section3Title}</h2>
                <p>{article.section3Text}</p>
              </section>

              <section className="not-prose mb-8 rounded-2xl border border-base-300 bg-base-200/60 p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <p className="text-sm font-semibold text-base-content">{internalLinkCopy.title}</p>
                  <span className="text-xs text-base-content/50">{copy.relatedAll}</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {bottomInternalLinks.map((link) => (
                    <Link
                      key={link.id}
                      to={link.path}
                      className="rounded-xl border border-base-300 bg-base-100 p-3 transition-colors hover:border-primary hover:bg-base-100/80"
                      onClick={() => handleArticleCtaClick('article_internal_link_bottom', link.id)}
                    >
                      <div className="text-sm font-medium text-base-content">{link.title}</div>
                      <div className="text-xs text-base-content/60 mt-1 line-clamp-3">{link.description}</div>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">{article.section4Title}</h2>
                <p>{article.section4Text}</p>
              </section>
            </div>

            <section className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-base-content">{ctaCopy.applyTitle}</h2>
                  <p className="text-sm text-base-content/70 mt-1">{ctaCopy.applyDescription}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/${currentLang}/`}
                    className="btn btn-primary btn-sm"
                    onClick={() => handleArticleCtaClick('article_apply', 'home_calculator')}
                  >
                    {ctaCopy.applyPrimary}
                  </Link>
                  <Link
                    to={`/${currentLang}${guidePath}`}
                    className="btn btn-outline btn-sm"
                    onClick={() => handleArticleCtaClick('article_apply', `guide_${cluster}`)}
                  >
                    {guideCopy.button}
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
              <AdBanner slot="article_bottom" format="horizontal" />
            </section>

            <section className="mt-8 rounded-2xl border border-accent/20 bg-accent/10 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-base-content">{ctaCopy.aiTitle}</h2>
                  <p className="text-sm text-base-content/70 mt-1">{ctaCopy.aiDescription}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/${currentLang}/`}
                    className="btn btn-primary btn-sm"
                    onClick={() => handleArticleCtaClick('article_ai', 'home_ai_flow')}
                  >
                    {ctaCopy.aiPrimary}
                  </Link>
                  <Link
                    to={`/${currentLang}${guidePath}`}
                    className="btn btn-outline btn-sm"
                    onClick={() => handleArticleCtaClick('article_ai', `guide_${cluster}`)}
                  >
                    {guideCopy.button}
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
