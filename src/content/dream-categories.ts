export type DreamCategoryKey =
  | 'animal'
  | 'nature'
  | 'person'
  | 'object'
  | 'action'
  | 'place'
  | 'body'
  | 'number'

export interface DreamCategory {
  key: DreamCategoryKey
  icon: string
  keywords: {
    ko: string[]
    en: string[]
    ja: string[]
    zh: string[]
  }
}

export const DREAM_CATEGORIES: DreamCategory[] = [
  {
    key: 'animal',
    icon: '🐉',
    keywords: {
      ko: ['뱀', '용', '호랑이', '개', '고양이', '말', '돼지', '새', '물고기', '거미', '곤충'],
      en: ['snake', 'dragon', 'tiger', 'dog', 'cat', 'horse', 'pig', 'bird', 'fish', 'spider', 'insect'],
      ja: ['蛇', '龍', '虎', '犬', '猫', '馬', '豚', '鳥', '魚', '蜘蛛', '虫'],
      zh: ['蛇', '龙', '虎', '狗', '猫', '马', '猪', '鸟', '鱼', '蜘蛛', '虫'],
    },
  },
  {
    key: 'nature',
    icon: '🌊',
    keywords: {
      ko: ['물', '바다', '산', '하늘', '비', '눈', '태풍', '지진', '불', '꽃', '나무'],
      en: ['water', 'ocean', 'mountain', 'sky', 'rain', 'snow', 'storm', 'earthquake', 'fire', 'flower', 'tree'],
      ja: ['水', '海', '山', '空', '雨', '雪', '嵐', '地震', '火', '花', '木'],
      zh: ['水', '海', '山', '天空', '雨', '雪', '暴风', '地震', '火', '花', '树'],
    },
  },
  {
    key: 'person',
    icon: '👤',
    keywords: {
      ko: ['부모', '친구', '연인', '아이', '낯선 사람', '유명인', '죽은 사람', '가족'],
      en: ['parent', 'friend', 'lover', 'child', 'stranger', 'celebrity', 'deceased', 'family'],
      ja: ['親', '友人', '恋人', '子供', '知らない人', '有名人', '亡くなった人', '家族'],
      zh: ['父母', '朋友', '恋人', '孩子', '陌生人', '名人', '故人', '家人'],
    },
  },
  {
    key: 'object',
    icon: '💰',
    keywords: {
      ko: ['돈', '금', '보석', '차', '집', '열쇠', '거울', '칼', '음식'],
      en: ['money', 'gold', 'jewel', 'car', 'house', 'key', 'mirror', 'knife', 'food'],
      ja: ['お金', '金', '宝石', '車', '家', '鍵', '鏡', '刀', '食べ物'],
      zh: ['钱', '金子', '宝石', '车', '房子', '钥匙', '镜子', '刀', '食物'],
    },
  },
  {
    key: 'action',
    icon: '🏃',
    keywords: {
      ko: ['날다', '떨어지다', '도망치다', '싸우다', '죽다', '울다', '웃다', '수영하다'],
      en: ['flying', 'falling', 'running', 'fighting', 'dying', 'crying', 'laughing', 'swimming'],
      ja: ['飛ぶ', '落ちる', '逃げる', '戦う', '死ぬ', '泣く', '笑う', '泳ぐ'],
      zh: ['飞', '掉落', '逃跑', '打架', '死', '哭', '笑', '游泳'],
    },
  },
  {
    key: 'place',
    icon: '🏠',
    keywords: {
      ko: ['학교', '회사', '병원', '절', '교회', '묘지', '시장', '길'],
      en: ['school', 'office', 'hospital', 'temple', 'church', 'cemetery', 'market', 'road'],
      ja: ['学校', '会社', '病院', '寺', '教会', '墓地', '市場', '道'],
      zh: ['学校', '公司', '医院', '寺庙', '教堂', '墓地', '市场', '路'],
    },
  },
  {
    key: 'body',
    icon: '🦷',
    keywords: {
      ko: ['이빨', '머리카락', '피', '손', '발', '눈', '임신', '출산'],
      en: ['teeth', 'hair', 'blood', 'hand', 'foot', 'eye', 'pregnancy', 'birth'],
      ja: ['歯', '髪', '血', '手', '足', '目', '妊娠', '出産'],
      zh: ['牙齿', '头发', '血', '手', '脚', '眼睛', '怀孕', '生产'],
    },
  },
  {
    key: 'number',
    icon: '🔢',
    keywords: {
      ko: ['숫자', '로또', '시험', '합격', '당첨'],
      en: ['number', 'lottery', 'exam', 'pass', 'winning'],
      ja: ['数字', '宝くじ', '試験', '合格', '当選'],
      zh: ['数字', '彩票', '考试', '及格', '中奖'],
    },
  },
]

export function matchDreamCategories(
  input: string,
  lang: 'ko' | 'en' | 'ja' | 'zh'
): DreamCategoryKey[] {
  const lower = input.toLowerCase()
  return DREAM_CATEGORIES
    .filter(cat => cat.keywords[lang].some(kw => lower.includes(kw.toLowerCase())))
    .map(cat => cat.key)
}
