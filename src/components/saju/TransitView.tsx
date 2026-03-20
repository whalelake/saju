import { useState, useMemo } from 'react'
import { findTransits } from '@orrery/core/pillars'
import { formatRelation } from '../../utils/format.ts'
import type { TransitItem } from '@orrery/core/types'

interface Props {
  natalPillars: string[]  // [시주, 일주, 월주, 년주]
}

export default function TransitView({ natalPillars }: Props) {
  const [months, setMonths] = useState(1)
  const [backward, setBackward] = useState(false)

  const transits = useMemo(
    () => findTransits(natalPillars, months, backward),
    [natalPillars, months, backward],
  )

  const direction = backward ? '과거' : '향후'

  return (
    <section>
      <div className="flex items-center gap-3 mb-2">
        <h3 className="text-base font-medium text-base-content">運勢</h3>
        <select
          value={months}
          onChange={e => setMonths(Number(e.target.value))}
          className="select select-bordered select-sm"
        >
          <option value={1}>1개월</option>
          <option value={3}>3개월</option>
          <option value={6}>6개월</option>
        </select>
        <button
          onClick={() => setBackward(!backward)}
          className={`btn btn-sm ${backward ? 'btn-active' : 'btn-ghost'}`}
        >
          {backward ? '과거' : '미래'}
        </button>
      </div>

      {transits.length === 0 ? (
        <p className="text-base text-base-content/60">({direction} {months}개월간 특별한 관계 없음)</p>
      ) : (
        <div className="text-sm space-y-0.5 max-h-80 overflow-y-auto">
          {transits.map((tr, i) => {
            const date = tr.date
            const dateStr = `${String(date.getMonth() + 1).padStart(2, ' ')}월 ${String(date.getDate()).padStart(2, ' ')}일`
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
