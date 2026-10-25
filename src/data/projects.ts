export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  badge?: string;
  badgeType?: 'default' | 'accent' | 'highlight';
  desc: string;
  tech: string[];
  logo?: string;
  link?: string;
  stars?: string;
}

export const projects: ProjectItem[] = [
  {
    id: 'grab-driver',
    title: 'Grab Driver iOS',
    category: 'Production Superapp',
    badge: 'Core Mobility',
    badgeType: 'accent',
    desc: 'The primary operational tool for millions of driver-partners across Southeast Asia. Spearheaded the critical In Transit lifecycle, enhancing booking state reliability, GPS interpolation, and offline error recovery.',
    tech: ['Swift 5.10', 'UIKit', 'RxSwift', 'VIPER', 'TCP Socket', 'Modularization', 'Unit Testing'],
    logo: '/assets/company-logo/grab-logo.jpeg',
    link: 'https://apps.apple.com/us/app/grab-driver-app-for-partners/id1257641454',
  },
  {
    id: 'tokopedia-ios',
    title: 'Tokopedia & TikTok Seller',
    category: 'E-Commerce Platform',
    badge: 'Top Grossing',
    badgeType: 'default',
    desc: 'Unified mobile onboarding and seller binding with TikTok Open Auth SDK. Revamped core accounts using Server-Driven UI with dynamic layout orchestration and led Texture-to-UIKit component migration.',
    tech: ['Swift', 'UIKit', 'TCA', 'Combine', 'RxSwift', 'Server-Driven UI', 'GraphQL'],
    logo: '/assets/project-logo/tokopedia-logo.jpeg',
    link: 'https://apps.apple.com/id/app/tokopedia/id1001394201',
  },
  {
    id: 'wikibus',
    title: 'WikiBus Singapore',
    category: 'Transit Utility',
    badge: 'Commuter App',
    badgeType: 'default',
    desc: 'Comprehensive public transit navigator for Singapore bus networks. Delivers real-time bus arrivals, dynamic route mapping, and stop inspection built with reactive architectural patterns.',
    tech: ['Swift', 'UIKit', 'Coordinator Pattern', 'MVVM', 'Combine', 'Modular SPM'],
    logo: '/assets/project-logo/wikibus-logo.png',
    link: 'https://id.linkedin.com/posts/sendo-tjiamis-a03a73192_wiki-bus-activity-7071854626613952512-VNfx',
  },
  {
    id: 'ovo-fintech',
    title: 'OVO Digital Wallet',
    category: 'Fintech & Payments',
    badge: 'High Throughput',
    badgeType: 'default',
    desc: 'Leading Indonesian fintech app for cashless transactions and bill payments. Engineered high-security payment funnels, biometric authentication, and modular payment SDK integrations.',
    tech: ['Swift', 'UIKit', 'ReactiveKit', 'MVVM', 'REST API', 'Security & Biometrics'],
    logo: '/assets/project-logo/ovo-logo.jpeg',
    link: 'https://apps.apple.com/id/app/ovo/id1047926101',
  },
  {
    id: 'buymax',
    title: 'BuyMax Crypto Viewer',
    category: 'Real-time Markets',
    badge: 'Open Source',
    badgeType: 'highlight',
    desc: 'Cryptocurrency market tracker streaming live price feeds via low-latency WebSockets. Features clean MVVM state separation and rapid charting update cycles.',
    tech: ['Swift', 'iOS', 'MVVM', 'WebSockets', 'Combine'],
    logo: '/assets/code.svg',
    link: 'https://github.com/sendotjiam/buymax-ios',
  },
  {
    id: 'eduai',
    title: 'EduAI Tutor',
    category: 'AI EdTech',
    badge: 'Product Slice',
    badgeType: 'default',
    desc: 'Adaptive learning companion generating personalized curricula for English literacy, adjusting challenge tiers dynamically to match student progress.',
    tech: ['TypeScript', 'React', 'Node.js', 'OpenAI API', 'MongoDB'],
    logo: '/assets/project-logo/eduai-logo.jpeg',
    link: 'https://www.eduai.biz/',
  },
];
