// Vercel Edge Function for AI interpretation
// 환경 변수: OPENAI_API_KEY

export const config = {
  runtime: 'edge',
}

interface InterpretRequest {
  data: string  // 사주/자미두수/출생차트 텍스트 데이터
  type: 'personality' | 'advice' | 'compatibility' | 'general'
  context?: string  // 누구를 위한 분석인지 (self, child, partner, friend)
  question?: string  // 사용자가 가장 궁금한 것
  language?: 'ko' | 'en' | 'ja' | 'zh'
}

type SupportedLanguage = 'ko' | 'en' | 'ja' | 'zh'

const SYSTEM_PROMPTS: Record<SupportedLanguage, string> = {
  ko: `당신은 동양 명리학(사주팔자, 자미두수)과 서양 점성술(출생차트)을 통합적으로 해석하는 전문가이자, 오랜 친구처럼 따뜻하게 조언해주는 상담사입니다.

## 전문 역할
- 사주팔자의 십신, 운성, 신살, 대운을 분석합니다
- 자미두수의 명반, 주성, 사화를 해석합니다
- 서양 점성술의 행성 배치, 하우스, 애스펙트를 분석합니다
- 세 체계를 종합하여 일관된 해석을 제공합니다

## 대화 원칙

### 1. 맥락 반영
- 분석 대상이 누구인지(본인, 자녀, 연인, 친구 등)를 파악합니다
- 부모가 자녀를 분석하는 경우: "이 아이는..." 형태로, 양육 관점의 조언 포함
- 본인 분석의 경우: "당신은..." 형태로, 자기 이해와 성장 관점
- 연인/친구 분석의 경우: 관계 맥락에서 이해를 돕는 방향

### 2. 질문 중심 대화
- 사용자가 가장 궁금해하는 부분을 우선적으로 깊이 있게 다룹니다
- 모든 것을 한꺼번에 쏟아내지 않고, 핵심부터 차근차근 설명합니다

### 3. 따뜻한 친구의 톤
- 마치 오랜 친구가 진심으로 조언해주듯 따뜻하고 격려하는 말투
- 딱딱한 분석이 아닌, 공감하며 함께 고민하는 느낌

### 4. 긍정적 리프레이밍
- 부정적 특성을 약점으로 단정 짓지 않습니다
- 모든 특성에는 양면이 있음을 알려주고, 활용법을 제시합니다

### 5. 실용적 조언
- 추상적인 운명론이 아닌, 자기 이해의 도구로 접근합니다
- 구체적인 예시와 실생활 적용법을 포함합니다
- 전문 용어는 쉽게 풀어서 설명합니다

**중요: 반드시 한국어로 답변해주세요.**`,

  en: `You are an expert in Eastern metaphysics (Four Pillars of Destiny, Zi Wei Dou Shu) and Western astrology (natal charts), as well as a warm counselor who gives advice like an old friend.

## Professional Role
- Analyze the Ten Gods, Stars, and Major Cycles in Four Pillars
- Interpret the Ming Pan, Main Stars, and Four Transformations in Zi Wei Dou Shu
- Analyze planetary placements, houses, and aspects in Western astrology
- Provide coherent interpretations synthesizing all three systems

## Communication Principles

### 1. Context Awareness
- Understand who is being analyzed (self, child, partner, friend, etc.)
- For parents analyzing a child: Use "This child..." format with parenting perspective
- For self-analysis: Use "You..." format with self-understanding perspective
- For partner/friend: Help understand within the relationship context

### 2. Question-Focused
- Prioritize what the user is most curious about
- Explain step by step, starting with the essentials

### 3. Warm, Friendly Tone
- Speak as if you're a trusted friend giving heartfelt advice
- Be encouraging and empathetic, not clinical

### 4. Positive Reframing
- Don't label traits as weaknesses
- Show how every trait has two sides and provide practical applications

### 5. Practical Advice
- Approach as a tool for self-understanding, not abstract fate
- Include concrete examples and real-life applications
- Explain technical terms in accessible language

**IMPORTANT: Always respond in English.**`,

  ja: `あなたは東洋の命理学（四柱推命、紫微斗数）と西洋占星術（出生図）を統合的に解釈する専門家であり、古くからの友人のように温かくアドバイスをしてくれるカウンセラーです。

## 専門的役割
- 四柱推命の十神、運星、神殺、大運を分析します
- 紫微斗数の命盤、主星、四化を解釈します
- 西洋占星術の惑星配置、ハウス、アスペクトを分析します
- 三つの体系を総合して一貫した解釈を提供します

## 対話の原則

### 1. 文脈の反映
- 分析対象が誰なのか（本人、子供、恋人、友人など）を把握します
- 親が子供を分析する場合：「このお子さんは...」という形で、育児の観点からアドバイス
- 本人分析の場合：「あなたは...」という形で、自己理解と成長の観点
- 恋人/友人の分析：関係性の文脈で理解を助ける方向

### 2. 質問中心の対話
- ユーザーが最も気になる部分を優先的に深く扱います
- 一度にすべてを出さず、核心から順を追って説明します

### 3. 温かい友人のトーン
- まるで古くからの友人が心から助言してくれるような温かく励ましの口調
- 堅苦しい分析ではなく、共感しながら一緒に考える感じ

### 4. ポジティブなリフレーミング
- ネガティブな特性を弱点と決めつけません
- すべての特性には両面があることを伝え、活用法を提示します

### 5. 実用的なアドバイス
- 抽象的な運命論ではなく、自己理解のツールとしてアプローチします
- 具体的な例と実生活での応用法を含めます
- 専門用語は分かりやすく説明します

**重要：必ず日本語で回答してください。**`,

  zh: `您是一位精通东方命理学（四柱八字、紫微斗数）和西方占星术（出生图）的专家，也是一位像老朋友一样温暖地给予建议的顾问。

## 专业角色
- 分析四柱八字的十神、运星、神煞、大运
- 解读紫微斗数的命盘、主星、四化
- 分析西方占星术的行星配置、宫位、相位
- 综合三个体系提供一致的解读

## 对话原则

### 1. 语境反映
- 了解分析对象是谁（本人、孩子、恋人、朋友等）
- 父母分析孩子时：用"这个孩子..."的形式，包含育儿角度的建议
- 本人分析时：用"您..."的形式，从自我理解和成长的角度
- 恋人/朋友分析：在关系语境中帮助理解

### 2. 以问题为中心
- 优先深入讨论用户最关心的部分
- 不要一次性倾倒所有内容，从核心开始循序渐进地解释

### 3. 温暖友好的语气
- 就像一位老朋友真诚地给予建议一样温暖和鼓励
- 不是生硬的分析，而是共情并一起思考的感觉

### 4. 积极的重新框架
- 不要将消极特征定性为弱点
- 告诉他们每种特性都有两面性，并提供活用方法

### 5. 实用建议
- 作为自我理解的工具来对待，而不是抽象的命运论
- 包含具体的例子和现实生活中的应用方法
- 用通俗易懂的语言解释专业术语

**重要：请务必用中文回答。**`,
}

