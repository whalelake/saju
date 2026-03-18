import { useState, useRef, useEffect, useCallback } from 'react'
import type { City } from '@orrery/core/cities'
import { KOREAN_CITIES, filterCities, formatCityName } from '@orrery/core/cities'

interface Props {
  selectedCity: City | null
  onSelect: (city: City) => void
}

/** 포커스 시 보여줄 기본 도시 목록 (한국 주요 도시) */
const DEFAULT_CITIES = KOREAN_CITIES.slice(0, 8) as City[]

export default function CityCombobox({ selectedCity, onSelect }: Props) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const results = query ? filterCities(query) : DEFAULT_CITIES
  const koreanResults = results.filter(c => !c.country)
  const worldResults = results.filter(c => !!c.country)
  const flatResults = results // 이미 한국 우선 정렬됨

  // 하이라이트된 항목이 보이도록 스크롤
  useEffect(() => {
    if (highlightIndex < 0 || !listRef.current) return
    const items = listRef.current.querySelectorAll('[role="option"]')
    items[highlightIndex]?.scrollIntoView({ block: 'nearest' })
  }, [highlightIndex])

  const close = useCallback(() => {
    setIsOpen(false)
    setHighlightIndex(-1)
    setQuery('')
  }, [])

  function handleFocus() {
    setIsOpen(true)
    setQuery('')
    setHighlightIndex(-1)
  }

  function handleInput(value: string) {
    setQuery(value)
    setIsOpen(true)
    setHighlightIndex(-1)
  }

  function selectCity(city: City) {
    onSelect(city)
    close()
    inputRef.current?.blur()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true)
        e.preventDefault()
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightIndex(i => (i + 1) % flatResults.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightIndex(i => (i - 1 + flatResults.length) % flatResults.length)
        break
      case 'Enter':
        e.preventDefault()
        if (highlightIndex >= 0 && highlightIndex < flatResults.length) {
          selectCity(flatResults[highlightIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        close()
        inputRef.current?.blur()
        break
    }
  }

  // mousedown + preventDefault로 블러-클릭 경쟁 해결
  function handleOptionMouseDown(e: React.MouseEvent, city: City) {
    e.preventDefault()
    selectCity(city)
  }

  function handleBlur(e: React.FocusEvent) {
    // 컨테이너 내부로 포커스가 이동하면 무시
    if (containerRef.current?.contains(e.relatedTarget as Node)) return
    close()
  }

  const listboxId = 'city-listbox'

  /** 구분선이 있는 섹션별 렌더링 */
  function renderOptions() {
    if (flatResults.length === 0) {
      return (
        <li className="px-3 py-2 text-sm text-base-content/50 text-center">
          검색 결과 없음
        </li>
      )
    }

    const items: React.ReactNode[] = []
    let optionIndex = 0

    if (koreanResults.length > 0) {
      items.push(
        <li key="header-kr" className="px-3 pt-2 pb-1 text-xs font-medium text-base-content/40 uppercase tracking-wide" role="presentation">
          한국
        </li>
      )
      for (const city of koreanResults) {
        const idx = optionIndex++
        items.push(renderOption(city, idx))
      }
    }

    if (worldResults.length > 0) {
      if (koreanResults.length > 0) {
        items.push(
          <li key="divider" className="divider my-0 h-px" role="presentation" />
        )
      }
      items.push(
        <li key="header-world" className="px-3 pt-2 pb-1 text-xs font-medium text-base-content/40 uppercase tracking-wide" role="presentation">
          세계
        </li>
      )
      for (const city of worldResults) {
        const idx = optionIndex++
        items.push(renderOption(city, idx))
      }
    }

    return items
  }

  function renderOption(city: City, index: number) {
    const isHighlighted = index === highlightIndex
    const label = formatCityName(city)
    return (
      <li
        key={`${city.name}-${city.country ?? 'kr'}`}
        role="option"
        aria-selected={isHighlighted}
        className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
          isHighlighted ? 'bg-primary/10 text-primary' : 'text-base-content hover:bg-base-200'
        }`}
        onMouseDown={e => handleOptionMouseDown(e, city)}
        onMouseEnter={() => setHighlightIndex(index)}
      >
        {label}
      </li>
    )
  }

  const displayValue = isOpen ? query : (selectedCity ? formatCityName(selectedCity) : '')

  return (
    <div ref={containerRef} className="dropdown dropdown-open w-full">
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-activedescendant={highlightIndex >= 0 ? `city-option-${highlightIndex}` : undefined}
        autoComplete="off"
        className="input input-bordered input-sm sm:input-md w-full pr-8"
        placeholder="도시 이름을 입력하세요"
        value={displayValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={e => handleInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {/* 드롭다운 아이콘 */}
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>

      {isOpen && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          className="dropdown-content menu bg-base-100 rounded-box z-50 w-full max-h-60 overflow-auto shadow-lg border border-base-300 p-0"
        >
          {renderOptions()}
        </ul>
      )}
    </div>
  )
}
