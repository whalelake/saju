import type { Language } from '../i18n'

// ---------------------------------------------------------------------------
// URL slug mapping for 10 heavenly stems (Korean romanization)
// ---------------------------------------------------------------------------

export const COMPAT_SLUGS: Record<string, string> = {
  '甲': 'gap', '乙': 'eul', '丙': 'byeong', '丁': 'jeong', '戊': 'mu',
  '己': 'gi', '庚': 'gyeong', '辛': 'sin', '壬': 'im', '癸': 'gye',
}

export const SLUG_TO_STEM: Record<string, string> = Object.fromEntries(
  Object.entries(COMPAT_SLUGS).map(([k, v]) => [v, k])
)

export const ALL_COMPAT_SLUGS = Object.values(COMPAT_SLUGS)

export const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const

// ---------------------------------------------------------------------------
// Ten Gods relationship lookup
// Element cycle: tree(木) -> fire(火) -> earth(土) -> metal(金) -> water(水) -> tree
// ---------------------------------------------------------------------------

type StemElement = 'tree' | 'fire' | 'earth' | 'metal' | 'water'
type YinYang = '+' | '-'

const STEM_META: Record<string, { element: StemElement; yy: YinYang }> = {
  '甲': { element: 'tree', yy: '+' },
  '乙': { element: 'tree', yy: '-' },
  '丙': { element: 'fire', yy: '+' },
  '丁': { element: 'fire', yy: '-' },
  '戊': { element: 'earth', yy: '+' },
  '己': { element: 'earth', yy: '-' },
  '庚': { element: 'metal', yy: '+' },
  '辛': { element: 'metal', yy: '-' },
  '壬': { element: 'water', yy: '+' },
  '癸': { element: 'water', yy: '-' },
}

const ELEMENT_CYCLE = ['tree', 'fire', 'earth', 'metal', 'water'] as const

/**
 * Get the Ten God relationship from `me` to `target`.
 * Returns: 比肩 | 劫財 | 食神 | 傷官 | 偏財 | 正財 | 偏官 | 正官 | 偏印 | 正印
 */
export function getTenGodRelation(me: string, target: string): string {
  const m = STEM_META[me]
  const t = STEM_META[target]
  const mi = ELEMENT_CYCLE.indexOf(m.element)
  const ti = ELEMENT_CYCLE.indexOf(t.element)
  const diff = ((ti - mi) % 5 + 5) % 5
  const sameYY = m.yy === t.yy

  switch (diff) {
    case 0: return sameYY ? '比肩' : '劫財'
    case 1: return sameYY ? '食神' : '傷官'
    case 2: return sameYY ? '偏財' : '正財'
    case 3: return sameYY ? '偏官' : '正官'
    case 4: return sameYY ? '偏印' : '正印'
    default: return ''
  }
}

// ---------------------------------------------------------------------------
// Compatibility content for each pair (10 x 10 = 100 entries)
// ---------------------------------------------------------------------------

interface CompatEntry {
  score: number     // 1-5 compatibility score
  summary: string   // 1 sentence summary
  strength: string  // what works well
  challenge: string // potential friction
}