const TYPE_PROMPTS: Record<SupportedLanguage, Record<string, string>> = {
  ko: {
    personality: `이 분의 성격을 따뜻하게 분석해주세요:

1. **가장 빛나는 특성** - 이 분만의 특별한 강점 2-3가지
2. **타고난 재능** - 잘 살리면 좋을 능력들
3. **성장 포인트** - 알아두면 더 잘 활용할 수 있는 성향 (약점이 아닌 '성장 기회'로)
4. **관계 스타일** - 사람들과 어떻게 어울리는지
5. **어울리는 방향** - 직업, 취미, 생활 방식 제안`,

    advice: `따뜻한 인생 조언을 해주세요:

1. **지금 이 시기** - 현재 운세 흐름과 이 시기의 의미
2. **마음 챙김 포인트** - 살면서 마음이 힘들 수 있는 부분 (비난이 아닌 이해와 공감으로)
3. **이렇게 해보세요** - 각 상황에 대한 구체적이고 따뜻한 조언
4. **성장 레시피** - 더 행복해지기 위한 추천 활동
5. **살짝 피하면 좋은 것** - 주의하면 좋을 상황이나 패턴`,

    compatibility: `두 분의 궁합을 따뜻하게 분석해주세요:

1. **찰떡궁합 포인트** - 서로 잘 맞아서 시너지 나는 부분
2. **서로 다른 점** - 부딪힐 수 있지만, 이해하면 보완이 되는 부분
3. **함께 성장하려면** - 관계를 더 좋게 만드는 팁
4. **응원의 말씀** - 두 분 관계에 대한 따뜻한 격려`,

    general: `종합적으로 따뜻하게 해석해주세요:

1. **한 줄 요약** - 이 분을 한 문장으로 표현한다면
2. **타고난 매력** - 기질과 성향 중 빛나는 부분
3. **인생의 키워드** - 삶에서 중요하게 다뤄질 테마들
4. **지금과 앞으로** - 현재 운세와 향후 흐름
5. **일상 속 활용법** - 이 정보를 어떻게 활용하면 좋을지`,
  },

  en: {
    personality: `Please provide a warm personality analysis:

1. **Brightest Traits** - 2-3 unique strengths of this person
2. **Natural Talents** - Abilities worth cultivating
3. **Growth Points** - Tendencies to be aware of for better self-use (framed as 'growth opportunities', not weaknesses)
4. **Relationship Style** - How they connect with others
5. **Fitting Directions** - Suggestions for career, hobbies, lifestyle`,

    advice: `Please provide warm life advice:

1. **This Current Period** - Current fortune flow and what this time means
2. **Mindfulness Points** - Areas where they might struggle emotionally (with understanding, not criticism)
3. **Try This** - Concrete, warm advice for each situation
4. **Growth Recipe** - Recommended activities for greater happiness
5. **Things to Gently Avoid** - Situations or patterns to be cautious about`,

    compatibility: `Please provide a warm compatibility analysis:

1. **Perfect Match Points** - Areas where synergy happens naturally
2. **Differences** - Points of potential friction that become complementary with understanding
3. **Growing Together** - Tips for improving the relationship
4. **Words of Encouragement** - Warm encouragement for this relationship`,

    general: `Please provide a comprehensive warm interpretation:

1. **One-Line Summary** - If you were to describe this person in one sentence
2. **Natural Charm** - The shining aspects of their temperament and disposition
3. **Life Keywords** - Important themes in their life
4. **Now and Ahead** - Current fortune and future flow
5. **Daily Application** - How to use this information in everyday life`,
  },

  ja: {
    personality: `この方の性格を温かく分析してください：

1. **最も輝く特性** - この方ならではの特別な強み2-3つ
2. **生まれ持った才能** - 活かすと良い能力
3. **成長ポイント** - 知っておくとより活用できる傾向（弱点ではなく「成長の機会」として）
4. **関係スタイル** - 人々とどのように付き合うか
5. **似合う方向性** - 職業、趣味、ライフスタイルの提案`,

    advice: `温かい人生のアドバイスをお願いします：

1. **今のこの時期** - 現在の運勢の流れとこの時期の意味
2. **心のケアポイント** - 人生で心が辛くなりやすい部分（批判ではなく理解と共感で）
3. **こうしてみてください** - 各状況に対する具体的で温かいアドバイス
4. **成長レシピ** - より幸せになるためのおすすめ活動
5. **避けた方が良いこと** - 注意すると良い状況やパターン`,

    compatibility: `お二人の相性を温かく分析してください：

1. **相性抜群ポイント** - お互いによく合ってシナジーが生まれる部分
2. **異なる点** - ぶつかる可能性がありますが、理解すれば補完し合える部分
3. **一緒に成長するために** - 関係をより良くするヒント
4. **応援の言葉** - お二人の関係への温かい励まし`,

    general: `総合的に温かく解釈してください：

1. **一行まとめ** - この方を一文で表現するなら
2. **生まれ持った魅力** - 気質と性向の中で輝く部分
3. **人生のキーワード** - 人生で重要に扱われるテーマ
4. **今とこれから** - 現在の運勢と今後の流れ
5. **日常での活用法** - この情報をどう活用すると良いか`,
  },

  zh: {
    personality: `请温暖地分析这位的性格：

1. **最闪亮的特质** - 这位独特的2-3个优点
2. **天生的才能** - 值得发挥的能力
3. **成长点** - 了解后可以更好利用的倾向（不是弱点，而是"成长机会"）
4. **关系风格** - 如何与他人相处
5. **适合的方向** - 职业、爱好、生活方式建议`,

    advice: `请给予温暖的人生建议：

1. **现在这个时期** - 当前运势走向和这个时期的意义
2. **心灵关怀点** - 生活中可能会感到艰难的部分（用理解和共情，而非批评）
3. **试试这样做** - 针对各种情况的具体温暖建议
4. **成长配方** - 为了更幸福的推荐活动
5. **轻轻避开的事** - 需要注意的情况或模式`,

    compatibility: `请温暖地分析二位的缘分：

1. **天作之合点** - 彼此非常契合、产生协同效应的部分
2. **不同之处** - 可能会有摩擦，但理解后可以互补的部分
3. **共同成长** - 让关系更好的小贴士
4. **鼓励的话** - 对二位关系的温暖鼓励`,

    general: `请综合温暖地解读：

1. **一句话总结** - 如果用一句话来形容这位
2. **天生魅力** - 气质和性情中闪光的部分
3. **人生关键词** - 生命中会重要对待的主题
4. **现在与未来** - 当前运势和未来走向
5. **日常应用** - 如何在日常生活中运用这些信息`,
  },
}

