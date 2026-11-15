// Tracks whether the 3D Macropad assembly animation has already run in the current browser session.
let hasAssembledMemory = false;

const STORAGE_KEY = 'macropad_assembled_v1';

/**
 * Returns true if the keyboard assembling animation has already played in this browser session.
 * Checks fast module-level memory first (for instantaneous client-side navigation),
 * then falls back to sessionStorage for tab-level persistence across reloads.
 */
export function hasMacropadAssembled(): boolean {
  if (hasAssembledMemory) return true;
  if (typeof window !== 'undefined') {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
        hasAssembledMemory = true;
        return true;
      }
    } catch {
      // Ignore sessionStorage exceptions (private browsing/sandboxes)
    }
  }
  return false;
}

/**
 * Marks the keyboard assembling animation as completed for this browser session.
 */
export function markMacropadAssembled(): void {
  hasAssembledMemory = true;
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore sessionStorage exceptions
    }
  }
}
