import { useI18n } from '../i18n'

function InfoCard({
  title,
  subtitle,
  children,
  colorClass = 'border-primary'
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  colorClass?: string
}) {
  return (
    <div className={`card bg-base-100 border-2 ${colorClass} shadow-sm`}>
      <div className="card-body">
        <h3 className="card-title text-xl font-hanja">{title}</h3>
        {subtitle && <p className="text-sm text-base-content/60 -mt-2">{subtitle}</p>}
        <div className="prose prose-sm max-w-none text-base-content/80">
          {children}
        </div>
      </div>
    </div>
  )
}

function ConceptList({ items }: { items: { term: string; desc: string }[] }) {
  return (
    <div className="grid gap-3 mt-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-3 items-start bg-base-200/30 rounded-lg p-3">
          <span className="badge badge-sm shrink-0 font-hanja">{item.term}</span>
          <span className="text-sm text-base-content/80">{item.desc}</span>
        </div>
      ))}
    </div>
  )
}

export default function FortuneInfo() {
  const { t, language } = useI18n()
  const isKorean = language === 'ko'

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          <span className="font-hanja gold-accent">{isKorean ? '명리학 가이드' : 'Fortune-Telling Guide'}</span>
        </h1>
        <p className="text-base-content/70 max-w-2xl mx-auto">
          {isKorean
            ? '동서양 운명학의 핵심 개념과 해석 방법을 자세히 알아보세요.'
            : 'Learn the core concepts and interpretation methods of Eastern and Western divination.'}
        </p>
      </div>

      <div className="space-y-8">
        {/* 사주팔자 섹션 */}
        <InfoCard
          title={isKorean ? '사주팔자 (四柱八字)' : 'Saju (Four Pillars of Destiny)'}
          subtitle={isKorean ? 'Korean Traditional Fortune-Telling' : '한국 전통 명리학'}
          colorClass="border-primary"
        >
          <p className="mb-3">{t.guide.sajuDesc1}</p>
          <p className="mb-3">{t.guide.sajuDesc2}</p>
          <p className="mb-4">{t.guide.sajuDesc3}</p>

          <h4 className="font-semibold text-base mt-6 mb-3">
            {isKorean ? '📌 사주의 구성 요소' : '📌 Components of Saju'}
          </h4>
          <ConceptList items={isKorean ? [
            { term: '천간', desc: '하늘의 기운을 나타내는 10개의 글자 (갑, 을, 병, 정, 무, 기, 경, 신, 임, 계)' },
            { term: '지지', desc: '땅의 기운을 나타내는 12개의 글자 (자, 축, 인, 묘, 진, 사, 오, 미, 신, 유, 술, 해)' },
            { term: '십신', desc: '일간을 중심으로 한 천간 간의 관계 (비견, 겁재, 식신, 상관, 편재, 정재, 편관, 정관, 편인, 정인)' },
            { term: '대운', desc: '10년마다 변화하는 큰 운의 흐름' },
            { term: '운성', desc: '길흉화복을 나타내는 특수한 별 (역마, 도화, 백호, 천을귀인 등)' }
          ] : [
            { term: 'Heavenly Stems', desc: '10 celestial energies (Jia, Yi, Bing, Ding, Wu, Ji, Geng, Xin, Ren, Gui)' },
            { term: 'Earthly Branches', desc: '12 terrestrial energies (Zi, Chou, Yin, Mao, Chen, Si, Wu, Wei, Shen, You, Xu, Hai)' },
            { term: 'Ten Gods', desc: 'Relationships between Day Master and other stems' },
            { term: 'Major Cycles', desc: '10-year fortune cycles showing life trajectory' },
            { term: 'Special Stars', desc: 'Auspicious and inauspicious stars indicating specific fortune aspects' }
          ]} />

          <h4 className="font-semibold text-base mt-6 mb-3">
            {isKorean ? '🎯 사주로 알 수 있는 것' : '🎯 What Saju Reveals'}
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-primary shrink-0">•</span>
              <span>{isKorean ? '타고난 성격과 기질, 강점과 약점' : 'Innate personality, temperament, strengths and weaknesses'}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary shrink-0">•</span>
              <span>{isKorean ? '재물운, 직업운, 학업운, 건강운' : 'Wealth, career, academic, and health fortune'}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary shrink-0">•</span>
              <span>{isKorean ? '인간관계의 패턴과 배우자운' : 'Relationship patterns and marriage fortune'}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary shrink-0">•</span>
              <span>{isKorean ? '인생의 전환점과 주요 시기' : 'Life turning points and critical periods'}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary shrink-0">•</span>
              <span>{isKorean ? '직업 적성과 진로 방향' : 'Career aptitude and direction'}</span>
            </li>
          </ul>
        </InfoCard>

        {/* 자미두수 섹션 */}
        <InfoCard
          title={isKorean ? '자미두수 (紫微斗數)' : 'Zi Wei Dou Shu (Purple Star Astrology)'}
          subtitle={isKorean ? 'Chinese Astrological System' : '중국 전통 성명학'}
          colorClass="border-secondary"
        >
          <p className="mb-3">{t.guide.ziweiDesc1}</p>
          <p className="mb-3">{t.guide.ziweiDesc2}</p>
          <p className="mb-4">{t.guide.ziweiDesc3}</p>

          <h4 className="font-semibold text-base mt-6 mb-3">
            {isKorean ? '📌 자미두수의 12궁' : '📌 The 12 Palaces of Zi Wei'}
          </h4>
          <ConceptList items={isKorean ? [
            { term: '명궁', desc: '본인의 성격과 전반적인 운명' },
            { term: '형제궁', desc: '형제자매와의 관계, 친구운' },
            { term: '부처궁', desc: '배우자와의 인연, 결혼생활' },
            { term: '자녀궁', desc: '자녀운, 창조성' },
            { term: '재백궁', desc: '재물운, 금전 관리 능력' },
            { term: '질액궁', desc: '건강, 질병, 사고' },
            { term: '천이궁', desc: '이동, 여행, 환경 변화' },
            { term: '노복궁', desc: '부하, 협력자, 대인관계' },
            { term: '관록궁', desc: '직업, 사회적 지위, 명예' },
            { term: '전택궁', desc: '부동산, 주거 환경' },
            { term: '복덕궁', desc: '정신적 만족, 취미, 여가' },
            { term: '부모궁', desc: '부모와의 인연, 윗사람운' }
          ] : [
            { term: 'Life Palace', desc: 'Self, overall destiny and personality' },
            { term: 'Siblings Palace', desc: 'Sibling relationships, friends' },
            { term: 'Spouse Palace', desc: 'Marriage and partner relationships' },
            { term: 'Children Palace', desc: 'Children fortune, creativity' },
            { term: 'Wealth Palace', desc: 'Financial fortune, money management' },
            { term: 'Health Palace', desc: 'Health, illness, accidents' },
            { term: 'Travel Palace', desc: 'Movement, travel, relocation' },
            { term: 'Servants Palace', desc: 'Subordinates, helpers, social network' },
            { term: 'Career Palace', desc: 'Profession, social status, honor' },
            { term: 'Property Palace', desc: 'Real estate, living environment' },
            { term: 'Fortune Palace', desc: 'Mental satisfaction, hobbies, leisure' },
            { term: 'Parents Palace', desc: 'Parent relationships, mentors' }
          ]} />

          <h4 className="font-semibold text-base mt-6 mb-3">
            {isKorean ? '⭐ 주요 별(星)의 의미' : '⭐ Major Stars and Their Meanings'}
          </h4>
          <div className="grid gap-2 text-sm">
            <p className="bg-base-200/30 rounded p-2">
              <span className="font-semibold text-secondary">{isKorean ? '자미성(紫微星):' : 'Zi Wei Star:'}</span> {isKorean ? '제왕성, 리더십과 존귀함' : 'Emperor star, leadership and nobility'}
            </p>
            <p className="bg-base-200/30 rounded p-2">
              <span className="font-semibold text-secondary">{isKorean ? '천기성(天機星):' : 'Tian Ji Star:'}</span> {isKorean ? '책략성, 지혜와 계획' : 'Wisdom star, intelligence and planning'}
            </p>
            <p className="bg-base-200/30 rounded p-2">
              <span className="font-semibold text-secondary">{isKorean ? '태양성(太陽星):' : 'Tai Yang Star:'}</span> {isKorean ? '남성성, 명예와 권위' : 'Masculine star, honor and authority'}
            </p>
            <p className="bg-base-200/30 rounded p-2">
              <span className="font-semibold text-secondary">{isKorean ? '무곡성(武曲星):' : 'Wu Qu Star:'}</span> {isKorean ? '재성, 재물과 결단력' : 'Wealth star, money and decisiveness'}
            </p>
          </div>
        </InfoCard>

        {/* 서양 점성술 섹션 */}
        <InfoCard
          title={isKorean ? '서양 점성술 (Western Astrology)' : 'Western Astrology (Natal Chart)'}
          subtitle={isKorean ? 'Planetary Birth Chart Analysis' : '행성 출생차트 분석'}
          colorClass="border-accent"
        >
          <p className="mb-3">{t.guide.natalDesc1}</p>
          <p className="mb-3">{t.guide.natalDesc2}</p>
          <p className="mb-4">{t.guide.natalDesc3}</p>

          <h4 className="font-semibold text-base mt-6 mb-3">
            {isKorean ? '📌 10개 행성의 의미' : '📌 The 10 Planets and Their Meanings'}
          </h4>
          <ConceptList items={isKorean ? [
            { term: '태양 ☉', desc: '자아, 의지, 생명력, 인생의 목표' },
            { term: '달 ☽', desc: '감정, 무의식, 본능, 내면의 욕구' },
            { term: '수성 ☿', desc: '사고, 의사소통, 학습, 분석력' },
            { term: '금성 ♀', desc: '사랑, 미, 예술, 가치관' },
            { term: '화성 ♂', desc: '행동력, 욕망, 에너지, 경쟁심' },
            { term: '목성 ♃', desc: '확장, 행운, 성장, 낙관주의' },
            { term: '토성 ♄', desc: '제한, 책임, 훈련, 성숙' },
            { term: '천왕성 ♅', desc: '변화, 혁신, 독창성, 자유' },
            { term: '해왕성 ♆', desc: '환상, 직관, 영성, 예술' },
            { term: '명왕성 ♇', desc: '변혁, 극단, 재생, 집착' }
          ] : [
            { term: 'Sun ☉', desc: 'Ego, will, vitality, life purpose' },
            { term: 'Moon ☽', desc: 'Emotions, subconscious, instincts, inner needs' },
            { term: 'Mercury ☿', desc: 'Thinking, communication, learning, analysis' },
            { term: 'Venus ♀', desc: 'Love, beauty, art, values' },
            { term: 'Mars ♂', desc: 'Action, desire, energy, competition' },
            { term: 'Jupiter ♃', desc: 'Expansion, luck, growth, optimism' },
            { term: 'Saturn ♄', desc: 'Limitation, responsibility, discipline, maturity' },
            { term: 'Uranus ♅', desc: 'Change, innovation, originality, freedom' },
            { term: 'Neptune ♆', desc: 'Illusion, intuition, spirituality, art' },
            { term: 'Pluto ♇', desc: 'Transformation, extremes, rebirth, obsession' }
          ]} />

          <h4 className="font-semibold text-base mt-6 mb-3">
            {isKorean ? '🏠 12 하우스의 의미' : '🏠 The 12 Houses'}
          </h4>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            {(isKorean ? [
              '1궁 (자아): 외모, 첫인상, 성격',
              '2궁 (재물): 금전, 소유, 가치관',
              '3궁 (소통): 형제, 학습, 의사소통',
              '4궁 (가정): 가족, 뿌리, 사적 공간',
              '5궁 (창조): 연애, 자녀, 창작',
              '6궁 (일상): 건강, 직무, 봉사',
              '7궁 (관계): 결혼, 파트너십, 적',
              '8궁 (변화): 죽음, 유산, 성, 변화',
              '9궁 (확장): 철학, 여행, 고등교육',
              '10궁 (성취): 직업, 명예, 사회적 지위',
              '11궁 (우정): 친구, 희망, 공동체',
              '12궁 (영성): 무의식, 은둔, 영적 세계'
            ] : [
              '1st House: Self, appearance, first impressions',
              '2nd House: Money, possessions, values',
              '3rd House: Communication, siblings, learning',
              '4th House: Home, family, roots',
              '5th House: Romance, children, creativity',
              '6th House: Health, work, service',
              '7th House: Marriage, partnerships, enemies',
              '8th House: Death, inheritance, sex, transformation',
              '9th House: Philosophy, travel, higher education',
              '10th House: Career, reputation, social status',
              '11th House: Friends, hopes, community',
              '12th House: Subconscious, seclusion, spirituality'
            ]).map((house, idx) => (
              <p key={idx} className="bg-base-200/30 rounded p-2">{house}</p>
            ))}
          </div>
        </InfoCard>

        {/* 통합 활용 팁 */}
        <div className="card bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
          <div className="card-body">
            <h3 className="card-title text-lg">
              {isKorean ? '💡 세 가지 체계를 함께 보는 방법' : '💡 How to Use All Three Systems Together'}
            </h3>
            <div className="space-y-3 text-sm text-base-content/80">
              <p>
                {isKorean
                  ? '사주팔자, 자미두수, 서양 점성술은 각각 다른 관점에서 운명을 해석합니다. 세 체계를 함께 보면 더욱 입체적이고 풍부한 이해가 가능합니다.'
                  : 'Saju, Zi Wei Dou Shu, and Western Astrology each interpret destiny from different perspectives. Using all three systems together provides a more dimensional and enriched understanding.'}
              </p>
              <ul className="space-y-2 mt-3">
                <li className="flex gap-2">
                  <span className="text-primary shrink-0">1.</span>
                  <span><strong>{isKorean ? '사주팔자:' : 'Saju:'}</strong> {isKorean ? '동양적 관점에서 오행과 음양의 균형을 통해 타고난 운명의 틀을 파악' : 'Eastern perspective analyzing innate destiny through Five Elements and Yin-Yang balance'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-secondary shrink-0">2.</span>
                  <span><strong>{isKorean ? '자미두수:' : 'Zi Wei:'}</strong> {isKorean ? '구체적인 삶의 영역별(재물, 직업, 건강 등) 운세를 상세하게 예측' : 'Detailed fortune prediction for specific life areas (wealth, career, health, etc.)'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent shrink-0">3.</span>
                  <span><strong>{isKorean ? '서양 점성술:' : 'Western Astrology:'}</strong> {isKorean ? '심리학적 관점에서 성격과 잠재력, 인생 과제를 분석' : 'Psychological perspective analyzing personality, potential, and life tasks'}</span>
                </li>
              </ul>
              <div className="alert mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-xs">
                  {isKorean
                    ? '세 체계에서 공통적으로 나타나는 특징이 있다면, 그것은 매우 강한 성향이나 운명적 흐름일 가능성이 높습니다.'
                    : 'If a trait appears across all three systems, it likely indicates a very strong tendency or destined flow.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
