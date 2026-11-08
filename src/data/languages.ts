export interface SpokenLanguage {
  name: string;
  nativeName: string;
  proficiency: 'Fluent / Native' | 'Fluent' | 'Learning';
  status: 'fluent' | 'learning';
  desc?: string;
}

export interface ProgrammingLanguage {
  name: string;
  role: string;
  proficiency: 'Primary' | 'Proficient' | 'Familiar';
  category: 'Mobile' | 'Web & Fullstack' | 'Backend & Data' | 'Scripting & AI';
}

export const spokenLanguages: SpokenLanguage[] = [
  {
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    proficiency: 'Fluent / Native',
    status: 'fluent',
    desc: 'Native tongue & daily bilingual professional communication.',
  },
  {
    name: 'English',
    nativeName: 'English',
    proficiency: 'Fluent',
    status: 'fluent',
    desc: 'Full professional working proficiency across multinational teams at Grab & ByteDance.',
  },
  {
    name: 'Chinese Mandarin',
    nativeName: '中文 (普通话)',
    proficiency: 'Learning',
    status: 'learning',
    desc: 'Actively studying spoken dialogue, Pinyin, and everyday conversational vocabulary.',
  },
  {
    name: 'Japanese',
    nativeName: '日本語',
    proficiency: 'Learning',
    status: 'learning',
    desc: 'Actively learning Hiragana, Katakana, and foundational conversational Japanese.',
  },
];

export const programmingLanguages: ProgrammingLanguage[] = [
  {
    name: 'Swift',
    role: 'Production iOS / macOS, Swift 6, Concurrency & TCA',
    proficiency: 'Primary',
    category: 'Mobile',
  },
  {
    name: 'TypeScript',
    role: 'Type-safe fullstack web apps & Next.js architectures',
    proficiency: 'Proficient',
    category: 'Web & Fullstack',
  },
  {
    name: 'JavaScript',
    role: 'Node.js runtime, asynchronous event loops & web tooling',
    proficiency: 'Proficient',
    category: 'Web & Fullstack',
  },
  {
    name: 'Python',
    role: 'Automation, data scripting & AI agentic harnesses',
    proficiency: 'Proficient',
    category: 'Scripting & AI',
  },
  {
    name: 'Dart',
    role: 'Cross-platform mobile apps with Flutter framework',
    proficiency: 'Familiar',
    category: 'Mobile',
  },
  {
    name: 'Java',
    role: 'Object-oriented programming, data structures & Android',
    proficiency: 'Familiar',
    category: 'Backend & Data',
  },
  {
    name: 'HTML5 & CSS3',
    role: 'Semantic structure, responsive layouts & Tailwind CSS',
    proficiency: 'Proficient',
    category: 'Web & Fullstack',
  },
  {
    name: 'SQL (PostgreSQL)',
    role: 'Relational data modeling, indexing & performant queries',
    proficiency: 'Familiar',
    category: 'Backend & Data',
  },
];
