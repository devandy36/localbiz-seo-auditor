// src/js/utils/validate.js

export function normalizeUrl(input) {
  const raw = String(input ?? "").trim();

  if (!raw) return "";

  // Se a pessoa digitar "google.com", vira "https://google.com"
  if (!/^https?:\/\//i.test(raw)) {
    return `https://${raw}`;
  }

  return raw;
}

export function isValidUrl(urlString) {
  try {
    const url = new URL(urlString);
    const okProtocol = url.protocol === "http:" || url.protocol === "https:";
    const okHost = Boolean(url.hostname);
    return okProtocol && okHost;
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



