interface TermsOfServiceProps {
  isOpen: boolean
  onClose: () => void
}

export default function TermsOfService({ isOpen, onClose }: TermsOfServiceProps) {
  if (!isOpen) return null

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl max-h-[80vh]">
        <h2 className="text-xl font-bold mb-4">이용약관</h2>

        <div className="prose prose-sm max-w-none overflow-y-auto">
          <p className="text-sm text-base-content/70 mb-4">
            시행일: 2025년 3월 18일
          </p>

          <h3>제1조 (목적)</h3>
          <p>
            이 약관은 혼천의(이하 "서비스")가 제공하는 사주팔자, 자미두수, 출생차트 계산 서비스의
            이용조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
          </p>

          <h3>제2조 (서비스의 내용)</h3>
          <p>서비스는 다음의 기능을 무료로 제공합니다:</p>
          <ul>
            <li>사주팔자(四柱八字) 계산 및 십신, 운성, 대운 분석</li>
            <li>자미두수(紫微斗數) 명반 생성 및 주성, 사화 분석</li>
            <li>서양 점성술 출생차트(Natal Chart) 계산</li>
            <li>AI 기반 명식 해석 (OpenAI API 활용)</li>
            <li>궁합 비교 기능</li>
            <li>기록 저장 및 공유 기능</li>
          </ul>

          <h3>제3조 (서비스 이용)</h3>
          <p>
            서비스는 별도의 회원가입 없이 누구나 이용할 수 있습니다.
            모든 계산은 사용자의 브라우저에서 실행되며, 서버에 개인정보가 저장되지 않습니다.
          </p>

          <h3>제4조 (면책조항)</h3>
          <ol>
            <li>
              서비스가 제공하는 사주, 자미두수, 점성술 해석은 <strong>오락 및 참고 목적</strong>으로만
              제공됩니다. 중요한 의사결정에 이를 근거로 삼는 것은 권장하지 않습니다.
            </li>
            <li>
              AI 해석 결과는 인공지능에 의해 생성된 것으로, 전문 상담사의 조언을 대체하지 않습니다.
            </li>
            <li>
              서비스 이용으로 인해 발생하는 어떠한 직접적, 간접적 손해에 대해서도 책임지지 않습니다.
            </li>
            <li>
              계산 결과의 정확성을 보장하지 않으며, 다른 도구나 전문가의 해석과 차이가 있을 수 있습니다.
            </li>
          </ol>

          <h3>제5조 (지식재산권)</h3>
          <p>
            서비스의 소스 코드는 AGPL-3.0 라이선스에 따라 공개되어 있습니다.
            누구나 GitHub에서 소스 코드를 확인하고 기여할 수 있습니다.
          </p>
          <p>
            <a href="https://github.com/whalelake/saju" target="_blank" rel="noopener noreferrer" className="link">
              https://github.com/whalelake/saju
            </a>
          </p>

          <h3>제6조 (서비스 변경 및 중단)</h3>
          <p>
            서비스는 별도의 공지 없이 기능을 변경하거나 서비스를 중단할 수 있습니다.
            이로 인한 손해에 대해 책임지지 않습니다.
          </p>

          <h3>제7조 (준거법)</h3>
          <p>
            이 약관의 해석 및 적용에 관하여는 대한민국 법률을 준거법으로 합니다.
          </p>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>닫기</button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  )
}
