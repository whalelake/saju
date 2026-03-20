import { useEffect, useRef } from 'react'
import { useI18n } from '../i18n'

const COUPANG_PARTNER_ID = 'AF6700033'

interface CoupangPartnerProps {
  title?: string
}

export default function CoupangPartner({ title }: CoupangPartnerProps) {
  const { t, language } = useI18n()
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptLoaded = useRef(false)

  // 한국어 사용자만 표시 (쿠팡은 한국 서비스)
  const showCoupang = language === 'ko'

  useEffect(() => {
    if (!showCoupang || scriptLoaded.current || !containerRef.current) return

    // 쿠팡 파트너스 스크립트 로드
    const script = document.createElement('script')
    script.src = 'https://ads-partners.coupang.com/g.js'
    script.async = true
    script.onload = () => {
      if (window.PartnersCoupang && containerRef.current) {
        new window.PartnersCoupang.G({
          id: 973939,
          template: 'carousel',
          trackingCode: COUPANG_PARTNER_ID,
          width: '680',
          height: '140',
          tsource: '',
        })
        scriptLoaded.current = true
      }
    }
    document.head.appendChild(script)

    return () => {
      // cleanup은 필요하지 않음 (스크립트 한 번만 로드)
    }
  }, [showCoupang])

  if (!showCoupang) return null

  return (
    <div className="card bg-base-100 border-oriental mt-6">
      <div className="card-body">
        <h3 className="card-title text-lg mb-4">
          {title || t.coupang?.title || '추천 상품'}
        </h3>

        {/* 쿠팡 파트너스 다이나믹 배너 영역 */}
        <div ref={containerRef} className="min-h-[140px]" />

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
