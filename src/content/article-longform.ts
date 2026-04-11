import type { ArticleCluster } from './article-catalog'

export type ArticleLanguage = 'ko' | 'en' | 'ja' | 'zh'

export interface ArticleContentShape {
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

type BlockKey = 'intro' | 'section1' | 'section2' | 'section3' | 'section4'

const ARTICLE_EXPANSION_TEMPLATES: Record<
  ArticleLanguage,
  Record<ArticleCluster, Record<BlockKey, string>>
> = {
  ko: {
    starter: {
      intro: '입문 글의 목표는 용어를 한 번 훑는 데 있지 않습니다. 독자가 계산 화면에서 무엇을 먼저 보고, 어떤 순서로 의미를 읽어야 하는지를 함께 안내해야 실제로 도움이 되는 콘텐츠가 됩니다.',
      section1: '이 단계에서는 정의를 외우는 것보다 구조를 잡는 일이 중요합니다. 큰 골격을 먼저 이해하면 뒤에서 나오는 세부 개념들이 서로 어떻게 연결되는지 훨씬 쉽게 따라갈 수 있습니다.',
      section2: '기초 개념은 언제나 짝을 지어 읽는 편이 좋습니다. 한 요소만 떼어 보면 단순 설명처럼 느껴지지만, 반대되거나 보완하는 요소와 함께 보면 해석의 기준이 또렷해집니다.',
      section3: '초보자가 가장 자주 놓치는 부분은 개념을 실제 읽기 순서와 연결하지 않는 점입니다. 계산 결과에서 어떤 표시를 우선 보고, 어떤 항목은 뒤로 미뤄야 하는지 구분하면 체감 난이도가 크게 내려갑니다.',
      section4: '입문 지식은 실전에 바로 쓰일 때 오래 남습니다. 글을 읽은 뒤 계산기에서 자신의 결과를 확인하고, 같은 개념이 어디에 반복되는지 찾아보면 암기보다 빠르게 감을 잡을 수 있습니다.',
    },
    relationship: {
      intro: '관계 해석은 상대를 좋다 나쁘다로 분류하는 작업이 아닙니다. 내가 어떤 방식으로 기대하고 반응하는지, 그리고 현재 시기가 그 반응을 어떻게 증폭시키는지를 함께 읽어야 현실적인 조언이 나옵니다.',
      section1: '관계 관련 해석은 감정과 역할을 동시에 다룹니다. 애정, 책임, 거리감, 표현 방식이 서로 다른 층위에서 작동하기 때문에 한 신호만 보고 결론을 내리면 실제 관계와 어긋나기 쉽습니다.',
      section2: '관계는 늘 상대 비교만으로 설명되지 않습니다. 시기와 환경이 달라지면 같은 사람과의 조합도 전혀 다르게 체감되므로, 패턴과 타이밍을 함께 읽는 습관이 중요합니다.',
      section3: '이 구간에서는 내 경험과 연결되는 질문을 만들어보는 것이 좋습니다. 반복되는 갈등, 말이 막히는 순간, 감정이 흔들리는 타이밍을 떠올리면 AI 후속 질문도 훨씬 정확해집니다.',
      section4: '좋은 관계 해석은 행동 지침으로 이어져야 합니다. 언제 대화를 미루는 것이 나은지, 무엇을 먼저 설명해야 하는지, 지금은 확장보다 정리가 필요한지처럼 구체적 기준으로 바꿔 읽어보세요.',
    },
    career: {
      intro: '직업과 돈의 흐름은 단순히 성공 여부로만 읽으면 실수가 많습니다. 어떤 역할에서 성과가 나는지, 지금 시기가 확장에 유리한지 안정화에 유리한지, 그리고 그 선택을 감당할 구조가 있는지를 함께 봐야 합니다.',
      section1: '커리어 해석의 출발점은 나의 기본 업무 방식입니다. 추진, 정리, 분석, 조율 중 어떤 방식이 익숙한지 먼저 알아야 이후의 시기 해석도 실제 선택으로 연결됩니다.',
      section2: '돈과 일의 운은 기회가 생기는 구조와 그것을 받아낼 체력을 같이 봐야 합니다. 수입 신호가 강하더라도 관리와 책임이 따라오지 않으면 좋은 흐름을 오래 유지하기 어렵습니다.',
      section3: '여기서는 현실 질문을 던질수록 해석이 선명해집니다. 이직 준비, 역할 확장, 투자, 부업처럼 선택지가 구체적일수록 AI도 시기와 리스크를 함께 정리해줄 수 있습니다.',
      section4: '좋은 커리어 해석은 막연한 희망보다 실행 순서를 줍니다. 지금은 움직일 때인지, 자료를 모을 때인지, 기존 기반을 정리할 때인지까지 나눠 보면 운의 흐름이 훨씬 실용적으로 읽힙니다.',
    },
    unknown_time: {
      intro: '출생 시간이 없으면 정보가 줄어드는 것은 맞지만, 해석이 무의미해지는 것은 아닙니다. 중요한 것은 가능한 영역과 보수적으로 봐야 하는 영역을 분리해서 읽는 태도이며, 그래야 남은 정보의 신뢰도를 제대로 활용할 수 있습니다.',
      section1: '시간이 빠지면 세부 묘사는 줄어들지만, 기본 성향과 큰 방향은 여전히 남습니다. 어떤 정보가 안정적으로 유지되는지 먼저 확인하면 불안감보다 활용 포인트가 먼저 보입니다.',
      section2: '이 구간의 핵심은 보강 가능한 단서를 찾아 연결하는 것입니다. 월지, 대운, 반복되는 오행 패턴처럼 시간 없이도 상대적으로 안정적인 정보가 해석의 중심축이 됩니다.',
      section3: '모호한 상태일수록 질문을 넓게 잡는 편이 좋습니다. 세부 사건 예측보다 성향, 큰 흐름, 주의할 범위를 묻는 방식이 실제로 더 정확하고 도움이 되는 답을 만듭니다.',
      section4: '시간을 모르는 해석은 임시 결론이 아니라 업데이트 가능한 가설로 보는 것이 좋습니다. 나중에 시간이 확인되면 무엇이 유지되고 무엇이 바뀌는지 비교하면서 시주가 담당하는 영역을 더 선명하게 이해할 수 있습니다.',
    },
    deep_dive: {
      intro: '심화 글은 용어를 더 어렵게 만드는 것이 목적이 아닙니다. 초보 단계에서 놓쳤던 기준을 정리하고, 실제 명식에서 해석의 우선순위를 세울 수 있도록 시야를 넓혀주는 데 의미가 있습니다.',
      section1: '심화 주제는 정의만 읽으면 추상적으로 느껴지기 쉽습니다. 그래서 개념의 원리, 적용 순서, 자주 헷갈리는 반례를 함께 보는 방식이 훨씬 실용적입니다.',
      section2: '한 개념이 다른 개념과 만났을 때 의미가 어떻게 달라지는지 보는 것이 심화 해석의 핵심입니다. 강약, 계절성, 주변 구조를 같이 읽어야 같은 단어도 살아 있는 의미가 됩니다.',
      section3: '이쯤에서는 내 명식에서 실제로 무엇이 반복되는지 확인해보면 좋습니다. AI에게 현재 역할, 압박, 표현 방식 같은 질문을 던지면 배운 개념이 즉시 자기 언어로 바뀝니다.',
      section4: '심화 해석은 단정이 아니라 정밀화입니다. 빠른 결론보다 조건을 나누어 읽는 태도가 중요하며, 그래야 실제 상담이나 자기 해석에서 과잉 일반화를 피할 수 있습니다.',
    },
    astrology: {
      intro: '서양 점성술 콘텐츠는 별자리 한두 개로 사람을 규정하는 데 머물면 금방 얕아집니다. 행성, 하우스, 상호 각도, 그리고 실제 삶의 경험이 어떻게 교차하는지 설명할 때 비로소 읽을 가치가 생깁니다.',
      section1: '점성술의 개념은 상징어처럼 보이지만, 실제로는 역할 분담이 분명합니다. 무엇이 기능을 말하고, 무엇이 배경을 말하고, 무엇이 사건의 무대를 말하는지 구분하면 차트가 한꺼번에 정리됩니다.',
      section2: '중간 단계에서는 요소를 분리해서 읽는 대신 조합해서 읽는 연습이 필요합니다. 같은 행성이라도 사인과 하우스, 그리고 다른 행성과의 관계에 따라 체감이 크게 달라집니다.',
      section3: '여기서는 자신의 차트에 적용해보는 것이 가장 빠른 학습법입니다. AI에게 성격, 관계, 일과 돈 흐름을 묻더라도 어떤 행성과 하우스를 중심으로 읽는지 함께 확인해보면 이해가 깊어집니다.',
      section4: '점성술 해석은 운명을 단정하기보다 패턴을 읽는 데 강합니다. 반복되는 감정 반응, 대인관계의 습관, 사회적 역할의 방향을 정리하는 도구로 쓰면 훨씬 건강하고 유용합니다.',
    },
    dream: {
      intro: '꿈 해석은 하나의 상징을 길몽·흉몽으로 단정하는 데서 끝나면 금방 공허해집니다. 꿈을 꾼 당시의 감정, 반복되는 이미지, 현재 삶의 고민과 연결해 읽어야 실제 자기 이해로 이어집니다.',
      section1: '상징은 언제나 맥락과 함께 읽어야 합니다. 같은 동물, 같은 장소, 같은 색이라도 꿈속에서 느낀 감정과 직전의 생활 맥락에 따라 전혀 다른 의미를 가질 수 있습니다.',
      section2: '해석의 폭을 넓히려면 전통적 상징 읽기와 심리적 읽기를 함께 가져가는 편이 좋습니다. 한쪽만 보면 너무 미신적으로 흐르거나, 반대로 상징의 결을 지나치게 평면화할 수 있습니다.',
      section3: '꿈은 질문을 잘 만들수록 해석이 좋아집니다. 무엇이 반복되는지, 어떤 장면에서 마음이 크게 움직였는지, 현실의 어떤 고민과 닿아 있는지를 AI에게 구체적으로 알려주세요.',
      section4: '좋은 꿈 해석은 예언보다 정리에 가깝습니다. 꿈을 통해 현재의 욕구와 불안, 방향 전환의 신호를 읽고 일상 선택에 가볍게 반영하는 태도가 가장 건강합니다.',
    },
    ziwei: {
      intro: '자미두수 콘텐츠는 별 이름을 많이 아는 것보다 궁과 별의 관계를 어떻게 읽는지가 더 중요합니다. 어떤 궁이 삶의 어떤 장면을 말하는지, 그리고 별이 그 장면의 분위기를 어떻게 바꾸는지 이해해야 실제 명반이 살아납니다.',
      section1: '자미두수 해석은 궁의 주제를 명확히 잡는 데서 출발합니다. 같은 별이라도 어느 궁에 들어가느냐에 따라 사람, 돈, 일, 이동, 관계의 해석 방향이 달라집니다.',
      section2: '중간 단계에서는 주성과 보조 신호를 함께 읽어야 합니다. 주성만 보면 큰 성격은 잡히지만, 실제 체감되는 차이는 부성·사화·궁 간 연결에서 더 자주 드러납니다.',
      section3: '명반을 공부할수록 "그래서 내 삶에서는 어디서 나타나나"가 중요해집니다. AI에게 명궁, 관록궁, 재백궁처럼 특정 궁을 지정해 질문하면 추상적 정보가 실제 사례와 연결됩니다.',
      section4: '자미두수는 해석 범위를 잘 나눌수록 강해집니다. 모든 것을 한 번에 확정하기보다 궁별로 초점을 나누고, 현재 시기와 겹쳐 읽는 습관을 들이면 훨씬 설득력 있는 판단이 가능합니다.',
    },
    comparison: {
      intro: '비교형 글의 핵심은 우열을 가르는 데 있지 않습니다. 서로 다른 체계가 어떤 질문에 강하고 약한지, 그리고 독자가 자신의 목적에 따라 어떤 도구를 먼저 써야 하는지를 분명히 보여주는 것이 더 중요합니다.',
      section1: '비교를 제대로 하려면 각 체계가 무엇을 전제로 삼는지부터 확인해야 합니다. 입력값, 해석 단위, 시간에 대한 관점이 다르면 같은 사람을 읽어도 전혀 다른 답이 나오는 것이 자연스럽습니다.',
      section2: '중간 비교 단계에서는 복잡도보다 용도를 보는 편이 유익합니다. 어떤 체계는 구조와 반복 패턴에 강하고, 어떤 체계는 심리와 현재 질문에 강하다는 식으로 기능을 나눠 읽어보세요.',
      section3: '여기서는 실제 질문을 예로 들면 도움이 큽니다. 성격 분석, 이직 타이밍, 관계 갈등, 자기 이해처럼 같은 고민이라도 어떤 도구가 더 적합한지 AI와 함께 비교하면 훨씬 구체적입니다.',
      section4: '비교 글의 결론은 하나를 버리고 하나를 택하라는 말이 아닙니다. 서로의 강점을 알고 조합하면 해석의 깊이와 실용성이 함께 커질 수 있다는 점이 가장 중요한 메시지입니다.',
    },
  },
  en: {
    starter: {
      intro: 'A useful beginner article does more than define vocabulary. It helps readers understand what to look at first, what can wait, and how the pieces fit together once an actual chart is on the screen.',
      section1: 'At this stage, structure matters more than memorization. When readers understand the larger frame first, the technical terms that follow stop feeling like isolated facts and start working like a system.',
      section2: 'Foundational ideas are easiest to understand in pairs. A concept becomes much more practical when it is read alongside what supports it, balances it, or changes its meaning in application.',
      section3: 'Most beginners struggle not because the topic is impossible, but because they do not yet know the reading order. Knowing which signal to prioritize turns abstract theory into a usable method.',
      section4: 'Introductory knowledge becomes memorable when it is tested immediately. Looking for the same concept inside your own chart is often faster and more effective than trying to memorize definitions in isolation.',
    },
    relationship: {
      intro: 'Relationship interpretation is not about labeling a bond as good or bad. It is about reading patterns of expectation, reaction, timing, and emotional pacing so the chart becomes useful in real life rather than merely dramatic.',
      section1: 'Relationship readings work best when emotion and role are read together. Care, responsibility, distance, and expression do not always move in the same direction, so one signal alone rarely tells the whole story.',
      section2: 'Human connection cannot be explained by partner comparison alone. Timing and context matter, because the same pairing can feel supportive in one season and exhausting in another.',
      section3: 'This is where concrete questions help the most. Repeated conflicts, awkward silence, emotional swings, and unresolved tension all become easier to interpret when they are phrased as specific follow-up prompts.',
      section4: 'A strong relationship reading should lead to action. It becomes far more useful when it helps you decide whether to speak now, wait, soften a pattern, or step back before pushing harder.',
    },
    career: {
      intro: 'Career and money readings become shallow when they are reduced to success versus failure. The more useful question is what kind of role produces results for you, and whether the current cycle favors expansion, protection, or repositioning.',
      section1: 'Career interpretation begins with work style. Before timing matters, it helps to know whether your chart prefers initiating, organizing, analyzing, managing, or translating complexity for others.',
      section2: 'Wealth signals are meaningful only when they are paired with structure. Opportunity without management can create noise, while a smaller opening supported by discipline can become much more sustainable.',
      section3: 'Practical questions make this material sharper. Job changes, side projects, savings, negotiation, leadership, and workload are all easier to interpret when the reading is tied to a real decision point.',
      section4: 'The best career reading gives sequence, not fantasy. It helps you tell whether the right move is to act now, prepare quietly, gather evidence, or strengthen the system you already have.',
    },
    unknown_time: {
      intro: 'Not having a birth time reduces precision, but it does not erase meaning. The key is to separate what remains stable from what becomes conditional, so the reading stays useful without pretending to know more than it can.',
      section1: 'Without the hour pillar, some detail disappears, but the broader frame remains. Stable elements such as the Day Master, month energy, and repeating structural patterns still carry significant interpretive value.',
      section2: 'The goal here is to reinforce the reading with stronger clues. Major cycles, hidden stems, recurring elemental pressure, and broad chart balance often remain informative even when the time is missing.',
      section3: 'When uncertainty is higher, broader questions usually produce better answers. Asking about overall direction, recurring themes, or current pressure is more reliable than demanding event-level prediction.',
      section4: 'A time-unknown reading is best treated as a working model, not a final verdict. If a birth time appears later, comparing what changed and what stayed the same often becomes a powerful learning exercise in itself.',
    },
    deep_dive: {
      intro: 'Advanced articles should not merely sound more technical. Their job is to clarify interpretation priorities, show where beginners usually overgeneralize, and help readers connect theory to an actual chart with more accuracy.',
      section1: 'Deeper topics feel abstract when they are taught as labels only. They become useful when principle, application, and common misreadings are discussed together rather than separately.',
      section2: 'Advanced interpretation depends on combination, not isolation. The same symbol means something different when strength, season, context, and neighboring structures are taken seriously.',
      section3: 'This is the point where readers should start testing patterns against their own chart. AI follow-up works best here when the question is about role, pressure, output, or repeated life themes rather than generic personality praise.',
      section4: 'A strong deep-dive does not force certainty. It refines the lens, separates conditions, and keeps the reader from mistaking a useful tendency for a universal rule.',
    },
    astrology: {
      intro: 'Astrology becomes thin when it stops at sign stereotypes. Its value comes from showing how planets, houses, aspects, and lived experience combine into a more layered picture of personality and timing.',
      section1: 'Astrological language works best when each symbol is assigned a job. One part describes function, another describes style, another describes life area, and that separation makes the chart easier to read.',
      section2: 'The middle layer of astrology is about combination. A planet cannot be read well without its sign, house, and relationships to other planets, because meaning changes through pattern rather than through keywords alone.',
      section3: 'This is where personal application accelerates learning. If readers test the concept against their own chart and then ask AI how specific placements interact, the symbolism stops feeling abstract very quickly.',
      section4: 'Astrology is strongest as a pattern language, not a prison. It helps readers understand recurring emotional dynamics, relationship habits, and public roles without pretending that one placement erases choice or growth.',
    },
    dream: {
      intro: 'Dream interpretation becomes empty when symbols are treated like automatic fortune codes. It becomes useful when emotional tone, repetition, context, and waking-life tension are read together as part of the same story.',
      section1: 'A symbol always needs context. The same animal, place, or action can feel protective in one dream and threatening in another, depending on what the dreamer felt and what was happening in life around that moment.',
      section2: 'The richest interpretations often combine symbolic tradition with psychological reading. Using only one lens can flatten the dream into either superstition or pure abstraction.',
      section3: 'Dream work improves when the question becomes more precise. Repeated images, unfinished scenes, body sensations, and the strongest emotional turn inside the dream are all helpful details to surface with AI.',
      section4: 'Good dream interpretation is usually less about prediction than integration. It gives the dreamer language for anxiety, desire, transition, and memory in a way that supports real reflection afterward.',
    },
    ziwei: {
      intro: 'Zi Wei Dou Shu becomes much clearer when readers stop treating stars as isolated labels. The practical reading begins when a palace is understood as the topic, and the stars are read as the style and pressure inside that topic.',
      section1: 'Zi Wei interpretation starts with the palace frame. The same star does not mean the same thing in the Life Palace, Career Palace, Wealth Palace, or Spouse Palace, because the life department has changed.',
      section2: 'The middle layer requires combination. Main stars give the broad tone, but assistant stars, transformations, and palace relationships often explain why a chart feels different in lived experience.',
      section3: 'At this point, it helps to ask chart-specific questions. Naming a palace or a star cluster when using AI makes the answer far more concrete than asking for a vague total reading.',
      section4: 'The strength of Zi Wei lies in layered focus. When readers separate topics palace by palace and then compare them with timing, the chart becomes less mystical and much more useful.',
    },
    comparison: {
      intro: 'A strong comparison article does not try to crown a winner. Its real job is to explain what each system assumes, what each system measures well, and which questions a reader should bring to each one.',
      section1: 'Comparisons become meaningful when the underlying logic is made explicit. Different inputs, different symbols, and different views of time naturally produce different answers even when the subject is the same person.',
      section2: 'It is often more useful to compare functions than complexity. One system may excel at structural timing, while another may be better at psychological nuance or present-moment guidance.',
      section3: 'Concrete examples improve the contrast. Questions about personality, relationship conflict, career timing, and self-understanding reveal quickly why certain tools feel more natural for certain problems.',
      section4: 'The most practical conclusion is usually combinational rather than competitive. Readers gain the most when they understand how two systems can sharpen each other instead of forcing a false either-or choice.',
    },
  },
  ja: {
    starter: {
      intro: '入門記事の役割は、用語を一度並べることではありません。実際の命式やチャートを前にしたとき、何を先に見て、何を後から読むべきかを示してこそ、初心者にとって価値のある内容になります。',
      section1: 'この段階では暗記より構造理解が大切です。大きな骨組みが見えてくると、その後に出てくる専門用語も孤立した知識ではなく、一つの体系として読めるようになります。',
      section2: '基礎概念は単独よりも組み合わせで読むほうが理解しやすくなります。支える要素、対立する要素、意味を変える条件を並べると、用語が現実の読み方に近づきます。',
      section3: '初心者がつまずきやすいのは、難しいからではなく読む順番が見えていないからです。どのサインを優先し、どの情報を後回しにするかが分かるだけで負担はかなり軽くなります。',
      section4: '入門知識は自分の命式に当てた瞬間に定着しやすくなります。読んだ直後に計算結果を見て、同じ概念がどこに現れるかを探す習慣が理解を深めます。',
    },
    relationship: {
      intro: '関係解釈は、相手を良い・悪いで判定する作業ではありません。自分が何を期待し、どう反応し、どの時期にその反応が強まりやすいかを読むことで、初めて現実に役立つ読みになります。',
      section1: '関係の読みでは感情と役割を同時に見る必要があります。愛情、責任、距離感、表現の仕方は同じ方向に動くとは限らないため、一つの指標だけで結論を出すと実生活とずれやすくなります。',
      section2: '人間関係は相手との相性比較だけでは説明しきれません。時期と環境が変われば、同じ組み合わせでも支え合いに見える時期と消耗しやすい時期が生まれます。',
      section3: 'ここでは具体的な問いを作ることが重要です。繰り返す衝突、会話が止まる瞬間、感情の揺れなどを言葉にすると、AIの補助も一気に精度が上がります。',
      section4: '良い関係解釈は、行動のヒントに変わってこそ意味があります。今は話すべきか、待つべきか、距離を置くべきかを判断する基準として読み直してみてください。',
    },
    career: {
      intro: '仕事とお金の流れを成功・失敗だけで読むと、実際の判断に結びつきません。どんな役割で成果が出やすいのか、今の時期は拡張向きか整備向きかを一緒に見る必要があります。',
      section1: 'キャリア解釈の出発点は仕事の進め方です。推進するのが得意なのか、整理するのが得意なのか、分析や調整に向くのかを先に知ると、その後の時期読みも現実的になります。',
      section2: '財のサインは構造とセットで読む必要があります。チャンスだけが見えても、管理と継続の器が伴わなければ流れは長続きしません。',
      section3: '具体的な質問ほど解釈は鮮明になります。転職、副業、貯蓄、投資、役割拡張のような現実の分岐点に落として聞くと、AIの答えも実務的になります。',
      section4: '良いキャリア解釈は夢を膨らませるだけでなく、順番を与えます。今は動く時期か、準備する時期か、既存の土台を固める時期かまで整理してこそ役に立ちます。',
    },
    unknown_time: {
      intro: '出生時間がないと精度は下がりますが、意味が失われるわけではありません。大切なのは、安定して読める情報と慎重に扱うべき情報を分けて読むことです。',
      section1: '時柱がないと細部は減りますが、全体の輪郭は残ります。日干、月支、反復する五行パターンなど、比較的安定した情報だけでも十分に使える読みが可能です。',
      section2: 'この段階では強い手がかりをつなぐことが重要です。大運、蔵干、繰り返し現れる偏りなどは、時間がない場合でも解釈の軸として機能しやすい部分です。',
      section3: '不確実性が高いときは、問いも広く取るほうが向いています。出来事の断定より、全体傾向、強み、注意点のような質問のほうが信頼できる答えにつながります。',
      section4: '時刻不明の読みは仮説として扱う姿勢が健全です。あとで時刻が分かったら、何が変わり、何が変わらなかったかを比較することで、時柱の役割そのものがよく見えてきます。',
    },
    deep_dive: {
      intro: '深掘り記事の目的は、単に難しい言葉を増やすことではありません。初学者が見落としやすい条件や優先順位を整理し、命式の解像度を上げることにあります。',
      section1: '深いテーマほど、定義だけでは抽象的になりがちです。原理、適用順序、よくある誤読を並べてこそ、実際の読み方に使える知識になります。',
      section2: '高度な解釈では、概念を単独で見るより組み合わせで見ることが重要です。強弱、季節、周辺構造が加わることで、同じ用語でも意味は大きく変わります。',
      section3: 'このあたりからは、自分の命式で反復するテーマを確かめるのが有効です。AIにも役割、圧力、表現パターンのような具体的テーマで質問すると理解が深まります。',
      section4: '深掘り解釈は断定ではなく精密化です。早い結論より条件分けを優先することで、過度な一般化を避けた読みができるようになります。',
    },
    astrology: {
      intro: '西洋占星術の記事は、星座のイメージだけで終わるとすぐに薄くなります。惑星、ハウス、アスペクト、そして実際の人生経験がどう重なるかまで説明してこそ、読み物としての厚みが出ます。',
      section1: '占星術では、それぞれのシンボルに役割を与えると理解が進みます。何が機能を表し、何が背景を表し、何が人生の舞台を示すのかを分けて考えると整理しやすくなります。',
      section2: '中級以降は、要素を切り離して見るより組み合わせで見る練習が必要です。惑星はサイン、ハウス、他の惑星との関係によって意味が大きく変わります。',
      section3: 'この段階では自分の出生図に当てるのが最も早い学習法です。AIに質問するときも、どの惑星やハウスを中心に読むのかを意識すると答えが具体的になります。',
      section4: '占星術は運命を決めつけるためより、パターンを言語化するために強い道具です。感情の癖、人間関係の傾向、社会的役割の向き方を理解する補助線として使うと健全です。',
    },
    dream: {
      intro: '夢解釈は、一つの象徴を吉夢・凶夢で決めつけるだけでは浅くなります。夢の中での感情、繰り返し現れる場面、現実の悩みとどうつながるかまで読むと、初めて実感のある内容になります。',
      section1: '象徴は必ず文脈と一緒に読む必要があります。同じ動物や場所でも、夢の中で安心したのか怖かったのかによって意味は大きく変わります。',
      section2: '伝統的な象徴読みに心理的な読みを重ねると、解釈の厚みが増します。どちらか一方だけに寄りすぎると、夢の意味が極端に狭くなりやすいからです。',
      section3: '夢の解釈は問いの立て方で精度が上がります。繰り返し出るイメージ、感情が大きく動いた場面、身体感覚などをAIに伝えると、読みが一段具体化します。',
      section4: '良い夢解釈は予言より整理に近いものです。夢を通じて不安や願望、変化のサインを言語化し、日常に軽く持ち帰れる形にするのが理想的です。',
    },
    ziwei: {
      intro: '紫微斗数は、星の名前を覚えるより宮と星の関係をどう読むかが重要です。宮が人生のテーマを示し、星がそのテーマの調子や圧力を変えるという視点を持つと命盤が急に立体的になります。',
      section1: '紫微斗数はまず宮の主題を明確にするところから始まります。同じ星でも命宮、官禄宮、財帛宮、夫妻宮のどこにあるかで読みの方向が変わります。',
      section2: '中間段階では主星だけでなく補助信号も必要です。主星は大枠を示しますが、実際の体感差は副星や四化、宮同士の連動から出ることが少なくありません。',
      section3: 'このあたりからは、命盤の具体的な場所を指定して質問するのが有効です。AIにも宮や星のまとまりを名指しすると、総論よりはるかに実感のある解釈になります。',
      section4: '紫微斗数の強みは焦点を分けて読めることです。宮ごとにテーマを分け、さらに時期と重ねることで、神秘的な印象よりも実用的な判断材料として使いやすくなります。',
    },
    comparison: {
      intro: '比較記事の大切な役目は、優劣を決めることではありません。それぞれの体系がどんな前提を持ち、どんな問いに強いのかを整理し、読者が目的に合った道具を選べるようにすることです。',
      section1: '比較を meaningful にするには、まず前提の違いを明確にする必要があります。入力値、象徴体系、時間の扱い方が違えば、同じ人物に対して別の答えが出るのは自然なことです。',
      section2: '複雑さより用途で比べるほうが実用的です。ある体系は構造と時期に強く、別の体系は心理や今この瞬間の問いに強い、という見方のほうが読者に役立ちます。',
      section3: '具体例を入れると比較の意味がはっきりします。性格、相性、転職時期、自己理解など、同じ悩みを別の体系でどう扱うかをAIと一緒に確かめると理解が深まります。',
      section4: '結論は、どちらか一方を捨てることではなく、組み合わせで視野を広げることにあります。強みの違いを知るほど、読みの深さと実用性は両方伸びていきます。',
    },
  },
  zh: {
    starter: {
      intro: '好的入门文章不只是把术语排出来给人记住。真正有价值的是告诉读者在看到实际命盘时应该先看什么、后看什么，以及这些概念是怎样连成一套阅读顺序的。',
      section1: '在这个阶段，比起死记硬背，更重要的是先抓住结构。只要大框架清楚了，后面出现的术语就不再是零散知识，而会变成可以顺着走下去的系统。',
      section2: '基础概念最适合成组阅读。一个概念和它的补充条件、对立条件、修正条件放在一起时，读者才更容易理解它在真正解读里的作用。',
      section3: '很多初学者觉得难，不一定是因为内容太深，而是因为不知道阅读顺序。只要知道哪些信号要先看，哪些内容要暂时放后，理解负担就会明显下降。',
      section4: '入门知识在落到自己的命盘上时最容易记住。读完以后马上去看自己的结果，找一找这些概念出现在哪里，往往比单纯背定义更有效。',
    },
    relationship: {
      intro: '关系解读不是给一段关系贴上好或坏的标签。真正有用的阅读，是把期待、反应、时机和情绪节奏放在一起看，从而形成可以落地的判断。',
      section1: '关系类解读必须同时处理情绪和角色。关心、责任、距离、表达方式不一定朝同一个方向移动，所以只盯一个信号通常会让判断偏掉。',
      section2: '人际关系也不能只靠两个人之间的比较来说明。时机和环境一变，同样的组合也可能从互相支持变成彼此消耗。',
      section3: '在这里，越具体的问题越有帮助。重复的争执、说不出口的瞬间、情绪起伏的节点，只要被准确说出来，AI 的补充也会更有力度。',
      section4: '好的关系解读最终应该变成行动建议。比如现在该沟通、先停一下、调整边界，还是暂时拉开距离，这些才是实际最有价值的部分。',
    },
    career: {
      intro: '事业和财运如果只被理解为成不成功，就会变得很空。更实用的问题是：你在哪种角色里最容易出结果？现在的节奏更适合扩张、整顿，还是保守过渡？',
      section1: '职业解读首先要回到工作方式本身。你更擅长推进、整合、分析、协调还是守住结构，往往决定了后面所有时机判断能不能真正落地。',
      section2: '财富信号必须和结构一起看。机会出现并不自动等于结果变好，如果缺少管理、持续性和承压能力，再好的窗口也可能很快漏掉。',
      section3: '这里最适合问现实问题。换工作、副业、储蓄、投资、角色升级之类的具体分岔点，最能让 AI 给出真正有用的方向。',
      section4: '好的事业解读不只是鼓励，而是告诉你顺序。现在该行动、该准备、该观察，还是该先把原有结构稳住，这种层次感才最实用。',
    },
    unknown_time: {
      intro: '没有出生时间会降低精度，但并不代表解读失去意义。关键是把仍然稳定的信息和必须保守处理的信息分开，这样剩下的内容才真正可信。',
      section1: '少了时柱，细节会变少，但整体轮廓仍然存在。像日干、月支、重复出现的五行倾向，这些部分依旧可以提供稳定的阅读基础。',
      section2: '这一步的重点是找到更强的辅助线索。大运、藏干、反复出现的能量偏向，通常仍然可以在缺少时间时支撑主要解释。',
      section3: '不确定越高，问题就越适合放宽。比起追问具体事件，更适合先问整体倾向、长期主题、当前压力与注意点。',
      section4: '时间不详的解读最好被当作一个可更新的模型，而不是最终结论。以后如果补到了时间，再去比较哪些没变、哪些改变，会非常有价值。',
    },
    deep_dive: {
      intro: '进阶文章的目的不是让术语看起来更难，而是帮助读者把解释顺序、判断条件和常见误读整理清楚，让命盘阅读更精细。',
      section1: '越深入的主题，越不能只给定义。只有把原理、应用顺序和常见反例放在一起，内容才会从“知识点”变成真正可用的方法。',
      section2: '进阶解读重在组合，而不是孤立看词。强弱、季节、上下文和周边结构一加进来，同一个概念就会产生不同的实际含义。',
      section3: '走到这里，最适合把知识放回自己的命盘里验证。向 AI 询问角色、压力、表达方式或重复主题，比泛泛而谈的人格形容更有帮助。',
      section4: '进阶阅读不是为了更武断，而是为了更细。把条件拆开看、避免过度概括，才是这类文章真正要训练的能力。',
    },
    astrology: {
      intro: '西方占星如果只停留在星座印象，很快就会显得单薄。它真正的价值，在于说明行星、宫位、相位与真实生活经验是如何层层叠在一起的。',
      section1: '占星的语言在分工清楚时最好理解。什么在讲功能，什么在讲风格，什么在讲人生舞台，把这些分开以后，整张盘会清晰很多。',
      section2: '中层理解靠的是组合阅读。行星不能脱离星座、宫位和其他行星关系去看，因为含义不是靠单个关键词决定，而是靠结构共同生成。',
      section3: '这一部分最适合立刻放回自己的出生图里。和 AI 对话时，如果能指出你想看的行星或宫位，答案会比笼统问人格更具体。',
      section4: '占星最强的地方在于提供模式语言，而不是宣布命运定局。它很适合帮助读者整理情绪惯性、关系习惯和社会角色方向。',
    },
    dream: {
      intro: '解梦如果只是把一个象征直接判成吉或凶，很快就会失去深度。把梦里的情绪、重复出现的画面、现实处境一起看，才会形成真正有用的理解。',
      section1: '象征必须连同语境一起看。同样的动物、地点或行为，如果梦里的感受不同，现实里的压力不同，意义就可能完全相反。',
      section2: '最丰富的解读，通常会把传统象征读法和心理读法结合起来。只用其中一边，很容易把梦读得过于迷信，或者过于扁平。',
      section3: '梦的解读会随着提问方式而变好。把重复图像、情绪转折、身体感受和现实压力讲给 AI，答案就会更贴近个人经验。',
      section4: '好的解梦更像整理，而不是预言。它帮助你把焦虑、欲望、转换期的信号说清楚，然后带回现实生活做轻量判断。',
    },
    ziwei: {
      intro: '紫微斗数的关键不在于记住多少星名，而在于理解宫位和星曜是怎样组合出意义的。宫位给出人生主题，星曜决定那个主题里的气质与压力。',
      section1: '紫微斗数的阅读首先要把宫位主题抓牢。同一颗星落在命宫、官禄宫、财帛宫或夫妻宫时，解读方向都会发生明显变化。',
      section2: '中间层必须把主星和辅助信号一起看。主星给出大方向，但真正的体感差异，往往更多出现在副星、四化和宫位之间的联动里。',
      section3: '走到这里以后，最好开始提出命盘里的具体问题。向 AI 指定某个宫位或某组星曜，得到的回答通常会比总论式解读更贴身。',
      section4: '紫微斗数的强项在于可以把焦点拆开。按宫位分别阅读，再和时运叠合起来看，会让命盘从神秘感走向真正的实用性。',
    },
    comparison: {
      intro: '比较型文章最重要的不是分胜负，而是讲清楚不同体系各自建立在什么前提上、擅长回答什么问题，以及读者该在什么情境下使用哪一种工具。',
      section1: '想把比较写得有意义，先要说明底层逻辑的差异。输入方式、象征系统、时间观不同，同一个人被读出不同结论本来就是自然的。',
      section2: '与其比谁更复杂，不如比谁更适合某类问题。有的体系更强在结构与时机，有的体系更强在心理与当下选择，这样比较才更实用。',
      section3: '加入具体问题后，对比会马上变清楚。人格、关系冲突、事业时机、自我理解这些主题，最适合拿来和 AI 一起对照不同体系的用法。',
      section4: '真正有价值的结论，往往不是二选一，而是知道怎么组合使用。越清楚各自的边界和长处，就越能让阅读深度与实用性同时提高。',
    },
  },
}

function joinParagraphs(...parts: string[]) {
  return parts
    .map((part) => part.trim())
    .filter(Boolean)
    .join('\n\n')
}

function sanitizeInlineTitle(text: string) {
  return text.trim().replace(/[.!?]+$/, '')
}

function buildDynamicParagraph(
  language: ArticleLanguage,
  block: BlockKey,
  article: ArticleContentShape,
) {
  if (language === 'ko') {
    switch (block) {
      case 'intro':
        return `${article.title.replace(/\?$/, '')} 주제는 단순한 소개문으로 끝나지 않습니다. 부제 "${article.subtitle}"를 실제 계산 경험과 연결해서 읽으면, 이 글이 어떤 독자를 위해 어떤 질문에 답하려는지 더 선명하게 보입니다.`
      case 'section1':
        return `${article.section1Title} 단계에서는 정의를 외우기보다 판단 기준을 잡는 일이 중요합니다. 같은 개념도 명식 구조와 시기 흐름에 따라 체감이 달라지기 때문에, 첫 단락에서 중심축을 분명히 잡아두면 뒤의 내용이 훨씬 쉽게 이어집니다.`
      case 'section2':
        return `${article.section2Title} 항목은 실전 해석에서 자주 놓치는 연결 고리를 보완해줍니다. 앞 문단의 개념을 주변 요소와 함께 읽기 시작하면, 추상적인 설명이 실제 선택 기준으로 바뀌는 경험을 하게 됩니다.`
      case 'section3':
        return `${article.section3Title} 구간에서는 "이 내용을 내 사례에 어떻게 붙일까"를 생각해보면 좋습니다. 명운판 계산기와 AI 후속 질문을 함께 쓰면, 배운 개념이 지식이 아니라 현재 상황을 점검하는 도구로 바뀝니다.`
      case 'section4':
        return `${article.section4Title}의 핵심은 지나친 단정보다 적용 범위를 나누는 태도에 있습니다. 읽은 내용을 바로 실전에 옮기기 전에 내 명식, 현재 시기, 관련된 사람의 흐름을 같이 대조하면 훨씬 안정적인 해석이 가능합니다.`
    }
  }

  if (language === 'en') {
    switch (block) {
      case 'intro':
        return `This topic matters most when it moves beyond a quick definition. Framing "${sanitizeInlineTitle(article.title)}" through the promise in "${sanitizeInlineTitle(article.subtitle)}" helps the reader understand not only what the concept means, but why it matters in a real chart-reading workflow.`
      case 'section1':
        return `The first section is where the reader needs a stable frame. Instead of treating ${article.section1Title} as a label to memorize, it is more useful to treat it as the anchor that makes everything else in the article easier to interpret.`
      case 'section2':
        return `${article.section2Title} usually becomes clearer once it is read in relationship to the surrounding structure. That shift—from isolated definition to connected reading—is often what turns theory into something a reader can actually use.`
      case 'section3':
        return `This part is often where personal application begins. Once the reader starts asking how ${article.section3Title.toLowerCase()} shows up in an actual chart, AI follow-up and calculator output become much more practical.`
      case 'section4':
        return `The final step is not to overstate certainty, but to define scope. ${article.section4Title} becomes far more trustworthy when it is checked against the chart, the current cycle, and the broader question the reader is trying to answer.`
    }
  }

  if (language === 'ja') {
    switch (block) {
      case 'intro':
        return `${article.title.replace(/\?$/, '')}というテーマは、短い定義だけでは十分に伝わりません。『${article.subtitle}』という視点を実際の命式やチャートに結びつけて読むことで、この文章が何を助けようとしているのかがはっきりしてきます。`
      case 'section1':
        return `最初の段階では、${article.section1Title}を暗記項目として扱うより、読みの基準として捉えることが重要です。ここで軸が定まると、その後の説明も無理なくつながっていきます。`
      case 'section2':
        return `${article.section2Title}は、前の内容と周辺条件を結びつけることで一気に理解しやすくなります。単独の説明から、組み合わせの読みへ移るところが実践の分かれ目です。`
      case 'section3':
        return `この段階では、自分の事例にどう当てるかを考えると理解が深まります。命運盤の計算結果やAIへの追加質問と組み合わせると、${article.section3Title}がより具体的な言葉に変わります。`
      case 'section4':
        return `最後に大切なのは、断定よりも適用範囲を整理することです。${article.section4Title}を読むときも、自分の命式・今の時期・置かれた状況を重ねることで、より安定した解釈になります。`
    }
  }

  switch (block) {
    case 'intro':
      return `${article.title.replace(/\?$/, '')}这个主题，只有放回真实命盘里才会真正变得有用。顺着“${article.subtitle}”这条线索继续读，读者会更容易理解这篇文章想解决的不是术语本身，而是如何把术语拿来阅读自己。`
    case 'section1':
      return `第一部分最重要的是建立阅读基准，而不是背定义。把${article.section1Title}当成理解整篇文章的起点，后面的内容就会更容易连成一体。`
    case 'section2':
      return `${article.section2Title}往往要放进周边结构里才会清楚。真正的差别不在于词义本身，而在于它与其他信号组合以后，会把解读带向哪里。`
    case 'section3':
      return `这一段最适合开始联系自己的案例。把${article.section3Title}和命运盘里的计算结果、AI 追问一起使用，知识会从抽象说明变成更具体的判断工具。`
    case 'section4':
      return `最后一步不是把结论说得更绝对，而是把适用边界说清楚。读${article.section4Title}时，如果能同时对照自己的命盘、当前阶段和现实问题，解读会更稳。`
  }
}

function buildPracticalParagraph(
  language: ArticleLanguage,
  block: BlockKey,
  article: ArticleContentShape,
) {
  if (language === 'ko') {
    switch (block) {
      case 'intro':
        return `이 글을 읽을 때는 "좋은 설명인가"보다 "내 계산 결과에 바로 적용할 수 있는가"를 기준으로 보는 편이 좋습니다. 독자가 실제 명식이나 차트 화면을 곁에 두고 읽을 수 있도록 기준점과 예외 범위를 함께 제시해야, 정보가 길기만 한 글이 아니라 실제로 도움이 되는 편집 콘텐츠가 됩니다.`
      case 'section1':
        return `첫 번째 설명 구간에서는 해석의 중심축을 잃지 않는 것이 중요합니다. 여기서 정리한 기준은 뒤에 나오는 사례와 변형 읽기를 붙잡아 주는 역할을 하므로, 낱말 뜻을 넘어 "무엇을 먼저 확인해야 하는가"를 분명하게 기억해두면 이후 판단의 흔들림이 크게 줄어듭니다.`
      case 'section2':
        return `두 번째 구간에서는 개념을 주변 구조와 연결해서 읽는 훈련이 필요합니다. 독자가 이 단계에서 조건, 예외, 보조 신호를 함께 보기 시작하면 실제 상담형 질문이나 AI 후속 질문에서도 훨씬 구체적인 맥락을 붙일 수 있게 됩니다.`
      case 'section3':
        return `세 번째 구간은 응용력과 연결됩니다. 반복되는 생활 패턴, 관계의 긴장 지점, 일과 돈의 압박처럼 현실 질문을 대입해 보면, 같은 개념도 단순한 성향 설명이 아니라 현재 선택을 조정하는 판단 기준으로 바뀌는 경험을 하게 됩니다.`
      case 'section4':
        return `마지막 구간에서는 결론의 세기를 조절하는 태도가 중요합니다. 하나의 신호를 과장해 단정하기보다, 지금 시기와 명식 전체 구조 속에서 어디까지를 안정적으로 말할 수 있는지 구분해야 실제로 다시 찾아 읽을 만한 신뢰도 높은 콘텐츠가 됩니다.`
    }
  }

  if (language === 'en') {
    switch (block) {
      case 'intro':
        return `Readers usually get the most value from this topic when the article can be used beside a real chart rather than consumed as theory alone. That is why a useful explainer has to name both the core signal and the practical boundary of the idea, so the concept remains usable once the reader moves into calculation or AI follow-up.`
      case 'section1':
        return `The opening section should stabilize the reader's frame of reference. Once that frame is clear, later examples stop feeling like disconnected trivia and start working as variations on a consistent interpretive rule.`
      case 'section2':
        return `This middle section is where connected reading matters most. A concept becomes far more trustworthy once it is tested against surrounding structure, supporting signals, and the kinds of exceptions that appear in real charts.`
      case 'section3':
        return `By this point, the article should already be moving toward application. The reader benefits most when the explanation can be translated into concrete questions about patterns, timing, pressure, opportunity, or recurring emotional responses.`
      case 'section4':
        return `A strong closing section does not inflate certainty. Instead, it shows the reader how to define scope, compare context, and return to the chart with a more disciplined and credible reading process.`
    }
  }

  if (language === 'ja') {
    switch (block) {
      case 'intro':
        return `${article.title.replace(/\?$/, '')}というテーマは、理論だけで終わらず実際の命式やチャートと並べて使える形になってこそ価値が出ます。中心となる基準と、読みすぎを防ぐための条件分けを一緒に示すことで、長いだけではない実用的な解説になります。`
      case 'section1':
        return `最初の段階では、読みの軸を安定させることが何より大切です。ここで軸が決まると、その後の例や派生説明もばらばらの知識ではなく、同じ原理の応用として理解しやすくなります。`
      case 'section2':
        return `中盤では、概念を周辺構造と結びつけて読む姿勢が求められます。条件や例外、補助信号を意識し始めると、抽象的だった説明が実際の読みへと変わっていきます。`
      case 'section3':
        return `この段階では、現実のテーマへ置き換えることが理解を深めます。繰り返す人間関係の緊張、仕事上の負荷、意思決定の迷いなどに当てはめることで、学んだ概念が生きた判断材料になります。`
      case 'section4':
        return `最後は結論を強く言い切ることより、適用範囲を整えることが重要です。どこまでを安定して言えるのかを見極める姿勢が、読みの信頼性と再現性を高めます。`
    }
  }

  switch (block) {
    case 'intro':
      return `${article.title.replace(/\?$/, '')}这个主题，只有在能和真实命盘并排使用时才真正有价值。把核心信号和适用边界一起讲清楚，文章才不会只是“内容变长”，而会变成真正能帮助读者做判断的说明。`
    case 'section1':
      return `第一部分最重要的是把阅读基准站稳。只要基准明确，后面的例子和变化就不再像零散知识，而会变成同一条解释原则的不同展开。`
    case 'section2':
      return `中段内容的关键，在于把概念放回周边结构里一起看。条件、例外和辅助信号一旦进入视野，原本抽象的定义就会开始变成更可靠的读盘方法。`
    case 'section3':
      return `这一部分应该开始明显转向应用。把它放进关系压力、工作节奏、金钱选择或重复情绪反应里，读者会更容易感受到知识是怎样变成判断工具的。`
    case 'section4':
      return `最后一段最重要的不是把结论说得更绝对，而是把边界说清楚。知道哪些部分可以稳定成立，哪些部分还要结合时机和整体结构，才会形成更可信的阅读。`
  }
}

export function expandArticleContent(
  article: ArticleContentShape,
  cluster: ArticleCluster,
  language: ArticleLanguage,
) {
  const template = ARTICLE_EXPANSION_TEMPLATES[language][cluster]

  return {
    ...article,
    intro: joinParagraphs(
      article.intro,
      template.intro,
      buildDynamicParagraph(language, 'intro', article),
      buildPracticalParagraph(language, 'intro', article),
    ),
    section1Text: joinParagraphs(
      article.section1Text,
      template.section1,
      buildDynamicParagraph(language, 'section1', article),
      buildPracticalParagraph(language, 'section1', article),
    ),
    section2Text: joinParagraphs(
      article.section2Text,
      template.section2,
      buildDynamicParagraph(language, 'section2', article),
      buildPracticalParagraph(language, 'section2', article),
    ),
    section3Text: joinParagraphs(
      article.section3Text,
      template.section3,
      buildDynamicParagraph(language, 'section3', article),
      buildPracticalParagraph(language, 'section3', article),
    ),
    section4Text: joinParagraphs(
      article.section4Text,
      template.section4,
      buildDynamicParagraph(language, 'section4', article),
      buildPracticalParagraph(language, 'section4', article),
    ),
  }
}

export function splitLongformText(text: string) {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}
