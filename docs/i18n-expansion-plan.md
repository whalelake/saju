# 명운판 다국어 버전 개발 계획

## 🌍 현재 상태 분석

### ✅ 이미 구축된 인프라
- i18n 시스템 완비 ([src/i18n/index.tsx](../src/i18n/index.tsx))
- 한국어 번역 100% 완료 ([src/i18n/ko.ts](../src/i18n/ko.ts))
- 영어 번역 100% 완료 ([src/i18n/en.ts](../src/i18n/en.ts))
- 언어 전환 버튼 구현 완료 (App.tsx:27-41)
- localStorage 기반 언어 설정 저장

### ⚠️ 현재 문제점
- 영어 옵션이 "준비 중"으로 비활성화 상태
- 다른 언어 미지원 (일본어, 중국어 등)
- 언어별 SEO 최적화 미흡
- 문화권별 콘텐츠 차별화 부족

---

## 🎯 다국어 확장 로드맵

### Phase 1: 영어 버전 활성화 (Week 1-2)

#### 1-1. 영어 번역 검증 및 개선

**현재 영어 번역 품질 체크리스트:**
- [ ] 명리학 용어 번역 정확성 검증
  - Four Pillars (사주팔자) ✅
  - Zi Wei Dou Shu (자미두수) ✅
  - Natal Chart (출생차트) ✅
  - Ten Gods (십신) ✅
- [ ] 문화적 뉘앙스 조정
  - "운명" → "destiny" vs "fate" 선택
  - 존댓말 → 친근한 영어 톤 변환
- [ ] 네이티브 감수 (선택)
  - Upwork/Fiverr에서 네이티브 검수자 고용
  - 예산: $50-100

**개선 작업:**
```typescript
// src/i18n/en.ts 개선 예시

// Before
guide: {
  title: 'Usage Guide'
}

// After (더 자연스러운 영어)
guide: {
  title: 'How to Use'
}

// 명리학 용어 일관성
// "Saju" vs "Four Pillars" - 둘 다 사용하되 괄호로 병기
title: 'Saju (Four Pillars of Destiny)'
```

#### 1-2. 영어 버전 활성화

**Settings.tsx 수정:**
```typescript
// Before
<option value="en" disabled>English (준비 중)</option>

// After
<option value="en">English</option>
```

**검증 항목:**
- [ ] 모든 UI 요소가 영어로 표시되는지 확인
- [ ] 한자 표기가 영어 환경에서도 적절히 보이는지 확인
- [ ] 날짜/시간 포맷 로케일 적용 (MM/DD/YYYY vs DD/MM/YYYY)

#### 1-3. 언어별 URL 구조

**구현 방법 선택:**

**Option A: 서브도메인 (권장)**
```
https://ko.myungunpan.com  (한국어)
https://en.myungunpan.com  (영어)
https://ja.myungunpan.com  (일본어)
```
- 장점: SEO 최적화 용이, 언어별 독립 배포 가능
- 단점: DNS 설정 필요, Vercel 멀티 도메인 설정

**Option B: 경로 기반**
```
https://myungunpan.com/ko
https://myungunpan.com/en
https://myungunpan.com/ja
```
- 장점: 구현 간단
- 단점: SPA 라우팅 필요

**Option C: 쿼리 파라미터 (현재 방식)**
```
https://myungunpan.com?lang=ko
https://myungunpan.com?lang=en
```
- 장점: 가장 간단
- 단점: SEO 최적화 어려움

**권장 구현: Option B (경로 기반)**

```typescript
// vite.config.ts에 라우팅 추가
export default defineConfig({
  // ...
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ko: resolve(__dirname, 'ko/index.html'),
        en: resolve(__dirname, 'en/index.html'),
      },
    },
  },
})

// src/i18n/index.tsx 수정
function getInitialLanguage(): Language {
  const path = window.location.pathname
  if (path.startsWith('/en')) return 'en'
  if (path.startsWith('/ja')) return 'ja'
  if (path.startsWith('/zh')) return 'zh'
  return 'ko'
}
```

