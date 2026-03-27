/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AD_SLOT_HERO_BOTTOM?: string
  readonly VITE_AD_SLOT_FORM_BOTTOM?: string
  readonly VITE_AD_SLOT_RESULT_TOP?: string
  readonly VITE_AD_SLOT_RESULT_BOTTOM?: string
  readonly VITE_AD_SLOT_GUIDE_TOP?: string
  readonly VITE_AD_SLOT_LANDING_ARTICLE_TOP?: string
  readonly VITE_AD_SLOT_LANDING_ARTICLE_BOTTOM?: string
  readonly VITE_AD_SLOT_ARTICLE_TOP?: string
  readonly VITE_AD_SLOT_ARTICLE_MID?: string
  readonly VITE_AD_SLOT_ARTICLE_BOTTOM?: string
  readonly VITE_AD_SLOT_DREAM_TOP?: string
  readonly VITE_AD_SLOT_DREAM_BOTTOM?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
