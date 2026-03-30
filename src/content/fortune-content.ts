import type { Language } from '../i18n'

// ---------------------------------------------------------------------------
// Year data
// ---------------------------------------------------------------------------

export const FORTUNE_YEARS = [2026, 2025] as const
export type FortuneYear = (typeof FORTUNE_YEARS)[number]

export const YEAR_GANJI: Record<FortuneYear, { hanja: string; korean: string; element: string }> = {
  2025: { hanja: '乙巳', korean: '을사', element: 'tree' },
  2026: { hanja: '丙午', korean: '병오', element: 'fire' },
}

// ---------------------------------------------------------------------------
// Zodiac keys (12 earthly branches)
// ---------------------------------------------------------------------------

export const ZODIAC_KEYS = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const
export type ZodiacKey = (typeof ZODIAC_KEYS)[number]

// ---------------------------------------------------------------------------
// Zodiac fortune entry
// ---------------------------------------------------------------------------

interface ZodiacFortuneEntry {
  animal: string
  overall: string
  career: string
  love: string
  health: string
  luckyMonth: string
  cautionMonth: string
}

// ---------------------------------------------------------------------------
// Year overview entry
// ---------------------------------------------------------------------------

interface YearOverviewEntry {
  title: string
  subtitle: string
  overview: string
  element: string
  advice: string
}

// ---------------------------------------------------------------------------
// YEAR_OVERVIEW
// ---------------------------------------------------------------------------

export const YEAR_OVERVIEW: Record<FortuneYear, Record<Language, YearOverviewEntry>> = {
  2026: {
    ko: {
      title: '2026년 병오년 운세',
      subtitle: '화(火)의 해, 열정과 변화의 한 해',
      overview: '병오년은 천간과 지지 모두 화(火) 기운이 겹치는 강렬한 해입니다. 에너지가 넘치고 변화가 빠르며, 그동안 준비해온 일이 빛을 발할 수 있습니다. 다만 과열에 주의하고 중심을 잡는 것이 중요합니다.',
      element: '병화(丙火)는 태양의 불로, 만물을 비추고 성장시키는 힘을 상징합니다. 오화(午火)와 만나 화기가 극대화됩니다.',
      advice: '열정을 행동으로 옮기되, 번아웃을 경계하세요. 꾸준한 루틴과 휴식의 균형이 한 해를 좌우합니다.',
    },
    en: {
      title: '2026 Year of Byeong-O Fortune',
      subtitle: 'Year of Fire — Passion and Transformation',
      overview: 'The year 2026 (Byeong-O) doubles up on Fire energy in both the Heavenly Stem and Earthly Branch. It is an intense year full of energy and rapid change, where preparations finally bear fruit. However, watch out for overheating and stay grounded.',
      element: 'Byeong Fire (丙火) symbolizes the sun — illuminating and nurturing all things. Combined with the Noon Branch (午), fire energy reaches its peak.',
      advice: 'Channel passion into action, but guard against burnout. The balance between consistent routines and proper rest will define your year.',
    },
    ja: {
      title: '2026年 丙午年の運勢',
      subtitle: '火の年、情熱と変革の一年',
      overview: '丙午年は天干・地支ともに火の気が重なる強烈な年です。エネルギーに溢れ変化が速く、準備してきたことが花開く可能性があります。ただし過熱に注意し、軸をしっかり持つことが大切です。',
      element: '丙火は太陽の火で、万物を照らし成長させる力を象徴します。午火と合わさり火気が最大化されます。',
      advice: '情熱を行動に移しつつ、燃え尽きには注意しましょう。継続的なルーティンと休息のバランスが一年を左右します。',
    },
    zh: {
      title: '2026年丙午年运势',
      subtitle: '火之年，激情与变革之年',
      overview: '丙午年天干地支皆为火，是能量极其强烈的一年。充满活力，变化迅速，过去的准备可能迎来丰收。但需注意过热，保持内心的稳定。',
      element: '丙火象征太阳之火，照耀万物、促进生长。与午火相合，火气达到极致。',
      advice: '将热情转化为行动，但要警惕倦怠。坚持日常节奏与适当休息的平衡将决定这一年的成败。',
    },
  },
  2025: {
    ko: {
      title: '2025년 을사년 운세',
      subtitle: '목(木)과 뱀의 해, 지혜와 전략적 성장',
      overview: '을사년은 을목(乙木)의 유연함과 사화(巳火)의 지혜가 결합된 해입니다. 겉으로 화려하기보다 내면의 성장이 두드러지며, 조용히 실력을 쌓고 기회를 포착하는 것이 핵심입니다.',
      element: '을목(乙木)은 풀과 덩굴처럼 유연하고 적응력이 강합니다. 사화(巳火)의 통찰력과 만나 전략적 사고가 빛을 발합니다.',
      advice: '성급한 결정보다 관찰과 준비에 집중하세요. 올해 쌓은 기반이 내년의 큰 도약으로 이어집니다.',
    },
    en: {
      title: '2025 Year of Eul-Sa Fortune',
      subtitle: 'Year of Wood & Snake — Wisdom and Strategic Growth',
      overview: 'The year 2025 (Eul-Sa) combines the flexibility of Eul Wood (乙木) with the wisdom of Sa Fire (巳火). Rather than flashy achievements, inner growth takes center stage. Quietly building skills and seizing the right moment is key.',
      element: 'Eul Wood (乙木) represents grass and vines — flexible and adaptable. Combined with Sa Fire (巳火), it fosters strategic insight and thoughtful action.',
      advice: 'Focus on observation and preparation rather than hasty decisions. The foundation built this year will lead to a major leap next year.',
    },
    ja: {
      title: '2025年 乙巳年の運勢',
      subtitle: '木と蛇の年、知恵と戦略的成長',
      overview: '乙巳年は乙木の柔軟さと巳火の知恵が融合した年です。派手な成果よりも内面の成長が際立ち、静かに実力を積み上げ好機を捉えることが鍵となります。',
      element: '乙木は草や蔓のように柔軟で適応力に優れています。巳火の洞察力と合わさり、戦略的思考が光ります。',
      advice: '焦った判断よりも観察と準備に集中しましょう。今年築いた基盤が来年の大きな飛躍につながります。',
    },
    zh: {
      title: '2025年乙巳年运势',
      subtitle: '木与蛇之年，智慧与战略性成长',
      overview: '乙巳年结合了乙木的柔韧与巳火的智慧。比起外在的辉煌，内在的成长更为突出。安静地积累实力、把握时机是关键。',
      element: '乙木如草木藤蔓，柔韧而适应力强。与巳火的洞察力相结合，战略性思维将大放异彩。',
      advice: '与其仓促决定，不如专注于观察和准备。今年打下的基础将引领明年的飞跃。',
    },
  },
}

// ---------------------------------------------------------------------------
// ZODIAC_FORTUNE — 2026 (丙午年)
// ---------------------------------------------------------------------------

