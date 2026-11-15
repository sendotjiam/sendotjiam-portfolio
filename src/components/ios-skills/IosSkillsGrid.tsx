'use client';

import { useState } from 'react';

interface SkillItem {
  id: string;
  name: string;
  category: 'Performance' | 'UI & Render' | 'Memory & Data' | 'Architecture' | 'Compliance & Modern';
  badge: string;
  badgeType?: 'accent' | 'default' | 'highlight';
  summary: string;
  guideline: string;
  detectedIssues: string[];
  command: string;
}

const SKILLS_DATA: SkillItem[] = [
  {
    id: 'ios-concurrency-audit',
    name: 'ios-concurrency-audit',
    category: 'Performance',
    badge: 'MetricKit <400ms',
    badgeType: 'highlight',
    summary: 'Audits codebases for severe hangs (≥250ms), mini-hangs / hitches (16–250ms), actor reentrancy hazards, data races, deadlocks, and Swift 6 unsafety.',
    guideline: 'Apple MetricKit Responsiveness & Swift 6 Data-Race Safety',
    detectedIssues: [
      'Synchronous Data(contentsOf:) or file read on @MainActor',
      'Actor reentrancy state mutations across await suspensions',
      'DispatchQueue.main.sync deadlock hazards from background queues',
      'Cooperative thread pool starvation from unbounded synchronous loops',
    ],
    command: '/ios-concurrency-audit',
  },
  {
    id: 'swiftui-render-optimization',
    name: 'swiftui-render-optimization',
    category: 'UI & Render',
    badge: '120fps ProMotion',
    badgeType: 'accent',
    summary: 'Audits and optimizes SwiftUI view hierarchies for 120fps/60fps smoothness, detecting body invalidation churn and layout thrashing.',
    guideline: 'WWDC SwiftUI Performance & View Identity Guidelines',
    detectedIssues: [
      'Heavy body computation (DateFormatter/NumberFormatter repeated init)',
      'AnyView type erasure destroying SwiftUI structural identity',
      'Observation over-invalidation (@Observable vs legacy ObservableObject)',
      'Explicit UUID() identity churn forcing complete view re-creation',
    ],
    command: '/swiftui-render-optimization',
  },
  {
    id: 'ios-memory-leak-audit',
    name: 'ios-memory-leak-audit',
    category: 'Memory & Data',
    badge: 'Zero Retain Cycles',
    badgeType: 'highlight',
    summary: 'Audits Swift and Objective-C code for ARC retain cycles, target-action leaks, unmanaged CoreFoundation leaks, and missing autorelease pools.',
    guideline: 'Apple ARC Memory Management & Leaks Instruments',
    detectedIssues: [
      'Combine publisher.assign(to:on: self) strong self retain cycle',
      'Non-weak closure captures in escaping completion handlers',
      'Un-invalidated Timer and CADisplayLink target-action retain cycles',
      'Raw UIImage(contentsOfFile:) decompression bloat without downsampling',
    ],
    command: '/ios-memory-leak-audit',
  },
  {
    id: 'ios-app-launch-audit',
    name: 'ios-app-launch-audit',
    category: 'Performance',
    badge: 'Cold Launch <400ms',
    badgeType: 'highlight',
    summary: 'Audits cold and warm app launch bottlenecks against MetricKit’s <400ms budget, main-thread I/O in didFinishLaunching, and SDK init pileups.',
    guideline: 'Apple MetricKit Launch Metrics & dyld3/dyld4 Optimization',
    detectedIssues: [
      'Synchronous SwiftData / Core Data NSPersistentContainer loading in @main init',
      'Blocking disk I/O and synchronous network setup in didFinishLaunchingWithOptions',
      'Third-party SDK initialization pileup on the main runloop before first frame',
      'Legacy Objective-C +load methods introducing pre-main dynamic linker delay',
    ],
    command: '/ios-app-launch-audit',
  },
  {
    id: 'coredata-swiftdata-audit',
    name: 'coredata-swiftdata-audit',
    category: 'Memory & Data',
    badge: 'Thread Safety',
    badgeType: 'default',
    summary: 'Audits Core Data and SwiftData stacks for context concurrency hazards, fault thrashing, batch delete/insert inefficiencies, and CloudKit constraints.',
    guideline: 'Apple Core Data Concurrency & SwiftData ModelContext Specs',
    detectedIssues: [
      'Accessing NSManagedObject / PersistentModel outside perform / performAndWait',
      'Individual row insert/delete loops instead of NSBatchInsertRequest',
      'Unconstrained fetch requests thrashing SQLite faults without batchSize limits',
      'CloudKit sync schema migration hazards and non-optional attribute additions',
    ],
    command: '/coredata-swiftdata-audit',
  },
  {
    id: 'ios-privacy-security-audit',
    name: 'ios-privacy-security-audit',
    category: 'Compliance & Modern',
    badge: 'May 2024 Policy',
    badgeType: 'highlight',
    summary: 'Audits codebases for Apple Privacy Manifest (PrivacyInfo.xcprivacy) required reason APIs, unencrypted UserDefaults tokens, and ATS exceptions.',
    guideline: 'Apple May 2024 Required Reason API & App Store Review Guideline 5.1.1',
    detectedIssues: [
      'Calling UserDefaults without NSPrivacyAccessedAPICategoryUserDefaults entry',
      'Storing authentication JWTs and user credentials in plaintext UserDefaults',
      'App Transport Security (ATS) NSAllowsArbitraryLoads insecure domain exceptions',
      'Biometric authentication local evaluation bypasses without LAContext invalidation',
    ],
    command: '/ios-privacy-security-audit',
  },
  {
    id: 'ios-iphone-duo-audit',
    name: 'ios-iphone-duo-audit',
    category: 'Compliance & Modern',
    badge: 'iOS 27.1+ Foldable',
    badgeType: 'accent',
    summary: 'Audits and adapts apps for iPhone Duo foldable displays, tabletop/book poses, ReservedRegion occlusion margins, and vertical toolbars.',
    guideline: 'Apple Dual-Display Hinge & ReservedRegion Architectural API',
    detectedIssues: [
      'Action controls and touch targets overlapping the central hinge occlusion zone',
      'Missing ArrangementView / UIArrangementViewController multi-pane adaptation',
      'Horizontal toolbar item overflow on outer compact vertical display',
      'Missing tabletop / tent pose camera coordination via AVCaptureDeviceDirectionCoordinator',
    ],
    command: '/ios-iphone-duo-audit',
  },
  {
    id: 'ios-a11y-audit',
    name: 'ios-a11y-audit',
    category: 'UI & Render',
    badge: 'WCAG 2.1 AA',
    badgeType: 'default',
    summary: 'Audits SwiftUI and UIKit view hierarchies for VoiceOver tree integrity, Dynamic Type text clipping, 44x44pt tap targets, and sensory adaptations.',
    guideline: 'Apple Accessibility Human Interface Guidelines & performAccessibilityAudit',
    detectedIssues: [
      'Icon-only buttons missing accessibilityLabel and accessibilityHint attributes',
      'Static font sizes (.font(.system(size: 16))) clipping under Dynamic Type',
      'Interactive touch targets smaller than Apple standard 44x44pt minimum',
      'Missing prefers-reduced-motion adaptations for continuous keyframe loops',
    ],
    command: '/ios-a11y-audit',
  },
  {
    id: 'swift-testing-migration',
    name: 'swift-testing-migration',
    category: 'Architecture',
    badge: 'WWDC24 Modern',
    badgeType: 'accent',
    summary: 'Audits test suites for modernization to the WWDC24 Swift Testing framework (@Suite, @Test), converting legacy XCTestCase classes.',
    guideline: 'WWDC24 Swift Testing Framework & Swift 6 Concurrency',
    detectedIssues: [
      'Legacy XCTestCase classes and imperative XCTAssertEqual boilerplate',
      'Manual loops and dispatch queues replacing @Test(arguments: [...]) parametrization',
      'Flaky Thread.sleep and expectation waits instead of confirmation blocks',
      'Mutable test fixture state causing concurrency race conditions under parallel execution',
    ],
    command: '/swift-testing-migration',
  },
  {
    id: 'ios-codebase-cleanup',
    name: 'ios-codebase-cleanup',
    category: 'Architecture',
    badge: 'Safe Purge',
    badgeType: 'default',
    summary: 'Audits and safely purges dead Swift files, orphaned asset catalogs (.imageset, .colorset), dead markdown docs, and synchronizes PBXProj.',
    guideline: 'Clean Architecture, Xcode Project File Integrity & Git Safety',
    detectedIssues: [
      'Unreferenced Swift source files left dangling in filesystem but removed from PBXProj',
      'Orphaned asset catalogs and images not referenced anywhere in codebase',
      'Unused internal symbols, dead protocols, and unneeded module imports',
      'Stale documentation markdown files referencing defunct project features',
    ],
    command: '/ios-codebase-cleanup',
  },
];

