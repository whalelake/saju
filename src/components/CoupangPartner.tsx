import { useI18n } from '../i18n'

interface CoupangPartnerProps {
  title?: string
}

export default function CoupangPartner({ title }: CoupangPartnerProps) {
  const { t, language } = useI18n()

  // 한국어 사용자만 표시 (쿠팡은 한국 서비스)
  if (language !== 'ko') return null

  // 쿠팡 파트너스 검색 링크 (가장 안정적인 방식)
  const searchKeywords = ['사주', '명리학', '점성술', '자미두수']

  return (
    <div className="card bg-base-100 border-oriental mt-6">
      <div className="card-body">
        <h3 className="card-title text-lg mb-4">
          {title || t.coupang?.title || '추천 상품'}
        </h3>

        {/* 쿠팡 검색 링크 */}
        <div className="flex flex-wrap gap-2">
          {searchKeywords.map((keyword) => (
            <a
              key={keyword}
              href={`https://link.coupang.com/a/cjgNE0`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
            >
              {keyword} 서적 보기
            </a>
          ))}
        </div>

        <p className="text-xs text-base-content/50 mt-4">
          {t.coupang?.disclaimer || '이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.'}
        </p>
      </div>
    </div>
  )
}
