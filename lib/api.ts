// Centralized backend API configuration. Never hardcode the backend origin
// in a fetch call directly — read it from NEXT_PUBLIC_API_BASE_URL so the
// same code works against local/staging/production backends via env config.
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export function apiUrl(path: string): string {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured.");
  }
  return `${API_BASE_URL.replace(/\/$/, "")}${path}`;
}
