export const ko = {
  // 공통
  common: {
    loading: '로딩 중...',
    error: '오류가 발생했습니다',
    close: '닫기',
    cancel: '취소',
    confirm: '확인',
    save: '저장',
    delete: '삭제',
    edit: '편집',
    copy: '복사',
    share: '공유',
    download: '다운로드',
  },

  // 헤더
  header: {
    compatibility: '궁합',
    settings: '설정',
    github: 'GitHub',
  },

  // Hero
  hero: {
    title: '명운판',
    subtitle: '당신의 운명을 읽어드립니다',
    description: '동서양 운명학을 한 번에, AI가 쉽게 풀어드립니다',
    free: '완전 무료',
    secure: '개인정보 안전',
    ai: 'AI 해석',
    cta: '내 운명 보기',
    saju: '사주팔자',
    sajuDesc: '십신 · 운성 · 대운',
    ziwei: '자미두수',
    ziweiDesc: '주성 · 부성 · 사화',
    natal: '서양 점성술',
    natalDesc: '행성 · 하우스 · 애스펙트',
  },

  // 입력 폼
  form: {
    year: '년',
    month: '월',
    day: '일',
    hour: '시',
    minute: '분',
    gender: '성별',
    male: '남성',
    female: '여성',
    calendar: '양력/음력',
    solar: '양력',
    lunar: '음력',
    unknownTime: '시간 모름',
    calculate: '계산하기',
    city: '출생지',
    cityPlaceholder: '도시명 입력...',
    leapMonth: '윤달',
  },

  // 결과
  results: {
    pillars: '사주',
    year: '년주',
    month: '월주',
    day: '일주',
    hour: '시주',
    heavenlyStem: '천간',
    earthlyBranch: '지지',
    hiddenStems: '장간',
    tenGods: '십신',
    stars: '운성',
    majorCycles: '대운',
    age: '세',
    copy: '복사',
    aiInterpret: 'AI 해석',
  },

  // AI 해석
  interpret: {
    title: 'AI 해석',
    step1Title: '누구의 명식인가요?',
    step2Title: '무엇이 궁금해요?',
    step3Title: 'AI 해석 결과',
    self: '본인',
    child: '자녀',
    partner: '연인/배우자',
    friend: '친구',
    other: '기타',
    personality: '성격 분석',
    advice: '인생 조언',
    compatibility: '궁합',
    general: '종합 해석',
    questionPlaceholder: '예: 올해 재물운은 어떤가요?',
    askAnother: '다른 질문하기',
    analyzing: '분석 중...',
    suggestions: '추천 질문',
  },

  // 궁합
  compare: {
    title: '궁합 비교',
    person1: '첫 번째 사람',
    person2: '두 번째 사람',
    compare: '궁합 보기',
    compatibility: '궁합도',
    analysis: '궁합 분석',
  },

  // 가이드
  guide: {
    title: '사용 가이드',
    features: '주요 기능',
    aiFeature: 'AI 해석',
    aiDesc: 'GPT-4o가 사주/자미두수/점성술을 종합 분석',
    compatibilityFeature: '궁합 비교',
    compatibilityDesc: '두 사람의 명식을 비교 분석',
    historyFeature: '기록 관리',
    historyDesc: '과거 분석 결과 저장 및 불러오기',
    shareFeature: '결과 공유',
    shareDesc: '이미지로 저장하여 공유',
    copyFeature: '텍스트 복사',
    copyDesc: '결과를 텍스트로 복사',
  },

  // 설정
  settings: {
    title: '설정',
    language: '언어',
    theme: '테마',
    light: '라이트',
    dark: '다크',
  },

  // 푸터
  footer: {
    privacy: '개인정보처리방침',
    terms: '이용약관',
    contact: '문의하기',
    copyright: '명운판. AGPL-3.0 License.',
  },

  // 개인정보처리방침
  privacy: {
    title: '개인정보처리방침',
    effectiveDate: '시행일: 2025년 3월 18일',
  },

  // 이용약관
  terms: {
    title: '이용약관',
    effectiveDate: '시행일: 2025년 3월 18일',
  },
}

export type TranslationKeys = typeof ko
