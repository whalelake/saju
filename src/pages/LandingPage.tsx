import { useParams, Link } from 'react-router'
import { useI18n, type Language } from '../i18n'
import Breadcrumb from '../components/Breadcrumb'
import AdBanner from '../components/AdBanner'

interface PageContent {
  title: string
  description: string
  sections: {
    heading: string
    content: string
  }[]
  relatedLinks?: {
    label: string
    href: string
  }[]
}

// Content definitions for each language and topic
const pageContent: Record<Language, Record<string, PageContent>> = {
  en: {
    saju: {
      title: 'What is Saju? A Complete Guide to Four Pillars of Destiny',
      description: 'Learn about Saju (四柱), the ancient Chinese system of destiny reading based on your birth date and time. Discover how the Four Pillars reveal your personality, career path, and life cycles.',
      sections: [
        {
          heading: 'Understanding the Four Pillars',
          content: 'Saju, also known as Four Pillars of Destiny or BaZi (八字), is an ancient Chinese metaphysical system that analyzes a person\'s destiny based on their birth year, month, day, and hour. Each "pillar" consists of a Heavenly Stem and Earthly Branch, creating eight characters that form the foundation of your destiny chart.'
        },
        {
          heading: 'The Day Master (日主)',
          content: 'The Day Master is the most important element in your Saju chart—it represents you. The Day Master\'s element (Wood, Fire, Earth, Metal, or Water) determines your fundamental nature and how you interact with the other elements in your chart.'
        },
        {
          heading: 'Ten Gods (十神)',
          content: 'The Ten Gods system describes the relationships between your Day Master and other elements in your chart. These relationships reveal insights about your personality, relationships, career potential, and life challenges. Key Ten Gods include: Resource (印), Companion (比), Output (食傷), Wealth (財), and Officer (官).'
        },
        {
          heading: 'Major Cycles (大運)',
          content: 'Your life unfolds in 10-year cycles called Major Cycles (Daeun/Dayun). Each cycle brings different elemental influences that can enhance or challenge your natal chart. Understanding your current Major Cycle helps you make better life decisions.'
        },
      ],
      relatedLinks: [
        { label: 'Ten Gods Explained', href: 'ten-gods' },
        { label: 'Day Master Types', href: 'day-master' },
        { label: 'Try the Saju Calculator', href: '../' },
      ],
    },
    ziwei: {
      title: 'What is Zi Wei Dou Shu? Purple Star Astrology Guide',
      description: 'Discover Zi Wei Dou Shu (紫微斗數), the most detailed Chinese fortune-telling system. Learn how the 12 Palaces and 108 stars reveal your life path.',
      sections: [
        {
          heading: 'Introduction to Zi Wei Dou Shu',
          content: 'Zi Wei Dou Shu, meaning "Purple Star Calculation," is one of the most sophisticated fortune-telling systems in Chinese metaphysics. Unlike Saju which uses eight characters, Zi Wei Dou Shu places over 100 stars across 12 life palaces to create a detailed map of your destiny.'
        },
        {
          heading: 'The 12 Palaces',
          content: 'Your Zi Wei chart consists of 12 palaces, each governing a different life area: Life (命宮), Siblings (兄弟), Spouse (夫妻), Children (子女), Wealth (財帛), Health (疾厄), Travel (遷移), Friends (交友), Career (官祿), Property (田宅), Fortune (福德), and Parents (父母).'
        },
        {
          heading: 'Main Stars',
          content: 'The 14 Main Stars form the core of your Zi Wei chart. The Zi Wei Star (Purple Star) is the emperor star, with other major stars like Tian Ji (Heavenly Secret), Tai Yang (Sun), Wu Qu (Military Music), and Tian Fu (Heavenly Treasury) creating your personality and destiny patterns.'
        },
        {
          heading: 'Four Transformations (四化)',
          content: 'The Four Transformations—Hua Lu (化祿), Hua Quan (化權), Hua Ke (化科), and Hua Ji (化忌)—show how stars transform based on your birth year. These transformations reveal where fortune, authority, fame, and challenges manifest in your life.'
        },
      ],
      relatedLinks: [
        { label: 'The 12 Palaces Explained', href: '12-palaces' },
        { label: 'Try the Zi Wei Calculator', href: '../' },
      ],
    },
    natal: {
      title: 'Birth Chart Guide: Understanding Your Natal Chart',
      description: 'Learn to read your Western Astrology natal chart. Understand planets, houses, signs, and aspects to discover your cosmic blueprint.',
      sections: [
        {
          heading: 'What is a Natal Chart?',
          content: 'Your natal chart, also called a birth chart, is a snapshot of the sky at the exact moment of your birth. It shows the positions of the Sun, Moon, and planets across the 12 zodiac signs and 12 houses, creating a unique cosmic blueprint that influences your personality, relationships, and life path.'
        },
        {
          heading: 'The Big Three',
          content: 'Your Sun sign represents your core identity, your Moon sign reflects your emotional nature, and your Rising sign (Ascendant) shows how others perceive you. Together, these three form the foundation of your astrological personality.'
        },
        {
          heading: 'The 12 Houses',
          content: 'The 12 houses divide your chart into life areas: Self (1st), Resources (2nd), Communication (3rd), Home (4th), Creativity (5th), Health (6th), Relationships (7th), Transformation (8th), Philosophy (9th), Career (10th), Community (11th), and Spirituality (12th).'
        },
        {
          heading: 'Aspects',
          content: 'Aspects are angular relationships between planets. Major aspects include Conjunction (0°), Sextile (60°), Square (90°), Trine (120°), and Opposition (180°). These aspects show how different parts of your personality interact—sometimes harmoniously, sometimes with tension.'
        },
      ],
      relatedLinks: [
        { label: 'Planets in Astrology', href: 'planets' },
        { label: 'The 12 Houses Explained', href: 'houses' },
        { label: 'Try the Natal Chart Calculator', href: '../' },
      ],
    },
  },
  ja: {
    saju: {
      title: '四柱推命とは？完全ガイド',
      description: '四柱推命（しちゅうすいめい）は、生年月日時から運命を読み解く古代中国の占術です。性格、適職、人生の流れを知りましょう。',
      sections: [
        {
          heading: '四柱推命の基本',
          content: '四柱推命は、年柱・月柱・日柱・時柱の4つの柱と、それぞれに対応する天干・地支から成る8つの文字（八字）で運命を読み解く東洋占術です。'
        },
        {
          heading: '日主（にっしゅ）',
          content: '日主は四柱推命において最も重要な要素で、あなた自身を表します。日主の五行（木・火・土・金・水）があなたの基本的な性格を決定します。'
        },
        {
          heading: '十神（じっしん）',
          content: '十神は、日主と他の要素との関係を表すシステムです。比肩・劫財・食神・傷官・偏財・正財・偏官・正官・偏印・印綬の10種類があり、性格や運勢を読み解きます。'
        },
        {
          heading: '大運（だいうん）',
          content: '大運は10年ごとに変わる運勢の大きな流れです。現在の大運を理解することで、人生の重要な決断に役立てることができます。'
        },
      ],
      relatedLinks: [
        { label: '十神の解説', href: 'ten-gods' },
        { label: '四柱推命計算機を試す', href: '../' },
      ],
    },
    ziwei: {
      title: '紫微斗数とは？入門ガイド',
      description: '紫微斗数（しびとすう）は中国最高峰の占術です。12宮と108の星々であなたの人生を詳細に読み解きます。',
      sections: [
        {
          heading: '紫微斗数の概要',
          content: '紫微斗数は、12の宮に100以上の星を配置して運命を読み解く、中国占術の最高峰です。四柱推命よりも詳細な分析が可能です。'
        },
        {
          heading: '十二宮',
          content: '命宮・兄弟宮・夫妻宮・子女宮・財帛宮・疾厄宮・遷移宮・交友宮・官禄宮・田宅宮・福徳宮・父母宮の12宮で人生の各分野を表します。'
        },
        {
          heading: '主星',
          content: '紫微星を筆頭に、天機・太陽・武曲・天府など14の主星が命盤の核心を形成します。'
        },
        {
          heading: '四化',
          content: '化禄・化権・化科・化忌の四化は、生年によって星の性質が変化することを示し、幸運・権威・名誉・困難の位置を表します。'
        },
      ],
      relatedLinks: [
        { label: '十二宮の解説', href: '12-palaces' },
        { label: '紫微斗数計算機を試す', href: '../' },
      ],
    },
    natal: {
      title: '西洋占星術 出生チャートガイド',
      description: 'ネイタルチャート（出生図）の読み方を学びましょう。惑星、ハウス、アスペクトであなたの宇宙的設計図を解読します。',
      sections: [
        {
          heading: 'ネイタルチャートとは',
          content: 'ネイタルチャート（出生図）は、あなたが生まれた瞬間の空の配置を表します。太陽・月・惑星の位置が、あなたの性格と運命を形作ります。'
        },
        {
          heading: 'ビッグスリー',
          content: '太陽星座はあなたの核心的アイデンティティ、月星座は感情的性質、上昇星座（アセンダント）は他者からの印象を表します。'
        },
        {
          heading: '12ハウス',
          content: '12のハウスは人生の各領域を表します：自己、資源、コミュニケーション、家庭、創造性、健康、人間関係、変容、哲学、キャリア、コミュニティ、精神性。'
        },
        {
          heading: 'アスペクト',
          content: 'アスペクトは惑星間の角度関係です。コンジャンクション、セクスタイル、スクエア、トライン、オポジションなどがあり、性格の調和や緊張を示します。'
        },
      ],
      relatedLinks: [
        { label: '惑星の意味', href: 'planets' },
        { label: '12ハウスの解説', href: 'houses' },
        { label: 'チャート計算機を試す', href: '../' },
      ],
    },
  },
  ko: {
    saju: {
      title: '사주팔자란? 완벽 가이드',
      description: '사주팔자(四柱八字)는 태어난 연월일시로 운명을 해석하는 동양 명리학입니다. 성격, 적성, 운세를 알아보세요.',
      sections: [
        {
          heading: '사주팔자의 기본',
          content: '사주팔자는 년주, 월주, 일주, 시주 네 개의 기둥과 각각의 천간·지지로 이루어진 여덟 글자(八字)로 운명을 해석하는 동양 명리학입니다.'
        },
        {
          heading: '일간(日干)',
          content: '일간은 사주에서 가장 중요한 요소로 나 자신을 나타냅니다. 일간의 오행(목·화·토·금·수)이 당신의 근본적인 성격을 결정합니다.'
        },
        {
          heading: '십신(十神)',
          content: '십신은 일간과 다른 요소들의 관계를 나타내는 체계입니다. 비겁, 식상, 재성, 관성, 인성의 10가지로 성격, 관계, 적성을 파악합니다.'
        },
        {
          heading: '대운(大運)',
          content: '대운은 10년마다 바뀌는 운세의 큰 흐름입니다. 현재 대운을 이해하면 인생의 중요한 결정에 도움이 됩니다.'
        },
      ],
      relatedLinks: [
        { label: '십신 상세 설명', href: 'ten-gods' },
        { label: '사주 계산기 사용하기', href: '../' },
      ],
    },
    ziwei: {
      title: '자미두수란? 입문 가이드',
      description: '자미두수(紫微斗數)는 12궁에 108개의 별을 배치해 운명을 상세히 분석하는 중국 최고의 명리술입니다.',
      sections: [
        {
          heading: '자미두수 개요',
          content: '자미두수는 12개의 궁에 100개 이상의 별을 배치하여 운명을 해석하는 중국 명리학의 최고봉입니다. 사주팔자보다 더 상세한 분석이 가능합니다.'
        },
        {
          heading: '십이궁',
          content: '명궁, 형제궁, 부처궁, 자녀궁, 재백궁, 질액궁, 천이궁, 교우궁, 관록궁, 전택궁, 복덕궁, 부모궁의 12궁이 인생 각 영역을 담당합니다.'
        },
        {
          heading: '주성',
          content: '자미성을 필두로 천기, 태양, 무곡, 천부 등 14개의 주성이 명반의 핵심을 형성합니다.'
        },
        {
          heading: '사화',
          content: '화록, 화권, 화과, 화기의 사화는 생년에 따라 별의 성질이 변화하며, 행운·권위·명예·시련의 위치를 나타냅니다.'
        },
      ],
      relatedLinks: [
        { label: '십이궁 상세 설명', href: '12-palaces' },
        { label: '자미두수 계산기 사용하기', href: '../' },
      ],
    },
    natal: {
      title: '서양 점성술 출생차트 가이드',
      description: '네이탈 차트(출생차트) 읽는 법을 배워보세요. 행성, 하우스, 애스펙트로 당신의 우주적 청사진을 해석합니다.',
      sections: [
        {
          heading: '출생차트란?',
          content: '출생차트(네이탈 차트)는 당신이 태어난 순간의 하늘 배치를 나타냅니다. 태양, 달, 행성의 위치가 당신의 성격과 운명을 형성합니다.'
        },
        {
          heading: '빅 쓰리',
          content: '태양 별자리는 핵심 정체성, 달 별자리는 감정적 성향, 상승 별자리(어센던트)는 타인에게 보이는 첫인상을 나타냅니다.'
        },
        {
          heading: '12 하우스',
          content: '12개의 하우스는 인생의 각 영역을 담당합니다: 자아, 재물, 소통, 가정, 창조성, 건강, 관계, 변화, 철학, 커리어, 공동체, 영성.'
        },
        {
          heading: '애스펙트',
          content: '애스펙트는 행성 간의 각도 관계입니다. 컨정션, 섹스타일, 스퀘어, 트라인, 오포지션 등이 있으며 성격의 조화와 긴장을 보여줍니다.'
        },
      ],
      relatedLinks: [
        { label: '행성의 의미', href: 'planets' },
        { label: '12 하우스 설명', href: 'houses' },
        { label: '차트 계산기 사용하기', href: '../' },
      ],
    },
  },
  zh: {
    saju: {
      title: '什么是四柱八字？完整指南',
      description: '四柱八字是根据出生年月日时解读命运的东方命理学。了解您的性格、适职和运势。',
      sections: [
        {
          heading: '四柱八字基础',
          content: '四柱八字由年柱、月柱、日柱、时柱四柱及其天干地支组成的八个字解读命运。'
        },
        {
          heading: '日主',
          content: '日主是八字中最重要的元素，代表自己。日主的五行（木、火、土、金、水）决定您的基本性格。'
        },
        {
          heading: '十神',
          content: '十神表示日主与其他元素的关系：比劫、食伤、财星、官星、印星等，用于解读性格和运势。'
        },
        {
          heading: '大运',
          content: '大运是每十年一变的运势大流。了解当前大运有助于做出人生重要决定。'
        },
      ],
      relatedLinks: [
        { label: '十神详解', href: 'ten-gods' },
        { label: '使用八字计算器', href: '../' },
      ],
    },
    ziwei: {
      title: '什么是紫微斗数？入门指南',
      description: '紫微斗数是中国最精密的命理术，通过十二宫和108颗星详细分析命运。',
      sections: [
        {
          heading: '紫微斗数概述',
          content: '紫微斗数在十二宫中配置一百多颗星来解读命运，是中国命理学的最高峰。比四柱八字分析更加详细。'
        },
        {
          heading: '十二宫',
          content: '命宫、兄弟宫、夫妻宫、子女宫、财帛宫、疾厄宫、迁移宫、交友宫、官禄宫、田宅宫、福德宫、父母宫十二宫代表人生各领域。'
        },
        {
          heading: '主星',
          content: '以紫微星为首，天机、太阳、武曲、天府等十四颗主星构成命盘核心。'
        },
        {
          heading: '四化',
          content: '化禄、化权、化科、化忌的四化表示星曜随生年变化的性质，显示福运、权威、名誉、困难的位置。'
        },
      ],
      relatedLinks: [
        { label: '十二宫详解', href: '12-palaces' },
        { label: '使用紫微计算器', href: '../' },
      ],
    },
    natal: {
      title: '西方占星术出生图指南',
      description: '学习阅读您的本命盘。通过行星、宫位、相位解读您的宇宙蓝图。',
      sections: [
        {
          heading: '什么是本命盘？',
          content: '本命盘是您出生时刻的天空配置图。太阳、月亮和行星的位置塑造您的性格和命运。'
        },
        {
          heading: '三巨头',
          content: '太阳星座代表核心身份，月亮星座反映情感本质，上升星座（Ascendant）显示他人对您的第一印象。'
        },
        {
          heading: '十二宫位',
          content: '十二个宫位代表人生各领域：自我、资源、沟通、家庭、创造力、健康、关系、变革、哲学、事业、社群、灵性。'
        },
        {
          heading: '相位',
          content: '相位是行星间的角度关系。包括合相、六分相、四分相、三分相、对分相等，显示性格中的和谐与紧张。'
        },
      ],
      relatedLinks: [
        { label: '行星含义', href: 'planets' },
        { label: '十二宫位详解', href: 'houses' },
        { label: '使用星盘计算器', href: '../' },
      ],
    },
  },
}

