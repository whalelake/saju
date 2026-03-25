export type ArticleKey =
  | 'whatIsSaju'
  | 'fiveElements'
  | 'whatIsZiwei'
  | 'unknownTimeSaju'
  | 'loveAndRelationships'
  | 'careerAndMoney'
  | 'dayMasterTypes'
  | 'tenGodsForBeginners'
  | 'bigThreeAstrology'
  | 'relationshipPatterns'
  | 'relationshipTiming'
  | 'careerStrengthsSaju'
  | 'moneyFlowTiming'
  | 'unknownTimeLimits'
  | 'ziweiBirthTimeImportance'
  | 'compatibilityBeforeLove'
  | 'emotionalCommunicationSaju'
  | 'relationshipRedFlagsTiming'
  | 'careerChangeTiming'
  | 'sideHustleVsStability'
  | 'wealthRiskManagement'
  | 'noonChartGuide'
  | 'birthTimeClues'
  | 'natalWithoutTime'

export type ArticleCluster =
  | 'starter'
  | 'relationship'
  | 'career'
  | 'unknown_time'
  | 'deep_dive'
  | 'astrology'

export interface ArticleMeta {
  id: string
  key: ArticleKey
  cluster: ArticleCluster
}

export const ARTICLE_CATALOG: ArticleMeta[] = [
  { id: 'what-is-saju', key: 'whatIsSaju', cluster: 'starter' },
  { id: 'five-elements', key: 'fiveElements', cluster: 'starter' },
  { id: 'what-is-ziwei', key: 'whatIsZiwei', cluster: 'starter' },
  { id: 'unknown-time-saju', key: 'unknownTimeSaju', cluster: 'unknown_time' },
  { id: 'love-and-relationships', key: 'loveAndRelationships', cluster: 'relationship' },
  { id: 'career-and-money', key: 'careerAndMoney', cluster: 'career' },
  { id: 'day-master-types', key: 'dayMasterTypes', cluster: 'deep_dive' },
  { id: 'ten-gods-for-beginners', key: 'tenGodsForBeginners', cluster: 'deep_dive' },
  { id: 'big-three-astrology', key: 'bigThreeAstrology', cluster: 'astrology' },
  { id: 'relationship-patterns', key: 'relationshipPatterns', cluster: 'relationship' },
  { id: 'relationship-timing', key: 'relationshipTiming', cluster: 'relationship' },
  { id: 'career-strengths-saju', key: 'careerStrengthsSaju', cluster: 'career' },
  { id: 'money-flow-timing', key: 'moneyFlowTiming', cluster: 'career' },
  { id: 'unknown-time-limits', key: 'unknownTimeLimits', cluster: 'unknown_time' },
  { id: 'ziwei-birth-time-importance', key: 'ziweiBirthTimeImportance', cluster: 'unknown_time' },
  { id: 'compatibility-before-love', key: 'compatibilityBeforeLove', cluster: 'relationship' },
  { id: 'emotional-communication-saju', key: 'emotionalCommunicationSaju', cluster: 'relationship' },
  { id: 'relationship-red-flags-timing', key: 'relationshipRedFlagsTiming', cluster: 'relationship' },
  { id: 'career-change-timing', key: 'careerChangeTiming', cluster: 'career' },
  { id: 'side-hustle-vs-stability', key: 'sideHustleVsStability', cluster: 'career' },
  { id: 'wealth-risk-management', key: 'wealthRiskManagement', cluster: 'career' },
  { id: 'noon-chart-guide', key: 'noonChartGuide', cluster: 'unknown_time' },
  { id: 'birth-time-clues', key: 'birthTimeClues', cluster: 'unknown_time' },
  { id: 'natal-without-time', key: 'natalWithoutTime', cluster: 'unknown_time' },
]

export const ARTICLE_RELATED_MAP: Record<string, string[]> = {
  'what-is-saju': ['day-master-types', 'ten-gods-for-beginners', 'career-and-money'],
  'five-elements': ['what-is-saju', 'career-and-money', 'big-three-astrology'],
  'what-is-ziwei': ['ziwei-birth-time-importance', 'career-and-money', 'big-three-astrology'],
  'unknown-time-saju': ['unknown-time-limits', 'ziwei-birth-time-importance', 'what-is-saju'],
  'love-and-relationships': ['relationship-patterns', 'relationship-timing', 'career-and-money'],
  'career-and-money': ['career-strengths-saju', 'money-flow-timing', 'ten-gods-for-beginners'],
  'day-master-types': ['ten-gods-for-beginners', 'career-strengths-saju', 'what-is-saju'],
  'ten-gods-for-beginners': ['day-master-types', 'career-and-money', 'relationship-patterns'],
  'big-three-astrology': ['love-and-relationships', 'career-and-money', 'what-is-ziwei'],
  'relationship-patterns': ['love-and-relationships', 'relationship-timing', 'what-is-saju'],
  'relationship-timing': ['relationship-patterns', 'love-and-relationships', 'unknown-time-saju'],
  'compatibility-before-love': ['love-and-relationships', 'relationship-patterns', 'relationship-timing'],
  'emotional-communication-saju': ['relationship-patterns', 'love-and-relationships', 'compatibility-before-love'],
  'relationship-red-flags-timing': ['relationship-timing', 'relationship-patterns', 'unknown-time-saju'],
  'career-strengths-saju': ['career-and-money', 'money-flow-timing', 'day-master-types'],
  'money-flow-timing': ['career-and-money', 'career-strengths-saju', 'ten-gods-for-beginners'],
  'career-change-timing': ['career-and-money', 'money-flow-timing', 'career-strengths-saju'],
  'side-hustle-vs-stability': ['career-strengths-saju', 'career-and-money', 'wealth-risk-management'],
  'wealth-risk-management': ['money-flow-timing', 'career-and-money', 'side-hustle-vs-stability'],
  'unknown-time-limits': ['unknown-time-saju', 'ziwei-birth-time-importance', 'what-is-saju'],
  'ziwei-birth-time-importance': ['unknown-time-saju', 'unknown-time-limits', 'what-is-ziwei'],
  'noon-chart-guide': ['unknown-time-saju', 'unknown-time-limits', 'natal-without-time'],
  'birth-time-clues': ['unknown-time-saju', 'ziwei-birth-time-importance', 'noon-chart-guide'],
  'natal-without-time': ['unknown-time-saju', 'unknown-time-limits', 'big-three-astrology'],
}
