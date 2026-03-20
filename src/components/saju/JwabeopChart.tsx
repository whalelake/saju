import type { JwaEntry, PillarDetail } from '@orrery/core/types'
import { stemColorClass } from '../../utils/format.ts'
import { useI18n } from '../../i18n'

interface Props {
  jwabeop: JwaEntry[][]   // [시, 일, 월, 년]
  pillars: PillarDetail[]
  unknownTime?: boolean
}

export default function JwabeopChart({ jwabeop, pillars, unknownTime }: Props) {
  const { t } = useI18n()
  const LABELS = [t.saju.hourPillar, t.saju.dayPillar, t.saju.monthPillar, t.saju.yearPillar]

  // 최대 지장간 수 (행 수)
  const maxRows = Math.max(...jwabeop.map(entries => entries.length))
  if (maxRows === 0) return null

  return (
    <section>
      <h3 className="text-base font-medium text-base-content mb-2">{t.saju.jwabeopTitle}</h3>
      <p className="text-sm text-base-content/60 mb-2">{t.saju.jwabeopDesc}</p>
      <div className="overflow-x-auto">
        <table className="w-full text-center text-base font-hanja">
          <thead>
            <tr className="text-sm text-base-content/70">
              {LABELS.map((label, i) => (
                <th key={label} className="py-1 px-2 font-normal">
                  {i === 0 && unknownTime ? '' : `${label} ${pillars[i].pillar.branch}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxRows }, (_, row) => (
              <tr key={row}>
                {jwabeop.map((entries, col) => {
                  if (col === 0 && unknownTime) {
                    return <td key={col} className="py-0.5 px-2 text-base-content/40">?</td>
                  }
                  const entry = entries[row]
                  if (!entry) return <td key={col} className="py-0.5 px-2" />
                  return (
                    <td key={col} className="py-0.5 px-2">
                      <span className={`${stemColorClass(entry.stem)}`}>{entry.stem}</span>
                      <span className="text-base-content/70 text-sm ml-1">{entry.sipsin}</span>
                      <span className="text-base-content/60 text-sm ml-1">{entry.unseong}{t.saju.seated}</span>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