#### 1-4. 언어별 SEO 최적화

```html
<!-- index.html - 한국어 버전 -->
<html lang="ko">
<head>
  <title>명운판 - 무료 사주팔자, 자미두수, 서양 점성술</title>
  <meta name="description" content="무료로 사주팔자, 자미두수, 출생차트를 계산하고 AI 해석을 받아보세요." />
  <link rel="alternate" hreflang="en" href="https://myungunpan.com/en" />
  <link rel="alternate" hreflang="ja" href="https://myungunpan.com/ja" />
  <link rel="alternate" hreflang="x-default" href="https://myungunpan.com" />
</head>

<!-- en/index.html - 영어 버전 -->
<html lang="en">
<head>
  <title>Myungunpan - Free Saju, Zi Wei Dou Shu & Natal Chart</title>
  <meta name="description" content="Calculate your Four Pillars (Saju), Zi Wei Dou Shu, and Natal Chart for free with AI interpretation." />
  <link rel="alternate" hreflang="ko" href="https://myungunpan.com/ko" />
  <link rel="alternate" hreflang="ja" href="https://myungunpan.com/ja" />
  <link rel="alternate" hreflang="x-default" href="https://myungunpan.com" />
</head>
```

---

### Phase 2: 아시아 언어 확장 (Week 3-6)

#### 타겟 언어 우선순위

| 언어 | 잠재 사용자 | 명리학 관심도 | 개발 난이도 | 우선순위 |
|------|-------------|---------------|-------------|----------|
| 🇯🇵 일본어 | 1억 2천만 | ⭐⭐⭐⭐⭐ | 중 | **P0** |
| 🇨🇳 중국어(간체) | 14억 | ⭐⭐⭐⭐⭐ | 중 | **P0** |
| 🇹🇼 중국어(번체) | 2천 4백만 | ⭐⭐⭐⭐⭐ | 하 | **P1** |
| 🇻🇳 베트남어 | 9천 8백만 | ⭐⭐⭐⭐ | 중 | P1 |
| 🇹🇭 태국어 | 7천만 | ⭐⭐⭐ | 중 | P2 |
| 🇮🇩 인도네시아어 | 2억 7천만 | ⭐⭐ | 중 | P2 |

#### 2-1. 일본어 버전 (P0)

**시장 분석:**
- 일본 명리학(四柱推命) 시장 규모: 연 500억 엔+
- 온라인 운세 서비스 활성화
- 모바일 앱 시장 성숙

**문화적 차별화:**
- 일본식 명칭 사용
  - 사주팔자 → 四柱推命 (Shichusuimei)
  - 자미두수 → 紫微斗数 (Shibi Tosu)
  - 출생차트 → 出生図 (Shusseizu)
- 존댓말 레벨 조정 (です・ます체)
- 일본 전통 달력 지원 (元号)

**번역 파일 구조:**
```typescript
// src/i18n/ja.ts
export const ja = {
  common: {
    appName: '命運判',
    loading: '読み込み中...',
    calculate: '計算する',
    copy: 'コピー',
    share: 'シェア',
    close: '閉じる',
  },
  hero: {
    title: '命運判',
    subtitle: '無料占い - 四柱推命、紫微斗数、西洋占星術',
    description: '生年月日を入力するだけで、3つの占術を即座に計算します。',
    cta: '今すぐ始める',
  },
  // ... 전체 번역
}
```

**현지화 요소:**
```typescript
// 날짜 포맷
const dateFormat = {
  ko: 'YYYY년 M월 D일',
  en: 'MMMM D, YYYY',
  ja: 'YYYY年M月D日',  // 日本式
  zh: 'YYYY年M月D日',  // 中文式
}

// 시간 포맷
const timeFormat = {
  ko: '오전/오후 h시 m분',
  en: 'h:mm A',
  ja: '午前/午後 h時m分',
}
```

