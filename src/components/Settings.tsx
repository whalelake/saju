import { useState, useEffect } from 'react'
import { useI18n } from '../i18n'

interface SettingsData {
  language: 'ko' | 'en' | 'ja' | 'zh'
  useTraditionalChars: boolean
  showGuide: boolean
  defaultTab: 'saju' | 'ziwei' | 'natal'
  autoSaveHistory: boolean
}

const STORAGE_KEY = 'orrery-settings'

const defaultSettings: SettingsData = {
  language: 'ko',
  useTraditionalChars: true,
  showGuide: true,
  defaultTab: 'saju',
  autoSaveHistory: true,
}

interface Props {
  isOpen: boolean
  onClose: () => void
  onSettingsChange?: (settings: SettingsData) => void
}

export function useSettings() {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(saved) })
      } catch {
        // ignore
      }
    }
  }, [])

  function updateSettings(partial: Partial<SettingsData>) {
    setSettings(prev => {
      const updated = { ...prev, ...partial }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  return { settings, updateSettings }
}

export default function Settings({ isOpen, onClose, onSettingsChange }: Props) {
  const { settings, updateSettings } = useSettings()
  const { t } = useI18n()

  function handleChange<K extends keyof SettingsData>(key: K, value: SettingsData[K]) {
    updateSettings({ [key]: value })
    onSettingsChange?.({ ...settings, [key]: value })
  }

  function handleReset() {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem('orrery-history')
    window.location.reload()
  }

  if (!isOpen) return null

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-md">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="font-bold text-lg flex items-center gap-2 mb-6">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {t.settings.title}
        </h3>

        <div className="space-y-4">
          {/* 언어 설정 */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">{t.settings.language}</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value as 'ko' | 'en' | 'ja' | 'zh')}
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
              <option value="zh">中文</option>
            </select>
          </div>

          {/* 한자 표시 */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">{t.settings.useTraditionalChars}</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={settings.useTraditionalChars}
                onChange={(e) => handleChange('useTraditionalChars', e.target.checked)}
              />
            </label>
            <span className="text-xs text-base-content/50 ml-1">
              {t.settings.useTraditionalCharsDesc}
            </span>
          </div>

          {/* 가이드 표시 */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">{t.settings.showGuide}</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={settings.showGuide}
                onChange={(e) => handleChange('showGuide', e.target.checked)}
              />
            </label>
            <span className="text-xs text-base-content/50 ml-1">
              {t.settings.showGuideDesc}
            </span>
          </div>

          {/* 기본 탭 */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">{t.settings.defaultTab}</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={settings.defaultTab}
              onChange={(e) => handleChange('defaultTab', e.target.value as 'saju' | 'ziwei' | 'natal')}
            >
              <option value="saju">{t.hero.saju}</option>
              <option value="ziwei">{t.hero.ziwei}</option>
              <option value="natal">{t.hero.natal}</option>
            </select>
          </div>

          {/* 자동 저장 */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">{t.settings.autoSaveHistory}</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={settings.autoSaveHistory}
                onChange={(e) => handleChange('autoSaveHistory', e.target.checked)}
              />
            </label>
            <span className="text-xs text-base-content/50 ml-1">
              {t.settings.autoSaveHistoryDesc}
            </span>
          </div>

          <div className="divider"></div>

          {/* 데이터 초기화 */}
          <div className="form-control">
            <button
              className="btn btn-outline btn-error btn-sm"
              onClick={handleReset}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {t.settings.resetData}
            </button>
            <span className="text-xs text-base-content/50 mt-1">
              {t.settings.resetDataDesc}
            </span>
          </div>
        </div>

        <div className="modal-action">
          <button className="btn btn-primary" onClick={onClose}>
            {t.settings.done}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  )
}
