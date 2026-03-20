import { useI18n } from '../i18n'

interface Props {
  onStart: () => void
}

export default function Hero({ onStart }: Props) {
  const { t } = useI18n()

  return (
    <div className="bg-gradient-to-b from-base-100 to-base-200 pb-12">
      <div className="hero min-h-[60vh]">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            {/* 메인 타이틀 */}
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="font-hanja gold-accent text-5xl sm:text-6xl">命運判</span>
              <span className="block text-2xl sm:text-3xl mt-2 text-base-content/80">
                {t.hero.subtitle}
              </span>
            </h1>

            {/* 서브 타이틀 */}
            <p className="text-lg text-base-content/70 mb-6 leading-relaxed">
              <span className="font-hanja">四柱八字</span> · <span className="font-hanja">紫微斗數</span> · <span className="font-hanja">西洋占星術</span>
              <br />
              {t.hero.description}
            </p>

            {/* 소개 문단 */}
            <div className="max-w-xl mx-auto mb-8">
              <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
                {t.hero.intro}
              </p>
            </div>

            {/* 특징 배지 */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <div className="badge badge-lg badge-outline gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t.hero.free}
              </div>
              <div className="badge badge-lg badge-outline gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {t.hero.secure}
              </div>
              <div className="badge badge-lg badge-outline gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                {t.hero.ai}
              </div>
            </div>

            {/* CTA 버튼 */}
            <button
              onClick={onStart}
              className="btn btn-primary btn-lg gap-2 shadow-lg"
            >
              <span className="font-hanja">判</span> {t.hero.cta}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {/* 통계 */}
            <div className="stats stats-vertical sm:stats-horizontal shadow mt-12 bg-base-100">
              <div className="stat">
                <div className="stat-title">{t.hero.saju}</div>
                <div className="stat-value text-primary font-hanja text-2xl">八字</div>
                <div className="stat-desc">{t.hero.sajuDesc}</div>
              </div>
              <div className="stat">
                <div className="stat-title">{t.hero.ziwei}</div>
                <div className="stat-value text-secondary font-hanja text-2xl">命盤</div>
                <div className="stat-desc">{t.hero.ziweiDesc}</div>
              </div>
              <div className="stat">
                <div className="stat-title">{t.hero.natal}</div>
                <div className="stat-value text-accent font-hanja text-2xl">星圖</div>
                <div className="stat-desc">{t.hero.natalDesc}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 추가 정보 섹션 */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        {/* 왜 명운판인가? */}
        <div className="card bg-base-100 border-oriental mb-6">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-3">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.hero.why}
            </h2>
            <p className="text-base-content/80 leading-relaxed">
              {t.hero.whyDesc}
            </p>
          </div>
        </div>

        {/* 주요 기능 */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="card bg-base-100 border border-primary/20">
            <div className="card-body">
              <h3 className="card-title text-lg text-primary">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                {t.hero.feature1}
              </h3>
              <p className="text-sm text-base-content/70">{t.hero.feature1Desc}</p>
            </div>
          </div>

          <div className="card bg-base-100 border border-secondary/20">
            <div className="card-body">
              <h3 className="card-title text-lg text-secondary">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                {t.hero.feature2}
              </h3>
              <p className="text-sm text-base-content/70">{t.hero.feature2Desc}</p>
            </div>
          </div>

          <div className="card bg-base-100 border border-accent/20">
            <div className="card-body">
              <h3 className="card-title text-lg text-accent">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {t.hero.feature3}
              </h3>
              <p className="text-sm text-base-content/70">{t.hero.feature3Desc}</p>
            </div>
          </div>

          <div className="card bg-base-100 border border-base-300">
            <div className="card-body">
              <h3 className="card-title text-lg">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {t.hero.feature4}
              </h3>
              <p className="text-sm text-base-content/70">{t.hero.feature4Desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
