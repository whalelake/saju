function ExampleBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-base-200/50 rounded-lg px-3 py-2 text-sm text-base-content/70 leading-relaxed border border-dashed border-base-300">
      {children}
    </div>
  )
}

export default function Guide() {
  return (
    <div className="collapse collapse-arrow bg-base-100 border-oriental">
      <input type="checkbox" />
      <div className="collapse-title font-medium flex items-center gap-2">
        <svg className="w-5 h-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
        사용 가이드
      </div>
      <div className="collapse-content">
        <div className="pt-2 space-y-4">
          {/* 기본 사용법 */}
          <ul className="steps steps-vertical text-sm">
            <li className="step step-primary">
              <span className="text-left">생년월일, 태어난 시간, 성별을 입력합니다.</span>
            </li>
            <li className="step step-primary">
              <span className="text-left"><kbd className="kbd kbd-sm">명식 계산</kbd> 버튼을 누릅니다.</span>
            </li>
            <li className="step step-primary">
              <span className="text-left">탭을 전환하며 사주팔자, 자미두수, 출생차트를 확인합니다.</span>
            </li>
            <li className="step step-primary">
              <span className="text-left"><kbd className="kbd kbd-sm">AI 해석</kbd> 버튼으로 AI가 명식을 분석해드립니다.</span>
            </li>
          </ul>

          <div className="divider text-xs text-base-content/40">주요 기능</div>

          {/* 주요 기능 설명 */}
          <div className="grid gap-3">
            <div className="flex gap-3 items-start">
              <span className="badge badge-primary badge-sm shrink-0">AI 해석</span>
              <span className="text-sm text-base-content/70">
                성격 분석, 인생 조언 등 다양한 해석을 AI가 제공합니다.
              </span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="badge badge-secondary badge-sm shrink-0 font-hanja">合 궁합</span>
              <span className="text-sm text-base-content/70">
                두 사람의 사주를 비교하여 궁합 점수와 분석을 확인합니다.
              </span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="badge badge-accent badge-sm shrink-0">기록</span>
              <span className="text-sm text-base-content/70">
                최근 계산한 명식이 자동 저장되어 빠르게 다시 볼 수 있습니다.
              </span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="badge badge-ghost badge-sm shrink-0">공유</span>
              <span className="text-sm text-base-content/70">
                결과를 SNS에 공유하거나 링크를 복사할 수 있습니다.
              </span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="badge badge-ghost badge-sm shrink-0">복사</span>
              <span className="text-sm text-base-content/70">
                명식 데이터를 텍스트로 복사해 다른 AI에게 직접 질문할 수 있습니다.
              </span>
            </div>
          </div>

          <div className="divider text-xs text-base-content/40">직접 AI에게 질문하기</div>

          {/* AI 프롬프트 예시 */}
          <div className="space-y-3">
            <p className="text-xs text-base-content/50">
              <kbd className="kbd kbd-xs">복사</kbd> 버튼으로 데이터를 복사한 뒤, ChatGPT나 Claude에게 직접 질문할 수 있습니다.
            </p>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge badge-sm badge-outline">예시</span>
              </div>
              <ExampleBox>
                다음은 내 사주팔자, 자미두수 명반, 출생차트야. 성격적 강점과 약점을 분석해줘.<br />
                <span className="text-base-content/40">[복사한 데이터 붙여넣기]</span>
              </ExampleBox>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