const ZODIAC_2026: Record<ZodiacKey, Record<Language, ZodiacFortuneEntry>> = {
  '子': {
    ko: {
      animal: '쥐띠(子)',
      overall: '병오년은 자오충(子午沖)이 발생하는 해로, 예상치 못한 변화가 많습니다. 기존의 안정이 흔들릴 수 있지만, 변화 속에서 새로운 기회를 찾는 적응력이 중요합니다.',
      career: '직장이나 사업 환경에 변동이 올 수 있습니다. 무리한 확장보다는 유연하게 대처하며 핵심 역량을 지키는 것이 현명합니다.',
      love: '관계에서 갈등이 생기기 쉬운 시기입니다. 대화와 이해로 풀어가면 오히려 더 깊은 유대를 만들 수 있습니다.',
      health: '스트레스 관리가 핵심입니다. 심장과 혈액순환에 신경 쓰고, 규칙적인 운동으로 긴장을 풀어주세요.',
      luckyMonth: '3월, 8월, 11월',
      cautionMonth: '1월, 6월, 12월',
    },
    en: {
      animal: 'Rat (子)',
      overall: 'The year 2026 brings the Zi-Wu clash (子午沖), meaning unexpected changes abound. Existing stability may waver, but adaptability will help you find new opportunities within the upheaval.',
      career: 'Your work or business environment may shift. Rather than aggressive expansion, stay flexible and protect your core strengths.',
      love: 'Conflicts in relationships are more likely. Approach them with dialogue and understanding to deepen your bonds.',
      health: 'Stress management is essential. Pay attention to your heart and circulation, and release tension through regular exercise.',
      luckyMonth: 'March, August, November',
      cautionMonth: 'January, June, December',
    },
    ja: {
      animal: 'ねずみ年(子)',
      overall: '丙午年は子午沖が発生する年で、予想外の変化が多くなります。既存の安定が揺らぐ可能性がありますが、変化の中で新たな機会を見つける適応力が重要です。',
      career: '職場やビジネス環境に変動が起こる可能性があります。無理な拡大よりも柔軟に対処し、核心的な強みを守ることが賢明です。',
      love: '人間関係で葛藤が生じやすい時期です。対話と理解で解決すれば、むしろ深い絆を築くことができます。',
      health: 'ストレス管理が鍵です。心臓と血液循環に気を配り、定期的な運動で緊張をほぐしましょう。',
      luckyMonth: '3月、8月、11月',
      cautionMonth: '1月、6月、12月',
    },
    zh: {
      animal: '鼠(子)',
      overall: '2026年形成子午冲，意外变化增多。现有的稳定可能受到动摇，但在变化中找到新机遇的适应力至关重要。',
      career: '工作或生意环境可能发生变动。与其激进扩张，不如灵活应对，守住核心优势。',
      love: '感情中容易产生矛盾。通过沟通和理解去化解，反而能建立更深的联系。',
      health: '压力管理是关键。注意心脏和血液循环，通过规律运动释放紧张。',
      luckyMonth: '3月、8月、11月',
      cautionMonth: '1月、6月、12月',
    },
  },
  '丑': {
    ko: {
      animal: '소띠(丑)',
      overall: '병오년은 소띠에게 안정적인 기반을 다지기 좋은 해입니다. 화(火)의 에너지가 토(土)를 생하므로, 꾸준한 노력이 결실을 맺는 시기입니다.',
      career: '묵묵히 해온 일이 인정받을 수 있습니다. 새로운 자격증이나 기술 습득에 투자하면 장기적으로 큰 자산이 됩니다.',
      love: '안정적인 관계가 더욱 깊어지는 해입니다. 싱글이라면 신뢰를 바탕으로 한 만남이 기대됩니다.',
      health: '소화기 건강에 신경 쓰세요. 규칙적인 식사와 충분한 수면이 체력 유지의 핵심입니다.',
      luckyMonth: '4월, 9월, 10월',
      cautionMonth: '2월, 7월',
    },
    en: {
      animal: 'Ox (丑)',
      overall: 'The year 2026 is excellent for the Ox to build a stable foundation. Fire energy nourishes Earth, meaning persistent effort will bear fruit.',
      career: 'Your steady work may finally gain recognition. Investing in new certifications or skills will become a valuable long-term asset.',
      love: 'Stable relationships deepen further this year. Singles can look forward to trustworthy connections.',
      health: 'Watch your digestive health. Regular meals and sufficient sleep are key to maintaining your stamina.',
      luckyMonth: 'April, September, October',
      cautionMonth: 'February, July',
    },
    ja: {
      animal: 'うし年(丑)',
      overall: '丙午年は丑年生まれにとって安定した基盤を築くのに良い年です。火の気が土を生むため、地道な努力が実を結ぶ時期です。',
      career: 'コツコツと続けてきた仕事が認められる可能性があります。新しい資格やスキルへの投資が長期的な財産になります。',
      love: '安定した関係がさらに深まる年です。シングルの方は信頼に基づいた出会いが期待できます。',
      health: '消化器の健康に注意しましょう。規則正しい食事と十分な睡眠が体力維持の鍵です。',
      luckyMonth: '4月、9月、10月',
      cautionMonth: '2月、7月',
    },
    zh: {
      animal: '牛(丑)',
      overall: '2026年对属牛者来说是打下稳固基础的好年。火生土，意味着持之以恒的努力将获得回报。',
      career: '默默付出的工作可能终于得到认可。投资新的资格证或技能将成为长期资产。',
      love: '稳定的关系在这一年更加深厚。单身者有望迎来基于信任的缘分。',
      health: '注意消化系统健康。规律饮食和充足睡眠是保持体力的关键。',
      luckyMonth: '4月、9月、10月',
      cautionMonth: '2月、7月',
    },
  },
  '寅': {
    ko: {
      animal: '호랑이띠(寅)',
      overall: '병오년은 호랑이띠에게 활력 넘치는 해입니다. 인오술(寅午戌) 삼합 화국의 영향으로 에너지가 넘치며, 새로운 시작에 유리한 시기입니다.',
      career: '새 프로젝트나 창업에 좋은 타이밍입니다. 리더십을 발휘할 기회가 오며, 과감한 결단이 좋은 결과를 가져옵니다.',
      love: '매력이 빛나는 해입니다. 적극적인 태도가 좋은 인연을 끌어당기며, 기존 관계도 활기를 되찾습니다.',
      health: '에너지가 넘치지만 무리하지 않도록 주의하세요. 간 건강과 근육 관리에 신경 쓰면 좋습니다.',
      luckyMonth: '2월, 6월, 10월',
      cautionMonth: '5월, 8월',
    },
    en: {
      animal: 'Tiger (寅)',
      overall: 'The year 2026 is energizing for Tigers. The Yin-Wu-Xu triple combination amplifies Fire energy, making it an ideal time for new beginnings.',
      career: 'Great timing for new projects or starting a business. Leadership opportunities arise, and bold decisions lead to positive outcomes.',
      love: 'Your charm shines this year. A proactive attitude attracts good connections, and existing relationships regain vitality.',
      health: 'Energy is abundant but avoid overexertion. Pay attention to liver health and muscle care.',
      luckyMonth: 'February, June, October',
      cautionMonth: 'May, August',
    },
    ja: {
      animal: 'とら年(寅)',
      overall: '丙午年は寅年生まれにとって活力に満ちた年です。寅午戌の三合火局の影響でエネルギーが溢れ、新しいスタートに有利な時期です。',
      career: '新プロジェクトや起業に良いタイミングです。リーダーシップを発揮する機会が訪れ、大胆な決断が良い結果をもたらします。',
      love: '魅力が輝く年です。積極的な姿勢が良い縁を引き寄せ、既存の関係にも活気が戻ります。',
      health: 'エネルギーは溢れていますが無理は禁物です。肝臓の健康と筋肉のケアに気を配りましょう。',
      luckyMonth: '2月、6月、10月',
      cautionMonth: '5月、8月',
    },
    zh: {
      animal: '虎(寅)',
      overall: '2026年对属虎者来说充满活力。寅午戌三合火局的影响下能量充沛，是开启新篇章的有利时机。',
      career: '适合启动新项目或创业。领导力展现的机会到来，果断的决策将带来好结果。',
      love: '魅力四射的一年。积极的态度能吸引良缘，现有关系也重焕活力。',
      health: '精力充沛但切勿过度劳累。注意肝脏健康和肌肉保养。',
      luckyMonth: '2月、6月、10月',
      cautionMonth: '5月、8月',
    },
  },
  '卯': {
    ko: {
      animal: '토끼띠(卯)',
      overall: '병오년은 토끼띠에게 창의적 돌파구가 열리는 해입니다. 화(火)의 에너지가 목(木)의 재능을 펼칠 무대를 만들어주며, 예술적·지적 성취가 기대됩니다.',
      career: '창의적인 아이디어가 주목받습니다. 기획, 디자인, 콘텐츠 분야에서 성과가 두드러지며, 협업을 통한 시너지가 큽니다.',
      love: '감성적 교류가 깊어지는 시기입니다. 취미나 관심사를 공유하는 만남이 좋은 인연으로 이어질 수 있습니다.',
      health: '눈과 신경계 건강에 주의하세요. 디지털 기기 사용을 줄이고 자연 속에서 휴식을 취하면 좋습니다.',
      luckyMonth: '3월, 7월, 11월',
      cautionMonth: '4월, 9월',
    },
    en: {
      animal: 'Rabbit (卯)',
      overall: 'The year 2026 opens creative breakthroughs for Rabbits. Fire energy creates a stage for Wood talents to shine, with artistic and intellectual achievements expected.',
      career: 'Creative ideas gain attention. Achievements stand out in planning, design, and content fields, with great synergy through collaboration.',
      love: 'A period of deepening emotional connections. Meetings through shared hobbies or interests can lead to meaningful relationships.',
      health: 'Watch your eye and nervous system health. Reduce digital device usage and find rest in nature.',
      luckyMonth: 'March, July, November',
      cautionMonth: 'April, September',
    },
    ja: {
      animal: 'うさぎ年(卯)',
      overall: '丙午年は卯年生まれにとって創造的な突破口が開かれる年です。火の気が木の才能を発揮する舞台を作り、芸術的・知的成果が期待されます。',
      career: '創造的なアイデアが注目されます。企画・デザイン・コンテンツ分野で成果が際立ち、協業によるシナジーが大きくなります。',
      love: '感性的な交流が深まる時期です。趣味や関心事を共有する出会いが良い縁につながる可能性があります。',
      health: '目と神経系の健康に注意しましょう。デジタル機器の使用を減らし、自然の中で休息を取ると良いでしょう。',
      luckyMonth: '3月、7月、11月',
      cautionMonth: '4月、9月',
    },
    zh: {
      animal: '兔(卯)',
      overall: '2026年为属兔者打开创意突破口。火的能量为木的才华搭建舞台，可期待艺术和智识方面的成就。',
      career: '创意点子受到关注。在策划、设计、内容领域成果突出，协作带来巨大协同效应。',
      love: '情感交流加深的时期。通过共同爱好或兴趣结识的人可能发展为有意义的关系。',
      health: '注意眼睛和神经系统健康。减少电子设备使用，在大自然中休息放松。',
      luckyMonth: '3月、7月、11月',
      cautionMonth: '4月、9月',
    },
  },
  '辰': {
    ko: {
      animal: '용띠(辰)',
      overall: '병오년은 용띠에게 커리어 도약의 기회가 찾아오는 해입니다. 화(火)가 토(土)를 생하여 기반이 탄탄해지며, 승진이나 사업 확장에 유리합니다.',
      career: '리더십이 빛을 발하고 상사나 파트너의 신뢰를 얻습니다. 장기적인 목표를 세우고 실행에 옮기기 좋은 시기입니다.',
      love: '자신감 넘치는 모습이 매력으로 작용합니다. 파트너와 함께 미래 계획을 세우면 관계가 더욱 단단해집니다.',
      health: '위장과 피부 건강에 신경 쓰세요. 수분 섭취를 충분히 하고, 스킨케어 루틴을 점검해보세요.',
      luckyMonth: '1월, 5월, 9월',
      cautionMonth: '3월, 10월',
    },
    en: {
      animal: 'Dragon (辰)',
      overall: 'The year 2026 brings career advancement opportunities for Dragons. Fire generating Earth strengthens your foundation, favoring promotions and business expansion.',
      career: 'Your leadership shines and earns trust from superiors and partners. An excellent time to set long-term goals and execute them.',
      love: 'Confidence becomes your charm. Planning the future together with your partner will strengthen your bond.',
      health: 'Watch your stomach and skin health. Stay well-hydrated and review your skincare routine.',
      luckyMonth: 'January, May, September',
      cautionMonth: 'March, October',
    },
    ja: {
      animal: 'たつ年(辰)',
      overall: '丙午年は辰年生まれにとってキャリア飛躍のチャンスが訪れる年です。火が土を生み基盤が固まり、昇進や事業拡大に有利です。',
      career: 'リーダーシップが光り、上司やパートナーの信頼を得られます。長期的な目標を立てて実行に移すのに良い時期です。',
      love: '自信に満ちた姿が魅力として作用します。パートナーと一緒に将来の計画を立てれば関係がより強固になります。',
      health: '胃腸と肌の健康に気を配りましょう。十分な水分摂取とスキンケアの見直しがおすすめです。',
      luckyMonth: '1月、5月、9月',
      cautionMonth: '3月、10月',
    },
    zh: {
      animal: '龙(辰)',
      overall: '2026年为属龙者带来事业飞跃的机会。火生土使基础更加稳固，有利于晋升和事业扩展。',
      career: '领导力大放异彩，赢得上级和合作伙伴的信任。适合制定长期目标并付诸实施。',
      love: '自信的形象成为你的魅力。与伴侣共同规划未来将使关系更加稳固。',
      health: '注意肠胃和皮肤健康。保持充足的水分摄入，检查护肤习惯。',
      luckyMonth: '1月、5月、9月',
      cautionMonth: '3月、10月',
    },
  },
  '巳': {
    ko: {
      animal: '뱀띠(巳)',
      overall: '병오년은 뱀띠에게 자연스럽게 흐르는 순탄한 해입니다. 사오(巳午)는 같은 화(火) 기운으로 자연스러운 조화를 이루며, 직관과 판단력이 빛을 발합니다.',
      career: '전문성이 인정받는 시기입니다. 깊이 있는 연구나 분석 업무에서 탁월한 성과를 낼 수 있으며, 멘토 역할도 잘 어울립니다.',
      love: '깊은 정서적 교감이 이뤄지는 해입니다. 진심을 담은 대화가 관계를 한 단계 끌어올립니다.',
      health: '전반적으로 양호하지만, 눈 건강과 혈압 관리에 주의하세요. 명상이나 요가가 도움이 됩니다.',
      luckyMonth: '4월, 6월, 10월',
      cautionMonth: '2월, 11월',
    },
    en: {
      animal: 'Snake (巳)',
      overall: 'The year 2026 flows smoothly for Snakes. Si-Wu (巳午) shares the same Fire energy, creating natural harmony where intuition and judgment shine.',
      career: 'Your expertise gains recognition. Deep research and analytical work yield outstanding results, and mentoring roles suit you well.',
      love: 'A year of deep emotional connection. Heartfelt conversations elevate your relationships to the next level.',
      health: 'Generally good, but watch your eye health and blood pressure. Meditation or yoga can be beneficial.',
      luckyMonth: 'April, June, October',
      cautionMonth: 'February, November',
    },
    ja: {
      animal: 'へび年(巳)',
      overall: '丙午年は巳年生まれにとって自然な流れに乗れる順調な年です。巳午は同じ火の気で自然な調和を成し、直感と判断力が光ります。',
      career: '専門性が認められる時期です。深い研究や分析業務で卓越した成果を出せ、メンター役もよく似合います。',
      love: '深い情緒的な交感が実現する年です。心を込めた会話が関係を一段階引き上げます。',
      health: '全体的に良好ですが、目の健康と血圧管理に注意しましょう。瞑想やヨガが助けになります。',
      luckyMonth: '4月、6月、10月',
      cautionMonth: '2月、11月',
    },
    zh: {
      animal: '蛇(巳)',
      overall: '2026年对属蛇者来说顺风顺水。巳午同属火，形成天然和谐，直觉和判断力将大放异彩。',
      career: '专业能力获得认可。在深度研究和分析工作中能取得卓越成果，导师角色也很适合。',
      love: '深层情感交流实现的一年。真诚的对话将把关系提升到新的层次。',
      health: '总体良好，但注意眼睛健康和血压管理。冥想或瑜伽会有帮助。',
      luckyMonth: '4月、6月、10月',
      cautionMonth: '2月、11月',
    },
  },
  '午': {
    ko: {
      animal: '말띠(午)',
      overall: '병오년은 말띠에게 에너지가 정점에 달하는 해입니다. 본인의 기운과 해의 기운이 겹쳐 최고의 활력을 느끼지만, 과유불급을 명심해야 합니다.',
      career: '눈에 띄는 성과를 올릴 수 있는 해입니다. 다만 너무 많은 일을 벌이면 마무리가 어려우니, 선택과 집중이 필요합니다.',
      love: '열정적이고 매력적이지만, 지나친 열정이 상대에게 부담이 될 수 있습니다. 상대의 속도에 맞추는 배려가 필요합니다.',
      health: '과로와 번아웃에 가장 주의해야 합니다. 충분한 수면과 정기적인 건강 검진을 꼭 챙기세요.',
      luckyMonth: '5월, 8월, 12월',
      cautionMonth: '1월, 6월, 7월',
    },
    en: {
      animal: 'Horse (午)',
      overall: 'The year 2026 pushes Horse energy to its peak. Your own energy doubles with the year energy, bringing maximum vitality — but remember that excess can backfire.',
      career: 'You can achieve impressive results. However, taking on too many projects may make it hard to finish them all. Focus and prioritize.',
      love: 'Passionate and charming, but overwhelming enthusiasm may burden your partner. Be considerate of their pace.',
      health: 'Overwork and burnout are your biggest risks. Ensure sufficient sleep and regular health checkups.',
      luckyMonth: 'May, August, December',
      cautionMonth: 'January, June, July',
    },
    ja: {
      animal: 'うま年(午)',
      overall: '丙午年は午年生まれにとってエネルギーが頂点に達する年です。自分の気と年の気が重なり最高の活力を感じますが、過ぎたるは及ばざるが如しを肝に銘じましょう。',
      career: '目立つ成果を上げられる年です。ただし多くのことに手を出すと完遂が難しくなるため、選択と集中が必要です。',
      love: '情熱的で魅力的ですが、過度な熱意が相手の負担になることがあります。相手のペースに合わせる配慮が大切です。',
      health: '過労とバーンアウトに最も注意が必要です。十分な睡眠と定期的な健康診断を必ず心がけましょう。',
      luckyMonth: '5月、8月、12月',
      cautionMonth: '1月、6月、7月',
    },
    zh: {
      animal: '马(午)',
      overall: '2026年属马者能量达到顶峰。自身气运与年运叠加，活力最大化，但要牢记过犹不及。',
      career: '可以取得亮眼的成绩。但揽事太多可能难以收尾，需要选择和聚焦。',
      love: '充满激情和魅力，但过度的热情可能让对方感到压力。需要体谅对方的节奏。',
      health: '过劳和倦怠是最大风险。确保充足睡眠和定期体检。',
      luckyMonth: '5月、8月、12月',
      cautionMonth: '1月、6月、7月',
    },
  },
  '未': {
    ko: {
      animal: '양띠(未)',
      overall: '병오년은 양띠에게 재정적 기회가 찾아오는 해입니다. 화생토(火生土)의 원리로 자원이 늘어나며, 투자와 재테크에 긍정적인 흐름이 형성됩니다.',
      career: '재무, 부동산, 자산관리 분야에서 좋은 기회가 옵니다. 팀워크를 통해 더 큰 성과를 이룰 수 있습니다.',
      love: '안정적이고 따뜻한 관계가 이어집니다. 가족과의 유대가 강화되는 시기이기도 합니다.',
      health: '소화기와 비장 건강에 주의하세요. 따뜻한 음식 위주의 식단과 가벼운 산책이 도움됩니다.',
      luckyMonth: '2월, 6월, 9월',
      cautionMonth: '1월, 12월',
    },
    en: {
      animal: 'Sheep (未)',
      overall: 'The year 2026 brings financial opportunities for Sheep. The Fire-generates-Earth principle increases resources, creating positive momentum for investments and wealth management.',
      career: 'Good opportunities arise in finance, real estate, and asset management. Teamwork amplifies your achievements.',
      love: 'Stable and warm relationships continue. Family bonds also strengthen during this period.',
      health: 'Watch your digestive system and spleen health. A diet of warm foods and light walks will help.',
      luckyMonth: 'February, June, September',
      cautionMonth: 'January, December',
    },
    ja: {
      animal: 'ひつじ年(未)',
      overall: '丙午年は未年生まれにとって財政的なチャンスが訪れる年です。火生土の原理で資源が増え、投資や資産運用にポジティブな流れが形成されます。',
      career: '財務・不動産・資産管理の分野で良い機会が訪れます。チームワークを通じてより大きな成果を達成できます。',
      love: '安定した温かい関係が続きます。家族との絆が強化される時期でもあります。',
      health: '消化器と脾臓の健康に注意しましょう。温かい食事中心の食生活と軽い散歩が助けになります。',
      luckyMonth: '2月、6月、9月',
      cautionMonth: '1月、12月',
    },
    zh: {
      animal: '羊(未)',
      overall: '2026年为属羊者带来财务机遇。火生土的原理使资源增长，投资和理财形成积极趋势。',
      career: '在金融、房地产、资产管理领域迎来好机会。通过团队合作可以取得更大成就。',
      love: '稳定温暖的关系持续发展。也是家庭纽带加强的时期。',
      health: '注意消化系统和脾脏健康。以温热食物为主的饮食和轻松散步会有帮助。',
      luckyMonth: '2月、6月、9月',
      cautionMonth: '1月、12月',
    },
  },
  '申': {
    ko: {
      animal: '원숭이띠(申)',
      overall: '병오년은 원숭이띠에게 인맥과 사회적 교류가 빛나는 해입니다. 다양한 만남에서 뜻밖의 기회를 얻으며, 네트워킹이 성공의 열쇠가 됩니다.',
      career: '커뮤니케이션 능력이 빛을 발합니다. 영업, 마케팅, PR 분야에서 탁월한 성과를 보이며, 해외 관련 기회도 기대됩니다.',
      love: '사교적인 활동에서 좋은 인연을 만날 수 있습니다. 유머와 재치가 상대의 마음을 사로잡습니다.',
      health: '호흡기와 폐 건강에 주의하세요. 실내 환기와 유산소 운동을 꾸준히 하면 좋습니다.',
      luckyMonth: '3월, 7월, 10월',
      cautionMonth: '2월, 6월',
    },
    en: {
      animal: 'Monkey (申)',
      overall: 'The year 2026 highlights networking and social exchange for Monkeys. Unexpected opportunities emerge from diverse encounters, and connections become the key to success.',
      career: 'Communication skills shine. Outstanding performance in sales, marketing, and PR, with potential international opportunities.',
      love: 'Social activities can lead to wonderful connections. Your humor and wit capture hearts.',
      health: 'Watch your respiratory and lung health. Regular ventilation and aerobic exercise are recommended.',
      luckyMonth: 'March, July, October',
      cautionMonth: 'February, June',
    },
    ja: {
      animal: 'さる年(申)',
      overall: '丙午年は申年生まれにとって人脈と社会的交流が輝く年です。多様な出会いから思わぬ機会を得られ、ネットワーキングが成功の鍵となります。',
      career: 'コミュニケーション能力が光ります。営業・マーケティング・PR分野で卓越した成果を見せ、海外関連のチャンスも期待できます。',
      love: '社交的な活動で良い縁に出会えます。ユーモアと機転が相手の心を掴みます。',
      health: '呼吸器と肺の健康に注意しましょう。室内の換気と有酸素運動を続けると良いでしょう。',
      luckyMonth: '3月、7月、10月',
      cautionMonth: '2月、6月',
    },
    zh: {
      animal: '猴(申)',
      overall: '2026年属猴者的人脉和社交活动大放异彩。多样的交往中涌现意外机遇，社交网络成为成功的关键。',
      career: '沟通能力大放光彩。在销售、市场营销、公关领域表现出色，也有望获得海外相关机会。',
      love: '社交活动中可能遇到好缘分。幽默和机智俘获对方的心。',
      health: '注意呼吸系统和肺部健康。保持室内通风和坚持有氧运动为宜。',
      luckyMonth: '3月、7月、10月',
      cautionMonth: '2月、6月',
    },
  },
  '酉': {
    ko: {
      animal: '닭띠(酉)',
      overall: '병오년은 닭띠에게 정밀함이 빛을 발하는 해입니다. 세심한 계획과 꼼꼼한 실행이 큰 성과로 이어지며, 전문 분야에서 실력을 인정받습니다.',
      career: '디테일에 강한 업무에서 두각을 나타냅니다. 회계, 법률, 기술 분야에서 전문성이 빛나며, 자격증 취득에도 좋은 시기입니다.',
      love: '진정성 있는 태도가 신뢰를 쌓습니다. 겉모습보다 내면의 가치를 알아보는 사람과의 인연이 기대됩니다.',
      health: '폐와 대장 건강에 주의하세요. 규칙적인 생활 습관과 충분한 수분 섭취가 중요합니다.',
      luckyMonth: '1월, 5월, 8월',
      cautionMonth: '3월, 9월',
    },
    en: {
      animal: 'Rooster (酉)',
      overall: 'The year 2026 rewards precision for Roosters. Meticulous planning and detailed execution lead to significant results, earning recognition in your specialty.',
      career: 'Excel in detail-oriented work. Expertise shines in accounting, law, and technology. A great year for earning certifications.',
      love: 'Authenticity builds trust. Look forward to connections with those who see your inner value beyond appearances.',
      health: 'Watch your lung and intestinal health. Regular lifestyle habits and sufficient hydration are important.',
      luckyMonth: 'January, May, August',
      cautionMonth: 'March, September',
    },
    ja: {
      animal: 'とり年(酉)',
      overall: '丙午年は酉年生まれにとって精密さが光る年です。緻密な計画と丁寧な実行が大きな成果につながり、専門分野で実力を認められます。',
      career: 'ディテールに強い業務で頭角を現します。会計・法律・技術分野で専門性が光り、資格取得にも良い時期です。',
      love: '誠実な態度が信頼を築きます。見た目より内面の価値を見てくれる人との縁が期待できます。',
      health: '肺と大腸の健康に注意しましょう。規則正しい生活習慣と十分な水分摂取が大切です。',
      luckyMonth: '1月、5月、8月',
      cautionMonth: '3月、9月',
    },
    zh: {
      animal: '鸡(酉)',
      overall: '2026年属鸡者的精准细致将大放异彩。周密的计划和细致的执行带来显著成果，专业领域获得认可。',
      career: '在注重细节的工作中脱颖而出。会计、法律、技术领域专业能力闪耀，也是考取证书的好时机。',
      love: '真诚的态度建立信任。期待与看重内在价值的人结缘。',
      health: '注意肺部和大肠健康。规律的生活习惯和充足的水分摄入很重要。',
      luckyMonth: '1月、5月、8月',
      cautionMonth: '3月、9月',
    },
  },
  '戌': {
    ko: {
      animal: '개띠(戌)',
      overall: '병오년은 개띠에게 충성과 신의가 보상받는 해입니다. 인오술(寅午戌) 삼합의 영향으로 화기가 더해져, 인간관계에서 큰 수확을 거둡니다.',
      career: '팀워크와 협업에서 핵심 역할을 맡게 됩니다. 오랜 신뢰 관계가 새로운 사업 기회로 이어질 수 있습니다.',
      love: '진실된 마음이 통하는 해입니다. 오래된 관계가 새롭게 꽃피거나, 의미 있는 새 만남이 찾아옵니다.',
      health: '위장과 비뇨기 건강에 신경 쓰세요. 스트레칭과 족욕으로 순환을 돕는 것이 좋습니다.',
      luckyMonth: '2월, 6월, 10월',
      cautionMonth: '4월, 8월',
    },
    en: {
      animal: 'Dog (戌)',
      overall: 'The year 2026 rewards loyalty and integrity for Dogs. The Yin-Wu-Xu triple combination adds Fire energy, bringing great rewards in relationships.',
      career: 'You take on key roles in teamwork and collaboration. Long-standing trust can open new business opportunities.',
      love: 'A year where sincere hearts connect. Old relationships may bloom anew, or meaningful new encounters arrive.',
      health: 'Watch your stomach and urinary health. Stretching and foot baths to improve circulation are recommended.',
      luckyMonth: 'February, June, October',
      cautionMonth: 'April, August',
    },
    ja: {
      animal: 'いぬ年(戌)',
      overall: '丙午年は戌年生まれにとって忠誠と信義が報われる年です。寅午戌の三合の影響で火気が加わり、人間関係で大きな収穫があります。',
      career: 'チームワークと協業で中心的な役割を担います。長年の信頼関係が新しいビジネスチャンスにつながる可能性があります。',
      love: '真心が通じる年です。長い付き合いが新たに花開いたり、意味のある新しい出会いが訪れます。',
      health: '胃腸と泌尿器の健康に気を配りましょう。ストレッチと足湯で循環を助けると良いでしょう。',
      luckyMonth: '2月、6月、10月',
      cautionMonth: '4月、8月',
    },
    zh: {
      animal: '狗(戌)',
      overall: '2026年属狗者的忠诚和诚信将获得回报。寅午戌三合增添火气，人际关系中收获颇丰。',
      career: '在团队合作中担当核心角色。长期积累的信任关系可能转化为新的商业机会。',
      love: '真心相通的一年。旧情重燃或有意义的新缘到来。',
      health: '注意肠胃和泌尿系统健康。通过拉伸和泡脚促进循环为佳。',
      luckyMonth: '2月、6月、10月',
      cautionMonth: '4月、8月',
    },
  },
  '亥': {
    ko: {
      animal: '돼지띠(亥)',
      overall: '병오년은 돼지띠에게 여행과 배움이 열리는 해입니다. 수화(水火) 교차의 에너지가 새로운 시야를 열어주며, 해외 관련 활동이나 학업에서 좋은 성과가 기대됩니다.',
      career: '교육, 출판, 해외사업 분야에서 기회가 찾아옵니다. 새로운 분야를 공부하거나 해외 출장이 커리어에 플러스가 됩니다.',
      love: '여행이나 새로운 경험을 통해 특별한 인연을 만날 수 있습니다. 함께 성장할 수 있는 파트너를 만나는 해입니다.',
      health: '신장과 방광 건강에 주의하세요. 수분 섭취를 적절히 조절하고, 하체 운동을 강화하면 좋습니다.',
      luckyMonth: '3월, 7월, 11월',
      cautionMonth: '5월, 9월',
    },
    en: {
      animal: 'Pig (亥)',
      overall: 'The year 2026 opens doors to travel and learning for Pigs. The Water-Fire crossover energy broadens perspectives, with good results expected in international activities and studies.',
      career: 'Opportunities arise in education, publishing, and international business. Studying new fields or traveling abroad benefits your career.',
      love: 'Travel and new experiences can lead to special connections. A year to meet partners who grow alongside you.',
      health: 'Watch your kidney and bladder health. Moderate water intake and strengthen lower-body exercises.',
      luckyMonth: 'March, July, November',
      cautionMonth: 'May, September',
    },
    ja: {
      animal: 'いのしし年(亥)',
      overall: '丙午年は亥年生まれにとって旅と学びの扉が開かれる年です。水火交差のエネルギーが新しい視野を開き、海外関連の活動や学業で良い成果が期待できます。',
      career: '教育・出版・海外事業の分野でチャンスが訪れます。新しい分野の勉強や海外出張がキャリアにプラスになります。',
      love: '旅行や新しい体験を通じて特別な縁に出会える可能性があります。一緒に成長できるパートナーに出会える年です。',
      health: '腎臓と膀胱の健康に注意しましょう。水分摂取を適切に調整し、下半身の運動を強化すると良いでしょう。',
      luckyMonth: '3月、7月、11月',
      cautionMonth: '5月、9月',
    },
    zh: {
      animal: '猪(亥)',
      overall: '2026年为属猪者打开旅行和学习的大门。水火交汇的能量拓宽视野，在国际活动和学业中有望取得好成果。',
      career: '教育、出版、海外事业领域迎来机遇。学习新领域或出国出差将为职业发展加分。',
      love: '通过旅行和新体验可能遇到特别的缘分。是遇到能共同成长的伴侣的一年。',
      health: '注意肾脏和膀胱健康。适当控制水分摄入，加强下半身锻炼为宜。',
      luckyMonth: '3月、7月、11月',
      cautionMonth: '5月、9月',
    },
  },
}

