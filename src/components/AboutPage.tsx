import { useI18n } from '../i18n'

interface AboutPageProps {
  isOpen: boolean
  onClose: () => void
}

export default function AboutPage({ isOpen, onClose }: AboutPageProps) {
  const { t } = useI18n()

  if (!isOpen) return null

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl max-h-[80vh]">
        <h2 className="text-xl font-bold mb-4">{t.about.title}</h2>

        <div className="prose prose-sm max-w-none overflow-y-auto">
          <p className="text-base-content/70 mb-6">
            {t.about.intro}
          </p>

          <h3>{t.about.whatIs}</h3>
          <p>{t.about.whatIsDesc}</p>

          <h3>{t.about.features}</h3>
          <ul>
            <li><strong>{t.about.feature1}</strong>: {t.about.feature1Desc}</li>
            <li><strong>{t.about.feature2}</strong>: {t.about.feature2Desc}</li>
            <li><strong>{t.about.feature3}</strong>: {t.about.feature3Desc}</li>
            <li><strong>{t.about.feature4}</strong>: {t.about.feature4Desc}</li>
            <li><strong>{t.about.feature5}</strong>: {t.about.feature5Desc}</li>
          </ul>

          <h3>{t.about.technology}</h3>
          <p>{t.about.technologyDesc}</p>
          <ul>
            <li>{t.about.tech1}</li>
            <li>{t.about.tech2}</li>
            <li>{t.about.tech3}</li>
            <li>{t.about.tech4}</li>
          </ul>

          <h3>{t.about.privacy}</h3>
          <p>{t.about.privacyDesc}</p>

          <h3>{t.about.openSource}</h3>
          <p>{t.about.openSourceDesc}</p>
          <p>
            <a
              href="https://github.com/whalelake/saju"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              https://github.com/whalelake/saju
            </a>
          </p>

          <h3>{t.about.developer}</h3>
          <p>{t.about.developerDesc}</p>
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
