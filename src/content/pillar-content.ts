import type { Language } from '../i18n'

// ---------------------------------------------------------------------------
// URL slug mapping for all 60 ganji (Korean romanization)
// ---------------------------------------------------------------------------

export const PILLAR_SLUGS: Record<string, string> = {
  '甲子': 'gap-ja',
  '乙丑': 'eul-chuk',
  '丙寅': 'byeong-in',
  '丁卯': 'jeong-myo',
  '戊辰': 'mu-jin',
  '己巳': 'gi-sa',
  '庚午': 'gyeong-o',
  '辛未': 'sin-mi',
  '壬申': 'im-sin',
  '癸酉': 'gye-yu',
  '甲戌': 'gap-sul',
  '乙亥': 'eul-hae',
  '丙子': 'byeong-ja',
  '丁丑': 'jeong-chuk',
  '戊寅': 'mu-in',
  '己卯': 'gi-myo',
  '庚辰': 'gyeong-jin',
  '辛巳': 'sin-sa',
  '壬午': 'im-o',
  '癸未': 'gye-mi',
  '甲申': 'gap-sin',
  '乙酉': 'eul-yu',
  '丙戌': 'byeong-sul',
  '丁亥': 'jeong-hae',
  '戊子': 'mu-ja',
  '己丑': 'gi-chuk',
  '庚寅': 'gyeong-in',
  '辛卯': 'sin-myo',
  '壬辰': 'im-jin',
  '癸巳': 'gye-sa',
  '甲午': 'gap-o',
  '乙未': 'eul-mi',
  '丙申': 'byeong-sin',
  '丁酉': 'jeong-yu',
  '戊戌': 'mu-sul',
  '己亥': 'gi-hae',
  '庚子': 'gyeong-ja',
  '辛丑': 'sin-chuk',
  '壬寅': 'im-in',
  '癸卯': 'gye-myo',
  '甲辰': 'gap-jin',
  '乙巳': 'eul-sa',
  '丙午': 'byeong-o',
  '丁未': 'jeong-mi',
  '戊申': 'mu-sin',
  '己酉': 'gi-yu',
  '庚戌': 'gyeong-sul',
  '辛亥': 'sin-hae',
  '壬子': 'im-ja',
  '癸丑': 'gye-chuk',
  '甲寅': 'gap-in',
  '乙卯': 'eul-myo',
  '丙辰': 'byeong-jin',
  '丁巳': 'jeong-sa',
  '戊午': 'mu-o',
  '己未': 'gi-mi',
  '庚申': 'gyeong-sin',
  '辛酉': 'sin-yu',
  '壬戌': 'im-sul',
  '癸亥': 'gye-hae',
}

// Reverse mapping: slug → ganji
export const SLUG_TO_GANJI: Record<string, string> = Object.fromEntries(
  Object.entries(PILLAR_SLUGS).map(([k, v]) => [v, k])
)

// All valid pillar slugs for routing
export const ALL_PILLAR_SLUGS = Object.values(PILLAR_SLUGS)

// ---------------------------------------------------------------------------
// Stem content type
// ---------------------------------------------------------------------------

interface StemInfo {
  name: string
  element: string
  nature: string
  image: string
  strengths: string
  weaknesses: string
  career: string
  relationship: string
}

// ---------------------------------------------------------------------------
// Multilingual content for 10 Heavenly Stems (천간)
// ---------------------------------------------------------------------------

