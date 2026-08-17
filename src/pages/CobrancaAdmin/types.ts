// ARQUIVO: src/pages/CobrancaAdmin/types.ts

export interface ClientData {
  id: string;
  name: string;
  email: string;
  active: boolean;
  createdAt: string;
}

export interface InvoiceData {
  id: string;
  clientId: string;
  clientName?: string;
  clientEmail?: string;
  referenceMonth: string;
  amount: number;
  status: "pending" | "paid";
  mpPaymentId: string | null;
  createdAt: string;
  paidAt: string | null;
}

export interface SendMonthlyResult {
  referenceMonth: string;
  totalClientsAtivos: number;
  sent: Array<{ client: string; email: string }>;
  skipped: Array<{ client: string; reason: string }>;
  failed: Array<{ client: string; email: string; reason?: string }>;
}

export type ToastType = "success" | "error";