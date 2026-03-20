import { useEffect, useState } from 'react'
import { calculateNatal, HOUSE_SYSTEMS } from '@orrery/core/natal'
import PlanetTable from './PlanetTable.tsx'
import HouseTable from './HouseTable.tsx'
import AspectGrid from './AspectGrid.tsx'
import NatalWheel from './wheel/NatalWheel.tsx'
import CopyButton from '../CopyButton.tsx'
import { natalToText } from '../../utils/text-export.ts'
import { useI18n } from '../../i18n'
import type { BirthInput, NatalChart } from '@orrery/core/types'

interface Props {
  input: BirthInput
}

export default function NatalView({ input }: Props) {
  const { t } = useI18n()
  const [chart, setChart] = useState<NatalChart | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [houseSystem, setHouseSystem] = useState('P')

  const unknownTime = !!input.unknownTime

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setChart(null)

    calculateNatal(input, houseSystem)
      .then(result => {
        if (!cancelled) {
          setChart(result)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err))
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [input, houseSystem])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3 text-base text-base-content/70">
          <span className="loading loading-spinner loading-md text-primary" />
          {t.natal.loading}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p className="font-medium">{t.natal.error}</p>
          <p className="text-sm opacity-80">{error}</p>
        </div>
      </div>
    )
  }

  if (!chart) return null

  const houseSystemName = HOUSE_SYSTEMS.find(([k]) => k === houseSystem)?.[1] ?? 'Placidus'

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

      {/* 시간 모름 안내 */}
      {unknownTime && (
        <div className="alert alert-warning">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <p className="font-medium">{t.natal.noTimeWarning}</p>
            <p className="text-sm opacity-80">{t.natal.noTimeDesc}</p>
          </div>
        </div>
      )}

      {/* Wheel Chart — 시간 있을 때만 */}
      {!unknownTime && (
        <div className="bg-base-100 rounded-lg border-oriental p-4">
          <NatalWheel chart={chart} />
        </div>
      )}

      {/* Planets + Angles */}
      <section className="bg-base-100 rounded-lg border-oriental p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 sm:gap-3">
            <h2 className="text-base font-medium text-base-content">{t.natal.title}</h2>
            {!unknownTime && (
              <label className="flex items-center gap-1.5 text-sm text-base-content/60 sm:ml-2">
                {t.natal.house}
                <select
                  value={houseSystem}
                  onChange={e => setHouseSystem(e.target.value)}
                  className="select select-bordered select-sm"
                >
                {HOUSE_SYSTEMS.map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
                </select>
              </label>
            )}
          </div>
          <CopyButton getText={() => natalToText(chart, houseSystemName)} label={t.results.copyForAI} />
        </div>
        <PlanetTable planets={chart.planets} angles={chart.angles} />
      </section>

      {/* Houses — 시간 있을 때만 */}
      {!unknownTime && chart.houses.length > 0 && (
        <div className="bg-base-100 rounded-lg border-oriental p-4">
          <h3 className="text-sm font-medium text-base-content/70 mb-2">{t.natal.houses}</h3>
          <HouseTable houses={chart.houses} />
        </div>
      )}

      {/* Aspects */}
      <div className="bg-base-100 rounded-lg border-oriental p-4">
        <AspectGrid aspects={chart.aspects} />
      </div>
    </div>
  )
}
