// ARQUIVO: src/pages/Cobranca/api.ts
// ==========================================================
// Assumi VITE_API_URL como o env var da URL do blog-server, pra ficar
// consistente com o padrão dos outros projetos (Financas/api.ts deve
// usar a mesma base, já que é o mesmo backend) - ajuste se o nome
// real da variável no seu projeto for diferente.
// ==========================================================
import type { InvoiceData } from "./types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// Base do módulo de cobranças - é ISSO que vai direto na prop
// apiBaseUrl do <PaymentWidget> (ele mesmo monta /config, /payments,
// /payments/:id em cima dessa base).
export const CHARGES_API_BASE_URL = `${API_URL}/api/charges`;

/**
 * Busca os dados públicos de uma cobrança pelo token (o "c" da URL).
 * @throws Error se a cobrança não existir (404) ou outra falha.
 */
export async function fetchInvoice(token: string): Promise<InvoiceData> {
  const res = await fetch(`${CHARGES_API_BASE_URL}/invoice/${encodeURIComponent(token)}`);

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.error || `Não foi possível carregar a cobrança (HTTP ${res.status}).`;
    throw new Error(message);
  }

  return res.json();
}

/**
 * Busca a public key do Mercado Pago - o <PaymentWidget> NÃO busca
 * isso sozinho (é uma prop obrigatória), então quem integra precisa
 * buscar e passar pra ele. Mesmo padrão usado no projeto do currículo.
 */
export async function fetchPublicKey(): Promise<string> {
  const res = await fetch(`${CHARGES_API_BASE_URL}/config`);

  if (!res.ok) {
    throw new Error(`Não foi possível carregar a configuração de pagamento (HTTP ${res.status}).`);
  }

  const data = await res.json();
  if (!data?.publicKey) {
    throw new Error("publicKey ausente na resposta de /config.");
  }

  return data.publicKey;
}