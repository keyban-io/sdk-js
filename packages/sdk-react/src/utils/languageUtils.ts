/**
 * Retrieves the default language code based on the user's browser settings.
 * If the browser's language is not one of the supported languages ("en", "fr", "es"),
 * it defaults to "en".
 * @returns The default language code.
 */
export function getDefaultLanguage(): "en" | "fr" | "es" {
  const code =
    typeof navigator !== "undefined"
      ? navigator.language.slice(0, 2).toLowerCase()
      : "en";
  return ["en", "fr", "es"].includes(code)
    ? (code as "en" | "fr" | "es")
    : "en";
}
