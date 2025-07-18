export function detectScrapeType(url: string): "profile" | "company" | "search" | "unknown" {
  if (/linkedin\.com\/in\//.test(url)) return "profile";
  if (/linkedin\.com\/company\//.test(url)) return "company";
  if (/linkedin\.com\/search/.test(url)) return "search";
  return "unknown";
}