export const STEM_CONTENT: Record<string, Record<Language, StemInfo>> = {
  '甲': {
    ko: {
      name: '갑(甲)',
      element: '양목(陽木)',
      nature: '큰 나무처럼 곧고 뚝심 있는 성격입니다. 한번 목표를 정하면 흔들리지 않으며, 자존심이 강하고 리더십이 뛰어납니다. 정의감이 있어 불의를 보면 참지 못합니다.',
      image: '하늘을 향해 곧게 뻗은 거대한 소나무를 닮았습니다.',
      strengths: '리더십과 추진력이 뛰어나며, 어려운 상황에서도 꿋꿋이 버티는 강인함을 지녔습니다. 큰 그림을 그리고 장기적 목표를 세우는 능력이 탁월합니다.',
      weaknesses: '고집이 세고 융통성이 부족할 수 있으며, 타인의 의견을 수용하는 데 어려움을 느낄 수 있습니다.',
      career: '조직의 수장이나 개척자 역할에 적합합니다. 사업가, 경영자, 공직자 등 리더십을 발휘할 수 있는 분야에서 두각을 나타냅니다. 새로운 길을 개척하는 선구자적 기질이 있습니다.',
      relationship: '연애에서도 주도적인 편이며 상대를 든든하게 지켜주려 합니다. 표현은 서툴지만 속 깊은 사랑을 하며, 한번 마음을 주면 끝까지 책임지려 합니다.',
    },
    en: {
      name: 'Gap (甲)',
      element: 'Yang Wood',
      nature: 'Like a towering tree, Gap personalities are upright and unwavering. Once they set a goal, they do not waver. They possess strong pride and exceptional leadership qualities, with a deep sense of justice.',
      image: 'A great pine tree reaching straight toward the sky.',
      strengths: 'Outstanding leadership and drive. They endure hardship with resilience and excel at long-term vision and strategic planning.',
      weaknesses: 'Can be stubborn and inflexible, sometimes struggling to accept differing viewpoints.',
      career: 'Suited for roles at the helm — entrepreneurs, executives, and public officials. They thrive in positions requiring leadership and pioneering spirit, often breaking new ground in their field.',
      relationship: 'Takes the lead in relationships and strives to protect their partner. Though not always expressive, their love runs deep, and they commit fully once they give their heart.',
    },
    ja: {
      name: '甲（こう）',
      element: '陽木',
      nature: '大きな木のようにまっすぐで信念の強い性格です。一度目標を定めたら揺るがず、プライドが高くリーダーシップに優れています。正義感が強く、不正を見過ごすことができません。',
      image: '天に向かってまっすぐ伸びる大きな松の木のようです。',
      strengths: 'リーダーシップと推進力に優れ、困難な状況でも耐え抜く強さを持っています。大きなビジョンを描き、長期的な目標を立てる能力が卓越しています。',
      weaknesses: '頑固で柔軟性に欠けることがあり、他人の意見を受け入れるのが難しい場合があります。',
      career: '組織のトップや開拓者の役割に適しています。起業家、経営者、公務員など、リーダーシップを発揮できる分野で頭角を現します。新しい道を切り拓く先駆者的な気質があります。',
      relationship: '恋愛でも主導的で、相手をしっかり守ろうとします。表現は不器用ですが深い愛情を持ち、一度心を決めたら最後まで責任を持とうとします。',
    },
    zh: {
      name: '甲',
      element: '阳木',
      nature: '如同参天大树般正直坚毅。一旦确立目标便不会动摇,自尊心强,具有卓越的领导力。正义感强烈,面对不公绝不妥协。',
      image: '犹如一棵直插云天的苍松。',
      strengths: '领导力和执行力出众,在逆境中也能坚韧不拔。善于描绘宏大蓝图,制定长远目标的能力卓越。',
      weaknesses: '可能过于固执、缺乏灵活性,有时难以接受他人的不同意见。',
      career: '适合担任组织领导者或开拓者角色。在企业家、管理者、公职等能发挥领导力的领域表现突出,具有开拓新路的先驱气质。',
      relationship: '恋爱中倾向主导,努力守护对方。虽然不善表达,但爱意深沉,一旦交付真心便会负责到底。',
    },
  },

  '乙': {
    ko: {
      name: '을(乙)',
      element: '음목(陰木)',
      nature: '풀이나 덩굴처럼 유연하고 적응력이 뛰어난 성격입니다. 부드러운 외모 속에 강한 생명력을 지녔으며, 어떤 환경에서도 살아남는 끈기가 있습니다. 예술적 감성이 풍부합니다.',
      image: '바위틈에서도 피어나는 질긴 덩굴이나 들꽃을 닮았습니다.',
      strengths: '뛰어난 적응력과 유연함으로 어떤 환경에서도 자기 자리를 만들어냅니다. 사람들과 잘 어울리며 인간관계에서 갈등을 부드럽게 풀어가는 능력이 있습니다.',
      weaknesses: '우유부단하게 보일 수 있으며, 결정적인 순간에 단호함이 부족할 수 있습니다.',
      career: '예술, 디자인, 상담, 교육 등 감성과 소통이 필요한 분야에서 빛을 발합니다. 협력 기반의 업무에서 조율자 역할을 잘 수행하며, 창의적인 직업에 적성이 맞습니다.',
      relationship: '다정하고 배려심 깊은 연인입니다. 상대의 기분을 잘 읽고 맞춰주며, 관계를 부드럽게 이끌어갑니다. 다만 자신의 감정을 솔직히 표현하는 연습이 필요할 수 있습니다.',
    },
    en: {
      name: 'Eul (乙)',
      element: 'Yin Wood',
      nature: 'Flexible and adaptable like grass or vines. Beneath a gentle exterior lies strong vitality and tenacity to thrive in any environment. Rich in artistic sensibility.',
      image: 'A resilient vine or wildflower blooming through cracks in rock.',
      strengths: 'Exceptional adaptability and flexibility — they carve out a place for themselves anywhere. Skilled at harmonizing relationships and resolving conflicts gently.',
      weaknesses: 'May appear indecisive and can lack assertiveness at critical moments.',
      career: 'Shines in fields requiring sensitivity and communication — art, design, counseling, education. Excels as a coordinator in collaborative work and fits creative professions well.',
      relationship: 'A warm and considerate partner who reads and accommodates their loved one\'s moods. Guides relationships smoothly, though may need to practice expressing their own feelings more openly.',
    },
    ja: {
      name: '乙（おつ）',
      element: '陰木',
      nature: '草やつる草のようにしなやかで適応力に優れた性格です。柔らかい外見の中に強い生命力を持ち、どんな環境でも生き残るたくましさがあります。芸術的な感性が豊かです。',
      image: '岩の隙間からでも花を咲かせる強靭なつる草や野の花のようです。',
      strengths: '優れた適応力と柔軟性で、どんな環境でも自分の居場所を作り出します。人付き合いが上手で、人間関係の対立を穏やかに解決する力があります。',
      weaknesses: '優柔不断に見えることがあり、決定的な場面で断固とした態度が足りないことがあります。',
      career: '芸術、デザイン、カウンセリング、教育など、感性とコミュニケーションが求められる分野で輝きます。協力型の業務で調整役を上手にこなし、創造的な職業に適性があります。',
      relationship: '優しく思いやりのある恋人です。相手の気持ちをよく読み取って合わせ、関係を穏やかに導きます。ただし、自分の感情を素直に表現する練習が必要かもしれません。',
    },
    zh: {
      name: '乙',
      element: '阴木',
      nature: '如同藤蔓般柔韧,适应力极强。温柔外表下蕴含强大生命力,在任何环境中都能顽强生存。艺术感性丰富。',
      image: '宛如从岩缝中绽放的坚韧藤蔓或野花。',
      strengths: '以出色的适应力和灵活性在任何环境中都能找到自己的位置。善于与人相处,具有温和化解矛盾的能力。',
      weaknesses: '可能显得优柔寡断,在关键时刻缺乏果断。',
      career: '在艺术、设计、咨询、教育等需要感性与沟通的领域大放异彩。擅长在协作工作中担任协调角色,适合创意型职业。',
      relationship: '温柔体贴的恋人,善于察觉并迎合对方的情绪,引导关系平稳发展。不过可能需要练习更坦率地表达自己的感受。',
    },
  },

  '丙': {
    ko: {
      name: '병(丙)',
      element: '양화(陽火)',
      nature: '태양처럼 밝고 열정적인 성격입니다. 존재 자체로 주변을 환하게 밝히며, 낙관적이고 에너지가 넘칩니다. 표현력이 강하고 사교성이 좋아 어디서든 주목받습니다.',
      image: '만물을 비추는 뜨거운 태양 그 자체입니다.',
      strengths: '강한 카리스마와 추진력으로 사람들을 이끄는 능력이 있습니다. 낙관적 에너지로 주변에 활력을 불어넣으며, 도전을 두려워하지 않는 용기가 있습니다.',
      weaknesses: '성격이 급하고 인내심이 부족할 수 있으며, 지나친 자신감이 독선으로 비칠 수 있습니다.',
      career: '무대, 미디어, 정치, 마케팅 등 주목받는 분야에서 탁월한 능력을 발휘합니다. 사람들 앞에 서는 일을 즐기며, 영감을 주는 리더형입니다.',
      relationship: '열정적이고 드라마틱한 연애를 합니다. 상대에게 아낌없이 표현하고 헌신하지만, 관심과 인정을 받지 못하면 쉽게 상처받을 수 있습니다.',
    },
    en: {
      name: 'Byeong (丙)',
      element: 'Yang Fire',
      nature: 'Bright and passionate like the sun. They illuminate everyone around them with optimism and overflowing energy. Expressive and sociable, they naturally draw attention wherever they go.',
      image: 'The blazing sun itself, warming and illuminating all things.',
      strengths: 'Natural charisma and drive to lead others. Their optimistic energy invigorates those around them, and they face challenges with fearless courage.',
      weaknesses: 'Can be impatient and overconfident, sometimes coming across as overbearing.',
      career: 'Excels in spotlight fields — media, politics, marketing, performing arts. Enjoys being in front of people and serves as an inspirational leader type.',
      relationship: 'Loves passionately and dramatically. Gives generously in expression and devotion, but can be easily hurt when they feel their efforts go unrecognized.',
    },
    ja: {
      name: '丙（へい）',
      element: '陽火',
      nature: '太陽のように明るく情熱的な性格です。存在そのものが周囲を明るく照らし、楽観的でエネルギーに満ち溢れています。表現力が強く社交的で、どこでも注目を集めます。',
      image: '万物を照らす熱い太陽そのものです。',
      strengths: '強いカリスマと推進力で人々を導く力があります。楽観的なエネルギーで周囲に活力を与え、挑戦を恐れない勇気があります。',
      weaknesses: '性急で忍耐力が不足することがあり、過度な自信が独善的に映ることがあります。',
      career: 'メディア、政治、マーケティング、舞台芸術など注目を集める分野で卓越した能力を発揮します。人前に立つことを楽しみ、人々にインスピレーションを与えるリーダータイプです。',
      relationship: '情熱的でドラマチックな恋愛をします。相手に惜しみなく表現し献身しますが、関心や認められない場合は傷つきやすいです。',
    },
    zh: {
      name: '丙',
      element: '阳火',
      nature: '如太阳般明亮热情。其存在本身就能照亮周围,乐观且精力充沛。表现力强、善于社交,走到哪里都是焦点。',
      image: '照耀万物的炽热太阳本身。',
      strengths: '凭借强大的魅力和执行力引领他人。以乐观的能量为周围注入活力,拥有无畏挑战的勇气。',
      weaknesses: '性格急躁、耐心不足,过度自信有时会显得独断。',
      career: '在媒体、政治、营销、舞台艺术等备受瞩目的领域发挥卓越能力。享受站在人前,是激励型领导者。',
      relationship: '恋爱热烈而戏剧化。对伴侣毫不吝啬地表达和奉献,但若得不到关注和认可,容易受伤。',
    },
  },

  '丁': {
    ko: {
      name: '정(丁)',
      element: '음화(陰火)',
      nature: '촛불이나 달빛처럼 은은하고 따뜻한 성격입니다. 섬세하고 통찰력이 뛰어나며, 겉으로는 조용하지만 내면에 강한 불꽃을 품고 있습니다. 직관력이 예민합니다.',
      image: '어둠 속에서 길을 밝히는 고요한 촛불이나 달빛을 닮았습니다.',
      strengths: '뛰어난 직관력과 통찰력으로 본질을 꿰뚫어 봅니다. 섬세한 감성으로 사람의 마음을 잘 읽으며, 집중력과 몰입도가 매우 높습니다.',
      weaknesses: '예민하고 걱정이 많을 수 있으며, 완벽주의 성향이 스트레스의 원인이 되기도 합니다.',
      career: '연구, 분석, 심리상담, 문학, 요리 등 섬세함과 집중력이 필요한 분야에서 능력을 발휘합니다. 깊이 있는 전문성을 쌓아가는 장인형 직업에 적합합니다.',
      relationship: '깊고 진실된 사랑을 하며, 상대의 내면을 진심으로 이해하려 합니다. 다정하지만 쉽게 마음을 열지 않으며, 신뢰가 쌓이면 한없이 따뜻한 사람입니다.',
    },
    en: {
      name: 'Jeong (丁)',
      element: 'Yin Fire',
      nature: 'Subtle and warm like candlelight or moonlight. Delicate and perceptive, quiet on the surface but carrying an intense inner flame. Possesses sharp intuition.',
      image: 'A tranquil candle or moonlight illuminating a path through darkness.',
      strengths: 'Piercing intuition and insight that sees to the heart of matters. Reads people with fine sensitivity and possesses remarkable focus and depth of concentration.',
      weaknesses: 'Can be overly sensitive and prone to worry. Perfectionist tendencies may become a source of stress.',
      career: 'Excels in fields requiring precision and focus — research, analysis, psychology, literature, culinary arts. Suited for artisan-type careers that build deep expertise over time.',
      relationship: 'Loves deeply and sincerely, striving to truly understand their partner\'s inner world. Affectionate but slow to open up; once trust is built, they become an endlessly warm presence.',
    },
    ja: {
      name: '丁（てい）',
      element: '陰火',
      nature: 'ろうそくの火や月光のように穏やかで温かい性格です。繊細で洞察力に優れ、外見は静かですが内面に強い炎を秘めています。直感力が鋭いです。',
      image: '暗闇の中で道を照らす静かなろうそくの火や月光のようです。',
      strengths: '優れた直感力と洞察力で物事の本質を見抜きます。繊細な感性で人の心をよく読み取り、集中力と没入度が非常に高いです。',
      weaknesses: '敏感で心配性になりやすく、完璧主義な傾向がストレスの原因になることもあります。',
      career: '研究、分析、心理カウンセリング、文学、料理など、繊細さと集中力が求められる分野で能力を発揮します。深い専門性を積み上げる職人型の職業に適しています。',
      relationship: '深く真実の愛を貫き、相手の内面を心から理解しようとします。優しいですが簡単には心を開かず、信頼が築かれるとこの上なく温かい存在になります。',
    },
    zh: {
      name: '丁',
      element: '阴火',
      nature: '如烛光或月光般柔和温暖。细腻且洞察力强,表面安静但内心蕴含炽热的火焰。直觉极为敏锐。',
      image: '宛如在黑暗中照亮前路的宁静烛光或月光。',
      strengths: '以卓越的直觉和洞察力洞悉事物本质。以细腻感性读懂人心,专注力和投入度极高。',
      weaknesses: '可能过于敏感、容易忧虑,完美主义倾向有时会成为压力来源。',
      career: '在研究、分析、心理咨询、文学、烹饪等需要细腻和专注的领域发挥才能。适合积累深厚专业性的匠人型职业。',
      relationship: '爱得深沉而真挚,努力真正理解伴侣的内心世界。温柔但不轻易敞开心扉,信任建立后会成为无比温暖的存在。',
    },
  },

  '戊': {
    ko: {
      name: '무(戊)',
      element: '양토(陽土)',
      nature: '산처럼 듬직하고 안정적인 성격입니다. 포용력이 넓고 신뢰감을 주며, 주변 사람들의 중심 역할을 합니다. 느리지만 확실한 것을 추구하고, 변함없는 태도로 사람들에게 안정감을 줍니다.',
      image: '흔들림 없이 우뚝 선 거대한 산을 닮았습니다.',
      strengths: '뛰어난 포용력과 안정감으로 사람들의 신뢰를 받습니다. 인내심이 강하고 꾸준히 노력하여 결국 목표를 이루어냅니다. 위기 상황에서도 흔들리지 않는 중심이 됩니다.',
      weaknesses: '변화에 느리게 적응하고 보수적일 수 있으며, 고집스러운 면이 답답하게 느껴질 수 있습니다.',
      career: '부동산, 건축, 금융, 행정 등 안정성과 신뢰가 중요한 분야에 적합합니다. 장기 프로젝트를 꾸준히 끌고 나가는 관리자형 리더로서 능력을 발휘합니다.',
      relationship: '한번 마음을 주면 변하지 않는 충실한 연인입니다. 화려한 표현보다 실질적인 행동으로 사랑을 증명하며, 안정적이고 편안한 관계를 만들어갑니다.',
    },
    en: {
      name: 'Mu (戊)',
      element: 'Yang Earth',
      nature: 'Solid and stable like a mountain. Broad in tolerance and radiating trustworthiness, they serve as the anchor for those around them. They prefer the slow but sure path and provide steadiness through unchanging reliability.',
      image: 'A mighty mountain standing firm and unshaken.',
      strengths: 'Earns deep trust through tolerance and stability. Possesses great patience and persistence to ultimately achieve goals. Becomes an unwavering center even in crisis.',
      weaknesses: 'Can be slow to adapt to change and overly conservative. Stubbornness may frustrate others.',
      career: 'Suited for fields where stability and trust matter — real estate, construction, finance, administration. Excels as a managerial leader who steadily drives long-term projects.',
      relationship: 'A faithful partner who does not change once committed. Proves love through practical actions rather than grand gestures, building a stable and comfortable relationship.',
    },
    ja: {
      name: '戊（ぼ）',
      element: '陽土',
      nature: '山のようにどっしりと安定した性格です。包容力が広く信頼感を与え、周囲の人々の中心的な存在です。ゆっくりですが確実なものを追求し、変わらない態度で安心感を与えます。',
      image: '揺るぎなくそびえ立つ巨大な山のようです。',
      strengths: '優れた包容力と安定感で人々の信頼を得ます。忍耐力が強く、着実に努力して最終的に目標を達成します。危機的状況でも揺るがない柱となります。',
      weaknesses: '変化への適応が遅く保守的になりがちで、頑固な面がもどかしく感じられることがあります。',
      career: '不動産、建築、金融、行政など、安定性と信頼が重要な分野に適しています。長期プロジェクトを着実に推進する管理者型リーダーとして力を発揮します。',
      relationship: '一度心を決めたら変わらない誠実な恋人です。華やかな表現より実質的な行動で愛を証明し、安定した心地よい関係を築いていきます。',
    },
    zh: {
      name: '戊',
      element: '阳土',
      nature: '如山般沉稳安定。包容力强,给人以信赖感,是周围人的核心。追求缓慢但确定的事物,以始终如一的态度给人安全感。',
      image: '犹如巍然屹立、岿然不动的巨山。',
      strengths: '以出色的包容力和稳定感赢得信赖。耐心极强,坚持不懈最终达成目标。即使在危机中也能成为不动如山的支柱。',
      weaknesses: '适应变化较慢,可能过于保守,固执的一面有时令人感到憋闷。',
      career: '适合房地产、建筑、金融、行政等重视稳定性和信赖的领域。作为稳步推进长期项目的管理型领导者发挥能力。',
      relationship: '一旦交出真心便不会改变的忠诚恋人。比起华丽的表达,更以实际行动证明爱意,营造稳定舒适的关系。',
    },
  },

  '己': {
    ko: {
      name: '기(己)',
      element: '음토(陰土)',
      nature: '비옥한 논밭처럼 만물을 품고 키우는 성격입니다. 실용적이고 현실적이며, 겸손하고 배려심이 깊습니다. 갈등 상황에서 중재 역할을 잘 하며, 사람들을 조용히 보살핍니다.',
      image: '만물을 키워내는 비옥하고 부드러운 논밭을 닮았습니다.',
      strengths: '실용적 지혜와 뛰어난 중재력을 갖추었습니다. 현실적 판단력이 좋고, 사람을 키우고 조직을 화합시키는 능력이 탁월합니다.',
      weaknesses: '자기 주장이 약해 보일 수 있고, 타인에게 맞추다 자신의 욕구를 무시할 수 있습니다.',
      career: '교육, HR, 농업, 요식업, 중재 등 사람을 돌보고 키우는 분야에 적합합니다. 화려하진 않지만 실속 있는 성과를 꾸준히 만들어내는 유형입니다.',
      relationship: '헌신적이고 모성적(부성적)인 사랑을 합니다. 상대를 편안하게 해주는 능력이 있으며, 가정적이고 안정된 관계를 중시합니다.',
    },
    en: {
      name: 'Gi (己)',
      element: 'Yin Earth',
      nature: 'Nurturing like fertile farmland, embracing and cultivating all things. Practical, realistic, humble, and deeply considerate. Mediates conflicts skillfully and quietly cares for those around them.',
      image: 'Rich, soft farmland that nurtures all living things.',
      strengths: 'Possesses practical wisdom and excellent mediation skills. Sound realistic judgment combined with a remarkable ability to cultivate people and harmonize organizations.',
      weaknesses: 'May seem passive in asserting themselves and might neglect their own needs while accommodating others.',
      career: 'Suited for nurturing fields — education, HR, agriculture, hospitality, mediation. Consistently delivers solid results without flashiness.',
      relationship: 'Loves with devotion and a nurturing spirit. Has a gift for making partners feel at ease and values a home-centered, stable relationship.',
    },
    ja: {
      name: '己（き）',
      element: '陰土',
      nature: '肥沃な田畑のように万物を包み育てる性格です。実用的で現実的、謙虚で思いやりが深いです。対立の場面で仲裁役をよくこなし、人々を静かに見守ります。',
      image: '万物を育む豊かで柔らかな田畑のようです。',
      strengths: '実用的な知恵と優れた仲裁力を備えています。現実的な判断力が優れ、人を育て組織を調和させる能力が卓越しています。',
      weaknesses: '自己主張が弱く見えることがあり、他人に合わせるあまり自分の欲求を無視してしまうことがあります。',
      career: '教育、人事、農業、飲食業、仲裁など、人を世話し育てる分野に適しています。華やかではありませんが、着実に実のある成果を出すタイプです。',
      relationship: '献身的で母性的（父性的）な愛を注ぎます。相手を安心させる力があり、家庭的で安定した関係を大切にします。',
    },
    zh: {
      name: '己',
      element: '阴土',
      nature: '如同肥沃的田地,包容并培育万物。务实、现实、谦逊且体贴入微。善于在冲突中充当调解者,默默关怀身边的人。',
      image: '宛如滋养万物的肥沃柔软的良田。',
      strengths: '具备实用智慧和出色的调解能力。现实判断力强,培养人才和促进组织和谐的能力卓越。',
      weaknesses: '可能显得不够坚持自我,迁就他人时容易忽视自身需求。',
      career: '适合教育、人力资源、农业、餐饮、调解等关怀和培养人的领域。虽不华丽,但能持续产出扎实成果。',
      relationship: '奉献型的爱,带有慈母(严父)般的温暖。善于让对方感到安心,重视以家庭为中心的稳定关系。',
    },
  },

  '庚': {
    ko: {
      name: '경(庚)',
      element: '양금(陽金)',
      nature: '칼이나 강철처럼 날카롭고 결단력 있는 성격입니다. 정의감이 강하고 의리를 중시하며, 비효율적인 것을 참지 못합니다. 개혁과 변화를 추구하며 과감한 결정을 내립니다.',
      image: '불에 담금질된 강인한 보검이나 도끼를 닮았습니다.',
      strengths: '뛰어난 결단력과 실행력으로 일을 추진합니다. 의리가 있고 약속을 반드시 지키며, 불합리한 상황을 바로잡는 개혁 능력이 있습니다.',
      weaknesses: '직설적이고 날카로워 타인에게 상처를 줄 수 있으며, 융통성이 부족하고 너무 원칙적일 수 있습니다.',
      career: '법률, 군사, 외과의, 엔지니어링, 경영 구조조정 등 결단력과 정확성이 필요한 분야에서 빛을 발합니다. 문제를 정확히 잘라내는 수술적 리더십을 발휘합니다.',
      relationship: '직진형 연애를 하며, 좋고 싫음이 명확합니다. 한번 사랑하면 의리 있게 지키지만, 표현이 직설적이라 상대가 부담을 느낄 수 있습니다.',
    },
    en: {
      name: 'Gyeong (庚)',
      element: 'Yang Metal',
      nature: 'Sharp and decisive like a sword or steel. Driven by a strong sense of justice and loyalty, with no tolerance for inefficiency. Pursues reform and makes bold decisions.',
      image: 'A mighty sword or axe, tempered and hardened by fire.',
      strengths: 'Outstanding decisiveness and execution. Deeply loyal, always keeps promises, and possesses the reforming ability to right what is wrong.',
      weaknesses: 'Can be blunt and sharp-tongued, potentially hurting others. May be too rigid and principled to be flexible.',
      career: 'Excels in fields demanding precision and decisiveness — law, military, surgery, engineering, corporate restructuring. Demonstrates surgical leadership that cuts problems cleanly.',
      relationship: 'Direct in love with clear likes and dislikes. Fiercely loyal once committed, but their bluntness can sometimes overwhelm a partner.',
    },
    ja: {
      name: '庚（こう）',
      element: '陽金',
      nature: '刀や鋼鉄のように鋭く決断力のある性格です。正義感が強く義理を重んじ、非効率なものを我慢できません。改革と変化を追求し、果敢な決断を下します。',
      image: '火で鍛え上げられた強靭な宝剣や斧のようです。',
      strengths: '優れた決断力と実行力で物事を推進します。義理堅く約束は必ず守り、不合理な状況を正す改革力があります。',
      weaknesses: '率直で鋭いため他人を傷つけることがあり、融通が利かず原則に固執しすぎることがあります。',
      career: '法律、軍事、外科医、エンジニアリング、経営再建など、決断力と正確さが求められる分野で輝きます。問題を的確に切り取る外科的なリーダーシップを発揮します。',
      relationship: '一直線の恋愛をし、好き嫌いがはっきりしています。一度愛すると義理堅く守りますが、直接的な表現が相手の負担になることがあります。',
    },
    zh: {
      name: '庚',
      element: '阳金',
      nature: '如刀剑钢铁般锐利果断。正义感强、重义气,对低效零容忍。追求改革变化,敢于做出大胆决断。',
      image: '犹如经过淬火锻造的刚强宝剑或利斧。',
      strengths: '以卓越的决断力和执行力推进事务。重义气、言必信,具有纠正不合理现状的改革能力。',
      weaknesses: '直言不讳、言辞犀利,可能伤害他人。过于原则化,缺乏灵活性。',
      career: '在法律、军事、外科、工程、企业重组等需要决断力和精准度的领域大放异彩。展现精准剖析问题的外科式领导力。',
      relationship: '恋爱直来直往,爱憎分明。一旦爱上便义气相守,但直白的表达方式有时会让对方感到压力。',
    },
  },

  '辛': {
    ko: {
      name: '신(辛)',
      element: '음금(陰金)',
      nature: '보석이나 귀금속처럼 세련되고 아름다운 성격입니다. 완벽주의적이며 심미안이 뛰어나고, 자존심이 높습니다. 감수성이 예민하고 섬세한 아름다움을 추구합니다.',
      image: '정교하게 세공된 다이아몬드나 보석을 닮았습니다.',
      strengths: '뛰어난 심미안과 섬세함으로 높은 품질의 결과물을 만들어냅니다. 자기 관리에 철저하고, 세련된 취향과 안목을 가지고 있습니다.',
      weaknesses: '예민하고 상처받기 쉬우며, 완벽주의로 인해 자신과 타인에게 높은 기준을 적용하여 피로감을 줄 수 있습니다.',
      career: '패션, 주얼리, 금융, IT, 예술 비평 등 정교함과 안목이 필요한 분야에서 두각을 나타냅니다. 디테일에 강하고 품격 있는 결과물을 추구합니다.',
      relationship: '로맨틱하고 감각적인 연애를 하며, 아름다운 관계를 꿈꿉니다. 상대에게 높은 기대를 갖지만, 마음을 연 상대에게는 다정하고 섬세한 배려를 보여줍니다.',
    },
    en: {
      name: 'Sin (辛)',
      element: 'Yin Metal',
      nature: 'Refined and beautiful like a precious gem. Perfectionist with exceptional aesthetic sense and high self-regard. Emotionally sensitive and pursues delicate beauty in all things.',
      image: 'A precisely cut diamond or exquisite jewel.',
      strengths: 'Creates high-quality results through refined taste and meticulous attention to detail. Disciplined in self-management with sophisticated taste and discernment.',
      weaknesses: 'Sensitive and easily hurt. Perfectionism can exhaust both themselves and others through impossibly high standards.',
      career: 'Shines in fields requiring precision and taste — fashion, jewelry, finance, IT, art criticism. Strong in details and always pursues elegant results.',
      relationship: 'Romantic and sensual in love, dreaming of a beautiful relationship. Holds high expectations but shows tender and delicate care to those they let into their heart.',
    },
    ja: {
      name: '辛（しん）',
      element: '陰金',
      nature: '宝石や貴金属のように洗練された美しい性格です。完璧主義で審美眼に優れ、プライドが高いです。感受性が繊細で、洗練された美しさを追求します。',
      image: '精巧に加工されたダイヤモンドや宝石のようです。',
      strengths: '優れた審美眼と繊細さで高品質な成果を生み出します。自己管理に徹底しており、洗練された趣味と見識を持っています。',
      weaknesses: '繊細で傷つきやすく、完璧主義のために自分にも他人にも高い基準を課して疲弊させることがあります。',
      career: 'ファッション、ジュエリー、金融、IT、芸術批評など、精緻さと目利きが求められる分野で頭角を現します。ディテールに強く、品格のある成果を追求します。',
      relationship: 'ロマンチックで感覚的な恋愛をし、美しい関係を夢見ます。相手に高い期待を持ちますが、心を開いた相手には優しく繊細な配慮を見せます。',
    },
    zh: {
      name: '辛',
      element: '阴金',
      nature: '如宝石贵金属般精致优雅。完美主义者,审美力出众,自尊心强。感性细腻,追求精致之美。',
      image: '宛如精心雕琢的钻石或珠宝。',
      strengths: '以卓越的审美眼光和细腻创造出高品质成果。严于自律,品味高雅、眼光独到。',
      weaknesses: '敏感易受伤,完美主义使自己和他人都承受过高标准的压力。',
      career: '在时尚、珠宝、金融、IT、艺术评论等需要精致和鉴赏力的领域崭露头角。注重细节,追求有格调的成果。',
      relationship: '恋爱浪漫而有格调,梦想美好的关系。对伴侣期望较高,但对敞开心扉的人展现温柔细腻的关怀。',
    },
  },

  '壬': {
    ko: {
      name: '임(壬)',
      element: '양수(陽水)',
      nature: '바다나 큰 강처럼 넓고 자유로운 성격입니다. 지적 호기심이 강하고 야심이 크며, 어떤 그릇에도 담기지 않는 자유로운 영혼입니다. 변화를 즐기고 새로운 것을 끊임없이 탐구합니다.',
      image: '끝없이 펼쳐진 대양이나 도도하게 흐르는 큰 강을 닮았습니다.',
      strengths: '광범위한 지식과 뛰어난 지적 능력을 갖추었습니다. 큰 스케일의 사고와 뛰어난 전략적 판단력이 있으며, 위기 상황에서 유연하게 대처합니다.',
      weaknesses: '집중력이 분산되기 쉽고, 한곳에 정착하지 못하는 방랑벽이 있을 수 있습니다.',
      career: '무역, 해운, 외교, 학술, 미디어, 컨설팅 등 넓은 세계를 무대로 활동하는 분야에서 능력을 발휘합니다. 글로벌한 시야과 전략적 사고가 빛을 발합니다.',
      relationship: '자유로운 연애를 추구하며, 지적 교감을 중시합니다. 매력적이고 스케일 큰 사랑을 하지만, 속박받는 것을 싫어하여 상대에게 독립적 공간을 요구합니다.',
    },
    en: {
      name: 'Im (壬)',
      element: 'Yang Water',
      nature: 'Broad and free like the ocean or a great river. Intellectually curious with grand ambitions — a free spirit that cannot be contained. Thrives on change and ceaselessly explores the new.',
      image: 'A boundless ocean or a majestic flowing river.',
      strengths: 'Possesses vast knowledge and exceptional intellect. Thinks on a grand scale with outstanding strategic judgment and handles crises with fluid adaptability.',
      weaknesses: 'Prone to scattered focus and may have a restless nature that resists settling in one place.',
      career: 'Thrives in globally-oriented fields — trade, shipping, diplomacy, academia, media, consulting. Their global perspective and strategic thinking truly shine.',
      relationship: 'Seeks freedom in love and values intellectual connection. Loves on a grand scale with natural charm, but dislikes feeling constrained and needs independent space.',
    },
    ja: {
      name: '壬（じん）',
      element: '陽水',
      nature: '海や大河のように広く自由な性格です。知的好奇心が強く野心が大きく、どんな器にも収まらない自由な魂です。変化を楽しみ、新しいものを絶えず探求します。',
      image: '果てしなく広がる大海原や悠々と流れる大河のようです。',
      strengths: '幅広い知識と優れた知力を備えています。大きなスケールの思考と卓越した戦略的判断力があり、危機的状況でも柔軟に対処します。',
      weaknesses: '集中力が散漫になりやすく、一か所に定着できない放浪癖があるかもしれません。',
      career: '貿易、海運、外交、学術、メディア、コンサルティングなど、広い世界を舞台に活躍する分野で能力を発揮します。グローバルな視野と戦略的思考が光ります。',
      relationship: '自由な恋愛を求め、知的な交流を重視します。魅力的でスケールの大きな愛を注ぎますが、束縛を嫌い、相手にも独立した空間を求めます。',
    },
    zh: {
      name: '壬',
      element: '阳水',
      nature: '如大海或大河般宽广自由。求知欲强、志向远大,是不受任何容器束缚的自由灵魂。享受变化,不断探索新事物。',
      image: '犹如无边无际的大洋或气势磅礴的大河。',
      strengths: '拥有广博的知识和卓越的智力。具有宏大的思维格局和出色的战略判断力,在危机中灵活应对。',
      weaknesses: '注意力容易分散,可能有难以安定一处的漂泊倾向。',
      career: '在贸易、航运、外交、学术、媒体、咨询等面向广阔世界的领域发挥才能。全球视野和战略思维大放异彩。',
      relationship: '追求自由的恋爱,重视智识上的共鸣。魅力十足,爱得大气,但不喜束缚,需要独立空间。',
    },
  },

  '癸': {
    ko: {
      name: '계(癸)',
      element: '음수(陰水)',
      nature: '빗물이나 이슬처럼 조용하고 깊은 성격입니다. 직관력이 뛰어나고 내면의 세계가 풍부하며, 조용히 스며들 듯 영향을 미칩니다. 감성적이면서도 논리적인 사고를 겸비합니다.',
      image: '대지를 적시는 조용한 빗물이나 아침 이슬을 닮았습니다.',
      strengths: '깊은 통찰력과 직관으로 남들이 보지 못하는 것을 봅니다. 학습능력이 뛰어나고, 조용하지만 깊은 영향력을 발휘합니다. 감성과 이성의 균형이 좋습니다.',
      weaknesses: '내성적이고 소극적으로 보일 수 있으며, 감정의 파도에 휩쓸리기 쉬울 수 있습니다.',
      career: '연구, 심리학, 철학, 점술, 데이터 분석, 예술 등 깊은 사고와 직관이 필요한 분야에서 빛을 발합니다. 보이지 않는 곳에서 핵심 역할을 수행하는 참모형입니다.',
      relationship: '조용하지만 깊은 사랑을 하며, 상대의 마음속까지 읽는 눈이 있습니다. 감정적으로 깊이 교감하며, 조용한 헌신으로 관계를 지켜나갑니다.',
    },
    en: {
      name: 'Gye (癸)',
      element: 'Yin Water',
      nature: 'Quiet and deep like rain or dew. Gifted with strong intuition and a rich inner world, influencing others by gently seeping in. Combines emotional sensitivity with logical thinking.',
      image: 'Quiet rain moistening the earth or morning dew at dawn.',
      strengths: 'Sees what others miss through deep insight and intuition. Exceptional learning ability, exerting quiet but profound influence. Maintains a fine balance between emotion and reason.',
      weaknesses: 'May appear introverted and passive. Can be swept up by emotional tides.',
      career: 'Shines in fields requiring deep thought and intuition — research, psychology, philosophy, divination, data analysis, the arts. An advisor type who plays a key role behind the scenes.',
      relationship: 'Loves quietly but deeply, with an uncanny ability to read their partner\'s innermost feelings. Connects on a profound emotional level and protects the relationship through quiet devotion.',
    },
    ja: {
      name: '癸（き）',
      element: '陰水',
      nature: '雨や露のように静かで深い性格です。直感力に優れ内面の世界が豊かで、静かに浸透するように影響を与えます。感性的でありながら論理的な思考も兼ね備えています。',
      image: '大地を潤す静かな雨や朝露のようです。',
      strengths: '深い洞察力と直感で他の人には見えないものを見抜きます。学習能力に優れ、静かながら深い影響力を発揮します。感性と理性のバランスが良いです。',
      weaknesses: '内向的で消極的に見えることがあり、感情の波に飲み込まれやすいことがあります。',
      career: '研究、心理学、哲学、占術、データ分析、芸術など、深い思考と直感が求められる分野で輝きます。見えないところで核心的な役割を果たす参謀タイプです。',
      relationship: '静かですが深い愛を注ぎ、相手の心の奥底まで読み取る目を持っています。感情的に深く交感し、静かな献身で関係を守り続けます。',
    },
    zh: {
      name: '癸',
      element: '阴水',
      nature: '如雨露般安静而深沉。直觉力出众,内心世界丰富,如细雨润物般无声地施加影响。兼具感性与理性思维。',
      image: '宛如润泽大地的静谧细雨或清晨露珠。',
      strengths: '凭借深刻的洞察力和直觉看到他人看不到的东西。学习能力出色,虽安静却发挥深远影响力。感性与理性的平衡极好。',
      weaknesses: '可能显得内向被动,容易被情绪的浪潮裹挟。',
      career: '在研究、心理学、哲学、占卜、数据分析、艺术等需要深度思考和直觉的领域大放异彩。是在幕后发挥核心作用的幕僚型人才。',
      relationship: '爱得安静而深沉,拥有看透对方内心深处的眼力。在情感上深度交融,以静默的奉献守护关系。',
    },
  },
}

