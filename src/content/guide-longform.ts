import type { Language } from '../i18n'

export interface GuideSectionContent {
  heading: string
  content: string
}

export interface GuideRelatedLink {
  label: string
  href: string
}

export interface GuidePageContent {
  title: string
  description: string
  sections: GuideSectionContent[]
  relatedLinks?: GuideRelatedLink[]
}

type GuideFamily = 'saju' | 'ziwei' | 'natal'

const GUIDE_FAMILY_EXPANSIONS: Record<Language, Record<GuideFamily, string[]>> = {
  ko: {
    saju: [
      '사주 가이드는 용어를 단순 정의로 끝내기보다, 실제 명식을 읽는 순서를 잡아주는 데 강점이 있습니다. 연월일시의 구조를 큰 흐름으로 먼저 이해하면 세부 해석이 서로 충돌하는 것처럼 보이지 않고 한 방향으로 정리됩니다.',
      '사주 해석은 언제나 계절감, 일간의 힘, 주변 오행의 균형을 함께 봐야 정확도가 올라갑니다. 하나의 별칭이나 한 문장 요약만 붙잡기보다, 어떤 조건에서 의미가 강화되거나 약해지는지 같이 확인해야 실전적인 읽기가 됩니다.',
      '이런 가이드는 계산 결과를 막연하게 바라보지 않도록 돕습니다. 명운판 계산기에서 자신의 결과를 띄워두고 이 설명을 같이 읽으면, 추상적인 개념이 지금 내 삶의 질문과 어떻게 연결되는지 훨씬 빠르게 체감할 수 있습니다.',
      '초보 단계에서는 모든 것을 한 번에 해석하려 하기보다, 기본 구조를 파악하고 반복되는 신호를 먼저 찾는 편이 좋습니다. 그렇게 읽어야 관계, 직업, 돈, 시기 같은 응용 주제로 넘어가도 해석의 기준이 흔들리지 않습니다.',
    ],
    ziwei: [
      '자미두수 가이드는 궁과 별이 만나는 장면을 읽는 법을 익히는 데 핵심이 있습니다. 같은 별도 어느 궁에 놓이는지에 따라 사람, 일, 돈, 이동, 관계의 해석 방향이 달라지므로 먼저 주제를 나누어 보는 습관이 중요합니다.',
      '명반은 별 이름을 많이 외운다고 바로 깊어지지 않습니다. 주성의 분위기, 부성의 보정, 사화의 변화, 그리고 궁끼리의 연결을 차례대로 읽어야 실제 삶에 가까운 판단이 나옵니다.',
      '자미두수는 질문을 구체화할수록 강해집니다. 명궁과 관록궁, 재백궁처럼 특정 궁을 기준으로 보고 지금의 고민을 대입하면, 추상적 상징이 실제 선택 기준으로 바뀌는 경험을 하게 됩니다.',
      '이 가이드를 읽을 때는 한 번에 전체 명반을 확정하려 하기보다 초점을 나누는 편이 좋습니다. 궁별 역할과 현재 시기를 함께 보면, 명반의 상징이 과장되지 않으면서도 실용적인 설명으로 이어집니다.',
    ],
    natal: [
      '출생차트 가이드는 별자리 인상비평을 넘어, 행성·사인·하우스·각도가 어떻게 하나의 문장처럼 연결되는지 보여주는 데 의미가 있습니다. 요소 하나만 떼어 보면 단순하지만, 조합해서 읽기 시작하면 차트의 결이 훨씬 선명해집니다.',
      '점성술 해석은 심리와 사건의 무대를 동시에 읽습니다. 어떤 행성이 기능을 말하고 어떤 하우스가 삶의 영역을 말하는지 구분해두면, 같은 차트라도 훨씬 덜 모호하게 이해할 수 있습니다.',
      '좋은 가이드는 차트를 읽는 순서를 만들어줍니다. 태양·달·상승궁 같은 핵심 축을 먼저 확인한 뒤, 필요한 경우 행성이나 하우스 세부로 들어가면 초보자도 길을 잃지 않고 학습을 이어갈 수 있습니다.',
      '이 설명을 자신의 차트와 함께 보면 반복 패턴이 더 빨리 보입니다. AI 해석을 곁들이더라도 어떤 행성과 어떤 하우스를 중심으로 읽고 있는지 확인하면서 따라가면, 결과를 훨씬 비판적으로 활용할 수 있습니다.',
    ],
  },
  en: {
    saju: [
      'A strong Saju guide does more than define terms. It shows readers how to move through a chart in a practical order, so the Four Pillars feel like one structure instead of a scattered list of symbols.',
      'Saju interpretation becomes more reliable when season, Day Master strength, and elemental balance are read together. A label on its own is rarely enough; the useful question is how a condition changes once the rest of the chart is taken into account.',
      'Guides like this are most helpful when they sit next to an actual chart. Readers who compare the explanation with their own calculation output can move much faster from abstract vocabulary into real self-interpretation.',
      'At the beginner stage, it is better to stabilize the framework than to jump to conclusions. Once the core structure is clear, later topics such as relationship, work, money, and timing become much easier to read with consistency.',
    ],
    ziwei: [
      'Zi Wei Dou Shu guides become useful when they explain how palaces and stars interact. The same star can describe very different life dynamics depending on which palace carries it, so topic and tone have to be read together.',
      'A chart does not become deeper just because the reader memorizes more star names. Main stars, supporting stars, Four Transformations, and palace-to-palace links all shape how a reading should be framed in practice.',
      'Zi Wei becomes especially practical when the question is specific. Once a reader focuses on Life, Career, Wealth, or Travel palaces in relation to a real concern, the chart starts to feel like a decision tool rather than a distant symbolic system.',
      'It helps to resist the urge to finalize the whole chart at once. Breaking the chart into palace-level themes and then layering current timing on top usually produces a more grounded and persuasive reading.',
    ],
    natal: [
      'A natal chart guide is strongest when it moves beyond sign stereotypes and shows how planets, signs, houses, and aspects combine. That layered approach is what gives chart reading both nuance and practical value.',
      'Western astrology works best when function and context are separated clearly. Planets describe drives, houses describe life areas, and aspects describe relationship between parts of the chart; reading them together prevents shallow conclusions.',
      'The most useful guides also create a reading order. When readers begin with the major anchors and only then move into detailed houses or planetary patterns, the chart becomes much easier to interpret without getting lost in symbolism.',
      'Putting this material beside a real chart makes the concepts stick. Even when AI interpretation is involved, readers benefit from checking which planets, houses, and angles are actually carrying the explanation.',
    ],
  },
  ja: {
    saju: [
      '四柱推命ガイドの価値は、用語の意味を並べることだけではありません。命式をどの順番で読めばよいかを示すことで、初心者でも全体構造をつかみやすくなります。',
      '四柱推命は、季節性、日主の強弱、五行バランスを合わせて読むほど精度が上がります。単独のキーワードで判断するより、条件が変わると意味がどう変わるかを見るほうが実践的です。',
      'こうしたガイドは、実際の計算結果と並べて読むと効果が高まります。自分の命式を見ながら説明を追うことで、抽象的な概念が現実の問いに結びつきやすくなります。',
      '初学者ほど、結論を急ぐより骨格を安定させることが大切です。土台が固まれば、関係、仕事、お金、時期のような応用テーマにも一貫した基準で進めます。',
    ],
    ziwei: [
      '紫微斗数ガイドでは、宮と星の組み合わせをどう読むかが中心になります。同じ星でもどの宮に入るかで意味が変わるため、テーマと雰囲気を同時に読む姿勢が欠かせません。',
      '星の名前を多く覚えることと、読みが深くなることは同じではありません。主星、副星、四化、宮同士の連動を順に見ていくことで、命盤はようやく立体的になります。',
      '紫微斗数は、問いが具体的になるほど実用性が増します。命宮、官禄宮、財帛宮などに焦点を当てて現実の悩みと重ねると、命盤が判断材料として機能しやすくなります。',
      '命盤全体を一度に確定しようとせず、宮ごとに焦点を分けるのが有効です。そこに時期の流れを重ねることで、神秘性よりも実用性の高い読みへ近づきます。',
    ],
    natal: [
      '出生チャートガイドは、星座イメージの羅列を超えて、惑星・サイン・ハウス・アスペクトがどう重なるかを示すときに厚みが出ます。その重なりが、解釈に実感を与えます。',
      '西洋占星術は、機能と文脈を分けて読むほど分かりやすくなります。惑星は働き、ハウスは人生領域、アスペクトは相互作用を示し、それらを合わせて読むことで浅い結論を避けられます。',
      'よいガイドは読み順も整えてくれます。主要な軸から入り、その後で細かな惑星配置やハウス解釈へ進むと、初心者でも象徴に飲み込まれずに理解を深められます。',
      '実際のチャートと見比べながら読むと概念が定着しやすくなります。AI解釈を使う場合でも、どの惑星やハウスが説明の中心なのかを確認する姿勢が大切です。',
    ],
  },
  zh: {
    saju: [
      '好的四柱指南不只是解释术语，而是帮助读者建立阅读顺序。只有先看到命盘结构，再看细节标签，八字内容才不会显得零散。',
      '四柱解读越是把季节、日主强弱和五行平衡一起看，结论就越稳。单独抓一个词往往不够，真正有用的是判断它在不同结构里会怎样变化。',
      '这类指南最适合和真实命盘一起阅读。读者一边看自己的计算结果，一边对照说明，会更快把抽象概念转成可以使用的判断。',
      '对初学者来说，先把框架站稳比急着下结论更重要。骨架清楚以后，再进入关系、事业、金钱和时机等主题，阅读会更连贯。',
    ],
    ziwei: [
      '紫微斗数指南真正重要的地方，在于说明宫位和星曜如何组合出意义。同一颗星落在不同宫位里，人生议题和表现方式都会变化，所以必须把主题和风格一起读。',
      '记住更多星名，并不等于读盘更深。主星、副星、四化以及宫位之间的联动，才决定了解读在现实里是否站得住。',
      '紫微斗数在问题具体时最有力量。把关注点放在命宫、官禄宫、财帛宫或迁移宫，并结合真实困惑去看，命盘会更像实用工具而不是抽象系统。',
      '与其一次性下完整结论，不如先按宫位拆分焦点。再把时运层叠进去，命盘就更容易形成稳健而有说服力的解读。',
    ],
    natal: [
      '本命盘指南最有价值的时候，是它不再停留在星座印象，而是说明行星、星座、宫位和相位怎样共同组成一张图。正是这种组合，让解读更细也更实用。',
      '西方占星在把功能和语境区分开时最容易理解。行星讲驱动力，宫位讲人生领域，相位讲它们之间的关系，把这些一起看才能避免表面化结论。',
      '好的指南也会给出阅读顺序。先抓主要轴线，再进入行星与宫位细节，初学者就更不容易被大量象征信息淹没。',
      '把这些内容和真实出生图放在一起看，会比单独阅读更有效。即使使用 AI 解读，也最好确认答案到底是建立在哪些行星、宫位和角度之上的。',
    ],
  },
}

