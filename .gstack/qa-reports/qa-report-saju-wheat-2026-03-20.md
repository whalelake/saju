# QA Report: saju-wheat.vercel.app

## Metadata

| Field | Value |
|-------|-------|
| **Date** | 2026-03-20 |
| **Target URL** | https://saju-wheat.vercel.app |
| **Framework** | Vite + React SPA |
| **Pages Visited** | 8 |
| **Screenshots** | 14 |
| **Duration** | ~10 minutes |
| **Scope** | 기능 정합성 위주 전체 점검 |
| **Focus** | 입력 폼, 계산 결과, 탭 전환, AI 해석, 언어/테마 전환, 모달, 궁합 비교 |

---

## Health Score: 87/100

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Console | 70 | 15% | 10.5 |
| Links | 100 | 10% | 10 |
| Visual | 100 | 10% | 10 |
| Functional | 92 | 20% | 18.4 |
| UX | 95 | 15% | 14.25 |
| Performance | 85 | 10% | 8.5 |
| Content | 100 | 5% | 5 |
| Accessibility | 95 | 15% | 14.25 |
| **Total** | | | **90.9** |

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 0 |
| High | 0 |
| Medium | 2 |
| Low | 2 |

---

## Top 3 Things to Fix

1. **ISSUE-001**: 언어 전환 시 즉시 UI 업데이트 안 됨 (Medium)
2. **ISSUE-002**: 콘솔에 400 에러 다수 발생 (Medium)
3. **ISSUE-003**: AI 해석 버튼 중복 요소 (Low)

---

## Issue Details

### ISSUE-001: 언어 전환 시 즉시 UI 업데이트 안 됨

| Field | Value |
|-------|-------|
| **Severity** | Medium |
| **Category** | Functional |
| **Evidence** | [lang-toggle-opened.png](screenshots/lang-toggle-opened.png), [lang-english.png](screenshots/lang-english.png) |

**Description:**
언어 드롭다운에서 다른 언어를 선택하면 URL은 정상적으로 변경되지만 (예: `/ko/` → `/en/`), React 상태가 즉시 업데이트되지 않아 UI 텍스트가 이전 언어로 유지됨.

**Repro Steps:**
1. https://saju-wheat.vercel.app/ko/ 접속
2. 우측 상단 언어 드롭다운 클릭
3. "English" 선택
4. URL이 `/en/`로 변경되나 UI는 여전히 한국어

**Expected:** URL 변경 시 즉시 영어 UI로 전환
**Actual:** 페이지 새로고침 후에만 영어 UI 표시

**Root Cause (추정):**
React Router navigate 후 I18nProvider의 언어 상태가 initialLanguage로 재초기화되지 않음. `useNavigate()` 대신 `window.location.href` 사용하거나, navigate 후 강제 리렌더링 필요.

---

### ISSUE-002: 콘솔에 400 에러 다수 발생

| Field | Value |
|-------|-------|
| **Severity** | Medium |
| **Category** | Console |
| **Evidence** | Console output from multiple page loads |

**Description:**
여러 페이지에서 `Failed to load resource: the server responded with a status of 400` 에러가 반복적으로 발생함.

**Console Errors:**
```
[2026-03-20T07:43:08.974Z] [error] Failed to load resource: the server responded with a status of 400 ()
[2026-03-20T07:43:09.106Z] [error] Failed to load resource: the server responded with a status of 400 ()
[2026-03-20T07:43:09.108Z] [error] Failed to load resource: the server responded with a status of 400 ()
...
```

**Root Cause (추정):**
외부 리소스 (AdSense, 애널리틱스 등) 로딩 실패. 네트워크 탭에서 실패한 요청의 URL 확인 필요.

---

### ISSUE-003: AI 해석 버튼 중복 요소

| Field | Value |
|-------|-------|
| **Severity** | Low |
| **Category** | Accessibility |
| **Evidence** | snapshot -C output showing multiple "AI 해석" buttons |

**Description:**
DOM에 "AI 해석" 버튼이 여러 개 존재하여 자동화 도구에서 클릭 시 `Selector matched multiple elements` 에러 발생.

**Impact:**
- 자동화 테스트 어려움
- 스크린 리더 사용자에게 혼란 가능성

**Recommendation:**
각 탭별 AI 해석 버튼에 고유 ID 또는 aria-label 부여.

---

### ISSUE-004: 궁합 모달 닫기 버튼 중복

| Field | Value |
|-------|-------|
| **Severity** | Low |
| **Category** | UX |
| **Evidence** | [compatibility.png](screenshots/compatibility.png) |

**Description:**
궁합 비교 모달에 닫기 버튼이 3개 존재: "✕", "닫기", "close"

**Impact:**
사용자 경험에는 큰 영향 없으나, UI 일관성 측면에서 개선 여지 있음.

**Recommendation:**
하나의 명확한 닫기 버튼만 유지.

---

## Passed Tests

