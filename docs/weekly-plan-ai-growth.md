# 명운판 이번 주 작업 설계

작성일: 2026-03-21
범위: 이번 주
목표: 결과 페이지를 `AI 소비 중심 흐름`으로 재설계하고, 다음 주 바로 구현할 수 있는 수준으로 설계를 확정해요.

## 1. 이번 주 최상위 목표

이번 주에는 기능을 많이 벌리지 않아요.
한 가지에 집중해요.

- 계산 후 이탈을 줄이는 결과 페이지 설계 확정

이 목표를 위해 이번 주에 끝내야 하는 건 아래 5개예요.

1. 결과 페이지 정보 구조 확정
2. AI 후속 질문 카드 설계
3. 관련 글 추천 규칙 설계
4. 이벤트 추적 명세 확정
5. `오늘의 AI 운세` 요구사항 초안 확정

---

## 2. 이번 주 산출물

이번 주가 끝나면 아래 산출물이 있어야 해요.

1. 이 문서
2. 결과 페이지 와이어 수준 구조
3. 후속 질문 카드 문구 5개
4. 추천 글 규칙표
5. 이벤트 명세표
6. `오늘의 AI 운세` 요구사항 메모
7. 한국어 기사 10개 제목 리스트

---

## 3. 결과 페이지 설계

대상 파일:
- [App.tsx](/Users/whalelake/myworks/saju/src/components/App.tsx)
- [InterpretModal.tsx](/Users/whalelake/myworks/saju/src/components/InterpretModal.tsx)
- [SajuView.tsx](/Users/whalelake/myworks/saju/src/components/saju/SajuView.tsx)
- [ZiweiView.tsx](/Users/whalelake/myworks/saju/src/components/ziwei/ZiweiView.tsx)
- [NatalView.tsx](/Users/whalelake/myworks/saju/src/components/natal/NatalView.tsx)

### 현재 문제
- 결과 화면이 `표 중심`이에요.
- AI 해석은 버튼을 눌러야 시작돼요.
- AI 해석 이후 다음 행동이 약해요.
- 관련 글 이동이 자연스럽지 않아요.

### 이번 주 확정할 목표 구조

결과 페이지 기본 순서:

1. 탭 네비게이션
2. 결과 표
3. AI 한 줄 요약 영역
4. AI 상세 해석 CTA
5. 후속 질문 카드
6. 관련 글 추천
7. 광고

### 화면 블록 정의

#### A. 결과 요약 블록
- 위치: 각 탭 결과 상단 또는 탭 공통 영역
- 역할: 사용자가 “내 결과가 어떤 느낌인지” 3초 안에 파악하게 해요
- 문구 방향:
  - 사주: `당신은 추진력과 현실 감각이 함께 강한 편이에요`
  - 자미두수: `관계와 커리어 흐름이 함께 중요한 명반이에요`
  - 출생차트: `감정과 표현 방식의 대비가 뚜렷한 차트예요`

#### B. AI 한 줄 요약
- 위치: 결과 요약 바로 아래
- 역할: AI 해석 버튼 클릭 전 진입 장벽을 낮춰요
- 형태:
  - 짧은 1~2문장
  - “더 보기” 버튼 연결

#### C. AI 상세 해석 CTA
- 위치: AI 한 줄 요약 바로 아래
- 역할: AI 해석의 본격 진입점
- 문구 후보:
  - `AI로 더 자세히 보기`
  - `내 연애/직업/재물운 물어보기`
  - `내 결과를 쉽게 풀어보기`

#### D. 후속 질문 카드
- 위치: AI CTA 아래
- 역할: 사용자가 입력 없이 바로 AI를 한 번 더 누르게 만들어요
- 조건:
  - 탭별 기본 질문 3개
  - 공통 질문 2개

#### E. 관련 글 추천
- 위치: 후속 질문 카드 아래
- 역할: AI 소비 이후 콘텐츠 소비로 연결해요
- 형태:
  - 카드 3개
  - 현재 탭과 가장 관련된 글 우선

#### F. 광고
- 위치: 관련 글 아래
- 원칙:
  - AI 요약보다 먼저 오지 않아요
  - 후속 질문 카드보다 먼저 오지 않아요

---

## 4. 후속 질문 카드 설계