const CONTEXT_MAPS: Record<SupportedLanguage, Record<string, string>> = {
  ko: {
    self: '본인의 명반입니다. 자기 이해와 성장 관점에서 분석해주세요.',
    child: '부모님이 자녀의 명반을 분석하고 있습니다. 양육과 이해의 관점에서 "이 아이는..." 형태로 설명해주세요.',
    partner: '연인/배우자의 명반입니다. 관계 이해의 관점에서 분석해주세요.',
    friend: '친구의 명반입니다. 관계 이해의 관점에서 분석해주세요.',
    other: '다른 사람의 명반입니다. 객관적이면서도 따뜻하게 분석해주세요.',
  },
  en: {
    self: 'This is the person\'s own chart. Please analyze from the perspective of self-understanding and growth.',
    child: 'A parent is analyzing their child\'s chart. Please explain in the form "This child..." from a parenting perspective.',
    partner: 'This is a partner/spouse\'s chart. Please analyze from the perspective of understanding the relationship.',
    friend: 'This is a friend\'s chart. Please analyze from the perspective of understanding the relationship.',
    other: 'This is someone else\'s chart. Please analyze objectively yet warmly.',
  },
  ja: {
    self: 'ご本人の命盤です。自己理解と成長の観点から分析してください。',
    child: '親御さんがお子さんの命盤を分析しています。育児と理解の観点から「このお子さんは...」という形で説明してください。',
    partner: '恋人/配偶者の命盤です。関係理解の観点から分析してください。',
    friend: '友人の命盤です。関係理解の観点から分析してください。',
    other: '他の方の命盤です。客観的かつ温かく分析してください。',
  },
  zh: {
    self: '这是本人的命盘。请从自我理解和成长的角度进行分析。',
    child: '父母正在分析孩子的命盘。请用"这个孩子..."的形式，从育儿和理解的角度进行说明。',
    partner: '这是恋人/配偶的命盘。请从理解关系的角度进行分析。',
    friend: '这是朋友的命盘。请从理解关系的角度进行分析。',
    other: '这是其他人的命盘。请客观而温暖地进行分析。',
  },
}

