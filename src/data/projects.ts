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
    category: 'Ride Hailing',
    badge: 'Core Mobility',
    badgeType: 'accent',
    desc: 'The primary operational tool for millions of driver-partners across Southeast Asia. Spearheaded the critical In Transit lifecycle, enhancing booking state reliability, GPS interpolation, and offline error recovery.',
    tech: ['Swift', 'UIKit', 'RxSwift', 'VIPER', 'TCP Socket', 'Modularization', 'Unit Testing', 'UI Testing', 'Agentic Development', 'Oncall Investigation'],
    logo: '/assets/company-logo/grab-logo.jpeg',
    link: 'https://apps.apple.com/us/app/grab-driver-app-for-partners/id1257641454',
  },
  {
    id: 'tokopedia-ios',
    title: 'Tokopedia & TikTok Seller',
    category: 'E-Commerce',
    badge: 'Top Grossing',
    badgeType: 'default',
    desc: 'Unified mobile onboarding and seller binding with TikTok Open Auth SDK. Revamped core accounts with dynamic layout orchestration and led Texture-to-UIKit component migration.',
    tech: ['Swift', 'UIKit', 'The Composable Architecture (TCA)', 'Combine', 'RxSwift', 'GraphQL'],
    logo: '/assets/project-logo/tokopedia-logo.jpeg',
    link: 'https://apps.apple.com/id/app/tokopedia/id1001394201',
  },
  {
    id: 'wikibus',
    title: 'WikiBus Singapore',
    category: 'Commuter',
    badge: 'Commuter App',
    badgeType: 'default',
    desc: 'Comprehensive public transit navigator for Singapore bus networks. Delivers real-time bus arrivals, dynamic route mapping, and stop inspection built with reactive architectural patterns.',
    tech: ['Swift', 'SwiftUI', 'UIKit', 'Coordinator Pattern', 'MVVM', 'Combine', 'Modular SPM'],
    logo: '/assets/project-logo/wikibus-logo.png',
    link: 'https://id.linkedin.com/posts/sendo-tjiamis-a03a73192_wiki-bus-activity-7071854626613952512-VNfx',
  },
  {
    id: 'ovo-fintech',
    title: 'OVO Digital Wallet',
    category: 'Fintech',
    badge: 'High Throughput',
    badgeType: 'default',
    desc: 'Leading Indonesian fintech app for cashless transactions and bill payments. Engineered high-security payment funnels, biometric authentication, and modular payment SDK integrations.',
    tech: ['Swift', 'UIKit', 'ReactiveKit', 'MVVM', 'REST API'],
    logo: '/assets/project-logo/ovo-logo.jpeg',
    link: 'https://apps.apple.com/id/app/ovo/id1047926101',
  },
  {
    id: 'pastetap',
    title: 'PasteTap for macOS',
    category: 'Developer Utility',
    badge: 'Open Source',
    badgeType: 'highlight',
    desc: 'Sub-millisecond, 1-tap clipboard HUD for macOS developers. Built with Swift, zero telemetry, and instant numeric keyboard shortcuts.',
    tech: ['Swift', 'macOS', 'SwiftUI', 'AppKit', 'SPM'],
    logo: '/assets/project-logo/pastetap-logo.png',
    link: 'https://github.com/sendotjiam/paste-tap',
  },
  {
    id: 'eduai',
    title: 'EduAI Tutor',
    category: 'Education',
    badge: 'Product Slice',
    badgeType: 'default',
    desc: 'Adaptive learning companion generating personalized curricula for English literacy, adjusting challenge tiers dynamically to match student progress.',
    tech: ['Flutter', 'OCR', 'Tesseract'],
    logo: '/assets/project-logo/eduai-logo.jpeg',
    link: 'https://www.eduai.biz/',
  },
];