대상 파일:
- [InterpretModal.tsx](/Users/whalelake/myworks/saju/src/components/InterpretModal.tsx)
- [api/interpret.ts](/Users/whalelake/myworks/saju/api/interpret.ts)
- [ko.ts](/Users/whalelake/myworks/saju/src/i18n/ko.ts)

### 이번 주 확정 질문 5개

공통:
1. `내 성격의 가장 큰 강점은 뭐야?`
2. `지금 시기에 가장 신경 써야 할 포인트는 뭐야?`

연애/관계:
3. `연애와 인간관계에서 내가 보이는 패턴은 뭐야?`

일/돈:
4. `직업과 돈 흐름에서 중요한 포인트는 뭐야?`

성장:
5. `내가 더 잘 풀리려면 어떤 방식으로 움직여야 해?`

### 탭별 우선 매핑

#### `saju`
- 성격 강점
- 연애/관계 패턴
- 직업/돈 흐름

#### `ziwei`
- 지금 시기 포인트
- 관계 패턴
- 커리어 흐름

#### `natal`
- 성격 강점
- 감정/관계 패턴
- 성장 방향

### 설계 원칙
- 질문은 짧아야 해요.
- 전문용어보다 사용자의 언어를 써야 해요.
- 입력을 강요하지 않아야 해요.
- 버튼만 눌러도 바로 다음 해석이 나와야 해요.

---

## 5. 관련 글 추천 설계

대상 파일:
- [ArticlesIndex.tsx](/Users/whalelake/myworks/saju/src/pages/ArticlesIndex.tsx)
- [ArticlePage.tsx](/Users/whalelake/myworks/saju/src/pages/ArticlePage.tsx)
- [GuideIndex.tsx](/Users/whalelake/myworks/saju/src/pages/GuideIndex.tsx)
- [LandingPage.tsx](/Users/whalelake/myworks/saju/src/pages/LandingPage.tsx)

### 추천 규칙

#### `saju` 탭
우선순위:
1. `/guide/saju`
2. `/guide/saju/ten-gods`
3. `/guide/saju/day-master`
4. `/articles/what-is-saju`
5. `/articles/five-elements`

#### `ziwei` 탭
우선순위:
1. `/guide/ziwei`
2. `/guide/ziwei/12-palaces`
3. `/articles/what-is-ziwei`

#### `natal` 탭
우선순위:
1. `/guide/natal`
2. `/guide/natal/planets`
3. `/guide/natal/houses`

### 추천 카드 문구 원칙
- 제목은 지금 있는 페이지 제목을 그대로 써요.
- 설명은 1줄만 보여줘요.
- CTA는 단순하게 `읽어보기`로 통일해요.

### 이번 주 결정 사항
- 추천 로직은 복잡한 알고리즘으로 안 가요.
- 이번 주는 `탭 기반 정적 매핑`으로 확정해요.
- 이후에만 세부 결과 기반 개인화로 확장해요.

---

## 6. 이벤트 추적 설계

대상 파일:
- [App.tsx](/Users/whalelake/myworks/saju/src/components/App.tsx)
- [InterpretModal.tsx](/Users/whalelake/myworks/saju/src/components/InterpretModal.tsx)
- [index.html](/Users/whalelake/myworks/saju/index.html)

### 이번 주 확정 이벤트

| 이벤트명 | 발생 시점 | 필수 속성 |
|---|---|---|
| `calc_submit` | 계산 버튼 클릭 | `lang`, `tab_default`, `unknown_time` |
| `calc_complete` | 계산 결과 렌더 완료 | `lang`, `tab`, `unknown_time` |
| `ai_open` | AI 해석 UI 진입 | `lang`, `tab`, `entry` |
| `ai_complete` | AI 응답 성공 | `lang`, `tab`, `type`, `context` |
| `ai_followup_click` | 후속 질문 클릭 | `lang`, `tab`, `question_id` |
| `related_article_click` | 추천 글 클릭 | `lang`, `tab`, `target_slug` |
| `daily_ai_fortune_open` | 오늘의 AI 운세 진입 | `lang`, `entry` |

### 속성 규칙

#### `entry`
- `result_summary`
- `ai_teaser`
- `followup_card`
- `home_daily`

#### `question_id`
- `strength`
- `timing`
- `relationship`
- `career_money`
- `growth`

### 이번 주 결정 사항
- 추적 도구 구현보다 이벤트 이름과 속성부터 고정해요.
- GA4든 다른 도구든 이름은 이 문서 기준으로 맞춰요.

---

## 7. 오늘의 AI 운세 요구사항 초안

