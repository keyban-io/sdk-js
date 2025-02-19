/**
 * Formats a timestamp (in seconds) into a human-readable date string using the specified locale.
 *
 * @param timestamp - The timestamp in seconds.
 * @param locale - Optional locale string (e.g., "en-US", "fr-FR"). Defaults to the system locale.
 * @returns The formatted date string.
 */
export const formatDate = (timestamp: number, locale?: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(timestamp * 1000).toLocaleDateString(locale, options);
};
