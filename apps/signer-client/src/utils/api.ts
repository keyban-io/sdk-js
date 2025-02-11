export const API_URL = new URL(window.location.origin);

export function apiUrl(path: string = "") {
  return new URL(path, API_URL);
}
