export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages & Core Runtime',
    icon: 'code',
    description: 'Modern Swift semantics, thread orchestration, and deterministic memory safety.',
    skills: [
      'Swift 5.10 / Swift 6',
      'Swift Concurrency (Actors, Async/Await)',
      'Objective-C',
      'ARC & Memory Graph',
      'C / C++ Interoperability',
      'Structured Concurrency',
    ],
  },
  {
    title: 'iOS Frameworks & Systems',
    icon: 'layers',
    description: 'Deep first-party Apple SDK integration across presentation and hardware layers.',
    skills: [
      'SwiftUI',
      'UIKit (Programmatic Autolayout)',
      'Combine & Reactive Streams',
      'AVFoundation',
      'CoreLocation & MapKit',
      'SwiftData & CoreData',
      'WidgetKit & App Intents',
    ],
  },
  {
    title: 'Architecture & Design Patterns',
    icon: 'architecture',
    description: 'Modular enterprise architecture, unidirectional data flows, and clean domain isolation.',
    skills: [
      'Unidirectional Data Flow (UDF)',
      'The Composable Architecture (TCA)',
      'Clean Swift / VIPER',
      'Model-View-ViewModel (MVVM)',
      'Offline-First Data Sync',
      'Modular SPM & Micro-Apps',
    ],
  },
  {
    title: 'Tooling, Quality & Profiling',
    icon: 'construction',
    description: 'Rigorous runtime profiling, automated distribution pipelines, and regression testing.',
    skills: [
      'Xcode Instruments (Time Profiler, Leaks)',
      'Fastlane Automation',
      'GitHub Actions CI/CD',
      'Tuist & CocoaPods',
      'XCTest & UI Testing',
      'Linker Optimization (LTO)',
    ],
  },
  {
    title: 'AI Engineering & Agent Harnesses',
    icon: 'smart_toy',
    description: 'Autonomous coding workflows, multi-agent orchestration, and LLM tool augmentation.',
    skills: [
      'Google Antigravity (Multi-Agent Workflows)',
      'Anthropic Claude Code (Agentic Loops)',
      'Google Gemini 3.8 (Multimodal & Long-Context)',
      'Model Context Protocol (MCP Tools)',
      'OpenAI Codex & Cursor',
      'Prompt Engineering & Agent System Architecture',
    ],
  },
];
