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
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-base text-amber-800 font-medium">
          {t.ziwei.requireTime}
        </p>
        <p className="text-base text-amber-600 mt-1">
          {t.ziwei.requireTimeDesc}
        </p>
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
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-base font-medium text-gray-700">{t.ziwei.title}</h2>
          <CopyButton getText={() => ziweiToText(chart)} label={t.results.copyForAI} />
        </div>
        <MingPanGrid chart={chart} />
      </div>

      {/* 사화 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <SihuaSummary chart={chart} />
      </div>

      {/* 대한 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <DaxianTable chart={chart} />
      </div>

      {/* 유년 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <LiunianView chart={chart} />
      </div>
    </div>
  )
}
