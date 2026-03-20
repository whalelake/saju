import { useState, useMemo } from 'react'
import type { BirthInput, Gender, JasiMethod } from '@orrery/core/types'
import { isKoreanDaylightTime } from '@orrery/core/natal'
import type { City } from '@orrery/core/cities'
import { SEOUL } from '@orrery/core/cities'
import CityCombobox from './CityCombobox.tsx'
import { useI18n } from '../i18n'

interface Props {
  onSubmit: (input: BirthInput) => void
}

const STORAGE_KEY = 'orrery-birth-input'

interface SavedFormState {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  gender: Gender
  unknownTime: boolean
  jasiMethod: JasiMethod
  city: City | null
  manualCoords: boolean
  latitude: number
  longitude: number
}

function loadSaved(): SavedFormState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as SavedFormState
  } catch {
    return null
  }
}

const now = new Date()
const currentYear = now.getFullYear()
const saved = loadSaved()

export default function BirthForm({ onSubmit }: Props) {
  const { t } = useI18n()
  const [year, setYear] = useState(saved?.year ?? currentYear - 20)
  const [month, setMonth] = useState(saved?.month ?? now.getMonth() + 1)
  const [day, setDay] = useState(saved?.day ?? now.getDate())
  const [hour, setHour] = useState(saved?.hour ?? now.getHours())
  const [minute, setMinute] = useState(saved?.minute ?? now.getMinutes())
  const [gender, setGender] = useState<Gender>(saved?.gender ?? 'M')
  const [unknownTime, setUnknownTime] = useState(saved?.unknownTime ?? false)
  const [jasiMethod, setJasiMethod] = useState<JasiMethod>(saved?.jasiMethod ?? 'unified')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [selectedCity, setSelectedCity] = useState<City | null>(saved?.city ?? SEOUL)
  const [manualCoords, setManualCoords] = useState(saved?.manualCoords ?? false)
  const [latitude, setLatitude] = useState(saved?.latitude ?? SEOUL.lat)
  const [longitude, setLongitude] = useState(saved?.longitude ?? SEOUL.lon)

  const isKDT = useMemo(() => isKoreanDaylightTime(year, month, day), [year, month, day])

  function handleCitySelect(city: City) {
    setSelectedCity(city)
    setLatitude(city.lat)
    setLongitude(city.lon)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const state: SavedFormState = {
      year, month, day, hour, minute, gender, unknownTime, jasiMethod,
      city: selectedCity, manualCoords, latitude, longitude,
    }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch { /* quota exceeded — ignore */ }
    onSubmit({
      year, month, day,
      hour: unknownTime ? 12 : hour,
      minute: unknownTime ? 0 : minute,
      gender,
      unknownTime,
      ...(!unknownTime && { jasiMethod }),
      latitude,
      longitude,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 생년월일 */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">{t.form.birthDate}</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          <select
            value={year}
            onChange={e => setYear(Number(e.target.value))}
            className="select select-bordered select-sm sm:select-md"
          >
            {Array.from({ length: currentYear - 1900 + 1 }, (_, i) => {
              const y = currentYear - i
              return <option key={y} value={y}>{y}{t.form.year}</option>
            })}
          </select>
          <select
            value={month}
            onChange={e => setMonth(Number(e.target.value))}
            className="select select-bordered select-sm sm:select-md"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}{t.form.month}</option>
            ))}
          </select>
          <select
            value={day}
            onChange={e => setDay(Number(e.target.value))}
            className="select select-bordered select-sm sm:select-md"
          >
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}{t.form.day}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KDT 경고 */}
      {isKDT && (
        <div role="alert" className="alert alert-warning text-sm py-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{t.form.kdtWarning}</span>
        </div>
      )}

      {/* 시간 + 성별 */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">{t.form.time}</span>
          <label className="label cursor-pointer gap-2 p-0">
            <span className="label-text-alt">{t.form.unknownTime}</span>
            <input
              type="checkbox"
              checked={unknownTime}
              onChange={e => setUnknownTime(e.target.checked)}
              className="toggle toggle-sm toggle-primary"
            />
          </label>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-[1fr_1fr_auto] gap-2 items-end">
          <select
            value={hour}
            onChange={e => setHour(Number(e.target.value))}
            disabled={unknownTime}
            className="select select-bordered select-sm sm:select-md"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>{String(i).padStart(2, '0')}{t.form.hour}</option>
            ))}
          </select>
          <select
            value={minute}
            onChange={e => setMinute(Number(e.target.value))}
            disabled={unknownTime}
            className="select select-bordered select-sm sm:select-md"
          >
            {Array.from({ length: 60 }, (_, i) => (
              <option key={i} value={i}>{String(i).padStart(2, '0')}{t.form.minute}</option>
            ))}
          </select>

          {/* 성별 — join 버튼 그룹 */}
          <div className="join">
            {(['M', 'F'] as const).map(g => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`join-item btn btn-sm sm:btn-md ${
                  gender === g ? 'btn-primary' : 'btn-ghost'
                }`}
              >
                {g === 'M' ? t.form.male : t.form.female}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 위치 */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">{t.form.birthLocation}</span>
          <label className="label cursor-pointer gap-2 p-0">
            <span className="label-text-alt">{t.form.manualInput}</span>
            <input
              type="checkbox"
              checked={manualCoords}
              onChange={e => {
                setManualCoords(e.target.checked)
                if (!e.target.checked && selectedCity) {
                  setLatitude(selectedCity.lat)
                  setLongitude(selectedCity.lon)
                }
              }}
              className="toggle toggle-sm toggle-primary"
            />
          </label>
        </label>
        {manualCoords ? (
          <div className="grid grid-cols-2 gap-2">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text-alt">{t.form.latitude}</span>
              </label>
              <input
                type="number"
                step="0.0001"
                value={latitude}
                onChange={e => setLatitude(Number(e.target.value))}
                className="input input-bordered input-sm sm:input-md"
              />
            </div>
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text-alt">{t.form.longitude}</span>
              </label>
              <input
                type="number"
                step="0.0001"
                value={longitude}
                onChange={e => setLongitude(Number(e.target.value))}
                className="input input-bordered input-sm sm:input-md"
              />
            </div>
          </div>
        ) : (
          <CityCombobox selectedCity={selectedCity} onSelect={handleCitySelect} />
        )}
      </div>

      {/* 고급 설정 */}
      {!unknownTime && (
        <div className="collapse collapse-arrow bg-base-200">
          <input
            type="checkbox"
            checked={showAdvanced}
            onChange={e => setShowAdvanced(e.target.checked)}
          />
          <div className="collapse-title text-sm font-medium py-2 min-h-0">
            {t.form.advancedSettings}
          </div>
          <div className="collapse-content">
            <div className="form-control pt-2">
              <label className="label py-1">
                <span className="label-text font-medium">{t.form.jasiMethod}</span>
              </label>
              <div className="join w-full">
                {([
                  { value: 'unified' as const, label: t.form.jasiUnified },
                  { value: 'split' as const, label: t.form.jasiSplit },
                ]).map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setJasiMethod(opt.value)}
                    className={`join-item btn btn-sm flex-1 ${
                      jasiMethod === opt.value ? 'btn-primary' : 'btn-ghost'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-base-content/50 mt-2">
                {jasiMethod === 'unified' ? t.form.jasiUnifiedDesc : t.form.jasiSplitDesc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 계산 버튼 */}
      <button type="submit" className="btn btn-primary btn-block">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        {t.form.calculate}
      </button>
    </form>
  )
}
