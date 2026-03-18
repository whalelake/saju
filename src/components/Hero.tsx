interface Props {
  onStart: () => void
}

export default function Hero({ onStart }: Props) {
  return (
    <div className="hero min-h-[60vh] bg-gradient-to-b from-base-100 to-base-200">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          {/* 메인 타이틀 */}
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="font-hanja gold-accent text-5xl sm:text-6xl">命理</span>
            <span className="block text-2xl sm:text-3xl mt-2 text-base-content/80">
              동서양 운명학의 만남
            </span>
          </h1>

          {/* 서브 타이틀 */}
          <p className="text-lg text-base-content/70 mb-8 leading-relaxed">
            <span className="font-hanja">四柱八字</span> · <span className="font-hanja">紫微斗數</span> · <span className="font-hanja">西洋占星術</span>
            <br />
            세 가지 운명학을 한 번에 계산하고 AI가 해석해드립니다
          </p>

          {/* 특징 배지 */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <div className="badge badge-lg badge-outline gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              서버 전송 없음
            </div>
            <div className="badge badge-lg badge-outline gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              즉시 계산
            </div>
            <div className="badge badge-lg badge-outline gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              AI 해석
            </div>
          </div>

          {/* CTA 버튼 */}
          <button
            onClick={onStart}
            className="btn btn-primary btn-lg gap-2 shadow-lg"
          >
            <span className="font-hanja">命</span> 운명 분석 시작
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          {/* 통계 */}
          <div className="stats stats-vertical sm:stats-horizontal shadow mt-12 bg-base-100">
            <div className="stat">
              <div className="stat-title">사주팔자</div>
              <div className="stat-value text-primary font-hanja text-2xl">八字</div>
              <div className="stat-desc">십신 · 운성 · 대운</div>
            </div>
            <div className="stat">
              <div className="stat-title">자미두수</div>
              <div className="stat-value text-secondary font-hanja text-2xl">命盤</div>
              <div className="stat-desc">주성 · 부성 · 사화</div>
            </div>
            <div className="stat">
              <div className="stat-title">서양 점성술</div>
              <div className="stat-value text-accent font-hanja text-2xl">星圖</div>
              <div className="stat-desc">행성 · 하우스 · 애스펙트</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
