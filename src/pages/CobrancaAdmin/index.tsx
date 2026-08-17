// ARQUIVO: src/pages/CobrancaAdmin/index.tsx
import { useState } from "react";
import { BASE_API } from "../Blog";
import { useAuth } from "../auth/AuthContext";
import { LoginPage } from "../auth/LoginPage";
import { ChangePasswordModal } from "../auth/ChangePasswordModal";
import type { ClientData, InvoiceData, SendMonthlyResult, ToastType } from "./types";
import "./cobranca-admin.scss";

const API_BASE = `${BASE_API}/api/charges`;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

function formatMoney(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function monthLabel(referenceMonth: string) {
  const [year, month] = referenceMonth.split("-").map(Number);
  if (!year || !month) return referenceMonth;
  return new Date(year, month - 1, 1).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
}

function Toast({ message, type, onClose }: { message: string; type: ToastType; onClose: () => void }) {
  return (
    <div className={`admin-toast admin-toast--${type}`}>
      <i className={`bx ${type === "success" ? "bx-check-circle" : "bx-x-circle"}`} />
      <span>{message}</span>
      <button onClick={onClose}>
        <i className="bx bx-x" />
      </button>
    </div>
  );
}

function ConfirmDialog({ text, onConfirm, onCancel }: { text: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="admin-dialog-overlay">
      <div className="admin-dialog">
        <i className="bx bx-trash admin-dialog__icon" />
        <h3>Remover cliente?</h3>
        <p>{text}</p>
        <div className="admin-dialog__actions">
          <button className="btn-blog btn-blog--ghost" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn-blog btn-blog--danger" onClick={onConfirm}>
            <i className="bx bx-trash" /> Remover
          </button>
        </div>
      </div>
    </div>
  );
}

interface ClientFormProps {
  onSave: (data: { name: string; email: string }) => void;
  onCancel: () => void;
  saving: boolean;
}

function ClientForm({ onSave, onCancel, saving }: ClientFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="admin-form-grid" style={{ marginBottom: "1.25rem" }}>
      <div className="admin-form-field admin-form-field--full">
        <label className="admin-label">Nome</label>
        <input className="input-blog" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do cliente" />
      </div>
      <div className="admin-form-field admin-form-field--full">
        <label className="admin-label">E-mail</label>
        <input
          className="input-blog"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="cliente@exemplo.com"
        />
      </div>
      <div className="admin-form-actions">
        <button className="btn-blog btn-blog--ghost" onClick={onCancel}>
          Cancelar
        </button>
        <button
          className="btn-blog"
          disabled={saving || !name.trim() || !email.trim()}
          onClick={() => onSave({ name: name.trim(), email: email.trim() })}
        >
          <i className={`bx ${saving ? "bx-loader-alt bx-spin" : "bx-plus"}`} /> {saving ? "Salvando..." : "Adicionar cliente"}
        </button>
      </div>
    </div>
  );
}

type View = "clients" | "invoices";