// ---------------------------------------------------------------------------
// Branch content type
// ---------------------------------------------------------------------------

interface BranchInfo {
  name: string
  animal: string
  season: string
  nature: string
  energy: string
  socialStyle: string
}

// ---------------------------------------------------------------------------
// Multilingual content for 12 Earthly Branches (지지)
// ---------------------------------------------------------------------------

export const BRANCH_CONTENT: Record<string, Record<Language, BranchInfo>> = {
  '子': {
    ko: {
      name: '자(子)',
      animal: '쥐(鼠)',
      season: '한겨울',
      nature: '한밤중의 고요하고 깊은 에너지를 지닌 시간입니다. 겉으로는 잠잠하지만 내면에서는 새로운 시작의 씨앗이 움트고 있습니다. 지혜와 전략이 숨어 있는 시간대입니다.',
      energy: '영리하고 전략적인 에너지',
      socialStyle: '겉으로는 온순해 보이지만 속으로는 치밀하게 계산합니다. 사교적이면서도 자기만의 비밀을 잘 간직하는 타입입니다.',
    },
    en: {
      name: 'Ja (子)',
      animal: 'Rat',
      season: 'Deep winter',
      nature: 'Carries the quiet, profound energy of midnight. Outwardly calm, yet seeds of new beginnings stir within. A time where wisdom and strategy lie hidden.',
      energy: 'Clever and strategic energy',
      socialStyle: 'Appears gentle on the surface but calculates shrewdly beneath. Sociable yet skilled at guarding their own secrets.',
    },
    ja: {
      name: '子（ね）',
      animal: '鼠',
      season: '真冬',
      nature: '真夜中の静かで深いエネルギーを持つ時間です。表面は穏やかですが、内面では新しい始まりの種が芽吹いています。知恵と戦略が潜む時間帯です。',
      energy: '賢く戦略的なエネルギー',
      socialStyle: '外見は穏やかに見えますが、内面では緻密に計算しています。社交的でありながら自分だけの秘密をしっかり守るタイプです。',
    },
    zh: {
      name: '子',
      animal: '鼠',
      season: '隆冬',
      nature: '承载着午夜般静谧深沉的能量。表面平静,内在却孕育着新生的种子。是智慧与策略潜藏的时段。',
      energy: '聪慧而富有策略的能量',
      socialStyle: '外表温顺,内心却精于计算。善于社交的同时也善于保守自己的秘密。',
    },
  },

  '丑': {
    ko: {
      name: '축(丑)',
      animal: '소(牛)',
      season: '늦겨울',
      nature: '겨울이 끝나가는 시기의 묵직한 에너지를 품고 있습니다. 땅속에 저장된 영양분처럼 겉으로 드러나지 않지만 단단한 힘을 축적하고 있습니다. 인내와 축적의 기운입니다.',
      energy: '꾸준하고 인내하는 에너지',
      socialStyle: '말수가 적고 느긋해 보이지만, 한번 맡은 일은 끝까지 해내는 신뢰감이 있습니다. 소수의 깊은 관계를 선호합니다.',
    },
    en: {
      name: 'Chuk (丑)',
      animal: 'Ox',
      season: 'Late winter',
      nature: 'Holds the weighty energy of winter\'s end. Like nutrients stored deep in the earth — unseen but steadily accumulating solid strength. The energy of patience and accumulation.',
      energy: 'Steady and enduring energy',
      socialStyle: 'Quiet and seemingly relaxed, but utterly dependable once they take on a task. Prefers a few deep relationships over many shallow ones.',
    },
    ja: {
      name: '丑（うし）',
      animal: '牛',
      season: '晩冬',
      nature: '冬の終わりの重厚なエネルギーを秘めています。地中に蓄えられた養分のように表には現れませんが、確かな力を蓄積しています。忍耐と蓄積の気運です。',
      energy: '着実で忍耐強いエネルギー',
      socialStyle: '寡黙でのんびりして見えますが、一度引き受けた仕事は最後までやり遂げる信頼感があります。少数の深い関係を好みます。',
    },
    zh: {
      name: '丑',
      animal: '牛',
      season: '晚冬',
      nature: '蕴含着冬末的厚重能量。如同储存在地下的养分,虽不外露却在稳步积累坚实力量。是耐心与积累的气场。',
      energy: '稳健而持久的能量',
      socialStyle: '话不多、看似悠闲,但一旦承担任务便会坚持到底,值得信赖。偏好少而深的关系。',
    },
  },

  '寅': {
    ko: {
      name: '인(寅)',
      animal: '호랑이(虎)',
      season: '초봄',
      nature: '겨울을 뚫고 솟아오르는 강렬한 생명력을 가지고 있습니다. 새벽의 활기찬 에너지처럼 용맹하고 진취적이며, 모험과 도전을 두려워하지 않는 기운이 넘칩니다.',
      energy: '대담하고 모험적인 에너지',
      socialStyle: '카리스마가 있어 자연스럽게 리더 역할을 맡게 됩니다. 호쾌하고 의리가 있지만 때로 다른 사람의 속도를 기다리지 못합니다.',
    },
    en: {
      name: 'In (寅)',
      animal: 'Tiger',
      season: 'Early spring',
      nature: 'Carries the intense vitality that bursts through winter. Like the vigorous energy of dawn — courageous and enterprising, brimming with fearless spirit for adventure and challenge.',
      energy: 'Bold and adventurous energy',
      socialStyle: 'Natural charisma leads them into leadership roles effortlessly. Generous and loyal, though sometimes impatient with others\' pace.',
    },
    ja: {
      name: '寅（とら）',
      animal: '虎',
      season: '初春',
      nature: '冬を突き破って湧き上がる強烈な生命力を持っています。夜明けの活気あるエネルギーのように勇ましく進取的で、冒険と挑戦を恐れない気概に満ちています。',
      energy: '大胆で冒険的なエネルギー',
      socialStyle: 'カリスマがあり、自然とリーダーの役割を担います。豪快で義理堅いですが、時に他の人のペースを待てないことがあります。',
    },
    zh: {
      name: '寅',
      animal: '虎',
      season: '初春',
      nature: '拥有破冬而出的强烈生命力。如黎明的蓬勃能量般勇猛进取,充满无畏冒险和挑战的气概。',
      energy: '大胆而富有冒险精神的能量',
      socialStyle: '天生具有领袖魅力,自然而然地担任领导角色。豪爽义气,但有时难以等待他人的节奏。',
    },
  },

  '卯': {
    ko: {
      name: '묘(卯)',
      animal: '토끼(兔)',
      season: '한봄',
      nature: '봄날 만개한 꽃밭처럼 부드럽고 화사한 에너지를 품고 있습니다. 생명력이 가장 아름답게 피어나는 시기로, 조화롭고 평화로운 기운이 감돕니다.',
      energy: '온화하고 창의적인 에너지',
      socialStyle: '붙임성이 좋고 예의 바르며, 누구와도 잘 어울립니다. 갈등을 싫어하고 평화로운 분위기를 만들어가는 능력이 있습니다.',
    },
    en: {
      name: 'Myo (卯)',
      animal: 'Rabbit',
      season: 'Mid-spring',
      nature: 'Soft and radiant like a spring garden in full bloom. The season when vitality blossoms most beautifully, surrounded by harmonious and peaceful energy.',
      energy: 'Gentle and creative energy',
      socialStyle: 'Agreeable and courteous, they get along with everyone. Dislikes conflict and has a talent for creating peaceful atmospheres.',
    },
    ja: {
      name: '卯（う）',
      animal: '兎',
      season: '仲春',
      nature: '春の日に満開の花畑のように柔らかく華やかなエネルギーを持っています。生命力が最も美しく花開く時期で、調和的で平和な気運が漂います。',
      energy: '穏やかで創造的なエネルギー',
      socialStyle: '人当たりが良く礼儀正しく、誰とでもうまく付き合えます。争いを嫌い、平和な雰囲気を作り出す能力があります。',
    },
    zh: {
      name: '卯',
      animal: '兔',
      season: '仲春',
      nature: '如春日盛开的花田般柔和而明艳。是生命力最美绽放的时节,弥漫着和谐与宁静的气息。',
      energy: '温和而富有创意的能量',
      socialStyle: '亲和力强、彬彬有礼,与谁都能融洽相处。不喜冲突,善于营造和平的氛围。',
    },
  },

  '辰': {
    ko: {
      name: '진(辰)',
      animal: '용(龍)',
      season: '늦봄',
      nature: '봄비가 내리고 안개가 자욱한 신비로운 에너지를 지니고 있습니다. 변화와 전환의 기운이 강하며, 예측할 수 없는 가능성을 품고 있습니다. 웅장하고 야심찬 기운입니다.',
      energy: '웅장하고 야심찬 에너지',
      socialStyle: '존재감이 뚜렷하고 카리스마가 있어 자연스럽게 주목받습니다. 큰 비전을 말하며 사람들을 끌어모으지만, 현실적 디테일은 소홀할 수 있습니다.',
    },
    en: {
      name: 'Jin (辰)',
      animal: 'Dragon',
      season: 'Late spring',
      nature: 'Holds the mysterious energy of spring rain and drifting mist. Strong forces of change and transformation, containing unpredictable possibilities. Grand and ambitious energy.',
      energy: 'Majestic and ambitious energy',
      socialStyle: 'Commanding presence and natural charisma draw attention effortlessly. Rallies people with grand vision, though may overlook practical details.',
    },
    ja: {
      name: '辰（たつ）',
      animal: '龍',
      season: '晩春',
      nature: '春雨が降り霧が立ち込める神秘的なエネルギーを持っています。変化と転換の気運が強く、予測できない可能性を秘めています。壮大で野心的な気運です。',
      energy: '壮大で野心的なエネルギー',
      socialStyle: '存在感が際立ちカリスマがあり、自然と注目を集めます。大きなビジョンを語り人を引きつけますが、現実的なディテールがおろそかになることがあります。',
    },
    zh: {
      name: '辰',
      animal: '龙',
      season: '晚春',
      nature: '蕴含着春雨蒙蒙、雾气缭绕的神秘能量。变化与转换的气场强烈,藏着不可预测的可能性。气势恢宏而充满雄心。',
      energy: '恢宏而充满雄心的能量',
      socialStyle: '存在感鲜明、魅力出众,自然而然地引人注目。以宏大愿景吸引众人,但可能忽略现实细节。',
    },
  },

  '巳': {
    ko: {
      name: '사(巳)',
      animal: '뱀(蛇)',
      season: '초여름',
      nature: '여름의 문턱에서 불의 기운이 점점 강해지는 시기입니다. 뱀이 허물을 벗듯 변신과 재생의 에너지가 강하며, 내면의 지혜가 깊습니다. 직관적이고 변화무쌍합니다.',
      energy: '지혜롭고 변신하는 에너지',
      socialStyle: '겉으로는 차분하고 미스터리한 분위기를 풍기며, 쉽게 속내를 드러내지 않습니다. 관찰력이 뛰어나 상대의 본심을 잘 파악합니다.',
    },
    en: {
      name: 'Sa (巳)',
      animal: 'Snake',
      season: 'Early summer',
      nature: 'Fire energy grows on summer\'s threshold. Like a snake shedding its skin, strong transformation and renewal energy with deep inner wisdom. Intuitive and ever-changing.',
      energy: 'Wise and transformative energy',
      socialStyle: 'Projects calm mystery on the surface, rarely revealing their inner thoughts. Keen observation skills allow them to read others\' true intentions.',
    },
    ja: {
      name: '巳（み）',
      animal: '蛇',
      season: '初夏',
      nature: '夏の入り口で火の気運がだんだん強くなる時期です。蛇が脱皮するように変身と再生のエネルギーが強く、内面の知恵が深いです。直感的で変幻自在です。',
      energy: '知恵に富み変容するエネルギー',
      socialStyle: '外見は落ち着いたミステリアスな雰囲気を醸し出し、簡単に本心を見せません。観察力に優れ、相手の本音をよく見抜きます。',
    },
    zh: {
      name: '巳',
      animal: '蛇',
      season: '初夏',
      nature: '在夏天的门槛上,火的能量渐渐增强。如蛇蜕皮般具有强烈的蜕变与重生能量,内在智慧深厚。直觉敏锐,变化无常。',
      energy: '充满智慧和蜕变的能量',
      socialStyle: '外表沉稳带着神秘气质,不轻易暴露内心。观察力出色,善于洞察对方的真实想法。',
    },
  },

  '午': {
    ko: {
      name: '오(午)',
      animal: '말(馬)',
      season: '한여름',
      nature: '한낮의 태양이 가장 뜨거운 시기의 에너지입니다. 열정과 활력이 최고조에 달하며, 모든 것이 활발하게 움직이는 역동적인 기운입니다. 정열적이고 화끈합니다.',
      energy: '열정적이고 역동적인 에너지',
      socialStyle: '밝고 활달하여 어디서든 분위기를 주도합니다. 행동이 빠르고 적극적이지만, 때로 성급하게 판단하여 후회할 수 있습니다.',
    },
    en: {
      name: 'O (午)',
      animal: 'Horse',
      season: 'Midsummer',
      nature: 'The energy of the midday sun at its hottest. Passion and vitality reach their peak — everything moves vigorously in dynamic, fiery spirit.',
      energy: 'Passionate and dynamic energy',
      socialStyle: 'Bright and lively, they set the mood wherever they go. Quick to act and proactive, though hasty judgments sometimes lead to regret.',
    },
    ja: {
      name: '午（うま）',
      animal: '馬',
      season: '真夏',
      nature: '真昼の太陽が最も熱い時期のエネルギーです。情熱と活力が最高潮に達し、すべてが活発に動くダイナミックな気運です。情熱的で熱いです。',
      energy: '情熱的でダイナミックなエネルギー',
      socialStyle: '明るく活発で、どこでも雰囲気を主導します。行動が速く積極的ですが、時に性急な判断で後悔することがあります。',
    },
    zh: {
      name: '午',
      animal: '马',
      season: '盛夏',
      nature: '正午阳光最为炽烈时的能量。激情与活力达到顶峰,万物蓬勃涌动,充满热烈动感的气场。',
      energy: '热情而充满活力的能量',
      socialStyle: '开朗活泼,走到哪里都能带动氛围。行动迅速、积极主动,但有时判断过于草率而后悔。',
    },
  },

  '未': {
    ko: {
      name: '미(未)',
      animal: '양(羊)',
      season: '늦여름',
      nature: '여름이 무르익어 결실을 준비하는 시기의 에너지입니다. 뜨거운 열기가 서서히 식으며 부드러워지는 전환의 기운이 있습니다. 포근하고 풍요로운 느낌을 줍니다.',
      energy: '예술적이고 보살피는 에너지',
      socialStyle: '온화하고 다정하여 주변 사람들을 편안하게 합니다. 예술적 감성이 풍부하고 미적 감각이 뛰어나며, 조화를 중시합니다.',
    },
    en: {
      name: 'Mi (未)',
      animal: 'Goat',
      season: 'Late summer',
      nature: 'The energy of summer ripening toward harvest. Intense heat gradually softens in this transitional energy, bringing a warm and abundant feeling.',
      energy: 'Artistic and nurturing energy',
      socialStyle: 'Warm and affectionate, they put people at ease. Rich in artistic sensibility and aesthetic taste, with a deep appreciation for harmony.',
    },
    ja: {
      name: '未（ひつじ）',
      animal: '羊',
      season: '晩夏',
      nature: '夏が熟して実りを準備する時期のエネルギーです。熱い気運が徐々に和らぎ穏やかになる転換の気運があります。温かく豊かな感じを与えます。',
      energy: '芸術的で人を慈しむエネルギー',
      socialStyle: '温和で優しく、周囲の人々を安心させます。芸術的な感性が豊かで美的感覚に優れ、調和を大切にします。',
    },
    zh: {
      name: '未',
      animal: '羊',
      season: '晚夏',
      nature: '盛夏趋于成熟、准备结实的时期能量。炽热逐渐温和,带有转换的气息,给人温馨丰盈之感。',
      energy: '艺术气息浓厚且富有关怀的能量',
      socialStyle: '温和亲切,让周围的人感到舒适。艺术感性丰富、审美出众,重视和谐。',
    },
  },

  '申': {
    ko: {
      name: '신(申)',
      animal: '원숭이(猴)',
      season: '초가을',
      nature: '가을이 시작되며 결실의 기운이 시작되는 때입니다. 날카롭고 맑은 가을 공기처럼 명석하고 재치 있는 에너지가 넘칩니다. 변화에 빠르게 적응하는 민첩함이 특징입니다.',
      energy: '영리하고 다재다능한 에너지',
      socialStyle: '재치 있고 유머 감각이 뛰어나 어디서든 인기가 많습니다. 상황 파악이 빠르고 눈치가 좋지만, 때로 가벼워 보일 수 있습니다.',
    },
    en: {
      name: 'Sin (申)',
      animal: 'Monkey',
      season: 'Early autumn',
      nature: 'Autumn begins and the energy of harvest emerges. Like the sharp, clear autumn air — brimming with keen wit and cleverness. Characterized by nimble adaptability to change.',
      energy: 'Clever and versatile energy',
      socialStyle: 'Witty with an excellent sense of humor, popular wherever they go. Quick to read situations with sharp social awareness, though may sometimes appear superficial.',
    },
    ja: {
      name: '申（さる）',
      animal: '猿',
      season: '初秋',
      nature: '秋が始まり実りの気運が動き出す時です。鋭く澄んだ秋の空気のように明晰で機知に富んだエネルギーが溢れています。変化に素早く適応する機敏さが特徴です。',
      energy: '賢く多才なエネルギー',
      socialStyle: '機知に富みユーモアのセンスが抜群で、どこでも人気があります。状況把握が速く空気を読むのが上手ですが、時に軽薄に見えることがあります。',
    },
    zh: {
      name: '申',
      animal: '猴',
      season: '初秋',
      nature: '秋天来临,丰收的气息初现。如秋日清冽的空气般聪慧机敏,充满灵活的能量。以快速适应变化的敏捷著称。',
      energy: '聪慧而多才多艺的能量',
      socialStyle: '机智幽默,在任何场合都很受欢迎。察言观色能力强,但有时可能显得轻浮。',
    },
  },

  '酉': {
    ko: {
      name: '유(酉)',
      animal: '닭(鷄)',
      season: '한가을',
      nature: '가을이 깊어지며 금의 기운이 가장 순수한 시기입니다. 수확과 정리의 에너지가 강하며, 모든 것을 정확하게 가르는 날카로움이 있습니다. 정밀하고 깨끗한 기운입니다.',
      energy: '정밀하고 규율 있는 에너지',
      socialStyle: '깔끔하고 체계적인 것을 좋아하며, 자신만의 기준이 뚜렷합니다. 정확한 판단과 비평 능력이 뛰어나지만, 타인에게 까다롭게 느껴질 수 있습니다.',
    },
    en: {
      name: 'Yu (酉)',
      animal: 'Rooster',
      season: 'Mid-autumn',
      nature: 'Deepening autumn when metal energy reaches its purest state. Strong harvest and organizing energy with a sharp edge that precisely divides all things. Precise and clean energy.',
      energy: 'Precise and disciplined energy',
      socialStyle: 'Loves neatness and order with clear personal standards. Excels at accurate judgment and critique, though may come across as demanding to others.',
    },
    ja: {
      name: '酉（とり）',
      animal: '鶏',
      season: '仲秋',
      nature: '秋が深まり金の気運が最も純粋な時期です。収穫と整理のエネルギーが強く、すべてを正確に分ける鋭さがあります。精密で清潔な気運です。',
      energy: '精密で規律正しいエネルギー',
      socialStyle: 'きちんとした体系的なものを好み、自分だけの基準がはっきりしています。正確な判断と批評能力に優れますが、他人からは厳しく感じられることがあります。',
    },
    zh: {
      name: '酉',
      animal: '鸡',
      season: '仲秋',
      nature: '深秋时节,金的能量最为纯粹。收获与整理的能量强烈,具有精准切割一切的锋利。精密而清朗的气场。',
      energy: '精准而有纪律的能量',
      socialStyle: '喜欢整洁有序,个人标准鲜明。判断精准、评析能力出色,但可能让他人觉得挑剔。',
    },
  },

  '戌': {
    ko: {
      name: '술(戌)',
      animal: '개(犬)',
      season: '늦가을',
      nature: '가을이 끝나가며 수확이 마무리되는 시기의 에너지입니다. 뜨거운 것은 식히고 흩어진 것은 모으는 정리의 기운이 있습니다. 충성과 보호의 본능이 강합니다.',
      energy: '충성스럽고 보호하는 에너지',
      socialStyle: '한번 맺은 인연을 끝까지 지키는 의리파입니다. 가까운 사람에게는 한없이 따뜻하지만, 낯선 사람에게는 경계심을 보이는 편입니다.',
    },
    en: {
      name: 'Sul (戌)',
      animal: 'Dog',
      season: 'Late autumn',
      nature: 'The energy of autumn\'s end when harvest is complete. Cools what is hot and gathers what is scattered — an organizing force. Strong instincts for loyalty and protection.',
      energy: 'Loyal and protective energy',
      socialStyle: 'Fiercely loyal, honoring bonds to the very end. Endlessly warm to those close but wary of strangers.',
    },
    ja: {
      name: '戌（いぬ）',
      animal: '犬',
      season: '晩秋',
      nature: '秋が終わりに近づき収穫が完了する時期のエネルギーです。熱いものは冷まし、散らばったものは集める整理の気運があります。忠誠と保護の本能が強いです。',
      energy: '忠実で守護するエネルギー',
      socialStyle: '一度結んだ縁を最後まで守る義理堅い性格です。親しい人にはこの上なく温かいですが、見知らぬ人には警戒心を見せる傾向があります。',
    },
    zh: {
      name: '戌',
      animal: '狗',
      season: '晚秋',
      nature: '秋末收获完毕时期的能量。冷却燥热、收拢散落,具有整理归纳的气场。忠诚与保护的本能强烈。',
      energy: '忠诚而具保护性的能量',
      socialStyle: '一旦结缘便守护到底的义气之人。对亲近的人无比温暖,但对陌生人会保持警惕。',
    },
  },

  '亥': {
    ko: {
      name: '해(亥)',
      animal: '돼지(猪)',
      season: '초겨울',
      nature: '겨울이 시작되며 만물이 안으로 수렴하는 시기의 에너지입니다. 물의 기운이 깊어지며 모든 것을 포용하는 넓은 마음을 품고 있습니다. 풍요롭고 철학적인 기운입니다.',
      energy: '관대하고 철학적인 에너지',
      socialStyle: '마음이 넓고 관대하여 누구에게나 호의적입니다. 물질적으로도 정신적으로도 풍요를 추구하며, 나눔을 즐기는 성격입니다.',
    },
    en: {
      name: 'Hae (亥)',
      animal: 'Pig',
      season: 'Early winter',
      nature: 'Winter begins and all things draw inward. Water energy deepens, embracing everything with boundless generosity. An energy of abundance and philosophical depth.',
      energy: 'Generous and philosophical energy',
      socialStyle: 'Broad-minded and generous, they are kind to everyone. Pursues abundance both materially and spiritually, and genuinely enjoys sharing with others.',
    },
    ja: {
      name: '亥（い）',
      animal: '猪',
      season: '初冬',
      nature: '冬が始まり万物が内に収斂する時期のエネルギーです。水の気運が深まり、すべてを包み込む広い心を持っています。豊かで哲学的な気運です。',
      energy: '寛大で哲学的なエネルギー',
      socialStyle: '心が広く寛大で、誰に対しても好意的です。物質的にも精神的にも豊かさを追求し、分かち合うことを楽しむ性格です。',
    },
    zh: {
      name: '亥',
      animal: '猪',
      season: '初冬',
      nature: '冬天来临,万物向内收敛。水的能量渐深,以宽广的胸怀包容一切。充满富足与哲思的气场。',
      energy: '宽厚而富有哲理的能量',
      socialStyle: '心胸开阔、待人宽厚。在物质和精神上都追求丰盈,乐于与人分享。',
    },
  },
}

