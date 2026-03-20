import type { ZiweiChart } from '@orrery/core/types'
import { useI18n } from '../../i18n'

interface Props {
  chart: ZiweiChart
}

export default function SihuaSummary({ chart }: Props) {
  const { t } = useI18n()
  const siHuaInfo: Record<string, { star: string; palace: string } | null> = {
    '化祿': null, '化權': null, '化科': null, '化忌': null,
  }

  for (const palace of Object.values(chart.palaces)) {
    for (const star of palace.stars) {
      if (star.siHua) {
        siHuaInfo[star.siHua] = { star: star.name, palace: palace.name }
      }
    }
  }

  const colorMap: Record<string, string> = {
    '化祿': 'text-green-600',
    '化權': 'text-yellow-600',
    '化科': 'text-blue-600',
    '化忌': 'text-red-600',
  }

  return (
    <section>
      <h3 className="text-base font-medium text-base-content mb-2">{t.ziwei.sihua}</h3>
      <div className="space-y-0.5">
        {Object.entries(siHuaInfo).map(([huaType, info]) => {
          if (!info) return null
          return (
            <div key={huaType} className="text-base text-base-content/80">
              <span className={colorMap[huaType] || ''}>{huaType}</span>
              <span className="text-base-content/60 mx-1">:</span>
              <span className="font-hanja">{info.star}</span>
              <span className="text-base-content/60 mx-1">在</span>
              <span>{info.palace}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
