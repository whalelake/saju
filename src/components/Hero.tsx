import { useI18n } from '../i18n'

interface Props {
  onStart: () => void
}

export default function Hero({ onStart }: Props) {
  const { t } = useI18n()

  return (
    <div className="hero min-h-[60vh] bg-gradient-to-b from-base-100 to-base-200">
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
          <p className="text-lg text-base-content/70 mb-8 leading-relaxed">
            <span className="font-hanja">四柱八字</span> · <span className="font-hanja">紫微斗數</span> · <span className="font-hanja">西洋占星術</span>
            <br />
            {t.hero.description}
          </p>

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
  )
}
