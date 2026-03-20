import { useMemo } from 'react'
import { createChart } from '@orrery/core/ziwei'
import MingPanGrid from './MingPanGrid.tsx'
import SihuaSummary from './SihuaSummary.tsx'
import DaxianTable from './DaxianTable.tsx'
import LiunianView from './LiunianView.tsx'
import CopyButton from '../CopyButton.tsx'
import { ziweiToText } from '../../utils/text-export.ts'
import { useI18n } from '../../i18n'
import type { BirthInput } from '@orrery/core/types'

interface Props {
  input: BirthInput
}

export default function ZiweiView({ input }: Props) {
  const { t } = useI18n()

  if (input.unknownTime) {
    return (
      <div className="alert alert-warning">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div>
          <p className="font-medium">{t.ziwei.requireTime}</p>
          <p className="text-sm opacity-80">{t.ziwei.requireTimeDesc}</p>
        </div>
      </div>
    )
  }

  const chart = useMemo(
    () => createChart(input.year, input.month, input.day, input.hour, input.minute, input.gender === 'M'),
    [input],
  )

  return (
    <div className="space-y-6">
      {/* 命盤 그리드 (기본 정보 + 12궁) */}
      <div className="bg-base-100 rounded-lg border-oriental p-4">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-base font-medium text-base-content">{t.ziwei.title}</h2>
          <CopyButton getText={() => ziweiToText(chart)} label={t.results.copyForAI} />
        </div>
        <MingPanGrid chart={chart} />
      </div>

      {/* 사화 */}
      <div className="bg-base-100 rounded-lg border-oriental p-4">
        <SihuaSummary chart={chart} />
      </div>

      {/* 대한 */}
      <div className="bg-base-100 rounded-lg border-oriental p-4">
        <DaxianTable chart={chart} />
      </div>

      {/* 유년 */}
      <div className="bg-base-100 rounded-lg border-oriental p-4">
        <LiunianView chart={chart} />
      </div>
    </div>
  )
}