const CATEGORIES = [
  'All',
  'Performance',
  'UI & Render',
  'Memory & Data',
  'Architecture',
  'Compliance & Modern',
] as const;

export default function IosSkillsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const filteredSkills =
    selectedCategory === 'All'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-12 sm:py-16 border-t border-[var(--separator)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[12px] font-semibold text-apple-tint">
              Specialized audits
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-apple-tint/10 text-apple-tint">
              10 Curated Skills
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-label mb-2">
            The Complete Apple Audit Suite
          </h2>
          <p className="text-[15px] text-apple-secondary leading-relaxed">
            Each skill embodies deep Apple platform rules, MetricKit budgets, and Human Interface Guidelines, packaged as autonomous agent workflows.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap items-center gap-1.5 self-start md:self-auto max-w-full pb-1 sm:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`text-[12px] font-semibold px-3 py-1.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint shrink-0 ${
                selectedCategory === cat
                  ? 'bg-apple-tint text-white shadow-apple-sm'
                  : 'bg-black/5 dark:bg-white/10 text-apple-secondary hover:text-apple-label'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredSkills.map((skill) => {
          const isExpanded = expandedSkill === skill.id;
          return (
            <div
              key={skill.id}
              className="apple-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between border border-black/10 dark:border-white/10 transition-[box-shadow,border-color] duration-200 hover:shadow-apple-md"
            >
              <div>
                {/* Top Header: Name & Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-[16px] font-bold text-apple-label font-mono tracking-tight">
                      {skill.name}
                    </h3>
                    <span className="text-[12px] text-apple-tertiary">{skill.category}</span>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                      skill.badgeType === 'highlight'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        : skill.badgeType === 'accent'
                        ? 'bg-apple-tint/10 text-apple-tint border border-apple-tint/20'
                        : 'bg-black/5 dark:bg-white/10 text-apple-secondary border border-black/5 dark:border-white/10'
                    }`}
                  >
                    {skill.badge}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-[13.5px] text-apple-secondary leading-relaxed mb-4">
                  {skill.summary}
                </p>

                {/* Guideline Tag */}
                <div className="mb-4 text-[12px] flex items-center gap-1.5 text-apple-tint">
                  <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="truncate font-medium">{skill.guideline}</span>
                </div>

                {/* Expandable Issues Caught */}
                {isExpanded && (
                  <div className="mb-4 pt-3 border-t border-[var(--separator)] space-y-1.5 animate-fadeIn motion-reduce:animate-none">
                    <span className="text-[12px] font-semibold text-apple-tertiary block mb-1">
                      Critical patterns detected:
                    </span>
                    {skill.detectedIssues.map((issue, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[12px] text-apple-secondary">
                        <span className="text-red-500 font-mono mt-0.5">•</span>
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-[var(--separator)] flex flex-wrap items-center justify-between gap-2 text-[12px]">
                <button
                  type="button"
                  onClick={() => setExpandedSkill(isExpanded ? null : skill.id)}
                  className="text-apple-secondary hover:text-apple-label font-medium transition-colors min-h-[36px] flex items-center"
                >
                  {isExpanded ? 'Hide Patterns ↑' : 'View Detected Patterns ↓'}
                </button>

                <div className="flex items-center gap-1.5 font-mono text-[11px] px-2 py-1 rounded bg-black/5 dark:bg-white/10 text-apple-label shrink-0">
                  <span className="text-apple-tertiary select-none">$</span>
                  <span>{skill.command}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Engineering Advisory & Community Contribution Notice */}
      <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[13px]">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0 mt-0.5">
            <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-apple-label mb-1">
              Engineering advisory: use wisely and verify diffs
            </h4>
            <p className="text-apple-secondary leading-relaxed">
              These agent skills and AST heuristics are assistive developer tools, not 100% infallible compilers. Edge cases or false positives may occur depending on your project architecture. Always review AI-generated changes, run automated tests, and please report issues or contribute PRs to help improve the suite.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <a
            href="https://github.com/sendotjiam/ios-agent-skills/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-1.5 rounded-xl text-[12px] font-semibold text-apple-label bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
          >
            <span>Report Issue</span>
            <svg aria-hidden="true" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          <a
            href="https://github.com/sendotjiam/ios-agent-skills/pulls"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-1.5 rounded-xl text-[12px] font-semibold text-white bg-apple-tint hover:bg-apple-tint/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
          >
            <span>Contribute Fix</span>
          </a>
        </div>
      </div>
    </section>
  );
}