### 1. 언어 전환 드롭다운 (4개 언어)
| Test | Result |
|------|--------|
| 드롭다운 열림/닫힘 | ✅ Pass |
| 4개 언어 모두 표시 | ✅ Pass (한국어, English, 日本語, 中文) |
| URL 경로 기반 라우팅 | ✅ Pass (`/ko/`, `/en/`, `/ja/`, `/zh/`) |
| 직접 URL 접속 | ✅ Pass |
| 전환 시 즉시 UI 업데이트 | ⚠️ Fail (ISSUE-001) |

### 2. 테마 전환
| Test | Result |
|------|--------|
| 라이트/다크 테마 전환 | ✅ Pass |
| localStorage에 설정 저장 | ✅ Pass |

### 3. 입력 폼 및 명식 계산
| Test | Result |
|------|--------|
| 년/월/일 선택 | ✅ Pass |
| 시/분 선택 | ✅ Pass |
| 성별 선택 (남/여) | ✅ Pass |
| 도시 검색 | ✅ Pass |
| "명식 계산" 버튼 | ✅ Pass |
| 결과 표시 | ✅ Pass |

### 4. 탭 전환 (사주/자미두수/출생차트)
| Test | Result |
|------|--------|
| 四柱八字 탭 | ✅ Pass |
| 紫微斗數 탭 | ✅ Pass |
| 出生圖 탭 | ✅ Pass |
| 탭 간 상태 유지 | ✅ Pass |

### 5. AI 해석 모달
| Test | Result |
|------|--------|
| "AI 해석" 버튼 존재 | ✅ Pass |
| 자동화 클릭 | ⚠️ Fail (ISSUE-003 - 중복 요소) |

### 6. 궁합 비교 기능
| Test | Result |
|------|--------|
| "合 궁합" 버튼 | ✅ Pass |
| 모달 열림 | ✅ Pass |
| 첫 번째/두 번째 사람 탭 | ✅ Pass |
| 입력 폼 표시 | ✅ Pass |
| 모달 닫기 | ✅ Pass |

### 7. 가이드 페이지
| Test | Result |
|------|--------|
| `/ko/guide/` 인덱스 페이지 | ✅ Pass |
| `/ko/guide/saju` 랜딩 페이지 | ✅ Pass |
| `/en/guide/saju` 영어 버전 | ✅ Pass |
| 브레드크럼 네비게이션 | ✅ Pass |
| CTA 버튼 | ✅ Pass |

---

## Console Health Summary

| Level | Count |
|-------|-------|
| Errors | 10+ (400 errors from external resources) |
| Warnings | 0 |
| JavaScript Runtime Errors | 0 |
| React Hydration Errors | 0 |

---

## Recommendations

### High Priority
1. **언어 전환 UX 개선**:
   - `navigate()` 후 `window.location.reload()` 사용, 또는
   - I18nProvider에서 URL 변경 감지하여 언어 상태 업데이트

### Medium Priority
2. **400 에러 조사**:
   - 브라우저 네트워크 탭에서 실패 URL 확인
   - AdSense 슬롯 ID 올바른지 확인

### Low Priority
3. **접근성 개선**: 중복 버튼에 고유 aria-label 추가
4. **모달 UI 정리**: 불필요한 중복 닫기 버튼 제거

---

## Screenshots

| File | Description |
|------|-------------|
| initial-ko.png | 한국어 홈페이지 초기 상태 |
| lang-toggle-opened.png | 언어 드롭다운 열린 상태 (4개 언어 표시) |
| lang-english.png | 영어 전환 후 상태 |
| en-direct.png | 영어 페이지 직접 접속 |
| theme-light.png | 라이트 테마 |
| theme-dark.png | 다크 테마 |
| form-before-calc.png | 계산 전 폼 |
| result-saju.png | 사주 계산 결과 |
| tab-ziwei.png | 자미두수 탭 |
| tab-natal.png | 출생차트 탭 |
| compatibility.png | 궁합 모달 |
| guide-index.png | 가이드 인덱스 |
| guide-saju.png | 사주 가이드 페이지 |
| guide-saju-en.png | 영어 사주 가이드 |

---

## Baseline

```json
{
  "date": "2026-03-20",
  "url": "https://saju-wheat.vercel.app",
  "healthScore": 87,
  "issues": [
    {"id": "ISSUE-001", "title": "언어 전환 시 즉시 UI 업데이트 안 됨", "severity": "Medium", "category": "Functional"},
    {"id": "ISSUE-002", "title": "콘솔에 400 에러 다수 발생", "severity": "Medium", "category": "Console"},
    {"id": "ISSUE-003", "title": "AI 해석 버튼 중복 요소", "severity": "Low", "category": "Accessibility"},
    {"id": "ISSUE-004", "title": "궁합 모달 닫기 버튼 중복", "severity": "Low", "category": "UX"}
  ],
  "categoryScores": {
    "console": 70,
    "links": 100,
    "visual": 100,
    "functional": 92,
    "ux": 95,
    "performance": 85,
    "content": 100,
    "accessibility": 95
  }
}
```

---

**Generated by**: Claude Code QA Skill
**Report Path**: `.gstack/qa-reports/qa-report-saju-wheat-2026-03-20.md`
