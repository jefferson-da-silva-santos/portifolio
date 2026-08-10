// pages/Financas/selectors.ts
// Lógica de agregação — mesma regra de negócio do app mobile, portada para web.
// Princípio do produto: NUNCA mostrar saldo. Só "quanto está comprometido para
// entrar" e "quanto está comprometido para sair".

import type { AgendaDay, Contact, ContactSummary, Installment, ListRow, MonthSummary, Transaction } from "./types";

function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function diffCalendarDays(a: Date, b: Date) {
  const clean = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.round((clean(a).getTime() - clean(b).getTime()) / 86_400_000);
}

export function dueLabel(iso: string, paid = false): string {
  const d = new Date(iso);
  if (paid) return `Pago em ${d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}`;
  const diff = diffCalendarDays(d, new Date());
  if (diff < 0) return `Vencido há ${Math.abs(diff)} ${Math.abs(diff) === 1 ? "dia" : "dias"}`;
  if (diff === 0) return "Vence hoje";
  if (diff === 1) return "Vence amanhã";
  return `Vence dia ${d.toLocaleDateString("pt-BR", { day: "2-digit" })}`;
}

export function dayLabel(iso: string): string {
  const d = new Date(iso);
  const diff = diffCalendarDays(d, new Date());
  const short = d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  if (diff === 0) return `Hoje — ${short}`;
  if (diff === 1) return `Amanhã — ${short}`;
  return short;
}

export const MONTH_LABEL = (d: Date) =>
  d.toLocaleDateString("pt-BR", { month: "long", year: "numeric" }).toUpperCase();

export const shiftMonth = (d: Date, delta: number) => {
  const next = new Date(d);
  next.setMonth(next.getMonth() + delta);
  return next;
};

function rowFrom(installment: Installment, transaction: Transaction, contact?: Contact): ListRow {
  const name = transaction.type === "INCOME" ? contact?.name ?? transaction.title : transaction.title;
  const description =
    transaction.installments > 1 && transaction.frequency === "ONCE"
      ? `${transaction.title} · ${installment.installmentNumber}/${transaction.installments}`
      : transaction.frequency !== "ONCE"
        ? `${transaction.title} · recorrente`
        : transaction.title;

  return {
    id: installment.id,
    name,
    description,
    amount: installment.amount,
    type: transaction.type,
    status: installment.status,
    statusLabel: dueLabel(installment.dueDate, installment.status === "PAID"),
    transactionId: transaction.id,
  };
}

export function buildRows(
  installments: Installment[],
  transactions: Transaction[],
  contacts: Contact[],
  type?: "INCOME" | "EXPENSE",
  month?: Date
): ListRow[] {
  const txById = new Map(transactions.map((t) => [t.id, t]));
  const contactById = new Map(contacts.map((c) => [c.id, c]));

  return installments
    .filter((i) => i.status !== "CANCELLED")
    .map((i) => {
      const t = txById.get(i.transactionId);
      if (!t) return null;
      if (type && t.type !== type) return null;
      if (month && !isSameMonth(new Date(i.dueDate), month)) return null;
      return rowFrom(i, t, t.contactId ? contactById.get(t.contactId) : undefined);
    })
    .filter((r): r is ListRow => !!r)
    .sort((a, b) => a.id.localeCompare(b.id));
}

export function nextUpcoming(
  installments: Installment[],
  transactions: Transaction[],
  contacts: Contact[],
  limit = 4
): ListRow[] {
  const txById = new Map(transactions.map((t) => [t.id, t]));
  const contactById = new Map(contacts.map((c) => [c.id, c]));

  return installments
    .filter((i) => i.status === "PENDING" || i.status === "OVERDUE")
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, limit)
    .map((i) => {
      const t = txById.get(i.transactionId)!;
      return rowFrom(i, t, t.contactId ? contactById.get(t.contactId) : undefined);
    });
}