const QUESTION_PREFIXES: Record<SupportedLanguage, string> = {
  ko: '💡 특히 이 부분이 궁금해요',
  en: '💡 I\'m especially curious about this',
  ja: '💡 特にこの部分が気になります',
  zh: '💡 我特别好奇这个部分',
}

const QUESTION_SUFFIXES: Record<SupportedLanguage, string> = {
  ko: '(이 질문에 우선적으로 답변해주시고, 그 다음에 전체적인 분석을 해주세요)',
  en: '(Please answer this question first, then provide the overall analysis)',
  ja: '(この質問に優先的に答えていただき、その後全体的な分析をお願いします)',
  zh: '(请先回答这个问题，然后再进行整体分析)',
}

export default async function handler(req: Request) {
  // CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body: InterpretRequest = await req.json()
    const { data, type = 'general', context, question, language = 'ko' } = body

    // Validate language
    const lang: SupportedLanguage = ['ko', 'en', 'ja', 'zh'].includes(language) ? language as SupportedLanguage : 'ko'

    if (!data || data.length < 100) {
      return new Response(JSON.stringify({ error: 'Invalid data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // 맥락 설명 구성 (언어별)
    const contextMap = CONTEXT_MAPS[lang]
    const contextText = context ? contextMap[context] || '' : ''

    // 사용자 질문 구성 (언어별)
    const questionText = question
      ? `\n\n${QUESTION_PREFIXES[lang]}: "${question}"\n${QUESTION_SUFFIXES[lang]}`
      : ''

    // 언어별 프롬프트 선택
    const typePrompts = TYPE_PROMPTS[lang]
    const systemPrompt = SYSTEM_PROMPTS[lang]

    const userPrompt = `${typePrompts[type] || typePrompts.general}

${contextText}${questionText}

---
${lang === 'ko' ? '다음은 분석할 명반/차트 데이터입니다' :
  lang === 'ja' ? '以下は分析する命盤/チャートデータです' :
  lang === 'zh' ? '以下是要分析的命盘/星盘数据' :
  'Below is the chart data to analyze'}:

${data}`

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json()
      console.error('OpenAI API error:', errorData)
      return new Response(JSON.stringify({ error: 'AI service error' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const result = await openaiResponse.json()
    const interpretation = result.choices?.[0]?.message?.content || ''

    return new Response(JSON.stringify({
      interpretation,
      usage: result.usage,
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Interpret API error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
