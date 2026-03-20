import type { TranslationKeys } from './ko'

export const en: TranslationKeys = {
  // Common
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    close: 'Close',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    copy: 'Copy',
    share: 'Share',
    download: 'Download',
  },

  // Header
  header: {
    compatibility: 'Compatibility',
    settings: 'Settings',
    github: 'GitHub',
  },

  // Hero
  hero: {
    title: 'Myungunpan',
    subtitle: 'Discover Your Destiny',
    description: 'Eastern & Western divination in one place, interpreted by AI',
    free: 'Completely Free',
    secure: 'Privacy Safe',
    ai: 'AI Interpretation',
    cta: 'View My Destiny',
    saju: 'Four Pillars',
    sajuDesc: 'Ten Gods · Stars · Major Cycles',
    ziwei: 'Zi Wei Dou Shu',
    ziweiDesc: 'Main Stars · Assistant Stars · Four Transformations',
    natal: 'Western Astrology',
    natalDesc: 'Planets · Houses · Aspects',
    // Additional descriptions
    intro: 'Myungunpan is a free divination platform where you can explore Eastern Saju and Zi Wei Dou Shu alongside Western Astrology in one place. Simply enter your birth information to instantly calculate all three systems, with GPT-4o AI providing easy-to-understand interpretations.',
    why: 'Why Myungunpan?',
    whyDesc: 'Myungunpan never sends your personal information to servers—all calculations happen in your browser. Complex divination theories are explained in simple language by AI, and the platform is open-source for transparency, verification, and community improvement.',
    feature1: 'Three Systems Integrated',
    feature1Desc: 'Explore Eastern Saju, Zi Wei Dou Shu, and Western Natal Charts all at once.',
    feature2: 'AI-Powered Interpretation',
    feature2Desc: 'GPT-4o explains complex terms and theories in plain, accessible language.',
    feature3: 'Complete Privacy',
    feature3Desc: 'All calculations run in your browser—no personal data is transmitted externally.',
    feature4: 'Compatibility Analysis',
    feature4Desc: 'Compare two birth charts to analyze relationship harmony and complementary traits.',
  },

  // Form
  form: {
    year: 'Year',
    month: 'Month',
    day: 'Day',
    hour: 'Hour',
    minute: 'Minute',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    calendar: 'Calendar',
    solar: 'Solar',
    lunar: 'Lunar',
    unknownTime: 'Time Unknown',
    calculate: 'Calculate',
    city: 'Birth City',
    cityPlaceholder: 'Enter city name...',
    leapMonth: 'Leap Month',
  },

  // Results
  results: {
    pillars: 'Four Pillars',
    year: 'Year',
    month: 'Month',
    day: 'Day',
    hour: 'Hour',
    heavenlyStem: 'Stem',
    earthlyBranch: 'Branch',
    hiddenStems: 'Hidden',
    tenGods: 'Ten Gods',
    stars: 'Stars',
    majorCycles: 'Major Cycles',
    age: 'Age',
    copy: 'Copy',
    aiInterpret: 'AI Interpret',
  },

  // AI Interpretation
  interpret: {
    title: 'AI Interpretation',
    step1Title: 'Whose chart is this?',
    step2Title: 'What would you like to know?',
    step3Title: 'AI Interpretation Results',
    self: 'Self',
    child: 'Child',
    partner: 'Partner/Spouse',
    friend: 'Friend',
    other: 'Other',
    personality: 'Personality Analysis',
    advice: 'Life Advice',
    compatibility: 'Compatibility',
    general: 'General Reading',
    questionPlaceholder: 'e.g., How is my wealth luck this year?',
    askAnother: 'Ask Another Question',
    analyzing: 'Analyzing...',
    suggestions: 'Suggested Questions',
  },

  // Compatibility
  compare: {
    title: 'Compatibility Comparison',
    person1: 'First Person',
    person2: 'Second Person',
    compare: 'Compare',
    compatibility: 'Compatibility',
    analysis: 'Analysis',
  },

  // Guide
  guide: {
    title: 'User Guide',
    features: 'Key Features',
    aiFeature: 'AI Interpretation',
    aiDesc: 'GPT-4o comprehensively analyzes Four Pillars/Zi Wei/Astrology',
    compatibilityFeature: 'Compatibility Analysis',
    compatibilityDesc: 'Compare two people\'s birth charts',
    historyFeature: 'History Management',
    historyDesc: 'Save and load past analysis results',
    shareFeature: 'Share Results',
    shareDesc: 'Save as image and share',
    copyFeature: 'Copy Text',
    copyDesc: 'Copy results as text',
    // Usage steps
    step1: 'Enter your birth year, month, day, time, and gender.',
    step2: 'button to calculate.',
    step3: 'Switch tabs to view Saju, Zi Wei, and Natal Chart.',
    step4: 'button for AI analysis.',
    // Ask AI
    askAiTitle: 'Ask AI Directly',
    askAiDesc: 'Copy your chart data and ask ChatGPT or Claude directly.',
    exampleLabel: 'Example',
    exampleText: 'Here\'s my Saju, Zi Wei chart, and Natal Chart. Analyze my personality strengths and weaknesses.',
    examplePlaceholder: '[Paste copied data here]',
    // Concepts
    concepts: 'Fortune-Telling Concepts',
    sajuTitle: 'What is Saju (Four Pillars)?',
    sajuDesc1: 'Saju (四柱八字), or Four Pillars of Destiny, is the core of Eastern fortune-telling that represents birth year, month, day, and hour using Heavenly Stems (天干) and Earthly Branches (地支). The four pillars each have a stem and branch, creating eight characters total, through which one\'s innate destiny and personality are understood.',
    sajuDesc2: 'The ten Heavenly Stems are 甲 (Jia), 乙 (Yi), 丙 (Bing), 丁 (Ding), 戊 (Wu), 己 (Ji), 庚 (Geng), 辛 (Xin), 壬 (Ren), 癸 (Gui). The twelve Earthly Branches are 子 (Zi), 丑 (Chou), 寅 (Yin), 卯 (Mao), 辰 (Chen), 巳 (Si), 午 (Wu), 未 (Wei), 申 (Shen), 酉 (You), 戌 (Xu), 亥 (Hai).',
    sajuDesc3: 'The Ten Gods classify relationships between the Day Master and other stems into categories like Companion, Rob Wealth, Eating God, Hurting Officer, Indirect Wealth, Direct Wealth, Seven Killings, Direct Officer, Indirect Resource, and Direct Resource, providing insights into wealth luck, career prospects, and relationships.',
    ziweiTitle: 'What is Zi Wei Dou Shu?',
    ziweiDesc1: 'Zi Wei Dou Shu (紫微斗數) is a Chinese astrological system perfected during the Song Dynasty. It analyzes destiny by placing stars across 12 palaces based on birth time. Named after Zi Wei Star (the North Star), it\'s known for highly precise predictions.',
    ziweiDesc2: 'The natal chart (命盤) is divided into 12 palaces: Life Palace (self), Parents Palace, Fortune Palace, Property Palace, Career Palace, Servants Palace, Travel Palace, Health Palace, Wealth Palace, Children Palace, Spouse Palace, and Siblings Palace. Each palace\'s main stars, assistant stars, and Four Transformations reveal different life aspects.',
    ziweiDesc3: 'Zi Wei Dou Shu is particularly valued for its practical ability to predict relationships, career, wealth, and health with great specificity among Eastern divination systems.',
    natalTitle: 'What is Western Astrology?',
    natalDesc1: 'Western Astrology analyzes personality and destiny by mapping planetary positions at birth moment across 12 zodiac signs and 12 houses. The Natal Chart is essentially a unique cosmic map for each individual.',
    natalDesc2: 'The positions of 10 planets (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto) across zodiac signs and houses determine personality, talents, relationships, career, and more.',
    natalDesc3: 'Aspects represent angular relationships between planets: conjunction (0°), sextile (60°), square (90°), trine (120°), opposition (180°), showing how planets interact and influence each other.',
    // Interpretation Guide
    interpretGuide: 'Interpretation Guide',
    pillarsGuide: 'Saju Reading Tips',
    pillarsGuide1: 'The Day Stem represents yourself and is the center of interpretation.',
    pillarsGuide2: 'Year Pillar: ancestors & childhood; Month: parents & youth; Day: self & spouse; Hour: children & later years.',
    pillarsGuide3: 'The Ten Gods reveal wealth luck (Wealth Stars), career (Officer Stars), and academic fortune (Resource Stars).',
    ziweiGuide: 'Zi Wei Reading Tips',
    ziweiGuide1: 'The main star in the Life Palace determines overall personality and destiny foundation.',
    ziweiGuide2: 'Wealth Palace shows financial luck, Career Palace shows job prospects, Spouse Palace shows marriage fortune.',
    ziweiGuide3: 'The Four Transformations (Lu, Quan, Ke, Ji) are key indicators of fortune changes and flow.',
    natalGuide: 'Natal Chart Reading Tips',
    natalGuide1: 'Sun represents ego & will; Moon represents emotions & inner self; Ascendant (ASC) represents outer image.',
    natalGuide2: 'Venus shows love & aesthetics; Mars shows drive & desire; Mercury shows thinking & communication.',
    natalGuide3: 'Houses represent life areas: 1st (self), 2nd (wealth), 7th (relationships), 10th (career), etc.',
    // FAQ
    faq: 'Frequently Asked Questions',
    faqQ1: 'What if I don\'t know my birth time?',
    faqA1: 'Select "Time Unknown" to calculate with only three pillars. However, since the Hour Pillar represents later years, we recommend finding your birth time through birth certificates if possible.',
    faqQ2: 'Should I enter solar or lunar calendar?',
    faqA2: 'Either works. Saju traditionally uses lunar calendar, but if you enter solar dates, it automatically converts to lunar for calculation.',
    faqQ3: 'How accurate is AI interpretation?',
    faqA3: 'AI interpretation is based on extensive fortune-telling knowledge but should be used for reference only. For important decisions, consult a professional practitioner.',
    faqQ4: 'What are Major Cycles (Daeun)?',
    faqA4: 'Major Cycles (大運) represent 10-year fortune periods. The starting age varies based on gender and the yin-yang of the Year Pillar.',
    // Tips
    tips: 'Usage Tips',
    tip1: 'Viewing multiple systems together provides more dimensional understanding.',
    tip2: 'Check regularly to understand current fortune and trends.',
    tip3: 'Comparing charts of family or friends helps understand relationships.',
    disclaimer: 'Myungunpan is an open-source project for fun and self-understanding. Please consult professionals for important life decisions.',
  },

  // Settings
  settings: {
    title: 'Settings',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
  },

  // Footer
  footer: {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    contact: 'Contact',
    copyright: 'Myungunpan. AGPL-3.0 License.',
  },

  // Privacy Policy
  privacy: {
    title: 'Privacy Policy',
    effectiveDate: 'Effective Date: March 18, 2025',
  },

  // Terms of Service
  terms: {
    title: 'Terms of Service',
    effectiveDate: 'Effective Date: March 18, 2025',
  },
}
