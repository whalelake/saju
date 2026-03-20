import { useEffect, useRef } from 'react'
import { useI18n } from '../i18n'

interface CoupangPartnerProps {
  title?: string
}

export default function CoupangPartner({ title }: CoupangPartnerProps) {
  const { t, language } = useI18n()
  const containerRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

  // 한국어 사용자만 표시 (쿠팡은 한국 서비스)
  const showCoupang = language === 'ko'

  useEffect(() => {
    if (!showCoupang || initialized.current || !containerRef.current) return

    // 컨테이너 비우기
    containerRef.current.innerHTML = ''

    // 쿠팡 파트너스 스크립트 직접 삽입
    const gScript = document.createElement('script')
    gScript.src = 'https://ads-partners.coupang.com/g.js'
    gScript.async = true
    containerRef.current.appendChild(gScript)

    // 위젯 초기화 스크립트
    const initScript = document.createElement('script')
    initScript.textContent = `
      (function() {
        var checkCoupang = setInterval(function() {
          if (window.PartnersCoupang && window.PartnersCoupang.G) {
            clearInterval(checkCoupang);
            new PartnersCoupang.G({
              "id": 973939,
              "template": "carousel",
              "trackingCode": "AF6700033",
              "width": "680",
              "height": "140",
              "tsource": ""
            });
          }
        }, 100);
        setTimeout(function() { clearInterval(checkCoupang); }, 10000);
      })();
    `
    containerRef.current.appendChild(initScript)
    initialized.current = true
  }, [showCoupang])

  if (!showCoupang) return null

  return (
    <div className="card bg-base-100 border-oriental mt-6">
      <div className="card-body">
        <h3 className="card-title text-lg mb-4">
          {title || t.coupang?.title || '추천 상품'}
        </h3>

        {/* 쿠팡 파트너스 다이나믹 배너 영역 */}
        <div ref={containerRef} className="min-h-[140px] flex items-center justify-center" />

        <p className="text-xs text-base-content/50 mt-4">
          {t.coupang?.disclaimer || '이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.'}
        </p>
      </div>
    </div>
  )
}

// TypeScript 타입 선언
declare global {
  interface Window {
    PartnersCoupang: {
      G: new (config: {
        id: number
        template: string
        trackingCode: string
        width: string
        height: string
        tsource?: string
      }) => void
    }
  }
}
