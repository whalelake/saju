import { useI18n } from '../i18n'

interface PrivacyPolicyProps {
  isOpen: boolean
  onClose: () => void
}

export default function PrivacyPolicy({ isOpen, onClose }: PrivacyPolicyProps) {
  const { t } = useI18n()

  if (!isOpen) return null

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl max-h-[80vh]">
        <h2 className="text-xl font-bold mb-4">{t.privacy.title}</h2>

        <div className="prose prose-sm max-w-none overflow-y-auto">
          <p className="text-sm text-base-content/70 mb-4">
            {t.privacy.effectiveDate}
          </p>

          <h3>{t.privacy.section1Title}</h3>
          <p>{t.privacy.section1Intro}</p>
          <ul>
            {t.privacy.section1Items.split('|').map((item, i) => (
              <li key={i}><strong>{item.split(':')[0]}:</strong>{item.split(':').slice(1).join(':')}</li>
            ))}
          </ul>

          <h3>{t.privacy.section2Title}</h3>
          <p>{t.privacy.section2Text}</p>

          <h3>{t.privacy.section3Title}</h3>
          <p>{t.privacy.section3Text}</p>

          <h3>{t.privacy.section4Title}</h3>
          <p>{t.privacy.section4Text}</p>
          <ul>
            {t.privacy.section4Links.split('|').map((item, i) => (
              <li key={i}>
                {i === 0 ? (
                  <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="link">{item}</a>
                ) : (
                  <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="link">{item}</a>
                )}
              </li>
            ))}
          </ul>

          <h3>{t.privacy.section5Title}</h3>
          <p>{t.privacy.section5Text}</p>

          <h3>{t.privacy.section6Title}</h3>
          <p>{t.privacy.section6Text}</p>
          <p>
            <a href="https://github.com/whalelake/saju/issues" target="_blank" rel="noopener noreferrer" className="link">
              https://github.com/whalelake/saju/issues
            </a>
          </p>
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