// ---------------------------------------------------------------------------
// ZODIAC_FORTUNE — 2025 (乙巳年)
// ---------------------------------------------------------------------------

const ZODIAC_2025: Record<ZodiacKey, Record<Language, ZodiacFortuneEntry>> = {
  '子': {
    ko: {
      animal: '쥐띠(子)',
      overall: '을사년은 쥐띠에게 지혜로운 판단이 요구되는 해입니다. 수(水)와 화(火)의 긴장 속에서 균형을 잡으면 안정적인 성장이 가능합니다.',
      career: '분석력과 기획력이 빛을 발합니다. 데이터 기반의 의사결정이 좋은 결과를 가져오며, 재무 분야에서 기회가 생깁니다.',
      love: '감정보다 이성적 판단이 관계에 도움이 됩니다. 서로의 공간을 존중하는 성숙한 사랑이 좋습니다.',
      health: '비뇨기와 신장 건강에 주의하세요. 적절한 수분 섭취와 하체 스트레칭이 도움됩니다.',
      luckyMonth: '4월, 8월, 12월',
      cautionMonth: '2월, 6월',
    },
    en: {
      animal: 'Rat (子)',
      overall: 'The year 2025 calls for wise judgment from Rats. Balancing the tension between Water and Fire energy enables stable growth.',
      career: 'Analytical and planning abilities shine. Data-driven decisions yield good results, with opportunities in finance.',
      love: 'Rational thinking helps relationships more than emotions. Mature love that respects each other\'s space works best.',
      health: 'Watch urinary and kidney health. Proper hydration and lower body stretching help.',
      luckyMonth: 'April, August, December',
      cautionMonth: 'February, June',
    },
    ja: {
      animal: 'ねずみ年(子)',
      overall: '乙巳年は子年生まれにとって賢明な判断が求められる年です。水と火の緊張の中でバランスを取れば安定した成長が可能です。',
      career: '分析力と企画力が光ります。データに基づいた意思決定が良い結果をもたらし、財務分野でチャンスが生まれます。',
      love: '感情より理性的な判断が関係に役立ちます。互いの空間を尊重する成熟した愛が良いでしょう。',
      health: '泌尿器と腎臓の健康に注意しましょう。適切な水分摂取と下半身のストレッチが助けになります。',
      luckyMonth: '4月、8月、12月',
      cautionMonth: '2月、6月',
    },
    zh: {
      animal: '鼠(子)',
      overall: '2025年要求属鼠者做出明智判断。在水火之间的张力中找到平衡，就能实现稳定成长。',
      career: '分析力和策划力大放异彩。数据驱动的决策带来好结果，金融领域有机会。',
      love: '理性判断比情感更有助于关系。互相尊重空间的成熟之爱最为适宜。',
      health: '注意泌尿系统和肾脏健康。适当饮水和下半身拉伸有帮助。',
      luckyMonth: '4月、8月、12月',
      cautionMonth: '2月、6月',
    },
  },
  '丑': {
    ko: {
      animal: '소띠(丑)',
      overall: '을사년은 소띠에게 묵묵히 실력을 쌓기 좋은 해입니다. 을목(乙木)의 유연함이 토(土)의 안정성을 보완하여, 차근차근 성과를 쌓아갈 수 있습니다.',
      career: '전문 자격증 취득이나 기술 향상에 적합한 시기입니다. 상사의 인정보다 실력 자체에 집중하면 더 큰 보상이 따릅니다.',
      love: '느리지만 확실한 관계 발전이 이뤄집니다. 꾸준한 관심과 작은 배려가 큰 감동을 줍니다.',
      health: '관절과 근육 건강에 신경 쓰세요. 무리한 운동보다 꾸준한 가벼운 운동이 좋습니다.',
      luckyMonth: '3월, 7월, 10월',
      cautionMonth: '1월, 5월',
    },
    en: {
      animal: 'Ox (丑)',
      overall: 'The year 2025 is great for Oxen to quietly build expertise. The flexibility of Eul Wood complements Earth\'s stability, enabling steady accumulation of results.',
      career: 'An ideal time for certifications and skill improvement. Focus on real abilities rather than seeking recognition for greater rewards.',
      love: 'Slow but sure relationship progress. Consistent attention and small acts of care create deep impressions.',
      health: 'Watch joint and muscle health. Light, consistent exercise is better than intense workouts.',
      luckyMonth: 'March, July, October',
      cautionMonth: 'January, May',
    },
    ja: {
      animal: 'うし年(丑)',
      overall: '乙巳年は丑年生まれにとって黙々と実力を積むのに良い年です。乙木の柔軟さが土の安定性を補い、着実に成果を積み上げることができます。',
      career: '専門資格の取得や技術向上に適した時期です。上司の評価より実力そのものに集中すれば、より大きな報酬が得られます。',
      love: 'ゆっくりですが確かな関係の発展があります。継続的な関心と小さな気遣いが大きな感動を与えます。',
      health: '関節と筋肉の健康に気を配りましょう。無理な運動より継続的な軽い運動が良いです。',
      luckyMonth: '3月、7月、10月',
      cautionMonth: '1月、5月',
    },
    zh: {
      animal: '牛(丑)',
      overall: '2025年适合属牛者默默积累实力。乙木的柔韧性补充土的稳定性，能够稳步积累成果。',
      career: '适合考取专业资格证或提升技能的时期。比起追求认可，专注于实力本身会带来更大的回报。',
      love: '缓慢但确实的感情发展。持续的关心和小小的体贴带来大大的感动。',
      health: '注意关节和肌肉健康。持续的轻度运动比高强度训练更好。',
      luckyMonth: '3月、7月、10月',
      cautionMonth: '1月、5月',
    },
  },
  '寅': {
    ko: {
      animal: '호랑이띠(寅)',
      overall: '을사년은 호랑이띠에게 내면의 힘을 키우는 해입니다. 인사(寅巳)의 형(刑) 관계가 있어 도전이 따르지만, 이를 극복하면 크게 성장합니다.',
      career: '기존 방식에 대한 혁신이 요구됩니다. 새로운 기술이나 트렌드를 빠르게 습득하면 경쟁력이 높아집니다.',
      love: '자존심보다 이해심을 앞세우면 관계가 좋아집니다. 상대방의 입장에서 생각하는 연습이 필요한 해입니다.',
      health: '간과 담 건강에 주의하세요. 음주를 절제하고 충분한 수면을 취하는 것이 중요합니다.',
      luckyMonth: '2월, 6월, 11월',
      cautionMonth: '4월, 8월',
    },
    en: {
      animal: 'Tiger (寅)',
      overall: 'The year 2025 is about building inner strength for Tigers. The Yin-Si penalty brings challenges, but overcoming them leads to significant growth.',
      career: 'Innovation in existing methods is needed. Quickly adopting new skills and trends boosts your competitiveness.',
      love: 'Putting understanding before pride improves relationships. A year for practicing empathy.',
      health: 'Watch liver and gallbladder health. Moderate alcohol and ensure sufficient sleep.',
      luckyMonth: 'February, June, November',
      cautionMonth: 'April, August',
    },
    ja: {
      animal: 'とら年(寅)',
      overall: '乙巳年は寅年生まれにとって内面の力を育てる年です。寅巳の刑の関係があり挑戦が伴いますが、克服すれば大きく成長します。',
      career: '既存のやり方への革新が求められます。新しい技術やトレンドを素早く習得すれば競争力が高まります。',
      love: 'プライドより思いやりを前に出せば関係が良くなります。相手の立場で考える練習が必要な年です。',
      health: '肝臓と胆のうの健康に注意しましょう。飲酒を控え、十分な睡眠を取ることが大切です。',
      luckyMonth: '2月、6月、11月',
      cautionMonth: '4月、8月',
    },
    zh: {
      animal: '虎(寅)',
      overall: '2025年是属虎者修炼内功的一年。寅巳相刑带来挑战，但克服之后将迎来显著成长。',
      career: '需要对现有方式进行创新。快速掌握新技能和趋势能提升竞争力。',
      love: '将理解放在自尊之前，关系会改善。需要练习换位思考的一年。',
      health: '注意肝脏和胆囊健康。控制饮酒，确保充足睡眠。',
      luckyMonth: '2月、6月、11月',
      cautionMonth: '4月、8月',
    },
  },
  '卯': {
    ko: {
      animal: '토끼띠(卯)',
      overall: '을사년은 토끼띠에게 재능이 빛나는 해입니다. 을목(乙木)이 자신의 기운과 통하여 자연스러운 자기표현이 가능하며, 예술·문학 분야에서 두각을 나타냅니다.',
      career: '창작, 교육, 상담 분야에서 좋은 기회가 옵니다. 글쓰기나 강연 등 자기표현 활동이 커리어에 큰 도움이 됩니다.',
      love: '감성이 풍부해지는 시기로 로맨틱한 만남이 기대됩니다. 자신의 감정을 솔직하게 표현하면 좋은 인연이 찾아옵니다.',
      health: '목과 어깨 결림에 주의하세요. 바른 자세와 규칙적인 스트레칭이 도움됩니다.',
      luckyMonth: '3월, 5월, 9월',
      cautionMonth: '7월, 11월',
    },
    en: {
      animal: 'Rabbit (卯)',
      overall: 'The year 2025 lets Rabbit talents shine. Eul Wood resonates with your own energy, enabling natural self-expression and standing out in arts and literature.',
      career: 'Good opportunities in creative, educational, and counseling fields. Writing, speaking, and self-expression activities greatly boost your career.',
      love: 'Rich emotions lead to romantic encounters. Honestly expressing your feelings brings good connections.',
      health: 'Watch for neck and shoulder stiffness. Good posture and regular stretching help.',
      luckyMonth: 'March, May, September',
      cautionMonth: 'July, November',
    },
    ja: {
      animal: 'うさぎ年(卯)',
      overall: '乙巳年は卯年生まれにとって才能が輝く年です。乙木が自分の気と通じ、自然な自己表現が可能で、芸術・文学分野で頭角を現します。',
      career: '創作・教育・カウンセリング分野で良い機会が訪れます。執筆や講演など自己表現活動がキャリアに大きく役立ちます。',
      love: '感性が豊かになる時期でロマンチックな出会いが期待できます。自分の気持ちを素直に表現すれば良い縁が訪れます。',
      health: '首と肩のこりに注意しましょう。正しい姿勢と定期的なストレッチが助けになります。',
      luckyMonth: '3月、5月、9月',
      cautionMonth: '7月、11月',
    },
    zh: {
      animal: '兔(卯)',
      overall: '2025年是属兔者才华闪耀的一年。乙木与自身能量相通，能够自然地自我表达，在艺术和文学领域脱颖而出。',
      career: '在创作、教育、咨询领域迎来好机会。写作、演讲等自我表达活动对职业发展大有裨益。',
      love: '感性丰富的时期，期待浪漫邂逅。坦诚表达自己的感情会带来好缘分。',
      health: '注意颈肩僵硬。良好的姿势和规律的拉伸有帮助。',
      luckyMonth: '3月、5月、9月',
      cautionMonth: '7月、11月',
    },
  },
  '辰': {
    ko: {
      animal: '용띠(辰)',
      overall: '을사년은 용띠에게 전략적 파트너십이 빛나는 해입니다. 진사(辰巳) 조합이 시너지를 만들어 협업을 통한 큰 성과가 가능합니다.',
      career: '합작 사업이나 팀 프로젝트에서 두각을 나타냅니다. 다른 사람의 강점을 활용하는 지혜가 성공의 열쇠입니다.',
      love: '동반자 관계가 한층 성숙해지는 해입니다. 함께 목표를 세우고 이뤄가는 과정에서 유대가 깊어집니다.',
      health: '피부와 소화기 건강에 주의하세요. 스트레스 관리와 충분한 수면이 중요합니다.',
      luckyMonth: '1월, 4월, 9월',
      cautionMonth: '6월, 10월',
    },
    en: {
      animal: 'Dragon (辰)',
      overall: 'The year 2025 highlights strategic partnerships for Dragons. The Chen-Si combination creates synergy, enabling great achievements through collaboration.',
      career: 'Shine in joint ventures and team projects. The wisdom to leverage others\' strengths is the key to success.',
      love: 'Partnership matures further this year. Working toward shared goals deepens your bond.',
      health: 'Watch skin and digestive health. Stress management and adequate sleep are important.',
      luckyMonth: 'January, April, September',
      cautionMonth: 'June, October',
    },
    ja: {
      animal: 'たつ年(辰)',
      overall: '乙巳年は辰年生まれにとって戦略的パートナーシップが光る年です。辰巳の組み合わせがシナジーを生み、協業を通じた大きな成果が可能です。',
      career: '合弁事業やチームプロジェクトで頭角を現します。他の人の強みを活かす知恵が成功の鍵です。',
      love: 'パートナーシップが一層成熟する年です。一緒に目標を立て達成していく過程で絆が深まります。',
      health: '肌と消化器の健康に注意しましょう。ストレス管理と十分な睡眠が大切です。',
      luckyMonth: '1月、4月、9月',
      cautionMonth: '6月、10月',
    },
    zh: {
      animal: '龙(辰)',
      overall: '2025年属龙者的战略合作关系大放异彩。辰巳组合产生协同效应，通过合作可以取得巨大成就。',
      career: '在合资企业和团队项目中脱颖而出。善用他人优势的智慧是成功的关键。',
      love: '伴侣关系更加成熟的一年。共同设定目标并一起实现的过程中加深纽带。',
      health: '注意皮肤和消化系统健康。压力管理和充足睡眠很重要。',
      luckyMonth: '1月、4月、9月',
      cautionMonth: '6月、10月',
    },
  },
  '巳': {
    ko: {
      animal: '뱀띠(巳)',
      overall: '을사년은 뱀띠에게 자기 자신을 돌아보는 본명년(本命年)입니다. 내면의 성찰을 통해 새로운 방향을 설정하기 좋으며, 조용하지만 깊은 변화가 일어납니다.',
      career: '급격한 변화보다 내실을 다지는 것이 중요합니다. 자기 계발과 네트워크 정비에 집중하면 장기적으로 유리합니다.',
      love: '자기 자신을 이해하는 만큼 상대도 이해할 수 있습니다. 내면의 성장이 관계의 질을 높이는 해입니다.',
      health: '전반적인 건강 검진을 받아보세요. 특히 심혈관과 혈압 관리에 신경 쓰면 좋습니다.',
      luckyMonth: '5월, 8월, 11월',
      cautionMonth: '3월, 7월',
    },
    en: {
      animal: 'Snake (巳)',
      overall: 'The year 2025 is the Snake\'s own year (Ben Ming Nian) — a time for self-reflection. Set new directions through inner contemplation as quiet but deep transformation occurs.',
      career: 'Building substance matters more than dramatic changes. Focus on self-improvement and network maintenance for long-term advantage.',
      love: 'Understanding yourself deepens understanding of others. Inner growth elevates relationship quality.',
      health: 'Get a comprehensive health checkup. Pay special attention to cardiovascular health and blood pressure.',
      luckyMonth: 'May, August, November',
      cautionMonth: 'March, July',
    },
    ja: {
      animal: 'へび年(巳)',
      overall: '乙巳年は巳年生まれにとって自分を振り返る本命年です。内面の省察を通じて新しい方向を設定するのに良く、静かだが深い変化が起こります。',
      career: '急激な変化より内実を固めることが重要です。自己啓発とネットワーク整備に集中すれば長期的に有利です。',
      love: '自分自身を理解する分だけ相手も理解できます。内面の成長が関係の質を高める年です。',
      health: '総合的な健康診断を受けてみましょう。特に心血管と血圧管理に気を配ると良いでしょう。',
      luckyMonth: '5月、8月、11月',
      cautionMonth: '3月、7月',
    },
    zh: {
      animal: '蛇(巳)',
      overall: '2025年是属蛇者的本命年，是自我反省的时期。通过内心反思设定新方向，安静而深刻的变化正在发生。',
      career: '夯实基础比急剧变化更重要。专注于自我提升和人脉整理，从长远来看更有利。',
      love: '理解自己多少，就能理解对方多少。内在成长提升关系质量的一年。',
      health: '建议做一次全面体检。特别注意心血管和血压管理。',
      luckyMonth: '5月、8月、11月',
      cautionMonth: '3月、7月',
    },
  },
  '午': {
    ko: {
      animal: '말띠(午)',
      overall: '을사년은 말띠에게 열정과 행동력이 넘치는 해입니다. 오화(午火)와 사화(巳火)가 함께하여 추진력이 강하지만, 방향 설정이 중요합니다.',
      career: '빠른 실행력으로 경쟁에서 앞서갈 수 있습니다. 다만 너무 많은 프로젝트에 손대기보다 핵심에 집중하세요.',
      love: '열정적인 만남이 기대됩니다. 하지만 불꽃같은 시작만큼 꾸준함도 중요합니다.',
      health: '심장과 소장 건강에 주의하세요. 유산소 운동을 규칙적으로 하되 과도한 운동은 피하세요.',
      luckyMonth: '2월, 6월, 9월',
      cautionMonth: '4월, 12월',
    },
    en: {
      animal: 'Horse (午)',
      overall: 'The year 2025 fills Horses with passion and drive. Wu Fire and Si Fire together boost momentum, but setting the right direction is crucial.',
      career: 'Quick execution keeps you ahead of competition. Focus on core projects rather than spreading too thin.',
      love: 'Passionate encounters are expected. But consistency matters as much as a fiery start.',
      health: 'Watch heart and small intestine health. Exercise regularly with cardio but avoid overtraining.',
      luckyMonth: 'February, June, September',
      cautionMonth: 'April, December',
    },
    ja: {
      animal: 'うま年(午)',
      overall: '乙巳年は午年生まれにとって情熱と行動力に溢れる年です。午火と巳火が合わさり推進力が強まりますが、方向設定が重要です。',
      career: '素早い実行力で競争で先行できます。ただし多くのプロジェクトに手を出すより核心に集中しましょう。',
      love: '情熱的な出会いが期待できます。ただし花火のようなスタートだけでなく持続性も大切です。',
      health: '心臓と小腸の健康に注意しましょう。有酸素運動を規則的に行い、過度な運動は避けましょう。',
      luckyMonth: '2月、6月、9月',
      cautionMonth: '4月、12月',
    },
    zh: {
      animal: '马(午)',
      overall: '2025年属马者充满激情和行动力。午火与巳火合力增强推动力，但正确的方向设定至关重要。',
      career: '快速的执行力使你在竞争中领先。但与其涉猎过多，不如专注核心。',
      love: '期待充满激情的邂逅。但持之以恒与火热的开始同样重要。',
      health: '注意心脏和小肠健康。规律进行有氧运动，但避免过度训练。',
      luckyMonth: '2月、6月、9月',
      cautionMonth: '4月、12月',
    },
  },
  '未': {
    ko: {
      animal: '양띠(未)',
      overall: '을사년은 양띠에게 예술적 감성이 꽃피는 해입니다. 목(木)과 토(土)의 조화가 창작 활동에 유리하며, 감성적 접근이 성공을 이끕니다.',
      career: '디자인, 요리, 인테리어 등 감성 분야에서 두각을 나타냅니다. 고객이나 동료와의 공감 능력이 경쟁력이 됩니다.',
      love: '따뜻하고 편안한 관계가 이어집니다. 소소한 일상의 행복을 함께 나누는 것이 최고의 로맨스입니다.',
      health: '소화기 건강에 주의하세요. 제철 음식 위주의 식단과 적당한 산책이 좋습니다.',
      luckyMonth: '3월, 7월, 10월',
      cautionMonth: '1월, 9월',
    },
    en: {
      animal: 'Sheep (未)',
      overall: 'The year 2025 lets artistic sensibilities blossom for Sheep. The harmony of Wood and Earth favors creative activities, and emotional approaches lead to success.',
      career: 'Stand out in aesthetic fields like design, culinary arts, and interior decoration. Empathy with clients and colleagues becomes your edge.',
      love: 'Warm and comfortable relationships continue. Sharing small daily joys together is the best romance.',
      health: 'Watch digestive health. A diet of seasonal foods and moderate walks are recommended.',
      luckyMonth: 'March, July, October',
      cautionMonth: 'January, September',
    },
    ja: {
      animal: 'ひつじ年(未)',
      overall: '乙巳年は未年生まれにとって芸術的感性が花開く年です。木と土の調和が創作活動に有利で、感性的なアプローチが成功を導きます。',
      career: 'デザイン・料理・インテリアなど感性分野で頭角を現します。顧客や同僚との共感力が競争力になります。',
      love: '温かく居心地の良い関係が続きます。日常のささやかな幸せを共に分かち合うことが最高のロマンスです。',
      health: '消化器の健康に注意しましょう。旬の食材中心の食事と適度な散歩が良いでしょう。',
      luckyMonth: '3月、7月、10月',
      cautionMonth: '1月、9月',
    },
    zh: {
      animal: '羊(未)',
      overall: '2025年属羊者的艺术感性将绽放。木与土的和谐有利于创作活动，感性的方式引领成功。',
      career: '在设计、烹饪、室内设计等感性领域脱颖而出。与客户和同事的共情能力成为竞争力。',
      love: '温暖舒适的关系持续发展。一起分享日常小幸福就是最好的浪漫。',
      health: '注意消化系统健康。以时令食材为主的饮食和适度散步为宜。',
      luckyMonth: '3月、7月、10月',
      cautionMonth: '1月、9月',
    },
  },
  '申': {
    ko: {
      animal: '원숭이띠(申)',
      overall: '을사년은 원숭이띠에게 신사(申巳)의 합 관계로 인해 좋은 인연이 많은 해입니다. 협력자를 통해 뜻밖의 기회를 잡을 수 있습니다.',
      career: '비즈니스 파트너십이나 계약 관련 업무에서 좋은 성과를 냅니다. 커뮤니케이션과 협상력이 빛을 발합니다.',
      love: '자연스러운 만남에서 좋은 인연이 찾아옵니다. 억지로 찾기보다 일상에서의 인연을 소중히 하세요.',
      health: '호흡기 건강에 신경 쓰세요. 실내 공기 질 관리와 규칙적인 심호흡이 도움됩니다.',
      luckyMonth: '4월, 8월, 11월',
      cautionMonth: '2월, 6월',
    },
    en: {
      animal: 'Monkey (申)',
      overall: 'The year 2025 brings good connections through the Shen-Si harmony. Collaborators may present unexpected opportunities.',
      career: 'Achieve good results in business partnerships and contract-related work. Communication and negotiation skills shine.',
      love: 'Good connections emerge from natural encounters. Cherish everyday relationships rather than forcing them.',
      health: 'Watch respiratory health. Indoor air quality management and regular deep breathing help.',
      luckyMonth: 'April, August, November',
      cautionMonth: 'February, June',
    },
    ja: {
      animal: 'さる年(申)',
      overall: '乙巳年は申年生まれにとって申巳の合の関係により良い縁が多い年です。協力者を通じて思わぬ機会を掴むことができます。',
      career: 'ビジネスパートナーシップや契約関連業務で良い成果を出します。コミュニケーションと交渉力が光ります。',
      love: '自然な出会いから良い縁が訪れます。無理に探すより日常での縁を大切にしましょう。',
      health: '呼吸器の健康に気を配りましょう。室内の空気質管理と規則的な深呼吸が助けになります。',
      luckyMonth: '4月、8月、11月',
      cautionMonth: '2月、6月',
    },
    zh: {
      animal: '猴(申)',
      overall: '2025年因申巳合的关系，属猴者良缘众多。通过合作者可能抓住意想不到的机会。',
      career: '在商业合作和合同相关工作中取得好成绩。沟通能力和谈判力大放异彩。',
      love: '好缘分来自自然的相遇。与其刻意寻找，不如珍惜日常中的缘分。',
      health: '注意呼吸系统健康。室内空气质量管理和规律的深呼吸有帮助。',
      luckyMonth: '4月、8月、11月',
      cautionMonth: '2月、6月',
    },
  },
  '酉': {
    ko: {
      animal: '닭띠(酉)',
      overall: '을사년은 닭띠에게 기술과 전문성이 인정받는 해입니다. 금(金)과 목(木)의 상극이 있지만, 이를 긍정적으로 활용하면 혁신적인 성과를 낼 수 있습니다.',
      career: '기술 혁신이나 품질 개선에서 뛰어난 성과를 보입니다. 체계적인 접근이 차별화된 경쟁력을 만들어줍니다.',
      love: '솔직한 소통이 관계를 개선합니다. 완벽주의를 내려놓고 상대를 있는 그대로 받아들이는 연습이 필요합니다.',
      health: '폐와 피부 건강에 주의하세요. 보습 관리와 규칙적인 유산소 운동을 권합니다.',
      luckyMonth: '1월, 5월, 9월',
      cautionMonth: '3월, 11월',
    },
    en: {
      animal: 'Rooster (酉)',
      overall: 'The year 2025 recognizes technical expertise for Roosters. Though Metal-Wood friction exists, using it positively can produce innovative results.',
      career: 'Outstanding performance in technical innovation and quality improvement. A systematic approach creates differentiated competitiveness.',
      love: 'Honest communication improves relationships. Practice accepting your partner as they are, letting go of perfectionism.',
      health: 'Watch lung and skin health. Moisturizing care and regular aerobic exercise are recommended.',
      luckyMonth: 'January, May, September',
      cautionMonth: 'March, November',
    },
    ja: {
      animal: 'とり年(酉)',
      overall: '乙巳年は酉年生まれにとって技術と専門性が認められる年です。金と木の相剋がありますが、これをポジティブに活用すれば革新的な成果を出せます。',
      career: '技術革新や品質改善で優れた成果を見せます。体系的なアプローチが差別化された競争力を生みます。',
      love: '率直なコミュニケーションが関係を改善します。完璧主義を手放し、相手をありのまま受け入れる練習が必要です。',
      health: '肺と肌の健康に注意しましょう。保湿ケアと規則的な有酸素運動をお勧めします。',
      luckyMonth: '1月、5月、9月',
      cautionMonth: '3月、11月',
    },
    zh: {
      animal: '鸡(酉)',
      overall: '2025年属鸡者的技术和专业能力获得认可。虽然存在金木相克，但积极利用可以产生创新成果。',
      career: '在技术创新和质量改进方面表现出色。系统性的方法创造差异化竞争力。',
      love: '坦诚的沟通改善关系。放下完美主义，练习接纳对方本来的样子。',
      health: '注意肺部和皮肤健康。建议保湿护理和规律有氧运动。',
      luckyMonth: '1月、5月、9月',
      cautionMonth: '3月、11月',
    },
  },
  '戌': {
    ko: {
      animal: '개띠(戌)',
      overall: '을사년은 개띠에게 정의감과 봉사정신이 빛나는 해입니다. 주변 사람들을 돕는 과정에서 자신도 성장하며, 신뢰가 자산이 됩니다.',
      career: '공공 분야, 사회공헌, 교육 관련 업무에서 보람을 느낍니다. 정직하고 성실한 태도가 장기적 성공의 토대가 됩니다.',
      love: '의리와 헌신이 관계를 깊게 만듭니다. 진심으로 상대를 위하는 마음이 전해지는 해입니다.',
      health: '위장과 비뇨기 건강에 주의하세요. 규칙적인 식사와 적절한 운동이 중요합니다.',
      luckyMonth: '2월, 6월, 10월',
      cautionMonth: '4월, 8월',
    },
    en: {
      animal: 'Dog (戌)',
      overall: 'The year 2025 highlights the Dog\'s sense of justice and service spirit. Growth comes through helping others, and trust becomes your greatest asset.',
      career: 'Find fulfillment in public service, social contribution, and education. Honest and diligent attitudes form the foundation of long-term success.',
      love: 'Loyalty and devotion deepen relationships. A year when your genuine care for others truly gets through.',
      health: 'Watch stomach and urinary health. Regular meals and moderate exercise are important.',
      luckyMonth: 'February, June, October',
      cautionMonth: 'April, August',
    },
    ja: {
      animal: 'いぬ年(戌)',
      overall: '乙巳年は戌年生まれにとって正義感と奉仕精神が光る年です。周りの人を助ける過程で自分も成長し、信頼が資産となります。',
      career: '公共分野・社会貢献・教育関連の仕事でやりがいを感じます。誠実で真面目な態度が長期的成功の土台になります。',
      love: '義理と献身が関係を深くします。心から相手を思う気持ちが伝わる年です。',
      health: '胃腸と泌尿器の健康に注意しましょう。規則正しい食事と適度な運動が大切です。',
      luckyMonth: '2月、6月、10月',
      cautionMonth: '4月、8月',
    },
    zh: {
      animal: '狗(戌)',
      overall: '2025年属狗者的正义感和奉献精神大放异彩。在帮助他人的过程中自我成长，信任成为最大的资产。',
      career: '在公共服务、社会贡献、教育领域感受到成就感。诚实勤恳的态度奠定长期成功的基础。',
      love: '忠义和奉献使关系更加深厚。真心为对方着想的心意得以传达的一年。',
      health: '注意肠胃和泌尿系统健康。规律饮食和适度运动很重要。',
      luckyMonth: '2月、6月、10月',
      cautionMonth: '4月、8月',
    },
  },
  '亥': {
    ko: {
      animal: '돼지띠(亥)',
      overall: '을사년은 돼지띠에게 해사충(亥巳沖)이 있는 해입니다. 변화와 도전이 찾아오지만, 유연하게 대처하면 전화위복의 기회가 됩니다.',
      career: '기존 경로를 재검토할 좋은 시기입니다. 전직이나 부서 이동이 오히려 더 나은 환경으로 이끌 수 있습니다.',
      love: '관계에서 솔직한 대화가 필요한 시기입니다. 숨겨온 감정을 표현하면 관계가 정리되고 발전합니다.',
      health: '신장과 혈액순환에 주의하세요. 반신욕과 가벼운 산책이 도움됩니다.',
      luckyMonth: '3월, 7월, 11월',
      cautionMonth: '5월, 9월',
    },
    en: {
      animal: 'Pig (亥)',
      overall: 'The year 2025 brings the Hai-Si clash for Pigs. Changes and challenges arrive, but flexible responses can turn misfortune into opportunity.',
      career: 'A good time to reevaluate your current path. Job changes or department transfers may actually lead to better environments.',
      love: 'A period requiring honest conversations in relationships. Expressing hidden feelings clarifies and advances relationships.',
      health: 'Watch kidney health and blood circulation. Half-body baths and light walks help.',
      luckyMonth: 'March, July, November',
      cautionMonth: 'May, September',
    },
    ja: {
      animal: 'いのしし年(亥)',
      overall: '乙巳年は亥年生まれにとって亥巳沖がある年です。変化と挑戦が訪れますが、柔軟に対処すれば転禍為福の機会になります。',
      career: '既存の進路を再検討するのに良い時期です。転職や部署異動がかえってより良い環境へ導く可能性があります。',
      love: '関係で率直な対話が必要な時期です。隠してきた感情を表現すれば関係が整理され発展します。',
      health: '腎臓と血液循環に注意しましょう。半身浴と軽い散歩が助けになります。',
      luckyMonth: '3月、7月、11月',
      cautionMonth: '5月、9月',
    },
    zh: {
      animal: '猪(亥)',
      overall: '2025年属猪者遭遇亥巳冲。变化和挑战到来，但灵活应对可以化危为机。',
      career: '重新审视现有路线的好时机。转职或部门调动反而可能带来更好的环境。',
      love: '关系中需要坦诚对话的时期。表达隐藏的情感会让关系理清并发展。',
      health: '注意肾脏和血液循环。半身浴和轻松散步有帮助。',
      luckyMonth: '3月、7月、11月',
      cautionMonth: '5月、9月',
    },
  },
}

