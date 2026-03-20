import { useI18n } from '../i18n'

function ExampleBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-base-200/50 rounded-lg px-3 py-2 text-sm text-base-content/70 leading-relaxed border border-dashed border-base-300">
      {children}
    </div>
  )
}

function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-base text-base-content flex items-center gap-2">
        <span className="w-1 h-4 bg-primary rounded"></span>
        {title}
      </h4>
      <div className="space-y-2 text-sm text-base-content/80 leading-relaxed">
        {children}
      </div>
    </div>
  )
}

export default function Guide() {
  const { t } = useI18n()

  return (
    <div className="collapse collapse-arrow bg-base-100 border-oriental">
      <input type="checkbox" />
      <div className="collapse-title font-medium flex items-center gap-2">
        <svg className="w-5 h-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
        {t.guide.title}
      </div>
      <div className="collapse-content">
        <div className="pt-2 space-y-6">
          {/* 기본 사용법 */}
          <ul className="steps steps-vertical text-sm">
            <li className="step step-primary">
              <span className="text-left">{t.guide.aiDesc.includes('GPT') ? '생년월일, 태어난 시간, 성별을 입력합니다.' : 'Enter your birth year, month, day, time, and gender.'}</span>
            </li>
            <li className="step step-primary">
              <span className="text-left"><kbd className="kbd kbd-sm">{t.form.calculate}</kbd> {t.guide.aiDesc.includes('GPT') ? '버튼을 누릅니다.' : 'button to calculate.'}</span>
            </li>
            <li className="step step-primary">
              <span className="text-left">{t.guide.aiDesc.includes('GPT') ? '탭을 전환하며 사주팔자, 자미두수, 출생차트를 확인합니다.' : 'Switch tabs to view Saju, Zi Wei, and Natal Chart.'}</span>
            </li>
            <li className="step step-primary">
              <span className="text-left"><kbd className="kbd kbd-sm">{t.results.aiInterpret}</kbd> {t.guide.aiDesc.includes('GPT') ? '버튼으로 AI가 명식을 분석해드립니다.' : 'button for AI analysis.'}</span>
            </li>
          </ul>

          <div className="divider text-xs text-base-content/40">{t.guide.features}</div>

          {/* 주요 기능 설명 */}
          <div className="grid gap-3">
            <div className="flex gap-3 items-start">
              <span className="badge badge-primary badge-sm shrink-0">{t.guide.aiFeature}</span>
              <span className="text-sm text-base-content/70">
                {t.guide.aiDesc}
              </span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="badge badge-secondary badge-sm shrink-0 font-hanja">{t.guide.compatibilityFeature}</span>
              <span className="text-sm text-base-content/70">
                {t.guide.compatibilityDesc}
              </span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="badge badge-accent badge-sm shrink-0">{t.guide.historyFeature}</span>
              <span className="text-sm text-base-content/70">
                {t.guide.historyDesc}
              </span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="badge badge-ghost badge-sm shrink-0">{t.guide.shareFeature}</span>
              <span className="text-sm text-base-content/70">
                {t.guide.shareDesc}
              </span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="badge badge-ghost badge-sm shrink-0">{t.guide.copyFeature}</span>
              <span className="text-sm text-base-content/70">
                {t.guide.copyDesc}
              </span>
            </div>
          </div>

          <div className="divider text-xs text-base-content/40">{t.guide.concepts}</div>

          {/* 명리학 개념 상세 설명 */}
          <div className="space-y-6">
            <InfoSection title={t.guide.sajuTitle}>
              <p>{t.guide.sajuDesc1}</p>
              <p>{t.guide.sajuDesc2}</p>
              <p>{t.guide.sajuDesc3}</p>
            </InfoSection>

            <InfoSection title={t.guide.ziweiTitle}>
              <p>{t.guide.ziweiDesc1}</p>
              <p>{t.guide.ziweiDesc2}</p>
              <p>{t.guide.ziweiDesc3}</p>
            </InfoSection>

            <InfoSection title={t.guide.natalTitle}>
              <p>{t.guide.natalDesc1}</p>
              <p>{t.guide.natalDesc2}</p>
              <p>{t.guide.natalDesc3}</p>
            </InfoSection>
          </div>

          <div className="divider text-xs text-base-content/40">{t.guide.interpretGuide}</div>

          {/* 해석 가이드 */}
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold text-sm text-primary mb-2">{t.guide.pillarsGuide}</h5>
              <ul className="space-y-1.5 text-sm text-base-content/80">
                <li className="flex gap-2">
                  <span className="text-primary shrink-0">•</span>
                  <span>{t.guide.pillarsGuide1}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary shrink-0">•</span>
                  <span>{t.guide.pillarsGuide2}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary shrink-0">•</span>
                  <span>{t.guide.pillarsGuide3}</span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-sm text-secondary mb-2">{t.guide.ziweiGuide}</h5>
              <ul className="space-y-1.5 text-sm text-base-content/80">
                <li className="flex gap-2">
                  <span className="text-secondary shrink-0">•</span>
                  <span>{t.guide.ziweiGuide1}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-secondary shrink-0">•</span>
                  <span>{t.guide.ziweiGuide2}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-secondary shrink-0">•</span>
                  <span>{t.guide.ziweiGuide3}</span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-sm text-accent mb-2">{t.guide.natalGuide}</h5>
              <ul className="space-y-1.5 text-sm text-base-content/80">
                <li className="flex gap-2">
                  <span className="text-accent shrink-0">•</span>
                  <span>{t.guide.natalGuide1}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent shrink-0">•</span>
                  <span>{t.guide.natalGuide2}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent shrink-0">•</span>
                  <span>{t.guide.natalGuide3}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="divider text-xs text-base-content/40">{t.guide.faq}</div>

          {/* FAQ */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h5 className="font-semibold text-sm text-base-content">Q. {t.guide.faqQ1}</h5>
              <p className="text-sm text-base-content/70 pl-4">{t.guide.faqA1}</p>
            </div>
            <div className="space-y-1">
              <h5 className="font-semibold text-sm text-base-content">Q. {t.guide.faqQ2}</h5>
              <p className="text-sm text-base-content/70 pl-4">{t.guide.faqA2}</p>
            </div>
            <div className="space-y-1">
              <h5 className="font-semibold text-sm text-base-content">Q. {t.guide.faqQ3}</h5>
              <p className="text-sm text-base-content/70 pl-4">{t.guide.faqA3}</p>
            </div>
            <div className="space-y-1">
              <h5 className="font-semibold text-sm text-base-content">Q. {t.guide.faqQ4}</h5>
              <p className="text-sm text-base-content/70 pl-4">{t.guide.faqA4}</p>
            </div>
          </div>

          <div className="divider text-xs text-base-content/40">{t.guide.tips}</div>

          {/* 활용 팁 */}
          <div className="bg-base-200/30 rounded-lg p-4 space-y-2">
            <ul className="space-y-2 text-sm text-base-content/80">
              <li className="flex gap-2">
                <span className="text-primary shrink-0">✓</span>
                <span>{t.guide.tip1}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary shrink-0">✓</span>
                <span>{t.guide.tip2}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary shrink-0">✓</span>
                <span>{t.guide.tip3}</span>
              </li>
            </ul>
          </div>

          {/* AI 프롬프트 예시 */}
          <div className="space-y-3">
            <div className="divider text-xs text-base-content/40">{t.guide.aiDesc.includes('GPT') ? '직접 AI에게 질문하기' : 'Ask AI Directly'}</div>
            <p className="text-xs text-base-content/50">
              <kbd className="kbd kbd-xs">{t.common.copy}</kbd> {t.guide.aiDesc.includes('GPT') ? '버튼으로 데이터를 복사한 뒤, ChatGPT나 Claude에게 직접 질문할 수 있습니다.' : 'Copy your chart data and ask ChatGPT or Claude directly.'}
            </p>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge badge-sm badge-outline">{t.guide.aiDesc.includes('GPT') ? '예시' : 'Example'}</span>
              </div>
              <ExampleBox>
                {t.guide.aiDesc.includes('GPT') ? (
                  <>
                    다음은 내 사주팔자, 자미두수 명반, 출생차트야. 성격적 강점과 약점을 분석해줘.<br />
                    <span className="text-base-content/40">[복사한 데이터 붙여넣기]</span>
                  </>
                ) : (
                  <>
                    Here's my Saju, Zi Wei chart, and Natal Chart. Analyze my personality strengths and weaknesses.<br />
                    <span className="text-base-content/40">[Paste copied data here]</span>
                  </>
                )}
              </ExampleBox>
            </div>
          </div>

          {/* 면책 조항 */}
          <div className="alert alert-info text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{t.guide.disclaimer}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
