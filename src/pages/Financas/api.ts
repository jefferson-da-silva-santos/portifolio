// pages/Financas/api.ts
import { BASE_API } from "../Blog";
import type { FinanceState, Contact, Category, Note, Transaction, Installment } from "./types";

const API_BASE = `${BASE_API}/api/finance`;

export class FinanceApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

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
    } catch { /* corpo não é JSON */ }
    throw new FinanceApiError(message, res.status);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : (undefined as T);
}

export function createFinanceApi(authFetch: AuthFetch) {
  return {
    getState: () => request<FinanceState>(authFetch, "/state"),
    refresh: () => request<FinanceState>(authFetch, "/refresh", { method: "POST" }),

    createContact: (input: Partial<Contact>) =>
      request<Contact>(authFetch, "/contacts", { method: "POST", body: JSON.stringify(input) }),
    updateContact: (id: string, patch: Partial<Contact>) =>
      request<Contact>(authFetch, `/contacts/${id}`, { method: "PUT", body: JSON.stringify(patch) }),
    deleteContact: (id: string) => request<{ message: string }>(authFetch, `/contacts/${id}`, { method: "DELETE" }),
    getContactDetail: (id: string) =>
      request<{ contact: Contact; transactions: Transaction[]; installments: Installment[] }>(authFetch, `/contacts/${id}`),

    createCategory: (input: { name: string; type: Category["type"] }) =>
      request<Category>(authFetch, "/categories", { method: "POST", body: JSON.stringify(input) }),
    deleteCategory: (id: string) => request<{ message: string }>(authFetch, `/categories/${id}`, { method: "DELETE" }),

    createTransaction: (input: {
      type: Transaction["type"]; title: string; description?: string; categoryId?: string;
      contactName?: string; totalAmount: number; frequency: Transaction["frequency"];
      installments: number; startDate: string;
    }) => request<{ transactionId: string }>(authFetch, "/transactions", { method: "POST", body: JSON.stringify(input) }),

    getTransactionDetail: (id: string) =>
      request<{ transaction: Transaction; installments: Installment[] }>(authFetch, `/transactions/${id}`),
    updateTransaction: (id: string, patch: Record<string, unknown>) =>
      request<{ transaction: Transaction; installments: Installment[] }>(authFetch, `/transactions/${id}`, { method: "PUT", body: JSON.stringify(patch) }),
    deleteTransaction: (id: string) => request<{ message: string }>(authFetch, `/transactions/${id}`, { method: "DELETE" }),

    toggleInstallment: (id: string) => request<Installment>(authFetch, `/installments/${id}/toggle`, { method: "PATCH" }),
    cancelInstallment: (id: string) => request<Installment>(authFetch, `/installments/${id}/cancel`, { method: "PATCH" }),

    createNote: (input: { title: string; content: string; pinned?: boolean }) =>
      request<Note>(authFetch, "/notes", { method: "POST", body: JSON.stringify(input) }),
    updateNote: (id: string, patch: Partial<Note>) =>
      request<Note>(authFetch, `/notes/${id}`, { method: "PUT", body: JSON.stringify(patch) }),
    togglePinNote: (id: string) => request<Note>(authFetch, `/notes/${id}/pin`, { method: "PATCH" }),
    deleteNote: (id: string) => request<{ message: string }>(authFetch, `/notes/${id}`, { method: "DELETE" }),
  };
}

export type FinanceApi = ReturnType<typeof createFinanceApi>;