// ---------------------------------------------------------------------------
// Combined ZODIAC_FORTUNE
// ---------------------------------------------------------------------------

export const ZODIAC_FORTUNE: Record<FortuneYear, Record<ZodiacKey, Record<Language, ZodiacFortuneEntry>>> = {
  2025: ZODIAC_2025,
  2026: ZODIAC_2026,
}

// ---------------------------------------------------------------------------
// UI Labels
// ---------------------------------------------------------------------------

export const FORTUNE_LABELS: Record<Language, {
  indexTitle: string
  indexSubtitle: string
  yearOverview: string
  byZodiac: string
  career: string
  love: string
  health: string
  luckyMonths: string
  cautionMonths: string
  ctaText: string
  ctaButton: string
  backToIndex: string
  overall: string
}> = {
  ko: {
    indexTitle: '연간 운세',
    indexSubtitle: '올해와 내년의 운세를 띠별로 확인해보세요',
    yearOverview: '올해의 기운',
    byZodiac: '띠별 운세',
    career: '직업운',
    love: '연애운',
    health: '건강운',
    luckyMonths: '행운의 달',
    cautionMonths: '주의할 달',
    ctaText: '나의 사주가 궁금하다면...',
    ctaButton: '무료 사주 분석 받기',
    backToIndex: '연간 운세 목록',
    overall: '종합운',
  },
  en: {
    indexTitle: 'Annual Fortune',
    indexSubtitle: 'Check your zodiac fortune for this year and next',
    yearOverview: 'Energy of the Year',
    byZodiac: 'Fortune by Zodiac',
    career: 'Career',
    love: 'Love',
    health: 'Health',
    luckyMonths: 'Lucky Months',
    cautionMonths: 'Months to Watch',
    ctaText: 'Curious about your Saju?',
    ctaButton: 'Get Free Saju Analysis',
    backToIndex: 'Annual Fortune List',
    overall: 'Overall',
  },
  ja: {
    indexTitle: '年間運勢',
    indexSubtitle: '今年と来年の干支別運勢をチェックしましょう',
    yearOverview: '今年のエネルギー',
    byZodiac: '干支別運勢',
    career: '仕事運',
    love: '恋愛運',
    health: '健康運',
    luckyMonths: 'ラッキーな月',
    cautionMonths: '注意すべき月',
    ctaText: 'あなたの四柱が気になったら...',
    ctaButton: '無料四柱分析を受ける',
    backToIndex: '年間運勢一覧',
    overall: '総合運',
  },
  zh: {
    indexTitle: '年度运势',
    indexSubtitle: '查看今年和明年的生肖运势',
    yearOverview: '年度能量',
    byZodiac: '生肖运势',
    career: '事业运',
    love: '爱情运',
    health: '健康运',
    luckyMonths: '幸运月份',
    cautionMonths: '需注意月份',
    ctaText: '想了解你的四柱吗？',
    ctaButton: '获取免费四柱分析',
    backToIndex: '年度运势列表',
    overall: '综合运',
  },
}
