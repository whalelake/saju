import { useState, useMemo } from 'react'
import { findTransits } from '@orrery/core/pillars'
import { formatRelation } from '../../utils/format.ts'
import { useI18n } from '../../i18n'
import type { TransitItem } from '@orrery/core/types'

interface Props {
  natalPillars: string[]  // [시주, 일주, 월주, 년주]
}

export default function TransitView({ natalPillars }: Props) {
  const { t, language } = useI18n()
  const [months, setMonths] = useState(1)
  const [backward, setBackward] = useState(false)

  const transits = useMemo(
    () => findTransits(natalPillars, months, backward),
    [natalPillars, months, backward],
  )

  const formatDate = (date: Date) => {
    const m = date.getMonth() + 1
    const d = date.getDate()
    if (language === 'en') {
      return `${String(m).padStart(2, ' ')}/${String(d).padStart(2, ' ')}`
    }
    if (language === 'ja') {
      return `${m}月${d}日`
    }
    if (language === 'zh') {
      return `${m}月${d}日`
    }
    return `${String(m).padStart(2, ' ')}월 ${String(d).padStart(2, ' ')}일`
  }

  const monthLabel = months === 1 ? t.saju.transitMonth1
    : months === 3 ? t.saju.transitMonth3
    : t.saju.transitMonth6

  return (
    <section>
      <div className="flex items-center gap-3 mb-2">
        <h3 className="text-base font-medium text-base-content">{t.saju.transitTitle}</h3>
        <select
          value={months}
          onChange={e => setMonths(Number(e.target.value))}
          className="select select-bordered select-sm"
        >
          <option value={1}>{t.saju.transitMonth1}</option>
          <option value={3}>{t.saju.transitMonth3}</option>
          <option value={6}>{t.saju.transitMonth6}</option>
        </select>
        <button
          onClick={() => setBackward(!backward)}
          className={`btn btn-sm ${backward ? 'btn-active' : 'btn-ghost'}`}
        >
          {backward ? t.saju.transitPast : t.saju.transitFuture}
        </button>
      </div>

      {transits.length === 0 ? (
        <p className="text-base text-base-content/60">({monthLabel} {t.saju.transitNoRelations})</p>
      ) : (
        <div className="text-sm space-y-0.5 max-h-80 overflow-y-auto">
          {transits.map((tr, i) => {
            const dateStr = formatDate(tr.date)
            const relStrs = tr.relations.map(r => `${r.prefix}${formatRelation(r.relation)}`)

            return (
              <div key={i} className="flex items-baseline gap-2 text-base-content/80">
                <span className="text-base-content/60 w-16 shrink-0">{dateStr}</span>
                <span className={`w-8 shrink-0 ${tr.type === '月運' ? 'text-info' : ''}`}>
                  {tr.type}
                </span>
                <span className="font-hanja shrink-0 whitespace-nowrap">{tr.transit}</span>
                <span className="text-base-content/60">↔</span>
                <span className="w-8 shrink-0">{tr.natalName}</span>
                <span>{relStrs.join(', ')}</span>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