#### 2-2. 중국어 버전 (P0)

**시장 분석:**
- 중국 명리학 시장: 세계 최대
- 바이두 검색량: "八字算命" (월 100만+)
- 모바일 결제 인프라 발달 (WeChat Pay, Alipay)

**간체/번체 전략:**
```typescript
// src/i18n/zh-CN.ts (간체)
export const zhCN = {
  common: {
    appName: '命运判',
    calculate: '计算',
  },
  hero: {
    title: '命运判',
    subtitle: '免费算命 - 八字、紫微斗数、西洋占星',
  }
}

// src/i18n/zh-TW.ts (번체)
export const zhTW = {
  common: {
    appName: '命運判',
    calculate: '計算',
  },
  hero: {
    title: '命運判',
    subtitle: '免費算命 - 八字、紫微斗數、西洋占星',
  }
}
```

**중국 시장 특화 기능:**
- 음력 달력 기본 표시
- 24절기 자동 계산
- 중국식 시간 표기 (时辰)
- 간지 연월일시 표기

---

### Phase 3: 유럽/미주 확장 (선택, 3-6개월 후)

#### 타겟 언어

| 언어 | 잠재 사용자 | 점성술 관심도 | 우선순위 |
|------|-------------|---------------|----------|
| 🇪🇸 스페인어 | 5억+ | ⭐⭐⭐⭐ | P1 |
| 🇵🇹 포르투갈어 | 2억 6천만 | ⭐⭐⭐ | P2 |
| 🇫🇷 프랑스어 | 2억 8천만 | ⭐⭐⭐ | P2 |
| 🇩🇪 독일어 | 1억 3천만 | ⭐⭐⭐ | P2 |
| 🇷🇺 러시아어 | 2억 6천만 | ⭐⭐⭐⭐ | P2 |

**서양 시장 특화:**
- 사주팔자/자미두수보다 **출생차트(Natal Chart)** 강조
- 서양 점성술 중심 UX
- 타로, 수비학 등 추가 콘텐츠

---

## 🛠️ 기술 구현 가이드

### 1. i18n 파일 구조 확장

```
src/i18n/
├── index.tsx           # i18n 컨텍스트
├── ko.ts               # 한국어 (기준)
├── en.ts               # 영어
├── ja.ts               # 일본어 (신규)
├── zh-CN.ts            # 중국어 간체 (신규)
├── zh-TW.ts            # 중국어 번체 (신규)
├── vi.ts               # 베트남어 (신규)
└── types.ts            # 타입 정의
```

### 2. 동적 import로 번들 크기 최적화

```typescript
// src/i18n/index.tsx
const loadLanguage = async (lang: Language) => {
  switch (lang) {
    case 'ko':
      return (await import('./ko')).ko
    case 'en':
      return (await import('./en')).en
    case 'ja':
      return (await import('./ja')).ja
    case 'zh-CN':
      return (await import('./zh-CN')).zhCN
    case 'zh-TW':
      return (await import('./zh-TW')).zhTW
    default:
      return (await import('./ko')).ko
  }
}
```

### 3. 폰트 전략

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // 한국어/일본어/중국어 공용
        hanja: ['Noto Sans KR', 'Noto Sans JP', 'Noto Sans SC', 'Noto Sans TC'],
        // 기본 (한글)
        sans: ['Pretendard', 'system-ui'],
        // 일본어
        japanese: ['Noto Sans JP', 'sans-serif'],
        // 중국어 간체
        'chinese-simplified': ['Noto Sans SC', 'sans-serif'],
        // 중국어 번체
        'chinese-traditional': ['Noto Sans TC', 'sans-serif'],
      },
    },
  },
}
```

```typescript
// 언어별 폰트 자동 적용
function getFontClass(lang: Language): string {
  switch (lang) {
    case 'ja':
      return 'font-japanese'
    case 'zh-CN':
      return 'font-chinese-simplified'
    case 'zh-TW':
      return 'font-chinese-traditional'
    default:
      return 'font-sans'
  }
}
```

### 4. 번역 자동화 파이프라인

**Option A: AI 번역 (초안)**
```bash
# GPT-4를 활용한 번역 스크립트
bun run scripts/translate.ts --from ko --to ja --model gpt-4

