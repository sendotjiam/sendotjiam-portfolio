import type { Metadata } from 'next';
import ZestNav from '@/components/zest/ZestNav';
import ZestHero from '@/components/zest/ZestHero';
import ZestPromoVideo from '@/components/zest/ZestPromoVideo';
import ZestSimulator from '@/components/zest/ZestSimulator';
import ZestComparison from '@/components/zest/ZestComparison';
import ZestFeatures from '@/components/zest/ZestFeatures';
import ZestArchitecture from '@/components/zest/ZestArchitecture';
import ZestShortcuts from '@/components/zest/ZestShortcuts';
import ZestDownload from '@/components/zest/ZestDownload';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Zest for macOS: Sub-millisecond 1-Tap Clipboard HUD',
  description:
    'Stop wrestling with 3-step search dialogs. Press ⌘ + ⇧ + V, tap a single digit (1–9, 0), and it\'s pasted straight into your code. Built with Swift 6 and zero telemetry.',
  openGraph: {
    title: 'Zest for macOS: Sub-millisecond 1-Tap Clipboard HUD',
    description:
      'The sub-millisecond, 1-tap clipboard HUD for macOS developers. Built with Swift 6, zero telemetry, and instant numeric keyboard shortcuts.',
    url: 'https://sendotjiam.me/zest',
    siteName: 'Sendo Tjiamis Portfolio',
    images: [
      {
        url: '/assets/project-logo/zest-logo.png',
        width: 512,
        height: 512,
        alt: 'Zest for macOS Retina Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zest for macOS: Sub-millisecond 1-Tap Clipboard HUD',
    description:
      'Stop wrestling with 3-step search dialogs. Press ⌘ + ⇧ + V, tap a single digit (1–9, 0), and it\'s pasted.',
    images: ['/assets/project-logo/zest-logo.png'],
  },
};

export default function ZestPage() {
  return (
    <>
      <ZestNav />
      <main id="main-content" className="w-full max-w-5xl mx-auto px-5 sm:px-8 flex-1">
        <ZestHero />
        <ZestPromoVideo />
        <ZestSimulator />
        <ZestComparison />
        <ZestFeatures />
        <ZestArchitecture />
        <ZestShortcuts />
        <ZestDownload />
      </main>
      <Footer />
    </>
  );
}
