import type { Metadata } from 'next';
import IosSkillsNav from '@/components/ios-skills/IosSkillsNav';
import IosSkillsHero from '@/components/ios-skills/IosSkillsHero';
import IosAuditSimulator from '@/components/ios-skills/IosAuditSimulator';
import IosSkillsGrid from '@/components/ios-skills/IosSkillsGrid';
import IosSkillsCliArchitecture from '@/components/ios-skills/IosSkillsCliArchitecture';
import IosSkillsInstall from '@/components/ios-skills/IosSkillsInstall';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'iOS Agent Skills: 10 Production-Grade AI Agent Skills for Apple Platforms',
  description:
    'Eliminate severe main-thread hangs, SwiftUI render hitches, ARC retain cycles, and Apple Privacy Manifest violations before production. Zero-dependency CLI and agent workflows for Antigravity, Claude Code, and Codex.',
  openGraph: {
    title: 'iOS Agent Skills: Production-Grade Agentic Audits for Apple Engineering',
    description:
      'Curated suite of 10 specialized agent skills and zero-dependency auditor CLI for iOS, iPadOS, macOS, and watchOS engineering across Google Antigravity, Anthropic Claude Code, and OpenAI Codex.',
    url: 'https://sendotjiam.me/ios-agent-skills',
    siteName: 'Sendo Tjiamis Portfolio',
    images: [
      {
        url: '/assets/project-logo/ios-agent-skills-logo.svg',
        width: 512,
        height: 512,
        alt: 'iOS Agent Skills Vector Retina Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iOS Agent Skills: Production-Grade Agentic Audits for Apple Engineering',
    description:
      'Eliminate severe main-thread hangs, SwiftUI render hitches, ARC retain cycles, and Privacy Manifest violations.',
    images: ['/assets/project-logo/ios-agent-skills-logo.svg'],
  },
};

export default function IosAgentSkillsPage() {
  return (
    <>
      <IosSkillsNav />
      <main id="main-content" className="w-full max-w-5xl mx-auto px-5 sm:px-8 flex-1">
        <IosSkillsHero />
        <IosAuditSimulator />
        <IosSkillsGrid />
        <IosSkillsCliArchitecture />
        <IosSkillsInstall />
      </main>
      <Footer />
    </>
  );
}