// We store content indexed by [me][target][lang]
export const COMPAT_CONTENT: Record<string, Record<string, Record<Language, CompatEntry>>> = {
  // ========== 甲 (양목, Yang Wood) ==========
  '甲': {
    '甲': {
      ko: { score: 3, summary: '같은 양목끼리 자존심이 강해 경쟁적이지만, 서로의 독립심을 이해합니다.', strength: '비슷한 가치관과 추진력으로 함께 성장할 수 있습니다.', challenge: '양보하지 않으려는 성향이 충돌을 일으킬 수 있습니다.' },
      en: { score: 3, summary: 'Two Yang Woods are competitive but understand each other\'s independence.', strength: 'Shared values and drive allow mutual growth.', challenge: 'Neither wants to back down, causing power struggles.' },
      ja: { score: 3, summary: '同じ陽木同士でプライドが高く競争的ですが、互いの独立心を理解します。', strength: '似た価値観と推進力で共に成長できます。', challenge: '譲らない性格がぶつかることがあります。' },
      zh: { score: 3, summary: '两个阳木自尊心强、竞争激烈，但能理解彼此的独立性。', strength: '相似的价值观和推动力使双方共同成长。', challenge: '互不退让的性格可能引发冲突。' },
    },
    '乙': {
      ko: { score: 3, summary: '큰 나무와 덩굴의 관계로, 甲이 보호하지만 乙은 때로 답답함을 느낍니다.', strength: '같은 목 오행으로 기본적인 이해와 공감이 있습니다.', challenge: '甲의 고집이 乙의 유연함과 부딪힐 수 있습니다.' },
      en: { score: 3, summary: 'A big tree and vine relationship — protective but sometimes stifling.', strength: 'Same Wood element creates natural understanding and empathy.', challenge: 'Gap\'s rigidity may clash with Eul\'s flexibility.' },
      ja: { score: 3, summary: '大木と蔓の関係で、甲が守りますが乙は窮屈に感じることも。', strength: '同じ木の五行で基本的な理解と共感があります。', challenge: '甲の頑固さが乙の柔軟さとぶつかることがあります。' },
      zh: { score: 3, summary: '大树与藤蔓的关系，甲保护乙，但乙有时感到压抑。', strength: '同属木行，有天然的理解与共鸣。', challenge: '甲的固执可能与乙的灵活性产生矛盾。' },
    },
    '丙': {
      ko: { score: 4, summary: '나무가 불을 키우는 상생 관계로, 甲이 丙에게 에너지를 줍니다.', strength: '甲의 아이디어가 丙의 열정으로 실현되어 시너지가 뛰어납니다.', challenge: '甲이 자신의 에너지를 지나치게 소모할 수 있습니다.' },
      en: { score: 4, summary: 'Wood feeds Fire — a nurturing relationship where Gap energizes Byeong.', strength: 'Gap\'s ideas fuel Byeong\'s passion, creating excellent synergy.', challenge: 'Gap may overextend and burn out giving too much.' },
      ja: { score: 4, summary: '木が火を生む相生関係で、甲が丙にエネルギーを与えます。', strength: '甲のアイデアが丙の情熱で実現され、シナジーが抜群です。', challenge: '甲が自分のエネルギーを使い果たすことがあります。' },
      zh: { score: 4, summary: '木生火的相生关系，甲为丙提供能量。', strength: '甲的创意被丙的热情实现，产生卓越的协同效应。', challenge: '甲可能过度消耗自身精力。' },
    },
    '丁': {
      ko: { score: 4, summary: '큰 나무가 촛불을 밝히듯, 甲이 丁을 따뜻하게 지원합니다.', strength: '甲의 안정감이 丁의 섬세한 감성에 힘을 더합니다.', challenge: '丁이 甲의 직선적 방식에 위축될 수 있습니다.' },
      en: { score: 4, summary: 'A great tree lighting a candle — Gap warmly supports Jeong.', strength: 'Gap\'s stability empowers Jeong\'s delicate sensitivity.', challenge: 'Jeong may feel overwhelmed by Gap\'s directness.' },
      ja: { score: 4, summary: '大木がろうそくを灯すように、甲が丁を温かく支えます。', strength: '甲の安定感が丁の繊細な感性に力を与えます。', challenge: '丁が甲の直線的なやり方に萎縮することがあります。' },
      zh: { score: 4, summary: '大树点亮烛火，甲温暖地支持丁。', strength: '甲的稳定感为丁细腻的感性增添力量。', challenge: '丁可能被甲的直接方式所压制。' },
    },
    '戊': {
      ko: { score: 4, summary: '나무가 뿌리를 내려 흙을 잡듯, 甲이 戊를 자연스럽게 제어합니다.', strength: '甲의 리더십이 戊의 안정적 기반 위에서 빛을 발합니다.', challenge: '甲이 戊를 지나치게 통제하려 할 수 있습니다.' },
      en: { score: 4, summary: 'Wood controls Earth — Gap naturally leads and shapes Mu.', strength: 'Gap\'s leadership shines on Mu\'s stable foundation.', challenge: 'Gap may try to control Mu too much.' },
      ja: { score: 4, summary: '木が根を張って土を掴むように、甲が戊を自然に制御します。', strength: '甲のリーダーシップが戊の安定した基盤の上で輝きます。', challenge: '甲が戊を過度にコントロールしようとすることがあります。' },
      zh: { score: 4, summary: '木克土，甲自然地引领和塑造戊。', strength: '甲的领导力在戊稳定的基础上大放异彩。', challenge: '甲可能过度控制戊。' },
    },
    '己': {
      ko: { score: 5, summary: '甲己合, 천간합의 대표적 조합으로 자연스러운 끌림이 있습니다.', strength: '서로 부족한 부분을 정확히 채워주는 천생연분입니다.', challenge: '합의 에너지가 지나치면 외부 활동이 줄어들 수 있습니다.' },
      en: { score: 5, summary: 'Gap-Gi Combination — the classic heavenly stem union with natural attraction.', strength: 'They perfectly complement each other\'s weaknesses, a destined match.', challenge: 'The merging energy may reduce outside activities and ambition.' },
      ja: { score: 5, summary: '甲己合、天干合の代表的な組み合わせで自然な引力があります。', strength: 'お互いの不足を正確に補い合う天生の縁です。', challenge: '合のエネルギーが強すぎると外部活動が減ることがあります。' },
      zh: { score: 5, summary: '甲己合，天干合的经典组合，有天然的吸引力。', strength: '彼此精确地弥补对方的不足，天作之合。', challenge: '合化能量过强可能减少外部活动。' },
    },
    '庚': {
      ko: { score: 2, summary: '금이 나무를 베는 상극 관계로, 庚이 甲에게 강한 압박을 줍니다.', strength: '庚의 날카로운 피드백이 甲의 성장을 자극할 수 있습니다.', challenge: '庚의 직접적 비판이 甲의 자존심을 크게 상하게 합니다.' },
      en: { score: 2, summary: 'Metal chops Wood — Gyeong pressures Gap strongly.', strength: 'Gyeong\'s sharp feedback can stimulate Gap\'s growth.', challenge: 'Gyeong\'s direct criticism deeply wounds Gap\'s pride.' },
      ja: { score: 2, summary: '金が木を伐る相剋関係で、庚が甲に強い圧力をかけます。', strength: '庚の鋭いフィードバックが甲の成長を刺激できます。', challenge: '庚の直接的な批判が甲のプライドを大きく傷つけます。' },
      zh: { score: 2, summary: '金克木，庚对甲施加强大压力。', strength: '庚的锐利反馈能刺激甲的成长。', challenge: '庚的直接批评严重伤害甲的自尊心。' },
    },
    '辛': {
      ko: { score: 3, summary: '보석이 나무를 다듬듯, 辛이 甲을 세련되게 만들어줍니다.', strength: '辛의 섬세함이 甲의 거친 면을 부드럽게 다듬어줍니다.', challenge: '辛의 예민함이 甲의 둔감함과 갈등을 만들 수 있습니다.' },
      en: { score: 3, summary: 'A jewel carves wood — Sin refines Gap with elegance.', strength: 'Sin\'s delicacy polishes Gap\'s rough edges.', challenge: 'Sin\'s sensitivity may clash with Gap\'s bluntness.' },
      ja: { score: 3, summary: '宝石が木を研ぐように、辛が甲を洗練させます。', strength: '辛の繊細さが甲の荒い面を柔らかく整えます。', challenge: '辛の繊細さが甲の鈍感さと衝突することがあります。' },
      zh: { score: 3, summary: '宝石雕琢木材，辛使甲变得更精致。', strength: '辛的细腻打磨甲的粗糙面。', challenge: '辛的敏感可能与甲的迟钝产生矛盾。' },
    },
    '壬': {
      ko: { score: 5, summary: '물이 나무를 키우는 상생 관계로, 壬이 甲에게 무한한 자양분을 줍니다.', strength: '壬의 지혜와 포용력이 甲의 성장을 든든히 뒷받침합니다.', challenge: '壬의 과한 보살핌이 甲의 독립심을 약화시킬 수 있습니다.' },
      en: { score: 5, summary: 'Water nourishes Wood — Im provides boundless nourishment to Gap.', strength: 'Im\'s wisdom and inclusiveness powerfully support Gap\'s growth.', challenge: 'Im\'s excessive care may weaken Gap\'s independence.' },
      ja: { score: 5, summary: '水が木を育てる相生関係で、壬が甲に無限の養分を与えます。', strength: '壬の知恵と包容力が甲の成長をしっかり支えます。', challenge: '壬の過度な世話が甲の独立心を弱めることがあります。' },
      zh: { score: 5, summary: '水生木，壬为甲提供无限的滋养。', strength: '壬的智慧与包容力有力地支撑甲的成长。', challenge: '壬过度的关怀可能削弱甲的独立性。' },
    },
    '癸': {
      ko: { score: 4, summary: '이슬비가 나무를 적시듯, 癸가 甲에게 섬세한 도움을 줍니다.', strength: '癸의 조용한 지원이 甲에게 정서적 안정감을 줍니다.', challenge: '甲이 癸의 소극적 태도에 답답함을 느낄 수 있습니다.' },
      en: { score: 4, summary: 'Like gentle rain watering a tree, Gye offers delicate support to Gap.', strength: 'Gye\'s quiet support gives Gap emotional stability.', challenge: 'Gap may feel frustrated by Gye\'s passive approach.' },
      ja: { score: 4, summary: '小雨が木を潤すように、癸が甲に繊細な助けを与えます。', strength: '癸の静かな支援が甲に情緒的安定感を与えます。', challenge: '甲が癸の消極的な態度にもどかしさを感じることがあります。' },
      zh: { score: 4, summary: '如细雨润木，癸为甲提供细腻的帮助。', strength: '癸的安静支持给甲带来情感上的稳定。', challenge: '甲可能对癸的被动态度感到沮丧。' },
    },
  },

  // ========== 乙 (음목, Yin Wood) ==========
  '乙': {
    '甲': {
      ko: { score: 3, summary: '덩굴이 큰 나무에 기대듯, 乙이 甲의 리더십에 의지합니다.', strength: '甲의 든든한 지원 아래 乙의 유연함이 발휘됩니다.', challenge: '乙이 甲에게 지나치게 의존할 수 있습니다.' },
      en: { score: 3, summary: 'A vine leaning on a great tree — Eul relies on Gap\'s leadership.', strength: 'Eul\'s flexibility thrives under Gap\'s solid support.', challenge: 'Eul may become overly dependent on Gap.' },
      ja: { score: 3, summary: '蔓が大木に寄り添うように、乙が甲のリーダーシップに頼ります。', strength: '甲のしっかりした支援の下で乙の柔軟さが発揮されます。', challenge: '乙が甲に過度に依存することがあります。' },
      zh: { score: 3, summary: '藤蔓依附大树，乙依靠甲的领导力。', strength: '在甲的坚实支持下，乙的灵活性得以发挥。', challenge: '乙可能过度依赖甲。' },
    },
    '乙': {
      ko: { score: 3, summary: '같은 음목끼리 부드럽고 조화롭지만, 결단력이 부족할 수 있습니다.', strength: '감성적 교감이 뛰어나고 서로를 잘 이해합니다.', challenge: '둘 다 소극적이어서 중요한 결정을 미루기 쉽습니다.' },
      en: { score: 3, summary: 'Two Yin Woods are gentle and harmonious but may lack decisiveness.', strength: 'Excellent emotional connection and mutual understanding.', challenge: 'Both are passive, making important decisions difficult.' },
      ja: { score: 3, summary: '同じ陰木同士で穏やかで調和的ですが、決断力に欠けることがあります。', strength: '感性的な交流が優れており、互いをよく理解します。', challenge: '二人とも消極的で、重要な決定を先延ばしにしがちです。' },
      zh: { score: 3, summary: '两个阴木温柔和谐，但可能缺乏决断力。', strength: '情感交流出色，彼此理解深刻。', challenge: '双方都较被动，容易推迟重要决定。' },
    },
    '丙': {
      ko: { score: 4, summary: '꽃이 햇빛을 받아 피어나듯, 乙이 丙의 열정에 힘을 얻습니다.', strength: '丙의 밝은 에너지가 乙의 잠재력을 끌어냅니다.', challenge: '丙의 강렬함에 乙이 압도당할 수 있습니다.' },
      en: { score: 4, summary: 'Like a flower blooming in sunlight, Eul gains energy from Byeong\'s passion.', strength: 'Byeong\'s bright energy draws out Eul\'s hidden potential.', challenge: 'Eul may feel overwhelmed by Byeong\'s intensity.' },
      ja: { score: 4, summary: '花が日差しを受けて咲くように、乙が丙の情熱から力を得ます。', strength: '丙の明るいエネルギーが乙の潜在力を引き出します。', challenge: '丙の強烈さに乙が圧倒されることがあります。' },
      zh: { score: 4, summary: '如花朵在阳光下绽放，乙从丙的热情中获得力量。', strength: '丙的明亮能量激发乙的潜力。', challenge: '乙可能被丙的强烈气场所压制。' },
    },
    '丁': {
      ko: { score: 4, summary: '화초와 촛불의 아늑한 관계로, 서로 따뜻하게 교감합니다.', strength: '둘 다 섬세하여 감정적 유대가 매우 깊습니다.', challenge: '감정에 치우쳐 현실적 문제를 간과할 수 있습니다.' },
      en: { score: 4, summary: 'A cozy relationship of flowers and candlelight, sharing warmth.', strength: 'Both are delicate, forming very deep emotional bonds.', challenge: 'May overlook practical matters due to emotional focus.' },
      ja: { score: 4, summary: '草花とろうそくの温かい関係で、互いに温かく交流します。', strength: '二人とも繊細で、感情的な絆が非常に深いです。', challenge: '感情に偏って現実的な問題を見落とすことがあります。' },
      zh: { score: 4, summary: '花草与烛光的温馨关系，彼此温暖交流。', strength: '两人都很细腻，情感纽带极深。', challenge: '可能因情感偏重而忽视现实问题。' },
    },
    '戊': {
      ko: { score: 4, summary: '풀이 대지에 뿌리를 내리듯, 乙이 戊 위에서 안정적으로 자랍니다.', strength: '戊의 넉넉한 포용력이 乙에게 안정적 환경을 제공합니다.', challenge: '乙이 戊의 변화 없는 태도에 지루함을 느낄 수 있습니다.' },
      en: { score: 4, summary: 'Grass rooting in earth — Eul grows stably upon Mu\'s support.', strength: 'Mu\'s generous embrace provides a stable environment for Eul.', challenge: 'Eul may feel bored by Mu\'s unchanging attitude.' },
      ja: { score: 4, summary: '草が大地に根を張るように、乙が戊の上で安定して育ちます。', strength: '戊の寛大な包容力が乙に安定した環境を提供します。', challenge: '乙が戊の変化のない態度に退屈を感じることがあります。' },
      zh: { score: 4, summary: '草扎根大地，乙在戊的支持下稳定成长。', strength: '戊宽厚的包容力为乙提供稳定的环境。', challenge: '乙可能对戊一成不变的态度感到厌倦。' },
    },
    '己': {
      ko: { score: 4, summary: '화초가 비옥한 밭에서 피어나듯, 乙이 己에게서 자양분을 얻습니다.', strength: '己의 부드러운 배려가 乙의 성장을 돕습니다.', challenge: '둘 다 우유부단하여 진전이 더딜 수 있습니다.' },
      en: { score: 4, summary: 'Flowers blooming in fertile soil — Eul gains nourishment from Gi.', strength: 'Gi\'s gentle care helps Eul flourish.', challenge: 'Both are indecisive, which may slow progress.' },
      ja: { score: 4, summary: '草花が肥沃な畑で咲くように、乙が己から養分を得ます。', strength: '己の穏やかな配慮が乙の成長を助けます。', challenge: '二人とも優柔不断で、進展が遅くなることがあります。' },
      zh: { score: 4, summary: '花草在肥沃的土壤中绽放，乙从己获得滋养。', strength: '己温柔的关怀帮助乙成长。', challenge: '两人都优柔寡断，可能进展缓慢。' },
    },
    '庚': {
      ko: { score: 5, summary: '乙庚合, 천간합으로 부드러움과 강함이 절묘하게 어울립니다.', strength: '庚의 결단력과 乙의 유연함이 완벽한 균형을 이룹니다.', challenge: '합의 끌림이 강해 주변을 소홀히 할 수 있습니다.' },
      en: { score: 5, summary: 'Eul-Gyeong Combination — softness and strength in perfect harmony.', strength: 'Gyeong\'s decisiveness and Eul\'s flexibility create perfect balance.', challenge: 'The strong attraction may lead to neglecting others.' },
      ja: { score: 5, summary: '乙庚合、天干合で柔らかさと強さが絶妙に調和します。', strength: '庚の決断力と乙の柔軟さが完璧なバランスを生みます。', challenge: '合の引力が強すぎて周囲を疎かにすることがあります。' },
      zh: { score: 5, summary: '乙庚合，天干合，柔与刚完美融合。', strength: '庚的果断与乙的灵活形成完美平衡。', challenge: '强烈的吸引力可能导致忽视周围。' },
    },
    '辛': {
      ko: { score: 2, summary: '가위가 꽃을 자르듯, 辛이 乙에게 날카로운 상처를 줄 수 있습니다.', strength: '辛의 정교함이 乙의 재능을 다듬어줄 수 있습니다.', challenge: '辛의 비판이 乙의 여린 마음에 깊은 상처가 됩니다.' },
      en: { score: 2, summary: 'Like scissors cutting flowers — Sin can wound Eul sharply.', strength: 'Sin\'s precision can refine Eul\'s talents.', challenge: 'Sin\'s criticism deeply hurts Eul\'s tender heart.' },
      ja: { score: 2, summary: 'ハサミが花を切るように、辛が乙に鋭い傷を与えることがあります。', strength: '辛の精巧さが乙の才能を磨くことができます。', challenge: '辛の批判が乙の繊細な心に深い傷を残します。' },
      zh: { score: 2, summary: '如剪刀裁花，辛可能对乙造成尖锐的伤害。', strength: '辛的精致能打磨乙的才华。', challenge: '辛的批评深深伤害乙柔软的内心。' },
    },
    '壬': {
      ko: { score: 4, summary: '큰 강물이 들판의 풀을 적시듯, 壬이 乙에게 풍부한 자원을 줍니다.', strength: '壬의 넉넉한 지원이 乙의 성장에 큰 도움이 됩니다.', challenge: '壬의 거대한 에너지가 乙을 떠내려 보낼 수 있습니다.' },
      en: { score: 4, summary: 'A great river watering meadow grass — Im provides abundant resources to Eul.', strength: 'Im\'s generous support greatly helps Eul\'s growth.', challenge: 'Im\'s overwhelming energy may sweep Eul away.' },
      ja: { score: 4, summary: '大河が野の草を潤すように、壬が乙に豊富な資源を与えます。', strength: '壬の寛大な支援が乙の成長に大きく役立ちます。', challenge: '壬の巨大なエネルギーが乙を押し流すことがあります。' },
      zh: { score: 4, summary: '大河灌溉原野之草，壬为乙提供丰富资源。', strength: '壬的慷慨支持对乙的成长大有帮助。', challenge: '壬巨大的能量可能将乙冲走。' },
    },
    '癸': {
      ko: { score: 5, summary: '이슬비가 화초를 키우듯, 癸가 乙에게 가장 적합한 도움을 줍니다.', strength: '癸의 섬세한 보살핌이 乙의 감성과 완벽하게 어울립니다.', challenge: '둘 다 내성적이라 관계가 정체될 수 있습니다.' },
      en: { score: 5, summary: 'Light rain nurturing flowers — Gye provides the perfect support for Eul.', strength: 'Gye\'s delicate care perfectly matches Eul\'s sensibility.', challenge: 'Both are introverted, which may stagnate the relationship.' },
      ja: { score: 5, summary: '霧雨が草花を育てるように、癸が乙に最適な助けを与えます。', strength: '癸の繊細な世話が乙の感性と完璧にマッチします。', challenge: '二人とも内向的で、関係が停滞することがあります。' },
      zh: { score: 5, summary: '细雨养花，癸为乙提供最合适的帮助。', strength: '癸细腻的照料与乙的感性完美契合。', challenge: '两人都内向，关系可能停滞。' },
    },
  },

  // ========== 丙 (양화, Yang Fire) ==========
  '丙': {
    '甲': {
      ko: { score: 5, summary: '나무가 불을 키워주는 상생으로, 甲이 丙에게 끊임없는 연료가 됩니다.', strength: '甲의 풍부한 아이디어가 丙의 열정을 지속시킵니다.', challenge: '丙이 甲의 자원을 너무 빨리 소진시킬 수 있습니다.' },
      en: { score: 5, summary: 'Wood fuels Fire — Gap provides endless fuel for Byeong.', strength: 'Gap\'s abundant ideas sustain Byeong\'s passion.', challenge: 'Byeong may exhaust Gap\'s resources too quickly.' },
      ja: { score: 5, summary: '木が火を生む相生で、甲が丙に絶え間ない燃料になります。', strength: '甲の豊富なアイデアが丙の情熱を持続させます。', challenge: '丙が甲の資源を早く使い果たすことがあります。' },
      zh: { score: 5, summary: '木生火，甲为丙提供源源不断的燃料。', strength: '甲丰富的创意维持丙的热情。', challenge: '丙可能过快消耗甲的资源。' },
    },
    '乙': {
      ko: { score: 4, summary: '작은 풀이 타오르듯, 乙이 丙의 불꽃에 순간적 에너지를 더합니다.', strength: '乙의 유연한 지원이 丙의 활동 범위를 넓혀줍니다.', challenge: '乙이 丙의 강렬함에 쉽게 지칠 수 있습니다.' },
      en: { score: 4, summary: 'Small grass catching fire — Eul adds bursts of energy to Byeong.', strength: 'Eul\'s flexible support broadens Byeong\'s range of action.', challenge: 'Eul may tire easily from Byeong\'s intensity.' },
      ja: { score: 4, summary: '小さな草が燃えるように、乙が丙の炎に瞬間的エネルギーを加えます。', strength: '乙の柔軟な支援が丙の活動範囲を広げます。', challenge: '乙が丙の強烈さにすぐ疲れることがあります。' },
      zh: { score: 4, summary: '小草添火，乙为丙增添瞬间能量。', strength: '乙灵活的支持拓展丙的活动范围。', challenge: '乙可能因丙的强烈气势而疲惫。' },
    },
    '丙': {
      ko: { score: 3, summary: '두 개의 태양이 만나면 눈부시지만, 서로 양보하기 어렵습니다.', strength: '함께하면 엄청난 에너지와 추진력이 생깁니다.', challenge: '둘 다 주목받고 싶어 하여 충돌이 잦습니다.' },
      en: { score: 3, summary: 'Two suns meet — dazzling but hard to share the spotlight.', strength: 'Together they create tremendous energy and drive.', challenge: 'Both want attention, causing frequent clashes.' },
      ja: { score: 3, summary: '二つの太陽が出会えば眩しいですが、互いに譲るのが難しいです。', strength: '一緒にいると凄まじいエネルギーと推進力が生まれます。', challenge: '二人とも注目されたがり、衝突が頻繁です。' },
      zh: { score: 3, summary: '两个太阳相遇，耀眼但难以分享聚光灯。', strength: '在一起能产生巨大的能量和推动力。', challenge: '两人都想成为焦点，冲突频繁。' },
    },
    '丁': {
      ko: { score: 3, summary: '큰 불과 촛불의 만남으로, 丙이 丁을 압도하기 쉽습니다.', strength: '같은 화 오행으로 열정과 목표를 공유합니다.', challenge: '丙의 존재감에 丁이 묻히기 쉽습니다.' },
      en: { score: 3, summary: 'A bonfire meets a candle — Byeong easily overshadows Jeong.', strength: 'Same Fire element shares passion and goals.', challenge: 'Jeong gets easily overshadowed by Byeong\'s presence.' },
      ja: { score: 3, summary: '大火とろうそくの出会いで、丙が丁を圧倒しがちです。', strength: '同じ火の五行で情熱と目標を共有します。', challenge: '丙の存在感に丁が埋もれがちです。' },
      zh: { score: 3, summary: '大火与烛光相遇，丙容易压倒丁。', strength: '同属火行，共享热情与目标。', challenge: '丁容易被丙的存在感所掩盖。' },
    },
    '戊': {
      ko: { score: 4, summary: '불이 흙을 만들듯, 丙이 戊에게 활력과 에너지를 전해줍니다.', strength: '丙의 열정이 戊의 안정된 기반에 활기를 불어넣습니다.', challenge: '丙이 지치면 戊에게 줄 에너지가 부족해질 수 있습니다.' },
      en: { score: 4, summary: 'Fire creates Earth — Byeong transmits vitality and energy to Mu.', strength: 'Byeong\'s passion breathes life into Mu\'s stable foundation.', challenge: 'When Byeong is exhausted, energy for Mu runs short.' },
      ja: { score: 4, summary: '火が土を生むように、丙が戊に活力とエネルギーを伝えます。', strength: '丙の情熱が戊の安定した基盤に活気を吹き込みます。', challenge: '丙が疲れると戊に与えるエネルギーが不足することがあります。' },
      zh: { score: 4, summary: '火生土，丙向戊传递活力与能量。', strength: '丙的热情为戊稳定的基础注入活力。', challenge: '丙疲惫时，给戊的能量可能不足。' },
    },
    '己': {
      ko: { score: 4, summary: '태양이 들판을 비추듯, 丙이 己를 환하게 밝혀줍니다.', strength: '丙의 밝은 에너지가 己의 잠재된 능력을 깨워줍니다.', challenge: '丙이 己의 신중함을 답답하게 느낄 수 있습니다.' },
      en: { score: 4, summary: 'Sunlight illuminating a field — Byeong brightens Gi\'s world.', strength: 'Byeong\'s bright energy awakens Gi\'s hidden abilities.', challenge: 'Byeong may find Gi\'s caution frustrating.' },
      ja: { score: 4, summary: '太陽が野原を照らすように、丙が己を明るく照らします。', strength: '丙の明るいエネルギーが己の潜在能力を目覚めさせます。', challenge: '丙が己の慎重さをもどかしく感じることがあります。' },
      zh: { score: 4, summary: '阳光照耀田野，丙照亮己的世界。', strength: '丙明亮的能量唤醒己潜藏的能力。', challenge: '丙可能觉得己的谨慎令人焦急。' },
    },
    '庚': {
      ko: { score: 4, summary: '불이 쇠를 녹여 유용한 도구를 만들듯, 丙이 庚을 다듬어줍니다.', strength: '丙의 열정이 庚의 강함을 유연하고 실용적으로 변화시킵니다.', challenge: '庚이 丙의 통제에 강하게 저항할 수 있습니다.' },
      en: { score: 4, summary: 'Fire melts Metal into useful tools — Byeong refines Gyeong.', strength: 'Byeong\'s passion transforms Gyeong\'s strength into flexibility.', challenge: 'Gyeong may strongly resist Byeong\'s attempts to reshape.' },
      ja: { score: 4, summary: '火が金属を溶かして道具を作るように、丙が庚を鍛えます。', strength: '丙の情熱が庚の強さを柔軟で実用的に変えます。', challenge: '庚が丙の統制に強く抵抗することがあります。' },
      zh: { score: 4, summary: '火炼金成器，丙打磨庚。', strength: '丙的热情将庚的刚强转化为灵活与实用。', challenge: '庚可能强烈抵抗丙的改造。' },
    },
    '辛': {
      ko: { score: 5, summary: '丙辛合, 천간합으로 태양과 보석의 만남처럼 화려합니다.', strength: '丙의 열정과 辛의 아름다움이 서로를 더욱 빛나게 합니다.', challenge: '합화 후 수로 변하면 본래의 성격이 약해질 수 있습니다.' },
      en: { score: 5, summary: 'Byeong-Sin Combination — a dazzling union of sun and jewel.', strength: 'Byeong\'s passion and Sin\'s beauty make each other shine brighter.', challenge: 'After merging, original personalities may weaken.' },
      ja: { score: 5, summary: '丙辛合、天干合で太陽と宝石の出会いのように華やかです。', strength: '丙の情熱と辛の美しさが互いをより輝かせます。', challenge: '合化後に本来の性格が弱まることがあります。' },
      zh: { score: 5, summary: '丙辛合，天干合，如太阳与宝石的璀璨相遇。', strength: '丙的热情与辛的美丽让彼此更加闪耀。', challenge: '合化后原本的性格可能减弱。' },
    },
    '壬': {
      ko: { score: 2, summary: '물이 불을 끄듯, 壬이 丙의 열정을 억누를 수 있습니다.', strength: '壬의 냉정함이 丙의 과열을 적절히 조절해줍니다.', challenge: '壬의 제약이 丙의 자유로운 표현을 크게 억압합니다.' },
      en: { score: 2, summary: 'Water quenches Fire — Im can suppress Byeong\'s passion.', strength: 'Im\'s coolness appropriately regulates Byeong\'s overheating.', challenge: 'Im\'s constraints greatly suppress Byeong\'s free expression.' },
      ja: { score: 2, summary: '水が火を消すように、壬が丙の情熱を抑えることがあります。', strength: '壬の冷静さが丙の過熱を適切に調節します。', challenge: '壬の制約が丙の自由な表現を大きく抑圧します。' },
      zh: { score: 2, summary: '水克火，壬可能压制丙的热情。', strength: '壬的冷静适当调节丙的过热。', challenge: '壬的限制极大地压制丙的自由表达。' },
    },
    '癸': {
      ko: { score: 3, summary: '이슬이 태양에 증발하듯, 丙 앞에서 癸의 영향력이 약해집니다.', strength: '丙의 따뜻함이 癸의 차가움을 녹여 균형을 맞춥니다.', challenge: '癸가 丙의 강한 에너지에 존재감을 잃을 수 있습니다.' },
      en: { score: 3, summary: 'Dew evaporating in sunlight — Gye\'s influence weakens before Byeong.', strength: 'Byeong\'s warmth melts Gye\'s coldness, creating balance.', challenge: 'Gye may lose presence under Byeong\'s strong energy.' },
      ja: { score: 3, summary: '露が太陽に蒸発するように、丙の前で癸の影響力が弱まります。', strength: '丙の温かさが癸の冷たさを溶かしてバランスを取ります。', challenge: '癸が丙の強いエネルギーに存在感を失うことがあります。' },
      zh: { score: 3, summary: '露水在阳光下蒸发，癸的影响力在丙面前减弱。', strength: '丙的温暖融化癸的冷淡，创造平衡。', challenge: '癸可能在丙强大的能量下失去存在感。' },
    },
  },

  // ========== 丁 (음화, Yin Fire) ==========
  '丁': {
    '甲': {
      ko: { score: 5, summary: '장작이 촛불을 활활 타오르게 하듯, 甲이 丁에게 최고의 연료입니다.', strength: '甲의 든든한 지원이 丁의 재능을 크게 빛나게 합니다.', challenge: '丁이 甲에게 지나치게 의존할 위험이 있습니다.' },
      en: { score: 5, summary: 'Firewood making a candle blaze — Gap is the best fuel for Jeong.', strength: 'Gap\'s solid support makes Jeong\'s talents shine brilliantly.', challenge: 'Jeong risks becoming too dependent on Gap.' },
      ja: { score: 5, summary: '薪がろうそくを燃え上がらせるように、甲が丁に最高の燃料です。', strength: '甲のしっかりした支援が丁の才能を大きく輝かせます。', challenge: '丁が甲に過度に依存する危険があります。' },
      zh: { score: 5, summary: '柴薪使烛火熊熊燃烧，甲是丁最好的燃料。', strength: '甲的坚实支持让丁的才华大放异彩。', challenge: '丁有过度依赖甲的风险。' },
    },
    '乙': {
      ko: { score: 4, summary: '마른 풀이 촛불의 좋은 불쏘시개가 되듯, 乙이 丁에게 도움을 줍니다.', strength: '乙의 섬세한 감성이 丁의 창의력에 영감을 줍니다.', challenge: '둘 다 감정적이어서 객관적 판단이 어려울 수 있습니다.' },
      en: { score: 4, summary: 'Dry grass as kindling for a candle — Eul provides support to Jeong.', strength: 'Eul\'s delicate sensibility inspires Jeong\'s creativity.', challenge: 'Both are emotional, making objective judgment difficult.' },
      ja: { score: 4, summary: '枯れ草がろうそくの良い焚きつけになるように、乙が丁を助けます。', strength: '乙の繊細な感性が丁の創造力にインスピレーションを与えます。', challenge: '二人とも感情的で、客観的な判断が難しくなることがあります。' },
      zh: { score: 4, summary: '干草为烛火的好引火物，乙为丁提供帮助。', strength: '乙细腻的感性激发丁的创造力。', challenge: '两人都感性，可能难以做出客观判断。' },
    },
    '丙': {
      ko: { score: 3, summary: '거대한 태양 옆의 촛불로, 丁이 丙에 비해 존재감이 약해집니다.', strength: '같은 화 오행으로 목표와 열정을 공유합니다.', challenge: '丁이 丙의 그늘에 가려 자신을 드러내기 어렵습니다.' },
      en: { score: 3, summary: 'A candle beside the sun — Jeong\'s presence weakens next to Byeong.', strength: 'Same Fire element allows sharing goals and passion.', challenge: 'Jeong struggles to stand out in Byeong\'s shadow.' },
      ja: { score: 3, summary: '巨大な太陽の横のろうそくで、丁が丙に比べ存在感が弱まります。', strength: '同じ火の五行で目標と情熱を共有します。', challenge: '丁が丙の影に隠れて自分を表現しにくくなります。' },
      zh: { score: 3, summary: '太阳旁的烛光，丁在丙面前存在感减弱。', strength: '同属火行，共享目标与热情。', challenge: '丁难以在丙的阴影下展现自己。' },
    },
    '丁': {
      ko: { score: 3, summary: '두 개의 촛불이 만나 밝지만, 바람에 함께 꺼지기 쉽습니다.', strength: '서로의 섬세함을 깊이 이해하고 공감합니다.', challenge: '외부 압력에 취약하여 함께 흔들릴 수 있습니다.' },
      en: { score: 3, summary: 'Two candles together are bright but easily blown out by wind.', strength: 'Deep understanding and empathy for each other\'s delicacy.', challenge: 'Vulnerable to external pressure, they may waver together.' },
      ja: { score: 3, summary: '二つのろうそくが出会えば明るいですが、風に一緒に消えやすいです。', strength: '互いの繊細さを深く理解し共感します。', challenge: '外部の圧力に弱く、一緒に揺れることがあります。' },
      zh: { score: 3, summary: '两支蜡烛一起虽明亮，但容易被风同时吹灭。', strength: '深刻理解并共鸣彼此的细腻。', challenge: '对外部压力脆弱，可能一起动摇。' },
    },
    '戊': {
      ko: { score: 4, summary: '촛불이 대지를 비추듯, 丁이 戊에게 따뜻한 빛을 전합니다.', strength: '丁의 따뜻함이 戊의 묵직함에 온기를 더합니다.', challenge: '戊의 무관심이 丁의 감정을 상하게 할 수 있습니다.' },
      en: { score: 4, summary: 'Candlelight illuminating earth — Jeong brings warm light to Mu.', strength: 'Jeong\'s warmth adds tenderness to Mu\'s solidity.', challenge: 'Mu\'s indifference may hurt Jeong\'s feelings.' },
      ja: { score: 4, summary: 'ろうそくが大地を照らすように、丁が戊に温かい光を伝えます。', strength: '丁の温かさが戊の重厚さに温もりを加えます。', challenge: '戊の無関心が丁の感情を傷つけることがあります。' },
      zh: { score: 4, summary: '烛光照耀大地，丁为戊带来温暖的光。', strength: '丁的温暖为戊的沉稳增添温情。', challenge: '戊的冷漠可能伤害丁的感情。' },
    },
    '己': {
      ko: { score: 4, summary: '등불이 정원을 은은하게 밝히듯, 丁과 己의 관계는 편안합니다.', strength: '己의 부드러운 성격이 丁의 감성과 잘 어울립니다.', challenge: '둘 다 수동적이라 관계의 발전 속도가 느립니다.' },
      en: { score: 4, summary: 'A lantern softly lighting a garden — Jeong and Gi share comfort.', strength: 'Gi\'s gentle nature harmonizes well with Jeong\'s sensibility.', challenge: 'Both are passive, slowing relationship progress.' },
      ja: { score: 4, summary: '灯りが庭園をほのかに照らすように、丁と己の関係は穏やかです。', strength: '己の穏やかな性格が丁の感性とよく合います。', challenge: '二人とも受動的で、関係の発展が遅くなります。' },
      zh: { score: 4, summary: '灯笼柔和地照亮花园，丁与己的关系舒适。', strength: '己温柔的性格与丁的感性相得益彰。', challenge: '两人都被动，关系发展速度缓慢。' },
    },
    '庚': {
      ko: { score: 3, summary: '촛불이 쇠를 녹이기는 어렵지만, 꾸준한 노력으로 변화를 이끕니다.', strength: '丁의 끈기가 庚의 마음을 서서히 움직입니다.', challenge: '庚의 냉정함이 丁의 따뜻한 마음에 상처를 줍니다.' },
      en: { score: 3, summary: 'A candle can\'t easily melt iron, but persistent effort brings change.', strength: 'Jeong\'s tenacity gradually moves Gyeong\'s heart.', challenge: 'Gyeong\'s coldness wounds Jeong\'s warm heart.' },
      ja: { score: 3, summary: 'ろうそくが鉄を溶かすのは難しいですが、粘り強い努力で変化を導きます。', strength: '丁の粘り強さが庚の心を徐々に動かします。', challenge: '庚の冷淡さが丁の温かい心を傷つけます。' },
      zh: { score: 3, summary: '烛火难以融铁，但持续的努力能带来改变。', strength: '丁的坚持逐渐打动庚的心。', challenge: '庚的冷淡伤害丁温暖的心灵。' },
    },
    '辛': {
      ko: { score: 3, summary: '촛불이 보석을 비추면 아름답지만, 서로의 영역이 다릅니다.', strength: '丁의 따뜻한 빛이 辛의 아름다움을 돋보이게 합니다.', challenge: '辛의 예민한 성격이 丁의 감정적 접근을 거부할 수 있습니다.' },
      en: { score: 3, summary: 'Candlelight on jewels is beautiful, but their domains differ.', strength: 'Jeong\'s warm glow highlights Sin\'s beauty.', challenge: 'Sin\'s sensitivity may reject Jeong\'s emotional approach.' },
      ja: { score: 3, summary: 'ろうそくが宝石を照らせば美しいですが、互いの領域が異なります。', strength: '丁の温かい光が辛の美しさを引き立てます。', challenge: '辛の繊細な性格が丁の感情的なアプローチを拒むことがあります。' },
      zh: { score: 3, summary: '烛光映照宝石虽美，但彼此的领域不同。', strength: '丁温暖的光芒衬托辛的美丽。', challenge: '辛敏感的性格可能拒绝丁的情感接近。' },
    },
    '壬': {
      ko: { score: 5, summary: '丁壬合, 천간합으로 물과 불이 서로를 완성하는 신비로운 결합입니다.', strength: '정반대의 성격이 오히려 완벽한 보완을 이루어냅니다.', challenge: '합이 깨지면 극과 극의 갈등이 발생할 수 있습니다.' },
      en: { score: 5, summary: 'Jeong-Im Combination — a mystical union where water and fire complete each other.', strength: 'Opposite personalities create perfect complementarity.', challenge: 'If the bond breaks, extreme conflicts may arise.' },
      ja: { score: 5, summary: '丁壬合、天干合で水と火が互いを完成させる神秘的な結合です。', strength: '正反対の性格がかえって完璧な補完を成し遂げます。', challenge: '合が破れると極端な対立が生じることがあります。' },
      zh: { score: 5, summary: '丁壬合，天干合，水与火相互成就的神秘结合。', strength: '截然相反的性格反而形成完美互补。', challenge: '合破裂时可能产生极端冲突。' },
    },
    '癸': {
      ko: { score: 2, summary: '빗물이 촛불을 꺼뜨리듯, 癸가 丁의 열정을 쉽게 꺾을 수 있습니다.', strength: '癸의 차분함이 丁의 과도한 감정을 진정시킵니다.', challenge: '癸의 비관적 태도가 丁의 의욕을 꺾습니다.' },
      en: { score: 2, summary: 'Rain extinguishing a candle — Gye can easily dampen Jeong\'s passion.', strength: 'Gye\'s calmness soothes Jeong\'s excessive emotions.', challenge: 'Gye\'s pessimism crushes Jeong\'s motivation.' },
      ja: { score: 2, summary: '雨がろうそくを消すように、癸が丁の情熱を簡単にくじくことがあります。', strength: '癸の落ち着きが丁の過度な感情を鎮めます。', challenge: '癸の悲観的な態度が丁の意欲をくじきます。' },
      zh: { score: 2, summary: '雨水熄灭烛火，癸容易打击丁的热情。', strength: '癸的冷静平抚丁过度的情感。', challenge: '癸的悲观态度打击丁的积极性。' },
    },
  },

  // ========== 戊 (양토, Yang Earth) ==========
  '戊': {
    '甲': {
      ko: { score: 3, summary: '나무가 산을 뚫고 자라듯, 甲이 戊를 극하지만 성장의 자극이 됩니다.', strength: '甲의 도전이 戊의 안정된 삶에 활력을 불어넣습니다.', challenge: '甲의 지속적 압박이 戊를 지치게 만들 수 있습니다.' },
      en: { score: 3, summary: 'Trees grow through mountains — Gap challenges Mu but stimulates growth.', strength: 'Gap\'s challenges bring vitality to Mu\'s settled life.', challenge: 'Gap\'s constant pressure may exhaust Mu.' },
      ja: { score: 3, summary: '木が山を突き破るように、甲が戊を剋しますが成長の刺激になります。', strength: '甲の挑戦が戊の安定した生活に活力を与えます。', challenge: '甲の持続的なプレッシャーが戊を疲れさせることがあります。' },
      zh: { score: 3, summary: '树木穿山而长，甲克戊但刺激成长。', strength: '甲的挑战为戊安定的生活注入活力。', challenge: '甲持续的压力可能令戊疲惫。' },
    },
    '乙': {
      ko: { score: 3, summary: '들판에 풀이 자라듯, 乙이 戊 위에서 조용히 세력을 넓힙니다.', strength: '乙의 부드러운 접근이 戊의 마음을 서서히 열어줍니다.', challenge: '乙의 집요함이 戊의 인내심을 시험할 수 있습니다.' },
      en: { score: 3, summary: 'Grass growing on plains — Eul quietly expands influence over Mu.', strength: 'Eul\'s gentle approach gradually opens Mu\'s heart.', challenge: 'Eul\'s persistence may test Mu\'s patience.' },
      ja: { score: 3, summary: '野原に草が生えるように、乙が戊の上で静かに勢力を広げます。', strength: '乙の穏やかなアプローチが戊の心を徐々に開きます。', challenge: '乙の執拗さが戊の忍耐を試すことがあります。' },
      zh: { score: 3, summary: '草在平原上生长，乙在戊之上悄然扩展势力。', strength: '乙温柔的方式逐渐打开戊的心扉。', challenge: '乙的执着可能考验戊的耐心。' },
    },
    '丙': {
      ko: { score: 5, summary: '태양이 대지를 비추면 만물이 자라듯, 丙이 戊에게 최고의 에너지원입니다.', strength: '丙의 열정이 戊의 잠재력을 끌어내 함께 번영합니다.', challenge: '丙에 지나치게 의존하면 자립 능력이 약해질 수 있습니다.' },
      en: { score: 5, summary: 'Sunlight on earth grows all things — Byeong is Mu\'s best energy source.', strength: 'Byeong\'s passion draws out Mu\'s potential for shared prosperity.', challenge: 'Over-reliance on Byeong may weaken self-sufficiency.' },
      ja: { score: 5, summary: '太陽が大地を照らせば万物が育つように、丙が戊に最高のエネルギー源です。', strength: '丙の情熱が戊の潜在力を引き出し、共に繁栄します。', challenge: '丙に過度に依存すると自立能力が弱まることがあります。' },
      zh: { score: 5, summary: '阳光照耀大地万物生长，丙是戊最好的能量源。', strength: '丙的热情激发戊的潜力，共同繁荣。', challenge: '过度依赖丙可能削弱自立能力。' },
    },
    '丁': {
      ko: { score: 4, summary: '따뜻한 등불 아래 편안한 집처럼, 丁이 戊에게 따뜻함을 줍니다.', strength: '丁의 섬세한 관심이 戊의 마음을 녹여줍니다.', challenge: '丁의 에너지가 약해지면 戊가 냉랭해질 수 있습니다.' },
      en: { score: 4, summary: 'Like a warm lantern in a cozy home — Jeong brings warmth to Mu.', strength: 'Jeong\'s delicate attention warms Mu\'s heart.', challenge: 'When Jeong\'s energy wanes, Mu may grow cold.' },
      ja: { score: 4, summary: '温かい灯りの下の安らぎの家のように、丁が戊に温もりを与えます。', strength: '丁の繊細な関心が戊の心を溶かします。', challenge: '丁のエネルギーが弱まると戊が冷淡になることがあります。' },
      zh: { score: 4, summary: '如温暖灯火下的舒适家园，丁为戊带来温暖。', strength: '丁细腻的关注温暖戊的心。', challenge: '丁的能量减弱时，戊可能变得冷淡。' },
    },
    '戊': {
      ko: { score: 3, summary: '산과 산이 마주하면 웅장하지만, 소통의 길이 막힐 수 있습니다.', strength: '서로의 안정감과 신뢰가 깊어 든든한 파트너십을 형성합니다.', challenge: '둘 다 고집이 세서 의견 충돌 시 양보가 어렵습니다.' },
      en: { score: 3, summary: 'Two mountains face each other — majestic but communication may be blocked.', strength: 'Deep mutual stability and trust form a solid partnership.', challenge: 'Both are stubborn, making compromise difficult.' },
      ja: { score: 3, summary: '山と山が向き合えば雄大ですが、意思疎通が遮られることがあります。', strength: '互いの安定感と信頼が深く、頼もしいパートナーシップを形成します。', challenge: '二人とも頑固で、意見衝突時に譲歩が難しいです。' },
      zh: { score: 3, summary: '两山相对雄伟壮观，但沟通可能受阻。', strength: '彼此深厚的稳定感与信任形成坚实的伙伴关系。', challenge: '两人都固执，意见冲突时难以妥协。' },
    },
    '己': {
      ko: { score: 3, summary: '큰 산과 들판이 이어지듯, 같은 토 오행으로 안정적이지만 변화가 없습니다.', strength: '서로의 신중함을 존중하며 안정적 관계를 유지합니다.', challenge: '변화와 혁신이 부족하여 정체될 수 있습니다.' },
      en: { score: 3, summary: 'Mountain connects to plains — same Earth element is stable but unchanging.', strength: 'Mutual respect for caution maintains a stable relationship.', challenge: 'Lack of change and innovation may cause stagnation.' },
      ja: { score: 3, summary: '大きな山と野原が繋がるように、同じ土の五行で安定的ですが変化がありません。', strength: '互いの慎重さを尊重し、安定した関係を維持します。', challenge: '変化と革新が不足して停滞することがあります。' },
      zh: { score: 3, summary: '大山连接平原，同属土行稳定但缺乏变化。', strength: '相互尊重彼此的谨慎，维持稳定关系。', challenge: '缺乏变化与创新，可能停滞不前。' },
    },
    '庚': {
      ko: { score: 4, summary: '산에서 금이 나오듯, 戊가 庚을 낳아 키워주는 상생 관계입니다.', strength: '戊의 넉넉한 품이 庚의 날카로운 능력을 발전시킵니다.', challenge: '庚이 戊의 자원을 지나치게 가져갈 수 있습니다.' },
      en: { score: 4, summary: 'Gold from mountains — Mu nurtures Gyeong in a generating relationship.', strength: 'Mu\'s generous nature develops Gyeong\'s sharp abilities.', challenge: 'Gyeong may take too much of Mu\'s resources.' },
      ja: { score: 4, summary: '山から金が出るように、戊が庚を生み育てる相生関係です。', strength: '戊の寛大な器が庚の鋭い能力を発展させます。', challenge: '庚が戊の資源を過度に取ることがあります。' },
      zh: { score: 4, summary: '山中出金，戊生庚的相生关系。', strength: '戊宽厚的胸怀发展庚锐利的能力。', challenge: '庚可能过度占用戊的资源。' },
    },
    '辛': {
      ko: { score: 4, summary: '대지에서 보석을 캐내듯, 戊가 辛에게 안정된 기반을 제공합니다.', strength: '戊의 포용력이 辛의 예민함을 감싸줍니다.', challenge: '辛이 戊를 너무 무딘 사람으로 여길 수 있습니다.' },
      en: { score: 4, summary: 'Mining jewels from earth — Mu provides a stable base for Sin.', strength: 'Mu\'s inclusiveness wraps around Sin\'s sensitivity.', challenge: 'Sin may view Mu as too dull.' },
      ja: { score: 4, summary: '大地から宝石を掘り出すように、戊が辛に安定した基盤を提供します。', strength: '戊の包容力が辛の繊細さを包み込みます。', challenge: '辛が戊をあまりにも鈍い人と見なすことがあります。' },
      zh: { score: 4, summary: '从大地中挖掘宝石，戊为辛提供稳定基础。', strength: '戊的包容力呵护辛的敏感。', challenge: '辛可能觉得戊太迟钝。' },
    },
    '壬': {
      ko: { score: 3, summary: '산이 큰 강물을 막듯, 戊가 壬의 흐름을 제어하려 합니다.', strength: '戊의 안정감이 壬의 변화무쌍함에 균형을 잡아줍니다.', challenge: '壬이 戊의 통제에서 벗어나려 끊임없이 시도합니다.' },
      en: { score: 3, summary: 'A mountain blocking a great river — Mu tries to control Im\'s flow.', strength: 'Mu\'s stability balances Im\'s unpredictability.', challenge: 'Im constantly tries to break free from Mu\'s control.' },
      ja: { score: 3, summary: '山が大河を堰き止めるように、戊が壬の流れを制御しようとします。', strength: '戊の安定感が壬の変化無双に均衡をもたらします。', challenge: '壬が戊のコントロールから逃れようと絶えず試みます。' },
      zh: { score: 3, summary: '山挡大河，戊试图控制壬的流向。', strength: '戊的稳定感平衡壬的变化无常。', challenge: '壬不断试图摆脱戊的控制。' },
    },
    '癸': {
      ko: { score: 5, summary: '戊癸合, 천간합으로 대지와 이슬이 만나 풍요를 이루는 조합입니다.', strength: '戊의 듬직함과 癸의 지혜가 결합하여 최고의 팀을 이룹니다.', challenge: '합화가 너무 강하면 외부와의 관계가 소홀해질 수 있습니다.' },
      en: { score: 5, summary: 'Mu-Gye Combination — earth and dew meeting to create abundance.', strength: 'Mu\'s reliability and Gye\'s wisdom combine into the ultimate team.', challenge: 'If the bond is too strong, outside relationships may suffer.' },
      ja: { score: 5, summary: '戊癸合、天干合で大地と露が出会い豊かさを成す組み合わせです。', strength: '戊の頼もしさと癸の知恵が結合して最高のチームを形成します。', challenge: '合化が強すぎると外部との関係が疎かになることがあります。' },
      zh: { score: 5, summary: '戊癸合，天干合，大地与露水相遇创造丰饶。', strength: '戊的可靠与癸的智慧结合，形成最佳团队。', challenge: '合化过强可能忽视外部关系。' },
    },
  },

  // ========== 己 (음토, Yin Earth) ==========
  '己': {
    '甲': {
      ko: { score: 5, summary: '甲己合, 비옥한 밭에 큰 나무가 자라는 천생의 궁합입니다.', strength: '甲의 추진력과 己의 수용력이 이상적인 균형을 만듭니다.', challenge: '己가 甲에게 모든 것을 맞추다 자신을 잃을 수 있습니다.' },
      en: { score: 5, summary: 'Gap-Gi Combination — a great tree growing in fertile soil, a destined match.', strength: 'Gap\'s drive and Gi\'s receptivity create ideal balance.', challenge: 'Gi may lose identity trying to accommodate Gap in everything.' },
      ja: { score: 5, summary: '甲己合、肥沃な畑に大木が育つ天生の相性です。', strength: '甲の推進力と己の受容力が理想的なバランスを作ります。', challenge: '己が甲にすべてを合わせて自分を見失うことがあります。' },
      zh: { score: 5, summary: '甲己合，肥沃之田长大树，天生的缘分。', strength: '甲的推动力与己的包容力形成理想平衡。', challenge: '己可能为迎合甲而失去自我。' },
    },
    '乙': {
      ko: { score: 3, summary: '밭에 잡초가 자라듯, 乙이 己의 에너지를 조금씩 빼앗아갑니다.', strength: '己의 넉넉함이 乙의 성장을 기꺼이 도와줍니다.', challenge: '乙이 己의 자원을 지나치게 소모시킬 수 있습니다.' },
      en: { score: 3, summary: 'Weeds growing in a field — Eul gradually draws energy from Gi.', strength: 'Gi\'s generosity willingly supports Eul\'s growth.', challenge: 'Eul may overuse Gi\'s resources.' },
      ja: { score: 3, summary: '畑に雑草が生えるように、乙が己のエネルギーを少しずつ奪います。', strength: '己の寛大さが乙の成長を喜んで助けます。', challenge: '乙が己の資源を過度に消耗させることがあります。' },
      zh: { score: 3, summary: '田地里长杂草，乙渐渐消耗己的能量。', strength: '己的宽厚乐意帮助乙成长。', challenge: '乙可能过度消耗己的资源。' },
    },
    '丙': {
      ko: { score: 4, summary: '햇볕이 밭을 따뜻하게 하듯, 丙이 己에게 활력을 불어넣습니다.', strength: '丙의 밝은 에너지가 己의 생산성을 높여줍니다.', challenge: '丙의 과한 열기가 己를 메마르게 할 수 있습니다.' },
      en: { score: 4, summary: 'Sunshine warming a field — Byeong breathes vitality into Gi.', strength: 'Byeong\'s bright energy boosts Gi\'s productivity.', challenge: 'Byeong\'s excessive heat may dry Gi out.' },
      ja: { score: 4, summary: '日差しが畑を温めるように、丙が己に活力を吹き込みます。', strength: '丙の明るいエネルギーが己の生産性を高めます。', challenge: '丙の過度な熱気が己を干からびさせることがあります。' },
      zh: { score: 4, summary: '阳光温暖田地，丙为己注入活力。', strength: '丙明亮的能量提高己的生产力。', challenge: '丙过度的热量可能使己干涸。' },
    },
    '丁': {
      ko: { score: 4, summary: '등불이 정원을 비추듯, 丁이 己에게 은은한 영감을 줍니다.', strength: '丁의 창의력이 己의 실용적 능력과 결합하면 좋은 결과를 냅니다.', challenge: '丁의 감정 기복을 己가 감당하기 어려울 수 있습니다.' },
      en: { score: 4, summary: 'A lantern lighting a garden — Jeong gives Gi subtle inspiration.', strength: 'Jeong\'s creativity combined with Gi\'s practicality yields good results.', challenge: 'Gi may struggle to handle Jeong\'s emotional fluctuations.' },
      ja: { score: 4, summary: '灯りが庭を照らすように、丁が己にほのかなインスピレーションを与えます。', strength: '丁の創造力と己の実用的な能力が結合して良い結果を生みます。', challenge: '丁の感情の起伏を己が受け止めるのが難しいことがあります。' },
      zh: { score: 4, summary: '灯笼照亮花园，丁给己带来柔和的灵感。', strength: '丁的创造力与己的实用能力结合产生好结果。', challenge: '己可能难以应对丁的情绪波动。' },
    },
    '戊': {
      ko: { score: 3, summary: '들판과 산의 만남으로, 안정적이지만 자극이 부족합니다.', strength: '같은 토 오행으로 서로의 생각과 가치관을 쉽게 이해합니다.', challenge: '둘 다 보수적이라 새로운 시도를 꺼립니다.' },
      en: { score: 3, summary: 'Plains meeting mountains — stable but lacking stimulation.', strength: 'Same Earth element makes understanding each other\'s values easy.', challenge: 'Both are conservative, reluctant to try new things.' },
      ja: { score: 3, summary: '野原と山の出会いで、安定的ですが刺激が不足しています。', strength: '同じ土の五行で互いの考えと価値観を容易に理解します。', challenge: '二人とも保守的で、新しい試みを避けがちです。' },
      zh: { score: 3, summary: '平原与山的相遇，稳定但缺乏刺激。', strength: '同属土行，容易理解彼此的想法和价值观。', challenge: '两人都保守，不愿尝试新事物。' },
    },
    '己': {
      ko: { score: 3, summary: '같은 음토끼리 편안하지만, 발전의 동력이 부족합니다.', strength: '서로를 있는 그대로 받아들이는 편안한 관계입니다.', challenge: '둘 다 수동적이어서 관계가 정체되기 쉽습니다.' },
      en: { score: 3, summary: 'Two Yin Earths are comfortable together but lack momentum.', strength: 'A comfortable relationship accepting each other as they are.', challenge: 'Both are passive, making the relationship prone to stagnation.' },
      ja: { score: 3, summary: '同じ陰土同士で心地良いですが、発展の動力が不足しています。', strength: '互いをありのまま受け入れる心地良い関係です。', challenge: '二人とも受動的で、関係が停滞しやすいです。' },
      zh: { score: 3, summary: '两个阴土在一起舒适，但缺乏发展动力。', strength: '彼此接受对方本来的样子，关系舒适。', challenge: '双方都被动，关系容易停滞。' },
    },
    '庚': {
      ko: { score: 4, summary: '밭에서 광물을 캐내듯, 己가 庚에게 실용적 지원을 제공합니다.', strength: '己의 세심한 배려가 庚의 거친 면을 부드럽게 만들어줍니다.', challenge: '庚의 무뚝뚝함이 己의 마음을 서운하게 합니다.' },
      en: { score: 4, summary: 'Mining minerals from soil — Gi provides practical support to Gyeong.', strength: 'Gi\'s attentive care softens Gyeong\'s rough edges.', challenge: 'Gyeong\'s bluntness may disappoint Gi.' },
      ja: { score: 4, summary: '畑から鉱物を掘り出すように、己が庚に実用的な支援を提供します。', strength: '己の細やかな配慮が庚の荒い面を柔らかくします。', challenge: '庚のぶっきらぼうさが己の気持ちを残念にさせます。' },
      zh: { score: 4, summary: '从土壤中开采矿物，己为庚提供实际支持。', strength: '己细心的关怀软化庚的粗糙面。', challenge: '庚的生硬可能让己感到失望。' },
    },
    '辛': {
      ko: { score: 4, summary: '정원 흙에서 꽃이 피듯, 己가 辛의 아름다움을 키워줍니다.', strength: '己의 따뜻한 보살핌이 辛의 재능을 꽃피우게 합니다.', challenge: '辛의 까다로움에 己가 지칠 수 있습니다.' },
      en: { score: 4, summary: 'Flowers blooming from garden soil — Gi nurtures Sin\'s beauty.', strength: 'Gi\'s warm care helps Sin\'s talents blossom.', challenge: 'Sin\'s pickiness may tire Gi out.' },
      ja: { score: 4, summary: '庭の土から花が咲くように、己が辛の美しさを育てます。', strength: '己の温かい世話が辛の才能を花開かせます。', challenge: '辛の気難しさに己が疲れることがあります。' },
      zh: { score: 4, summary: '花从园土中绽放，己培育辛的美丽。', strength: '己温暖的关怀让辛的才华绽放。', challenge: '辛的挑剔可能令己疲惫。' },
    },
    '壬': {
      ko: { score: 3, summary: '큰 물이 밭을 범람시키듯, 壬의 강한 에너지가 己를 압도할 수 있습니다.', strength: '壬의 풍부한 자원이 己의 생산성을 크게 높여줍니다.', challenge: '壬의 거센 흐름에 己가 휩쓸릴 수 있습니다.' },
      en: { score: 3, summary: 'A great flood inundating fields — Im\'s strong energy can overwhelm Gi.', strength: 'Im\'s abundant resources greatly boost Gi\'s productivity.', challenge: 'Gi may be swept away by Im\'s powerful current.' },
      ja: { score: 3, summary: '大水が畑を氾濫させるように、壬の強いエネルギーが己を圧倒することがあります。', strength: '壬の豊富な資源が己の生産性を大きく高めます。', challenge: '壬の激しい流れに己が巻き込まれることがあります。' },
      zh: { score: 3, summary: '大水泛滥田地，壬强大的能量可能压倒己。', strength: '壬丰富的资源大幅提高己的生产力。', challenge: '己可能被壬的猛烈势头冲走。' },
    },
    '癸': {
      ko: { score: 4, summary: '이슬비가 밭을 적시듯, 癸가 己에게 적절한 수분을 공급합니다.', strength: '癸의 섬세한 지원이 己의 잠재력을 자연스럽게 꺼냅니다.', challenge: '癸의 소심함이 己의 보수적 태도를 더 강화할 수 있습니다.' },
      en: { score: 4, summary: 'Drizzle moistening fields — Gye supplies just the right nourishment to Gi.', strength: 'Gye\'s delicate support naturally unlocks Gi\'s potential.', challenge: 'Gye\'s timidity may reinforce Gi\'s conservatism.' },
      ja: { score: 4, summary: '霧雨が畑を潤すように、癸が己に適切な水分を供給します。', strength: '癸の繊細な支援が己の潜在力を自然に引き出します。', challenge: '癸の小心さが己の保守的態度をさらに強めることがあります。' },
      zh: { score: 4, summary: '细雨润田，癸为己提供恰当的滋润。', strength: '癸细腻的支持自然地激发己的潜力。', challenge: '癸的胆怯可能强化己的保守态度。' },
    },
  },

  // ========== 庚 (양금, Yang Metal) ==========
  '庚': {
    '甲': {
      ko: { score: 4, summary: '도끼로 나무를 다듬듯, 庚이 甲을 실용적으로 만들어줍니다.', strength: '庚의 결단력이 甲의 방향성을 명확하게 잡아줍니다.', challenge: '庚의 비판이 지나치면 甲이 위축됩니다.' },
      en: { score: 4, summary: 'An axe carving wood — Gyeong makes Gap practical.', strength: 'Gyeong\'s decisiveness clarifies Gap\'s direction.', challenge: 'Excessive criticism from Gyeong may intimidate Gap.' },
      ja: { score: 4, summary: '斧で木を整えるように、庚が甲を実用的にします。', strength: '庚の決断力が甲の方向性を明確にします。', challenge: '庚の批判が過ぎると甲が萎縮します。' },
      zh: { score: 4, summary: '斧斫木材，庚使甲变得实用。', strength: '庚的果断为甲明确方向。', challenge: '庚过度的批评可能使甲畏缩。' },
    },
    '乙': {
      ko: { score: 5, summary: '乙庚合, 강인함과 유연함이 하나가 되는 천간합의 아름다운 만남입니다.', strength: '庚의 강함이 乙의 부드러움을 만나 최고의 조화를 이룹니다.', challenge: '서로에 대한 집착이 과하면 질투심이 생길 수 있습니다.' },
      en: { score: 5, summary: 'Eul-Gyeong Combination — a beautiful union of strength and flexibility.', strength: 'Gyeong\'s strength meeting Eul\'s softness creates supreme harmony.', challenge: 'Excessive attachment may lead to jealousy.' },
      ja: { score: 5, summary: '乙庚合、強さと柔らかさが一つになる天干合の美しい出会いです。', strength: '庚の強さが乙の柔らかさと出会い最高の調和を生みます。', challenge: '互いへの執着が過ぎると嫉妬心が生まれることがあります。' },
      zh: { score: 5, summary: '乙庚合，刚与柔合为一体的天干合美丽相遇。', strength: '庚的刚强与乙的柔软相遇，创造至高和谐。', challenge: '对彼此的执着过强可能产生嫉妒。' },
    },
    '丙': {
      ko: { score: 3, summary: '큰 불이 쇠를 녹이듯, 丙이 庚에게 강한 변화를 요구합니다.', strength: '丙의 열정이 庚의 고정관념을 깨뜨리는 데 도움이 됩니다.', challenge: '庚이 丙의 강압적 변화에 강하게 저항합니다.' },
      en: { score: 3, summary: 'Great fire melts metal — Byeong demands strong change from Gyeong.', strength: 'Byeong\'s passion helps break Gyeong\'s fixed ideas.', challenge: 'Gyeong strongly resists Byeong\'s forced changes.' },
      ja: { score: 3, summary: '大火が金属を溶かすように、丙が庚に強い変化を求めます。', strength: '丙の情熱が庚の固定観念を打ち破るのに役立ちます。', challenge: '庚が丙の強引な変化に強く抵抗します。' },
      zh: { score: 3, summary: '大火熔金，丙要求庚做出强烈改变。', strength: '丙的热情有助于打破庚的固有观念。', challenge: '庚强烈抵抗丙强制的改变。' },
    },
    '丁': {
      ko: { score: 4, summary: '용광로에서 쇠를 정제하듯, 丁의 꾸준한 열이 庚을 단련시킵니다.', strength: '丁의 인내심 있는 접근이 庚의 잠재력을 최대로 끌어냅니다.', challenge: '과정이 느려 庚이 답답해할 수 있습니다.' },
      en: { score: 4, summary: 'Refining metal in a furnace — Jeong\'s steady heat tempers Gyeong.', strength: 'Jeong\'s patient approach maximizes Gyeong\'s potential.', challenge: 'The slow process may frustrate Gyeong.' },
      ja: { score: 4, summary: '溶鉱炉で鉄を精製するように、丁の着実な熱が庚を鍛えます。', strength: '丁の忍耐強いアプローチが庚の潜在力を最大限に引き出します。', challenge: 'プロセスが遅くて庚がもどかしくなることがあります。' },
      zh: { score: 4, summary: '熔炉炼金，丁稳定的热量锻造庚。', strength: '丁耐心的方式最大限度地激发庚的潜力。', challenge: '缓慢的过程可能让庚感到焦急。' },
    },
    '戊': {
      ko: { score: 5, summary: '큰 산이 금을 품듯, 戊가 庚에게 최고의 보호와 지원을 줍니다.', strength: '戊의 넉넉한 품이 庚의 날카로움을 감싸 완성시킵니다.', challenge: '庚이 戊의 보호에 안주하여 독립성이 약해질 수 있습니다.' },
      en: { score: 5, summary: 'A great mountain harboring gold — Mu gives Gyeong the best protection.', strength: 'Mu\'s generous embrace wraps and completes Gyeong\'s sharpness.', challenge: 'Gyeong may settle comfortably and lose independence.' },
      ja: { score: 5, summary: '大きな山が金を抱くように、戊が庚に最高の保護と支援を与えます。', strength: '戊の寛大な器が庚の鋭さを包み込み完成させます。', challenge: '庚が戊の保護に安住して独立性が弱まることがあります。' },
      zh: { score: 5, summary: '大山蕴金，戊给庚最好的保护与支持。', strength: '戊宽厚的胸怀包裹并成就庚的锋利。', challenge: '庚可能安于戊的保护而丧失独立性。' },
    },
    '己': {
      ko: { score: 4, summary: '밭 흙에서 철을 캐내듯, 己가 庚의 실용성을 발전시킵니다.', strength: '己의 세심한 지원이 庚의 능력 발휘를 돕습니다.', challenge: '庚이 己의 잔소리를 부담으로 느낄 수 있습니다.' },
      en: { score: 4, summary: 'Mining iron from farmland — Gi develops Gyeong\'s practical side.', strength: 'Gi\'s attentive support helps Gyeong perform at full capacity.', challenge: 'Gyeong may find Gi\'s nagging burdensome.' },
      ja: { score: 4, summary: '畑の土から鉄を掘り出すように、己が庚の実用性を発展させます。', strength: '己の細やかな支援が庚の能力発揮を助けます。', challenge: '庚が己の小言を負担に感じることがあります。' },
      zh: { score: 4, summary: '从农田中开采铁矿，己发展庚的实用性。', strength: '己细心的支持帮助庚发挥能力。', challenge: '庚可能觉得己的唠叨是负担。' },
    },
    '庚': {
      ko: { score: 3, summary: '칼과 칼이 부딪히듯, 날카로운 두 사람의 만남은 긴장감이 높습니다.', strength: '서로의 능력을 인정하며 건전한 경쟁을 합니다.', challenge: '타협을 모르는 성격이 심각한 충돌을 일으킬 수 있습니다.' },
      en: { score: 3, summary: 'Sword meets sword — two sharp personalities create high tension.', strength: 'Mutual respect for ability leads to healthy competition.', challenge: 'Uncompromising natures may cause serious clashes.' },
      ja: { score: 3, summary: '刀と刀がぶつかるように、鋭い二人の出会いは緊張感が高いです。', strength: '互いの能力を認め合い、健全な競争をします。', challenge: '妥協を知らない性格が深刻な衝突を起こすことがあります。' },
      zh: { score: 3, summary: '刀剑相碰，两个锐利的人相遇张力十足。', strength: '互相认可能力，进行健康的竞争。', challenge: '互不妥协的性格可能引发严重冲突。' },
    },
    '辛': {
      ko: { score: 3, summary: '무기와 보석의 만남으로, 같은 금이지만 추구하는 바가 다릅니다.', strength: '같은 금 오행으로 의리와 원칙을 중시하는 공통점이 있습니다.', challenge: '庚의 거침없음이 辛의 감수성을 무시할 수 있습니다.' },
      en: { score: 3, summary: 'Weapon meets jewel — same Metal but different pursuits.', strength: 'Same Metal element shares values of loyalty and principle.', challenge: 'Gyeong\'s bluntness may disregard Sin\'s sensibility.' },
      ja: { score: 3, summary: '武器と宝石の出会いで、同じ金でも追求するものが異なります。', strength: '同じ金の五行で義理と原則を重視する共通点があります。', challenge: '庚の遠慮のなさが辛の感受性を無視することがあります。' },
      zh: { score: 3, summary: '兵器与珠宝相遇，同属金但追求不同。', strength: '同属金行，共享重义与讲原则的价值观。', challenge: '庚的粗犷可能忽视辛的感受力。' },
    },
    '壬': {
      ko: { score: 4, summary: '쇠에서 물이 응결하듯, 庚이 壬에게 방향과 구조를 제공합니다.', strength: '庚의 명확한 결단이 壬의 유동적 에너지에 형태를 줍니다.', challenge: '壬이 庚의 엄격함을 답답해할 수 있습니다.' },
      en: { score: 4, summary: 'Water condensing on metal — Gyeong gives Im direction and structure.', strength: 'Gyeong\'s clear decisions give shape to Im\'s fluid energy.', challenge: 'Im may find Gyeong\'s strictness stifling.' },
      ja: { score: 4, summary: '金属に水が凝結するように、庚が壬に方向と構造を提供します。', strength: '庚の明確な決断が壬の流動的なエネルギーに形を与えます。', challenge: '壬が庚の厳格さを息苦しく感じることがあります。' },
      zh: { score: 4, summary: '水凝于金，庚为壬提供方向与结构。', strength: '庚明确的决断赋予壬流动能量以形态。', challenge: '壬可能觉得庚的严格令人窒息。' },
    },
    '癸': {
      ko: { score: 4, summary: '금에서 이슬이 맺히듯, 庚이 癸에게 정제된 지혜를 전합니다.', strength: '庚의 단련된 경험이 癸의 지적 성장에 큰 도움이 됩니다.', challenge: '癸가 庚의 강한 의견에 자신의 목소리를 내기 어렵습니다.' },
      en: { score: 4, summary: 'Dew forming on metal — Gyeong transmits refined wisdom to Gye.', strength: 'Gyeong\'s forged experience greatly aids Gye\'s intellectual growth.', challenge: 'Gye may struggle to voice opinions against Gyeong\'s strong views.' },
      ja: { score: 4, summary: '金から露が結ぶように、庚が癸に精製された知恵を伝えます。', strength: '庚の鍛えられた経験が癸の知的成長に大きく役立ちます。', challenge: '癸が庚の強い意見に対して自分の声を出しにくいです。' },
      zh: { score: 4, summary: '金上凝露，庚向癸传递精炼的智慧。', strength: '庚锤炼的经验对癸的智力成长大有帮助。', challenge: '癸可能难以在庚强烈的意见面前发出自己的声音。' },
    },
  },

  // ========== 辛 (음금, Yin Metal) ==========
  '辛': {
    '甲': {
      ko: { score: 3, summary: '작은 칼이 큰 나무를 깎으려 하지만, 힘이 부족합니다.', strength: '辛의 분석력이 甲의 거친 계획을 정교하게 다듬어줍니다.', challenge: '辛이 甲의 거대한 에너지에 압도당할 수 있습니다.' },
      en: { score: 3, summary: 'A small knife trying to carve a great tree — insufficient force.', strength: 'Sin\'s analytical skill refines Gap\'s rough plans.', challenge: 'Sin may be overwhelmed by Gap\'s immense energy.' },
      ja: { score: 3, summary: '小さな刃物が大木を削ろうとしますが、力が足りません。', strength: '辛の分析力が甲の大まかな計画を精巧に仕上げます。', challenge: '辛が甲の巨大なエネルギーに圧倒されることがあります。' },
      zh: { score: 3, summary: '小刀试图雕刻大树，力量不足。', strength: '辛的分析力将甲粗糙的计划精细化。', challenge: '辛可能被甲巨大的能量所压倒。' },
    },
    '乙': {
      ko: { score: 2, summary: '가위가 꽃줄기를 자르듯, 辛이 乙에게 날카로운 영향을 미칩니다.', strength: '辛의 정확한 판단이 乙의 방향을 잡아줄 수 있습니다.', challenge: '辛의 날카로운 지적이 乙의 자신감을 무너뜨립니다.' },
      en: { score: 2, summary: 'Scissors cutting flower stems — Sin impacts Eul sharply.', strength: 'Sin\'s precise judgment can set Eul\'s direction.', challenge: 'Sin\'s sharp criticisms destroy Eul\'s confidence.' },
      ja: { score: 2, summary: 'ハサミが花の茎を切るように、辛が乙に鋭い影響を与えます。', strength: '辛の正確な判断が乙の方向を定めることができます。', challenge: '辛の鋭い指摘が乙の自信を崩します。' },
      zh: { score: 2, summary: '剪刀裁花茎，辛对乙产生尖锐影响。', strength: '辛精准的判断能为乙指明方向。', challenge: '辛尖锐的批评摧毁乙的自信心。' },
    },
    '丙': {
      ko: { score: 5, summary: '丙辛合, 태양과 보석의 만남으로 서로를 빛나게 하는 최고의 궁합입니다.', strength: '丙의 따뜻함이 辛의 차가움을 녹이고, 辛이 丙을 빛나게 합니다.', challenge: '합화로 물이 되면 본래의 개성이 약해질 수 있습니다.' },
      en: { score: 5, summary: 'Byeong-Sin Combination — sun and jewel making each other shine, the best match.', strength: 'Byeong\'s warmth melts Sin\'s coldness; Sin makes Byeong shine.', challenge: 'Transformation may weaken original personalities.' },
      ja: { score: 5, summary: '丙辛合、太陽と宝石の出会いで互いを輝かせる最高の相性です。', strength: '丙の温かさが辛の冷たさを溶かし、辛が丙を輝かせます。', challenge: '合化して水になると本来の個性が弱まることがあります。' },
      zh: { score: 5, summary: '丙辛合，太阳与宝石相遇让彼此闪耀，最佳搭配。', strength: '丙的温暖融化辛的冷淡，辛让丙闪耀。', challenge: '合化可能削弱原本的个性。' },
    },
    '丁': {
      ko: { score: 3, summary: '촛불의 열로 보석을 단련하는 관계로, 섬세한 변화를 이끕니다.', strength: '丁의 인내심이 辛의 완성도를 높여줍니다.', challenge: '辛이 丁의 감정적 접근을 불편해할 수 있습니다.' },
      en: { score: 3, summary: 'Tempering a jewel with candlelight — bringing subtle transformation.', strength: 'Jeong\'s patience elevates Sin\'s completeness.', challenge: 'Sin may feel uncomfortable with Jeong\'s emotional approach.' },
      ja: { score: 3, summary: 'ろうそくの熱で宝石を鍛える関係で、繊細な変化を導きます。', strength: '丁の忍耐が辛の完成度を高めます。', challenge: '辛が丁の感情的なアプローチを不快に感じることがあります。' },
      zh: { score: 3, summary: '烛火锻炼宝石，带来细微的变化。', strength: '丁的耐心提升辛的完美度。', challenge: '辛可能对丁的感性方式感到不适。' },
    },
    '戊': {
      ko: { score: 5, summary: '대지가 보석을 품듯, 戊가 辛을 안전하게 보호합니다.', strength: '戊의 깊은 포용력이 辛에게 최고의 안식처가 됩니다.', challenge: '辛이 戊의 느린 변화에 지루함을 느낄 수 있습니다.' },
      en: { score: 5, summary: 'Earth harboring jewels — Mu safely protects Sin.', strength: 'Mu\'s deep inclusiveness becomes Sin\'s ultimate sanctuary.', challenge: 'Sin may feel bored by Mu\'s slow pace of change.' },
      ja: { score: 5, summary: '大地が宝石を抱くように、戊が辛を安全に守ります。', strength: '戊の深い包容力が辛にとって最高の安息所になります。', challenge: '辛が戊の遅い変化に退屈を感じることがあります。' },
      zh: { score: 5, summary: '大地蕴藏宝石，戊安全地保护辛。', strength: '戊深厚的包容力成为辛最好的庇护所。', challenge: '辛可能对戊缓慢的变化感到厌倦。' },
    },
    '己': {
      ko: { score: 4, summary: '부드러운 흙이 보석을 감싸듯, 己가 辛에게 세심한 보살핌을 줍니다.', strength: '己의 섬세한 관심이 辛의 예민한 감성을 편안하게 합니다.', challenge: '辛의 완벽주의가 己의 수고를 당연하게 여길 수 있습니다.' },
      en: { score: 4, summary: 'Soft soil wrapping jewels — Gi gives Sin attentive care.', strength: 'Gi\'s delicate attention comforts Sin\'s sensitive nature.', challenge: 'Sin\'s perfectionism may take Gi\'s efforts for granted.' },
      ja: { score: 4, summary: '柔らかい土が宝石を包むように、己が辛に細やかな世話をします。', strength: '己の繊細な関心が辛の繊細な感性を安らかにします。', challenge: '辛の完璧主義が己の苦労を当然のものと見なすことがあります。' },
      zh: { score: 4, summary: '柔软的土壤包裹宝石，己给辛细心的照料。', strength: '己细腻的关注让辛敏感的内心感到舒适。', challenge: '辛的完美主义可能认为己的付出理所当然。' },
    },
    '庚': {
      ko: { score: 3, summary: '칼과 보석의 만남으로, 같은 금이지만 품격이 다릅니다.', strength: '같은 금 오행으로 의리와 정직함을 공유합니다.', challenge: '庚의 무뚝뚝함이 辛의 섬세한 감정을 다치게 합니다.' },
      en: { score: 3, summary: 'Sword meets jewel — same Metal but different elegance.', strength: 'Same Metal element shares loyalty and honesty.', challenge: 'Gyeong\'s bluntness hurts Sin\'s delicate feelings.' },
      ja: { score: 3, summary: '刀と宝石の出会いで、同じ金でも品格が異なります。', strength: '同じ金の五行で義理と正直さを共有します。', challenge: '庚のぶっきらぼうさが辛の繊細な感情を傷つけます。' },
      zh: { score: 3, summary: '刀剑与宝石相遇，同属金但品格不同。', strength: '同属金行，共享忠义与正直。', challenge: '庚的粗犷伤害辛细腻的情感。' },
    },
    '辛': {
      ko: { score: 3, summary: '같은 보석끼리 아름답지만, 서로를 비교하며 경쟁합니다.', strength: '미적 감각과 품격이 통하여 깊은 공감대를 형성합니다.', challenge: '서로를 의식하며 질투와 경쟁이 생길 수 있습니다.' },
      en: { score: 3, summary: 'Two jewels are beautiful but compare and compete with each other.', strength: 'Shared aesthetic sense and elegance create deep rapport.', challenge: 'Self-consciousness may breed jealousy and rivalry.' },
      ja: { score: 3, summary: '同じ宝石同士で美しいですが、互いを比較して競争します。', strength: '美的感覚と品格が通じて深い共感を形成します。', challenge: '互いを意識して嫉妬や競争が生まれることがあります。' },
      zh: { score: 3, summary: '两颗宝石虽美，但互相比较竞争。', strength: '共通的审美感和品格形成深厚的共鸣。', challenge: '互相在意可能产生嫉妒和竞争。' },
    },
    '壬': {
      ko: { score: 4, summary: '금이 물을 맑게 하듯, 辛이 壬에게 정화와 방향을 제공합니다.', strength: '辛의 정교한 분석이 壬의 아이디어를 구체화합니다.', challenge: '壬의 자유로운 기질이 辛의 규칙을 무시할 수 있습니다.' },
      en: { score: 4, summary: 'Metal purifies water — Sin provides clarity and direction to Im.', strength: 'Sin\'s precise analysis gives concrete form to Im\'s ideas.', challenge: 'Im\'s free spirit may ignore Sin\'s rules.' },
      ja: { score: 4, summary: '金が水を清めるように、辛が壬に浄化と方向を提供します。', strength: '辛の精巧な分析が壬のアイデアを具体化します。', challenge: '壬の自由な気質が辛のルールを無視することがあります。' },
      zh: { score: 4, summary: '金净水，辛为壬提供净化与方向。', strength: '辛精密的分析将壬的想法具体化。', challenge: '壬自由的气质可能无视辛的规则。' },
    },
    '癸': {
      ko: { score: 4, summary: '보석에 맑은 이슬이 맺히듯, 辛과 癸는 맑고 깨끗한 관계입니다.', strength: '둘 다 지적이고 섬세하여 대화의 깊이가 다릅니다.', challenge: '감정 표현이 서로 부족하여 속마음을 모를 수 있습니다.' },
      en: { score: 4, summary: 'Clear dew on jewels — Sin and Gye share a pure and clean relationship.', strength: 'Both are intellectual and delicate, creating conversations of unique depth.', challenge: 'Emotional expression is lacking on both sides, hiding true feelings.' },
      ja: { score: 4, summary: '宝石に透明な露が結ぶように、辛と癸は澄んだきれいな関係です。', strength: '二人とも知的で繊細で、対話の深さが格別です。', challenge: '感情表現が互いに不足して本心が分からないことがあります。' },
      zh: { score: 4, summary: '宝石上凝结清露，辛与癸的关系纯净清澈。', strength: '两人都知性而细腻，对话深度非凡。', challenge: '双方都缺乏情感表达，可能不了解彼此的真心。' },
    },
  },

  // ========== 壬 (양수, Yang Water) ==========
  '壬': {
    '甲': {
      ko: { score: 4, summary: '큰 강이 나무를 키우듯, 壬이 甲에게 풍부한 자양분을 제공합니다.', strength: '壬의 지혜가 甲의 성장을 강력히 뒷받침합니다.', challenge: '壬이 甲에게 너무 많은 것을 주려다 소진될 수 있습니다.' },
      en: { score: 4, summary: 'A great river nurturing trees — Im provides abundant nourishment to Gap.', strength: 'Im\'s wisdom powerfully backs Gap\'s growth.', challenge: 'Im may exhaust itself trying to give too much to Gap.' },
      ja: { score: 4, summary: '大河が木を育てるように、壬が甲に豊富な養分を提供します。', strength: '壬の知恵が甲の成長を力強く支えます。', challenge: '壬が甲に与えすぎて消耗することがあります。' },
      zh: { score: 4, summary: '大河滋养树木，壬为甲提供丰富的养分。', strength: '壬的智慧有力地支撑甲的成长。', challenge: '壬可能因给予甲太多而耗尽自己。' },
    },
    '乙': {
      ko: { score: 4, summary: '강물이 들꽃을 적시듯, 壬이 乙에게 너그러운 지원을 합니다.', strength: '壬의 넉넉한 자원이 乙의 다양한 재능을 키워줍니다.', challenge: '壬의 강한 흐름이 乙의 뿌리를 흔들 수 있습니다.' },
      en: { score: 4, summary: 'River water nourishing wildflowers — Im generously supports Eul.', strength: 'Im\'s ample resources develop Eul\'s various talents.', challenge: 'Im\'s strong current may shake Eul\'s roots.' },
      ja: { score: 4, summary: '川の水が野花を潤すように、壬が乙に寛大な支援をします。', strength: '壬の豊富な資源が乙の多様な才能を育てます。', challenge: '壬の強い流れが乙の根を揺るがすことがあります。' },
      zh: { score: 4, summary: '河水滋润野花，壬慷慨地支持乙。', strength: '壬丰富的资源培养乙多样的才能。', challenge: '壬强烈的水流可能动摇乙的根基。' },
    },
    '丙': {
      ko: { score: 3, summary: '큰 물이 불을 제어하듯, 壬이 丙의 과한 열정을 조절합니다.', strength: '壬의 냉정한 판단이 丙의 과열을 적절히 식혀줍니다.', challenge: '壬의 억제가 丙의 열정을 완전히 꺼뜨릴 수 있습니다.' },
      en: { score: 3, summary: 'Great water controlling fire — Im regulates Byeong\'s excess passion.', strength: 'Im\'s cool judgment appropriately cools Byeong\'s overheating.', challenge: 'Im\'s suppression may completely extinguish Byeong\'s passion.' },
      ja: { score: 3, summary: '大水が火を制御するように、壬が丙の過度な情熱を調節します。', strength: '壬の冷静な判断が丙の過熱を適切に冷やします。', challenge: '壬の抑制が丙の情熱を完全に消してしまうことがあります。' },
      zh: { score: 3, summary: '大水控火，壬调节丙过度的热情。', strength: '壬冷静的判断适当冷却丙的过热。', challenge: '壬的压制可能完全熄灭丙的热情。' },
    },
    '丁': {
      ko: { score: 5, summary: '丁壬合, 물과 불의 신비로운 천간합으로 완벽한 보완 관계입니다.', strength: '정반대의 에너지가 만나 새로운 가능성을 창조합니다.', challenge: '합이 깨지면 극한의 갈등이 생길 수 있습니다.' },
      en: { score: 5, summary: 'Jeong-Im Combination — a mystical heavenly stem union of water and fire, perfect complementarity.', strength: 'Opposite energies meet to create new possibilities.', challenge: 'If the bond breaks, extreme conflict may ensue.' },
      ja: { score: 5, summary: '丁壬合、水と火の神秘的な天干合で完璧な補完関係です。', strength: '正反対のエネルギーが出会い、新たな可能性を創造します。', challenge: '合が破れると極端な対立が生じることがあります。' },
      zh: { score: 5, summary: '丁壬合，水与火神秘的天干合，完美互补。', strength: '相反的能量相遇创造新的可能性。', challenge: '合破裂时可能产生极端冲突。' },
    },
    '戊': {
      ko: { score: 2, summary: '흙이 물을 막듯, 戊가 壬의 자유를 크게 제한합니다.', strength: '戊의 안정감이 壬의 무분별한 확장을 잡아줍니다.', challenge: '壬이 戊의 통제에 강한 반발심을 느낍니다.' },
      en: { score: 2, summary: 'Earth blocks water — Mu greatly restricts Im\'s freedom.', strength: 'Mu\'s stability checks Im\'s indiscriminate expansion.', challenge: 'Im feels strong resentment toward Mu\'s control.' },
      ja: { score: 2, summary: '土が水を堰き止めるように、戊が壬の自由を大きく制限します。', strength: '戊の安定感が壬の無分別な拡大を抑えます。', challenge: '壬が戊のコントロールに強い反発を感じます。' },
      zh: { score: 2, summary: '土挡水，戊极大地限制壬的自由。', strength: '戊的稳定感遏制壬无节制的扩张。', challenge: '壬对戊的控制感到强烈反感。' },
    },
    '己': {
      ko: { score: 3, summary: '물이 진흙을 만나면 탁해지듯, 壬이 己를 만나면 복잡해집니다.', strength: '己의 실용적 시각이 壬의 이상을 현실화하는 데 도움이 됩니다.', challenge: '己의 세세한 간섭이 壬의 큰 그림을 방해할 수 있습니다.' },
      en: { score: 3, summary: 'Water meeting mud becomes cloudy — Im grows complicated with Gi.', strength: 'Gi\'s practical perspective helps realize Im\'s ideals.', challenge: 'Gi\'s detailed interference may hinder Im\'s big picture.' },
      ja: { score: 3, summary: '水が泥に会えば濁るように、壬が己に会うと複雑になります。', strength: '己の実用的な視点が壬の理想を現実化するのに役立ちます。', challenge: '己の細かい干渉が壬の大きな絵を邪魔することがあります。' },
      zh: { score: 3, summary: '水遇泥变浑，壬遇己变得复杂。', strength: '己务实的视角帮助壬实现理想。', challenge: '己事无巨细的干涉可能妨碍壬的宏图。' },
    },
    '庚': {
      ko: { score: 5, summary: '쇠에서 물이 생기듯, 庚이 壬에게 끊임없는 지원을 보냅니다.', strength: '庚의 단단한 의지가 壬에게 방향과 에너지를 줍니다.', challenge: '庚의 강한 영향력에 壬이 자기 색깔을 잃을 수 있습니다.' },
      en: { score: 5, summary: 'Water born from metal — Gyeong sends endless support to Im.', strength: 'Gyeong\'s firm will gives Im direction and energy.', challenge: 'Under Gyeong\'s strong influence, Im may lose its own color.' },
      ja: { score: 5, summary: '金から水が生まれるように、庚が壬に絶え間ない支援を送ります。', strength: '庚の固い意志が壬に方向とエネルギーを与えます。', challenge: '庚の強い影響力に壬が自分の色を失うことがあります。' },
      zh: { score: 5, summary: '金生水，庚为壬提供源源不断的支持。', strength: '庚坚定的意志给壬方向与能量。', challenge: '在庚强大的影响下，壬可能失去自己的特色。' },
    },
    '辛': {
      ko: { score: 4, summary: '보석이 물을 맑게 하듯, 辛이 壬에게 정교한 지혜를 더합니다.', strength: '辛의 섬세한 분석이 壬의 넓은 시야에 깊이를 줍니다.', challenge: '辛의 까다로운 기준이 壬을 피곤하게 할 수 있습니다.' },
      en: { score: 4, summary: 'Jewels purifying water — Sin adds refined wisdom to Im.', strength: 'Sin\'s delicate analysis adds depth to Im\'s broad vision.', challenge: 'Sin\'s exacting standards may tire Im.' },
      ja: { score: 4, summary: '宝石が水を清めるように、辛が壬に精巧な知恵を加えます。', strength: '辛の繊細な分析が壬の広い視野に深みを与えます。', challenge: '辛の厳しい基準が壬を疲れさせることがあります。' },
      zh: { score: 4, summary: '宝石净水，辛为壬增添精致的智慧。', strength: '辛细腻的分析为壬宽广的视野增添深度。', challenge: '辛苛刻的标准可能让壬感到疲惫。' },
    },
    '壬': {
      ko: { score: 3, summary: '두 개의 큰 강이 만나면 범람하기 쉽듯, 에너지가 지나칠 수 있습니다.', strength: '서로의 지혜와 통찰력을 깊이 이해하고 공감합니다.', challenge: '둘 다 제어하기 어려워 관계가 혼란스러워질 수 있습니다.' },
      en: { score: 3, summary: 'Two great rivers meeting may flood — energy can be excessive.', strength: 'Deep understanding and shared wisdom and insight.', challenge: 'Both are hard to control, making the relationship chaotic.' },
      ja: { score: 3, summary: '二つの大河が合流すれば氾濫しやすいように、エネルギーが過剰になることがあります。', strength: '互いの知恵と洞察力を深く理解し共感します。', challenge: '二人とも制御しにくく、関係が混乱することがあります。' },
      zh: { score: 3, summary: '两条大河相遇容易泛滥，能量可能过剩。', strength: '深刻理解并共鸣彼此的智慧与洞察力。', challenge: '两人都难以控制，关系可能变得混乱。' },
    },
    '癸': {
      ko: { score: 3, summary: '큰 강과 이슬의 만남으로, 壬이 癸를 흡수하기 쉽습니다.', strength: '같은 수 오행으로 직관과 지혜를 공유합니다.', challenge: '壬의 존재감에 癸가 자기주장을 하기 어렵습니다.' },
      en: { score: 3, summary: 'A great river meeting dew — Im easily absorbs Gye.', strength: 'Same Water element shares intuition and wisdom.', challenge: 'Gye struggles to assert itself under Im\'s presence.' },
      ja: { score: 3, summary: '大河と露の出会いで、壬が癸を吸収しやすいです。', strength: '同じ水の五行で直感と知恵を共有します。', challenge: '壬の存在感に癸が自己主張しにくいです。' },
      zh: { score: 3, summary: '大河与露水相遇，壬容易吞没癸。', strength: '同属水行，共享直觉与智慧。', challenge: '癸在壬的存在感下难以表达自我。' },
    },
  },

  // ========== 癸 (음수, Yin Water) ==========
  '癸': {
    '甲': {
      ko: { score: 4, summary: '이슬이 새싹을 키우듯, 癸가 甲에게 조용하고 섬세한 지원을 합니다.', strength: '癸의 부드러운 양육이 甲의 초기 성장에 결정적입니다.', challenge: '甲이 성장하면 癸의 도움을 잊어버릴 수 있습니다.' },
      en: { score: 4, summary: 'Dew nurturing sprouts — Gye quietly and delicately supports Gap.', strength: 'Gye\'s gentle nurturing is crucial for Gap\'s early growth.', challenge: 'Once Gap grows, Gye\'s help may be forgotten.' },
      ja: { score: 4, summary: '露が芽を育てるように、癸が甲に静かで繊細な支援をします。', strength: '癸の穏やかな養育が甲の初期成長に決定的です。', challenge: '甲が成長すると癸の助けを忘れることがあります。' },
      zh: { score: 4, summary: '露水滋养嫩芽，癸默默细腻地支持甲。', strength: '癸温柔的养育对甲的早期成长至关重要。', challenge: '甲成长后可能忘记癸的帮助。' },
    },
    '乙': {
      ko: { score: 4, summary: '이슬비가 화초를 적시듯, 癸와 乙은 가장 자연스러운 상생 관계입니다.', strength: '癸의 섬세한 배려와 乙의 감성이 완벽하게 어울립니다.', challenge: '둘 다 소극적이라 관계 진전에 시간이 걸립니다.' },
      en: { score: 4, summary: 'Morning dew on flowers — Gye and Eul share the most natural generating bond.', strength: 'Gye\'s delicate care and Eul\'s sensibility match perfectly.', challenge: 'Both are passive, so relationship progress takes time.' },
      ja: { score: 4, summary: '朝露が花を潤すように、癸と乙は最も自然な相生関係です。', strength: '癸の繊細な配慮と乙の感性が完璧にマッチします。', challenge: '二人とも消極的で、関係の進展に時間がかかります。' },
      zh: { score: 4, summary: '晨露润花，癸与乙是最自然的相生关系。', strength: '癸的细心关怀与乙的感性完美契合。', challenge: '两人都被动，关系进展需要时间。' },
    },
    '丙': {
      ko: { score: 2, summary: '태양이 이슬을 말리듯, 丙이 癸의 존재감을 약화시킵니다.', strength: '丙의 활력이 癸의 침체된 기운을 깨워줄 수 있습니다.', challenge: '丙의 강한 에너지에 癸가 완전히 증발할 수 있습니다.' },
      en: { score: 2, summary: 'Sun drying dew — Byeong weakens Gye\'s presence.', strength: 'Byeong\'s vitality can awaken Gye\'s stagnant energy.', challenge: 'Gye may completely evaporate under Byeong\'s strong energy.' },
      ja: { score: 2, summary: '太陽が露を乾かすように、丙が癸の存在感を弱めます。', strength: '丙の活力が癸の沈滞した気を覚ますことができます。', challenge: '丙の強いエネルギーに癸が完全に蒸発することがあります。' },
      zh: { score: 2, summary: '太阳蒸发露水，丙削弱癸的存在感。', strength: '丙的活力能唤醒癸停滞的气。', challenge: '癸可能在丙强大的能量下完全蒸发。' },
    },
    '丁': {
      ko: { score: 3, summary: '물이 촛불을 위협하지만, 적당하면 서로에게 자극이 됩니다.', strength: '癸의 차분함이 丁의 감정적 과열을 적절히 식혀줍니다.', challenge: '癸의 냉정함이 丁의 열정적 마음을 상하게 합니다.' },
      en: { score: 3, summary: 'Water threatens a candle, but in moderation they stimulate each other.', strength: 'Gye\'s calmness appropriately cools Jeong\'s emotional overheating.', challenge: 'Gye\'s coldness hurts Jeong\'s passionate heart.' },
      ja: { score: 3, summary: '水がろうそくを脅かしますが、適度であれば互いに刺激になります。', strength: '癸の落ち着きが丁の感情的な過熱を適切に冷やします。', challenge: '癸の冷淡さが丁の情熱的な心を傷つけます。' },
      zh: { score: 3, summary: '水威胁烛火，但适度时能互相刺激。', strength: '癸的冷静适当冷却丁情感的过热。', challenge: '癸的冷淡伤害丁热情的心。' },
    },
    '戊': {
      ko: { score: 5, summary: '戊癸合, 대지와 이슬비의 천간합으로 풍요로운 결실을 맺는 궁합입니다.', strength: '戊의 안정감과 癸의 지혜가 만나 최강의 파트너십을 형성합니다.', challenge: '합에 너무 집중하면 외부 세계와 단절될 수 있습니다.' },
      en: { score: 5, summary: 'Mu-Gye Combination — earth and drizzle in heavenly union for abundant harvest.', strength: 'Mu\'s stability and Gye\'s wisdom form the strongest partnership.', challenge: 'Too much focus on the bond may disconnect from the outside world.' },
      ja: { score: 5, summary: '戊癸合、大地と霧雨の天干合で豊かな実りを結ぶ相性です。', strength: '戊の安定感と癸の知恵が出会い、最強のパートナーシップを形成します。', challenge: '合に集中しすぎると外の世界と断絶することがあります。' },
      zh: { score: 5, summary: '戊癸合，大地与细雨的天干合，丰收之缘。', strength: '戊的稳定与癸的智慧形成最强的伙伴关系。', challenge: '过度专注于合可能与外界脱节。' },
    },
    '己': {
      ko: { score: 3, summary: '이슬이 흙에 스며들듯, 癸가 己에게 자연스럽게 흡수됩니다.', strength: '癸의 수분이 己의 생산성을 높이는 좋은 조합입니다.', challenge: '己가 癸의 자원을 과도하게 흡수할 수 있습니다.' },
      en: { score: 3, summary: 'Dew absorbed by soil — Gye is naturally taken in by Gi.', strength: 'Gye\'s moisture boosts Gi\'s productivity, a good combination.', challenge: 'Gi may over-absorb Gye\'s resources.' },
      ja: { score: 3, summary: '露が土に染み込むように、癸が己に自然に吸収されます。', strength: '癸の水分が己の生産性を高める良い組み合わせです。', challenge: '己が癸の資源を過度に吸収することがあります。' },
      zh: { score: 3, summary: '露水渗入土壤，癸自然被己吸收。', strength: '癸的水分提高己的生产力，好的组合。', challenge: '己可能过度吸收癸的资源。' },
    },
    '庚': {
      ko: { score: 4, summary: '쇠에서 맑은 물이 나오듯, 庚이 癸에게 순수한 지원을 보냅니다.', strength: '庚의 원칙적 태도가 癸에게 명확한 가이드라인을 줍니다.', challenge: '庚의 엄격함이 癸의 자유로운 사고를 제한할 수 있습니다.' },
      en: { score: 4, summary: 'Clear water from metal — Gyeong sends pure support to Gye.', strength: 'Gyeong\'s principled attitude gives Gye clear guidelines.', challenge: 'Gyeong\'s strictness may limit Gye\'s free thinking.' },
      ja: { score: 4, summary: '金属から清い水が出るように、庚が癸に純粋な支援を送ります。', strength: '庚の原則的な態度が癸に明確なガイドラインを与えます。', challenge: '庚の厳格さが癸の自由な思考を制限することがあります。' },
      zh: { score: 4, summary: '金出清水，庚向癸送出纯粹的支持。', strength: '庚的原则态度给癸明确的指引。', challenge: '庚的严格可能限制癸的自由思维。' },
    },
    '辛': {
      ko: { score: 5, summary: '보석이 물을 더욱 맑게 하듯, 辛이 癸에게 고품격의 지원을 합니다.', strength: '辛의 정교함이 癸의 지적 능력을 한 단계 끌어올립니다.', challenge: '辛의 높은 기준에 癸가 부담을 느낄 수 있습니다.' },
      en: { score: 5, summary: 'Jewels making water even clearer — Sin gives Gye premium support.', strength: 'Sin\'s refinement elevates Gye\'s intellectual abilities to the next level.', challenge: 'Gye may feel pressured by Sin\'s high standards.' },
      ja: { score: 5, summary: '宝石が水をさらに清めるように、辛が癸に高品格の支援をします。', strength: '辛の精巧さが癸の知的能力をワンランク引き上げます。', challenge: '辛の高い基準に癸がプレッシャーを感じることがあります。' },
      zh: { score: 5, summary: '宝石使水更加清澈，辛为癸提供高品质的支持。', strength: '辛的精致将癸的智力能力提升一个层次。', challenge: '癸可能对辛的高标准感到压力。' },
    },
    '壬': {
      ko: { score: 3, summary: '큰 강에 이슬 한 방울이 더해지듯, 壬 앞에서 癸는 존재감이 약합니다.', strength: '같은 수 오행으로 직관적 이해와 소통이 빠릅니다.', challenge: '壬의 거대한 존재감에 癸가 묻히기 쉽습니다.' },
      en: { score: 3, summary: 'A drop of dew added to a great river — Gye\'s presence weakens before Im.', strength: 'Same Water element enables quick intuitive understanding.', challenge: 'Gye is easily overshadowed by Im\'s immense presence.' },
      ja: { score: 3, summary: '大河に露の一滴が加わるように、壬の前で癸は存在感が薄いです。', strength: '同じ水の五行で直感的な理解とコミュニケーションが速いです。', challenge: '壬の巨大な存在感に癸が埋もれやすいです。' },
      zh: { score: 3, summary: '大河中加一滴露水，癸在壬面前存在感微弱。', strength: '同属水行，直觉理解与沟通迅速。', challenge: '癸容易被壬巨大的存在感所掩盖。' },
    },
    '癸': {
      ko: { score: 3, summary: '같은 이슬끼리 모이면 작은 웅덩이가 되듯, 소박하지만 힘이 부족합니다.', strength: '서로의 내면을 직관적으로 이해하는 깊은 공감이 있습니다.', challenge: '둘 다 에너지가 약해 큰 일을 함께 추진하기 어렵습니다.' },
      en: { score: 3, summary: 'Dewdrops gathering form a small puddle — modest but lacking power.', strength: 'Deep empathy with intuitive understanding of each other\'s inner world.', challenge: 'Both lack energy, making it hard to pursue big projects together.' },
      ja: { score: 3, summary: '同じ露同士が集まれば小さな水たまりになるように、素朴ですが力が不足しています。', strength: '互いの内面を直感的に理解する深い共感があります。', challenge: '二人ともエネルギーが弱く、大きなことを共に推進するのが難しいです。' },
      zh: { score: 3, summary: '露水汇聚成小水洼，朴素但力量不足。', strength: '对彼此内心世界有直觉式的深度共鸣。', challenge: '两人能量都弱，难以共同推动大事。' },
    },
  },
}

