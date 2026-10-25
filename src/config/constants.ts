// Application configuration constants
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '/';

// Google Analytics 4 Configuration
export const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-72G97X9CYK';

// Asset paths helper function
export const getAssetPath = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`}${cleanPath}`;
};

// Navigation paths
export const ROUTES = {
  HOME: BASE_URL,
  WORK_EXPERIENCES: '#experience',
  EDUCATION: '#education',
  PROJECTS: '#projects',
} as const;