# 출력: src/i18n/ja.ts (초안)
```

```typescript
// scripts/translate.ts
import Anthropic from '@anthropic-ai/sdk'
import { ko } from '../src/i18n/ko'

async function translateToJapanese() {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })

  const prompt = `
다음 한국어 명리학 서비스의 UI 텍스트를 일본어로 번역해주세요.
명리학 전문 용어는 일본식 표현을 사용하고, 존댓말(です・ます体)을 사용해주세요.

한국어 원문:
${JSON.stringify(ko, null, 2)}

일본어 번역을 TypeScript 객체 형식으로 출력해주세요.
`

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 16000,
    messages: [{ role: 'user', content: prompt }],
  })

  // 결과를 파일로 저장
  const translation = extractTranslation(message.content)
  await Bun.write('src/i18n/ja.ts', `export const ja = ${translation}`)
}
```

**Option B: 크라우드소싱 (검수)**
- Crowdin, Lokalise 등 번역 플랫폼 활용
- 네이티브 스피커에게 AI 번역 검수 의뢰
- 예산: 언어당 $200-500

### 5. 언어 감지 및 자동 리다이렉트

```typescript
// src/i18n/index.tsx
function detectUserLanguage(): Language {
  // 1. URL 경로 확인
  const path = window.location.pathname
  if (path.startsWith('/en')) return 'en'
  if (path.startsWith('/ja')) return 'ja'

  // 2. localStorage 확인
  const saved = localStorage.getItem('language')
  if (saved) return saved as Language

  // 3. 브라우저 설정 확인
  const browserLang = navigator.language.split('-')[0]
  const supportedLangs: Language[] = ['ko', 'en', 'ja', 'zh']
  if (supportedLangs.includes(browserLang as Language)) {
    return browserLang as Language
  }

  // 4. 기본값 (한국어)
  return 'ko'
}
```

---

## 📊 언어별 예상 트래픽 및 수익

### 시나리오: 6개월 후 (5개 언어 지원)

| 언어 | 월 방문자 | AdSense RPM | 월 예상 수익 | 점유율 |
|------|-----------|-------------|--------------|--------|
| 🇰🇷 한국어 | 50,000 | ₩8,000 | ₩400,000 | 40% |
| 🇺🇸 영어 | 30,000 | $5 (₩6,500) | ₩195,000 | 24% |
| 🇯🇵 일본어 | 25,000 | ¥500 (₩5,000) | ₩125,000 | 20% |
| 🇨🇳 중국어 | 15,000 | ¥30 (₩6,000) | ₩90,000 | 12% |
| 🇻🇳 베트남어 | 5,000 | ₩3,000 | ₩15,000 | 4% |
| **합계** | **125,000** | - | **₩825,000** | 100% |

**추가 수익원:**
- 일본 시장 프리미엄 구독: 월 ¥980 (₩13,000)
  - 전환율 0.5% → 125명 → 월 ₩1,625,000
- 중국 시장 WeChat Pay 결제: 월 ¥68 (₩12,000)
  - 전환율 1.0% → 150명 → 월 ₩1,800,000

**총 예상 월 수익: ₩4,250,000**

---

## 🚀 실행 계획 (8주 로드맵)

### Week 1-2: 영어 버전 활성화
- [ ] 영어 번역 최종 검수 (네이티브 감수)
- [ ] Settings에서 "준비 중" 제거
- [ ] 경로 기반 라우팅 구현 (/en)
- [ ] 언어별 SEO 메타 태그 추가
- [ ] hreflang 태그 설정
- [ ] 영어 버전 QA 테스트
- [ ] 배포 및 모니터링

### Week 3-4: 일본어 버전 개발
- [ ] GPT-4로 일본어 초안 번역
- [ ] 일본인 네이티브 검수 (Upwork 고용)
- [ ] 일본식 용어 적용 (四柱推命 등)
- [ ] 일본어 폰트 최적화
- [ ] 일본 전통 달력 지원
- [ ] /ja 경로 구현
- [ ] 일본어 버전 QA 테스트

### Week 5-6: 중국어 버전 개발
- [ ] 간체/번체 번역 (AI + 크라우드소싱)
- [ ] 중국식 명리학 용어 적용
- [ ] 음력 달력 기본 설정
- [ ] 24절기 자동 계산
- [ ] /zh-CN, /zh-TW 경로 구현
- [ ] 중국어 버전 QA 테스트

### Week 7-8: 다국어 마케팅 및 최적화
- [ ] 언어별 Google Search Console 등록
- [ ] 언어별 sitemap 생성 및 제출
- [ ] 다국어 SNS 계정 생성 (Twitter, Weibo, LINE)
- [ ] 언어별 백링크 구축
- [ ] 언어별 AdSense 성과 분석
- [ ] A/B 테스트 (번역 문구, 레이아웃)

---

## 💡 즉시 실행 가능한 액션 아이템

### Day 1-3: 영어 버전 활성화
```typescript
// 1. src/components/Settings.tsx 수정
- <option value="en" disabled>English (준비 중)</option>
+ <option value="en">English</option>

