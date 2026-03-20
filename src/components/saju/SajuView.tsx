import { useMemo } from 'react'
import { calculateSaju } from '@orrery/core/saju'
import PillarTable from './PillarTable.tsx'
import RelationList from './RelationList.tsx'
import SinsalList from './SinsalList.tsx'
import JwabeopChart from './JwabeopChart.tsx'
import InjongbeopChart from './InjongbeopChart.tsx'
import DaewoonTable from './DaewoonTable.tsx'
import TransitView from './TransitView.tsx'
import CopyButton from '../CopyButton.tsx'
import { sajuToText } from '../../utils/text-export.ts'
import { useI18n } from '../../i18n'
import type { BirthInput } from '@orrery/core/types'

interface Props {
  input: BirthInput
}

export default function SajuView({ input }: Props) {
  const { t } = useI18n()
  const result = useMemo(() => calculateSaju(input), [input])

  const ganzis = result.pillars.map(p => p.pillar.ganzi)
  const natalPillars = ganzis // [시, 일, 월, 년]

  return (
    <div className="space-y-6">
      {/* 출생 정보 */}
      {input.cityName && (
        <div className="text-sm text-base-content/60 flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{input.cityName}</span>
        </div>
      )}

      {/* 명식 테이블 */}
      <section className="bg-base-100 rounded-lg border-oriental p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-medium text-base-content">{t.saju.title}</h2>
          <CopyButton getText={() => sajuToText(result)} label={t.results.copyForAI} />
        </div>
        <PillarTable pillars={result.pillars} unknownTime={input.unknownTime} />
      </section>

      {/* 팔자 관계 */}
      <div className="bg-base-100 rounded-lg border-oriental p-4">
        <RelationList relations={result.relations} pillars={ganzis} />
      </div>

      {/* 신살 */}
      <div className="bg-base-100 rounded-lg border-oriental p-4">
        <SinsalList sals={result.specialSals} />
      </div>

      {/* 좌법 · 인종법 */}
      <div className="bg-base-100 rounded-lg border-oriental p-4 space-y-4">
        <JwabeopChart jwabeop={result.jwabeop} pillars={result.pillars} unknownTime={input.unknownTime} />
        <InjongbeopChart injongbeop={result.injongbeop} pillars={result.pillars} />
      </div>

      {/* 대운 */}
      <div className="bg-base-100 rounded-lg border-oriental p-4">
        <DaewoonTable daewoon={result.daewoon} unknownTime={input.unknownTime} />
      </div>

      {/* 트랜짓 */}
      <div className="bg-base-100 rounded-lg border-oriental p-4">
        <TransitView natalPillars={natalPillars} />
      </div>
    </div>
  )
}
