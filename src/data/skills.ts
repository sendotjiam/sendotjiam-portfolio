export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages & Core',
    icon: 'code',
    description: 'Core programming languages and mobile concurrency paradigms.',
    skills: [
      'Swift',
      'Swift Concurrency',
      'Dart',
      'Python',
      'Object-Oriented Programming',
    ],
  },
  {
    title: 'iOS Frameworks & Mobile',
    icon: 'layers',
    description: 'First-party and cross-platform mobile frameworks for production apps.',
    skills: [
      'SwiftUI',
      'UIKit',
      'RxSwift',
      'Combine',
      'Texture (AsyncDisplayKit)',
      'Flutter',
    ],
  },
  {
    title: 'Architecture & Design Patterns',
    icon: 'architecture',
    description: 'Scalable mobile design patterns and maintainable architectural foundations.',
    skills: [
      'Model-View-ViewModel (MVVM)',
      'Clean Architecture',
      'VIPER',
      'The Composable Architecture (TCA)',
      'Model-View-Controller (MVC)',
    ],
  },
  {
    title: 'Tooling & Quality',
    icon: 'construction',
    description: 'Development tooling, automated testing, and issue management workflows.',
    skills: [
      'Git',
      'Unit Tests',
      'XCTest',
      'Firebase',
      'Jira & Confluence',
      'CI/CD',
    ],
  },
  {
    title: 'AI & Agent Harnesses',
    icon: 'smart_toy',
    description: 'Agentic workflows, prompt harnesses, and autonomous development loops.',
    skills: [
      'Gemini (Antigravity)',
      'Claude',
      'Codex (ChatGPT)',
      'Agentic Coding',
      'Harness Engineering',
    ],
  },
];
