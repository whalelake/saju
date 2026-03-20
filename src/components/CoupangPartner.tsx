interface Product {
  id: string
  title: string
  imageUrl: string
  price: number
  category: 'book' | 'software'
}

interface CoupangPartnerProps {
  title?: string
  products: Product[]
}

export default function CoupangPartner({ title = '추천 도서', products }: CoupangPartnerProps) {
  return (
    <div className="card bg-base-100 border-oriental mt-6">
      <div className="card-body">
        <h3 className="card-title text-lg mb-4">{title}</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(product => (
            <a
              key={product.id}
              href={`https://coupa.ng/PARTNER_ID/${product.id}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="card bg-base-200 hover:shadow-lg transition-shadow"
            >
              <figure className="px-4 pt-4">
                <img src={product.imageUrl} alt={product.title} className="rounded-lg h-40 object-cover" />
              </figure>
              <div className="card-body p-4">
                <p className="text-sm font-medium line-clamp-2">{product.title}</p>
                <p className="text-primary font-bold">{product.price.toLocaleString()}원</p>
              </div>
            </a>
          ))}
        </div>
        <p className="text-xs text-base-content/50 mt-4">
          이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
        </p>
      </div>
    </div>
  )
}
