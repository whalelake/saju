import { useState, useRef } from 'react'
import type { BirthInput } from '@orrery/core/types'
import { calculateSaju } from '@orrery/core/saju'

interface Props {
  input: BirthInput
  isOpen: boolean
  onClose: () => void
}

export default function ShareCard({ input, isOpen, onClose }: Props) {
  const [copied, setCopied] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  if (!isOpen) return null

  const saju = calculateSaju(input)
  // pillars 배열 인덱스: [시=0, 일=1, 월=2, 년=3]
  const yearPillar = saju.pillars[3]?.pillar
  const monthPillar = saju.pillars[2]?.pillar
  const dayPillar = saju.pillars[1]?.pillar
  const hourPillar = saju.pillars[0]?.pillar

  function formatDate() {
    const y = input.year
    const m = String(input.month).padStart(2, '0')
    const d = String(input.day).padStart(2, '0')
    return `${y}년 ${m}월 ${d}일`
  }

  async function handleShare() {
    const shareData = {
      title: '나의 사주팔자',
      text: `${formatDate()} 생 (${input.gender === 'M' ? '남' : '여'})\n사주: ${yearPillar?.stem}${yearPillar?.branch} ${monthPillar?.stem}${monthPillar?.branch} ${dayPillar?.stem}${dayPillar?.branch} ${hourPillar?.stem}${hourPillar?.branch}`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        // 취소됨
      }
    } else {
      // 폴백: 클립보드 복사
      await navigator.clipboard.writeText(`${shareData.text}\n\n${shareData.url}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  async function handleCopyLink() {
    const url = window.location.href
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleTwitter() {
    const text = encodeURIComponent(`나의 사주: ${yearPillar?.stem}${yearPillar?.branch} ${monthPillar?.stem}${monthPillar?.branch} ${dayPillar?.stem}${dayPillar?.branch} ${hourPillar?.stem}${hourPillar?.branch}`)
    const url = encodeURIComponent(window.location.href)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  function handleKakao() {
    // 카카오 공유는 SDK 필요, 일단 클립보드로 대체
    handleCopyLink()
  }

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-md">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="font-bold text-lg mb-4">공유하기</h3>

        {/* 미리보기 카드 */}
        <div
          ref={cardRef}
          className="card bg-gradient-to-br from-primary/10 to-secondary/10 border border-base-300 p-4 mb-4"
        >
          <div className="text-center">
            <p className="text-sm text-base-content/60 mb-2">
              {formatDate()} ({input.gender === 'M' ? '남' : '여'})
            </p>
            <div className="flex justify-center gap-2 font-hanja text-2xl">
              <div className="flex flex-col items-center">
                <span className="text-sm text-base-content/50">년</span>
                <span>{yearPillar?.stem}{yearPillar?.branch}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm text-base-content/50">월</span>
                <span>{monthPillar?.stem}{monthPillar?.branch}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm text-base-content/50">일</span>
                <span>{dayPillar?.stem}{dayPillar?.branch}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm text-base-content/50">시</span>
                <span>{hourPillar?.stem}{hourPillar?.branch}</span>
              </div>
            </div>
            <p className="text-xs text-base-content/40 mt-3">
              saju-wheat.vercel.app
            </p>
          </div>
        </div>

        {/* 공유 버튼들 */}
        <div className="grid grid-cols-2 gap-2">
          <button className="btn btn-outline gap-2" onClick={handleShare}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            공유
          </button>
          <button className="btn btn-outline gap-2" onClick={handleCopyLink}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {copied ? '복사됨!' : '링크 복사'}
          </button>
          <button className="btn btn-info gap-2" onClick={handleTwitter}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X (트위터)
          </button>
          <button className="btn btn-warning gap-2" onClick={handleKakao}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054-.188.702-.682 2.545-.782 2.94-.123.49.18.483.378.351.156-.103 2.5-1.7 3.515-2.388.533.078 1.082.118 1.619.118 4.97 0 9-3.186 9-7.075C21 6.185 16.97 3 12 3z" />
            </svg>
            카카오톡
          </button>
        </div>

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
