// ARQUIVO: src/pages/Cobranca/types.ts

export type InvoiceStatus = "pending" | "paid";

export interface InvoiceData {
  clientName: string;
  amount: number;
  status: InvoiceStatus;
  referenceMonth: string;
}

// Estados possíveis da tela - "invalid" é o estado de VALIDAÇÃO: sem
// token na URL, a tela nunca chega a tentar buscar nada nem a
// renderizar o widget de pagamento.
export type CobrancaScreenState =
  | "invalid"
  | "loading"
  | "not-found"
  | "already-paid"
  | "ready"
  | "approved"
  | "error";