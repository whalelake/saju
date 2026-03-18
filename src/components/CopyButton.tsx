import { useState } from 'react'

interface Props {
  getText: () => string | Promise<string>
  label?: React.ReactNode
}

export default function CopyButton({ getText, label = '복사' }: Props) {
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const text = await getText()
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const text = await getText()
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`btn btn-sm btn-ghost gap-1 ${copied ? 'btn-success' : ''}`}
    >
      {loading ? (
        <span className="loading loading-spinner loading-xs" />
      ) : copied ? (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
      {copied ? '완료' : label}
    </button>
  )
}