const GUIDE_TOPIC_HINTS: Record<Language, Record<string, string>> = {
  ko: {
    saju: '이 페이지는 사주 전체 입문 흐름을 잡는 데 초점을 둡니다.',
    'saju/ten-gods': '이 페이지는 십신을 역할과 관계의 언어로 읽도록 돕습니다.',
    'saju/day-master': '이 페이지는 일간을 해석의 중심축으로 세우는 데 집중합니다.',
    ziwei: '이 페이지는 자미두수 입문자가 명반의 큰 구조를 먼저 파악하도록 설계되어 있습니다.',
    'ziwei/12-palaces': '이 페이지는 십이궁을 삶의 장면별로 읽는 기준을 정리합니다.',
    natal: '이 페이지는 출생차트의 기본 문법을 한 번에 이어서 익히는 데 초점을 둡니다.',
    'natal/planets': '이 페이지는 행성을 기능과 역할의 언어로 이해하도록 안내합니다.',
    'natal/houses': '이 페이지는 하우스를 실제 삶의 영역과 연결하는 기준을 설명합니다.',
  },
  en: {
    saju: 'This page is built to stabilize a beginner-friendly reading order for the whole Saju chart.',
    'saju/ten-gods': 'This page frames the Ten Gods as a language of roles, pressure, and relationship inside the chart.',
    'saju/day-master': 'This page keeps the Day Master at the center of interpretation.',
    ziwei: 'This page is designed to help beginners map the overall structure of a Zi Wei chart first.',
    'ziwei/12-palaces': 'This page explains how the Twelve Palaces divide life into readable domains.',
    natal: 'This page works as a compact grammar guide for reading a natal chart from the ground up.',
    'natal/planets': 'This page focuses on planets as functions rather than stereotypes.',
    'natal/houses': 'This page connects houses to lived life areas instead of abstract symbolism alone.',
  },
  ja: {
    saju: 'このページは、四柱推命全体の読み順を初心者向けに整えることを目的としています。',
    'saju/ten-gods': 'このページは、十神を役割と関係の言語として読む助けになります。',
    'saju/day-master': 'このページは、日主を解釈の中心軸に置いています。',
    ziwei: 'このページは、紫微斗数の大きな構造を先につかむために設計されています。',
    'ziwei/12-palaces': 'このページは、十二宮を人生場面ごとに読む基準を整理します。',
    natal: 'このページは、出生チャートの基本文法を順序立てて学ぶための導入です。',
    'natal/planets': 'このページは、惑星を固定イメージではなく機能として理解させます。',
    'natal/houses': 'このページは、ハウスを現実の人生領域に結びつけて説明します。',
  },
  zh: {
    saju: '这个页面的重点，是帮初学者先建立四柱整体阅读顺序。',
    'saju/ten-gods': '这个页面把十神放回角色、压力与关系的语言里来理解。',
    'saju/day-master': '这个页面强调以日主作为解读中心。',
    ziwei: '这个页面的目标，是先帮助读者看懂紫微命盘的大结构。',
    'ziwei/12-palaces': '这个页面整理了十二宫如何对应不同人生场景。',
    natal: '这个页面是从头理解本命盘阅读语法的入门入口。',
    'natal/planets': '这个页面强调把行星理解为功能，而不是固定印象。',
    'natal/houses': '这个页面说明宫位怎样对应现实生活领域。',
  },
}

