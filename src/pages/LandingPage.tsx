import { useLocation, useParams, Link } from 'react-router'
import { useI18n, type Language } from '../i18n'
import Breadcrumb from '../components/Breadcrumb'
import AdBanner from '../components/AdBanner'
import SeoHead from '../components/SeoHead'
import {
  expandGuidePageContent,
  splitGuideText,
  type GuidePageContent,
} from '../content/guide-longform'

// Content definitions for each language and topic
export const GUIDE_PAGE_CONTENT: Record<Language, Record<string, GuidePageContent>> = {
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
    'saju/ten-gods': {
      title: 'Ten Gods Guide: How Saju Reads Roles and Relationships',
      description: 'Ten Gods describe how your Day Master relates to the rest of the chart. Learn the core groups and how they shape personality, work, money, and relationships.',
      sections: [
        {
          heading: 'What the Ten Gods actually measure',
          content: 'The Ten Gods are not random labels. They describe how the other stems in your chart support, challenge, produce, control, or mirror your Day Master. In practice, they tell you which roles and pressures show up most strongly around you.'
        },
        {
          heading: 'Read the five major groups first',
          content: 'Beginners do better when they start from the five broader families: Companion, Output, Wealth, Officer, and Resource. Once you know which family is strong or weak, the detailed Ten God names become much easier to remember and use.'
        },
        {
          heading: 'Use Ten Gods with season and structure',
          content: 'A strong Wealth star does not mean the same thing in every chart. You still need to check whether the Day Master can handle it, whether the seasonal climate supports it, and whether another structure changes how that energy behaves.'
        },
      ],
      relatedLinks: [
        { label: 'Beginner article on Ten Gods', href: '/articles/ten-gods-for-beginners' },
        { label: 'Day Master guide', href: 'day-master' },
        { label: 'Try the Saju calculator', href: '../' },
      ],
    },
    'saju/day-master': {
      title: 'Day Master Guide: Find Your Core Element in Saju',
      description: 'The Day Master is the center of Saju reading. Learn how your core element changes the way you interpret personality, energy, and the rest of the chart.',
      sections: [
        {
          heading: 'Why the Day Master comes first',
          content: 'In Saju, the Day Master represents the self. Before you talk about money, relationships, or timing, you need to know what kind of element is standing at the center of the chart and how stable that element is in the seasonal climate.'
        },
        {
          heading: 'Element type changes reading style',
          content: 'Wood, Fire, Earth, Metal, and Water each respond differently to pressure, support, and expression. A person with a Wood Day Master does not read challenge and opportunity the same way as someone whose core element is Metal or Water.'
        },
        {
          heading: 'Do not read the Day Master in isolation',
          content: 'The Day Master is essential, but it is only the beginning. You still need to check the month branch, the strength of the chart, and the Ten Gods around it. That is what turns a generic elemental description into an actual reading.'
        },
      ],
      relatedLinks: [
        { label: 'Article on Day Master types', href: '/articles/day-master-types' },
        { label: 'Ten Gods guide', href: 'ten-gods' },
        { label: 'Try the Saju calculator', href: '../' },
      ],
    },
    'ziwei/12-palaces': {
      title: 'The 12 Palaces of Zi Wei Dou Shu',
      description: 'The 12 palaces divide a Zi Wei chart into life areas such as self, career, wealth, relationships, and parents. Learn how each palace changes the reading.',
      sections: [
        {
          heading: 'Why the 12 palaces matter',
          content: 'Zi Wei Dou Shu reads life through twelve palaces rather than through one single personality label. Each palace acts like a separate life department, so the same star can show a different meaning depending on where it sits.'
        },
        {
          heading: 'Start with Life, Career, Wealth, and Travel',
          content: 'Beginners often get overwhelmed by the full chart. A practical starting point is to anchor yourself in the Life Palace, then compare it with Career, Wealth, and Travel. This quickly reveals where your natural drive and real-world movement meet.'
        },
        {
          heading: 'Always compare palace and star together',
          content: 'A palace tells you the topic. A star tells you the style. Reading only one of them makes the chart too vague. The useful interpretation appears when you ask how a specific star behaves inside a specific palace under the Four Transformations.'
        },
      ],
      relatedLinks: [
        { label: 'Zi Wei chart reading article', href: '/articles/ziwei-chart-reading' },
        { label: 'Zi Wei basics', href: 'ziwei' },
        { label: 'Try the Zi Wei calculator', href: '../' },
      ],
    },
    'natal/planets': {
      title: 'Planets in Astrology: What Each Planet Governs',
      description: 'In Western astrology, planets describe functions of the psyche. Learn how the luminaries and planets shape desire, emotion, communication, love, discipline, and more.',
      sections: [
        {
          heading: 'Planets describe functions, not fixed traits',
          content: 'A planet is best understood as a function or drive. The Sun describes identity and vitality, the Moon reflects emotional processing, Mercury handles communication, and so on. Reading planets this way gives your chart much more nuance than simple sign stereotypes.'
        },
        {
          heading: 'Personal, social, and outer planets',
          content: 'The personal planets move quickly and show everyday style. Social planets such as Jupiter and Saturn shape growth and structure. The outer planets move slowly and describe generational themes that become personal when they strongly touch angles or personal planets.'
        },
        {
          heading: 'Read planet, sign, house, and aspect together',
          content: 'A planet never speaks alone. Venus in Aries in the 10th house tells a different story than Venus in Pisces in the 4th, and aspects can intensify, support, or complicate what you first see. Good chart reading always combines the full pattern.'
        },
      ],
      relatedLinks: [
        { label: 'Big Three article', href: '/articles/big-three-astrology' },
        { label: 'Planetary aspects article', href: '/articles/planetary-aspects' },
        { label: 'Try the natal chart calculator', href: '../' },
      ],
    },
    'natal/houses': {
      title: 'The 12 Houses in Astrology: Life Areas of the Natal Chart',
      description: 'The 12 houses show where life events and attention concentrate. Learn how houses organize experience, from identity and relationships to work, vocation, and inner life.',
      sections: [
        {
          heading: 'Houses answer the question of where',
          content: 'Signs describe style and planets describe function, but houses show where those themes are lived. This is why two people with the same Sun sign can feel completely different in daily life when the house emphasis changes.'
        },
        {
          heading: 'Angular, succedent, and cadent houses',
          content: 'The angular houses tend to feel loud and visible. Succedent houses stabilize or build resources over time. Cadent houses process, connect, or prepare. This rhythm helps you understand why some areas of a chart feel immediate while others feel more reflective.'
        },
        {
          heading: 'Read house rulers and occupancy together',
          content: 'A house becomes more detailed when you check both the planets inside it and the ruler of its sign. Even an empty house still has a ruler, so it still participates in the overall story of the chart.'
        },
      ],
      relatedLinks: [
        { label: 'Article on the 12 houses', href: '/articles/twelve-houses' },
        { label: 'Natal chart basics', href: 'natal' },
        { label: 'Try the natal chart calculator', href: '../' },
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
    'saju/ten-gods': {
      title: '十神ガイド: 四柱推命で役割と関係性を読む方法',
      description: '十神は日主と他の要素の関係を表す読みの軸です。性格、仕事、お金、人間関係につながる基本の見方を整理します。',
      sections: [
        {
          heading: '十神は何を見ているのか',
          content: '十神は単なるラベルではありません。日主を助けるのか、競合するのか、生み出すのか、抑えるのかという関係を通じて、周囲の役割や圧力のかかり方を読み解く基準です。'
        },
        {
          heading: 'まずは五つの大きなグループから',
          content: '最初から十種類を暗記するより、比劫・食傷・財星・官星・印星の五つの大分類で見るほうが理解しやすくなります。どのグループが強いかをつかむだけでも読みの軸が立ちます。'
        },
        {
          heading: '季節と構造を必ず一緒に見る',
          content: '財星が強いからといって、どの命式でも同じ意味にはなりません。日主の強弱、月令、他の十神との組み合わせまで見てはじめて実際の読みになります。'
        },
      ],
      relatedLinks: [
        { label: '十神の入門記事', href: '/articles/ten-gods-for-beginners' },
        { label: '日主ガイド', href: 'day-master' },
        { label: '四柱推命計算機を試す', href: '../' },
      ],
    },
    'saju/day-master': {
      title: '日主ガイド: 四柱推命で自分の核を読む',
      description: '日主は四柱推命の中心です。自分の根本元素をつかむことで、性格や流れの読み方が大きく変わります。',
      sections: [
        {
          heading: 'なぜ日主から読むのか',
          content: '日主は命式の中心であり、自分そのものを表します。仕事運や恋愛運を語る前に、まず中心の元素がどれだけ安定しているかを確認する必要があります。'
        },
        {
          heading: '五行によって反応が変わる',
          content: '木・火・土・金・水は、支援や圧力に対する反応がそれぞれ異なります。同じ財星でも、木の日主と金の日主では受け取り方が変わります。'
        },
        {
          heading: '日主だけで決めつけない',
          content: '日主は出発点ですが、それだけで結論は出せません。月支、命式全体の強弱、周囲の十神まで合わせて見てこそ、実際の読みとして使える内容になります。'
        },
      ],
      relatedLinks: [
        { label: '日主タイプの記事', href: '/articles/day-master-types' },
        { label: '十神ガイド', href: 'ten-gods' },
        { label: '四柱推命計算機を試す', href: '../' },
      ],
    },
    'ziwei/12-palaces': {
      title: '紫微斗数の十二宮ガイド',
      description: '十二宮は、自己、仕事、財、関係、両親など人生の領域を分ける基礎です。宮位ごとの役割を整理して読み方を学びます。',
      sections: [
        {
          heading: '十二宮があるから細かく読める',
          content: '紫微斗数は、ひとつの性格ラベルではなく、十二の宮位で人生を分けて読む体系です。同じ星でも入る宮によって意味が変わるため、宮位の理解が土台になります。'
        },
        {
          heading: '命宮・官禄宮・財帛宮から始める',
          content: '初心者は全部を一度に追わず、まず命宮、官禄宮、財帛宮、遷移宮のように現実に結びつきやすい宮位から読むと全体像をつかみやすくなります。'
        },
        {
          heading: '宮位と星をセットで読む',
          content: '宮位はテーマ、星はその出方を示します。さらに四化が加わることで、同じ配置でも動き方が変わります。宮だけ、星だけで読むと抽象的になりすぎます。'
        },
      ],
      relatedLinks: [
        { label: '命盤の読み方記事', href: '/articles/ziwei-chart-reading' },
        { label: '紫微斗数の基本', href: 'ziwei' },
        { label: '紫微斗数計算機を試す', href: '../' },
      ],
    },
    'natal/planets': {
      title: '占星術の惑星ガイド: 各惑星が司るもの',
      description: '惑星は性格ラベルではなく、心の機能や動き方を表します。太陽、月、水星、金星などの基本的な役割を整理します。',
      sections: [
        {
          heading: '惑星は機能として読む',
          content: '太陽は自己意識、月は感情処理、水星は思考と伝達、金星は価値観と関係性というように、惑星は心の働きを表します。星座だけで読むよりも、ずっと立体的に理解できます。'
        },
        {
          heading: '個人天体・社会天体・外天体',
          content: '個人天体は日常の反応を、社会天体は成長や責任を、外天体は世代的テーマや深い変容を示します。どの層が強く働くかでチャートの印象は大きく変わります。'
        },
        {
          heading: '星座・ハウス・アスペクトを合わせる',
          content: '惑星は単独では語れません。同じ金星でも、どの星座にあり、どのハウスに入り、どんなアスペクトを持つかで表れ方が変わります。'
        },
      ],
      relatedLinks: [
        { label: 'ビッグスリーの記事', href: '/articles/big-three-astrology' },
        { label: 'アスペクトの記事', href: '/articles/planetary-aspects' },
        { label: 'チャート計算機を試す', href: '../' },
      ],
    },
    'natal/houses': {
      title: '占星術の12ハウスガイド',
      description: '12ハウスは出来事や関心がどこに表れるかを示します。自己、関係、仕事、内面など、人生領域ごとの読み方を整理します。',
      sections: [
        {
          heading: 'ハウスは「どこで起こるか」を示す',
          content: '星座がスタイル、惑星が機能だとすれば、ハウスはそのテーマがどの人生領域で現れるかを示します。同じ太陽星座でも、ハウスが違えば日常の実感は大きく変わります。'
        },
        {
          heading: 'アングル・サクシーデント・ケイデント',
          content: '角ハウスは目立ちやすく、定ハウスは蓄積と安定、柔ハウスは調整と準備を表しやすい傾向があります。このリズムを知ると、どこが強く押し出されるかが見えやすくなります。'
        },
        {
          heading: '支配星と在室天体を一緒に読む',
          content: 'ハウスの中に惑星がなくても、そのハウスには支配星があります。入っている惑星と支配星の両方を追うことで、空のハウスも含めた全体像がつかめます。'
        },
      ],
      relatedLinks: [
        { label: '12ハウスの記事', href: '/articles/twelve-houses' },
        { label: '出生チャートの基本', href: 'natal' },
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
    'saju/ten-gods': {
      title: '십신 가이드: 사주에서 역할과 관계를 읽는 법',
      description: '십신은 일간과 다른 기운의 관계를 읽는 핵심 틀입니다. 성격, 일, 돈, 관계 해석으로 이어지는 기본 감각을 정리합니다.',
      sections: [
        {
          heading: '십신은 무엇을 보는 기준인가',
          content: '십신은 단순한 이름표가 아니라, 일간을 돕는지, 압박하는지, 내가 밖으로 표현하는지, 내가 붙잡으려 하는지를 읽는 관계 언어입니다. 즉 사람과 상황이 내 명식에 어떤 방식으로 들어오는지를 설명합니다.'
        },
        {
          heading: '비겁·식상·재성·관성·인성부터 먼저 읽기',
          content: '처음부터 열 가지를 세세하게 외우기보다 다섯 묶음으로 감각을 잡는 편이 훨씬 빠릅니다. 어떤 묶음이 강한지 보면 성향, 일하는 방식, 돈을 다루는 습관, 관계 패턴이 크게 드러납니다.'
        },
        {
          heading: '계절과 구조를 함께 봐야 실전이 된다',
          content: '재성이 많다고 무조건 돈복이라고 읽지 않는 이유가 여기에 있습니다. 일간의 힘, 월령의 기운, 다른 십신의 배치까지 같이 봐야 그 십신이 실제로 어떻게 작동하는지 판단할 수 있습니다.'
        },
      ],
      relatedLinks: [
        { label: '십신 입문 기사', href: '/articles/ten-gods-for-beginners' },
        { label: '일간 가이드', href: 'day-master' },
        { label: '사주 계산기 사용하기', href: '../' },
      ],
    },
    'saju/day-master': {
      title: '일간 가이드: 사주에서 나를 읽는 출발점',
      description: '일간은 사주 해석의 중심입니다. 나를 뜻하는 핵심 오행을 먼저 이해하면 성격, 강약, 해석의 방향이 훨씬 선명해집니다.',
      sections: [
        {
          heading: '왜 일간부터 봐야 하나',
          content: '사주에서 일간은 나 자신입니다. 재물이나 연애를 보기 전에, 먼저 중심이 되는 내가 어떤 기운인지, 계절 속에서 얼마나 힘이 있는지를 확인해야 나머지 관계도 읽을 수 있습니다.'
        },
        {
          heading: '오행에 따라 반응 방식이 달라진다',
          content: '같은 압박도 목 일간과 금 일간은 다르게 느끼고, 같은 도움도 화 일간과 수 일간은 다르게 활용합니다. 그래서 일간을 모르면 같은 십신을 봐도 지나치게 뭉뚱그린 해석이 되기 쉽습니다.'
        },
        {
          heading: '일간만으로 결론내리면 안 되는 이유',
          content: '일간은 시작점이지만 전부는 아닙니다. 월지, 통근 여부, 주변 천간지지의 흐름과 십신 구조까지 함께 봐야 실제 생활과 연결되는 읽기가 가능합니다.'
        },
      ],
      relatedLinks: [
        { label: '일간 유형 기사', href: '/articles/day-master-types' },
        { label: '십신 가이드', href: 'ten-gods' },
        { label: '사주 계산기 사용하기', href: '../' },
      ],
    },
    'ziwei/12-palaces': {
      title: '자미두수 십이궁 가이드',
      description: '십이궁은 자미두수에서 삶의 영역을 나누는 기본 틀입니다. 명궁, 관록궁, 재백궁, 부처궁 등 각 궁이 무엇을 보는지 정리합니다.',
      sections: [
        {
          heading: '십이궁이 있어야 자미두수가 입체적이 된다',
          content: '자미두수는 한 사람의 성향을 한 문장으로 끝내지 않고, 삶을 열두 개의 영역으로 나누어 읽습니다. 그래서 같은 주성이 들어와도 어느 궁에 놓였는지에 따라 의미가 달라집니다.'
        },
        {
          heading: '처음에는 명궁, 관록궁, 재백궁부터',
          content: '전체 명반이 복잡해 보여도, 우선 명궁으로 기본 성향을 잡고 관록궁, 재백궁, 천이궁을 함께 보면 현실에서 어떤 흐름으로 드러나는지 빠르게 감을 잡을 수 있습니다.'
        },
        {
          heading: '궁위와 별을 같이 읽어야 한다',
          content: '궁위는 주제를 말하고, 별은 그 주제가 어떤 방식으로 전개되는지를 말합니다. 여기에 사화까지 더해져야 실제 운용 방식이 보이므로, 궁만 읽거나 별만 읽으면 해석이 얕아지기 쉽습니다.'
        },
      ],
      relatedLinks: [
        { label: '자미 명반 읽기 기사', href: '/articles/ziwei-chart-reading' },
        { label: '자미두수 입문', href: 'ziwei' },
        { label: '자미두수 계산기 사용하기', href: '../' },
      ],
    },
    'natal/planets': {
      title: '점성술 행성 가이드: 각 행성이 뜻하는 것',
      description: '서양 점성술에서 행성은 심리 기능과 움직임을 상징합니다. 태양, 달, 수성, 금성, 화성부터 토성 바깥 행성까지 읽는 기준을 정리합니다.',
      sections: [
        {
          heading: '행성은 성격표가 아니라 기능이다',
          content: '태양은 정체성과 생기, 달은 감정 처리, 수성은 사고와 언어, 금성은 관계와 가치, 화성은 추진력처럼 각 행성은 마음이 움직이는 방식을 나타냅니다. 그래서 단순 별자리 해석보다 훨씬 입체적인 읽기가 가능합니다.'
        },
        {
          heading: '개인 행성, 사회 행성, 외행성',
          content: '개인 행성은 일상적인 반응과 취향을, 목성과 토성은 성장과 구조를, 바깥 행성은 세대적 주제와 깊은 변화의 방향을 보여줍니다. 무엇이 두드러지는지에 따라 차트의 분위기가 크게 달라집니다.'
        },
        {
          heading: '행성은 별자리·하우스·애스펙트와 함께 읽는다',
          content: '같은 금성이라도 어느 별자리에 있고 어느 하우스에 놓이며 어떤 애스펙트를 맺는지에 따라 표현 방식이 달라집니다. 행성 하나만 떼어 읽기보다 전체 패턴을 같이 보는 습관이 중요합니다.'
        },
      ],
      relatedLinks: [
        { label: '빅 쓰리 기사', href: '/articles/big-three-astrology' },
        { label: '애스펙트 기사', href: '/articles/planetary-aspects' },
        { label: '차트 계산기 사용하기', href: '../' },
      ],
    },
    'natal/houses': {
      title: '점성술 12하우스 가이드',
      description: '하우스는 삶의 어떤 영역에서 일이 벌어지는지를 보여줍니다. 자아, 관계, 일, 가정, 내면 등 12개 영역의 읽는 법을 정리합니다.',
      sections: [
        {
          heading: '하우스는 어디에서 드러나는가를 말한다',
          content: '별자리가 스타일, 행성이 기능이라면 하우스는 그 에너지가 삶의 어느 장면에서 나타나는지를 보여줍니다. 같은 태양 별자리라도 하우스가 다르면 실제 체감은 크게 달라질 수 있습니다.'
        },
        {
          heading: '각·정·변 하우스의 리듬',
          content: '각 하우스는 눈에 띄게 드러나고, 정 하우스는 쌓고 유지하며, 변 하우스는 연결하고 정리하는 역할을 맡는 경향이 있습니다. 이 리듬을 알면 어느 영역이 유난히 크게 느껴지는지 읽기 쉬워집니다.'
        },
        {
          heading: '빈 하우스도 읽어야 한다',
          content: '하우스 안에 행성이 없다고 해서 그 영역이 중요하지 않은 것은 아닙니다. 그 하우스의 주인을 함께 보면, 비어 있는 영역도 차트 전체 흐름 속에서 어떻게 작동하는지 파악할 수 있습니다.'
        },
      ],
      relatedLinks: [
        { label: '12하우스 기사', href: '/articles/twelve-houses' },
        { label: '출생차트 입문', href: 'natal' },
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
    'saju/ten-gods': {
      title: '十神指南：八字中如何读关系与角色',
      description: '十神是日主与其他力量之间关系的阅读框架。理解十神后，性格、工作、财务和关系都会更容易进入实战解读。',
      sections: [
        {
          heading: '十神到底在看什么',
          content: '十神不是单纯的名词，而是说明其他五行如何作用于日主：帮助、竞争、输出、克制或滋养。它让你知道外界的力量是怎样进入命局的。'
        },
        {
          heading: '先从五大类抓感觉',
          content: '对初学者来说，先理解比劫、食伤、财星、官星、印星五大组，比一开始死记十个名字更有效。先看哪一组强，再去细分，会更快进入阅读。'
        },
        {
          heading: '一定要结合季节和结构',
          content: '财星多并不自动等于财运好。还要看日主能不能承受、月令是否支持、其他结构会不会改变这股力量的表现方式。'
        },
      ],
      relatedLinks: [
        { label: '十神入门文章', href: '/articles/ten-gods-for-beginners' },
        { label: '日主指南', href: 'day-master' },
        { label: '使用八字计算器', href: '../' },
      ],
    },
    'saju/day-master': {
      title: '日主指南：八字里先看自己',
      description: '日主是八字阅读的中心。先理解自己的核心五行，后面关于强弱、性格和运势的判断才会真正站稳。',
      sections: [
        {
          heading: '为什么先看日主',
          content: '日主代表自己。在看财运、关系或时机之前，首先要知道中心的自己是什么五行、在季节中是否得力。'
        },
        {
          heading: '五行不同，反应方式也不同',
          content: '同样面对压力，木日主和金日主的反应不同；同样面对支持，火日主和水日主的用法也不同。不了解日主，就容易把很多判断说得太泛。'
        },
        {
          heading: '日主不是全部，但一定是起点',
          content: '日主只是起点，不能单独下结论。月支、通根情况、周围天干地支与十神结构一起看，才会形成真正能落地的解读。'
        },
      ],
      relatedLinks: [
        { label: '日主类型文章', href: '/articles/day-master-types' },
        { label: '十神指南', href: 'ten-gods' },
        { label: '使用八字计算器', href: '../' },
      ],
    },
    'ziwei/12-palaces': {
      title: '紫微斗数十二宫指南',
      description: '十二宫把人生划分为自我、事业、财富、关系、父母等不同领域，是阅读紫微命盘的基本结构。',
      sections: [
        {
          heading: '为什么十二宫这么重要',
          content: '紫微斗数不是只给一个性格结论，而是把人生拆成十二个宫位来读。同一颗星落在不同宫位，重点就会完全改变。'
        },
        {
          heading: '先从命宫、官禄宫、财帛宫开始',
          content: '初学者不需要一开始就把全盘全部吃透。先抓命宫，再对比官禄宫、财帛宫、迁移宫，通常就能很快看到现实层面的重心。'
        },
        {
          heading: '宫位和星曜必须一起看',
          content: '宫位决定主题，星曜决定表现方式，再加上四化才会出现真正的动态意义。只看宫位或只看星曜，都容易显得空泛。'
        },
      ],
      relatedLinks: [
        { label: '命盘阅读文章', href: '/articles/ziwei-chart-reading' },
        { label: '紫微斗数基础', href: 'ziwei' },
        { label: '使用紫微计算器', href: '../' },
      ],
    },
    'natal/planets': {
      title: '占星行星指南：每颗行星代表什么',
      description: '在西方占星里，行星代表心理功能与驱动力。理解太阳、月亮、水星、金星、火星等行星，是读本命盘的基础。',
      sections: [
        {
          heading: '行星代表功能，而不是标签',
          content: '太阳对应身份感和生命力，月亮对应情绪反应，水星对应思维与表达，金星对应关系与价值感。把行星当作功能来读，本命盘会立刻更立体。'
        },
        {
          heading: '个人行星、社会行星、外行星',
          content: '个人行星说明日常反应与偏好，木星和土星更像成长与结构的轴线，外行星则带来世代主题与深层变化。不同层级的强调会决定整张盘的气质。'
        },
        {
          heading: '要把星座、宫位、相位一起看',
          content: '同样是金星，落在不同星座、不同宫位，再加上不同相位，呈现出来的关系风格就完全不同。真正的阅读来自组合，而不是孤立定义。'
        },
      ],
      relatedLinks: [
        { label: '三巨头文章', href: '/articles/big-three-astrology' },
        { label: '相位文章', href: '/articles/planetary-aspects' },
        { label: '使用星盘计算器', href: '../' },
      ],
    },
    'natal/houses': {
      title: '占星十二宫指南',
      description: '宫位说明事情发生在生活的哪个领域。自我、关系、家庭、事业、内在世界，都要通过宫位来落地。',
      sections: [
        {
          heading: '宫位回答的是“在哪里发生”',
          content: '星座说明风格，行星说明功能，而宫位说明这些力量在生活的哪个场景里出现。因此，同样的太阳星座，因为宫位不同，现实体验也会很不一样。'
        },
        {
          heading: '角宫、续宫、果宫的节奏',
          content: '角宫通常更直接、更容易被看见；续宫偏向积累和维持；果宫偏向整理、连接与过渡。理解这种节奏后，更容易读出哪一块生活最有存在感。'
        },
        {
          heading: '空宫也不能跳过',
          content: '宫内没有行星，并不代表这一领域不重要。还要看该宫的宫主星落在哪里，这样才能把空宫也纳入整体故事。'
        },
      ],
      relatedLinks: [
        { label: '十二宫文章', href: '/articles/twelve-houses' },
        { label: '本命盘基础', href: 'natal' },
        { label: '使用星盘计算器', href: '../' },
      ],
    },
  },
}

export default function LandingPage() {
  const location = useLocation()
  const { lang, topic, subtopic } = useParams<{ lang: string; topic: string; subtopic?: string }>()
  const { t } = useI18n()
  const language = (lang || 'ko') as Language
  const topicKey = topic ? (subtopic ? `${topic}/${subtopic}` : topic) : 'saju'

  const rawContent = GUIDE_PAGE_CONTENT[language]?.[topicKey]
  const content = rawContent ? expandGuidePageContent(language, topicKey, rawContent) : null

  if (!content) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <Link to={`/${language}/`} className="btn btn-primary">
            {t.common.close}
          </Link>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: t.guide.title, href: `/${language}/guide/` },
    { label: content.title.split(':')[0].trim() },
  ]

  const pathSuffix = location.pathname.replace(/^\/(ko|en|ja|zh)/, '') || '/guide'
  const pathByLanguage = {
    ko: `/ko${pathSuffix}`,
    en: `/en${pathSuffix}`,
    ja: `/ja${pathSuffix}`,
    zh: `/zh${pathSuffix}`,
  }

  function resolveGuideLinkPath(href: string) {
    if (href.startsWith('../')) {
      return `/${language}/`
    }

    if (href.startsWith('/')) {
      return `/${language}${href}`
    }

    if (href === 'saju' || href === 'ziwei' || href === 'natal') {
      return `/${language}/guide/${href}`
    }

    const topicRoot = topicKey.includes('/') ? topicKey.split('/')[0] : topicKey
    return `/${language}/guide/${topicRoot}/${href}`
  }

  return (
    <div className="min-h-screen bg-base-200">
      <SeoHead
        language={language}
        title={`${content.title} | ${language === 'ko' ? '명운판' : 'Myungunpan'}`}
        description={content.description}
        pathByLanguage={pathByLanguage}
      />
      <header className="navbar bg-base-100 border-b border-base-300 sticky top-0 z-40">
        <div className="navbar-start">
          <Link to={`/${language}/`} className="btn btn-ghost text-xl font-hanja">
            {t.hero.title}
          </Link>
        </div>
        <div className="navbar-end">
          <Link to={`/${language}/`} className="btn btn-primary btn-sm">
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

            <AdBanner slot="landing_article_top" format="horizontal" />

            {content.sections.map((section, index) => (
              <section key={index} className="mt-6">
                <h2 className="text-xl font-semibold text-base-content mb-3">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {splitGuideText(section.content).map((paragraph, paragraphIndex) => (
                    <p
                      key={`${section.heading}-${paragraphIndex}`}
                      className="text-base-content/80 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
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
                        to={resolveGuideLinkPath(link.href)}
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
          <AdBanner slot="landing_article_bottom" format="horizontal" />
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
