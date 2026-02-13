import { getUrlErrorMessage, normalizeUrl } from "./utils/validate.js";
import { subscribe, setLoading, setError, setSuccess, resetToIdle } from "./state/store.js";
import { render, bindReset } from "./modules/ui.js";
import { runMockAudit } from "./modules/analyzer.js";

const form = document.querySelector("#auditForm");
const input = document.querySelector("#urlInput");

// estado inicial garantido
resetToIdle();

// render reativo
subscribe(render);

// botão nova auditoria
bindReset();

async function handleSubmit(e) {
  e.preventDefault();

  const raw = input?.value ?? "";
  const msg = getUrlErrorMessage(raw);

  if (msg) {
    setError(msg);
    input?.focus();
    return;
  }

  const normalized = normalizeUrl(raw);

  try {
    setLoading(normalized);
    const result = await runMockAudit(normalized);
    setSuccess(result);
  } catch {
    setError("Falha ao rodar auditoria. Tente novamente.");
  }
}

form?.addEventListener("submit", handleSubmit);