// ---------------------------------------------------------------------------
// Overview content for each day master
// ---------------------------------------------------------------------------

export const COMPAT_OVERVIEW: Record<string, Record<Language, {
  title: string
  subtitle: string
  overview: string
  bestMatch: string
  cautionMatch: string
}>> = {
  '甲': {
    ko: { title: '갑(甲) 일간의 궁합', subtitle: '양목(陽木) 일간의 관계 패턴', overview: '甲 일간은 큰 나무처럼 곧고 독립적이며 리더십이 강합니다. 관계에서도 주도권을 잡으려 하며, 정직하고 솔직한 사람을 선호합니다. 자신을 지지해주는 사람에게 깊은 신뢰를 보냅니다.', bestMatch: '己, 壬, 癸', cautionMatch: '庚' },
    en: { title: 'Gap (甲) Day Master Compatibility', subtitle: 'Yang Wood Day Master Relationship Patterns', overview: 'The Gap day master is like a great tree — upright, independent, and a natural leader. In relationships, they seek to take charge, preferring honest and straightforward people. They place deep trust in those who support them.', bestMatch: 'Gi, Im, Gye', cautionMatch: 'Gyeong' },
    ja: { title: '甲日干の相性', subtitle: '陽木日干の関係パターン', overview: '甲日干は大木のようにまっすぐで独立的、リーダーシップが強い人です。関係でも主導権を握ろうとし、正直で率直な人を好みます。自分を支えてくれる人に深い信頼を寄せます。', bestMatch: '己、壬、癸', cautionMatch: '庚' },
    zh: { title: '甲日干的合盘', subtitle: '阳木日干的关系模式', overview: '甲日干如大树般正直独立，领导力强。在关系中倾向于主导，偏好诚实直率的人。对支持自己的人给予深厚信任。', bestMatch: '己、壬、癸', cautionMatch: '庚' },
  },
  '乙': {
    ko: { title: '을(乙) 일간의 궁합', subtitle: '음목(陰木) 일간의 관계 패턴', overview: '乙 일간은 덩굴이나 꽃처럼 유연하고 적응력이 뛰어납니다. 관계에서 부드러운 소통을 중시하며, 자신을 이끌어줄 수 있는 강한 파트너에게 끌립니다. 감성적 교류를 가장 중요하게 생각합니다.', bestMatch: '庚, 癸', cautionMatch: '辛' },
    en: { title: 'Eul (乙) Day Master Compatibility', subtitle: 'Yin Wood Day Master Relationship Patterns', overview: 'The Eul day master is like a vine or flower — flexible and adaptable. They value gentle communication in relationships and are drawn to strong partners who can guide them. Emotional exchange is their top priority.', bestMatch: 'Gyeong, Gye', cautionMatch: 'Sin' },
    ja: { title: '乙日干の相性', subtitle: '陰木日干の関係パターン', overview: '乙日干は蔓や花のように柔軟で適応力に優れています。関係では穏やかなコミュニケーションを大切にし、自分を導いてくれる強いパートナーに惹かれます。感性的な交流を最も重視します。', bestMatch: '庚、癸', cautionMatch: '辛' },
    zh: { title: '乙日干的合盘', subtitle: '阴木日干的关系模式', overview: '乙日干如藤蔓或花朵般灵活，适应力强。在关系中重视温和的沟通，被能引导自己的强大伴侣所吸引。最重视情感交流。', bestMatch: '庚、癸', cautionMatch: '辛' },
  },
  '丙': {
    ko: { title: '병(丙) 일간의 궁합', subtitle: '양화(陽火) 일간의 관계 패턴', overview: '丙 일간은 태양처럼 밝고 열정적이며 사교적입니다. 관계에서 주목받는 것을 좋아하고, 자신의 열정을 함께 나눌 파트너를 찾습니다. 따뜻하고 관대하지만, 때로는 상대를 압도할 수 있습니다.', bestMatch: '辛, 甲', cautionMatch: '壬' },
    en: { title: 'Byeong (丙) Day Master Compatibility', subtitle: 'Yang Fire Day Master Relationship Patterns', overview: 'The Byeong day master is like the sun — bright, passionate, and sociable. They enjoy being in the spotlight and seek partners who share their enthusiasm. Warm and generous, they can sometimes overwhelm others.', bestMatch: 'Sin, Gap', cautionMatch: 'Im' },
    ja: { title: '丙日干の相性', subtitle: '陽火日干の関係パターン', overview: '丙日干は太陽のように明るく情熱的で社交的です。関係では注目されることを好み、自分の情熱を共に分かち合うパートナーを探します。温かく寛大ですが、時に相手を圧倒することがあります。', bestMatch: '辛、甲', cautionMatch: '壬' },
    zh: { title: '丙日干的合盘', subtitle: '阳火日干的关系模式', overview: '丙日干如太阳般明亮热情、善于社交。在关系中喜欢成为焦点，寻找能共享热情的伴侣。温暖慷慨，但有时可能压倒对方。', bestMatch: '辛、甲', cautionMatch: '壬' },
  },
  '丁': {
    ko: { title: '정(丁) 일간의 궁합', subtitle: '음화(陰火) 일간의 관계 패턴', overview: '丁 일간은 촛불이나 등불처럼 따뜻하고 섬세합니다. 관계에서 깊은 감정적 유대를 중시하며, 자신을 이해해주는 파트너에게 헌신합니다. 내면이 복잡하지만 한번 마음을 연 사람에게는 한없이 따뜻합니다.', bestMatch: '壬, 甲', cautionMatch: '癸' },
    en: { title: 'Jeong (丁) Day Master Compatibility', subtitle: 'Yin Fire Day Master Relationship Patterns', overview: 'The Jeong day master is like a candle or lantern — warm and delicate. They value deep emotional bonds and devote themselves to understanding partners. Complex inside, they are infinitely warm to those they open up to.', bestMatch: 'Im, Gap', cautionMatch: 'Gye' },
    ja: { title: '丁日干の相性', subtitle: '陰火日干の関係パターン', overview: '丁日干はろうそくや灯りのように温かく繊細です。関係では深い感情的な絆を大切にし、自分を理解してくれるパートナーに献身します。内面は複雑ですが、一度心を開いた人には限りなく温かいです。', bestMatch: '壬、甲', cautionMatch: '癸' },
    zh: { title: '丁日干的合盘', subtitle: '阴火日干的关系模式', overview: '丁日干如烛光或灯笼般温暖细腻。在关系中重视深厚的情感纽带，对理解自己的伴侣全身心投入。内心复杂，但对敞开心扉的人无限温暖。', bestMatch: '壬、甲', cautionMatch: '癸' },
  },
  '戊': {
    ko: { title: '무(戊) 일간의 궁합', subtitle: '양토(陽土) 일간의 관계 패턴', overview: '戊 일간은 큰 산처럼 듬직하고 신뢰감이 있습니다. 관계에서 안정과 신뢰를 가장 중요하게 여기며, 느리지만 깊은 유대를 형성합니다. 한번 믿은 사람은 끝까지 책임지려는 성향이 있습니다.', bestMatch: '癸, 丙', cautionMatch: '甲' },
    en: { title: 'Mu (戊) Day Master Compatibility', subtitle: 'Yang Earth Day Master Relationship Patterns', overview: 'The Mu day master is like a great mountain — solid and trustworthy. They prioritize stability and trust in relationships, forming deep bonds slowly. Once they trust someone, they take responsibility to the end.', bestMatch: 'Gye, Byeong', cautionMatch: 'Gap' },
    ja: { title: '戊日干の相性', subtitle: '陽土日干の関係パターン', overview: '戊日干は大きな山のようにどっしりと頼もしいです。関係では安定と信頼を最も重視し、ゆっくりですが深い絆を結びます。一度信じた人には最後まで責任を持とうとする性質があります。', bestMatch: '癸、丙', cautionMatch: '甲' },
    zh: { title: '戊日干的合盘', subtitle: '阳土日干的关系模式', overview: '戊日干如大山般沉稳可靠。在关系中最重视稳定与信任，虽然缓慢但能形成深厚的纽带。一旦信任某人，会负责到底。', bestMatch: '癸、丙', cautionMatch: '甲' },
  },
  '己': {
    ko: { title: '기(己) 일간의 궁합', subtitle: '음토(陰土) 일간의 관계 패턴', overview: '己 일간은 비옥한 밭처럼 포용력이 크고 실용적입니다. 관계에서 상대를 있는 그대로 받아들이며, 조용히 뒷바라지하는 타입입니다. 눈에 띄지 않지만 관계의 기둥 역할을 합니다.', bestMatch: '甲', cautionMatch: '壬' },
    en: { title: 'Gi (己) Day Master Compatibility', subtitle: 'Yin Earth Day Master Relationship Patterns', overview: 'The Gi day master is like fertile soil — inclusive and practical. They accept partners as they are and quietly support from behind. Though unassuming, they serve as the pillar of the relationship.', bestMatch: 'Gap', cautionMatch: 'Im' },
    ja: { title: '己日干の相性', subtitle: '陰土日干の関係パターン', overview: '己日干は肥沃な畑のように包容力が大きく実用的です。関係では相手をありのまま受け入れ、静かに支える タイプです。目立ちませんが、関係の柱の役割を果たします。', bestMatch: '甲', cautionMatch: '壬' },
    zh: { title: '己日干的合盘', subtitle: '阴土日干的关系模式', overview: '己日干如肥沃的田地般包容力强、务实。在关系中接受伴侣本来的样子，默默在背后支持。虽不显眼，却是关系的支柱。', bestMatch: '甲', cautionMatch: '壬' },
  },
  '庚': {
    ko: { title: '경(庚) 일간의 궁합', subtitle: '양금(陽金) 일간의 관계 패턴', overview: '庚 일간은 강철이나 검처럼 강하고 결단력이 있습니다. 관계에서 의리를 중시하며, 솔직하고 직설적인 소통을 선호합니다. 겉은 차갑지만 속은 따뜻한 타입으로, 한번 마음을 준 사람에게는 변함없습니다.', bestMatch: '乙, 戊', cautionMatch: '丙' },
    en: { title: 'Gyeong (庚) Day Master Compatibility', subtitle: 'Yang Metal Day Master Relationship Patterns', overview: 'The Gyeong day master is like steel or a sword — strong and decisive. They value loyalty in relationships and prefer honest, direct communication. Cold on the outside but warm inside, they are unwavering toward those they care about.', bestMatch: 'Eul, Mu', cautionMatch: 'Byeong' },
    ja: { title: '庚日干の相性', subtitle: '陽金日干の関係パターン', overview: '庚日干は鋼鉄や剣のように強く決断力があります。関係では義理を重視し、率直で直接的なコミュニケーションを好みます。表面は冷たいですが内面は温かいタイプで、一度心を寄せた人には変わりません。', bestMatch: '乙、戊', cautionMatch: '丙' },
    zh: { title: '庚日干的合盘', subtitle: '阳金日干的关系模式', overview: '庚日干如钢铁或剑般刚强果断。在关系中重视义气，偏好坦率直接的沟通。外冷内热，对真心相待的人始终如一。', bestMatch: '乙、戊', cautionMatch: '丙' },
  },
  '辛': {
    ko: { title: '신(辛) 일간의 궁합', subtitle: '음금(陰金) 일간의 관계 패턴', overview: '辛 일간은 보석이나 귀금속처럼 아름답고 예민합니다. 관계에서 품격과 진정성을 중시하며, 자신의 가치를 알아주는 사람에게 마음을 엽니다. 까다롭지만 한번 인정한 사람에게는 충실합니다.', bestMatch: '丙, 戊', cautionMatch: '乙' },
    en: { title: 'Sin (辛) Day Master Compatibility', subtitle: 'Yin Metal Day Master Relationship Patterns', overview: 'The Sin day master is like a jewel or precious metal — beautiful and sensitive. They value class and authenticity in relationships, opening their heart to those who appreciate their worth. Picky but faithful once they accept someone.', bestMatch: 'Byeong, Mu', cautionMatch: 'Eul' },
    ja: { title: '辛日干の相性', subtitle: '陰金日干の関係パターン', overview: '辛日干は宝石や貴金属のように美しく繊細です。関係では品格と真実性を重視し、自分の価値を分かってくれる人に心を開きます。気難しいですが、一度認めた人には忠実です。', bestMatch: '丙、戊', cautionMatch: '乙' },
    zh: { title: '辛日干的合盘', subtitle: '阴金日干的关系模式', overview: '辛日干如宝石或贵金属般美丽敏感。在关系中重视品格与真诚，对欣赏自己价值的人敞开心扉。挑剔但一旦认可便忠诚不渝。', bestMatch: '丙、戊', cautionMatch: '乙' },
  },
  '壬': {
    ko: { title: '임(壬) 일간의 궁합', subtitle: '양수(陽水) 일간의 관계 패턴', overview: '壬 일간은 큰 강이나 바다처럼 넓고 깊은 포용력을 지닙니다. 관계에서 자유와 소통을 중시하며, 지적 교류가 가능한 파트너를 선호합니다. 흐르는 물처럼 유연하지만 방향이 정해지면 막강한 추진력을 보입니다.', bestMatch: '丁, 庚', cautionMatch: '戊' },
    en: { title: 'Im (壬) Day Master Compatibility', subtitle: 'Yang Water Day Master Relationship Patterns', overview: 'The Im day master is like a great river or ocean — vast and deeply inclusive. They value freedom and communication in relationships, preferring partners capable of intellectual exchange. Fluid like water but powerfully driven once direction is set.', bestMatch: 'Jeong, Gyeong', cautionMatch: 'Mu' },
    ja: { title: '壬日干の相性', subtitle: '陽水日干の関係パターン', overview: '壬日干は大河や海のように広く深い包容力を持っています。関係では自由とコミュニケーションを重視し、知的交流ができるパートナーを好みます。流れる水のように柔軟ですが、方向が決まれば強力な推進力を見せます。', bestMatch: '丁、庚', cautionMatch: '戊' },
    zh: { title: '壬日干的合盘', subtitle: '阳水日干的关系模式', overview: '壬日干如大河或大海般宽广深邃、包容力强。在关系中重视自由与沟通，偏好能进行智识交流的伴侣。如水般灵活，但方向确定后展现强大的推动力。', bestMatch: '丁、庚', cautionMatch: '戊' },
  },
  '癸': {
    ko: { title: '계(癸) 일간의 궁합', subtitle: '음수(陰水) 일간의 관계 패턴', overview: '癸 일간은 이슬이나 안개처럼 섬세하고 지혜롭습니다. 관계에서 깊은 정서적 교감을 추구하며, 조용히 상대를 관찰하고 이해합니다. 표현은 소극적이지만 내면의 감정은 매우 깊어 한번 사랑하면 깊이 헌신합니다.', bestMatch: '戊, 辛', cautionMatch: '丙' },
    en: { title: 'Gye (癸) Day Master Compatibility', subtitle: 'Yin Water Day Master Relationship Patterns', overview: 'The Gye day master is like dew or mist — delicate and wise. They pursue deep emotional connection, quietly observing and understanding others. Though outwardly reserved, their inner feelings run deep, devoting themselves deeply once they love.', bestMatch: 'Mu, Sin', cautionMatch: 'Byeong' },
    ja: { title: '癸日干の相性', subtitle: '陰水日干の関係パターン', overview: '癸日干は露や霧のように繊細で知恵深いです。関係では深い情緒的な交流を求め、静かに相手を観察し理解します。表現は消極的ですが内面の感情は非常に深く、一度愛すると深く献身します。', bestMatch: '戊、辛', cautionMatch: '丙' },
    zh: { title: '癸日干的合盘', subtitle: '阴水日干的关系模式', overview: '癸日干如露水或雾气般细腻智慧。在关系中追求深层的情感交流，安静地观察和理解对方。表达虽含蓄，但内心感情极深，一旦爱上便深深投入。', bestMatch: '戊、辛', cautionMatch: '丙' },
  },
}

