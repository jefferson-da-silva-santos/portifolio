// pages/Financas/useFinance.ts
import { useCallback, useMemo, useState } from "react";
import { createFinanceApi, FinanceApiError } from "./api";
import type { Contact, FinanceState, Note } from "./types";

const EMPTY_STATE: FinanceState = { contacts: [], categories: [], transactions: [], installments: [], notes: [] };
type AuthFetch = (input: string, init?: RequestInit) => Promise<Response>;

export function useFinance(authFetch: AuthFetch) {
  const api = useMemo(() => createFinanceApi(authFetch), [authFetch]);
  const [state, setState] = useState<FinanceState>(EMPTY_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try { setState(await api.getState()); }
    catch (err) { setError(err instanceof FinanceApiError ? err.message : "Erro ao carregar dados."); }
    finally { setLoading(false); }
  }, [api]);

  const refresh = useCallback(async () => {
    setLoading(true);
    try { setState(await api.refresh()); }
    catch (err) { setError(err instanceof FinanceApiError ? err.message : "Erro ao atualizar."); }
    finally { setLoading(false); }
  }, [api]);

  const addTransaction = useCallback(async (input: Parameters<typeof api.createTransaction>[0]) => {
    await api.createTransaction(input); await load();
  }, [api, load]);

  const removeTransaction = useCallback(async (id: string) => {
    await api.deleteTransaction(id);
    setState((s) => ({ ...s, transactions: s.transactions.filter((t) => t.id !== id), installments: s.installments.filter((i) => i.transactionId !== id) }));
  }, [api]);

  const toggleInstallmentPaid = useCallback(async (id: string) => {
    const updated = await api.toggleInstallment(id);
    setState((s) => ({ ...s, installments: s.installments.map((i) => (i.id === id ? updated : i)) }));
  }, [api]);

  const createContact = useCallback(async (input: Partial<Contact>) => {
    const contact = await api.createContact(input);
    setState((s) => ({ ...s, contacts: [...s.contacts, contact] }));
    return contact;
  }, [api]);

  const updateContact = useCallback(async (id: string, patch: Partial<Contact>) => {
    const updated = await api.updateContact(id, patch);
    setState((s) => ({ ...s, contacts: s.contacts.map((c) => (c.id === id ? updated : c)) }));
  }, [api]);

  const removeContact = useCallback(async (id: string) => {
    await api.deleteContact(id);
    setState((s) => ({ ...s, contacts: s.contacts.filter((c) => c.id !== id) }));
  }, [api]);

  const addCategory = useCallback(async (name: string, type: "INCOME" | "EXPENSE") => {
    const category = await api.createCategory({ name, type });
    setState((s) => ({ ...s, categories: [...s.categories, category] }));
    return category;
  }, [api]);

  const removeCategory = useCallback(async (id: string) => {
    await api.deleteCategory(id);
    setState((s) => ({ ...s, categories: s.categories.filter((c) => c.id !== id) }));
  }, [api]);

  const createNote = useCallback(async (input: { title: string; content: string; pinned?: boolean }) => {
    const note = await api.createNote(input);
    setState((s) => ({ ...s, notes: [note, ...s.notes] }));
    return note;
  }, [api]);

  const updateNote = useCallback(async (id: string, patch: Partial<Note>) => {
    const updated = await api.updateNote(id, patch);
    setState((s) => ({ ...s, notes: s.notes.map((n) => (n.id === id ? updated : n)).sort((a, b) => (a.pinned === b.pinned ? b.updatedAt.localeCompare(a.updatedAt) : a.pinned ? -1 : 1)) }));
  }, [api]);

  const togglePinNote = useCallback(async (id: string) => {
    const updated = await api.togglePinNote(id);
    setState((s) => ({ ...s, notes: s.notes.map((n) => (n.id === id ? updated : n)).sort((a, b) => (a.pinned === b.pinned ? b.updatedAt.localeCompare(a.updatedAt) : a.pinned ? -1 : 1)) }));
  }, [api]);

  const removeNote = useCallback(async (id: string) => {
    await api.deleteNote(id);
    setState((s) => ({ ...s, notes: s.notes.filter((n) => n.id !== id) }));
  }, [api]);

  return {
    state, loading, error, load, refresh,
    addTransaction, removeTransaction, toggleInstallmentPaid,
    createContact, updateContact, removeContact,
    addCategory, removeCategory,
    createNote, updateNote, togglePinNote, removeNote,
    api,
  };
}

export type FinanceStore = ReturnType<typeof useFinance>;