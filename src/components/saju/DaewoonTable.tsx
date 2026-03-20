import { useRef, useEffect } from 'react'
import type { DaewoonItem } from '@orrery/core/types'
import { stemColorClass, branchColorClass, stemSolidBgClass, branchSolidBgClass } from '../../utils/format.ts'
import { useI18n } from '../../i18n'

interface Props {
  daewoon: DaewoonItem[]
  unknownTime?: boolean
}

function findActiveDaewoonIndex(daewoon: DaewoonItem[]): number {
  const now = new Date()
  let activeIdx = -1
  for (let i = 0; i < daewoon.length; i++) {
    if (daewoon[i].startDate <= now) {
      activeIdx = i
    }
  }
  return activeIdx
}

export default function DaewoonTable({ daewoon, unknownTime }: Props) {
  const { t } = useI18n()

  if (daewoon.length === 0) {
    return (
      <section>
        <h3 className="text-base font-medium text-base-content mb-2">{t.saju.daewoonTitle}</h3>
        <p className="text-base text-base-content/60">{t.saju.daewoonNoData}</p>
      </section>
    )
  }

  const activeIdx = findActiveDaewoonIndex(daewoon)
  const activeRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current
      const el = activeRef.current
      container.scrollLeft = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2
    }
  }, [activeIdx])

  return (
    <section>
      <h3 className="text-base font-medium text-base-content mb-2">{t.saju.daewoonTitle}</h3>
      {unknownTime && (
        <p className="text-sm text-amber-600 mb-2">
          {t.saju.daewoonTimeWarning}
        </p>
      )}
      <div ref={scrollRef} className="overflow-x-auto py-1">
        <div className="flex flex-row-reverse gap-2 w-fit font-hanja">
          {daewoon.map((dw, i) => {
            const isActive = i === activeIdx
            const stem = dw.ganzi[0]
            const branch = dw.ganzi[1]
            return (
              <div
                key={dw.index}
                ref={isActive ? activeRef : undefined}
                className={`flex flex-col items-center gap-0.5 rounded-lg px-1 py-1 ${isActive ? 'ring-2 ring-amber-400 bg-warning/10' : ''}`}
              >
                <span className="text-xs text-base-content/70">{dw.age}{t.saju.age}</span>
                <span className={`text-sm ${stemColorClass(stem)}`}>{dw.stemSipsin}</span>
                <span className={`inline-flex items-center justify-center w-8 h-8 leading-none text-base rounded pb-[2px] ${stemSolidBgClass(stem)}`}>
                  {stem}
                </span>
                <span className={`inline-flex items-center justify-center w-8 h-8 leading-none text-base rounded pb-[2px] ${branchSolidBgClass(branch)}`}>
                  {branch}
                </span>
                <span className={`text-sm ${branchColorClass(branch)}`}>{dw.branchSipsin}</span>
                <span className="text-sm text-base-content/70">{dw.unseong}</span>
                <span className="text-sm text-base-content/70">{dw.sinsal}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
