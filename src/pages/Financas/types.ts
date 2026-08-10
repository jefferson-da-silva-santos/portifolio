// pages/Financas/types.ts

export type TransactionType = "INCOME" | "EXPENSE";
export type Frequency = "ONCE" | "MONTHLY" | "YEARLY";
export type InstallmentStatus = "PENDING" | "PAID" | "OVERDUE" | "CANCELLED";

export interface Contact {
  id: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  notes?: string | null;
}

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  icon: string;
}

export interface Transaction {
  id: string;
  contactId?: string | null;
  categoryId?: string | null;
  type: TransactionType;
  title: string;
  description?: string | null;
  totalAmount: number;
  frequency: Frequency;
  installments: number;
  startDate: string;
  endDate?: string | null;
  reminderEnabled: boolean;
  reminderDaysBefore: number[];
}

export interface Installment {
  id: string;
  transactionId: string;
  installmentNumber: number;
  totalInstallments: number;
  amount: number;
  dueDate: string;
  paidAt?: string | null;
  status: InstallmentStatus;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FinanceState {
  contacts: Contact[];
  categories: Category[];
  transactions: Transaction[];
  installments: Installment[];
  notes: Note[];
}

/** Modelo achatado usado pelas listas da UI (mesmo conceito do app mobile). */
export interface ListRow {
  id: string; // = installment.id
  name: string;
  description: string;
  amount: number;
  type: TransactionType;
  status: InstallmentStatus;
  statusLabel: string;
  transactionId: string;
}

export interface AgendaDay {
  id: string; // yyyy-mm-dd
  label: string;
  highlight: boolean;
  items: ListRow[];
}

export interface MonthSummary {
  receivable: number;
  payable: number;
  forecast: number;
  receivedSoFar: number;
  paidSoFar: number;
  openReceivable: number;
  openPayable: number;
  incomeCount: number;
  expenseCount: number;
  overdueCount: number;
  next7DaysCount: number;
  pendingReceivables: number;
  pendingPayables: number;
}

export type ContactSummary = Contact & {
  description: string;
  total: number;
  pending: number;
  received: number;
};