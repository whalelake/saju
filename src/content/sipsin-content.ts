import type { Language } from '../i18n'

// ---------------------------------------------------------------------------
// URL slug mapping for 10 Ten Gods (십신)
// ---------------------------------------------------------------------------

export const SIPSIN_SLUGS: Record<string, string> = {
  '比肩': 'bi-gyeon',
  '劫財': 'geop-jae',
  '食神': 'sik-sin',
  '傷官': 'sang-gwan',
  '偏財': 'pyeon-jae',
  '正財': 'jeong-jae',
  '偏官': 'pyeon-gwan',
  '正官': 'jeong-gwan',
  '偏印': 'pyeon-in',
  '正印': 'jeong-in',
}

// Reverse mapping: slug → hanja
export const SLUG_TO_SIPSIN: Record<string, string> = Object.fromEntries(
  Object.entries(SIPSIN_SLUGS).map(([k, v]) => [v, k])
)

// All valid sipsin slugs for routing
export const ALL_SIPSIN_SLUGS = Object.values(SIPSIN_SLUGS)

// Paired grouping: [편, 정] pairs
export const SIPSIN_PAIRS: [string, string][] = [
  ['比肩', '劫財'],
  ['食神', '傷官'],
  ['偏財', '正財'],
  ['偏官', '正官'],
  ['偏印', '正印'],
]

// Relationship type for color coding
export type SipsinRelationType = 'same' | 'generate' | 'wealth' | 'authority' | 'resource'

export const SIPSIN_RELATION_TYPE: Record<string, SipsinRelationType> = {
  '比肩': 'same',
  '劫財': 'same',
  '食神': 'generate',
  '傷官': 'generate',
  '偏財': 'wealth',
  '正財': 'wealth',
  '偏官': 'authority',
  '正官': 'authority',
  '偏印': 'resource',
  '正印': 'resource',
}

// Color classes by relation type
export const RELATION_COLORS: Record<SipsinRelationType, { bg: string; badge: string; text: string }> = {
  same: { bg: 'bg-emerald-50', badge: 'badge-success', text: 'text-emerald-700' },
  generate: { bg: 'bg-amber-50', badge: 'badge-warning', text: 'text-amber-700' },
  wealth: { bg: 'bg-sky-50', badge: 'badge-info', text: 'text-sky-700' },
  authority: { bg: 'bg-rose-50', badge: 'badge-error', text: 'text-rose-700' },
  resource: { bg: 'bg-violet-50', badge: 'badge-secondary', text: 'text-violet-700' },
}

// ---------------------------------------------------------------------------
// Sipsin content interface
// ---------------------------------------------------------------------------

interface SipsinInfo {
  name: string
  nickname: string
  element: string
  interaction: string
  overview: string
  personality: string
  career: string
  relationship: string
  strength: string
  weakness: string
}

// ---------------------------------------------------------------------------
// Multilingual content for 10 Ten Gods (십신)
// ---------------------------------------------------------------------------

