// Application configuration constants
export const BASE_URL = import.meta.env.BASE_URL || '/';

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