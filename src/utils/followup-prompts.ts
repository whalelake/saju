type InterpretType = 'personality' | 'advice' | 'general'

export type TabKey = 'saju' | 'ziwei' | 'natal'
export type LanguageKey = 'ko' | 'en' | 'ja' | 'zh'
export type FollowupQuestionId = 'strength' | 'timing' | 'relationship' | 'career_money' | 'growth'

export interface FollowupPrompt {
  label: string
  prompt: string
  type: InterpretType
}

export const FOLLOWUP_QUESTION_ORDER: Record<TabKey, FollowupQuestionId[]> = {
  saju: ['strength', 'relationship', 'career_money', 'timing', 'growth'],
  ziwei: ['timing', 'relationship', 'growth', 'strength', 'career_money'],
  natal: ['strength', 'career_money', 'growth', 'timing', 'relationship'],
}

const FOLLOWUP_PROMPTS: Record<LanguageKey, Record<TabKey, Record<FollowupQuestionId, FollowupPrompt>>> = {
  ko: {
    saju: {
      strength: {
        label: '사주에서 내 강점이 어디에 드러나나요?',
        prompt: '사주 기준으로 내 타고난 강점과 잘 쓰면 좋은 기질을 쉽게 설명해줘.',
        type: 'personality',
      },
      timing: {
        label: '사주 흐름상 지금 중요한 포인트는?',
        prompt: '사주 기준으로 지금 시기에 가장 신경 써야 할 포인트를 실용적으로 알려줘.',
        type: 'advice',
      },
      relationship: {
        label: '사주에서 관계 패턴은 어떻게 읽나요?',
        prompt: '사주 기준으로 연애와 인간관계에서 내가 반복하기 쉬운 패턴을 알려줘.',
        type: 'general',
      },
      career_money: {
        label: '사주에서 일과 돈 흐름은 어떤 편인가요?',
        prompt: '사주 기준으로 직업과 돈 흐름에서 강점, 약점, 주의점을 쉽게 설명해줘.',
        type: 'advice',
      },
      growth: {
        label: '사주 기준으로 잘 풀리려면 어떻게 움직여야 해?',
        prompt: '사주 기준으로 내가 더 잘 풀리려면 어떤 태도와 행동 방식이 맞는지 알려줘.',
        type: 'general',
      },
    },
    ziwei: {
      strength: {
        label: '자미두수에서 내 타고난 장점은?',
        prompt: '자미두수 명반 기준으로 내 타고난 장점과 두드러지는 성향을 쉽게 설명해줘.',
        type: 'personality',
      },
      timing: {
        label: '자미두수로 지금 흐름을 읽어줘요',
        prompt: '자미두수 기준으로 지금 시기에 가장 중요한 흐름과 포인트를 알려줘.',
        type: 'advice',
      },
      relationship: {
        label: '명반에서 관계 패턴은 어떻게 보이나요?',
        prompt: '자미두수 명반 기준으로 연애와 인간관계 패턴을 쉽게 설명해줘.',
        type: 'general',
      },
      career_money: {
        label: '관록궁·재백궁 흐름을 쉽게 알려줘요',
        prompt: '자미두수 기준으로 커리어와 재물 흐름에서 중요한 포인트를 실용적으로 정리해줘.',
        type: 'advice',
      },
      growth: {
        label: '명반 기준으로 더 잘 풀리는 방향은?',
        prompt: '자미두수 명반 기준으로 내가 더 잘 풀리려면 어떤 방향으로 움직이는 게 좋은지 알려줘.',
        type: 'general',
      },
    },
    natal: {
      strength: {
        label: '출생차트에서 내 강점은 어디에 있나요?',
        prompt: '출생차트 기준으로 내 성격의 강점과 자연스럽게 드러나는 매력을 쉽게 설명해줘.',
        type: 'personality',
      },
      timing: {
        label: '차트 기준으로 지금 중요한 흐름은?',
        prompt: '출생차트 기준으로 지금 시기에 가장 신경 써야 할 포인트를 알려줘.',
        type: 'advice',
      },
      relationship: {
        label: '감정과 관계 패턴을 차트로 읽어줘요',
        prompt: '출생차트 기준으로 감정 표현과 연애, 인간관계 패턴을 쉽게 설명해줘.',
        type: 'general',
      },
      career_money: {
        label: '차트에서 일과 돈 흐름은 어떤 편인가요?',
        prompt: '출생차트 기준으로 직업, 일하는 방식, 돈과 관련된 흐름을 쉽게 풀어줘.',
        type: 'advice',
      },
      growth: {
        label: '차트 기준으로 더 잘 풀리려면?',
        prompt: '출생차트 기준으로 내가 더 잘 풀리기 위해 어떤 방식으로 움직이면 좋은지 알려줘.',
        type: 'general',
      },
    },
  },
  en: {
    saju: {
      strength: {
        label: 'Where do my strengths show up in Saju?',
        prompt: 'Using Saju, explain my natural strengths and the traits I should lean into.',
        type: 'personality',
      },
      timing: {
        label: 'What matters most in my current Saju timing?',
        prompt: 'Using Saju, tell me what matters most in this current period in a practical way.',
        type: 'advice',
      },
      relationship: {
        label: 'What relationship pattern appears in my Saju?',
        prompt: 'Using Saju, explain the pattern I tend to repeat in love and relationships.',
        type: 'general',
      },
      career_money: {
        label: 'How do work and money look in my Saju?',
        prompt: 'Using Saju, explain my work and money flow with strengths, risks, and advice.',
        type: 'advice',
      },
      growth: {
        label: 'How should I move to flow better in Saju?',
        prompt: 'Using Saju, tell me what attitude and actions fit me best if I want to move more smoothly.',
        type: 'general',
      },
    },
    ziwei: {
      strength: {
        label: 'What are my natural strengths in Zi Wei?',
        prompt: 'Using Zi Wei Dou Shu, explain my natural strengths and standout traits clearly.',
        type: 'personality',
      },
      timing: {
        label: 'Read my current Zi Wei timing',
        prompt: 'Using Zi Wei Dou Shu, explain the most important timing and flow in my current period.',
        type: 'advice',
      },
      relationship: {
        label: 'What relationship pattern appears in my chart?',
        prompt: 'Using Zi Wei Dou Shu, explain my relationship and social pattern in simple language.',
        type: 'general',
      },
      career_money: {
        label: 'Explain career and money from my palaces',
        prompt: 'Using Zi Wei Dou Shu, summarize the most important career and money signals in a practical way.',
        type: 'advice',
      },
      growth: {
        label: 'What direction helps me flow better?',
        prompt: 'Using Zi Wei Dou Shu, tell me what direction or style helps me move more smoothly.',
        type: 'general',
      },
    },
    natal: {
      strength: {
        label: 'Where are my strengths in the birth chart?',
        prompt: 'Using my natal chart, explain my strongest traits and natural charm clearly.',
        type: 'personality',
      },
      timing: {
        label: 'What should I focus on right now in my chart?',
        prompt: 'Using my natal chart, tell me what I should focus on most in this period.',
        type: 'advice',
      },
      relationship: {
        label: 'Read my emotional and relationship pattern',
        prompt: 'Using my natal chart, explain my emotional style and relationship pattern in simple language.',
        type: 'general',
      },
      career_money: {
        label: 'How do work and money look in my chart?',
        prompt: 'Using my natal chart, explain my work style, career pattern, and money flow clearly.',
        type: 'advice',
      },
      growth: {
        label: 'How should I move to feel more aligned?',
        prompt: 'Using my natal chart, tell me how I should move if I want to feel more aligned and effective.',
        type: 'general',
      },
    },
  },
  ja: {
    saju: {
      strength: {
        label: '四柱推命で私の強みはどこに出ますか？',
        prompt: '四柱推命をもとに、私の生まれ持った強みと活かしやすい気質をやさしく説明してください。',
        type: 'personality',
      },
      timing: {
        label: '今の時期に大事なポイントは？',
        prompt: '四柱推命をもとに、今の時期で最も意識すべきポイントを実用的に教えてください。',
        type: 'advice',
      },
      relationship: {
        label: '人間関係の傾向を四柱推命で知りたい',
        prompt: '四柱推命をもとに、恋愛と人間関係で繰り返しやすい傾向を説明してください。',
        type: 'general',
      },
      career_money: {
        label: '仕事とお金の流れはどんなタイプ？',
        prompt: '四柱推命をもとに、仕事とお金の流れを強み・注意点つきでわかりやすく教えてください。',
        type: 'advice',
      },
      growth: {
        label: 'もっと良く流れるにはどう動けばいい？',
        prompt: '四柱推命をもとに、私がもっと良く流れるための考え方と動き方を教えてください。',
        type: 'general',
      },
    },
    ziwei: {
      strength: {
        label: '命盤で私の強みはどこにありますか？',
        prompt: '紫微斗数の命盤をもとに、私の強みと目立つ資質をやさしく説明してください。',
        type: 'personality',
      },
      timing: {
        label: '今の運気の流れを命盤で見たい',
        prompt: '紫微斗数をもとに、今の時期で大切な流れとポイントを教えてください。',
        type: 'advice',
      },
      relationship: {
        label: '恋愛と人間関係の傾向を知りたい',
        prompt: '紫微斗数の命盤をもとに、恋愛と人間関係の傾向をわかりやすく説明してください。',
        type: 'general',
      },
      career_money: {
        label: '仕事と財運の流れをやさしく教えて',
        prompt: '紫微斗数をもとに、仕事と財運の重要なポイントを実用的にまとめてください。',
        type: 'advice',
      },
      growth: {
        label: 'もっと良く進む方向はどちら？',
        prompt: '紫微斗数の命盤をもとに、私がより良く進むための方向性を教えてください。',
        type: 'general',
      },
    },
    natal: {
      strength: {
        label: '出生図で私の強みはどこにありますか？',
        prompt: '出生図をもとに、私の強みと自然ににじむ魅力をわかりやすく説明してください。',
        type: 'personality',
      },
      timing: {
        label: '今の時期に大事な流れは？',
        prompt: '出生図をもとに、今の時期で特に意識すべきポイントを教えてください。',
        type: 'advice',
      },
      relationship: {
        label: '感情と恋愛のパターンを読みたい',
        prompt: '出生図をもとに、感情表現と恋愛・人間関係のパターンをやさしく説明してください。',
        type: 'general',
      },
      career_money: {
        label: '仕事とお金の流れはどう見えますか？',
        prompt: '出生図をもとに、仕事のスタイル、キャリア傾向、お金の流れをやさしく教えてください。',
        type: 'advice',
      },
      growth: {
        label: 'もっと自分らしく進むには？',
        prompt: '出生図をもとに、私がもっと自分らしくうまく進むための動き方を教えてください。',
        type: 'general',
      },
    },
  },
  zh: {
    saju: {
      strength: {
        label: '四柱里我的优势最容易体现在哪里？',
        prompt: '请根据四柱八字，简单说明我天生的优势和最适合发挥的气质。',
        type: 'personality',
      },
      timing: {
        label: '现在这个阶段最重要的重点是什么？',
        prompt: '请根据四柱八字，用实用的方式告诉我现在这个阶段最该注意什么。',
        type: 'advice',
      },
      relationship: {
        label: '我在感情关系里有什么模式？',
        prompt: '请根据四柱八字，说明我在恋爱和人际关系里容易重复的模式。',
        type: 'general',
      },
      career_money: {
        label: '事业和财运的走向怎么样？',
        prompt: '请根据四柱八字，通俗说明我的事业与财运，包括优势、风险和建议。',
        type: 'advice',
      },
      growth: {
        label: '如果想更顺一点，我该怎么行动？',
        prompt: '请根据四柱八字，告诉我如果想更顺一些，适合采取什么样的态度和行动。',
        type: 'general',
      },
    },
    ziwei: {
      strength: {
        label: '命盘里我的天生优势是什么？',
        prompt: '请根据紫微斗数命盘，简单说明我最突出的优势和气质。',
        type: 'personality',
      },
      timing: {
        label: '请帮我看现在的整体走势',
        prompt: '请根据紫微斗数，说明我现在这个阶段最重要的走势和重点。',
        type: 'advice',
      },
      relationship: {
        label: '命盘里的人际和感情模式如何？',
        prompt: '请根据紫微斗数命盘，简单解释我在感情和人际关系里的模式。',
        type: 'general',
      },
      career_money: {
        label: '事业和财运宫位怎么看？',
        prompt: '请根据紫微斗数，用实用的方式整理事业和财运的重要重点。',
        type: 'advice',
      },
      growth: {
        label: '什么方向更能让我走顺？',
        prompt: '请根据紫微斗数命盘，告诉我怎样的方向和行动更容易让我走顺。',
        type: 'general',
      },
    },
    natal: {
      strength: {
        label: '出生图里我的优势在哪里？',
        prompt: '请根据出生图，简单说明我的主要优势和自然散发的魅力。',
        type: 'personality',
      },
      timing: {
        label: '我现在最该关注什么？',
        prompt: '请根据出生图，告诉我现在这个阶段最该注意的重点是什么。',
        type: 'advice',
      },
      relationship: {
        label: '请读一读我的感情和关系模式',
        prompt: '请根据出生图，简单解释我的情绪表达与感情、人际关系模式。',
        type: 'general',
      },
      career_money: {
        label: '事业和财运在盘里怎么体现？',
        prompt: '请根据出生图，清楚说明我的工作方式、事业倾向和财务流向。',
        type: 'advice',
      },
      growth: {
        label: '怎样行动会更顺、更合拍？',
        prompt: '请根据出生图，告诉我如果想更顺、更合拍，适合怎样行动。',
        type: 'general',
      },
    },
  },
}

export function getFollowupPrompt(language: LanguageKey, tab: TabKey, questionId: FollowupQuestionId) {
  return FOLLOWUP_PROMPTS[language][tab][questionId]
}