// 2. index.html 수정
+ <link rel="alternate" hreflang="en" href="https://saju-wheat.vercel.app/en" />
+ <link rel="alternate" hreflang="x-default" href="https://saju-wheat.vercel.app" />

// 3. Vercel 배포 및 테스트
```

### Day 4-7: 영어 SEO 최적화
```bash
# 1. 언어별 sitemap 생성
bun run scripts/generate-sitemap.ts

# 2. Google Search Console 등록
# 3. 영어 메타 태그 최종 점검
```

---

## 📝 체크리스트: 언어 추가 시 확인사항

### 번역 품질
- [ ] 모든 UI 텍스트 번역 (ko.ts 대비 100%)
- [ ] 명리학 전문 용어 정확성
- [ ] 문화적 뉘앙스 적절성
- [ ] 네이티브 감수 완료

### 기술 구현
- [ ] i18n/{lang}.ts 파일 생성
- [ ] index.tsx에 언어 추가
- [ ] 경로 라우팅 구현 (/{lang})
- [ ] 폰트 최적화
- [ ] 날짜/시간 포맷 로케일 적용

### SEO
- [ ] hreflang 태그 설정
- [ ] 언어별 메타 태그
- [ ] sitemap_{lang}.xml 생성
- [ ] Google Search Console 등록

### 테스트
- [ ] 전체 UI 번역 확인
- [ ] 한자 표기 확인
- [ ] 모바일 레이아웃 확인
- [ ] 언어 전환 테스트
- [ ] 브라우저 언어 자동 감지 테스트

---

## 🎯 성공 지표 (KPI)

### 3개월 후 목표
- [ ] 영어 사용자 비율: 전체의 20%+
- [ ] 일본어 사용자 비율: 전체의 15%+
- [ ] 전체 월 방문자: 50,000명+
- [ ] 다국어 수익 비중: 전체의 40%+

### 6개월 후 목표
- [ ] 5개 언어 지원 (한/영/일/중/베)
- [ ] 전체 월 방문자: 125,000명+
- [ ] 다국어 월 수익: ₩2,000,000+
- [ ] 언어별 프리미엄 구독자: 300명+

---

## 다음 단계

1. **즉시 시작**: 영어 버전 "준비 중" 제거
2. **1주 후**: 영어 SEO 최적화 완료
3. **2주 후**: 일본어 번역 착수
4. **1개월 후**: 영어+일본어 성과 분석
5. **2개월 후**: 중국어 버전 론칭
6. **3개월 후**: 다국어 전략 전체 검토
