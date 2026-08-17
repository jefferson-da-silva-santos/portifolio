// ARQUIVO: src/pages/Cobranca/index.tsx
// ==========================================================
// Página pública que abre a partir do link enviado por e-mail
// (?c=TOKEN). Fluxo de estados:
//
//   sem "c" na URL           -> "invalid"     (NUNCA busca nada, nunca
//                                               chega a montar o widget)
//   buscando a fatura         -> "loading"
//   fatura não existe (404)   -> "not-found"
//   fatura já paga            -> "already-paid"
//   fatura pendente, tudo ok  -> "ready"       (aqui sim monta o <PaymentWidget>)
//   pagamento aprovado agora  -> "approved"
//   qualquer outra falha      -> "error"
//
// A VALIDAÇÃO pedida está logo no topo do componente: o useEffect que
// busca a fatura só roda se `token` existir. Sem token, o estado nunca
// sai de "invalid" - a tela de pagamento em si NUNCA aparece à toa.
// ==========================================================
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PaymentWidget } from "@payment-system-mp/react-widget";
import { fetchInvoice, fetchPublicKey, CHARGES_API_BASE_URL } from "./api";
import type { InvoiceData, CobrancaScreenState } from "./types";
import "./cobranca.scss";

function monthLabel(referenceMonth: string): string {
  const [year, month] = referenceMonth.split("-").map(Number);
  if (!year || !month) return referenceMonth;
  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
}

const CobrancaPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("c");

  const [state, setState] = useState<CobrancaScreenState>(token ? "loading" : "invalid");
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // VALIDAÇÃO: sem token, não faz nenhuma requisição - a tela fica
    // parada no estado "invalid" pra sempre, sem nunca tentar montar
    // o widget de pagamento.
    if (!token) {
      setState("invalid");
      return;
    }

    let cancelled = false;
    setState("loading");

    Promise.all([fetchInvoice(token), fetchPublicKey()])
      .then(([invoiceData, key]) => {
        if (cancelled) return;

        setInvoice(invoiceData);
        setPublicKey(key);
        setState(invoiceData.status === "paid" ? "already-paid" : "ready");
      })
      .catch((err: Error) => {
        if (cancelled) return;
        // A API responde 404 com { error: "Cobrança não encontrada." }
        setErrorMessage(err.message);
        setState(err.message.includes("não encontrada") ? "not-found" : "error");
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  function handleApproved() {
    setState("approved");
  }

  return (
    <div className="cobranca-page">
      <div className="cobranca-page__card">
        {state === "invalid" && (
          <div className="cobranca-page__message">
            <i className="bx bx-link-alt" />
            <h1>Link inválido</h1>
            <p>Esse endereço não contém uma cobrança válida. Confira o link recebido por e-mail.</p>
          </div>
        )}

        {state === "loading" && (
          <div className="cobranca-page__message">
            <div className="cobranca-page__spinner" />
            <p>Carregando cobrança…</p>
          </div>
        )}

        {state === "not-found" && (
          <div className="cobranca-page__message">
            <i className="bx bx-error-circle" />
            <h1>Cobrança não encontrada</h1>
            <p>Esse link já pode ter expirado, ou o endereço está incompleto. Confira o link recebido por e-mail.</p>
          </div>
        )}

        {state === "error" && (
          <div className="cobranca-page__message">
            <i className="bx bx-error-circle" />
            <h1>Não foi possível carregar</h1>
            <p>{errorMessage ?? "Tente novamente em alguns instantes."}</p>
          </div>
        )}

        {state === "already-paid" && invoice && (
          <div className="cobranca-page__message cobranca-page__message--success">
            <i className="bx bx-check-circle" />
            <h1>Cobrança já paga</h1>
            <p>
              A mensalidade de {monthLabel(invoice.referenceMonth)} referente a {invoice.clientName} já foi
              confirmada. Nenhuma ação adicional é necessária.
            </p>
          </div>
        )}

        {state === "approved" && invoice && (
          <div className="cobranca-page__message cobranca-page__message--success">
            <i className="bx bx-check-circle" />
            <h1>Pagamento aprovado!</h1>
            <p>Obrigado, {invoice.clientName}. Sua mensalidade de {monthLabel(invoice.referenceMonth)} foi confirmada.</p>
          </div>
        )}

        {state === "ready" && invoice && publicKey && token && (
          <>
            <div className="cobranca-page__header">
              <span className="cobranca-page__eyebrow">Mensalidade {monthLabel(invoice.referenceMonth)}</span>
              <h1>Olá, {invoice.clientName}</h1>
              <p>Finalize o pagamento da sua mensalidade abaixo.</p>
            </div>

            <PaymentWidget
              apiBaseUrl={CHARGES_API_BASE_URL}
              publicKey={publicKey}
              amount={invoice.amount}
              description={`Mensalidade - ${monthLabel(invoice.referenceMonth)}`}
              externalReference={token}
              methods={["PIX", "CREDIT_CARD"]}
              theme="dark"
              accentColor="#00ffff"
              onPaymentApproved={handleApproved}
              onError={(err) => console.error("Erro no pagamento:", err)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CobrancaPage;