// ---------------------------------------------------------------------------
// UI Labels
// ---------------------------------------------------------------------------

export const COMPAT_LABELS: Record<Language, {
  indexTitle: string
  indexSubtitle: string
  score: string
  strength: string
  challenge: string
  bestMatch: string
  cautionMatch: string
  overview: string
  ctaText: string
  ctaButton: string
  tenGod: string
  scoreLabels: Record<number, string>
}> = {
  ko: {
    indexTitle: '일간 궁합 가이드',
    indexSubtitle: '천간(天干)으로 보는 관계의 조화',
    score: '궁합 점수',
    strength: '잘 맞는 점',
    challenge: '주의할 점',
    bestMatch: '최고 궁합',
    cautionMatch: '주의 궁합',
    overview: '관계 스타일',
    ctaText: '내 일간이 궁금하다면',
    ctaButton: '무료 사주 계산하기',
    tenGod: '십신 관계',
    scoreLabels: { 1: '어려움', 2: '노력 필요', 3: '보통', 4: '좋음', 5: '최고' },
  },
  en: {
    indexTitle: 'Day Master Compatibility Guide',
    indexSubtitle: 'Relationship Harmony Through Heavenly Stems',
    score: 'Compatibility',
    strength: 'Strengths',
    challenge: 'Challenges',
    bestMatch: 'Best Match',
    cautionMatch: 'Caution',
    overview: 'Relationship Style',
    ctaText: 'Want to know your Day Master?',
    ctaButton: 'Free Saju Calculator',
    tenGod: 'Ten God',
    scoreLabels: { 1: 'Difficult', 2: 'Effort Needed', 3: 'Average', 4: 'Good', 5: 'Excellent' },
  },
  ja: {
    indexTitle: '日干相性ガイド',
    indexSubtitle: '天干で見る関係の調和',
    score: '相性スコア',
    strength: '良い点',
    challenge: '注意点',
    bestMatch: '最高の相性',
    cautionMatch: '注意の相性',
    overview: '関係スタイル',
    ctaText: '自分の日干が気になったら',
    ctaButton: '無料四柱推命計算',
    tenGod: '十神関係',
    scoreLabels: { 1: '困難', 2: '努力が必要', 3: '普通', 4: '良好', 5: '最高' },
  },
  zh: {
    indexTitle: '日干合盘指南',
    indexSubtitle: '通过天干看关系的和谐',
    score: '合盘评分',
    strength: '优势',
    challenge: '注意事项',
    bestMatch: '最佳搭配',
    cautionMatch: '需注意',
    overview: '关系风格',
    ctaText: '想知道你的日干吗？',
    ctaButton: '免费四柱计算',
    tenGod: '十神关系',
    scoreLabels: { 1: '困难', 2: '需要努力', 3: '一般', 4: '良好', 5: '最佳' },
  },
}
