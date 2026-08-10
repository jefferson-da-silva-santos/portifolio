// pages/Financas/useFinance.ts
// Hook central: mantém o snapshot em memória e expõe ações que chamam a API
// e atualizam o estado local otimisticamente, sem precisar recarregar tudo.

import { useCallback, useState } from "react";
import { financeApi, FinanceApiError } from "./api";
import { Contact, FinanceState, Note, Transaction } from "./types";

const EMPTY_STATE: FinanceState = {
  contacts: [],
  categories: [],
  transactions: [],
  installments: [],
  notes: [],
};

export function useFinance(password: string) {
  const [state, setState] = useState<FinanceState>(EMPTY_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await financeApi.getState(password);
      setState(data);
    } catch (err) {
      setError(err instanceof FinanceApiError ? err.message : "Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  }, [password]);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await financeApi.refresh(password);
      setState(data);
    } catch (err) {
      setError(err instanceof FinanceApiError ? err.message : "Erro ao atualizar.");
    } finally {
      setLoading(false);
    }
  }, [password]);

  const addTransaction = useCallback(
    async (input: Parameters<typeof financeApi.createTransaction>[1]) => {
      await financeApi.createTransaction(password, input);
      await load();
    },
    [password, load]
  );

  const removeTransaction = useCallback(
    async (id: string) => {
      await financeApi.deleteTransaction(password, id);
      setState((s) => ({
        ...s,
        transactions: s.transactions.filter((t) => t.id !== id),
        installments: s.installments.filter((i) => i.transactionId !== id),
      }));
    },
    [password]
  );

  const toggleInstallmentPaid = useCallback(
    async (id: string) => {
      const updated = await financeApi.toggleInstallment(password, id);
      setState((s) => ({
        ...s,
        installments: s.installments.map((i) => (i.id === id ? updated : i)),
      }));
    },
    [password]
  );

  const createContact = useCallback(
    async (input: Partial<Contact>) => {
      const contact = await financeApi.createContact(password, input);
      setState((s) => ({ ...s, contacts: [...s.contacts, contact] }));
      return contact;
    },
    [password]
  );

  const updateContact = useCallback(
    async (id: string, patch: Partial<Contact>) => {
      const updated = await financeApi.updateContact(password, id, patch);
      setState((s) => ({ ...s, contacts: s.contacts.map((c) => (c.id === id ? updated : c)) }));
    },
    [password]
  );

  const removeContact = useCallback(
    async (id: string) => {
      await financeApi.deleteContact(password, id);
      setState((s) => ({ ...s, contacts: s.contacts.filter((c) => c.id !== id) }));
    },
    [password]
  );

  const addCategory = useCallback(
    async (name: string, type: "INCOME" | "EXPENSE") => {
      const category = await financeApi.createCategory(password, { name, type });
      setState((s) => ({ ...s, categories: [...s.categories, category] }));
      return category;
    },
    [password]
  );

  const removeCategory = useCallback(
    async (id: string) => {
      await financeApi.deleteCategory(password, id);
      setState((s) => ({ ...s, categories: s.categories.filter((c) => c.id !== id) }));
    },
    [password]
  );

  const createNote = useCallback(
    async (input: { title: string; content: string; pinned?: boolean }) => {
      const note = await financeApi.createNote(password, input);
      setState((s) => ({ ...s, notes: [note, ...s.notes] }));
      return note;
    },
    [password]
  );

  const updateNote = useCallback(
    async (id: string, patch: Partial<Note>) => {
      const updated = await financeApi.updateNote(password, id, patch);
      setState((s) => ({
        ...s,
        notes: s.notes
          .map((n) => (n.id === id ? updated : n))
          .sort((a, b) => (a.pinned === b.pinned ? b.updatedAt.localeCompare(a.updatedAt) : a.pinned ? -1 : 1)),
      }));
    },
    [password]
  );

  const togglePinNote = useCallback(
    async (id: string) => {
      const updated = await financeApi.togglePinNote(password, id);
      setState((s) => ({
        ...s,
        notes: s.notes
          .map((n) => (n.id === id ? updated : n))
          .sort((a, b) => (a.pinned === b.pinned ? b.updatedAt.localeCompare(a.updatedAt) : a.pinned ? -1 : 1)),
      }));
    },
    [password]
  );

  const removeNote = useCallback(
    async (id: string) => {
      await financeApi.deleteNote(password, id);
      setState((s) => ({ ...s, notes: s.notes.filter((n) => n.id !== id) }));
    },
    [password]
  );

  return {
    state,
    loading,
    error,
    load,
    refresh,
    addTransaction,
    removeTransaction,
    toggleInstallmentPaid,
    createContact,
    updateContact,
    removeContact,
    addCategory,
    removeCategory,
    createNote,
    updateNote,
    togglePinNote,
    removeNote,
  };
}

export type FinanceStore = ReturnType<typeof useFinance>;