export function buildMonthSummary(
  installments: Installment[],
  transactions: Transaction[],
  month: Date
): MonthSummary {
  const txById = new Map(transactions.map((t) => [t.id, t]));
  const inMonth = installments.filter(
    (i) => i.status !== "CANCELLED" && isSameMonth(new Date(i.dueDate), month)
  );

  const sum = (list: Installment[]) => list.reduce((a, i) => a + i.amount, 0);
  const income = inMonth.filter((i) => txById.get(i.transactionId)?.type === "INCOME");
  const expense = inMonth.filter((i) => txById.get(i.transactionId)?.type === "EXPENSE");
  const paidIncome = income.filter((i) => i.status === "PAID");
  const paidExpense = expense.filter((i) => i.status === "PAID");
  const overdue = inMonth.filter((i) => i.status === "OVERDUE");
  const next7 = inMonth.filter((i) => {
    const diff = (new Date(i.dueDate).getTime() - Date.now()) / 86_400_000;
    return i.status !== "PAID" && diff >= 0 && diff <= 7;
  });

  const receivable = sum(income);
  const payable = sum(expense);

  return {
    receivable,
    payable,
    forecast: receivable - payable,
    receivedSoFar: sum(paidIncome),
    paidSoFar: sum(paidExpense),
    openReceivable: receivable - sum(paidIncome),
    openPayable: payable - sum(paidExpense),
    incomeCount: income.length,
    expenseCount: expense.length,
    overdueCount: overdue.length,
    next7DaysCount: next7.length,
    pendingReceivables: income.filter((i) => i.status !== "PAID").length,
    pendingPayables: expense.filter((i) => i.status !== "PAID").length,
  };
}

export function buildAgenda(
  installments: Installment[],
  transactions: Transaction[],
  contacts: Contact[],
  daysAhead = 14
): AgendaDay[] {
  const txById = new Map(transactions.map((t) => [t.id, t]));
  const contactById = new Map(contacts.map((c) => [c.id, c]));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const limit = new Date(today);
  limit.setDate(limit.getDate() + daysAhead);
  const todayKey = today.toISOString().slice(0, 10);

  const byDate = new Map<string, ListRow[]>();
  for (const i of installments) {
    if (i.status === "PAID" || i.status === "CANCELLED") continue;
    const due = new Date(i.dueDate);
    if (due > limit) continue;
    const t = txById.get(i.transactionId);
    if (!t) continue;
    const key = i.dueDate.slice(0, 10);
    const row = rowFrom(i, t, t.contactId ? contactById.get(t.contactId) : undefined);
    byDate.set(key, [...(byDate.get(key) ?? []), row]);
  }
  if (!byDate.has(todayKey)) byDate.set(todayKey, []);

  return Array.from(byDate.keys())
    .sort()
    .map((key) => ({
      id: key,
      label: dayLabel(key),
      highlight: key === todayKey,
      items: byDate.get(key) ?? [],
    }));
}

export function buildContactSummaries(
  contacts: Contact[],
  transactions: Transaction[],
  installments: Installment[]
): ContactSummary[] {
  const txByContact = new Map<string, Transaction[]>();
  for (const t of transactions) {
    if (!t.contactId) continue;
    txByContact.set(t.contactId, [...(txByContact.get(t.contactId) ?? []), t]);
  }
  const instByTx = new Map<string, Installment[]>();
  for (const i of installments) {
    instByTx.set(i.transactionId, [...(instByTx.get(i.transactionId) ?? []), i]);
  }

  return contacts.map((c) => {
    const txs = txByContact.get(c.id) ?? [];
    const insts = txs.flatMap((t) => instByTx.get(t.id) ?? []).filter((i) => i.status !== "CANCELLED");
    const total = insts.reduce((a, i) => a + i.amount, 0);
    const received = insts.filter((i) => i.status === "PAID").reduce((a, i) => a + i.amount, 0);
    return {
      ...c,
      description: txs[0]?.title ?? "Sem compromissos ainda",
      total,
      pending: total - received,
      received,
    };
  });
}

export const formatBRL = (value: number) =>
  `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const formatSigned = (value: number, type: "INCOME" | "EXPENSE") =>
  `${type === "INCOME" ? "+" : "−"} ${formatBRL(Math.abs(value))}`;

/** Divide um total em N parcelas sem perder centavos (resto na 1ª). */
export const splitInstallments = (total: number, count: number) => {
  const n = Math.max(1, Math.floor(count));
  const cents = Math.round(total * 100);
  const base = Math.floor(cents / n);
  const rest = cents - base * n;
  return Array.from({ length: n }, (_, i) => (base + (i === 0 ? rest : 0)) / 100);
};