대상 파일:
- [App.tsx](/Users/whalelake/myworks/saju/src/components/App.tsx)
- [History.tsx](/Users/whalelake/myworks/saju/src/components/History.tsx)

### 목표
- 사용자가 계산을 다시 처음부터 하지 않아도 매일 들어올 이유를 만들어요.

### 진입점
- 홈 히어로 아래
- 최근 기록이 있을 때만 우선 노출
- 문구:
  - `오늘의 AI 운세 보기`
  - `오늘 내 흐름 한 줄로 보기`

### 입력값
- 최근 계산한 `birthInput` 재사용
- 기록이 없으면 먼저 계산 유도

### 출력 형태
- 3줄 이내 요약
- 분야별 짧은 포인트
  - 감정
  - 관계
  - 일/돈

### 이번 주에 결정할 것
1. 홈에서 보여줄지
2. 결과 페이지에서도 보여줄지
3. 무료 1회로 둘지
4. 매일 갱신 문구를 어떻게 보일지

### 이번 주 결론
- 구현은 다음 주
- 이번 주는 진입 위치와 UX 문구만 확정

---

## 8. 한국어 콘텐츠 10개 기획

대상 파일:
- [ArticlesIndex.tsx](/Users/whalelake/myworks/saju/src/pages/ArticlesIndex.tsx)
- [GuideIndex.tsx](/Users/whalelake/myworks/saju/src/pages/GuideIndex.tsx)

### 우선 발행 제목

1. 무료 사주 보는 법
2. 출생 시간 모를 때 사주 어디까지 맞을까
3. 십신이란 무엇인가
4. 일간으로 보는 성격 해석
5. 자미두수 입문
6. 십이궁 쉽게 이해하기
7. 오행이 성격에 미치는 영향
8. 출생차트 보는 법 입문
9. 연애운은 어떻게 읽어야 할까
10. 직업운은 어떻게 봐야 할까

### 이번 주 결정 사항
- 제목만 뽑고 끝내지 않아요.
- 각 제목이 어느 탭과 연결되는지도 같이 고정해요.

| 제목 | 연결 탭 |
|---|---|
| 무료 사주 보는 법 | `saju` |
| 출생 시간 모를 때 사주 어디까지 맞을까 | `saju` |
| 십신이란 무엇인가 | `saju` |
| 일간으로 보는 성격 해석 | `saju` |
| 자미두수 입문 | `ziwei` |
| 십이궁 쉽게 이해하기 | `ziwei` |
| 오행이 성격에 미치는 영향 | `saju` |
| 출생차트 보는 법 입문 | `natal` |
| 연애운은 어떻게 읽어야 할까 | `saju`, `natal` |
| 직업운은 어떻게 봐야 할까 | `saju`, `ziwei` |

---

## 9. 요일별 작업 계획

### 월요일
- 결과 페이지 구조 확정
- 블록 순서 확정
- 광고 위치 원칙 확정

### 화요일
- 후속 질문 카드 문구 확정
- 탭별 질문 매핑 확정

### 수요일
- 관련 글 추천 규칙 확정
- 추천 카드 구조 확정

### 목요일
- 이벤트 명세 확정
- 이벤트 속성 표 확정

### 금요일
- 오늘의 AI 운세 요구사항 확정
- 콘텐츠 10개 제목과 탭 연결 확정

---

## 10. 완료 기준

이번 주가 끝났다고 말할 수 있는 기준은 아래예요.

1. 결과 페이지 구조를 더 이상 토론하지 않아도 돼요.
2. 후속 질문 카드 문구가 바로 구현 가능한 수준이에요.
3. 추천 글 매핑표가 고정돼 있어요.
4. 이벤트 이름과 속성이 확정돼 있어요.
5. 다음 주에 [App.tsx](/Users/whalelake/myworks/saju/src/components/App.tsx)부터 바로 수정 시작할 수 있어요.

---

## 11. 다음 주 첫 작업

다음 주 첫 구현 순서는 아래로 고정해요.

1. [App.tsx](/Users/whalelake/myworks/saju/src/components/App.tsx)에 AI 요약/후속 질문/추천 글 블록 추가
2. [InterpretModal.tsx](/Users/whalelake/myworks/saju/src/components/InterpretModal.tsx)에 후속 질문 진입 연결
3. 추적 이벤트 심기
4. 한국어 콘텐츠 1차 추가
