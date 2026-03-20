import type { InjongEntry, PillarDetail } from '@orrery/core/types'
import { ELEMENT_HANJA } from '@orrery/core/constants'
import { STEM_INFO } from '@orrery/core/constants'
import { stemColorClass } from '../../utils/format.ts'
import { useI18n } from '../../i18n'

interface Props {
  injongbeop: InjongEntry[]
  pillars: PillarDetail[] // [시, 일, 월, 년]
}

export default function InjongbeopChart({ injongbeop, pillars }: Props) {
  const { t } = useI18n()

  if (injongbeop.length === 0) return null

  const dayBranch = pillars[1].pillar.branch
  const jigang = pillars[1].jigang.replace(/ /g, '')

  // 일지 지장간의 십신 요약
  const jigangSummary = [...jigang].map(stem => {
    const info = STEM_INFO[stem]
    const el = info ? ELEMENT_HANJA[info.element] : '?'
    return `${stem}${el}`
  }).join(' ')

  return (
    <section>
      <h3 className="text-base font-medium text-base-content mb-2">{t.saju.injongbeopTitle}</h3>
      <p className="text-sm text-base-content/60 mb-2">
        {t.saju.injongbeopDayBranch} <span className="font-hanja">{dayBranch}</span> {t.saju.injongbeopHiddenStems}:
        <span className="font-hanja ml-1">{jigangSummary}</span>
        — {t.saju.injongbeopMissingDesc}
      </p>
      <div className="flex flex-wrap gap-3">
        {injongbeop.map(entry => (
          <div
            key={entry.category}
            className="flex items-center gap-1.5 text-base border border-base-300 rounded px-2.5 py-1.5"
          >
            <span className={`font-hanja ${stemColorClass(entry.yangStem)}`}>
              {entry.yangStem}{ELEMENT_HANJA[STEM_INFO[entry.yangStem]?.element ?? ''] ?? ''}
            </span>
            <span className="text-base-content/70 font-hanja">{entry.category}</span>
            <span className="text-base-content/60">→</span>
            <span className="font-hanja">{entry.unseong}{t.saju.follows}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
