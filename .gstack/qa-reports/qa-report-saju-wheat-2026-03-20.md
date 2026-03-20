# QA Report: 명운판 다국어 기능 테스트

**날짜:** 2026-03-20
**대상 URL:** https://saju-wheat.vercel.app
**테스트 범위:** 다국어 페이지 동작 중심 전체 서비스
**Health Score:** 40/100 (Critical 이슈 발견)

---

## 🚨 Critical Issue: 다국어 기능 완전 미작동

### ISSUE-001: URL 파라미터 언어 라우팅 실패

| 항목 | 내용 |
|------|------|
| **심각도** | Critical |
| **카테고리** | Functional |
| **영향** | 모든 다국어 사용자가 서비스 이용 불가 |

**재현 단계:**
1. `https://saju-wheat.vercel.app/?lang=en` 접속
2. `https://saju-wheat.vercel.app/?lang=ja` 접속
3. `https://saju-wheat.vercel.app/?lang=zh` 접속

**예상 결과:**
- 각각 영어, 일본어, 중국어로 UI 표시

**실제 결과:**
- 모든 URL에서 한국어로 표시됨
- "설정", "테마 전환", "내 운명 보기" 등 모두 한국어

**증거:**
- [스크린샷: 02-main-en.png](screenshots/02-main-en.png)
- [스크린샷: 03-main-ja.png](screenshots/03-main-ja.png)

---

### ISSUE-002: 설정 모달에 일본어/중국어 옵션 없음

| 항목 | 내용 |
|------|------|
| **심각도** | Critical |
| **카테고리** | Functional |
| **영향** | 사용자가 일본어/중국어 선택 불가능 |

**재현 단계:**
1. 메인 페이지에서 "설정" 버튼 클릭
2. 언어 선택 드롭다운 확인

**예상 결과:**
```
- 한국어
- English
- 日本語
- 中文
```

**실제 결과:**
```
- 한국어 [selected]
- English (준비 중)   ← 오직 2개 옵션만 있음
```

**증거:**
- [스크린샷: 04-settings-modal.png](screenshots/04-settings-modal.png)

---

## 🔍 근본 원인 분석

### 최신 코드 배포 미반영

| 항목 | 값 |
|------|-----|
| 최신 커밋 | `acd8ebe` (feat: AI 해석 결과 마크다운 렌더링 개선) |
| 다국어 커밋 | `050874e` (feat: 다국어 완성 및 사용성 개선) |
| git push | ✅ 완료됨 (`main -> main`) |
| Vercel 배포 | ❌ **반영 안됨** |

**코드 변경 사항 (미반영):**

1. **src/i18n/index.tsx** - URL 파라미터 언어 감지 로직
```typescript
const params = new URLSearchParams(window.location.search)
const langParam = params.get('lang')
if (langParam === 'ko' || langParam === 'en' || langParam === 'ja' || langParam === 'zh') {
  return langParam
}
```

2. **src/components/Settings.tsx** - 4개 언어 옵션
```typescript
<option value="ko">한국어</option>
<option value="en">English</option>
<option value="ja">日本語</option>
<option value="zh">中文</option>
```

3. **src/i18n/ja.ts, zh.ts** - 신규 번역 파일

---

## 📊 Health Score 계산

| 카테고리 | 점수 | 비고 |
|----------|------|------|
| Console | 100 | 에러 없음 |
| Links | 100 | 깨진 링크 없음 |
| Visual | 100 | 레이아웃 정상 |
| **Functional** | **0** | Critical 이슈 2건 |
| UX | 70 | 다국어 불가로 감점 |
| Performance | 100 | 정상 |
| Content | 100 | 한국어 콘텐츠 정상 |
| Accessibility | 100 | 접근성 양호 |

**가중 평균:**
`(100×15% + 100×10% + 100×10% + 0×20% + 70×15% + 100×10% + 100×5% + 100×15%) = 40`

---

## 🔧 즉시 조치 필요

### 1. Vercel 배포 상태 확인
```
https://vercel.com/dashboard → 해당 프로젝트 → Deployments
```

### 2. 빌드 에러 확인
- Vercel 대시보드에서 빌드 로그 확인
- 타입 에러나 빌드 실패 여부 체크

### 3. 수동 재배포 시도
```bash
# Vercel CLI 사용
vercel --prod

# 또는 빈 커밋 후 푸시
git commit --allow-empty -m "chore: trigger deployment"
git push
```

---

## 기타 확인 사항

### 정상 작동하는 기능 ✅

- 한국어 메인 페이지 로드
- 폼 입력 (날짜, 시간, 성별)
- 도시 검색
- 테마 전환
- 한자 표시 설정

### 테스트 보류 (배포 후 재테스트 필요)

- AI 해석 마크다운 렌더링
- 다국어 언어 전환
- URL 파라미터 라우팅
- 일본/중국 도시 검색

---

**보고서 작성:** Claude QA Agent
**테스트 시간:** 10분
**스크린샷 수:** 4