// ---------------------------------------------------------------------------
// Element interaction key helpers
// ---------------------------------------------------------------------------

/** Map stem hanja → element key */
const STEM_ELEMENT_KEY: Record<string, string> = {
  '甲': 'tree', '乙': 'tree',
  '丙': 'fire', '丁': 'fire',
  '戊': 'earth', '己': 'earth',
  '庚': 'metal', '辛': 'metal',
  '壬': 'water', '癸': 'water',
}

/** Map branch hanja → element key */
const BRANCH_ELEMENT_KEY: Record<string, string> = {
  '寅': 'tree', '卯': 'tree',
  '巳': 'fire', '午': 'fire',
  '辰': 'earth', '丑': 'earth', '未': 'earth', '戌': 'earth',
  '申': 'metal', '酉': 'metal',
  '子': 'water', '亥': 'water',
}

/** Get the interaction key for a given ganji (e.g. '甲子' → 'tree-water') */
export function getInteractionKey(ganji: string): string {
  const stem = ganji[0]
  const branch = ganji[1]
  return `${STEM_ELEMENT_KEY[stem]}-${BRANCH_ELEMENT_KEY[branch]}`
}

// ---------------------------------------------------------------------------
// Element interaction descriptions (오행 상호작용)
// ---------------------------------------------------------------------------

