// pages/Financas/api.ts
// Cliente HTTP do módulo financeiro. Segue o mesmo padrão do BlogAdmin:
// senha em memória, reenviada a cada request via header X-Admin-Password.

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
    throw new FinanceApiError(message, res.status);
  }

  // 204 ou corpo vazio
  const text = await res.text();
  return text ? JSON.parse(text) : (undefined as T);
}

export const financeApi = {
  getState: (password: string) => request<FinanceState>("/state", password),
  refresh: (password: string) => request<FinanceState>("/refresh", password, { method: "POST" }),

  createContact: (password: string, input: Partial<Contact>) =>
    request<Contact>("/contacts", password, { method: "POST", body: JSON.stringify(input) }),
  updateContact: (password: string, id: string, patch: Partial<Contact>) =>
    request<Contact>(`/contacts/${id}`, password, { method: "PUT", body: JSON.stringify(patch) }),
  deleteContact: (password: string, id: string) =>
    request<{ message: string }>(`/contacts/${id}`, password, { method: "DELETE" }),
  getContactDetail: (password: string, id: string) =>
    request<{ contact: Contact; transactions: Transaction[]; installments: Installment[] }>(
      `/contacts/${id}`,
      password
    ),

  createCategory: (password: string, input: { name: string; type: Category["type"] }) =>
    request<Category>("/categories", password, { method: "POST", body: JSON.stringify(input) }),
  deleteCategory: (password: string, id: string) =>
    request<{ message: string }>(`/categories/${id}`, password, { method: "DELETE" }),

  createTransaction: (
    password: string,
    input: {
      type: Transaction["type"];
      title: string;
      description?: string;
      categoryId?: string;
      contactName?: string;
      totalAmount: number;
      frequency: Transaction["frequency"];
      installments: number;
      startDate: string;
    }
  ) => request<{ transactionId: string }>("/transactions", password, { method: "POST", body: JSON.stringify(input) }),

  getTransactionDetail: (password: string, id: string) =>
    request<{ transaction: Transaction; installments: Installment[] }>(`/transactions/${id}`, password),

  updateTransaction: (password: string, id: string, patch: Record<string, unknown>) =>
    request<{ transaction: Transaction; installments: Installment[] }>(`/transactions/${id}`, password, {
      method: "PUT",
      body: JSON.stringify(patch),
    }),

  deleteTransaction: (password: string, id: string) =>
    request<{ message: string }>(`/transactions/${id}`, password, { method: "DELETE" }),

  toggleInstallment: (password: string, id: string) =>
    request<Installment>(`/installments/${id}/toggle`, password, { method: "PATCH" }),
  cancelInstallment: (password: string, id: string) =>
    request<Installment>(`/installments/${id}/cancel`, password, { method: "PATCH" }),

  createNote: (password: string, input: { title: string; content: string; pinned?: boolean }) =>
    request<Note>("/notes", password, { method: "POST", body: JSON.stringify(input) }),
  updateNote: (password: string, id: string, patch: Partial<Note>) =>
    request<Note>(`/notes/${id}`, password, { method: "PUT", body: JSON.stringify(patch) }),
  togglePinNote: (password: string, id: string) =>
    request<Note>(`/notes/${id}/pin`, password, { method: "PATCH" }),
  deleteNote: (password: string, id: string) =>
    request<{ message: string }>(`/notes/${id}`, password, { method: "DELETE" }),
};