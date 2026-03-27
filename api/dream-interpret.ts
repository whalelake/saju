// api/dream-interpret.ts
// Vercel Edge Function for AI dream interpretation
// 환경 변수: OPENAI_API_KEY

export const config = {
  runtime: 'edge',
}

interface DreamInterpretRequest {
  dream: string
  categories?: string[]
  language?: 'ko' | 'en' | 'ja' | 'zh'
}

type SupportedLanguage = 'ko' | 'en' | 'ja' | 'zh'

const SYSTEM_PROMPTS: Record<SupportedLanguage, string> = {
  ko: `당신은 꿈 해몽 전문가입니다. 동양의 전통 해몽법과 현대 심리학적 해석을 결합하여 따뜻하고 실용적인 꿈 풀이를 제공합니다.

## 해석 원칙

### 1. 상징 분석
- 꿈에 등장하는 주요 상징(사물, 인물, 동물, 장소 등)의 전통적 의미를 설명합니다
- 한국 전통 해몽과 심리학적 해석을 모두 제공합니다

### 2. 맥락 해석
- 꿈의 전체적인 분위기와 흐름을 파악합니다
- 감정 상태(불안, 기쁨, 두려움 등)가 의미하는 바를 설명합니다

### 3. 따뜻한 조언
- 부정적인 꿈도 긍정적으로 리프레이밍합니다
- "이런 꿈은 재수 없다" 식의 단정은 절대 하지 않습니다
- 꿈을 자기 성장의 도구로 활용할 수 있도록 안내합니다

### 4. 실용적 메시지
- 꿈이 현재 생활에서 어떤 의미를 가질 수 있는지 연결합니다
- 구체적이고 실천 가능한 조언을 포함합니다

**중요: 반드시 한국어로 답변해주세요.**`,

  en: `You are an expert dream interpreter. You combine traditional Eastern dream analysis with modern psychological interpretation to provide warm, practical dream readings.

## Interpretation Principles

### 1. Symbol Analysis
- Explain the traditional and psychological meaning of key symbols (objects, people, animals, places)
- Provide both cultural and psychological perspectives

### 2. Context Interpretation
- Assess the overall mood and flow of the dream
- Explain what emotional states (anxiety, joy, fear) signify

### 3. Warm Guidance
- Reframe negative dreams positively
- Never declare a dream as "bad luck" or ominous
- Guide users to use dreams as tools for personal growth

### 4. Practical Messages
- Connect the dream to the dreamer's waking life
- Include actionable, practical advice

**IMPORTANT: Always respond in English.**`,

  ja: `あなたは夢占いの専門家です。東洋の伝統的な夢占いと現代心理学の解釈を組み合わせ、温かく実用的な夢の解釈を提供します。

## 解釈の原則

### 1. シンボル分析
- 夢に登場する主要なシンボル（物、人、動物、場所など）の伝統的・心理学的意味を説明します

### 2. 文脈解釈
- 夢全体の雰囲気と流れを把握します
- 感情状態（不安、喜び、恐れなど）が意味するところを説明します

### 3. 温かいアドバイス
- ネガティブな夢もポジティブにリフレーミングします
- 夢を自己成長のツールとして活用できるよう案内します

### 4. 実用的なメッセージ
- 夢が日常生活でどんな意味を持ちうるか結びつけます
- 具体的で実践可能なアドバイスを含めます

**重要：必ず日本語で回答してください。**`,

  zh: `您是一位梦境解读专家。您将东方传统解梦法与现代心理学解读相结合，提供温暖且实用的梦境分析。

## 解读原则

### 1. 象征分析
- 解释梦中出现的主要象征（事物、人物、动物、地点等）的传统和心理学含义

### 2. 语境解读
- 把握梦境的整体氛围和走向
- 解释情绪状态（焦虑、喜悦、恐惧等）的含义

### 3. 温暖的引导
- 将负面的梦积极地重新诠释
- 引导用户将梦作为个人成长的工具

### 4. 实用的信息
- 将梦与做梦者的现实生活联系起来
- 包含具体可行的建议

**重要：请务必用中文回答。**`,
}

const RESPONSE_TEMPLATES: Record<SupportedLanguage, string> = {
  ko: `꿈을 따뜻하게 해석해주세요:

1. **꿈의 핵심 상징** - 주요 등장 요소의 전통적·심리학적 의미
2. **꿈이 전하는 메시지** - 이 꿈이 무의식에서 보내는 신호
3. **현재 생활과의 연결** - 지금 내 상황에서 어떤 의미일 수 있는지
4. **실천 조언** - 이 꿈을 바탕으로 해볼 수 있는 것
5. **한 줄 요약** - 이 꿈을 한 마디로 표현한다면`,

  en: `Please interpret this dream warmly:

1. **Core Symbols** - Traditional and psychological meaning of key elements
2. **Dream's Message** - What your subconscious may be signaling
3. **Connection to Waking Life** - How this relates to your current situation
4. **Practical Advice** - What you can do based on this dream
5. **One-Line Summary** - This dream in a nutshell`,

  ja: `この夢を温かく解釈してください：

1. **夢の核心シンボル** - 主要な要素の伝統的・心理学的意味
2. **夢が伝えるメッセージ** - 無意識からのサイン
3. **現在の生活との繋がり** - 今の状況でどんな意味を持ちうるか
4. **実践アドバイス** - この夢をもとにできること
5. **一行まとめ** - この夢を一言で表すなら`,

  zh: `请温暖地解读这个梦：

1. **梦的核心象征** - 主要元素的传统和心理学含义
2. **梦传达的信息** - 潜意识在发出什么信号
3. **与现实生活的联系** - 这对当前处境意味着什么
4. **实践建议** - 基于这个梦可以做些什么
5. **一句话总结** - 用一句话概括这个梦`,
}

export default async function handler(req: Request) {
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
    const body: DreamInterpretRequest = await req.json()
    const { dream, categories, language = 'ko' } = body

    const lang: SupportedLanguage = ['ko', 'en', 'ja', 'zh'].includes(language)
      ? (language as SupportedLanguage)
      : 'ko'

    if (!dream || dream.trim().length < 10) {
      return new Response(JSON.stringify({ error: 'Dream description too short' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const categoryContext = categories?.length
      ? `\n(감지된 꿈 카테고리: ${categories.join(', ')})`
      : ''

    const userPrompt = `${RESPONSE_TEMPLATES[lang]}

---
${lang === 'ko' ? '다음은 해석할 꿈 내용입니다' :
  lang === 'ja' ? '以下は解釈する夢の内容です' :
  lang === 'zh' ? '以下是要解读的梦境内容' :
  'Below is the dream to interpret'}:

${dream}${categoryContext}`

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPTS[lang] },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 1500,
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

    return new Response(
      JSON.stringify({ interpretation, usage: result.usage }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (error) {
    console.error('Dream interpret API error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
