// pages/Financas/consorcioApi.ts

import { BASE_API } from "../Blog";
import type { ConsorcioState, ConsorcioParcela } from "./consorcioTypes";

const API_BASE = `${BASE_API}/api/finance/consorcio`;

async function request<T>(path: string, password: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Password": password,
      ...(options.headers || {}),
    },
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

export const consorcioApi = {
  getState: (password: string) => request<ConsorcioState>("/", password),

  seedHondaBross: (password: string) =>
    request<{ consorcioId: string; message: string }>("/seed-honda-bross", password, { method: "POST" }),

  updateParcela: (password: string, id: string, patch: Partial<ConsorcioParcela>) =>
    request<ConsorcioParcela>(`/parcelas/${id}`, password, { method: "PUT", body: JSON.stringify(patch) }),

  toggleParcela: (password: string, id: string) =>
    request<ConsorcioParcela>(`/parcelas/${id}/toggle`, password, { method: "PATCH" }),
};