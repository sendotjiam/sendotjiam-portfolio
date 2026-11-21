export interface SkillDomain {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  coreCompetencies: string[];
  productionFocus: string;
}

export const skillDomains: SkillDomain[] = [
  {
    id: 'runtime',
    tag: 'CORE // RUNTIME',
    title: 'Swift Runtime & Concurrency',
    subtitle: 'Modern Swift 6, Actors & Thread Safety',
    description: 'Eliminating data races and UI hitches using Swift 6 concurrency models, Task Groups, and low-level thread synchronization.',
    coreCompetencies: [
      'Swift 6',
      'Actors & Reentrancy',
      'Task Groups',
      'ARC & Memory Safety',
      'Grand Central Dispatch',
      'Python (Tooling)',
    ],
    productionFocus: 'Zero main-thread blocking, cooperative pool optimization',
  },
  {
    id: 'frameworks',
    tag: 'FRAMEWORKS // UI',
    title: 'iOS Frameworks & Rendering',
    subtitle: 'SwiftUI, UIKit & High-Throughput Feeds',
    description: 'Production-scale client interfaces across complex lifecycle states, custom view hierarchies, and reactive streams.',
    coreCompetencies: [
      'SwiftUI',
      'UIKit',
      'Combine',
      'RxSwift',
      'Texture (AsyncDisplayKit)',
      'Auto Layout & GeometryReader',
      'Core Animation',
    ],
    productionFocus: 'Fluid 120Hz ProMotion rendering & design token systems',
  },
  {
    id: 'architecture',
    tag: 'SYSTEMS // ARCHITECTURE',
    title: 'State Modeling & Modular Architecture',
    subtitle: 'Unidirectional Flow & Clean Boundaries',
    description: 'Scalable, modular architectures decoupling business domains from UI rendering to enable parallel team development.',
    coreCompetencies: [
      'The Composable Architecture (TCA)',
      'Clean Architecture',
      'VIPER',
      'MVVM-C',
      'Modular SPM Packages',
      'Protocol-Oriented Design',
    ],
    productionFocus: 'Strict boundary separation across 100+ module enterprise apps',
  },
  {
    id: 'diagnostics',
    tag: 'QUALITY // DIAGNOSTICS',
    title: 'Performance & Systems Diagnostics',
    subtitle: 'Instruments, MetricKit & Automated Verification',
    description: 'Rigorous runtime profiling to guarantee strict launch budgets, minimal memory footprints, and zero regressions.',
    coreCompetencies: [
      'Instruments (Time Profiler, Allocations)',
      'MetricKit Budgeting (<400ms launch)',
      'Swift Testing & XCTest',
      'Snapshot Testing',
      'Hang & Hitch Auditing (16ms budget)',
    ],
    productionFocus: '<400ms launch budget & automated test suites in CI',
  },
  {
    id: 'agentic',
    tag: 'APPLIED AI // TOOLING',
    title: 'AI Application Engineering & Agentic Tooling',
    subtitle: 'Applied AI, Agent Harnesses & Automated CI',
    description: 'Production integration of LLM agent harnesses, AST-level code analyzers, and autonomous developer loops accelerating engineering velocity.',
    coreCompetencies: [
      'Agentic Orchestration',
      'LLM Tool Calling & MCP',
      'Swift AST Parsers',
      'SARIF Diagnostic Exporters',
      'Evaluation Loops',
      'Fastlane & Xcodebuild CI',
    ],
    productionFocus: 'Internal AI harness plugins & automated PR verification',
  },
];

export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = skillDomains.map((domain) => ({
  title: domain.title,
  icon: domain.id === 'runtime' ? 'code' : domain.id === 'frameworks' ? 'layers' : domain.id === 'architecture' ? 'architecture' : domain.id === 'diagnostics' ? 'construction' : 'smart_toy',
  description: domain.description,
  skills: domain.coreCompetencies,
}));
