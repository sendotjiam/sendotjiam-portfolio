// Application configuration constants
export const BASE_URL = `${import.meta.env.BASE_URL}` || '/';

// Google Analytics 4 Configuration
export const GA4_MEASUREMENT_ID = import.meta.env.PUBLIC_GA4_MEASUREMENT_ID || 'G-72G97X9CYK';

// Asset paths helper function
export const getAssetPath = (path: string): string => {
  return `${BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`;
};

// Navigation paths
export const ROUTES = {
  HOME: BASE_URL,
  WORK_EXPERIENCES: `${BASE_URL}work-experiences`,
  EDUCATION: `${BASE_URL}education`,
  PROJECTS: `${BASE_URL}projects`,
} as const;