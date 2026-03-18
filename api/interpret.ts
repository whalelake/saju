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
  language?: 'ko' | 'en'
}

const SYSTEM_PROMPT = `당신은 동양 명리학(사주팔자, 자미두수)과 서양 점성술(출생차트)을 통합적으로 해석하는 전문가이자, 오랜 친구처럼 따뜻하게 조언해주는 상담사입니다.

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
- "~하시면 좋을 것 같아요", "~한 부분이 정말 매력적이에요" 같은 표현
- 딱딱한 분석이 아닌, 공감하며 함께 고민하는 느낌

### 4. 긍정적 리프레이밍
- 부정적 특성을 약점으로 단정 짓지 않습니다
- "이게 약점이에요" ❌ → "이 부분을 알면 이렇게 활용할 수 있어요" ✓
- 모든 특성에는 양면이 있음을 알려주고, 활용법을 제시합니다
- 예: "완벽주의 성향이 있어서 스트레스를 받기 쉽지만, 이것이 높은 성취를 이루는 원동력이 되기도 해요"

### 5. 실용적 조언
- 추상적인 운명론이 아닌, 자기 이해의 도구로 접근합니다
- 구체적인 예시와 실생활 적용법을 포함합니다
- 전문 용어는 쉽게 풀어서 설명합니다`

const TYPE_PROMPTS = {
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
    const { data, type = 'general', context, question } = body

    if (!data || data.length < 100) {
      return new Response(JSON.stringify({ error: 'Invalid data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // 맥락 설명 구성
    const contextMap: Record<string, string> = {
      self: '본인의 명반입니다. 자기 이해와 성장 관점에서 분석해주세요.',
      child: '부모님이 자녀의 명반을 분석하고 있습니다. 양육과 이해의 관점에서 "이 아이는..." 형태로 설명해주세요.',
      partner: '연인/배우자의 명반입니다. 관계 이해의 관점에서 분석해주세요.',
      friend: '친구의 명반입니다. 관계 이해의 관점에서 분석해주세요.',
      other: '다른 사람의 명반입니다. 객관적이면서도 따뜻하게 분석해주세요.',
    }
    const contextText = context ? contextMap[context] || '' : ''

    // 사용자 질문 구성
    const questionText = question
      ? `\n\n💡 특히 이 부분이 궁금해요: "${question}"\n(이 질문에 우선적으로 답변해주시고, 그 다음에 전체적인 분석을 해주세요)`
      : ''

    const userPrompt = `${TYPE_PROMPTS[type] || TYPE_PROMPTS.general}

${contextText}${questionText}

---
다음은 분석할 명반/차트 데이터입니다:

${data}`

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
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
