import type { PlanetPosition, NatalAngles } from '@orrery/core/types'
import { PLANET_SYMBOLS, PLANET_KO, ZODIAC_SYMBOLS, ZODIAC_KO, ROMAN, formatDegree } from '@orrery/core/natal'
import { useI18n } from '../../i18n'

interface Props {
  planets: PlanetPosition[]
  angles: NatalAngles | null
}

export default function PlanetTable({ planets, angles }: Props) {
  const { t } = useI18n()
  const showHouse = planets.some(p => p.house != null)

  return (
    <div>
      <h3 className="text-sm font-medium text-base-content/70 mb-2">{t.natal.planets}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-base">
          <thead>
            <tr className="text-sm text-base-content/60 border-b border-base-200">
              <th className="text-left py-1 pr-2">{t.natal.planet}</th>
              <th className="text-left py-1 pr-2">{t.natal.sign}</th>
              <th className="text-right py-1 pr-2">{t.natal.degree}</th>
              <th className="text-center py-1 pr-2">Rx</th>
              {showHouse && <th className="text-center py-1">{t.natal.house}</th>}
            </tr>
          </thead>
          <tbody>
            {planets.map(p => (
              <tr key={p.id} className="border-b border-base-200">
                <td className="py-1.5 pr-2">
                  <span className="mr-1">{PLANET_SYMBOLS[p.id]}</span>
                  <span className="text-base-content/80">{PLANET_KO[p.id]}</span>
                </td>
                <td className="py-1.5 pr-2 whitespace-nowrap">
                  <span className="mr-1">{ZODIAC_SYMBOLS[p.sign]}</span>
                  <span className="text-base-content/80 sm:hidden">{ZODIAC_KO[p.sign].slice(0, -2)}</span>
                  <span className="text-base-content/80 hidden sm:inline">{ZODIAC_KO[p.sign]}</span>
                </td>
                <td className="py-1.5 pr-2 text-right font-mono text-base-content">
                  {formatDegree(p.longitude)}
                </td>
                <td className="py-1.5 pr-2 text-center text-red-500">
                  {p.isRetrograde ? 'R' : ''}
                </td>
                {showHouse && (
                  <td className="py-1.5 text-center text-base-content/80">
                    {p.house != null ? ROMAN[p.house - 1] : ''}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Angles — 시간 있을 때만 */}
      {angles && (
        <div className="mt-3 pt-3 border-t border-base-200">
          <h3 className="text-sm font-medium text-base-content/70 mb-2">{t.natal.angles}</h3>
          <div className="grid grid-cols-2 gap-2 text-base">
            {([
              ['ASC', angles.asc],
              ['MC', angles.mc],
              ['DESC', angles.desc],
              ['IC', angles.ic],
            ] as const).map(([label, a]) => (
              <div key={label} className="flex items-center gap-2 whitespace-nowrap">
                <span className="font-medium text-base-content w-10">{label}</span>
                <span>{ZODIAC_SYMBOLS[a.sign]}</span>
                <span className="text-base-content/80 sm:hidden">{ZODIAC_KO[a.sign].slice(0, -2)}</span>
                <span className="text-base-content/80 hidden sm:inline">{ZODIAC_KO[a.sign]}</span>
                <span className="font-mono text-base-content">{formatDegree(a.longitude)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
