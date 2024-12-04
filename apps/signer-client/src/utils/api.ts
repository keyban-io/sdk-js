export const API_URL = new URL(window.location.origin);

export function apiUrl(url: string | URL) {
  return new URL(url, API_URL);
}
