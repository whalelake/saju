import type { SpecialSals } from '@orrery/core/types'
import { useI18n } from '../../i18n'

interface Props {
  sals: SpecialSals
}

interface SalEntry {
  label: string
  type: 'good' | 'bad'
}

export default function SinsalList({ sals }: Props) {
  const { t } = useI18n()
  const PILLAR_LABELS = [t.saju.hourPillar, t.saju.dayPillar, t.saju.monthPillar, t.saju.yearPillar]

  const items: SalEntry[] = []

  // 길신 (吉神)
  if (sals.cheonul.length > 0) {
    const pos = sals.cheonul.map(i => PILLAR_LABELS[i]).join(',')
    items.push({ label: `${t.saju.cheonul}(${pos})`, type: 'good' })
  }
  if (sals.cheonduk.length > 0) {
    const pos = sals.cheonduk.map(i => PILLAR_LABELS[i]).join(',')
    items.push({ label: `${t.saju.cheonduk}(${pos})`, type: 'good' })
  }
  if (sals.wolduk.length > 0) {
    const pos = sals.wolduk.map(i => PILLAR_LABELS[i]).join(',')
    items.push({ label: `${t.saju.wolduk}(${pos})`, type: 'good' })
  }
  if (sals.munchang.length > 0) {
    const pos = sals.munchang.map(i => PILLAR_LABELS[i]).join(',')
    items.push({ label: `${t.saju.munchang}(${pos})`, type: 'good' })
  }
  if (sals.geumyeo.length > 0) {
    const pos = sals.geumyeo.map(i => PILLAR_LABELS[i]).join(',')
    items.push({ label: `${t.saju.geumyeo}(${pos})`, type: 'good' })
  }

  // 흉신 (凶神)
  if (sals.yangin.length > 0) {
    const pos = sals.yangin.map(i => PILLAR_LABELS[i]).join(',')
    items.push({ label: `${t.saju.yangin}(${pos})`, type: 'bad' })
  }
  if (sals.dohwa.length > 0) {
    const pos = sals.dohwa.map(i => PILLAR_LABELS[i]).join(',')
    items.push({ label: `${t.saju.dohwa}(${pos})`, type: 'bad' })
  }
  if (sals.baekho) items.push({ label: t.saju.baekho, type: 'bad' })
  if (sals.goegang) items.push({ label: t.saju.goegang, type: 'bad' })
  if (sals.hongyeom) items.push({ label: t.saju.hongyeom, type: 'bad' })

  if (items.length === 0) return null

  return (
    <section>
      <h3 className="text-base font-medium text-base-content mb-2">{t.saju.sinsalTitle}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <span
            key={item.label}
            className={`text-base px-2 py-0.5 rounded ${
              item.type === 'good'
                ? 'bg-info/10 text-info'
                : 'bg-error/10 text-error'
            }`}
          >
            {item.label}
          </span>
        ))}
      </div>
    </section>
  )
}
