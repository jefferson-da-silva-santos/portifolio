// pages/Financas/consorcioTypes.ts

export type StatusCota = "EM_ANDAMENTO" | "CONTEMPLADA" | "QUITADA" | "CANCELADA";
export type ParcelaStatus = "PENDING" | "PAID" | "OVERDUE";

export interface Consorcio {
  id: string;
  nome: string;
  administradora: string;
  grupo?: string | null;
  cota?: string | null;
  rd?: string | null;
  bemDescricao?: string | null;
  bemModeloCodigo?: string | null;
  bemValorOriginal?: number | null;
  bemValorAtual?: number | null;
  prazoMeses: number;
  percentualMensal?: number | null;
  taxaAdministracaoPct?: number | null;
  fundoReservaPct?: number | null;
  seguroVidaPct?: number | null;
  statusCota: StatusCota;
  contemplado: boolean;
  dataContemplacao?: string | null;
  grupoParticipantesAtivos?: number | null;
  grupoAContemplar?: number | null;
  grupoContemplados?: number | null;
  grupoQuitados?: number | null;
  grupoDesistentes?: number | null;
  grupoMaxParticipantes?: number | null;
  dataPrimeiraAssembleia?: string | null;
  dataProximaAssembleia?: string | null;
  dataUltimaAssembleia?: string | null;
}

export interface ConsorcioParcela {
  id: string;
  consorcioId: string;
  numero: number;
  dataAssembleia: string;
  valorDevido: number;
  percentualDevido?: number | null;
  dataPagamento?: string | null;
  valorPago?: number | null;
  percentualPago?: number | null;
  fundoComum?: number | null;
  fundoReserva?: number | null;
  taxaAdministracao?: number | null;
  seguroVida?: number | null;
  status: ParcelaStatus;
}

export interface ConsorcioReajuste {
  id: string;
  consorcioId: string;
  data: string;
  novoValorBem: number;
}

export interface ConsorcioState {
  consorcios: Consorcio[];
  parcelas: ConsorcioParcela[];
  reajustes: ConsorcioReajuste[];
}