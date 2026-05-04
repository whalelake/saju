import type { Language } from '../i18n'

export type SitePageKey = 'about' | 'contact' | 'editorialPolicy'

export interface SitePageLink {
  label: string
  href: string
  external?: boolean
}

export interface SitePageSection {
  heading: string
  body: string[]
  bullets?: string[]
  links?: SitePageLink[]
}

export interface SitePageContent {
  navLabel: string
  title: string
  description: string
  intro: string
  sections: SitePageSection[]
  ctaLinks: SitePageLink[]
}

export const SITE_PAGE_ROUTE_SUFFIX: Record<SitePageKey, string> = {
  about: '/about',
  contact: '/contact',
  editorialPolicy: '/editorial-policy',
}

export const SITE_PAGE_KEYS: SitePageKey[] = ['about', 'contact', 'editorialPolicy']

export const SITE_PAGE_CONTENT: Record<SitePageKey, Record<Language, SitePageContent>> = {
  about: {
    ko: {
      navLabel: '소개',
      title: '명운판 소개',
      description: '명운판은 사주팔자, 자미두수, 서양 점성술을 한 곳에서 계산하고 읽을 수 있도록 만든 브라우저 기반 명리학 도구입니다.',
      intro: '명운판은 계산기만 있는 사이트가 아니라, 계산 결과와 가이드, 기사, AI 후속 질문을 한 흐름으로 연결하는 실사용 중심 서비스입니다.',
      sections: [
        {
          heading: '명운판이 하는 일',
          body: [
            '사용자는 생년월일시를 한 번 입력하면 사주팔자, 자미두수, 서양 점성술 출생차트를 한 화면에서 확인할 수 있습니다.',
            '계산 결과를 보는 데서 끝나지 않도록, 용어 설명, 해석 가이드, 관련 기사, AI 후속 질문 흐름까지 함께 제공해 이해를 돕는 것이 목적입니다.',
          ],
          bullets: [
            '사주팔자: 천간지지, 십신, 운성, 신살, 대운 흐름',
            '자미두수: 명반, 주성, 사화, 대운/세운 흐름',
            '서양 점성술: 행성, 하우스, 애스펙트, 출생차트 해석',
          ],
        },
        {
          heading: '이 사이트가 다른 이유',
          body: [
            '명운판은 계산 로직을 브라우저 안에서 실행하는 구조를 우선합니다. 사용자는 회원가입 없이 빠르게 결과를 확인하고, 필요할 때만 AI 해석으로 넘어갈 수 있습니다.',
            '또한 결과 화면과 설명형 콘텐츠를 연결해, 처음 접하는 사용자도 용어를 바로 찾아보고 다음 읽을 글로 이어갈 수 있게 설계했습니다.',
          ],
          bullets: [
            '출생 시간을 모를 때도 일부 체계를 계속 읽을 수 있는 안내 제공',
            '가이드, 기사, 일주/십신/주성 사전형 페이지를 함께 운영',
            '한국어를 중심으로 영어, 일본어, 중국어 페이지를 함께 제공',
          ],
        },
        {
          heading: '만든 사람',
          body: [
            'whalelake Labs가 2026년 3월 명운판을 만들었습니다.',
            '소프트웨어 개발자이자 명리학 애호가로서, 오래전부터 사주·자미두수·점성술을 직접 공부해왔습니다. 그런데 기존 서비스는 대부분 유료이거나, 회원가입이 필요하거나, 결과가 단편적이었습니다. 돈을 내지 않고도 누구나 가볍게 자신의 명식을 확인할 수 있는 공간이 필요하다고 생각해 직접 만들었습니다.',
            '명운판은 세 가지 체계를 한 화면에서 무료로 계산하고 AI로 쉽게 읽을 수 있도록 만든 오픈소스 프로젝트입니다.',
          ],
          links: [
            { label: 'GitHub 저장소 보기', href: 'https://github.com/whalelake/saju', external: true },
          ],
        },
        {
          heading: '공개성과 개인정보',
          body: [
            '명운판의 코어 계산 엔진은 공개 저장소에서 확인할 수 있으며, 서비스의 기본 동작과 데이터 처리 방식도 정책 페이지에서 안내합니다.',
            '개인정보는 가능하면 브라우저 안에서 처리되도록 설계했고, 사용자가 AI 해석을 요청할 때만 필요한 정보가 일시적으로 활용됩니다.',
          ],
          links: [
            { label: '개인정보처리방침', href: '/privacy' },
            { label: '운영 원칙', href: '/editorial-policy' },
          ],
        },
      ],
      ctaLinks: [
        { label: '무료 계산 시작하기', href: '/' },
        { label: '가이드 모아보기', href: '/guide' },
        { label: '기사 모아보기', href: '/articles' },
      ],
    },
    en: {
      navLabel: 'About',
      title: 'About Myungunpan',
      description: 'Myungunpan is a browser-based destiny tool that brings Saju, Zi Wei Dou Shu, and Western natal chart reading into one place.',
      intro: 'Myungunpan is designed as more than a calculator. It connects chart results, explanatory guides, articles, and AI follow-up questions into a single reading flow.',
      sections: [
        {
          heading: 'What Myungunpan does',
          body: [
            'With one birth input, visitors can calculate Saju, Zi Wei Dou Shu, and a Western natal chart side by side.',
            'The goal is not only to show results, but to help readers understand them through plain-language guides, connected articles, and practical follow-up prompts.',
          ],
          bullets: [
            'Saju: stems and branches, Ten Gods, life cycles, and supporting indicators',
            'Zi Wei Dou Shu: chart layout, main stars, transformations, and fortune cycles',
            'Western astrology: planets, houses, aspects, and natal chart context',
          ],
        },
        {
          heading: 'Why this site exists',
          body: [
            'Myungunpan prioritizes a browser-first experience. Readers can calculate quickly without creating an account, then move into interpretation only when they want more depth.',
            'It also links result screens with educational content so beginners can move from unfamiliar terms into useful explanations without leaving the site.',
          ],
          bullets: [
            'Guidance for readers who do not know their birth time',
            'Integrated guides, articles, and reference pages for pillars, stars, and Ten Gods',
            'Korean-first content with English, Japanese, and Chinese routes',
          ],
        },
        {
          heading: 'About the team',
          body: [
            'Myungunpan was built by whalelake Labs in March 2026.',
            'As a software developer with a long-standing interest in Eastern astrology, I wanted a place where anyone could look up their chart without paying or creating an account. Most fortune-telling sites are paywalled, require registration, or only show one system at a time — none of which serves someone who just wants to take a quick, honest look at their own chart.',
            'Myungunpan is an open-source project. The calculation engine is publicly auditable, and the AI interpretation is a reading aid, not a substitute for genuine study.',
          ],
          links: [
            { label: 'View GitHub repository', href: 'https://github.com/whalelake/saju', external: true },
          ],
        },
        {
          heading: 'Transparency and privacy',
          body: [
            'The core calculation engine is available in a public repository, and the service explains its data handling and site policies openly.',
            'Personal data is kept in the browser whenever possible, and is only used temporarily when a visitor explicitly requests AI interpretation.',
          ],
          links: [
            { label: 'Privacy policy', href: '/privacy' },
            { label: 'Editorial policy', href: '/editorial-policy' },
          ],
        },
      ],
      ctaLinks: [
        { label: 'Start free calculation', href: '/' },
        { label: 'Browse guides', href: '/guide' },
        { label: 'Browse articles', href: '/articles' },
      ],
    },
    ja: {
      navLabel: '紹介',
      title: '命運盤について',
      description: '命運盤は、四柱推命・紫微斗数・西洋占星術の出生チャートをひとつの流れで読めるブラウザ型ツールです。',
      intro: '命運盤は単なる計算機ではなく、結果画面、解説ガイド、記事、AIへの追加質問までをひとつの読書体験としてつなぐことを目指しています。',
      sections: [
        {
          heading: '命運盤ができること',
          body: [
            '生年月日時を一度入力すると、四柱推命、紫微斗数、西洋占星術の出生チャートを並べて確認できます。',
            '結果を表示するだけでなく、用語解説、関連記事、AIへの追加質問までつなげて理解を助ける構成にしています。',
          ],
          bullets: [
            '四柱推命: 干支、十神、運勢の流れ',
            '紫微斗数: 命盤、主星、四化、運勢サイクル',
            '西洋占星術: 惑星、ハウス、アスペクト、出生図の文脈',
          ],
        },
        {
          heading: 'このサイトの特徴',
          body: [
            '命運盤はブラウザでの利用を優先して設計されています。会員登録なしで計算し、必要なときだけAI解釈に進めます。',
            'また、結果画面と学習コンテンツを結び、初心者でも用語から実際の読み方へ自然に進めるようにしています。',
          ],
          bullets: [
            '出生時間が不明な場合の読み方を案内',
            'ガイド、記事、日柱・主星・十神の参照ページを併設',
            '韓国語中心で、英語・日本語・中国語ページも提供',
          ],
        },
        {
          heading: '運営チームについて',
          body: [
            '命運盤は2026年3月にwhalelake Labsが制作しました。',
            'ソフトウェア開発者でありながら命理学に長年親しんできました。既存のサービスの多くは有料だったり、会員登録が必要だったり、一つの体系しか見られないものがほとんどでした。お金をかけずに、気軽に自分の命式を確認できる場所を作りたいと思い、このサービスを開発しました。',
            '命運盤はオープンソースプロジェクトです。計算エンジンは公開されており、AI解釈は学習の補助ツールとして位置づけています。',
          ],
          links: [
            { label: 'GitHub リポジトリ', href: 'https://github.com/whalelake/saju', external: true },
          ],
        },
        {
          heading: '公開性とプライバシー',
          body: [
            'コア計算エンジンは公開リポジトリで確認でき、データ処理やサイト運営方針も明示しています。',
            '個人データは可能な限りブラウザ内で扱い、AI解釈を明示的に求めた場合のみ一時的に利用されます。',
          ],
          links: [
            { label: 'プライバシーポリシー', href: '/privacy' },
            { label: '運営方針', href: '/editorial-policy' },
          ],
        },
      ],
      ctaLinks: [
        { label: '無料で計算する', href: '/' },
        { label: 'ガイドを見る', href: '/guide' },
        { label: '記事を見る', href: '/articles' },
      ],
    },
    zh: {
      navLabel: '关于',
      title: '关于命运盘',
      description: '命运盘是一个浏览器端命理工具，把四柱八字、紫微斗数和西方出生图放到同一条阅读路径中。',
      intro: '命运盘不只是一个计算器，而是把结果页面、解释型指南、文章和 AI 追问连接成完整阅读流程的服务。',
      sections: [
        {
          heading: '命运盘提供什么',
          body: [
            '用户输入一次出生资料后，可以并排查看四柱八字、紫微斗数和西方出生图。',
            '我们的目标不只是显示结果，还要通过通俗指南、相关文章和后续提问，帮助读者真正理解结果。',
          ],
          bullets: [
            '四柱八字：天干地支、十神、运势节奏与辅助指标',
            '紫微斗数：命盘、主星、四化与大运流向',
            '西方占星：行星、宫位、相位与出生图背景',
          ],
        },
        {
          heading: '这个网站的特点',
          body: [
            '命运盘优先采用浏览器端体验。用户无需注册即可快速计算，想进一步深入时再进入 AI 解读。',
            '同时，我们把结果页面和教学内容连接起来，让初学者也能顺着术语解释继续读到实用内容。',
          ],
          bullets: [
            '提供出生时间未知时的阅读建议',
            '同时运营指南、文章以及日柱、主星、十神索引页',
            '以韩语为主，同时提供英语、日语和中文页面',
          ],
        },
        {
          heading: '关于我们',
          body: [
            '命运判由 whalelake Labs 于 2026年3月创建。',
            '作为一名软件开发者，同时也是多年来对命理学深感兴趣的爱好者，我想打造一个不需要付费、不需要注册，任何人都能随手查看自己命盘的地方。大多数同类网站要么收费，要么需要注册，要么只提供单一体系。',
            '命运判是一个开源项目。计算引擎代码公开可查，AI 解读是辅助阅读的工具，不是替代深入研究的捷径。',
          ],
          links: [
            { label: '查看 GitHub 仓库', href: 'https://github.com/whalelake/saju', external: true },
          ],
        },
        {
          heading: '公开性与隐私',
          body: [
            '核心计算引擎可以在公开仓库中查看，站点的数据处理方式和政策页面也向用户公开说明。',
            '个人数据尽量保留在浏览器中，只有用户主动请求 AI 解读时才会被临时使用。',
          ],
          links: [
            { label: '隐私政策', href: '/privacy' },
            { label: '内容原则', href: '/editorial-policy' },
          ],
        },
      ],
      ctaLinks: [
        { label: '开始免费计算', href: '/' },
        { label: '查看指南', href: '/guide' },
        { label: '查看文章', href: '/articles' },
      ],
    },
  },
  contact: {
    ko: {
      navLabel: '문의',
      title: '문의하기',
      description: '명운판 관련 문의, 오류 제보, 제안은 이메일과 GitHub Issues로 받고 있습니다.',
      intro: '서비스 이용 중 오류를 발견했거나, 설명이 더 필요한 지점이 있거나, 협업 제안을 남기고 싶다면 아래 채널로 연락해 주세요.',
      sections: [
        {
          heading: '연락 채널',
          body: [
            '가장 빠른 방법은 이메일입니다. 서비스 이용 문의, 콘텐츠 제안, 광고/제휴 문의를 이 채널로 받을 수 있습니다.',
            '기능 오류나 재현 가능한 버그는 GitHub Issues로 남겨주시면 확인과 추적이 더 쉽습니다.',
          ],
          links: [
            { label: 'whalelake1981@gmail.com', href: 'mailto:whalelake1981@gmail.com' },
            { label: 'GitHub Issues', href: 'https://github.com/whalelake/saju/issues', external: true },
          ],
        },
        {
          heading: '문의 시 함께 보내주시면 좋은 정보',
          body: [
            '간단한 상황 설명만 있어도 좋지만, 아래 정보를 함께 적어주시면 더 빠르게 확인할 수 있습니다.',
          ],
          bullets: [
            '접속한 페이지 주소와 사용한 언어',
            '입력한 출생 정보 범위와 기대했던 결과',
            '실제로 보인 오류 메시지나 화면 캡처',
          ],
        },
        {
          heading: '응답과 수정',
          body: [
            '모든 문의에 즉시 답변을 보장할 수는 없지만, 재현 가능한 오류와 정책 관련 문의는 우선적으로 확인합니다.',
            '콘텐츠 오류나 계산 설명 보완 요청은 검토 후 가이드, 기사, 정책 페이지에 반영할 수 있습니다.',
          ],
        },
      ],
      ctaLinks: [
        { label: '소개 페이지 보기', href: '/about' },
        { label: '운영 원칙 보기', href: '/editorial-policy' },
      ],
    },
    en: {
      navLabel: 'Contact',
      title: 'Contact',
      description: 'Questions, bug reports, and suggestions for Myungunpan can be sent by email or GitHub Issues.',
      intro: 'If you found a bug, need clarification, or want to suggest a collaboration, please use one of the channels below.',
      sections: [
        {
          heading: 'How to reach us',
          body: [
            'Email is the fastest path for general questions, content suggestions, and partnership requests.',
            'For reproducible bugs or feature requests, GitHub Issues makes tracking and follow-up easier.',
          ],
          links: [
            { label: 'whalelake1981@gmail.com', href: 'mailto:whalelake1981@gmail.com' },
            { label: 'GitHub Issues', href: 'https://github.com/whalelake/saju/issues', external: true },
          ],
        },
        {
          heading: 'Helpful details to include',
          body: [
            'A short note is fine, but adding a bit of context helps us review the issue faster.',
          ],
          bullets: [
            'The page URL and language you used',
            'The birth input range you tested and what you expected',
            'Any error message or screenshot that shows the problem',
          ],
        },
        {
          heading: 'Response and fixes',
          body: [
            'Not every message can receive an immediate reply, but reproducible bugs and policy-related questions are reviewed first.',
            'When a content gap or explanation issue is confirmed, we may update the relevant guide, article, or policy page.',
          ],
        },
      ],
      ctaLinks: [
        { label: 'About Myungunpan', href: '/about' },
        { label: 'Editorial policy', href: '/editorial-policy' },
      ],
    },
    ja: {
      navLabel: 'お問い合わせ',
      title: 'お問い合わせ',
      description: '命運盤に関する質問、バグ報告、提案はメールまたは GitHub Issues で受け付けています。',
      intro: '不具合を見つけた場合や説明の補足が必要な場合、あるいは協力提案がある場合は、以下の窓口からご連絡ください。',
      sections: [
        {
          heading: '連絡方法',
          body: [
            '一般的なお問い合わせ、コンテンツ提案、提携相談はメールがもっとも早い窓口です。',
            '再現できるバグや機能要望は GitHub Issues に残していただくと確認と追跡がしやすくなります。',
          ],
          links: [
            { label: 'whalelake1981@gmail.com', href: 'mailto:whalelake1981@gmail.com' },
            { label: 'GitHub Issues', href: 'https://github.com/whalelake/saju/issues', external: true },
          ],
        },
        {
          heading: '一緒に送っていただけると助かる情報',
          body: [
            '短い説明だけでも大丈夫ですが、次の情報があると確認が早くなります。',
          ],
          bullets: [
            '利用したページ URL と言語',
            '入力した出生情報の範囲と期待していた結果',
            '表示されたエラー文や画面キャプチャ',
          ],
        },
        {
          heading: '返信と修正対応',
          body: [
            'すべてのご連絡に即時返信できるわけではありませんが、再現可能な不具合やポリシー関連の内容は優先的に確認します。',
            '説明不足や内容の誤りが確認された場合は、ガイドや記事、ポリシーページを更新することがあります。',
          ],
        },
      ],
      ctaLinks: [
        { label: '命運盤について', href: '/about' },
        { label: '運営方針', href: '/editorial-policy' },
      ],
    },
    zh: {
      navLabel: '联系',
      title: '联系我们',
      description: '命运盘相关问题、错误反馈和建议，可以通过电子邮件或 GitHub Issues 联系我们。',
      intro: '如果你发现了错误、希望补充说明，或想提出合作建议，可以通过下面的渠道联系。',
      sections: [
        {
          heading: '联系渠道',
          body: [
            '对于一般咨询、内容建议和合作沟通，电子邮件是最快的方式。',
            '如果是可以复现的错误或功能建议，使用 GitHub Issues 更方便追踪和后续处理。',
          ],
          links: [
            { label: 'whalelake1981@gmail.com', href: 'mailto:whalelake1981@gmail.com' },
            { label: 'GitHub Issues', href: 'https://github.com/whalelake/saju/issues', external: true },
          ],
        },
        {
          heading: '建议一并提供的信息',
          body: [
            '只写简短说明也可以，但如果附上以下信息，会更方便我们排查。',
          ],
          bullets: [
            '访问的页面地址和使用语言',
            '测试时输入的出生信息范围以及预期结果',
            '出现的错误信息或截图',
          ],
        },
        {
          heading: '回复与修正',
          body: [
            '我们无法保证对每条消息立即回复，但可复现的错误和政策相关问题会优先查看。',
            '如果确认是内容说明不足或错误，我们会更新相应的指南、文章或政策页面。',
          ],
        },
      ],
      ctaLinks: [
        { label: '关于命运盘', href: '/about' },
        { label: '内容原则', href: '/editorial-policy' },
      ],
    },
  },
  editorialPolicy: {
    ko: {
      navLabel: '운영 원칙',
      title: '명운판 운영 원칙',
      description: '명운판의 설명형 콘텐츠, 계산 결과, AI 해석 기능이 어떤 기준으로 운영되는지 정리한 페이지입니다.',
      intro: '명운판은 점술 콘텐츠를 자극적으로 소비하게 만드는 대신, 계산 결과와 설명형 문서를 차분하게 연결하는 방향을 우선합니다.',
      sections: [
        {
          heading: '콘텐츠를 만드는 기준',
          body: [
            '가이드와 기사 페이지는 초심자가 실제 계산 결과를 이해할 수 있도록 용어, 구조, 읽는 순서를 설명하는 데 초점을 둡니다.',
            '한 페이지 안에서 정의, 해석 포인트, 다음에 읽을 링크가 자연스럽게 이어지도록 구성해 얇은 소개문으로 끝나지 않게 관리합니다.',
          ],
          bullets: [
            '용어 정의만 나열하지 않고 실제 읽는 순서를 함께 설명',
            '사주, 자미두수, 점성술의 차이와 연결점을 동시에 제시',
            '관련 기사와 계산 화면으로 이어지는 내부 링크 유지',
          ],
        },
        {
          heading: '계산 결과와 AI의 역할',
          body: [
            '핵심 계산은 브라우저에서 동작하는 코드 기반 엔진이 수행합니다. 결과값을 먼저 제시하고, 사용자가 원할 때만 AI 해석으로 확장하는 흐름을 유지합니다.',
            'AI는 사용자의 질문을 바탕으로 결과를 쉽게 풀어주는 보조 도구입니다. 진단, 법률, 투자 판단처럼 고위험 결정을 대신하는 용도로 설계하지 않습니다.',
          ],
          bullets: [
            '회원가입 없이 계산 결과를 먼저 확인 가능',
            '출생 시간 미상 여부에 따라 제공 가능한 체계를 구분',
            'AI 해석은 후속 질문 중심의 보조 기능으로 제공',
          ],
        },
        {
          heading: '수정과 품질 관리',
          body: [
            '페이지 설명이 부족하거나 잘못 연결된 경우, 관련 가이드와 기사, 정책 페이지를 함께 수정해 사이트 전체 흐름이 맞도록 관리합니다.',
            '재현 가능한 오류 제보나 정책 관련 문의는 우선적으로 검토하며, 필요한 경우 sitemap, 메타데이터, 내부 링크 구조도 함께 정비합니다.',
          ],
          links: [
            { label: '문의하기', href: '/contact' },
            { label: 'GitHub Issues', href: 'https://github.com/whalelake/saju/issues', external: true },
            { label: '개인정보처리방침', href: '/privacy' },
          ],
        },
      ],
      ctaLinks: [
        { label: '명운판 소개', href: '/about' },
        { label: '기사 모아보기', href: '/articles' },
      ],
    },
    en: {
      navLabel: 'Editorial Policy',
      title: 'Myungunpan Editorial Policy',
      description: 'This page explains how Myungunpan approaches explanatory content, chart results, and AI-assisted interpretation.',
      intro: 'Myungunpan prioritizes calm, useful reading over sensational fortune content, and aims to connect chart output with educational pages in a practical way.',
      sections: [
        {
          heading: 'How content is shaped',
          body: [
            'Guide and article pages are built to help beginners understand real chart output, not to stop at a thin definition or a vague inspirational paragraph.',
            'Each page aims to combine explanation, interpretation points, and related follow-up links so readers can continue their learning without losing context.',
          ],
          bullets: [
            'Definitions are paired with reading order and usage context',
            'The site compares and connects Saju, Zi Wei Dou Shu, and astrology where helpful',
            'Internal links are maintained so readers can move between articles, guides, and calculators',
          ],
        },
        {
          heading: 'What calculation and AI each do',
          body: [
            'Core calculations are handled by a code-based engine that runs in the browser. Readers see the underlying chart output first, and can optionally continue into AI interpretation.',
            'AI is used as a follow-up explanation tool, not as a substitute for medical, legal, or financial judgment.',
          ],
          bullets: [
            'Visitors can see calculation results before choosing interpretation',
            'Unknown birth time is handled explicitly so system limits stay clear',
            'AI appears as a user-invoked companion, not the only source of meaning',
          ],
        },
        {
          heading: 'Corrections and quality updates',
          body: [
            'When a page is weak, inaccurate, or poorly linked, we update the related guide, article, and supporting policy pages together so the site remains coherent.',
            'Reproducible bugs and policy-related questions are reviewed first, and may lead to updates in navigation, metadata, or sitemap structure as well as page text.',
          ],
          links: [
            { label: 'Contact', href: '/contact' },
            { label: 'GitHub Issues', href: 'https://github.com/whalelake/saju/issues', external: true },
            { label: 'Privacy policy', href: '/privacy' },
          ],
        },
      ],
      ctaLinks: [
        { label: 'About Myungunpan', href: '/about' },
        { label: 'Browse articles', href: '/articles' },
      ],
    },
    ja: {
      navLabel: '運営方針',
      title: '命運盤の運営方針',
      description: '命運盤の解説コンテンツ、計算結果、AI補助解釈をどのような基準で運営しているかをまとめています。',
      intro: '命運盤は刺激的な占い消費よりも、計算結果と解説ページを落ち着いて結びつけることを優先しています。',
      sections: [
        {
          heading: 'コンテンツ作成の考え方',
          body: [
            'ガイドと記事は、初心者が実際の計算結果を理解できるように、用語、構造、読み進め方を一緒に説明することを重視しています。',
            '定義だけを並べて終わるのではなく、解釈のポイントと次に読むページまで含めて、一つの読み筋になるように設計しています。',
          ],
          bullets: [
            '用語の定義に加えて、実際の読み方の順序を示す',
            '四柱推命・紫微斗数・西洋占星術の違いと接点を整理する',
            '記事、ガイド、計算画面を内部リンクでつなぐ',
          ],
        },
        {
          heading: '計算とAIの役割',
          body: [
            'コア計算はブラウザで動作するコードベースのエンジンが担当します。まず結果を表示し、必要な場合にだけAI解釈へ進める流れを維持しています。',
            'AIは結果をわかりやすく言い換える補助機能であり、医療・法律・投資のような高リスク判断を代替するための設計ではありません。',
          ],
          bullets: [
            '会員登録なしで結果を先に確認できる',
            '出生時間不明時の利用範囲を明示する',
            'AIはユーザーが呼び出す追加説明の役割にとどめる',
          ],
        },
        {
          heading: '修正と品質管理',
          body: [
            'ページの説明が弱い、誤っている、リンクが噛み合わないと判断した場合は、関連するガイド、記事、ポリシーページをまとめて見直します。',
            '再現可能な不具合やポリシー関連の質問は優先して確認し、必要に応じてナビゲーション、メタデータ、サイトマップ構造も更新します。',
          ],
          links: [
            { label: 'お問い合わせ', href: '/contact' },
            { label: 'GitHub Issues', href: 'https://github.com/whalelake/saju/issues', external: true },
            { label: 'プライバシーポリシー', href: '/privacy' },
          ],
        },
      ],
      ctaLinks: [
        { label: '命運盤について', href: '/about' },
        { label: '記事を見る', href: '/articles' },
      ],
    },
    zh: {
      navLabel: '内容原则',
      title: '命运盘内容原则',
      description: '这里说明命运盘如何处理说明型内容、计算结果以及 AI 辅助解读。',
      intro: '命运盘优先提供可理解、可继续阅读的内容结构，而不是只追求刺激性的运势表达。',
      sections: [
        {
          heading: '内容如何组织',
          body: [
            '指南和文章页面的目标，是帮助初学者理解真实计算结果，而不是停留在单薄定义或空泛鼓励上。',
            '每个页面都会尽量把概念说明、解读重点和后续阅读链接放在同一条路径里，让读者继续深入时不会失去上下文。',
          ],
          bullets: [
            '不仅解释术语，也说明实际阅读顺序',
            '在合适的时候连接四柱、紫微斗数和占星三套体系',
            '维护文章、指南与计算页面之间的内部链接',
          ],
        },
        {
          heading: '计算与 AI 分工',
          body: [
            '核心计算由浏览器中的代码引擎完成。用户先看到图表结果，再决定是否进入 AI 解读。',
            'AI 主要用于辅助解释和追问，不作为医疗、法律、投资等高风险判断的替代工具。',
          ],
          bullets: [
            '用户可以先看结果，再决定是否继续解读',
            '明确说明出生时间未知时哪些系统仍可使用',
            'AI 是用户主动调用的辅助层，而不是唯一内容来源',
          ],
        },
        {
          heading: '修正与质量更新',
          body: [
            '如果某个页面解释薄弱、链接混乱或信息不足，我们会连同相关指南、文章和政策页面一起修订，保持站点整体一致。',
            '可复现的错误和政策相关问题会优先查看，必要时也会同步调整导航、元数据和 sitemap 结构。',
          ],
          links: [
            { label: '联系我们', href: '/contact' },
            { label: 'GitHub Issues', href: 'https://github.com/whalelake/saju/issues', external: true },
            { label: '隐私政策', href: '/privacy' },
          ],
        },
      ],
      ctaLinks: [
        { label: '关于命运盘', href: '/about' },
        { label: '查看文章', href: '/articles' },
      ],
    },
  },
}

export function getSitePagePathByLanguage(pageKey: SitePageKey): Record<Language, string> {
  const suffix = SITE_PAGE_ROUTE_SUFFIX[pageKey]
  return {
    ko: `/ko${suffix}`,
    en: `/en${suffix}`,
    ja: `/ja${suffix}`,
    zh: `/zh${suffix}`,
  }
}

export function getSitePageKeyBySuffix(suffix: string): SitePageKey | null {
  const entry = Object.entries(SITE_PAGE_ROUTE_SUFFIX).find(([, value]) => value === suffix)
  return (entry?.[0] as SitePageKey | undefined) ?? null
}
