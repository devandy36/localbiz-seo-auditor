export function normalizeUrl(input) {
  const raw = String(input ?? "").trim();
  if (!raw) return "";

  // se não tiver http/https, assume https
  if (!/^https?:\/\//i.test(raw)) return `https://${raw}`;

  return raw;
}

export function isValidUrl(urlString) {
  try {
    const url = new URL(urlString);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function getUrlErrorMessage(input) {
  const normalized = normalizeUrl(input);

  if (!normalized) return "Informe uma URL para auditar.";
  if (!isValidUrl(normalized)) return "URL inválida. Ex: https://exemplo.com";

  return "";
}
