import { useState, useEffect } from 'react'
import type { BirthInput } from '@orrery/core/types'
import { useI18n } from '../i18n'

interface HistoryItem {
  id: string
  input: BirthInput
  createdAt: number
  label?: string
}

interface Props {
  onSelect: (input: BirthInput) => void
  currentInput: BirthInput | null
}

const STORAGE_KEY = 'orrery-history'
const MAX_HISTORY = 10

export default function History({ onSelect, currentInput }: Props) {
  const { t, language } = useI18n()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setHistory(JSON.parse(saved))
      } catch {
        // ignore
      }
    }
  }, [])

  // 현재 입력을 히스토리에 저장
  useEffect(() => {
    if (!currentInput) return

    setHistory(prev => {
      // 중복 체크 (같은 생년월일시)
      const isDuplicate = prev.some(
        item =>
          item.input.year === currentInput.year &&
          item.input.month === currentInput.month &&
          item.input.day === currentInput.day &&
          item.input.hour === currentInput.hour &&
          item.input.minute === currentInput.minute
      )
      if (isDuplicate) return prev

      const newItem: HistoryItem = {
        id: crypto.randomUUID(),
        input: currentInput,
        createdAt: Date.now(),
      }

      const updated = [newItem, ...prev].slice(0, MAX_HISTORY)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [currentInput])

  function formatDate(input: BirthInput) {
    const y = input.year
    const m = String(input.month).padStart(2, '0')
    const d = String(input.day).padStart(2, '0')
    const h = String(input.hour).padStart(2, '0')
    const min = String(input.minute).padStart(2, '0')
    return `${y}.${m}.${d} ${h}:${min}`
  }

  function formatRelativeTime(timestamp: number) {
    const diff = Date.now() - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return t.history.justNow
    if (minutes < 60) return `${minutes}${t.history.minutesAgo}`
    if (hours < 24) return `${hours}${t.history.hoursAgo}`
    if (days < 7) return `${days}${t.history.daysAgo}`
    const locale = language === 'ko' ? 'ko-KR' : language === 'ja' ? 'ja-JP' : language === 'zh' ? 'zh-CN' : 'en-US'
    return new Date(timestamp).toLocaleDateString(locale)
  }

  function handleDelete(id: string, e: React.MouseEvent) {
    e.stopPropagation()
    setHistory(prev => {
      const updated = prev.filter(item => item.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  function handleClearAll() {
    localStorage.removeItem(STORAGE_KEY)
    setHistory([])
  }

  if (history.length === 0) return null

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-ghost btn-sm gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="hidden sm:inline">{t.history.title}</span>
        <span className="badge badge-sm badge-primary">{history.length}</span>
      </button>

      {isOpen && (
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-50 w-72 p-2 shadow-xl border border-base-300"
        >
          <li className="menu-title flex flex-row justify-between items-center">
            <span>{t.history.recentRecords}</span>
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={handleClearAll}
            >
              {t.history.clearAll}
            </button>
          </li>

          {history.map(item => (
            <li key={item.id}>
              <button
                className="flex justify-between items-center"
                onClick={() => {
                  onSelect(item.input)
                  setIsOpen(false)
                }}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">
                    {formatDate(item.input)}
                    <span className="ml-1 text-xs text-base-content/50">
                      ({item.input.gender === 'M' ? t.form.male : t.form.female})
                    </span>
                  </span>
                  <span className="text-xs text-base-content/50">
                    {formatRelativeTime(item.createdAt)}
                  </span>
                </div>
                <button
                  className="btn btn-ghost btn-xs btn-circle"
                  onClick={(e) => handleDelete(item.id, e)}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