export const INTERACTION_DESC: Record<string, Record<Language, string>> = {
  // 상생 (mutual generation)
  'tree-fire': {
    ko: '목생화(木生火) — 나무가 불을 키우는 관계입니다. 천간의 목 기운이 지지의 화 기운을 자연스럽게 살려주어, 내면의 의지가 외부 활동으로 순조롭게 이어집니다. 자기 에너지가 잘 발산되는 조합입니다.',
    en: 'Wood generates Fire — wood fuels the flame. The stem\'s wood energy naturally nourishes the branch\'s fire, allowing inner will to flow smoothly into outward action. A combination where personal energy is well expressed.',
    ja: '木生火 — 木が火を育てる関係です。天干の木の気が地支の火の気を自然に活かし、内なる意志が外部の活動へとスムーズにつながります。自分のエネルギーがよく発散される組み合わせです。',
    zh: '木生火——木助火旺。天干的木气自然地滋养地支的火气,内在意志顺畅地转化为外在行动。是个人能量得到良好释放的组合。',
  },
  'fire-earth': {
    ko: '화생토(火生土) — 불이 타고 남은 재가 흙이 되는 관계입니다. 천간의 화 기운이 지지의 토 기운을 낳아, 열정이 실질적 결실로 이어집니다. 뜨거운 이상이 안정적 기반 위에 자리 잡는 조합입니다.',
    en: 'Fire generates Earth — ashes from fire become soil. The stem\'s fire energy births the branch\'s earth, transforming passion into tangible results. Idealism finds stable ground in this combination.',
    ja: '火生土 — 火が燃え尽きた灰が土になる関係です。天干の火の気が地支の土の気を生み出し、情熱が実質的な成果につながります。熱い理想が安定した基盤の上に定着する組み合わせです。',
    zh: '火生土——火燃成灰化为土。天干的火气孕育地支的土气,热情转化为实际成果。炽热的理想在稳固的基础上扎根。',
  },
  'earth-metal': {
    ko: '토생금(土生金) — 흙 속에서 금속이 태어나는 관계입니다. 천간의 토 기운이 지지의 금 기운을 품어 키우니, 안정된 기반 위에서 날카로운 능력이 빛을 발합니다. 실력이 차근차근 갈고닦아지는 조합입니다.',
    en: 'Earth generates Metal — metal is born within the soil. The stem\'s earth energy nurtures the branch\'s metal, letting sharp abilities shine on a stable foundation. A combination where skill is honed steadily over time.',
    ja: '土生金 — 土の中から金属が生まれる関係です。天干の土の気が地支の金の気を包み育て、安定した基盤の上で鋭い能力が輝きます。実力が着実に磨かれる組み合わせです。',
    zh: '土生金——土中孕育金属。天干的土气包容滋养地支的金气,在稳固的基础上磨砺出锋利的才能。是实力稳步提升的组合。',
  },
  'metal-water': {
    ko: '금생수(金生水) — 금속 표면에 물이 맺히는 관계입니다. 천간의 금 기운이 지지의 수 기운을 생하여, 결단력이 지혜로 이어집니다. 단호함과 유연함이 조화를 이루는 균형 잡힌 조합입니다.',
    en: 'Metal generates Water — water condenses on metal. The stem\'s metal energy generates the branch\'s water, connecting decisiveness to wisdom. A balanced combination harmonizing firmness with fluidity.',
    ja: '金生水 — 金属の表面に水が結ぶ関係です。天干の金の気が地支の水の気を生じ、決断力が知恵へとつながります。断固さと柔軟さが調和するバランスの取れた組み合わせです。',
    zh: '金生水——金属表面凝结水珠。天干的金气生发地支的水气,果断转化为智慧。刚毅与柔韧和谐统一的均衡组合。',
  },
  'water-tree': {
    ko: '수생목(水生木) — 물이 나무를 키우는 관계입니다. 천간의 수 기운이 지지의 목 기운을 길러주어, 지혜와 사고가 성장과 발전으로 이어집니다. 잠재력이 꾸준히 자라나는 생생한 조합입니다.',
    en: 'Water generates Wood — water nurtures trees. The stem\'s water energy cultivates the branch\'s wood, guiding wisdom and thought toward growth and development. A vibrant combination where potential steadily blossoms.',
    ja: '水生木 — 水が木を育てる関係です。天干の水の気が地支の木の気を養い、知恵と思考が成長と発展へとつながります。潜在力が着実に育つ生き生きとした組み合わせです。',
    zh: '水生木——水滋养树木。天干的水气培育地支的木气,智慧与思考引领成长与发展。是潜力稳步绽放的生机盎然的组合。',
  },

  // 상극 (mutual control)
  'tree-earth': {
    ko: '목극토(木剋土) — 나무 뿌리가 흙을 뚫고 내려가는 관계입니다. 천간의 목 기운이 지지의 토 기운을 억누르니, 강한 의지가 안정을 깨뜨릴 수 있습니다. 도전적이지만 균형을 잘 잡으면 개척의 힘이 됩니다.',
    en: 'Wood controls Earth — roots penetrate soil. The stem\'s wood energy suppresses the branch\'s earth, meaning strong will can disrupt stability. Challenging, but when balanced, becomes a force for pioneering breakthroughs.',
    ja: '木剋土 — 木の根が土を突き破る関係です。天干の木の気が地支の土の気を抑えるため、強い意志が安定を崩すことがあります。挑戦的ですが、バランスをうまく取れば開拓の力になります。',
    zh: '木克土——树根穿透土壤。天干的木气压制地支的土气,强烈的意志可能打破稳定。虽具挑战性,但若平衡得当便成为开拓之力。',
  },
  'earth-water': {
    ko: '토극수(土剋水) — 흙이 물을 막는 관계입니다. 천간의 토 기운이 지지의 수 기운을 가두니, 안정을 추구하는 마음이 자유로운 흐름을 제한할 수 있습니다. 그러나 적절히 다스리면 물길을 잡아 큰 힘을 만들어냅니다.',
    en: 'Earth controls Water — soil dams water. The stem\'s earth energy contains the branch\'s water, and the desire for stability can restrict free flow. Yet when managed well, channeling the current creates great power.',
    ja: '土剋水 — 土が水をせき止める関係です。天干の土の気が地支の水の気を閉じ込め、安定を求める心が自由な流れを制限することがあります。しかし適切にコントロールすれば、水路を定めて大きな力を生み出します。',
    zh: '土克水——土筑堤挡水。天干的土气封锁地支的水气,求稳之心可能限制自由的流动。但若善加引导,便能驯水成渠、汇聚强大力量。',
  },
  'water-fire': {
    ko: '수극화(水剋火) — 물이 불을 끄는 관계입니다. 천간의 수 기운이 지지의 화 기운을 억제하여, 냉철한 이성이 뜨거운 감정을 다스립니다. 내면의 갈등이 있을 수 있지만, 균형을 찾으면 지혜로운 열정이 됩니다.',
    en: 'Water controls Fire — water extinguishes flame. The stem\'s water energy restrains the branch\'s fire, with cool reason governing hot emotion. Inner conflict may arise, but finding balance yields wise passion.',
    ja: '水剋火 — 水が火を消す関係です。天干の水の気が地支の火の気を抑制し、冷静な理性が熱い感情をコントロールします。内面の葛藤があるかもしれませんが、バランスを見つければ知恵ある情熱になります。',
    zh: '水克火——水灭火焰。天干的水气抑制地支的火气,冷静的理性驾驭炽热的情感。内心可能存在矛盾,但找到平衡便化为智慧的激情。',
  },
  'fire-metal': {
    ko: '화극금(火剋金) — 불이 금속을 녹이는 관계입니다. 천간의 화 기운이 지지의 금 기운을 녹여 재형성하니, 열정이 기존의 틀을 바꿔놓습니다. 변혁의 에너지가 강하며, 위기를 기회로 만드는 힘이 있습니다.',
    en: 'Fire controls Metal — fire melts metal. The stem\'s fire energy melts and reshapes the branch\'s metal, with passion transforming existing frameworks. Strong transformative energy with the power to turn crisis into opportunity.',
    ja: '火剋金 — 火が金属を溶かす関係です。天干の火の気が地支の金の気を溶かして再形成し、情熱が既存の枠組みを変えます。変革のエネルギーが強く、危機をチャンスに変える力があります。',
    zh: '火克金——火熔金属。天干的火气熔化并重塑地支的金气,激情改变既有框架。变革能量强劲,具有化危为机的力量。',
  },
  'metal-tree': {
    ko: '금극목(金剋木) — 도끼가 나무를 베는 관계입니다. 천간의 금 기운이 지지의 목 기운을 잘라내니, 결단력으로 성장을 조율합니다. 정리와 개혁의 힘이 있으며, 불필요한 것을 과감히 쳐내는 용기가 있습니다.',
    en: 'Metal controls Wood — an axe fells a tree. The stem\'s metal energy cuts the branch\'s wood, shaping growth through decisiveness. Possesses the power of reform and the courage to boldly prune what is unnecessary.',
    ja: '金剋木 — 斧が木を切る関係です。天干の金の気が地支の木の気を切り取り、決断力で成長を調律します。整理と改革の力があり、不要なものを果敢に切り捨てる勇気があります。',
    zh: '金克木——斧伐树木。天干的金气斩断地支的木气,以果断调控成长。具有整顿与改革的力量,勇于果断去除不必要之物。',
  },

  // 같은 오행 (same element)
  'tree-tree': {
    ko: '비화(比和) — 목과 목이 만나 같은 기운이 겹칩니다. 숲이 우거지듯 같은 방향으로 힘이 모여 성장의 기세가 강합니다. 자기 주관이 뚜렷하고 독립심이 강하지만, 때로 고집이 세어질 수 있습니다.',
    en: 'Harmony of same — wood meets wood. Like a dense forest, energy gathers in one direction with strong growth momentum. Independent with clear convictions, though stubbornness may intensify.',
    ja: '比和 — 木と木が出会い同じ気運が重なります。森が生い茂るように同じ方向に力が集まり、成長の勢いが強いです。自分の主観がはっきりしていて独立心が強いですが、時に頑固になりがちです。',
    zh: '比和——木遇木,同气相合。如密林繁茂,力量汇聚同向,成长势头强劲。自主意识强、独立性高,但有时可能过于固执。',
  },
  'fire-fire': {
    ko: '비화(比和) — 화와 화가 만나 열기가 배가됩니다. 두 개의 불꽃이 만나 더욱 뜨겁게 타오르듯, 열정과 표현욕이 극대화됩니다. 에너지가 넘치지만 과열되지 않도록 주의가 필요합니다.',
    en: 'Harmony of same — fire meets fire. Two flames merge and burn even brighter, maximizing passion and expressiveness. Energy overflows, but caution against overheating is warranted.',
    ja: '比和 — 火と火が出会い熱気が倍増します。二つの炎が出会いさらに熱く燃え上がるように、情熱と表現欲が最大化されます。エネルギーが溢れますが、過熱しないよう注意が必要です。',
    zh: '比和——火遇火,热力倍增。两团火焰相遇燃烧更烈,热情与表现欲达到极致。能量充沛,但需注意不要过热。',
  },
  'earth-earth': {
    ko: '비화(比和) — 토와 토가 만나 더욱 두터운 대지가 됩니다. 안정감과 신뢰감이 극대화되며, 든든한 기반 위에 모든 것을 쌓아 올릴 수 있습니다. 다만 변화에 둔감해지기 쉬워 유연성을 갖추는 것이 중요합니다.',
    en: 'Harmony of same — earth meets earth, forming an even thicker foundation. Stability and trustworthiness are maximized, providing a solid base upon which to build. Flexibility is important, as there is a tendency toward resistance to change.',
    ja: '比和 — 土と土が出会いさらに厚い大地になります。安定感と信頼感が最大化され、盤石な基盤の上にすべてを築き上げることができます。ただし変化に鈍感になりやすいので、柔軟性を持つことが大切です。',
    zh: '比和——土遇土,大地更加厚实。稳定感和信赖感最大化,在坚实的基础上可以构建一切。但容易对变化迟钝,保持灵活性很重要。',
  },
  'metal-metal': {
    ko: '비화(比和) — 금과 금이 만나 더욱 단단해집니다. 결단력과 원칙이 강화되어 무엇이든 명확하게 가르는 힘이 있습니다. 강한 의지와 자존심이 두드러지지만, 날카로움이 과해지지 않도록 균형이 필요합니다.',
    en: 'Harmony of same — metal meets metal, becoming even harder. Decisiveness and principles are reinforced with the power to clearly divide anything. Strong will and pride stand out, but balance is needed to avoid excessive sharpness.',
    ja: '比和 — 金と金が出会いさらに硬くなります。決断力と原則が強化され、何でも明確に分ける力があります。強い意志とプライドが際立ちますが、鋭さが過剰にならないようバランスが必要です。',
    zh: '比和——金遇金,愈加坚硬。决断力与原则性增强,拥有明确切割一切的力量。强烈的意志和自尊心突出,但需注意不要过于锋利。',
  },
  'water-water': {
    ko: '비화(比和) — 수와 수가 만나 더욱 깊고 넓어집니다. 지혜와 직관이 극대화되며, 깊은 사고력과 유연한 적응력을 갖추게 됩니다. 감정의 깊이가 매우 깊어 때로 감정에 빠져들기 쉬울 수 있습니다.',
    en: 'Harmony of same — water meets water, growing deeper and wider. Wisdom and intuition are maximized with profound thinking and fluid adaptability. Emotional depth runs very deep, making it easy to become absorbed in feelings.',
    ja: '比和 — 水と水が出会いさらに深く広くなります。知恵と直感が最大化され、深い思考力と柔軟な適応力を備えます。感情の深さが非常に深く、時に感情に溺れやすいことがあります。',
    zh: '比和——水遇水,愈发深广。智慧与直觉最大化,具备深邃的思考力和灵活的适应力。情感极为深沉,有时容易沉溺于情绪之中。',
  },
}

