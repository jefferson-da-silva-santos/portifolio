// pages/Financas/consorcioApi.ts
import { BASE_API } from "../Blog";
import type { ConsorcioState, ConsorcioParcela } from "./consorcioTypes";

const API_BASE = `${BASE_API}/api/finance/consorcio`;

type AuthFetch = (input: string, init?: RequestInit) => Promise<Response>;

async function request<T>(authFetch: AuthFetch, path: string, options: RequestInit = {}): Promise<T> {
  const res = await authFetch(`${API_BASE}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });

  if (!res.ok) {
    let message = `Erro ${res.status}`;
    try {
      const data = await res.json();
      message = data.error || message;
    } catch {
      /* corpo não é JSON */
    }
    throw new Error(message);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : (undefined as T);
}

export function createConsorcioApi(authFetch: AuthFetch) {
  return {
    getState: () => request<ConsorcioState>(authFetch, "/"),
    seedHondaBross: () =>
      request<{ consorcioId: string; message: string }>(authFetch, "/seed-honda-bross", { method: "POST" }),
    updateParcela: (id: string, patch: Partial<ConsorcioParcela>) =>
      request<ConsorcioParcela>(authFetch, `/parcelas/${id}`, { method: "PUT", body: JSON.stringify(patch) }),
    toggleParcela: (id: string) =>
      request<ConsorcioParcela>(authFetch, `/parcelas/${id}/toggle`, { method: "PATCH" }),
  };
}

export type ConsorcioApi = ReturnType<typeof createConsorcioApi>;