// ARQUIVO: src/types/payment-widget.d.ts
// ==========================================================
// O pacote @payment-system-mp/react-widget é JS puro (não publica
// .d.ts) - essa declaração dá tipagem pra ele dentro de um projeto
// TypeScript, seguindo exatamente as props documentadas no README
// da lib. Sem isso, o `import` daria erro de tipo no build.
// ==========================================================
declare module "@payment-system-mp/react-widget" {
  import type { ComponentType } from "react";

  export interface PaymentWidgetPayer {
    email?: string;
    firstName?: string;
    lastName?: string;
    document?: string;
  }

  export interface PaymentWidgetSavedCard {
    id: string;
    brand: string;
    lastFourDigits: string;
  }

  export interface PaymentWidgetPayment {
    id: string;
    status: "PENDING" | "IN_PROCESS" | "APPROVED" | "REJECTED" | "CANCELLED" | "REFUNDED" | "CHARGED_BACK";
    amount: number;
    method: string;
    [key: string]: unknown;
  }

  export interface PaymentWidgetProps {
    apiBaseUrl: string;
    publicKey: string;
    amount: number;
    description?: string;
    externalReference?: string;
    methods?: Array<"PIX" | "CREDIT_CARD" | "DEBIT_CARD" | "BOLETO" | "ACCOUNT_MONEY">;
    payer?: PaymentWidgetPayer;
    savedCards?: PaymentWidgetSavedCard[];
    allowSaveCard?: boolean;
    onSaveCardRequested?: (card: { cardToken: string; brand: string; lastFourDigits: string }) => void;
    persistDraft?: boolean;
    draftKey?: string;
    onPaymentCreated?: (payment: PaymentWidgetPayment) => void;
    onPaymentApproved?: (payment: PaymentWidgetPayment) => void;
    onPaymentRejected?: (payment: PaymentWidgetPayment) => void;
    onPaymentCancelled?: (payment: PaymentWidgetPayment) => void;
    onStatusChange?: (payment: PaymentWidgetPayment) => void;
    onError?: (error: Error) => void;
    accentColor?: string;
    theme?: "dark" | "light";
  }

  export const PaymentWidget: ComponentType<PaymentWidgetProps>;
}