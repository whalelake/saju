import { useI18n } from '../i18n'

interface CoupangPartnerProps {
  title?: string
}

export default function CoupangPartner({ title }: CoupangPartnerProps) {
  const { t, language } = useI18n()

  // 한국어 사용자만 표시 (쿠팡은 한국 서비스)
  const showCoupang = language === 'ko'

  if (!showCoupang) return null

  // 쿠팡 파트너스 위젯 HTML
  const coupangWidgetHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { margin: 0; padding: 0; overflow: hidden; background: transparent; }
      </style>
    </head>
    <body>
      <script src="https://ads-partners.coupang.com/g.js"></script>
      <script>
        new PartnersCoupang.G({
          "id": 973939,
          "template": "carousel",
          "trackingCode": "AF6700033",
          "width": "680",
          "height": "140",
          "tsource": ""
        });
      </script>
    </body>
    </html>
  `

  return (
    <div className="card bg-base-100 border-oriental mt-6">
      <div className="card-body">
        <h3 className="card-title text-lg mb-4">
          {title || t.coupang?.title || '추천 상품'}
        </h3>

        {/* 쿠팡 파트너스 다이나믹 배너 - iframe으로 삽입 */}
        <div className="flex items-center justify-center overflow-hidden">
          <iframe
            srcDoc={coupangWidgetHtml}
            style={{
              width: '100%',
              maxWidth: '680px',
              height: '160px',
              border: 'none',
              overflow: 'hidden',
            }}
            scrolling="no"
            title="쿠팡 파트너스"
          />
        </div>

        <p className="text-xs text-base-content/50 mt-4">
          {t.coupang?.disclaimer || '이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.'}
        </p>
      </div>
    </div>
  )
}