export const SIPSIN_CONTENT: Record<string, Record<Language, SipsinInfo>> = {
  '比肩': {
    ko: {
      name: '비견(比肩)',
      nickname: '나와 같은 에너지',
      element: '같은 오행, 같은 음양',
      interaction: '비화(比和)',
      overview: '비견은 나와 같은 오행, 같은 음양의 기운으로, 마치 어깨를 나란히 하는 형제·자매와 같습니다. 자기 자신의 힘을 그대로 반영하며, 독립심과 자존감이 강한 에너지를 상징합니다.',
      personality: '자립심이 매우 강하고 남에게 의지하기를 싫어합니다. 주체적이며 자기만의 방식을 고수하는 경향이 있습니다. 경쟁심이 있으면서도 동료의식이 강해 같은 목표를 향해 함께 달릴 수 있는 사람입니다. 자존심이 높아 쉽게 굽히지 않습니다.',
      career: '독립적으로 일하는 환경에서 빛을 발합니다. 프리랜서, 1인 사업가, 스타트업 창업자 등 자기 결정권이 있는 직업에 적성이 맞으며, 경쟁이 치열한 분야에서도 강한 생존력을 보입니다.',
      relationship: '대등한 관계를 추구하며 상대를 존중하지만, 지나치게 경쟁적이 될 수 있습니다. 서로의 영역을 인정하는 성숙한 파트너십이 이상적이며, 의존적인 관계에는 답답함을 느낍니다.',
      strength: '독립심과 추진력이 뛰어나 스스로 길을 개척하는 능력이 탁월합니다. 위기 상황에서도 흔들리지 않는 강한 정신력을 갖추고 있습니다.',
      weakness: '고집이 세고 타협을 어려워할 수 있으며, 혼자 모든 것을 해결하려다 고립될 위험이 있습니다. 타인의 도움을 받아들이는 유연성을 기르면 더 큰 성장이 가능합니다.',
    },
    en: {
      name: 'Bi-gyeon (比肩)',
      nickname: 'Mirror of Self',
      element: 'Same element, same yin/yang',
      interaction: 'Harmony (比和)',
      overview: 'Bi-gyeon represents the same element and polarity as oneself — like standing shoulder to shoulder with a sibling. It reflects your own strength and symbolizes independence, self-esteem, and personal power.',
      personality: 'Fiercely independent and self-reliant. Prefers to forge their own path and resists depending on others. Competitive yet possesses strong camaraderie, able to rally alongside peers toward shared goals. High self-regard makes them reluctant to back down.',
      career: 'Thrives in autonomous work environments. Well-suited for freelancing, solo entrepreneurship, and startup founding — any role with decision-making authority. Shows strong survival instincts even in highly competitive fields.',
      relationship: 'Seeks equal partnerships built on mutual respect, though can become overly competitive. Ideal in mature relationships that honor each partner\'s independence. Feels stifled by dependency.',
      strength: 'Outstanding independence and drive, with the ability to pioneer new paths. Possesses unwavering mental fortitude even in crisis situations.',
      weakness: 'May struggle with compromise and stubbornness, risking isolation by trying to handle everything alone. Developing flexibility in accepting help from others enables greater growth.',
    },
    ja: {
      name: '比肩（ひけん）',
      nickname: '自分と同じエネルギー',
      element: '同じ五行、同じ陰陽',
      interaction: '比和',
      overview: '比肩は自分と同じ五行・同じ陰陽の気で、まるで肩を並べる兄弟姉妹のような存在です。自分自身の力をそのまま映し出し、独立心と自尊心が強いエネルギーを象徴します。',
      personality: '自立心が非常に強く、他人に頼ることを嫌います。主体的で自分のやり方を貫く傾向があります。競争心がありながらも仲間意識が強く、同じ目標に向かって共に走れる人です。プライドが高く、簡単には折れません。',
      career: '独立して働く環境で力を発揮します。フリーランス、個人事業主、スタートアップ創業者など、自己決定権のある職業に適性があり、競争の激しい分野でも強い生存力を見せます。',
      relationship: '対等な関係を求め相手を尊重しますが、過度に競争的になることがあります。お互いの領域を認め合う成熟したパートナーシップが理想的です。',
      strength: '独立心と推進力に優れ、自ら道を切り拓く能力が卓越しています。危機的状況でも揺るがない強い精神力を持っています。',
      weakness: '頑固で妥協が難しく、一人で全てを解決しようとして孤立するリスクがあります。他者の助けを受け入れる柔軟性を養えば、さらなる成長が可能です。',
    },
    zh: {
      name: '比肩',
      nickname: '与我相同的能量',
      element: '相同五行、相同阴阳',
      interaction: '比和',
      overview: '比肩是与自身相同五行、相同阴阳的能量,如同并肩而立的兄弟姐妹。它反映自身的力量,象征着独立心与自尊心强烈的能量。',
      personality: '自立心极强,不喜欢依赖他人。主体性强,倾向于坚持自己的方式。既有竞争心又有强烈的伙伴意识,能与人共同奔向同一目标。自尊心高,不轻易低头。',
      career: '在独立工作的环境中发光发热。适合自由职业、个人创业、初创企业创始人等拥有自主决策权的职业,在竞争激烈的领域也展现出强大的生存力。',
      relationship: '追求对等关系并尊重对方,但可能过于好胜。理想的是彼此认可各自领域的成熟伙伴关系,在依赖型关系中会感到压抑。',
      strength: '独立心和推进力出众,开拓新路的能力卓越。即使在危机中也拥有不动摇的强大精神力。',
      weakness: '可能固执且难以妥协,试图独自解决一切而面临孤立风险。培养接受他人帮助的灵活性,方能实现更大成长。',
    },
  },

  '劫財': {
    ko: {
      name: '겁재(劫財)',
      nickname: '대담한 도전자',
      element: '같은 오행, 다른 음양',
      interaction: '비화(比和)',
      overview: '겁재는 나와 같은 오행이지만 음양이 다른 기운으로, 비견보다 더 역동적이고 공격적인 에너지를 지닙니다. 재물을 빼앗기도 하지만, 과감한 도전과 승부사 기질을 통해 큰 성과를 만들어내는 양면적 성격의 십신입니다.',
      personality: '대담하고 모험적이며 위험을 두려워하지 않습니다. 강한 추진력으로 목표를 향해 돌진하며, 승부욕이 남다릅니다. 카리스마가 있어 사람들을 이끄는 힘이 있지만, 때로는 무모하게 보일 수 있습니다. 소유욕이 강하고 집착하는 면이 있습니다.',
      career: '투기적 사업, 영업, 부동산, 스포츠 등 승부가 갈리는 분야에서 강점을 보입니다. 리스크를 감수하면서 큰 이익을 추구하는 직업에 적합하며, 세일즈나 마케팅에서 두각을 나타냅니다.',
      relationship: '열정적이고 강렬한 사랑을 하지만, 소유욕과 질투심이 강할 수 있습니다. 상대를 독점하려는 경향이 있어 갈등의 원인이 되기도 합니다. 그러나 사랑하는 사람을 위해서는 모든 것을 걸 수 있는 뜨거운 사람입니다.',
      strength: '과감한 결단력과 행동력이 뛰어나며, 남들이 주저하는 상황에서 기회를 잡는 능력이 있습니다. 강한 승부사 기질로 큰 성공을 이뤄낼 잠재력을 가지고 있습니다.',
      weakness: '충동적인 판단으로 손실을 입을 수 있으며, 재물의 유출이 잦을 수 있습니다. 인내심을 기르고 리스크를 관리하는 능력을 키우면 더 안정적인 성공이 가능합니다.',
    },
    en: {
      name: 'Geop-jae (劫財)',
      nickname: 'Bold Challenger',
      element: 'Same element, different yin/yang',
      interaction: 'Harmony (比和)',
      overview: 'Geop-jae shares your element but with opposite polarity — more dynamic and aggressive than Bi-gyeon. It can drain wealth yet also generate massive results through bold challenges and a gambler\'s instinct. A double-edged ten god.',
      personality: 'Bold, adventurous, and fearless of risk. Charges toward goals with powerful momentum and exceptional competitive drive. Has natural charisma for leading people, though can sometimes appear reckless. Strong possessiveness and tendency toward fixation.',
      career: 'Excels in high-stakes fields — speculative ventures, sales, real estate, and sports. Suited for careers that pursue big gains while accepting risk. Stands out in sales and marketing.',
      relationship: 'Loves passionately and intensely, but can be possessive and jealous. Tendency to monopolize a partner can cause conflict. Yet when truly in love, willing to stake everything for the one they care about.',
      strength: 'Outstanding decisiveness and action-oriented drive. Seizes opportunities when others hesitate. Possesses the gambler\'s mentality for achieving great success.',
      weakness: 'Impulsive decisions can lead to losses, with frequent financial outflow. Building patience and risk management skills enables more stable success.',
    },
    ja: {
      name: '劫財（ごうざい）',
      nickname: '大胆な挑戦者',
      element: '同じ五行、異なる陰陽',
      interaction: '比和',
      overview: '劫財は自分と同じ五行ですが陰陽が異なる気で、比肩よりダイナミックで攻撃的なエネルギーを持ちます。財を奪われることもありますが、大胆な挑戦と勝負師の気質で大きな成果を生み出す両面性のある十神です。',
      personality: '大胆で冒険的、リスクを恐れません。強い推進力で目標に突進し、勝負欲が人一倍です。カリスマがあり人を率いる力がありますが、時に無謀に見えることも。所有欲が強く執着する面があります。',
      career: '投機的ビジネス、営業、不動産、スポーツなど勝負が分かれる分野で強みを見せます。リスクを取りながら大きな利益を追求する職業に適しています。',
      relationship: '情熱的で激しい愛をしますが、所有欲と嫉妬心が強くなりがちです。相手を独占しようとする傾向があり葛藤の原因になることも。しかし愛する人のためには全てを賭けられる熱い人です。',
      strength: '果敢な決断力と行動力に優れ、他人が躊躇する場面でチャンスをつかむ能力があります。強い勝負師気質で大きな成功を収める潜在力を持っています。',
      weakness: '衝動的な判断で損失を被ることがあり、財の流出が多くなりがちです。忍耐力を養いリスク管理能力を高めれば、より安定した成功が可能です。',
    },
    zh: {
      name: '劫财',
      nickname: '大胆的挑战者',
      element: '相同五行、不同阴阳',
      interaction: '比和',
      overview: '劫财与自身同五行但阴阳不同,比比肩更具活力和攻击性。虽然可能损耗财富,但通过大胆挑战和赌徒般的气质能创造巨大成果,是具有两面性的十神。',
      personality: '大胆冒险,不畏风险。以强大的推进力向目标猛冲,好胜心极强。具有领袖魅力,但有时显得鲁莽。占有欲强,容易执着。',
      career: '在投机性事业、销售、房地产、体育等胜负分明的领域展现优势。适合在承担风险的同时追求高收益的职业,在销售和营销方面表现突出。',
      relationship: '爱得热烈而激烈,但占有欲和嫉妒心可能很强。倾向于独占对方,有时成为矛盾根源。然而为了所爱之人,愿意倾尽一切。',
      strength: '果断的决断力和行动力出众,在他人犹豫时能把握机会。凭借强烈的胜负师气质,具有取得巨大成功的潜力。',
      weakness: '冲动的判断可能导致损失,财务流出可能频繁。培养耐心和风险管理能力,方能实现更稳定的成功。',
    },
  },

  '食神': {
    ko: {
      name: '식신(食神)',
      nickname: '창조적 표현가',
      element: '내가 생하는 오행, 같은 음양',
      interaction: '설기(泄氣)',
      overview: '식신은 내가 만들어내는 기운 중 같은 음양의 것으로, 부드럽고 자연스러운 창의적 표현을 의미합니다. 먹을 복이 있고 예술적 감성이 풍부하며, 삶을 즐기는 여유로운 에너지를 상징합니다.',
      personality: '온화하고 느긋한 성격으로, 먹는 것과 즐기는 것을 사랑합니다. 예술적 감각이 뛰어나며 창의적인 아이디어가 샘솟습니다. 낙천적이고 유머 감각이 있어 주변 사람들에게 편안한 기운을 줍니다. 타인을 배려하는 따뜻한 마음을 지녔습니다.',
      career: '요리사, 예술가, 교사, 작가 등 창의성과 표현력이 필요한 분야에서 빛을 발합니다. 음식·미용·엔터테인먼트 업계에 적성이 맞으며, 안정적이면서도 자기 표현이 가능한 직업을 선호합니다.',
      relationship: '다정하고 따뜻한 연인으로 상대를 편안하게 해줍니다. 가정적이며 함께하는 시간을 소중히 여깁니다. 갈등보다 화합을 추구하며, 상대의 이야기에 잘 귀 기울이는 좋은 파트너입니다.',
      strength: '풍부한 감성과 창의력으로 삶을 아름답게 만드는 능력이 있습니다. 스트레스에 강하고 긍정적인 에너지로 주변을 밝게 합니다.',
      weakness: '지나치게 안이하여 도전을 회피할 수 있으며, 게으름이나 안락함에 빠질 위험이 있습니다. 적당한 긴장감과 목표의식을 유지하면 잠재력을 더 발휘할 수 있습니다.',
    },
    en: {
      name: 'Sik-sin (食神)',
      nickname: 'Creative Expressionist',
      element: 'Element I generate, same yin/yang',
      interaction: 'Releasing (泄氣)',
      overview: 'Sik-sin is the energy you produce that shares your polarity — representing gentle, natural creative expression. It signifies blessings with food, rich artistic sensibility, and the leisurely energy of enjoying life.',
      personality: 'Warm and easygoing, with a love for food and pleasure. Possesses outstanding artistic sense and overflowing creative ideas. Optimistic with good humor, radiating comfortable energy to those around them. Carries a warm heart that cares for others.',
      career: 'Shines in fields requiring creativity and expressiveness — chef, artist, teacher, writer. Well-suited for food, beauty, and entertainment industries. Prefers stable careers that allow self-expression.',
      relationship: 'A warm, affectionate partner who makes others feel at ease. Family-oriented and treasures shared time. Pursues harmony over conflict and is an excellent listener.',
      strength: 'Rich sensibility and creativity that beautifies life. Resilient to stress with positive energy that brightens the surroundings.',
      weakness: 'May avoid challenges due to excessive comfort-seeking, risking laziness. Maintaining healthy tension and purpose unlocks greater potential.',
    },
    ja: {
      name: '食神（しょくじん）',
      nickname: '創造的な表現者',
      element: '自分が生む五行、同じ陰陽',
      interaction: '洩気',
      overview: '食神は自分が生み出す気の中で同じ陰陽のもので、穏やかで自然な創造的表現を意味します。食に恵まれ、芸術的感性が豊かで、人生を楽しむゆとりあるエネルギーを象徴します。',
      personality: '温和でのんびりした性格で、食べることや楽しむことが大好きです。芸術的感覚に優れ、創造的なアイデアが湧き出てきます。楽天的でユーモアがあり、周囲に安らぎを与えます。他者を思いやる温かい心を持っています。',
      career: '料理人、芸術家、教師、作家など創造性と表現力が必要な分野で力を発揮します。食品・美容・エンターテインメント業界に適性があります。',
      relationship: '優しく温かい恋人で、相手を安心させます。家庭的で一緒に過ごす時間を大切にします。対立よりも調和を求め、相手の話にしっかり耳を傾ける良いパートナーです。',
      strength: '豊かな感性と創造力で人生を美しくする能力があります。ストレスに強く、ポジティブなエネルギーで周囲を明るくします。',
      weakness: '安逸に流され挑戦を避ける可能性があり、怠惰や快適さに溺れるリスクがあります。適度な緊張感と目標意識を保てば、潜在力をさらに発揮できます。',
    },
    zh: {
      name: '食神',
      nickname: '创造性表达者',
      element: '我生之五行、相同阴阳',
      interaction: '泄气',
      overview: '食神是自己所生之气中与自身同阴阳者,代表温和自然的创造性表达。象征口福、丰富的艺术感性以及享受生活的从容能量。',
      personality: '性格温和悠闲,热爱美食与享乐。艺术感觉出众,创意源源不断。乐观幽默,给周围人带来舒适的氛围。怀有体贴他人的温暖之心。',
      career: '在需要创造力和表现力的领域大放异彩——厨师、艺术家、教师、作家。适合餐饮、美容、娱乐行业,偏好稳定且能自我表达的职业。',
      relationship: '温柔体贴的恋人,让对方感到安心。重视家庭,珍惜共处时光。追求和谐而非冲突,是善于倾听的好伴侣。',
      strength: '凭借丰富的感性和创造力,拥有美化生活的能力。抗压力强,以积极的能量照亮周围。',
      weakness: '可能因过于安逸而回避挑战,有沉溺于懒散和舒适的风险。保持适度紧张感和目标意识,能更好地发挥潜力。',
    },
  },

  '傷官': {
    ko: {
      name: '상관(傷官)',
      nickname: '반항적 천재',
      element: '내가 생하는 오행, 다른 음양',
      interaction: '설기(泄氣)',
      overview: '상관은 내가 만들어내는 기운 중 다른 음양의 것으로, 기존 질서에 도전하는 날카롭고 비범한 재능을 의미합니다. 정관을 상하게 한다 하여 상관이라 하며, 틀을 깨는 혁신가의 에너지입니다.',
      personality: '날카로운 두뇌와 독창적인 시각을 가졌으며, 기존의 틀이나 권위에 쉽게 순응하지 않습니다. 비판적 사고력이 뛰어나고 말이 직설적입니다. 자존심이 높고 완벽주의 성향이 있어 자신과 타인 모두에게 높은 기준을 적용합니다. 카리스마와 매력이 넘칩니다.',
      career: '혁신가, 비평가, 변호사, 예술가, 크리에이터 등 기존 질서를 허물고 새로운 것을 만드는 분야에 적합합니다. 자유로운 환경에서 일할 때 창의력이 극대화되며, 특수한 재능이나 기술을 활용하는 전문직에도 강합니다.',
      relationship: '매력적이지만 까다로운 연인입니다. 상대에게 높은 기대를 가지며, 지적 교감을 중시합니다. 평범한 관계에는 쉽게 지루함을 느끼며, 특별하고 자극적인 사랑을 추구합니다.',
      strength: '남다른 창의력과 탁월한 표현력으로 어떤 분야에서든 독보적인 존재가 될 수 있습니다. 문제의 본질을 꿰뚫어보는 통찰력이 뛰어납니다.',
      weakness: '날카로운 말과 행동으로 대인관계에서 마찰이 생길 수 있으며, 권위나 조직과 충돌하기 쉽습니다. 타인의 감정을 배려하는 소통 방식을 익히면 재능을 더 크게 펼칠 수 있습니다.',
    },
    en: {
      name: 'Sang-gwan (傷官)',
      nickname: 'Rebellious Genius',
      element: 'Element I generate, different yin/yang',
      interaction: 'Releasing (泄氣)',
      overview: 'Sang-gwan is the energy you produce with opposite polarity — sharp and extraordinary talent that challenges existing order. Named for "wounding the official," it carries the innovator\'s energy of breaking molds.',
      personality: 'Sharp intellect with original perspectives, rarely conforming to established norms or authority. Exceptional critical thinking with direct speech. High pride and perfectionist tendencies apply demanding standards to self and others alike. Overflowing with charisma and allure.',
      career: 'Suited for fields that dismantle convention and create the new — innovator, critic, lawyer, artist, creator. Creativity peaks in free environments. Strong in specialized professions leveraging unique talents or skills.',
      relationship: 'Attractive but demanding partner. Holds high expectations and values intellectual connection. Easily bored by ordinary relationships, seeking special and stimulating love.',
      strength: 'Extraordinary creativity and outstanding expressiveness make them a singular presence in any field. Exceptional insight that pierces to the essence of problems.',
      weakness: 'Sharp words and actions can create interpersonal friction, easily clashing with authority and organizations. Learning communication that considers others\' feelings enables talents to reach their full potential.',
    },
    ja: {
      name: '傷官（しょうかん）',
      nickname: '反逆の天才',
      element: '自分が生む五行、異なる陰陽',
      interaction: '洩気',
      overview: '傷官は自分が生み出す気の中で異なる陰陽のもので、既存の秩序に挑戦する鋭く非凡な才能を意味します。正官を傷つけるとして傷官と呼ばれ、型を破る革新者のエネルギーです。',
      personality: '鋭い頭脳と独創的な視点を持ち、既存の枠組みや権威に簡単には従いません。批判的思考力に優れ、言葉が率直です。プライドが高く完璧主義で、自分にも他人にも高い基準を求めます。カリスマと魅力にあふれています。',
      career: '革新者、批評家、弁護士、芸術家、クリエイターなど、既存の秩序を壊して新しいものを創る分野に適しています。自由な環境で創造力が最大化されます。',
      relationship: '魅力的ですが要求の多い恋人です。相手に高い期待を持ち、知的な交流を重視します。平凡な関係にはすぐ退屈し、特別で刺激的な愛を求めます。',
      strength: '並外れた創造力と卓越した表現力で、どの分野でも唯一無二の存在になれます。問題の本質を見抜く洞察力に優れています。',
      weakness: '鋭い言動で対人関係に摩擦が生じやすく、権威や組織と衝突しがちです。相手の感情を配慮するコミュニケーション方法を身につければ、才能をより大きく開花させられます。',
    },
    zh: {
      name: '伤官',
      nickname: '叛逆的天才',
      element: '我生之五行、不同阴阳',
      interaction: '泄气',
      overview: '伤官是自己所生之气中与自身阴阳不同者,代表挑战既有秩序的锐利非凡才能。因"伤害正官"而得名,是打破常规的革新者能量。',
      personality: '头脑锐利、视角独特,不轻易顺从既有框架或权威。批判性思维出众,言辞直率。自尊心高且有完美主义倾向,对自己和他人都设定高标准。充满魅力与气场。',
      career: '适合颠覆旧秩序、创造新事物的领域——创新者、评论家、律师、艺术家、创作者。在自由环境中创造力达到极致,在运用特殊才能或技术的专业领域也很强。',
      relationship: '魅力十足但要求苛刻的恋人。对伴侣抱有高期望,重视智识上的交流。对平凡的关系容易感到无聊,追求特别且刺激的爱情。',
      strength: '非凡的创造力和卓越的表现力,使其在任何领域都能成为独一无二的存在。洞察问题本质的能力出众。',
      weakness: '尖锐的言行可能在人际关系中产生摩擦,容易与权威和组织发生冲突。学会顾及他人感受的沟通方式,才能让才华得到更大施展。',
    },
  },

  '偏財': {
    ko: {
      name: '편재(偏財)',
      nickname: '유동하는 재물',
      element: '내가 극하는 오행, 같은 음양',
      interaction: '극재(剋財)',
      overview: '편재는 내가 제어하는 기운 중 같은 음양의 것으로, 유동적이고 활발한 재물 운을 상징합니다. 고정 자산보다는 유통과 투자 수익 등 움직이는 돈을 의미하며, 사교적이고 인맥이 넓은 에너지입니다.',
      personality: '사교적이고 활발하며 어디서든 인기가 많습니다. 넓은 인맥을 가지고 있으며, 관대하고 씀씀이가 큽니다. 기회를 잡는 눈이 빠르고 행동력이 있어 여러 분야에 손을 대는 멀티플레이어입니다. 변화와 새로움을 좋아합니다.',
      career: '무역, 유통, 네트워킹, 영업, 엔터테인먼트, 투자 등 사람과 돈이 활발히 움직이는 분야에서 두각을 나타냅니다. 한 곳에 안주하기보다 여러 사업을 동시에 운영하는 스타일에 적합합니다.',
      relationship: '매력적이고 다정하여 이성에게 인기가 많지만, 한 사람에게 집중하기 어려울 수 있습니다. 자유로운 연애를 선호하며, 구속되는 것을 싫어합니다. 다양한 경험을 중시합니다.',
      strength: '뛰어난 사교성과 기회 포착 능력으로 어디서든 네트워크를 구축하고 이익을 창출합니다. 유연한 사고로 변화에 빠르게 적응합니다.',
      weakness: '산만하고 집중력이 부족하여 하나에 깊이 파고들지 못할 수 있습니다. 금전 관리에 소홀하면 벌어도 모으지 못하는 경향이 있으니, 재정 규율을 갖추는 것이 중요합니다.',
    },
    en: {
      name: 'Pyeon-jae (偏財)',
      nickname: 'Flowing Wealth',
      element: 'Element I control, same yin/yang',
      interaction: 'Controlling Wealth (剋財)',
      overview: 'Pyeon-jae is the energy you control with the same polarity — symbolizing fluid, active wealth luck. Rather than fixed assets, it represents money in motion: trade, investment returns, and circulation. A social, well-connected energy.',
      personality: 'Sociable and lively, popular wherever they go. Commands a wide network and is generous with spending. Quick to spot opportunities with the action to match — a multiplayer across many fields. Loves change and novelty.',
      career: 'Excels in fields where people and money move actively — trade, distribution, networking, sales, entertainment, and investment. Suits the style of running multiple ventures simultaneously rather than staying in one place.',
      relationship: 'Charming and affectionate with wide romantic appeal, but may struggle to focus on one person. Prefers free-spirited romance and dislikes feeling constrained. Values diverse experiences.',
      strength: 'Outstanding social skills and opportunity-spotting ability build networks and generate profit anywhere. Flexible thinking enables rapid adaptation to change.',
      weakness: 'Scattered focus may prevent deep expertise. Without financial discipline, tends to earn but not save. Establishing fiscal structure is essential.',
    },
    ja: {
      name: '偏財（へんざい）',
      nickname: '流動する財',
      element: '自分が剋す五行、同じ陰陽',
      interaction: '剋財',
      overview: '偏財は自分が制御する気の中で同じ陰陽のもので、流動的で活発な財運を象徴します。固定資産より流通や投資収益など動くお金を意味し、社交的で人脈が広いエネルギーです。',
      personality: '社交的で活発、どこでも人気があります。幅広い人脈を持ち、寛大でお金遣いが大きいです。チャンスを掴む目が早く行動力があり、複数の分野で活躍するマルチプレーヤーです。変化と新しさが好きです。',
      career: '貿易、流通、ネットワーキング、営業、エンターテインメント、投資など、人とお金が活発に動く分野で頭角を現します。一箇所に留まるより複数の事業を同時に運営するスタイルに適しています。',
      relationship: '魅力的で優しく異性に人気がありますが、一人に集中しにくいことがあります。自由な恋愛を好み、束縛を嫌います。多様な経験を重視します。',
      strength: '優れた社交性と機会を捉える能力で、どこでもネットワークを構築し利益を生み出します。柔軟な思考で変化に素早く適応します。',
      weakness: '注意が散漫で集中力が不足し、一つを深く追究できないことがあります。金銭管理がおろそかだと稼いでも貯められない傾向があるため、財務規律を整えることが重要です。',
    },
    zh: {
      name: '偏财',
      nickname: '流动的财富',
      element: '我克之五行、相同阴阳',
      interaction: '克财',
      overview: '偏财是自己所克之气中与自身同阴阳者,象征流动而活跃的财运。相比固定资产,更代表流通和投资收益等动态资金,是社交广泛的能量。',
      personality: '社交活跃,走到哪里都受欢迎。人脉广泛,出手大方。善于捕捉机会且行动力强,是涉足多个领域的多面手。喜欢变化和新鲜感。',
      career: '在人与钱活跃流动的领域崭露头角——贸易、流通、社交营销、销售、娱乐、投资。适合同时经营多项事业而非安于一处的风格。',
      relationship: '魅力十足且温柔,在异性中很受欢迎,但可能难以专注于一人。偏好自由恋爱,讨厌被束缚。重视多样化的体验。',
      strength: '出色的社交能力和机会捕捉能力,在任何地方都能构建人脉并创造利润。灵活的思维使其快速适应变化。',
      weakness: '注意力分散,可能缺乏深度钻研。若疏于财务管理,容易赚得多存得少,建立财务纪律至关重要。',
    },
  },

  '正財': {
    ko: {
      name: '정재(正財)',
      nickname: '안정적 자산가',
      element: '내가 극하는 오행, 다른 음양',
      interaction: '극재(剋財)',
      overview: '정재는 내가 제어하는 기운 중 다른 음양의 것으로, 안정적이고 꾸준한 재물 운을 상징합니다. 정직한 노력으로 축적하는 고정 자산이며, 책임감 있고 성실한 에너지를 나타냅니다.',
      personality: '성실하고 책임감이 강하며 계획적으로 살아갑니다. 절약하는 습관이 있고 물질적 안정을 중시합니다. 약속을 잘 지키며 신뢰할 수 있는 사람이며, 꼼꼼하고 실수가 적습니다. 보수적이지만 현실적인 판단력이 뛰어납니다.',
      career: '회계, 재무, 경영 관리, 부동산, 공무원 등 안정적이고 체계적인 분야에 적성이 맞습니다. 꾸준한 노력으로 실력을 쌓아가는 전문직에서도 좋은 성과를 냅니다.',
      relationship: '헌신적이고 믿음직한 연인으로, 안정적인 관계를 추구합니다. 가정에 충실하며 경제적 기반을 탄탄하게 만들어갑니다. 화려한 로맨스보다는 깊고 오래가는 사랑을 합니다.',
      strength: '성실함과 꾸준함으로 장기적으로 안정적인 재물을 축적하는 능력이 뛰어납니다. 신뢰와 믿음을 바탕으로 한 인간관계를 잘 유지합니다.',
      weakness: '지나치게 보수적이어서 새로운 기회를 놓칠 수 있으며, 변화를 두려워하는 경향이 있습니다. 적절한 모험심과 유연한 사고를 갖추면 더 큰 성과를 이끌어낼 수 있습니다.',
    },
    en: {
      name: 'Jeong-jae (正財)',
      nickname: 'Stable Asset Builder',
      element: 'Element I control, different yin/yang',
      interaction: 'Controlling Wealth (剋財)',
      overview: 'Jeong-jae is the energy you control with opposite polarity — symbolizing stable, steady wealth. Fixed assets accumulated through honest effort, representing responsible and diligent energy.',
      personality: 'Diligent, responsible, and methodical in life. Naturally frugal with a priority on material stability. Keeps promises and earns trust. Meticulous with few mistakes. Conservative but possessing outstanding practical judgment.',
      career: 'Well-suited for stable, systematic fields — accounting, finance, business management, real estate, civil service. Also excels in professional careers built through steady effort.',
      relationship: 'A devoted, reliable partner who seeks stable relationships. Faithful to family and builds a solid financial foundation. Prefers deep, lasting love over flashy romance.',
      strength: 'Exceptional ability to accumulate stable wealth long-term through diligence and consistency. Maintains relationships well based on trust and reliability.',
      weakness: 'Excessive conservatism may cause missed opportunities, with a tendency to fear change. Cultivating appropriate adventurousness and flexible thinking enables greater achievement.',
    },
    ja: {
      name: '正財（せいざい）',
      nickname: '安定した資産家',
      element: '自分が剋す五行、異なる陰陽',
      interaction: '剋財',
      overview: '正財は自分が制御する気の中で異なる陰陽のもので、安定的で着実な財運を象徴します。正直な努力で蓄積する固定資産であり、責任感があり誠実なエネルギーを表します。',
      personality: '誠実で責任感が強く、計画的に生きます。節約の習慣があり物質的安定を重視します。約束をしっかり守り信頼できる人で、几帳面でミスが少ないです。保守的ですが現実的な判断力に優れています。',
      career: '会計、財務、経営管理、不動産、公務員など安定的で体系的な分野に適性があります。地道な努力で実力を積み上げる専門職でも良い成果を出します。',
      relationship: '献身的で頼もしい恋人で、安定した関係を求めます。家庭に忠実で経済的基盤をしっかり築きます。華やかなロマンスより深く長続きする愛を大切にします。',
      strength: '誠実さと継続性で長期的に安定した財を築く能力に優れています。信頼と信用に基づいた人間関係をよく維持します。',
      weakness: '過度に保守的で新しい機会を逃すことがあり、変化を恐れる傾向があります。適度な冒険心と柔軟な思考を身につければ、より大きな成果を引き出せます。',
    },
    zh: {
      name: '正财',
      nickname: '稳定的资产家',
      element: '我克之五行、不同阴阳',
      interaction: '克财',
      overview: '正财是自己所克之气中与自身阴阳不同者,象征稳定而持续的财运。代表通过诚实努力积累的固定资产,体现责任感和勤勉的能量。',
      personality: '勤恳负责,生活有规划。有节俭习惯,重视物质稳定。守信用、值得信赖,做事细致少有失误。虽然保守但现实判断力出色。',
      career: '适合稳定而系统化的领域——会计、财务、经营管理、房地产、公务员。在通过踏实努力积累实力的专业领域也能取得好成绩。',
      relationship: '忠诚可靠的恋人,追求稳定的关系。对家庭忠实,着力构建坚实的经济基础。比起华丽的浪漫,更看重深厚持久的爱情。',
      strength: '凭借勤勉和坚持,长期积累稳定财富的能力出众。善于维护基于信任和信用的人际关系。',
      weakness: '过于保守可能错失新机会,有惧怕变化的倾向。培养适度的冒险精神和灵活思维,方能取得更大成就。',
    },
  },

  '偏官': {
    ko: {
      name: '편관(偏官)',
      nickname: '칠살의 압도적 힘',
      element: '나를 극하는 오행, 같은 음양',
      interaction: '극아(剋我)',
      overview: '편관은 나를 제어하는 기운 중 같은 음양의 것으로, 칠살(七殺)이라고도 불립니다. 강력한 압박과 통제의 에너지이지만, 이를 잘 다스리면 결단력 있는 리더가 됩니다. 거친 환경에서도 살아남는 강한 생명력을 상징합니다.',
      personality: '결단력이 있고 대담하며 위기 상황에서 빛을 발합니다. 강한 카리스마로 사람들을 압도하며, 불의를 참지 못하는 정의감이 있습니다. 승부사 기질이 강하고 목표를 위해 수단과 방법을 가리지 않는 면이 있습니다. 때로는 공격적이고 직설적입니다.',
      career: '군인, 경찰, 검사, 경영자, CEO 등 권위와 결단력이 요구되는 분야에 적합합니다. 위기관리 능력이 뛰어나며 조직을 이끄는 리더십을 발휘합니다. 경쟁이 치열한 환경에서 진가를 발휘합니다.',
      relationship: '강렬하고 보호적인 사랑을 합니다. 상대를 지키려는 마음이 강하지만, 통제적이 될 수 있습니다. 존경할 수 있는 강한 파트너를 원하며, 약한 모습을 잘 보여주지 않습니다.',
      strength: '위기 상황에서의 결단력과 돌파력이 탁월하며, 어떤 어려움도 돌파하는 강한 정신력을 가지고 있습니다. 리더십이 뛰어나 조직을 이끌어가는 능력이 있습니다.',
      weakness: '지나친 강압과 통제로 주변 사람들과 갈등이 생길 수 있으며, 스트레스를 내면에 쌓아두는 경향이 있습니다. 부드러운 소통과 감정 관리를 배우면 더 큰 존경을 받을 수 있습니다.',
    },
    en: {
      name: 'Pyeon-gwan (偏官)',
      nickname: 'Seven Killings\' Overwhelming Force',
      element: 'Element that controls me, same yin/yang',
      interaction: 'Controlling Self (剋我)',
      overview: 'Pyeon-gwan is the energy that controls you with the same polarity, also called Seven Killings (七殺). While it represents powerful pressure and control, mastering it produces a decisive leader. Symbolizes the strong vitality to survive harsh environments.',
      personality: 'Decisive and bold, shining brightest in crisis. Commands others with powerful charisma and possesses a strong sense of justice. Intense competitive spirit with a win-at-all-costs mentality. Can be aggressive and blunt.',
      career: 'Suited for fields requiring authority and decisiveness — military, police, prosecutor, executive, CEO. Outstanding crisis management and organizational leadership. Proves their worth in intensely competitive environments.',
      relationship: 'Loves intensely and protectively. Strong desire to shield their partner, but can become controlling. Wants a strong partner worthy of respect and rarely shows vulnerability.',
      strength: 'Exceptional decisiveness and breakthrough ability in crisis situations. Possesses the mental fortitude to overcome any difficulty. Outstanding leadership for guiding organizations.',
      weakness: 'Excessive force and control can create conflict with those around them. Tends to internalize stress. Learning gentle communication and emotional management earns greater respect.',
    },
    ja: {
      name: '偏官（へんかん）',
      nickname: '七殺の圧倒的な力',
      element: '自分を剋す五行、同じ陰陽',
      interaction: '剋我',
      overview: '偏官は自分を制御する気の中で同じ陰陽のもので、七殺とも呼ばれます。強力な圧迫と統制のエネルギーですが、これをうまく操れば決断力のあるリーダーになります。過酷な環境でも生き残る強い生命力を象徴します。',
      personality: '決断力があり大胆で、危機的状況で真価を発揮します。強いカリスマで人を圧倒し、不正を許さない正義感があります。勝負師気質が強く、目標のためには手段を選ばない面があります。時に攻撃的で率直です。',
      career: '軍人、警察、検察、経営者、CEOなど権威と決断力が求められる分野に適しています。危機管理能力に優れ、組織を率いるリーダーシップを発揮します。',
      relationship: '強烈で保護的な愛をします。相手を守ろうとする気持ちが強いですが、支配的になることがあります。尊敬できる強いパートナーを求め、弱い姿をなかなか見せません。',
      strength: '危機的状況での決断力と突破力が卓越しており、どんな困難も乗り越える強い精神力を持っています。リーダーシップに優れ、組織を導く能力があります。',
      weakness: '過度な強圧と統制で周囲との葛藤が生じることがあり、ストレスを内に溜め込む傾向があります。柔らかいコミュニケーションと感情管理を学べば、より大きな尊敬を得られます。',
    },
    zh: {
      name: '偏官（七杀）',
      nickname: '七杀的压倒性力量',
      element: '克我之五行、相同阴阳',
      interaction: '克我',
      overview: '偏官是克制自身之气中与自身同阴阳者,也称七杀。代表强大的压迫与控制能量,但若能善加驾驭便能成为果断的领导者。象征在严酷环境中也能存活的强大生命力。',
      personality: '果断大胆,在危机中绽放光芒。以强大气场压倒众人,有着不容不义的正义感。好胜心极强,为达目标不择手段。有时显得攻击性强且直言不讳。',
      career: '适合需要权威和决断力的领域——军人、警察、检察官、企业高管、CEO。危机管理能力出色,展现统领组织的领导力。在激烈竞争的环境中证明自身价值。',
      relationship: '爱得强烈而具保护性。守护伴侣的心很强,但可能变得控制欲过强。希望找到值得尊敬的强大伴侣,不轻易展露脆弱面。',
      strength: '在危机中的决断力和突破力卓越,拥有克服任何困难的强大精神力。领导力出众,具有统领组织的能力。',
      weakness: '过度的强势和控制可能与周围人产生矛盾,有将压力积压在内心的倾向。学会温和的沟通与情绪管理,能赢得更大的尊敬。',
    },
  },

  '正官': {
    ko: {
      name: '정관(正官)',
      nickname: '질서와 명예의 수호자',
      element: '나를 극하는 오행, 다른 음양',
      interaction: '극아(剋我)',
      overview: '정관은 나를 제어하는 기운 중 다른 음양의 것으로, 바르고 정당한 통제력을 의미합니다. 법과 질서, 도덕과 명예를 상징하며, 사회적 지위와 신뢰를 쌓아가는 에너지입니다.',
      personality: '도덕적이고 규율을 중시하며, 사회적 규범을 잘 따릅니다. 책임감이 강하고 질서정연한 삶을 지향합니다. 품위 있고 예의 바르며 타인의 시선을 의식합니다. 전통적 가치관을 존중하고 올바른 길을 걷고자 하는 의지가 강합니다.',
      career: '공무원, 법조인, 경영관리직, 교육자 등 체계적이고 권위 있는 분야에 적합합니다. 조직 내에서 신뢰를 쌓으며 승진하는 안정적인 커리어 패턴을 보이며, 규율 있는 환경에서 능력을 발휘합니다.',
      relationship: '예의 바르고 존중하는 태도로 관계를 유지합니다. 안정적이고 격식 있는 연애를 선호하며, 결혼을 전제로 한 진지한 관계를 추구합니다. 가정에 충실한 배우자가 됩니다.',
      strength: '사회적 신뢰와 명예를 쌓는 능력이 탁월하며, 어디서든 존경받는 인격자입니다. 조직을 안정적으로 이끌며 장기적 성공을 일궈냅니다.',
      weakness: '지나치게 원칙적이어서 융통성이 부족할 수 있으며, 형식과 체면에 얽매일 위험이 있습니다. 때로는 규칙을 벗어난 창의적 시도도 필요하며, 내면의 감정을 솔직하게 표현하는 것이 건강한 삶에 도움이 됩니다.',
    },
    en: {
      name: 'Jeong-gwan (正官)',
      nickname: 'Guardian of Order and Honor',
      element: 'Element that controls me, different yin/yang',
      interaction: 'Controlling Self (剋我)',
      overview: 'Jeong-gwan is the energy that controls you with opposite polarity — representing righteous, legitimate authority. Symbolizes law, order, morality, and honor — the energy of building social standing and trust.',
      personality: 'Moral and disciplined, following social norms faithfully. Strong sense of responsibility with an orderly approach to life. Dignified and polite, conscious of public perception. Deeply respects traditional values with a strong will to walk the right path.',
      career: 'Suited for systematic, authoritative fields — civil service, law, management, education. Shows a stable career pattern of building trust and advancing within organizations. Performs best in disciplined environments.',
      relationship: 'Maintains relationships with courtesy and respect. Prefers stable, formal courtship and pursues serious relationships with marriage in mind. Becomes a faithful, family-oriented spouse.',
      strength: 'Exceptional ability to build social trust and honor, earning respect wherever they go. Leads organizations stably toward long-term success.',
      weakness: 'Excessive adherence to principle may lack flexibility, risking being bound by formality and appearances. Creative ventures outside rules are sometimes needed. Honest emotional expression supports a healthier life.',
    },
    ja: {
      name: '正官（せいかん）',
      nickname: '秩序と名誉の守護者',
      element: '自分を剋す五行、異なる陰陽',
      interaction: '剋我',
      overview: '正官は自分を制御する気の中で異なる陰陽のもので、正しく正当な統制力を意味します。法と秩序、道徳と名誉を象徴し、社会的地位と信頼を積み上げるエネルギーです。',
      personality: '道徳的で規律を重んじ、社会的規範をよく守ります。責任感が強く秩序ある生活を志向します。品位があり礼儀正しく、他者の目を意識します。伝統的価値観を尊重し、正しい道を歩もうとする意志が強いです。',
      career: '公務員、法曹、経営管理職、教育者など体系的で権威ある分野に適しています。組織内で信頼を積みながら昇進する安定的なキャリアパターンを見せます。',
      relationship: '礼儀正しく尊重する態度で関係を維持します。安定的で格式のある恋愛を好み、結婚を前提とした真剣な関係を求めます。家庭に忠実な配偶者になります。',
      strength: '社会的信頼と名誉を築く能力が卓越しており、どこでも尊敬される人格者です。組織を安定的に導き、長期的な成功を築きます。',
      weakness: '過度に原則的で柔軟性に欠けることがあり、形式や体面に縛られるリスクがあります。時にはルールを超えた創造的な試みも必要です。',
    },
    zh: {
      name: '正官',
      nickname: '秩序与荣誉的守护者',
      element: '克我之五行、不同阴阳',
      interaction: '克我',
      overview: '正官是克制自身之气中与自身阴阳不同者,代表正当合理的控制力。象征法律与秩序、道德与荣誉,是积累社会地位和信任的能量。',
      personality: '重视道德与纪律,严格遵守社会规范。责任感强,追求有序的生活。举止端庄有礼,在意他人看法。尊重传统价值观,有着走正道的坚强意志。',
      career: '适合系统化且具权威性的领域——公务员、法律界、经营管理、教育。展现出在组织内积累信任并稳步晋升的稳定职业模式。在有纪律的环境中发挥能力。',
      relationship: '以礼貌尊重的态度维护关系。偏好稳定正式的恋爱,追求以结婚为前提的认真关系。会成为忠于家庭的配偶。',
      strength: '构建社会信任与荣誉的能力卓越,是走到哪里都受人尊敬的人格者。稳定地带领组织走向长期成功。',
      weakness: '过于原则化可能缺乏灵活性,有被形式和面子束缚的风险。有时需要突破规则的创造性尝试,坦诚表达内心感受也有助于健康生活。',
    },
  },

  '偏印': {
    ko: {
      name: '편인(偏印)',
      nickname: '비범한 지혜의 소유자',
      element: '나를 생하는 오행, 같은 음양',
      interaction: '생아(生我)',
      overview: '편인은 나를 생하는 기운 중 같은 음양의 것으로, 도식(倒食)이라고도 불립니다. 비전통적인 지식과 영감, 직관적 지혜를 상징하며, 독특한 사고방식과 탐구심을 가진 에너지입니다.',
      personality: '독창적이고 직관적이며 남들과 다른 사고방식을 가지고 있습니다. 영적이거나 철학적인 세계에 관심이 많고, 혼자만의 시간을 소중히 여깁니다. 호기심이 강하고 탐구적이지만, 관심 분야가 자주 바뀔 수 있습니다. 미스터리한 분위기를 풍깁니다.',
      career: '연구원, 발명가, 점술가, 심리상담사, 작가, 프로그래머 등 독자적이고 전문적인 분야에 적합합니다. 비주류 학문이나 특수 기술에 재능을 보이며, 창의적 문제 해결 능력이 뛰어납니다.',
      relationship: '독립적이고 미스터리한 매력을 가진 연인입니다. 감정 표현이 서투르고 혼자만의 공간이 필요합니다. 깊은 정신적 교감을 원하며, 표면적인 관계에는 관심이 없습니다.',
      strength: '독창적인 사고력과 뛰어난 직관으로 남들이 보지 못하는 것을 발견하는 능력이 있습니다. 하나의 분야에 깊이 파고들면 전문가 수준의 통찰을 얻습니다.',
      weakness: '관심사가 자주 변하여 하나를 완성하기 전에 다른 것으로 옮겨가는 경향이 있습니다. 사회적 교류가 부족하면 고립될 수 있으니, 균형 잡힌 인간관계를 유지하는 것이 중요합니다.',
    },
    en: {
      name: 'Pyeon-in (偏印)',
      nickname: 'Bearer of Unconventional Wisdom',
      element: 'Element that generates me, same yin/yang',
      interaction: 'Generating Self (生我)',
      overview: 'Pyeon-in is the energy that generates you with the same polarity, also called "Inverted Food" (倒食). Symbolizes unconventional knowledge, inspiration, and intuitive wisdom — carrying unique thinking patterns and investigative curiosity.',
      personality: 'Original and intuitive with a distinctly different way of thinking. Drawn to spiritual or philosophical worlds, treasuring solitary time. Strongly curious and explorative, though interests may shift frequently. Radiates mysterious allure.',
      career: 'Suited for independent, specialized fields — researcher, inventor, diviner, psychologist, writer, programmer. Shows talent in niche studies or specialized skills, with outstanding creative problem-solving ability.',
      relationship: 'An independent partner with mysterious charm. Struggles with emotional expression and needs personal space. Desires deep spiritual connection and has no interest in superficial relationships.',
      strength: 'Original thinking and outstanding intuition reveal what others cannot see. Deep expertise in focused areas yields specialist-level insight.',
      weakness: 'Frequently shifting interests may prevent completing one thing before moving to the next. Risk of isolation without social interaction — maintaining balanced relationships is essential.',
    },
    ja: {
      name: '偏印（へんいん）',
      nickname: '非凡な知恵の持ち主',
      element: '自分を生む五行、同じ陰陽',
      interaction: '生我',
      overview: '偏印は自分を生む気の中で同じ陰陽のもので、倒食とも呼ばれます。非伝統的な知識と霊感、直感的な知恵を象徴し、独特な思考方式と探究心を持つエネルギーです。',
      personality: '独創的で直感的、人とは異なる思考方式を持っています。霊的・哲学的な世界に関心が多く、一人の時間を大切にします。好奇心が強く探究的ですが、関心分野が頻繁に変わることがあります。ミステリアスな雰囲気を漂わせます。',
      career: '研究者、発明家、占術家、心理カウンセラー、作家、プログラマーなど独自で専門的な分野に適しています。マイナー学問や特殊技術に才能を見せます。',
      relationship: '独立的でミステリアスな魅力を持つ恋人です。感情表現が苦手で、自分だけの空間が必要です。深い精神的な交流を求め、表面的な関係には興味がありません。',
      strength: '独創的な思考力と優れた直感で、他の人が見えないものを発見する能力があります。一つの分野に深く没頭すれば、専門家レベルの洞察を得ます。',
      weakness: '関心事が頻繁に変わり、一つを完成する前に別のものに移る傾向があります。社会的交流が不足すると孤立しかねないので、バランスの取れた人間関係を維持することが重要です。',
    },
    zh: {
      name: '偏印（枭神）',
      nickname: '非凡智慧的拥有者',
      element: '生我之五行、相同阴阳',
      interaction: '生我',
      overview: '偏印是生助自身之气中与自身同阴阳者,也称倒食。象征非传统的知识与灵感、直觉性的智慧,是拥有独特思维方式和探究心的能量。',
      personality: '独创而富有直觉,思维方式与众不同。对灵性或哲学世界兴趣浓厚,珍视独处时光。好奇心强且善于探索,但兴趣可能频繁转变。散发着神秘的氛围。',
      career: '适合独立而专业的领域——研究员、发明家、占卜师、心理咨询师、作家、程序员。在小众学问或特殊技术方面展现天赋,创造性解决问题的能力出众。',
      relationship: '独立而神秘的恋人。不善于表达情感,需要个人空间。渴望深层的精神交流,对表面化的关系不感兴趣。',
      strength: '凭借独创的思考力和出色的直觉,拥有发现他人看不到之物的能力。深入钻研某一领域时能获得专家级的洞察。',
      weakness: '兴趣频繁变换,可能在完成一件事之前就转向另一件。若社交不足容易陷入孤立,维持平衡的人际关系至关重要。',
    },
  },

  '正印': {
    ko: {
      name: '정인(正印)',
      nickname: '어머니의 지혜',
      element: '나를 생하는 오행, 다른 음양',
      interaction: '생아(生我)',
      overview: '정인은 나를 생하는 기운 중 다른 음양의 것으로, 어머니나 스승의 보살핌과 같은 따뜻한 에너지입니다. 학문과 지식, 지혜와 인덕(仁德)을 상징하며, 깊은 사려와 배움의 에너지를 나타냅니다.',
      personality: '지혜롭고 인자하며 학구적인 성품입니다. 인내심이 강하고 넓은 포용력으로 주변 사람들을 감싸 안습니다. 배움에 대한 열정이 강하고 지적 호기심이 풍부합니다. 조용하지만 깊이 있는 사색을 즐기며, 타인에게 가르침을 주는 것을 자연스럽게 여깁니다.',
      career: '교수, 의사, 상담사, 종교인, 연구자 등 지식과 지혜를 전달하는 분야에 적합합니다. 교육과 학술 분야에서 뛰어난 성취를 이루며, 전문 자격증이나 학위를 통한 커리어 발전에 유리합니다.',
      relationship: '돌봐주고 보살피는 따뜻한 연인입니다. 상대의 성장을 진심으로 응원하며, 정신적 유대를 중시합니다. 조용하고 깊은 사랑을 하며, 위기의 순간에 든든한 버팀목이 됩니다.',
      strength: '깊은 지혜와 학문적 능력으로 어디서든 존경받으며, 타인의 성장을 돕는 멘토 역할을 잘 수행합니다. 정신적 안정감이 있어 주변 사람들에게 편안함을 줍니다.',
      weakness: '지나치게 수동적이고 현실 감각이 부족할 수 있으며, 행동보다 생각에 머무는 경향이 있습니다. 실행력을 키우고 적극적으로 기회를 잡는 자세가 필요합니다.',
    },
    en: {
      name: 'Jeong-in (正印)',
      nickname: 'Mother\'s Wisdom',
      element: 'Element that generates me, different yin/yang',
      interaction: 'Generating Self (生我)',
      overview: 'Jeong-in is the energy that generates you with opposite polarity — warm energy like a mother\'s or mentor\'s care. Symbolizes scholarship, knowledge, wisdom, and benevolence — the energy of deep contemplation and learning.',
      personality: 'Wise, benevolent, and scholarly. Patient with broad tolerance that embraces those around them. Passionate about learning with rich intellectual curiosity. Enjoys quiet, deep contemplation and naturally assumes a teaching role.',
      career: 'Suited for fields that transmit knowledge and wisdom — professor, doctor, counselor, clergy, researcher. Achieves outstanding results in education and academia. Career advancement through credentials and degrees is favorable.',
      relationship: 'A warm, nurturing partner who genuinely supports the other\'s growth. Values spiritual bonds. Loves quietly and deeply, becoming a steadfast pillar in times of crisis.',
      strength: 'Earns respect everywhere through deep wisdom and academic ability. Excels as a mentor helping others grow. Mental stability provides comfort to those around them.',
      weakness: 'May be overly passive with weak practical sensibility, tending to dwell in thought rather than action. Needs to build execution skills and actively seize opportunities.',
    },
    ja: {
      name: '正印（せいいん）',
      nickname: '母の知恵',
      element: '自分を生む五行、異なる陰陽',
      interaction: '生我',
      overview: '正印は自分を生む気の中で異なる陰陽のもので、母や師の慈しみのような温かいエネルギーです。学問と知識、知恵と仁徳を象徴し、深い思慮と学びのエネルギーを表します。',
      personality: '知恵があり慈愛に満ち、学問を好む性格です。忍耐力が強く、広い包容力で周囲の人々を包み込みます。学びへの情熱が強く知的好奇心が豊富です。静かですが深い思索を楽しみ、人に教えることを自然に行います。',
      career: '教授、医師、カウンセラー、宗教家、研究者など知識と知恵を伝える分野に適しています。教育・学術分野で優れた成果を上げ、資格や学位を通じたキャリア発展に有利です。',
      relationship: '世話を焼き慈しむ温かい恋人です。相手の成長を心から応援し、精神的な絆を重視します。静かで深い愛を注ぎ、危機の時に頼もしい支えになります。',
      strength: '深い知恵と学問的能力でどこでも尊敬され、他者の成長を助けるメンターの役割をよく果たします。精神的な安定感があり周囲に安心感を与えます。',
      weakness: '過度に受動的で現実感覚が不足することがあり、行動より思考にとどまる傾向があります。実行力を高め、積極的に機会をつかむ姿勢が必要です。',
    },
    zh: {
      name: '正印',
      nickname: '母亲的智慧',
      element: '生我之五行、不同阴阳',
      interaction: '生我',
      overview: '正印是生助自身之气中与自身阴阳不同者,如同母亲或导师的关怀般温暖的能量。象征学问与知识、智慧与仁德,体现深沉思虑与学习的能量。',
      personality: '睿智仁慈,热爱学术。耐心强大,以宽广的包容力温暖周围的人。对学习充满热情,知识好奇心丰富。虽然安静但享受深度思考,自然而然地担任教导者角色。',
      career: '适合传递知识与智慧的领域——教授、医生、咨询师、宗教人士、研究者。在教育和学术领域取得优异成就,通过专业资格和学位发展职业较为有利。',
      relationship: '关怀备至的温暖恋人。真心支持对方的成长,重视精神上的纽带。默默地给予深沉的爱,在危机时刻成为坚实的支柱。',
      strength: '凭借深厚的智慧和学术能力,在任何地方都受人尊敬。善于担任帮助他人成长的导师角色。精神上的稳定感给周围人带来安心。',
      weakness: '可能过于被动且缺乏现实感,有停留在思考而非行动的倾向。需要提高执行力,积极把握机会。',
    },
  },
}

