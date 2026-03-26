export type AdSlotKey =
  | 'hero_bottom'
  | 'form_bottom'
  | 'result_top'
  | 'result_bottom'
  | 'guide_top'
  | 'landing_article_top'
  | 'landing_article_bottom'
  | 'article_top'
  | 'article_mid'
  | 'article_bottom'

type AdSlotConfig = {
  label: string
  envName: keyof ImportMetaEnv
}

const AD_SLOT_CONFIG: Record<AdSlotKey, AdSlotConfig> = {
  hero_bottom: {
    label: 'Hero bottom',
    envName: 'VITE_AD_SLOT_HERO_BOTTOM',
  },
  form_bottom: {
    label: 'Form bottom',
    envName: 'VITE_AD_SLOT_FORM_BOTTOM',
  },
  result_top: {
    label: 'Result top',
    envName: 'VITE_AD_SLOT_RESULT_TOP',
  },
  result_bottom: {
    label: 'Result bottom',
    envName: 'VITE_AD_SLOT_RESULT_BOTTOM',
  },
  guide_top: {
    label: 'Guide top',
    envName: 'VITE_AD_SLOT_GUIDE_TOP',
  },
  landing_article_top: {
    label: 'Landing article top',
    envName: 'VITE_AD_SLOT_LANDING_ARTICLE_TOP',
  },
  landing_article_bottom: {
    label: 'Landing article bottom',
    envName: 'VITE_AD_SLOT_LANDING_ARTICLE_BOTTOM',
  },
  article_top: {
    label: 'Article top',
    envName: 'VITE_AD_SLOT_ARTICLE_TOP',
  },
  article_mid: {
    label: 'Article mid',
    envName: 'VITE_AD_SLOT_ARTICLE_MID',
  },
  article_bottom: {
    label: 'Article bottom',
    envName: 'VITE_AD_SLOT_ARTICLE_BOTTOM',
  },
}

function normalizeSlot(rawValue: string | undefined) {
  const value = rawValue?.trim()
  if (!value) return null
  return /^\d+$/.test(value) ? value : null
}

export function getAdSlotValue(slotKey: AdSlotKey) {
  return normalizeSlot(import.meta.env[AD_SLOT_CONFIG[slotKey].envName])
}

export function getAdSlotLabel(slotKey: AdSlotKey) {
  return AD_SLOT_CONFIG[slotKey].label
}

export function getAdSlotEnvName(slotKey: AdSlotKey) {
  return AD_SLOT_CONFIG[slotKey].envName
}
