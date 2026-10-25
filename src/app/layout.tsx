import type { Metadata } from 'next';
import Script from 'next/script';
import CustomCursor from '@/components/CustomCursor';
import './globals.css';

const GA4_MEASUREMENT_ID = 'G-72G97X9CYK';

export const metadata: Metadata = {
  title: 'Sendo Tjiamis — iOS Engineer',
  description: 'Senior iOS Engineer building apps used by millions. Crafting high-performance mobile architectures at Grab. Ex-ByteDance (TikTok) & Tokopedia.',
  keywords: ['iOS Engineer', 'Swift', 'SwiftUI', 'UIKit', 'Mobile Developer', 'Grab', 'ByteDance', 'TikTok', 'Tokopedia', 'Sendo Tjiamis'],
  icons: {
    icon: '/assets/favicon.png',
    apple: '/assets/favicon.png',
  },
  openGraph: {
    title: 'Sendo Tjiamis — iOS Engineer',
    description: 'Senior iOS Engineer building apps used by millions. Crafting high-performance mobile architectures at Grab.',
    url: 'https://sendotjiam.me',
    siteName: 'Sendo Tjiamis Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sendo Tjiamis — iOS Engineer',
    description: 'Senior iOS Engineer building apps used by millions. Crafting high-performance mobile architectures at Grab.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                const stored = localStorage.getItem('theme');
                const isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (isDark) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                }
              } catch (_) {}
            })();`,
          }}
        />
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="bg-surface dark:bg-[#0b0f17] text-on-surface dark:text-slate-100 font-body-md text-body-md antialiased selection:bg-primary-container selection:text-primary min-h-screen flex flex-col justify-between transition-colors duration-200">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