// ---------------------------------------------------------------------------
// Multilingual labels for sipsin pages
// ---------------------------------------------------------------------------

export const SIPSIN_LABELS: Record<Language, {
  pageTitle: string
  indexTitle: string
  indexSubtitle: string
  overview: string
  personality: string
  career: string
  relationship: string
  strength: string
  weakness: string
  interaction: string
  ctaText: string
  ctaButton: string
  backToIndex: string
  relatedSipsin: string
  pairLabel: string
}> = {
  ko: {
    pageTitle: '{name} — 성격, 직업, 연애 완전 해석',
    indexTitle: '십신(十神) 완전 가이드',
    indexSubtitle: '사주의 10가지 관계 에너지를 알아보세요',
    overview: '개요',
    personality: '성격과 기질',
    career: '직업과 적성',
    relationship: '연애와 관계',
    strength: '강점',
    weakness: '성장 포인트',
    interaction: '오행 작용',
    ctaText: '내 사주에 어떤 십신이 있을까?',
    ctaButton: '지금 바로 확인하기',
    backToIndex: '십신 목록',
    relatedSipsin: '관련 십신',
    pairLabel: '짝',
  },
  en: {
    pageTitle: '{name} — Personality, Career & Relationship Guide',
    indexTitle: 'Complete Guide to the Ten Gods (十神)',
    indexSubtitle: 'Discover the 10 relationship energies in Saju',
    overview: 'Overview',
    personality: 'Personality & Temperament',
    career: 'Career & Aptitude',
    relationship: 'Love & Relationships',
    strength: 'Strengths',
    weakness: 'Growth Areas',
    interaction: 'Five Element Interaction',
    ctaText: 'Which ten gods are in your chart?',
    ctaButton: 'Find Out Now',
    backToIndex: 'Ten Gods List',
    relatedSipsin: 'Related Ten Gods',
    pairLabel: 'Pair',
  },
  ja: {
    pageTitle: '{name} — 性格・仕事・恋愛を徹底解説',
    indexTitle: '十神（じっしん）完全ガイド',
    indexSubtitle: '四柱推命の10の関係エネルギーを学ぶ',
    overview: '概要',
    personality: '性格と気質',
    career: '仕事と適性',
    relationship: '恋愛と人間関係',
    strength: '強み',
    weakness: '成長ポイント',
    interaction: '五行の作用',
    ctaText: '自分の四柱にどの十神があるか知りたい？',
    ctaButton: '今すぐ確認する',
    backToIndex: '十神一覧',
    relatedSipsin: '関連する十神',
    pairLabel: 'ペア',
  },
  zh: {
    pageTitle: '{name} — 性格、事业、感情全面解析',
    indexTitle: '十神完全指南',
    indexSubtitle: '了解四柱八字中的10种关系能量',
    overview: '概述',
    personality: '性格与气质',
    career: '事业与适性',
    relationship: '感情与关系',
    strength: '优势',
    weakness: '成长空间',
    interaction: '五行作用',
    ctaText: '想知道你的八字中有哪些十神？',
    ctaButton: '立即查看',
    backToIndex: '十神列表',
    relatedSipsin: '相关十神',
    pairLabel: '配对',
  },
}

