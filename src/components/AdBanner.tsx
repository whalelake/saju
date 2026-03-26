import { useEffect, useRef } from 'react'
import { getAdSlotEnvName, getAdSlotLabel, getAdSlotValue, type AdSlotKey } from '../config/ad-slots'

interface AdBannerProps {
  slot: AdSlotKey
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdBanner({ slot, format = 'auto', className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null)
  const isLoaded = useRef(false)
  const slotValue = getAdSlotValue(slot)
  const isDev = import.meta.env.DEV

  useEffect(() => {
    if (!slotValue || isLoaded.current) return

    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({})
        isLoaded.current = true
      }
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }, [])

  if (isDev) {
    return (
      <div className={`bg-base-300/50 border border-dashed border-base-content/20 rounded-lg p-4 text-center text-base-content/40 text-sm ${className}`}>
        <div className="flex flex-col items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span>광고 영역: {getAdSlotLabel(slot)}</span>
          <span className="text-xs">{getAdSlotEnvName(slot)}={slotValue ?? 'unset'}</span>
        </div>
      </div>
    )
  }

  if (!slotValue) {
    return null
  }

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle block ${className}`}
      style={{ display: 'block' }}
      data-ad-client="ca-pub-8062225857171456"
      data-ad-slot={slotValue}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  )
}
