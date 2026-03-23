import { useI18n } from '../i18n'

interface TermsOfServiceProps {
  isOpen: boolean
  onClose: () => void
}

export default function TermsOfService({ isOpen, onClose }: TermsOfServiceProps) {
  const { t } = useI18n()

  if (!isOpen) return null

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl max-h-[80vh]">
        <h2 className="text-xl font-bold mb-4">{t.terms.title}</h2>

        <div className="prose prose-sm max-w-none overflow-y-auto">
          <p className="text-sm text-base-content/70 mb-4">
            {t.terms.effectiveDate}
          </p>

          <h3>{t.terms.article1Title}</h3>
          <p>{t.terms.article1Text}</p>

          <h3>{t.terms.article2Title}</h3>
          <p>{t.terms.article2Intro}</p>
          <ul>
            {t.terms.article2Items.split('|').map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3>{t.terms.article3Title}</h3>
          <p>{t.terms.article3Text}</p>

          <h3>{t.terms.article4Title}</h3>
          <ol>
            {t.terms.article4Items.split('|').map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>

          <h3>{t.terms.article5Title}</h3>
          <p>{t.terms.article5Text}</p>
          <p>
            <a href="https://github.com/whalelake/saju" target="_blank" rel="noopener noreferrer" className="link">
              https://github.com/whalelake/saju
            </a>
          </p>

          <h3>{t.terms.article6Title}</h3>
          <p>{t.terms.article6Text}</p>

          <h3>{t.terms.article7Title}</h3>
          <p>{t.terms.article7Text}</p>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>{t.common.close}</button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  )
}