const CobrancaAdminPage = () => {
  const { user, ready, authFetch, logout } = useAuth();

  const [view, setView] = useState<View>("clients");
  const [clients, setClients] = useState<ClientData[]>([]);
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [lastResult, setLastResult] = useState<SendMonthlyResult | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  function showToast(message: string, type: ToastType = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }

  async function loadAll() {
    try {
      const [clientsRes, invoicesRes] = await Promise.all([authFetch(`${API_BASE}/clients`), authFetch(`${API_BASE}/invoices`)]);
      setClients(await clientsRes.json());
      setInvoices(await invoicesRes.json());
    } catch {
      showToast("Erro ao carregar cobranças.", "error");
    }
  }

  if (user && !loaded) {
    setLoaded(true);
    loadAll();
  }

  async function handleAddClient(data: { name: string; email: string }) {
    setSaving(true);
    try {
      const res = await authFetch(`${API_BASE}/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      const newClient: ClientData = await res.json();
      setClients((prev) => [...prev, newClient].sort((a, b) => a.name.localeCompare(b.name)));
      showToast("Cliente adicionado!");
      setShowForm(false);
    } catch {
      showToast("Erro ao adicionar cliente.", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleActive(client: ClientData) {
    try {
      const res = await authFetch(`${API_BASE}/clients/${client.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !client.active }),
      });
      const updated: ClientData = await res.json();
      setClients((prev) => prev.map((c) => (c.id === client.id ? updated : c)));
    } catch {
      showToast("Erro ao atualizar cliente.", "error");
    }
  }

  async function handleDelete(id: string) {
    try {
      await authFetch(`${API_BASE}/clients/${id}`, { method: "DELETE" });
      setClients((prev) => prev.filter((c) => c.id !== id));
      showToast("Cliente removido.", "error");
    } catch {
      showToast("Erro ao remover cliente.", "error");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSendMonthly() {
    setSending(true);
    setLastResult(null);
    try {
      const res = await authFetch(`${API_BASE}/send-monthly`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Falha ao enviar cobranças.");
      setLastResult(data);
      showToast(`Cobranças de ${monthLabel(data.referenceMonth)} processadas.`);
      loadAll();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Erro ao enviar cobranças.", "error");
    } finally {
      setSending(false);
    }
  }

  if (!ready) {
    return (
      <div className="fin-empty" style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <i className="bx bx-loader-alt bx-spin" />
        <p>Verificando sessão...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginPage title="Cobranças" subtitle="Acesso restrito à gestão de mensalidades." onSuccess={() => setLoaded(false)} />;
  }

  const activeClientsCount = clients.filter((c) => c.active).length;

  return (
    <section className="groupBlogAdmin cobranca-admin" id="cobranca-admin">
      <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {deletingId && (
        <ConfirmDialog
          text="O histórico de faturas desse cliente será perdido junto."
          onConfirm={() => handleDelete(deletingId)}
          onCancel={() => setDeletingId(null)}
        />
      )}
      {showChangePassword && <ChangePasswordModal onClose={() => setShowChangePassword(false)} />}

      <div className="blog-admin">
        <div className="admin-header">
          <div className="admin-header__left">
            <h2 className="titleBlogAdmin">Cobranças</h2>
            <span className="admin-badge">
              <i className="bx bx-user" /> {activeClientsCount} cliente{activeClientsCount === 1 ? "" : "s"} ativo
              {activeClientsCount === 1 ? "" : "s"}
            </span>
          </div>
          <div className="admin-header__right">
            <button className="btn-blog btn-blog--ghost" onClick={() => setShowChangePassword(true)} title="Trocar senha">
              <i className="bx bx-key" />
            </button>
            <button className="btn-blog btn-blog--ghost" onClick={logout} title="Sair">
              <i className="bx bx-log-out" />
            </button>
          </div>
        </div>

        <div className="admin-panel cobranca-admin__send-panel">
          <h3 className="admin-panel-title">
            <i className="bx bx-send" /> Cobrança do mês
          </h3>
          <p className="cobranca-admin__send-desc">
            Gera a fatura do mês atual pra cada cliente ativo e envia o link de pagamento por e-mail. Clientes já
            cobrados neste mês são pulados automaticamente - clicar de novo não duplica nem reenvia pra eles.
          </p>
          <button className="btn-blog" onClick={handleSendMonthly} disabled={sending || activeClientsCount === 0}>
            <i className={`bx ${sending ? "bx-loader-alt bx-spin" : "bx-send"}`} />
            {sending ? "Enviando..." : "Enviar cobranças do mês"}
          </button>

          {activeClientsCount === 0 && (
            <span style={{ fontSize: "0.8rem", color: "#9ca3af" }}>Cadastre ao menos um cliente ativo pra poder enviar.</span>
          )}

          {lastResult && (
            <div className="cobranca-admin__result">
              <div className="cobranca-admin__result-row cobranca-admin__result-row--success">
                <i className="bx bx-check-circle" /> {lastResult.sent.length} enviada(s)
              </div>
              {lastResult.skipped.length > 0 && (
                <div className="cobranca-admin__result-row cobranca-admin__result-row--muted">
                  <i className="bx bx-skip-next" /> {lastResult.skipped.length} já cobrado(s) este mês
                </div>
              )}
              {lastResult.failed.length > 0 && (
                <div className="cobranca-admin__result-row cobranca-admin__result-row--error">
                  <i className="bx bx-error-circle" /> {lastResult.failed.length} falharam
                </div>
              )}
            </div>
          )}
        </div>

        <div className="admin-header" style={{ marginTop: "1.5rem", borderBottom: "none" }}>
          <div className="admin-header__left">
            <button className={`btn-blog ${view === "clients" ? "" : "btn-blog--ghost"}`} onClick={() => setView("clients")}>
              <i className="bx bx-group" /> Clientes
            </button>
            <button
              className={`btn-blog ${view === "invoices" ? "" : "btn-blog--ghost"}`}
              onClick={() => setView("invoices")}
              style={{ marginLeft: "0.5rem" }}
            >
              <i className="bx bx-receipt" /> Faturas
            </button>
          </div>
        </div>

        {view === "clients" && (
          <div className="admin-panel">
            <div className="admin-panel-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>
                <i className="bx bx-group" /> Clientes
              </span>
              {!showForm && (
                <button className="btn-blog btn-blog--ghost" onClick={() => setShowForm(true)}>
                  <i className="bx bx-plus" /> Novo cliente
                </button>
              )}
            </div>

            {showForm && <ClientForm onSave={handleAddClient} onCancel={() => setShowForm(false)} saving={saving} />}

            {clients.length === 0 ? (
              <div className="admin-empty">
                <i className="bx bx-user-x" />
                <p>Nenhum cliente cadastrado ainda.</p>
              </div>
            ) : (
              <div className="admin-posts-list">
                {clients.map((client) => (
                  <div key={client.id} className="admin-post-row">
                    <div className="admin-post-row__info">
                      <div className="admin-post-row__title-row">
                        <h4>{client.name}</h4>
                        {!client.active && <span className="admin-tag-sm">Inativo</span>}
                      </div>
                      <p className="admin-post-row__excerpt">{client.email}</p>
                      <div className="admin-post-row__meta">
                        <span>
                          <i className="bx bx-calendar" /> desde {formatDate(client.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="admin-post-row__actions">
                      <button
                        className="admin-icon-btn"
                        title={client.active ? "Desativar" : "Ativar"}
                        onClick={() => handleToggleActive(client)}
                      >
                        <i className={`bx ${client.active ? "bx-toggle-right" : "bx-toggle-left"}`} />
                      </button>
                      <button className="admin-icon-btn admin-icon-btn--delete" title="Remover" onClick={() => setDeletingId(client.id)}>
                        <i className="bx bx-trash" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === "invoices" && (
          <div className="admin-panel">
            <h3 className="admin-panel-title">
              <i className="bx bx-receipt" /> Faturas
            </h3>
            {invoices.length === 0 ? (
              <div className="admin-empty">
                <i className="bx bx-receipt" />
                <p>Nenhuma fatura gerada ainda.</p>
              </div>
            ) : (
              <div className="admin-posts-list">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="admin-post-row">
                    <div className="admin-post-row__info">
                      <div className="admin-post-row__title-row">
                        <h4>{invoice.clientName ?? invoice.clientId}</h4>
                        <span className={`cobranca-admin__status cobranca-admin__status--${invoice.status}`}>
                          {invoice.status === "paid" ? "Pago" : "Pendente"}
                        </span>
                      </div>
                      <p className="admin-post-row__excerpt">
                        {monthLabel(invoice.referenceMonth)} — {formatMoney(invoice.amount)}
                      </p>
                      <div className="admin-post-row__meta">
                        <span>
                          <i className="bx bx-calendar" /> criada em {formatDate(invoice.createdAt)}
                        </span>
                        {invoice.paidAt && (
                          <span>
                            <i className="bx bx-check" /> paga em {formatDate(invoice.paidAt)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CobrancaAdminPage;