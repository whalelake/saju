# SEO 체크리스트

## 완료된 항목
- [x] 메타 태그 최적화 (title, description, keywords)
- [x] 구조화 데이터 (Schema.org)
  - [x] SoftwareApplication
  - [x] FAQPage
  - [x] WebSite
- [x] robots.txt (AdSense 크롤러 허용)
- [x] sitemap.xml (다국어 hreflang 태그 포함)
- [x] Open Graph 태그 (og:image 포함)
- [x] Twitter Card 메타 태그
- [x] Canonical URL 설정
- [x] Favicon 및 Apple Touch Icon
- [x] PWA 메타 태그
- [x] 성능 최적화 (preconnect, dns-prefetch)

## 검색 엔진 등록 상태

### Google Search Console
- [ ] 도메인 등록: https://search.google.com/search-console
- [ ] sitemap 제출: https://saju-wheat.vercel.app/sitemap.xml
- [ ] 색인 상태 모니터링

### Naver Search Advisor (한국 시장)
- [ ] 사이트 등록: https://searchadvisor.naver.com
- [ ] sitemap 제출
- [ ] 검색 노출 확인

### Bing Webmaster Tools
- [ ] 사이트 등록: https://www.bing.com/webmasters
- [ ] sitemap 제출

## 타겟 키워드 분석

### 한국어 주요 키워드 (월 검색량)
- 무료 사주: 33,100
- 사주팔자: 49,500
- 사주팔자 계산: 18,100
- 자미두수: 12,100
- 출생 시간 모를 때 사주: 2,900
- 궁합 보기: 27,100
- AI 사주: 2,400
- 사주 풀이: 8,100
- 타로: 368,000 (경쟁 높음)
- 운세: 201,000 (경쟁 높음)

### 영어 키워드 (글로벌 시장)
- Free Saju reading
- Four Pillars of Destiny calculator
- Zi Wei Dou Shu chart
- Free natal chart
- Korean astrology
- Ba Zi calculator

### 롱테일 키워드 (전환율 높음)
- 출생 시간 모르는 경우 사주
- 무료 사주팔자 풀이
- 자미두수 무료 보기
- AI 기반 사주 해석
- 점성술 출생차트 무료

## 콘텐츠 최적화 전략

### 1. 블로그/가이드 콘텐츠 추가 (향후)
- [ ] "사주팔자 보는 법" 가이드
- [ ] "자미두수 12궁 해석"
- [ ] "출생 시간 모를 때 대처법"
- [ ] "오행 균형과 성격"
- [ ] "대운과 세운의 차이"

### 2. 구조화된 FAQ 확장
현재 4개 FAQ 구현됨. 추가 고려 항목:
- [ ] "사주가 정확한가요?"
- [ ] "무료 사주와 유료 사주의 차이"
- [ ] "AI 해석의 정확도"
- [ ] "결과를 어떻게 저장하나요?"

### 3. 사용자 리뷰/평점 수집
- [ ] Schema.org AggregateRating 실제 데이터로 업데이트
- [ ] 사용자 후기 섹션 추가 (신뢰도 향상)

## 기술적 SEO 개선

### Core Web Vitals 최적화
- [x] LCP (Largest Contentful Paint): 폰트 preconnect 적용
- [ ] FID (First Input Delay): React 19 concurrent 기능 활용
- [ ] CLS (Cumulative Layout Shift): 레이아웃 시프트 최소화

### 모바일 최적화
- [x] 반응형 디자인
- [x] viewport 메타 태그
- [x] Apple 모바일 웹앱 설정
- [ ] AMP 페이지 고려 (검색 노출 극대화)

### 국제화 (i18n)
- [x] sitemap.xml에 hreflang 태그 추가
- [ ] HTML lang 속성 동적 변경 구현
- [ ] 각 언어별 메타 태그 최적화
- [ ] 다국어 FAQ 구조화 데이터

## 링크 빌딩 전략

### 내부 링크
- [ ] 사주/자미두수/점성술 탭 간 SEO 친화적 링크 구조
- [ ] 관련 용어 설명 모달 → 별도 페이지 전환 고려

### 외부 백링크
- [ ] 명리학 커뮤니티 등록 (네이버 카페, 디시인사이드)
- [ ] Reddit, Quora 질문 답변 (영어권)
- [ ] YouTube 소개 영상 제작 및 링크
- [ ] 블로그 게스트 포스팅

## 성과 측정

### Google Analytics 4 설정
- [ ] GA4 추적 코드 설치
- [ ] 이벤트 추적 설정:
  - 사주 계산 완료
  - AI 해석 요청
  - 결과 공유
  - 탭 전환 (사주/자미두수/점성술)

### 검색 성과 KPI
- [ ] 주간 자연 검색 트래픽
- [ ] 키워드별 순위 변화
- [ ] CTR (Click Through Rate)
- [ ] 평균 체류 시간
- [ ] 이탈률

## 경쟁사 분석

### 주요 경쟁 사이트
1. 만세력 (https://www.saju.com)
   - 장점: 브랜드 인지도, 상세한 해석
   - 단점: UI 구식, 모바일 최적화 부족

2. 사주온 (https://www.sajuon.com)
   - 장점: 무료 서비스, 깔끔한 UI
   - 단점: AI 해석 없음

3. 포스타입 사주 서비스
   - 장점: 커뮤니티 연계
   - 단점: 유료 비중 높음

### 차별화 포인트
- [x] 사주/자미두수/점성술 통합 제공
- [x] AI 기반 맞춤 해석
- [x] 완전 무료 서비스
- [x] 모던 UI/UX
- [ ] 영어 서비스 확대 (글로벌 진출)

## 다음 단계

### 우선순위 1 (즉시 실행)
1. Google Search Console 등록 및 sitemap 제출
2. Naver Search Advisor 등록
3. GA4 추적 코드 설치

### 우선순위 2 (1개월 내)
1. 실제 사용자 리뷰 수집 및 AggregateRating 업데이트
2. 블로그 콘텐츠 3개 작성 (키워드 타겟팅)
3. Core Web Vitals 점수 90+ 달성

### 우선순위 3 (3개월 내)
1. 다국어 지원 완전 구현
2. 커뮤니티 백링크 100개 확보
3. 월간 자연 검색 트래픽 10,000 달성

## 참고 자료

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/docs/full.html)
- [Naver 검색 등록 가이드](https://searchadvisor.naver.com/guide)
- [Core Web Vitals 가이드](https://web.dev/vitals/)
