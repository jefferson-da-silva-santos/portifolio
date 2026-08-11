// pages/Financas/views/ConsorcioView.tsx
// Área específica de gestão de consórcio. Mostra o vídeo do bem, indicadores
// (total pago, % concluído, projeção do custo final, data estimada de quitação)
// e a tabela editável das 60 parcelas.

import { useEffect, useMemo, useState } from "react";
import { consorcioApi } from "../consorcioApi";
import type { Consorcio, ConsorcioParcela, ConsorcioState } from "../consorcioTypes";
import { YouTubeEmbed } from "../components/YouTubeEmbed";
import { ParcelaEditModal } from "../components/ParcelaEditModal";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "#NaoPrecisamosDeArmas00#";

const formatBRL = (v: number) => `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const formatDate = (iso?: string | null) => (iso ? new Date(iso).toLocaleDateString("pt-BR") : "-");

function statusInfo(status: ConsorcioParcela["status"]) {
  return status === "PAID"
    ? { color: "#22c55e", label: "Paga" }
    : status === "OVERDUE"
      ? { color: "#ef4444", label: "Atrasada" }
      : { color: "#f59e0b", label: "Pendente" };
}

export function ConsorcioView() {
  const [state, setState] = useState<ConsorcioState>({ consorcios: [], parcelas: [], reajustes: [] });
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingParcela, setEditingParcela] = useState<ConsorcioParcela | null>(null);
  const [filter, setFilter] = useState<"Todas" | "Pagas" | "Pendentes" | "Atrasadas">("Todas");

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await consorcioApi.getState(ADMIN_PASSWORD);
      setState(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar consórcio.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function runSeed() {
    setSeeding(true);
    setError(null);
    try {
      await consorcioApi.seedHondaBross(ADMIN_PASSWORD);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao cadastrar consórcio.");
    } finally {
      setSeeding(false);
    }
  }

  async function toggleParcela(id: string) {
    const updated = await consorcioApi.toggleParcela(ADMIN_PASSWORD, id);
    setState((s) => ({ ...s, parcelas: s.parcelas.map((p) => (p.id === id ? updated : p)) }));
  }

  const consorcio: Consorcio | undefined = state.consorcios[0];
  const parcelas = useMemo(
    () => state.parcelas.filter((p) => p.consorcioId === consorcio?.id).sort((a, b) => a.numero - b.numero),
    [state.parcelas, consorcio]
  );

  const indicators = useMemo(() => {
    const paid = parcelas.filter((p) => p.status === "PAID");
    const totalPago = paid.reduce((a, p) => a + (p.valorPago ?? p.valorDevido), 0);
    const restantes = parcelas.filter((p) => p.status !== "PAID");
    const custoFinalProjetado = totalPago + restantes.reduce((a, p) => a + p.valorDevido, 0);
    const percentualConcluido = parcelas.length ? (paid.length / parcelas.length) * 100 : 0;
    const overdue = parcelas.filter((p) => p.status === "OVERDUE").length;
    const proxima = restantes.sort((a, b) => a.dataAssembleia.localeCompare(b.dataAssembleia))[0];
    const ultima = parcelas[parcelas.length - 1];

    return {
      totalPago,
      custoFinalProjetado,
      percentualConcluido,
      pagas: paid.length,
      restantes: restantes.length,
      overdue,
      proxima,
      dataQuitacaoEstimada: ultima?.dataAssembleia,
    };
  }, [parcelas]);

  const filteredParcelas = useMemo(() => {
    if (filter === "Todas") return parcelas;
    if (filter === "Pagas") return parcelas.filter((p) => p.status === "PAID");
    if (filter === "Pendentes") return parcelas.filter((p) => p.status === "PENDING");
    return parcelas.filter((p) => p.status === "OVERDUE");
  }, [parcelas, filter]);

  if (loading) {
    return (
      <div className="fin-empty">
        <i className="bx bx-loader-alt bx-spin" />
        <p>Carregando consórcio...</p>
      </div>
    );
  }

  if (!consorcio) {
    return (
      <div className="fin-empty" style={{ padding: "3rem 1rem" }}>
        <i className="bx bx-motorcycle" />
        <p style={{ marginBottom: "1rem" }}>Nenhum consórcio cadastrado ainda.</p>
        {error && (
          <div className="financas-alert financas-alert--error" style={{ display: "inline-flex", marginBottom: "1rem" }}>
            <i className="bx bx-error-circle" /> {error}
          </div>
        )}
        <button className="btn-blog" onClick={runSeed} disabled={seeding}>
          <i className={`bx ${seeding ? "bx-loader-alt bx-spin" : "bx-motorcycle"}`} />
          {seeding ? "Cadastrando..." : "Cadastrar consórcio Honda Bross"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <YouTubeEmbed videoId="2eWsiAagN_c" title={consorcio.bemDescricao || consorcio.nome} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>{consorcio.nome}</h3>
          <div style={{ color: "#9ca3af", fontSize: "0.82rem", marginTop: "0.15rem" }}>
            {consorcio.bemDescricao} · Grupo {consorcio.grupo} · Cota {consorcio.cota}
          </div>
        </div>
        <span className="fin-consorcio-badge">
          <i className="bx bx-motorcycle" /> {consorcio.administradora}
        </span>
      </div>

      {error && (
        <div className="financas-alert financas-alert--error">
          <i className="bx bx-error-circle" /> {error}
        </div>
      )}

      {/* Indicadores */}
      <div className="fin-summary-grid">
        <div className="fin-summary-card fin-summary-card--accent">
          <div className="fin-summary-card__label">
            <span>Total pago</span>
            <i className="bx bx-wallet" />
          </div>
          <div className="fin-summary-card__value">{formatBRL(indicators.totalPago)}</div>
          <div className="fin-summary-card__hint">{indicators.pagas} de {parcelas.length} parcelas</div>
        </div>

        <div className="fin-summary-card">
          <div className="fin-summary-card__label">
            <span>Progresso</span>
            <i className="bx bx-pie-chart-alt" />
          </div>
          <div className="fin-summary-card__value">{indicators.percentualConcluido.toFixed(1)}%</div>
          <div style={{ background: "#2e2e2e", borderRadius: 50, height: 6, marginTop: "0.4rem", overflow: "hidden" }}>
            <div style={{ width: `${indicators.percentualConcluido}%`, height: "100%", background: "linear-gradient(90deg, #00ffff, #0091ff)" }} />
          </div>
        </div>

        <div className="fin-summary-card">
          <div className="fin-summary-card__label">
            <span>Custo final projetado</span>
            <i className="bx bx-trending-up" />
          </div>
          <div className="fin-summary-card__value">{formatBRL(indicators.custoFinalProjetado)}</div>
          <div className="fin-summary-card__hint">
            Bem: {formatBRL(consorcio.bemValorAtual ?? 0)} · valor pode ser reajustado
          </div>
        </div>
      </div>

      <div className="fin-summary-grid">
        <div className="fin-summary-card">
          <div className="fin-summary-card__label">
            <span>Próxima parcela</span>
            <i className="bx bx-calendar-event" />
          </div>
          <div className="fin-summary-card__value" style={{ fontSize: "1.1rem" }}>
            {indicators.proxima ? formatBRL(indicators.proxima.valorDevido) : "—"}
          </div>
          <div className="fin-summary-card__hint">
            {indicators.proxima ? `Vence em ${formatDate(indicators.proxima.dataAssembleia)}` : "Todas pagas"}
          </div>
        </div>

        <div className="fin-summary-card">
          <div className="fin-summary-card__label">
            <span>Quitação estimada</span>
            <i className="bx bx-flag-checkered" />
          </div>
          <div className="fin-summary-card__value" style={{ fontSize: "1.1rem" }}>{formatDate(indicators.dataQuitacaoEstimada)}</div>
          <div className="fin-summary-card__hint">{indicators.restantes} parcelas restantes</div>
        </div>

        <div className="fin-summary-card">
          <div className="fin-summary-card__label">
            <span>Status do grupo</span>
            <i className="bx bx-group" />
          </div>
          <div className="fin-summary-card__value" style={{ fontSize: "1.1rem" }}>{consorcio.grupoParticipantesAtivos ?? "-"} ativos</div>
          <div className="fin-summary-card__hint">
            {consorcio.grupoContemplados ?? 0} contemplados · {consorcio.grupoAContemplar ?? 0} a contemplar
          </div>
        </div>
      </div>

      {indicators.overdue > 0 && (
        <div className="fin-pills">
          <span className="fin-pill fin-pill--danger">
            <span className="fin-pill__dot" style={{ background: "#ef4444" }} />
            {indicators.overdue} parcela(s) atrasada(s)
          </span>
        </div>
      )}

      {/* Ficha técnica do plano */}
      <div className="fin-section-head">
        <h3>Sobre o plano</h3>
      </div>
      <div className="admin-panel" style={{ padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
        <div className="fin-plano-grid">          <PlanoField label="Prazo do plano" value={`${consorcio.prazoMeses} meses`} />
          <PlanoField label="% mensal" value={consorcio.percentualMensal ? `${consorcio.percentualMensal.toFixed(4)}%` : "-"} />
          <PlanoField label="Taxa de administração" value={consorcio.taxaAdministracaoPct ? `${consorcio.taxaAdministracaoPct}%` : "-"} />
          <PlanoField label="Fundo de reserva" value={consorcio.fundoReservaPct ? `${consorcio.fundoReservaPct}%` : "-"} />
          <PlanoField label="Seguro de vida" value={consorcio.seguroVidaPct ? `${consorcio.seguroVidaPct}%` : "-"} />
          <PlanoField label="Valor original do bem" value={formatBRL(consorcio.bemValorOriginal ?? 0)} />
          <PlanoField label="Valor atual do bem" value={formatBRL(consorcio.bemValorAtual ?? 0)} />
          <PlanoField label="Primeira assembleia" value={formatDate(consorcio.dataPrimeiraAssembleia)} />
          <PlanoField label="Próxima assembleia" value={formatDate(consorcio.dataProximaAssembleia)} />
        </div>
      </div>

      {/* Tabela de parcelas */}
      <div className="fin-section-head">
        <h3>Parcelas ({parcelas.length})</h3>
      </div>

      <div className="fin-filters">
        {(["Todas", "Pagas", "Pendentes", "Atrasadas"] as const).map((f) => (
          <button key={f} className={`fin-filter-chip${filter === f ? " fin-filter-chip--active" : ""}`} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <div className="fin-row-list">
        {filteredParcelas.map((p) => {
          const st = statusInfo(p.status);
          return (
            <div key={p.id} className="fin-row fin-row--consorcio" onClick={() => setEditingParcela(p)}>
              <div className="fin-row__dot" style={{ background: st.color }} />
              <div className="fin-row__body">
                <div className="fin-row__title">Parcela {p.numero}/{parcelas.length}</div>
                <div className="fin-row__desc">
                  Assembleia {formatDate(p.dataAssembleia)}
                  {p.dataPagamento && ` · Pago em ${formatDate(p.dataPagamento)}`}
                </div>
              </div>
              <div className="fin-row__right">
                <div className="fin-row__amount">{formatBRL(p.valorPago ?? p.valorDevido)}</div>
                <div className="fin-row__status" style={{ color: st.color }}>{st.label}</div>
              </div>
              <button
                className="fin-row__quick-toggle"
                onClick={(e) => { e.stopPropagation(); toggleParcela(p.id); }}
                title={p.status === "PAID" ? "Desfazer pagamento" : "Marcar como paga"}
                style={{ color: st.color }}
              >
                <i className={`bx ${p.status === "PAID" ? "bx-x" : "bx-check"}`} />
              </button>
            </div>
          );
        })}
      </div>

      {editingParcela && (
        <ParcelaEditModal
          parcela={editingParcela}
          totalParcelas={parcelas.length}
          onClose={() => setEditingParcela(null)}
          onSaved={(updated: any) => {
            setState((s) => ({ ...s, parcelas: s.parcelas.map((p) => (p.id === updated.id ? updated : p)) }));
            setEditingParcela(null);
          }}
        />
      )}
    </div>
  );
}

function PlanoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="fin-plano-field">
      <div className="fin-plano-field__label">{label}</div>
      <div className="fin-plano-field__value">{value}</div>
    </div>
  );
}