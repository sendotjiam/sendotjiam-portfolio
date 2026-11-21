'use client';

import { useState } from 'react';

type AuditPresetKey = 'concurrency' | 'render' | 'memory' | 'privacy' | 'foldable';
type OutputFormat = 'xcode' | 'terminal' | 'sarif' | 'markdown';

interface AuditPreset {
  id: AuditPresetKey;
  label: string;
  skill: string;
  category: string;
  ruleId: string;
  severity: 'error' | 'warning';
  title: string;
  description: string;
  file: string;
  line: number;
  badCode: string;
  fixedCode: string;
  xcodeMessage: string;
  terminalOutput: string[];
  sarifSnippet: string;
  markdownComment: string;
}

function PresetIcon({ id }: { id: AuditPresetKey }) {
  if (id === 'concurrency') {
    return (
      <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
  }
  if (id === 'render') {
    return (
      <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0 text-apple-tint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }
  if (id === 'memory') {
    return (
      <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    );
  }
  if (id === 'privacy') {
    return (
      <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="12" y1="2" x2="12" y2="22" />
    </svg>
  );
}

const PRESETS: Record<AuditPresetKey, AuditPreset> = {
  concurrency: {
    id: 'concurrency',
    label: 'Concurrency Hang',
    skill: 'ios-concurrency-audit',
    category: 'Performance',
    ruleId: 'HANG-001',
    severity: 'error',
    title: 'Main-Thread Synchronous I/O Blocking Hang',
    description: 'Calling Data(contentsOf:) synchronously inside a @MainActor method blocks the UI runloop for ≥250ms, causing hitches and risk of iOS 0x8badf00d watchdog termination.',
    file: 'Sources/Features/ProfileViewModel.swift',
    line: 42,
    badCode: `@MainActor
func loadAvatar(from url: URL) {
    // ⚠️ HANG-001: Synchronous I/O on main actor
    if let data = try? Data(contentsOf: url) {
        self.avatarImage = UIImage(data: data)
    }
}`,
    fixedCode: `@MainActor
func loadAvatar(from url: URL) async {
    // ✅ Audited: Asynchronous non-blocking download
    do {
        let (data, _) = try await URLSession.shared.data(from: url)
        self.avatarImage = UIImage(data: data)
    } catch {
        self.avatarImage = nil
    }
}`,
    xcodeMessage: 'ProfileViewModel.swift:42:19: error: [HANG-001] Synchronous Data(contentsOf:) blocks @MainActor for ≥250ms MetricKit budget. Use URLSession async instead.',
    terminalOutput: [
      '\x1b[34m[ios-audit]\x1b[0m Scanning project at /Sources/Features...',
      '\x1b[32m✔\x1b[0m Scanned 48 Swift files in 18ms',
      '\x1b[31m✖ ERROR\x1b[0m [HANG-001] Sources/Features/ProfileViewModel.swift:42:19',
      '   \x1b[90m41 |\x1b[0m @MainActor func loadAvatar(from url: URL) {',
      '   \x1b[31m42 |\x1b[0m     if let data = try? Data(contentsOf: url) {',
      '   \x1b[90m   |\x1b[0m                        ^^^^^^^^^^^^^^^^^^^^ Synchronous I/O violates MetricKit <400ms budget',
      '   \x1b[90m43 |\x1b[0m         self.avatarImage = UIImage(data: data)',
      '\x1b[33m💡 Fix:\x1b[0m Refactor to `await URLSession.shared.data(from: url)` or run /ios-concurrency-audit',
      '\x1b[31m[FAIL]\x1b[0m 1 error, 0 warnings found in 1 file (Elapsed: 22ms)',
    ],
    sarifSnippet: `{
  "$schema": "https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json",
  "version": "2.1.0",
  "runs": [{
    "tool": { "driver": { "name": "ios-audit", "version": "1.0.0" } },
    "results": [{
      "ruleId": "HANG-001",
      "level": "error",
      "message": { "text": "Synchronous I/O on @MainActor violates MetricKit budget." },
      "locations": [{
        "physicalLocation": {
          "artifactLocation": { "uri": "Sources/Features/ProfileViewModel.swift" },
          "region": { "startLine": 42, "startColumn": 19 }
        }
      }]
    }]
  }]
}`,
    markdownComment: `### 🚨 iOS Agent Audit Finding: Concurrency Hang

| Metric | Detail |
| :--- | :--- |
| **Rule ID** | \`HANG-001\` |
| **Severity** | **Severe Error** (Main Thread Block) |
| **File** | \`Sources/Features/ProfileViewModel.swift:42\` |
| **Budget** | MetricKit $<400\\text{ms}$ Launch & Scroll Budget |

**Remediation**: Replaced blocking \`Data(contentsOf:)\` with non-blocking structured Swift Concurrency \`URLSession.shared.data(from:)\`.`,
  },
  render: {
    id: 'render',
    label: 'SwiftUI Render Hitch',
    skill: 'swiftui-render-optimization',
    category: 'UI/UX Performance',
    ruleId: 'RENDER-002',
    severity: 'warning',
    title: 'Expensive Object Instantiation in Body + AnyView Churn',
    description: 'Instantiating DateFormatter() inside `var body` and returning AnyView erases view structural identity, causing 120fps ProMotion render hitches during scroll.',
    file: 'Sources/Views/TransactionRow.swift',
    line: 18,
    badCode: `struct TransactionRow: View {
    let transaction: Transaction
    var body: some View {
        // ⚠️ RENDER-002: Expensive formatter re-allocated every frame
        let formatter = DateFormatter()
        return AnyView(
            Text(formatter.string(from: transaction.date))
        )
    }
}`,
    fixedCode: `struct TransactionRow: View {
    let transaction: Transaction
    // ✅ Audited: Memoized static formatter & concrete structural view
    private static let formatter: DateFormatter = {
        let f = DateFormatter()
        f.dateStyle = .medium
        return f
    }()

    var body: some View {
        Text(Self.formatter.string(from: transaction.date))
    }
}`,
    xcodeMessage: 'TransactionRow.swift:18:25: warning: [RENDER-002] DateFormatter() in SwiftUI body causes layout hitches. Hoist to static or use FormattedText.',
    terminalOutput: [
      '\x1b[34m[ios-audit]\x1b[0m Scanning project at /Sources/Views...',
      '\x1b[32m✔\x1b[0m Scanned 34 SwiftUI views in 14ms',
      '\x1b[33m⚠ WARNING\x1b[0m [RENDER-002] Sources/Views/TransactionRow.swift:18:25',
      '   \x1b[90m17 |\x1b[0m var body: some View {',
      '   \x1b[33m18 |\x1b[0m     let formatter = DateFormatter()',
      '   \x1b[90m   |\x1b[0m                     ^^^^^^^^^^^^^^^ Repeated allocation inside render body (120fps hitch)',
      '   \x1b[33m19 |\x1b[0m     return AnyView(Text(...))',
      '   \x1b[90m   |\x1b[0m            ^^^^^^^ AnyView erases view structural identity',
      '\x1b[33m💡 Fix:\x1b[0m Hoist DateFormatter to `private static let` or use Text(date, style: .date)',
      '\x1b[33m[WARN]\x1b[0m 0 errors, 1 warning found in 1 file (Elapsed: 16ms)',
    ],
    sarifSnippet: `{
  "ruleId": "RENDER-002",
  "level": "warning",
  "message": { "text": "Repeated DateFormatter allocation in View.body destroys 120fps smoothness." },
  "locations": [{ "physicalLocation": { "artifactLocation": { "uri": "Sources/Views/TransactionRow.swift" }, "region": { "startLine": 18 } } }]
}`,
    markdownComment: `### ⚠️ SwiftUI Render Optimization Advisory

- **Rule**: \`RENDER-002\` (Body Allocation & AnyView identity erasure)
- **Impact**: Drops ProMotion frame rate from 120fps to 48fps during fast list scrolling.
- **Fix Applied**: Hoisted to static memoized formatter and restored concrete view type.`,
  },
  memory: {
    id: 'memory',
    label: 'ARC Retain Cycle',
    skill: 'ios-memory-leak-audit',
    category: 'Memory & ARC',
    ruleId: 'LEAK-001',
    severity: 'error',
    title: 'Combine assign(to:on:) Strong Self Cycle',
    description: 'Using publisher.assign(to:on: self) captures strong self reference, preventing the ViewModel from deallocating upon dismiss.',
    file: 'Sources/ViewModels/SearchViewModel.swift',
    line: 29,
    badCode: `class SearchViewModel: ObservableObject {
    @Published var query = ""
    @Published var results: [Item] = []
    private var cancellables = Set<AnyCancellable>()

    func bind() {
        // ⚠️ LEAK-001: Strong reference retain cycle
        searchService.search(query)
            .assign(to: \\.results, on: self)
            .store(in: &cancellables)
    }
}`,
    fixedCode: `class SearchViewModel: ObservableObject {
    @Published var query = ""
    @Published var results: [Item] = []
    private var cancellables = Set<AnyCancellable>()

    func bind() {
        // ✅ Audited: assign(to: &$results) does not retain self
        searchService.search(query)
            .assign(to: &$results)
    }
}`,
    xcodeMessage: 'SearchViewModel.swift:29:13: error: [LEAK-001] assign(to:on: self) causes strong retain cycle. Use assign(to: &$results) or [weak self].',
    terminalOutput: [
      '\x1b[34m[ios-audit]\x1b[0m Checking Combine bindings for retain cycles...',
      '\x1b[31m✖ ERROR\x1b[0m [LEAK-001] Sources/ViewModels/SearchViewModel.swift:29:13',
      '   \x1b[90m28 |\x1b[0m     searchService.search(query)',
      '   \x1b[31m29 |\x1b[0m         .assign(to: \\.results, on: self)',
      '   \x1b[90m   |\x1b[0m                                   ^^^^ Strong cycle prevents deallocation',
      '\x1b[33m💡 Fix:\x1b[0m Replace with iOS 14+ `assign(to: &$results)` or `.sink { [weak self] in ... }`',
      '\x1b[31m[FAIL]\x1b[0m 1 memory hazard detected (Elapsed: 19ms)',
    ],
    sarifSnippet: `{
  "ruleId": "LEAK-001",
  "level": "error",
  "message": { "text": "Combine assign(to:on:) captures strong self, causing memory leak." }
}`,
    markdownComment: `### 🚨 Memory Leak Audit Warning: ARC Retain Cycle
- **Detected**: Strong reference cycle in \`SearchViewModel\`
- **Consequence**: Multiple ViewModels accumulate in heap memory on back-navigation.
- **Resolution**: Converted to inout published property assignment \`assign(to: &$results)\`.`,
  },
  privacy: {
    id: 'privacy',
    label: 'Privacy Manifest',
    skill: 'ios-privacy-security-audit',
    category: 'Security & App Store',
    ruleId: 'PRIVACY-003',
    severity: 'error',
    title: 'Missing Apple Privacy Manifest Required Reason API',
    description: 'Directly calling UserDefaults or storing sensitive tokens in unencrypted plists violates Apple May 2024 mandatory Privacy Manifest policies.',
    file: 'Sources/Services/AuthStorage.swift',
    line: 15,
    badCode: `class AuthStorage {
    func saveToken(_ token: String) {
        // ⚠️ PRIVACY-003: Plaintext token in UserDefaults & missing CA92.1 manifest
        UserDefaults.standard.set(token, forKey: "user_jwt_token")
    }
}`,
    fixedCode: `class AuthStorage {
    // ✅ Audited: Hardware-backed Keychain storage
    func saveToken(_ token: String) {
        KeychainService.save(
            key: "user_jwt_token",
            data: Data(token.utf8),
            accessibility: .afterFirstUnlockThisDeviceOnly
        )
    }
}`,
    xcodeMessage: 'AuthStorage.swift:15:9: error: [PRIVACY-003] Plaintext token stored in UserDefaults. Store credentials in Keychain and declare NSPrivacyAccessedAPIType in PrivacyInfo.xcprivacy.',
    terminalOutput: [
      '\x1b[34m[ios-audit]\x1b[0m Auditing PrivacyInfo.xcprivacy against Apple May 2024 policy...',
      '\x1b[31m✖ ERROR\x1b[0m [PRIVACY-003] Sources/Services/AuthStorage.swift:15:9',
      '   \x1b[90m14 |\x1b[0m func saveToken(_ token: String) {',
      '   \x1b[31m15 |\x1b[0m     UserDefaults.standard.set(token, forKey: "user_jwt_token")',
      '   \x1b[90m   |\x1b[0m     ^^^^^^^^^^^^^^^^^^^^^^^^ Security hazard: JWT token in unencrypted UserDefaults',
      '\x1b[33m💡 Fix:\x1b[0m Store secrets in Keychain with kSecAttrAccessibleAfterFirstUnlock',
      '\x1b[31m[FAIL]\x1b[0m App Store submission risk flagged (Elapsed: 24ms)',
    ],
    sarifSnippet: `{
  "ruleId": "PRIVACY-003",
  "level": "error",
  "message": { "text": "Unencrypted token in UserDefaults and missing PrivacyInfo.xcprivacy entry." }
}`,
    markdownComment: `### 🛡️ Apple Privacy & Security Policy Flag
- **Violation**: Plaintext credential storage in UserDefaults without declared reason API.
- **Risk**: Automatic App Store Connect rejection during pre-release validation.
- **Remediation**: Migrated to Keychain item with device-only hardware enclave access.`,
  },
  foldable: {
    id: 'foldable',
    label: 'Foldable iPhone Duo',
    skill: 'ios-iphone-duo-audit',
    category: 'Dual-Display & Hinge',
    ruleId: 'FOLD-004',
    severity: 'warning',
    title: 'Hinge Occlusion Hazard in iPhone Duo Tabletop Pose',
    description: 'Spanning primary call-to-action buttons across the central screen fold without ReservedRegion occlusion margins results in clipped touch targets.',
    file: 'Sources/Views/CheckoutBottomBar.swift',
    line: 35,
    badCode: `struct CheckoutBottomBar: View {
    var body: some View {
        HStack(spacing: 12) {
            // ⚠️ FOLD-004: Primary CTA lands right inside hinge occlusion
            Button("Complete Payment") { proceed() }
                .frame(maxWidth: .infinity)
        }
        .padding()
    }
}`,
    fixedCode: `struct CheckoutBottomBar: View {
    var body: some View {
        // ✅ Audited: ReservedRegion division keeps button on active primary display
        ArrangementView {
            Button("Complete Payment") { proceed() }
                .frame(maxWidth: .infinity)
        }
        .reservedRegion(.division, placement: .primaryPane)
        .padding()
    }
}`,
    xcodeMessage: 'CheckoutBottomBar.swift:35:13: warning: [FOLD-004] Primary action button spans central hinge. Use .reservedRegion(.division) or ArrangementView for iPhone Duo.',
    terminalOutput: [
      '\x1b[34m[ios-audit]\x1b[0m Auditing iOS 27.1+ foldable & dual-display compatibility...',
      '\x1b[33m⚠ WARNING\x1b[0m [FOLD-004] Sources/Views/CheckoutBottomBar.swift:35:13',
      '   \x1b[90m34 |\x1b[0m HStack(spacing: 12) {',
      '   \x1b[33m35 |\x1b[0m     Button("Complete Payment") { proceed() }',
      '   \x1b[90m   |\x1b[0m     ^^^^^^^^^^^^^^^^^^^^^^^^^^ Element crosses iPhone Duo hinge occlusion zone',
      '\x1b[33m💡 Fix:\x1b[0m Wrap in `ArrangementView` with `.reservedRegion(.division, placement: .primaryPane)`',
      '\x1b[33m[WARN]\x1b[0m 1 foldable UI optimization suggested (Elapsed: 21ms)',
    ],
    sarifSnippet: `{
  "ruleId": "FOLD-004",
  "level": "warning",
  "message": { "text": "UI element occluded by iPhone Duo central hinge. Apply ReservedRegion." }
}`,
    markdownComment: `### 📱 iPhone Duo Foldable Layout Audit
- **Rule**: \`FOLD-004\` (Hinge occlusion avoidance)
- **Guideline**: Apple iOS 27.1+ Dual-Display & Tabletop pose ergonomics.
- **Fix**: Wrapped layout in \`ArrangementView\` preserving touch margins away from the hinge.`,
  },
};

export default function IosAuditSimulator() {
  const [activeKey, setActiveKey] = useState<AuditPresetKey>('concurrency');
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('xcode');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [appliedFix, setAppliedFix] = useState<boolean>(false);

  const preset = PRESETS[activeKey];

  const handleRunAudit = () => {
    setIsScanning(true);
    setAppliedFix(false);
    setTimeout(() => {
      setIsScanning(false);
    }, 320);
  };

  const handleSwitchPreset = (key: AuditPresetKey) => {
    setActiveKey(key);
    setAppliedFix(false);
  };

  return (
    <section id="simulator" className="py-12 sm:py-16 border-t border-[var(--separator)]">
      {/* Section Header */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[12px] font-semibold text-apple-tint">
            Interactive testbed
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-apple-tint/10 text-apple-tint">
            Live Browser Simulation
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-label mb-3">
          Simulate Unified Audits in Real Time
        </h2>
        <p className="text-[15px] text-apple-secondary leading-relaxed">
          Test how <code className="font-mono text-apple-label text-[13px] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">./bin/ios-audit</code> inspects code, flags architectural hazards, and outputs structured diagnostics across Xcode, Terminal, and CI.
        </p>
      </div>

      {/* Preset Selector Pill Tabs */}
      <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap items-center gap-2 mb-6 pb-1 sm:pb-0 max-w-full">
        {(Object.keys(PRESETS) as AuditPresetKey[]).map((key) => {
          const item = PRESETS[key];
          const isSelected = activeKey === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleSwitchPreset(key)}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-[13px] font-semibold flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint shrink-0 ${
                isSelected
                  ? 'bg-apple-tint text-white shadow-apple-sm'
                  : 'bg-black/5 dark:bg-white/10 text-apple-secondary hover:text-apple-label hover:bg-black/10 dark:hover:bg-white/15'
              }`}
            >
              <PresetIcon id={item.id} />
              <span className="whitespace-nowrap">{item.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/10 text-apple-tertiary'
                }`}
              >
                {item.ruleId}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Terminal Card */}
      <div className="apple-card rounded-2xl overflow-hidden shadow-apple-md">
        {/* Terminal Window Header Chrome */}
        <div className="bg-black/5 dark:bg-white/5 border-b border-[var(--separator)] px-3.5 sm:px-4 py-2.5 sm:py-0 sm:h-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {/* Top Row on mobile: Traffic Lights + Filename + Scan Button */}
          <div className="flex items-center justify-between sm:justify-start gap-2 min-w-0">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-[var(--traffic-red)] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[var(--traffic-yellow)] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[var(--traffic-green)] inline-block" />
            </div>
            <span className="font-mono text-[11px] sm:text-[12px] text-apple-tertiary truncate max-w-[170px] sm:max-w-none">
              ios-audit : {preset.file}
            </span>

            {/* Run Audit Action Button (Mobile only) */}
            <div className="sm:hidden shrink-0">
              <button
                type="button"
                onClick={handleRunAudit}
                disabled={isScanning}
                className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-apple-tint text-white hover:bg-apple-tint/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint disabled:opacity-50 min-h-[30px]"
              >
                {isScanning ? (
                  <>
                    <svg aria-hidden="true" className="w-3 h-3 animate-spin motion-reduce:animate-none" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Scan…</span>
                  </>
                ) : (
                  <>
                    <svg aria-hidden="true" className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>Scan</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Format Switcher Tabs */}
          <div className="flex items-center gap-1 bg-black/5 dark:bg-black/30 p-1 rounded-lg overflow-x-auto no-scrollbar max-w-full shrink-0">
            {(
              [
                { id: 'xcode', label: 'Xcode' },
                { id: 'terminal', label: 'Terminal' },
                { id: 'sarif', label: 'SARIF' },
                { id: 'markdown', label: 'PR Bot' },
              ] as const
            ).map((fmt) => (
              <button
                key={fmt.id}
                type="button"
                onClick={() => setOutputFormat(fmt.id)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-md transition-colors shrink-0 ${
                  outputFormat === fmt.id
                    ? 'bg-white dark:bg-white/20 text-apple-label shadow-apple-sm'
                    : 'text-apple-secondary hover:text-apple-label'
                }`}
              >
                {fmt.label}
              </button>
            ))}
          </div>

          {/* Run Audit Action Button (Desktop sm+) */}
          <div className="hidden sm:block shrink-0">
            <button
              type="button"
              onClick={handleRunAudit}
              disabled={isScanning}
              className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1 rounded-lg bg-apple-tint text-white hover:bg-apple-tint/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <svg aria-hidden="true" className="w-3.5 h-3.5 animate-spin motion-reduce:animate-none" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Scanning…</span>
                </>
              ) : (
                <>
                  <svg aria-hidden="true" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Scan File</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Diagnostic Banner */}
        <div className="px-4 sm:px-5 py-3 bg-black/[0.02] dark:bg-white/[0.02] border-b border-[var(--separator)] flex flex-wrap items-center justify-between gap-2.5 text-[13px]">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-bold capitalize shrink-0 ${
                preset.severity === 'error'
                  ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
              }`}
            >
              {preset.severity}
            </span>
            <span className="font-bold text-apple-label break-words">{preset.title}</span>
          </div>

          <div className="flex items-center gap-3 text-[12px] text-apple-secondary">
            <span>
              Skill: <strong className="text-apple-label font-mono">{preset.skill}</strong>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="font-mono text-apple-tertiary">Line {preset.line}</span>
          </div>
        </div>

        {/* Code Diff & Diagnostics Body */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (7 cols): Swift Code Diff with Toggle */}
          <div className="lg:col-span-7 flex flex-col justify-between min-w-0">
            <div>
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5 xs:gap-2 mb-2">
                <span className="text-[12px] font-semibold text-apple-tertiary truncate">
                  {appliedFix ? 'Remediated Code (Fixed)' : 'Violating Source Code'}
                </span>
                <button
                  type="button"
                  onClick={() => setAppliedFix(!appliedFix)}
                  className="text-[12px] font-semibold text-apple-tint hover:underline flex items-center gap-1 shrink-0 self-start xs:self-auto"
                >
                  {appliedFix ? '← Show Original Code' : '✦ Preview Automated Fix →'}
                </button>
              </div>

              {/* Code Display Area */}
              <div className="rounded-xl overflow-hidden bg-[var(--terminal-card)] p-3 sm:p-4 text-white font-mono text-[12px] sm:text-[12.5px] leading-relaxed border border-black/20 shadow-inner">
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5 pb-2 mb-3 border-b border-white/10 text-[11px] text-zinc-400">
                  <span className="truncate font-mono min-w-0">{preset.file}</span>
                  <span className={`shrink-0 whitespace-nowrap px-2 py-0.5 rounded font-sans font-semibold text-[10px] sm:text-[11px] self-start xs:self-auto ${
                    appliedFix
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {appliedFix ? '100% Clean' : 'Audit Violation'}
                  </span>
                </div>
                <pre className="overflow-x-auto text-[11.5px] sm:text-[12.5px]">
                  <code>{appliedFix ? preset.fixedCode : preset.badCode}</code>
                </pre>
              </div>
            </div>

            {/* Description Card */}
            <div className="mt-4 p-3.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 text-[13px] text-apple-secondary leading-relaxed">
              <strong className="text-apple-label block mb-1">Architectural Analysis:</strong>
              {preset.description}
            </div>
          </div>

          {/* Right Column (5 cols): Selected Output Format Display */}
          <div className="lg:col-span-5 flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-semibold text-apple-tertiary">
                Output View: <span className="text-apple-tint">{outputFormat.toUpperCase()}</span>
              </span>
              <span className="text-[11px] font-mono text-apple-tertiary">22ms execution</span>
            </div>

            <div className="flex-1 rounded-xl bg-[var(--terminal-bg)] p-3 sm:p-4 text-zinc-200 font-mono text-[11px] sm:text-[11.5px] leading-relaxed border border-black/20 overflow-x-auto min-h-[220px] sm:min-h-[260px] flex flex-col justify-between">
              {/* Output format render */}
              {outputFormat === 'xcode' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-200 text-[12px]">
                    <div className="flex items-center gap-2 font-bold mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <span>Xcode Issue Navigator</span>
                    </div>
                    <p className="font-mono break-all">{preset.xcodeMessage}</p>
                  </div>
                  <div className="p-2.5 rounded bg-white/5 text-zinc-300 text-[11px]">
                    <span className="text-emerald-400 font-bold block mb-1">Fix-it Available in Xcode:</span>
                    Replace with structured async concurrency call.
                  </div>
                </div>
              )}

              {outputFormat === 'terminal' && (
                <div className="space-y-1">
                  {preset.terminalOutput.map((line, idx) => (
                    <div key={idx} className="whitespace-pre-wrap font-mono">
                      {line.replace(/\x1b\[[0-9;]*m/g, '')}
                    </div>
                  ))}
                </div>
              )}

              {outputFormat === 'sarif' && (
                <pre className="text-emerald-400 text-[11px] overflow-x-auto">
                  <code>{preset.sarifSnippet}</code>
                </pre>
              )}

              {outputFormat === 'markdown' && (
                <div className="p-3 rounded-lg bg-white/5 text-zinc-300 text-[11px] space-y-2 whitespace-pre-wrap">
                  {preset.markdownComment}
                </div>
              )}

              {/* Bottom Quick Help Prompt */}
              <div className="pt-3 mt-3 border-t border-white/10 text-[11px] text-zinc-400 flex items-center justify-between">
                <span>Agent prompt:</span>
                <code className="text-apple-tint font-bold">/{preset.skill}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