function inferGuideFamily(topicKey: string): GuideFamily {
  if (topicKey.startsWith('ziwei')) {
    return 'ziwei'
  }

  if (topicKey.startsWith('natal')) {
    return 'natal'
  }

  return 'saju'
}

function joinParagraphs(...parts: string[]) {
  return parts
    .map((part) => part.trim())
    .filter(Boolean)
    .join('\n\n')
}

function buildDynamicGuideParagraph(
  language: Language,
  topicKey: string,
  pageTitle: string,
  sectionHeading: string,
) {
  const hint = GUIDE_TOPIC_HINTS[language][topicKey] ?? ''

  if (language === 'ko') {
    return `${hint} ${pageTitle} 안에서 ${sectionHeading} 파트는 단순 개념 설명이 아니라 "어떤 질문을 먼저 붙일 것인가"를 정하는 구간입니다. 계산 결과와 함께 읽으면서 반복되는 신호를 찾아보면, 같은 용어도 훨씬 현실적인 판단 기준으로 바뀝니다.`
  }

  if (language === 'en') {
    return `${hint} Within ${pageTitle}, the ${sectionHeading} section works best when the reader treats it as a reading question, not just a glossary entry. Matching it against a real chart usually turns the concept into something concrete and usable.`
  }

  if (language === 'ja') {
    return `${hint} ${pageTitle}の中で${sectionHeading}の段落は、単なる用語説明ではなく、「何を先に確認するか」を決める部分として読むと効果的です。実際の結果と照らし合わせることで、概念がより現実的な判断材料へ変わっていきます。`
  }

  return `${hint} 在${pageTitle}里，${sectionHeading}这一段最好不要只当成术语解释，而要当成“先问什么、后看什么”的阅读提示。把它和真实结果对照起来看，概念会更快变成可用判断。`
}