// ---------------------------------------------------------------------------
// Pair relationship labels by relation type
// ---------------------------------------------------------------------------

export const RELATION_TYPE_LABELS: Record<SipsinRelationType, Record<Language, string>> = {
  same: {
    ko: '비겁(比劫) — 나와 같은 기운',
    en: 'Comparison (比劫) — Same Element',
    ja: '比劫 — 自分と同じ気',
    zh: '比劫 — 与我相同的能量',
  },
  generate: {
    ko: '식상(食傷) — 내가 만드는 기운',
    en: 'Output (食傷) — Energy I Produce',
    ja: '食傷 — 自分が生み出す気',
    zh: '食伤 — 我产生的能量',
  },
  wealth: {
    ko: '재성(財星) — 내가 제어하는 기운',
    en: 'Wealth (財星) — Energy I Control',
    ja: '財星 — 自分が制御する気',
    zh: '财星 — 我控制的能量',
  },
  authority: {
    ko: '관성(官星) — 나를 제어하는 기운',
    en: 'Authority (官星) — Energy That Controls Me',
    ja: '官星 — 自分を制御する気',
    zh: '官星 — 控制我的能量',
  },
  resource: {
    ko: '인성(印星) — 나를 생하는 기운',
    en: 'Resource (印星) — Energy That Generates Me',
    ja: '印星 — 自分を生む気',
    zh: '印星 — 生助我的能量',
  },
}
