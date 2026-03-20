import type { NatalHouse } from '@orrery/core/types'
import { ZODIAC_SYMBOLS, ZODIAC_KO, ROMAN, formatDegree } from '@orrery/core/natal'

interface Props {
  houses: NatalHouse[]
}

export default function HouseTable({ houses }: Props) {
  const left = houses.slice(0, 6)
  const right = houses.slice(6)

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4">
        {[left, right].map((col, ci) => (
          <table key={ci} className="w-full text-base">
            <tbody>
              {col.map(h => (
                <tr key={h.number} className="border-b border-base-200">
                  <td className="py-1 pr-2 font-medium text-base-content/70 w-8 text-right">
                    {ROMAN[h.number - 1]}
                  </td>
                  <td className="py-1 pr-1">{ZODIAC_SYMBOLS[h.sign]}</td>
                  <td className="py-1 pr-2 text-base-content/80 whitespace-nowrap">
                    <span className="sm:hidden">{ZODIAC_KO[h.sign].slice(0, -2)}</span>
                    <span className="hidden sm:inline">{ZODIAC_KO[h.sign]}</span>
                  </td>
                  <td className="py-1 text-right font-mono text-base-content">
                    {formatDegree(h.cuspLongitude)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </div>
  )
}