function buildGuideSupportParagraph(
  language: Language,
  family: GuideFamily,
  sectionHeading: string,
) {
  if (language === 'ko') {
    if (family === 'saju') {
      return `이 섹션을 읽을 때는 일간, 계절성, 주변 오행의 압력처럼 기본 축을 함께 떠올리는 편이 좋습니다. 그래야 기초 설명이 관계 해석이나 직업 해석으로 넘어갈 때도 끊기지 않고 이어지며, 계산 결과를 다시 볼 때 어떤 항목부터 확인해야 하는지도 자연스럽게 정리됩니다.`
    }

    if (family === 'ziwei') {
      return `이 구간은 궁과 별을 따로 외우는 대신, 둘이 만났을 때 어떤 장면이 만들어지는지 상상해보면 훨씬 잘 남습니다. 명반 해석은 세부 용어를 많이 아는 것보다 질문의 초점을 분리해 읽는 습관이 더 중요하기 때문에, 이 단계에서 읽기 순서를 잡아두는 것이 특히 유용합니다.`
    }

    return `이 단락을 이해할 때는 행성의 기능, 하우스의 무대, 각도의 긴장과 조화를 같이 떠올리는 편이 좋습니다. 차트를 잘 읽는 사람일수록 하나의 상징을 과장하기보다 구조 안에서 역할을 비교하므로, 이 문단도 같은 방식으로 따라가면 훨씬 실제적인 이해로 이어집니다.`
  }

  if (language === 'en') {
    if (family === 'saju') {
      return `Readers usually understand ${sectionHeading} better when they hold Day Master, seasonal climate, and elemental pressure in view at the same time. That shared frame is what keeps the explanation useful when the reader later moves into relationship, career, or timing questions.`
    }

    if (family === 'ziwei') {
      return `${sectionHeading} becomes much easier to remember once the reader stops memorizing palace and star names in isolation and starts asking what kind of life scene they create together. In practice, that shift is what turns a chart into something that can guide real judgment.`
    }

    return `${sectionHeading} is most useful when planets, houses, and aspects are compared as parts of one structure rather than as separate trivia. That habit helps the reader understand why a natal chart can stay nuanced without becoming vague.`
  }

  if (language === 'ja') {
    if (family === 'saju') {
      return `${sectionHeading}を読むときは、日主、季節性、周辺の五行圧力を一緒に思い浮かべると理解が安定します。その共通の軸があることで、後から関係、仕事、時期の読みへ進んでも説明が途切れにくくなります。`
    }

    if (family === 'ziwei') {
      return `${sectionHeading}は、宮と星を別々に暗記するより、両者が重なったときにどんな人生場面が現れるかを考えると定着しやすくなります。この読み方の癖が、命盤を現実判断へつなぐ大きな助けになります。`
    }

    return `${sectionHeading}を理解するには、惑星の機能、ハウスの舞台、アスペクトの緊張や調和を同じ構造の中で比べることが大切です。その見方があるほど、出生チャートは曖昧にならずに深みを保てます。`
  }

  if (family === 'saju') {
    return `阅读${sectionHeading}时，最好把日主、季节环境和五行压力放在同一个视野里。这样一来，后面进入关系、事业和时机问题时，解释就更容易保持连贯。`
  }

  if (family === 'ziwei') {
    return `${sectionHeading}这一段，越是把宫位和星曜一起想成某种人生场景，就越容易记住。真正有用的不是分开背术语，而是知道它们叠在一起时会把解读带向哪里。`
  }

  return `理解${sectionHeading}时，把行星功能、宫位领域和相位关系当成同一张结构图的一部分来比较，会比逐个背关键词更有帮助。这样读，本命盘才会既有层次又不至于空泛。`
}

export function expandGuidePageContent(
  language: Language,
  topicKey: string,
  content: GuidePageContent,
) {
  const family = inferGuideFamily(topicKey)
  const familyParagraphs = GUIDE_FAMILY_EXPANSIONS[language][family]

  return {
    ...content,
    sections: content.sections.map((section, index) => ({
      ...section,
      content: joinParagraphs(
        section.content,
        familyParagraphs[index % familyParagraphs.length] ?? familyParagraphs[familyParagraphs.length - 1] ?? '',
        buildDynamicGuideParagraph(language, topicKey, content.title, section.heading),
        buildGuideSupportParagraph(language, family, section.heading),
      ),
    })),
  }
}

export function splitGuideText(text: string) {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}
