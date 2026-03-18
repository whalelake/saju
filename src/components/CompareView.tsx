import { useState } from 'react'
import type { BirthInput } from '@orrery/core/types'
import { calculateSaju } from '@orrery/core/saju'
import BirthForm from './BirthForm.tsx'

interface Props {
  isOpen: boolean
  onClose: () => void
  initialInput?: BirthInput | null
}

export default function CompareView({ isOpen, onClose, initialInput }: Props) {
  const [person1, setPerson1] = useState<BirthInput | null>(initialInput || null)
  const [person2, setPerson2] = useState<BirthInput | null>(null)
  const [activeForm, setActiveForm] = useState<1 | 2>(initialInput ? 2 : 1)

  if (!isOpen) return null

  const saju1 = person1 ? calculateSaju(person1) : null
  const saju2 = person2 ? calculateSaju(person2) : null

  // pillars 배열: [시, 일, 월, 년] 순서
  const getPillar = (saju: typeof saju1, index: number) => saju?.pillars[index]?.pillar

  function getCompatibilityScore(): number {
    if (!saju1 || !saju2) return 0

    // 간단한 궁합 점수 계산 (실제로는 더 복잡한 로직 필요)
    let score = 50 // 기본 점수

    // 일간(day master) 궁합 - 일주는 index 1
    const dm1 = getPillar(saju1, 1)?.stem || ''
    const dm2 = getPillar(saju2, 1)?.stem || ''

    // 오행 상생 관계 체크
    const elements: Record<string, string> = {
      '甲': '木', '乙': '木',
      '丙': '火', '丁': '火',
      '戊': '土', '己': '土',
      '庚': '金', '辛': '金',
      '壬': '水', '癸': '水',
    }

    const e1 = elements[dm1]
    const e2 = elements[dm2]

    // 상생 관계
    const generating: Record<string, string> = {
      '木': '火', '火': '土', '土': '金', '金': '水', '水': '木'
    }

    if (generating[e1] === e2 || generating[e2] === e1) {
      score += 20 // 상생
    } else if (e1 === e2) {
      score += 10 // 같은 오행
    }

    // 지지 합 체크 (간략화)
    const branch1 = getPillar(saju1, 1)?.branch || ''
    const branch2 = getPillar(saju2, 1)?.branch || ''

    const liuhe = [
      ['子', '丑'], ['寅', '亥'], ['卯', '戌'],
      ['辰', '酉'], ['巳', '申'], ['午', '未']
    ]

    for (const pair of liuhe) {
      if ((pair[0] === branch1 && pair[1] === branch2) ||
          (pair[1] === branch1 && pair[0] === branch2)) {
        score += 15
        break
      }
    }

    return Math.min(100, Math.max(0, score))
  }

  function renderPillarComparison() {
    if (!saju1 || !saju2) return null

    // pillars 배열 인덱스: [시=0, 일=1, 월=2, 년=3]
    const pillarIndices = [3, 2, 1, 0] as const  // 년, 월, 일, 시 순서로 표시
    const labels = ['년주', '월주', '일주', '시주']

    return (
      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th></th>
              {labels.map((label, i) => (
                <th key={i} className="text-center font-hanja">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-medium">
                {person1?.gender === 'M' ? '남' : '여'} 1
              </td>
              {pillarIndices.map((idx, i) => (
                <td key={i} className="text-center font-hanja text-lg">
                  {saju1.pillars[idx]?.pillar.stem}{saju1.pillars[idx]?.pillar.branch}
                </td>
              ))}
            </tr>
            <tr>
              <td className="font-medium">
                {person2?.gender === 'M' ? '남' : '여'} 2
              </td>
              {pillarIndices.map((idx, i) => (
                <td key={i} className="text-center font-hanja text-lg">
                  {saju2.pillars[idx]?.pillar.stem}{saju2.pillars[idx]?.pillar.branch}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  const score = getCompatibilityScore()

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-3xl max-h-[90vh] overflow-y-auto">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
          <span className="font-hanja gold-accent text-xl">合</span>
          궁합 비교
        </h3>

        {/* 입력 폼 탭 */}
        {(!person1 || !person2) && (
          <div className="mb-6">
            <div role="tablist" className="tabs tabs-bordered mb-4">
              <button
                role="tab"
                className={`tab ${activeForm === 1 ? 'tab-active' : ''}`}
                onClick={() => setActiveForm(1)}
              >
                첫 번째 사람 {person1 && '✓'}
              </button>
              <button
                role="tab"
                className={`tab ${activeForm === 2 ? 'tab-active' : ''}`}
                onClick={() => setActiveForm(2)}
              >
                두 번째 사람 {person2 && '✓'}
              </button>
            </div>

            {activeForm === 1 && (
              <BirthForm
                onSubmit={(input) => {
                  setPerson1(input)
                  setActiveForm(2)
                }}
              />
            )}
            {activeForm === 2 && (
              <BirthForm
                onSubmit={(input) => {
                  setPerson2(input)
                }}
              />
            )}
          </div>
        )}

        {/* 결과 */}
        {person1 && person2 && (
          <div className="space-y-6">
            {/* 궁합 점수 */}
            <div className="text-center">
              <div className="radial-progress text-primary" style={{ '--value': score, '--size': '8rem' } as React.CSSProperties}>
                <span className="text-2xl font-bold">{score}%</span>
              </div>
              <p className="mt-2 text-lg font-medium">
                {score >= 80 && '천생연분'}
                {score >= 60 && score < 80 && '좋은 궁합'}
                {score >= 40 && score < 60 && '보통'}
                {score < 40 && '노력 필요'}
              </p>
            </div>

            {/* 사주 비교 */}
            {renderPillarComparison()}

            {/* 다시 비교 버튼 */}
            <div className="flex justify-center gap-2">
              <button
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setPerson1(null)
                  setPerson2(null)
                  setActiveForm(1)
                }}
              >
                새로 비교하기
              </button>
            </div>
          </div>
        )}

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  )
}
