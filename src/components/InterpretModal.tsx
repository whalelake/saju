import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useI18n } from '../i18n'

interface Props {
  isOpen: boolean
  onClose: () => void
  getData: () => Promise<string>
}

type InterpretType = 'personality' | 'advice' | 'general'
type ContextType = 'self' | 'child' | 'partner' | 'friend' | 'other'

export default function InterpretModal({ isOpen, onClose, getData }: Props) {
  const { t } = useI18n()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [context, setContext] = useState<ContextType>('self')
  const [type, setType] = useState<InterpretType>('general')
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const TYPE_OPTIONS: { value: InterpretType; label: string; emoji: string }[] = [
    { value: 'personality', label: t.interpret.personality, emoji: '🌟' },
    { value: 'advice', label: t.interpret.advice, emoji: '💫' },
    { value: 'general', label: t.interpret.general, emoji: '📖' },
  ]

  const CONTEXT_OPTIONS: { value: ContextType; label: string; emoji: string }[] = [
    { value: 'self', label: t.interpret.self, emoji: '🙋' },
    { value: 'child', label: t.interpret.child, emoji: '👶' },
    { value: 'partner', label: t.interpret.partner, emoji: '💕' },
    { value: 'friend', label: t.interpret.friend, emoji: '🤝' },
    { value: 'other', label: t.interpret.other, emoji: '👤' },
  ]

  async function handleInterpret() {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await getData()

      const response = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, type, context, question: question.trim() }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || t.common.error)
      }

      const { interpretation } = await response.json()
      setResult(interpretation)
    } catch (err) {
      setError(err instanceof Error ? err.message : t.common.error)
      setStep(2)
    } finally {
      setLoading(false)
    }
  }

  function handleClose() {
    setStep(1)
    setResult(null)
    setError(null)
    setQuestion('')
    onClose()
  }

  function handleBack() {
    if (step > 1) setStep((step - 1) as 1 | 2)
  }

  function handleNext() {
    if (step < 3) setStep((step + 1) as 2 | 3)
  }

  if (!isOpen) return null

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl max-h-[85vh] overflow-y-auto">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleClose}
        >
          ✕
        </button>

        <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          {t.interpret.title}
        </h3>

        {/* 진행 단계 표시 */}
        {!result && !loading && (
          <ul className="steps steps-horizontal w-full mb-6 text-sm">
            <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>{t.interpret.step1Title}</li>
            <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>{t.interpret.step2Title}</li>
            <li className={`step ${step >= 3 ? 'step-primary' : ''}`}>{t.interpret.step3Title}</li>
          </ul>
        )}

        {/* Step 1: 맥락 선택 */}
        {step === 1 && !loading && !result && (
          <div className="space-y-4">
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CONTEXT_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`btn btn-outline justify-start gap-2 ${
                      context === opt.value ? 'btn-primary' : ''
                    }`}
                    onClick={() => setContext(opt.value)}
                  >
                    <span>{opt.emoji}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-action">
              <button className="btn btn-ghost" onClick={handleClose}>
                {t.common.cancel}
              </button>
              <button className="btn btn-primary" onClick={handleNext}>
                {t.common.confirm}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: 질문 & 해석 유형 선택 */}
        {step === 2 && !loading && !result && (
          <div className="space-y-5">
            {/* 궁금한 점 입력 */}
            <div>
              <label className="label">
                <span className="label-text font-medium">{t.interpret.suggestions}</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full h-20"
                placeholder={t.interpret.questionPlaceholder}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            {/* 해석 유형 선택 */}
            <div>
              <div className="grid grid-cols-3 gap-2">
                {TYPE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`btn ${
                      type === opt.value ? 'btn-primary' : 'btn-outline'
                    }`}
                    onClick={() => setType(opt.value)}
                  >
                    <span>{opt.emoji}</span>
                    <span className="text-sm">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div role="alert" className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="modal-action">
              <button className="btn btn-ghost" onClick={handleBack}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="btn btn-primary" onClick={handleInterpret}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {t.results.aiInterpret}
              </button>
            </div>
          </div>
        )}

        {/* 로딩 */}
        {loading && (
          <div className="py-12 text-center">
            <span className="loading loading-spinner loading-lg text-primary" />
            <p className="mt-4 text-base-content/70">
              {t.interpret.analyzing}
            </p>
          </div>
        )}

        {/* 결과 */}
        {result && (
          <div className="py-2">
            <div className="bg-base-200/50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-base-content/60 mb-2">
                <span>{CONTEXT_OPTIONS.find(c => c.value === context)?.emoji}</span>
                <span>{CONTEXT_OPTIONS.find(c => c.value === context)?.label}</span>
                <span>·</span>
                <span>{TYPE_OPTIONS.find(t => t.value === type)?.label}</span>
                {question && (
                  <>
                    <span>·</span>
                    <span className="truncate max-w-[150px]">"{question}"</span>
                  </>
                )}
              </div>
            </div>

            <div className="prose prose-sm max-w-none prose-headings:text-primary prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-strong:text-primary prose-strong:font-semibold prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4 prose-p:leading-relaxed prose-p:mb-3">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>

            <div className="modal-action mt-6 flex-wrap gap-2">
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  navigator.clipboard.writeText(result)
                }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {t.common.copy}
              </button>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setResult(null)
                  setStep(2)
                }}
              >
                {t.interpret.askAnother}
              </button>
              <button className="btn btn-primary btn-sm" onClick={handleClose}>
                {t.common.close}
              </button>
            </div>
          </div>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  )
}
