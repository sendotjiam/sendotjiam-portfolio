import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        apple: {
          bg: 'var(--bg)',
          grouped: 'var(--bg-grouped)',
          label: 'var(--label)',
          secondary: 'var(--label-secondary)',
          tertiary: 'var(--label-tertiary)',
          separator: 'var(--separator)',
          tint: 'var(--tint)',
        },
        primary: {
          DEFAULT: '#0071e3',
          dark: '#2997ff',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'Menlo',
          'Monaco',
          '"SF Mono"',
          'Consolas',
          'monospace',
        ],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      boxShadow: {
        'apple-sm': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'apple-md': '0 4px 16px rgba(0, 0, 0, 0.06)',
        'apple-lg': '0 12px 32px rgba(0, 0, 0, 0.08)',
        'apple-dark-md': '0 4px 20px rgba(0, 0, 0, 0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