export default function LandingPage() {
  const { lang, topic } = useParams<{ lang: string; topic: string }>()
  const { t } = useI18n()
  const language = (lang || 'ko') as Language
  const topicKey = topic || 'saju'

  const content = pageContent[language]?.[topicKey]

  if (!content) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <Link to={`/${lang}/`} className="btn btn-primary">
            {t.common.close}
          </Link>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: t.guide.title, href: `/${lang}/guide/` },
    { label: content.title.split(':')[0].trim() },
  ]

  const topicLabels: Record<string, Record<Language, string>> = {
    saju: { ko: '사주팔자', en: 'Saju', ja: '四柱推命', zh: '四柱八字' },
    ziwei: { ko: '자미두수', en: 'Zi Wei', ja: '紫微斗数', zh: '紫微斗数' },
    natal: { ko: '출생차트', en: 'Natal Chart', ja: '出生図', zh: '出生图' },
  }

  return (
    <div className="min-h-screen bg-base-200">
      <header className="navbar bg-base-100 border-b border-base-300 sticky top-0 z-40">
        <div className="navbar-start">
          <Link to={`/${lang}/`} className="btn btn-ghost text-xl font-hanja">
            {t.hero.title}
          </Link>
        </div>
        <div className="navbar-end">
          <Link to={`/${lang}/`} className="btn btn-primary btn-sm">
            {t.hero.cta}
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <article className="card bg-base-100 border-oriental">
          <div className="card-body">
            <h1 className="text-2xl font-bold text-base-content mb-2">
              {content.title}
            </h1>
            <p className="text-base-content/70 mb-6">
              {content.description}
            </p>

            <AdBanner slot="SLOT_ARTICLE_TOP" format="horizontal" />

            {content.sections.map((section, index) => (
              <section key={index} className="mt-6">
                <h2 className="text-xl font-semibold text-base-content mb-3">
                  {section.heading}
                </h2>
                <p className="text-base-content/80 leading-relaxed">
                  {section.content}
                </p>
              </section>
            ))}

            {content.relatedLinks && content.relatedLinks.length > 0 && (
              <section className="mt-8 pt-6 border-t border-base-300">
                <h3 className="text-lg font-semibold text-base-content mb-3">
                  {language === 'ko' ? '관련 글' :
                   language === 'ja' ? '関連記事' :
                   language === 'zh' ? '相关文章' : 'Related Articles'}
                </h3>
                <ul className="space-y-2">
                  {content.relatedLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.href.startsWith('../') ? `/${lang}/` : `/${lang}/guide/${link.href}`}
                        className="text-primary hover:underline"
                      >
                        → {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </article>

        <div className="mt-6">
          <AdBanner slot="SLOT_ARTICLE_BOTTOM" format="horizontal" />
        </div>

        <div className="mt-8 text-center">
          <Link to={`/${lang}/`} className="btn btn-primary btn-lg">
            {t.hero.cta}
          </Link>
        </div>
      </main>

      <footer className="border-t border-base-300 bg-base-100 mt-8">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center text-sm text-base-content/60">
          &copy; 2025 {t.footer.copyright}
        </div>
      </footer>
    </div>
  )
}