// ---------------------------------------------------------------------------
// Page labels (UI 문자열)
// ---------------------------------------------------------------------------

export const PILLAR_LABELS: Record<Language, {
  pageTitle: string
  indexTitle: string
  indexSubtitle: string
  whatIs: string
  stemElement: string
  branchElement: string
  elementInteraction: string
  personality: string
  careerWealth: string
  loveRelationship: string
  compatibility: string
  bestMatch: string
  cautionMatch: string
  hiddenStems: string
  twelveStage: string
  ctaText: string
  ctaButton: string
  backToIndex: string
  dayPillar: string
  quickInfo: string
  elementRelation: string
  twelveMeteor: string
  section1Title: string
  section2Title: string
  section3Title: string
  section4Title: string
  section5Title: string
  heavenlyStem: string
  earthlyBranch: string
  nature: string
  strengths: string
  branchNature: string
  socialStyle: string
  branchEnergy: string
  caution: string
  ctaTitle: string
  ctaDescription: string
  relatedPillars: string
}> = {
  ko: {
    pageTitle: '{name} 일주 — 성격, 연애, 직업, 궁합 완전 해석',
    indexTitle: '60갑자 일주 가이드',
    indexSubtitle: '나의 일주로 알아보는 성격과 운명',
    whatIs: '{name} 일주란?',
    stemElement: '천간 오행',
    branchElement: '지지 오행',
    elementInteraction: '오행 관계',
    personality: '성격과 기질',
    careerWealth: '직업과 재물',
    loveRelationship: '연애와 관계',
    compatibility: '궁합',
    bestMatch: '상성이 좋은 일주',
    cautionMatch: '조심할 일주',
    hiddenStems: '지장간',
    twelveStage: '12운성',
    ctaText: '내 일주가 궁금하다면...',
    ctaButton: '지금 바로 계산하기',
    backToIndex: '← 60갑자 목록',
    dayPillar: '일주',
    quickInfo: '기본 정보',
    elementRelation: '오행 관계',
    twelveMeteor: '12운성',
    section1Title: '일주 해석',
    section2Title: '성격과 기질',
    section3Title: '직업과 재물',
    section4Title: '연애와 관계',
    section5Title: '궁합',
    heavenlyStem: '천간',
    earthlyBranch: '지지',
    nature: '기본 성향',
    strengths: '강점',
    branchNature: '지지의 성질',
    socialStyle: '관계 스타일',
    branchEnergy: '지지의 에너지',
    caution: '조심할 조합',
    ctaTitle: '내 일주가 궁금하다면',
    ctaDescription: '생년월일시를 입력하면 내 일주를 바로 확인할 수 있어요.',
    relatedPillars: '관련 일주',
  },
  en: {
    pageTitle: '{name} Day Pillar — Personality, Love, Career & Compatibility Guide',
    indexTitle: '60 Ganji Day Pillar Guide',
    indexSubtitle: 'Discover your personality and destiny through your day pillar',
    whatIs: 'What is the {name} Day Pillar?',
    stemElement: 'Heavenly Stem Element',
    branchElement: 'Earthly Branch Element',
    elementInteraction: 'Elemental Interaction',
    personality: 'Personality & Temperament',
    careerWealth: 'Career & Wealth',
    loveRelationship: 'Love & Relationships',
    compatibility: 'Compatibility',
    bestMatch: 'Best Matches',
    cautionMatch: 'Challenging Matches',
    hiddenStems: 'Hidden Stems',
    twelveStage: 'Twelve Life Stages',
    ctaText: 'Curious about your day pillar?',
    ctaButton: 'Calculate Now',
    backToIndex: '← 60 Ganji List',
    dayPillar: 'Day Pillar',
    quickInfo: 'Quick Info',
    elementRelation: 'Element Relation',
    twelveMeteor: 'Twelve Stages',
    section1Title: 'Pillar Interpretation',
    section2Title: 'Personality & Temperament',
    section3Title: 'Career & Wealth',
    section4Title: 'Love & Relationships',
    section5Title: 'Compatibility',
    heavenlyStem: 'Heavenly Stem',
    earthlyBranch: 'Earthly Branch',
    nature: 'Core Nature',
    strengths: 'Strengths',
    branchNature: 'Branch Nature',
    socialStyle: 'Social Style',
    branchEnergy: 'Branch Energy',
    caution: 'Challenging Matches',
    ctaTitle: 'Curious about your day pillar?',
    ctaDescription: 'Enter your birth date and time to discover your day pillar instantly.',
    relatedPillars: 'Related Pillars',
  },
  ja: {
    pageTitle: '{name} 日柱 — 性格・恋愛・仕事・相性を徹底解説',
    indexTitle: '六十甲子 日柱ガイド',
    indexSubtitle: '日柱から読み解く性格と運命',
    whatIs: '{name} 日柱とは？',
    stemElement: '天干の五行',
    branchElement: '地支の五行',
    elementInteraction: '五行の関係',
    personality: '性格と気質',
    careerWealth: '仕事と財運',
    loveRelationship: '恋愛と人間関係',
    compatibility: '相性',
    bestMatch: '相性の良い日柱',
    cautionMatch: '注意すべき日柱',
    hiddenStems: '蔵干',
    twelveStage: '十二運星',
    ctaText: '自分の日柱が気になったら...',
    ctaButton: '今すぐ計算する',
    backToIndex: '← 六十甲子一覧',
    dayPillar: '日柱',
    quickInfo: '基本情報',
    elementRelation: '五行関係',
    twelveMeteor: '十二運星',
    section1Title: '日柱の解釈',
    section2Title: '性格と気質',
    section3Title: '仕事と財運',
    section4Title: '恋愛と人間関係',
    section5Title: '相性',
    heavenlyStem: '天干',
    earthlyBranch: '地支',
    nature: '基本性向',
    strengths: '強み',
    branchNature: '地支の性質',
    socialStyle: '対人スタイル',
    branchEnergy: '地支のエネルギー',
    caution: '注意すべき組み合わせ',
    ctaTitle: '自分の日柱が気になったら',
    ctaDescription: '生年月日時を入力すると、あなたの日柱がすぐわかります。',
    relatedPillars: '関連する日柱',
  },
  zh: {
    pageTitle: '{name} 日柱 — 性格、感情、事业、配对全面解析',
    indexTitle: '六十甲子日柱指南',
    indexSubtitle: '从日柱了解你的性格与命运',
    whatIs: '什么是{name}日柱？',
    stemElement: '天干五行',
    branchElement: '地支五行',
    elementInteraction: '五行关系',
    personality: '性格与气质',
    careerWealth: '事业与财运',
    loveRelationship: '感情与关系',
    compatibility: '配对',
    bestMatch: '最佳配对日柱',
    cautionMatch: '需注意的日柱',
    hiddenStems: '地支藏干',
    twelveStage: '十二运星',
    ctaText: '想知道你的日柱吗？',
    ctaButton: '立即计算',
    backToIndex: '← 六十甲子列表',
    dayPillar: '日柱',
    quickInfo: '基本信息',
    elementRelation: '五行关系',
    twelveMeteor: '十二运星',
    section1Title: '日柱解读',
    section2Title: '性格与气质',
    section3Title: '事业与财运',
    section4Title: '感情与关系',
    section5Title: '配对',
    heavenlyStem: '天干',
    earthlyBranch: '地支',
    nature: '基本性向',
    strengths: '优势',
    branchNature: '地支性质',
    socialStyle: '社交风格',
    branchEnergy: '地支能量',
    caution: '需注意的组合',
    ctaTitle: '想知道你的日柱吗？',
    ctaDescription: '输入出生日期时间，立即查看你的日柱。',
    relatedPillars: '相关日柱',
  },
}
