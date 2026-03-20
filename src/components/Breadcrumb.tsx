import { Link, useParams } from 'react-router'
import { useI18n } from '../i18n'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: Props) {
  const { lang } = useParams<{ lang: string }>()
  const { t } = useI18n()

  return (
    <nav className="text-sm breadcrumbs mb-4">
      <ul>
        <li>
          <Link to={`/${lang}/`} className="text-base-content/60 hover:text-primary">
            {t.hero.title}
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <Link to={item.href} className="text-base-content/60 hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="text-base-content">{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
