// pages/Financas/index.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { LoginPage } from "../auth/LoginPage";
import { ChangePasswordModal } from "../auth/ChangePasswordModal";
import { useFinance } from "./useFinance";
import { DashboardView } from "./views/DashboardView";
import { ReceivablesView } from "./views/ReceivablesView";
import { PayablesView } from "./views/PayablesView";
import { AgendaView } from "./views/AgendaView";
import { ContactsView } from "./views/ContactsView";
import { CategoriesView } from "./views/CategoriesView";
import { HistoryView } from "./views/HistoryView";
import { NotesView } from "./views/NotesView";
import { ConsorcioView } from "./views/ConsorcioView";
import { TransactionFormModal } from "./components/TransactionFormModal";
import { ContactFormModal } from "./components/ContactFormModal";
import { NoteFormModal } from "./components/NoteFormModal";
import "./financas.scss";

type Tab = "dashboard" | "receber" | "pagar" | "agenda" | "pessoas" | "categorias" | "historico" | "notas" | "consorcio";
type QuickAction = "income" | "expense" | "contact" | "note" | null;

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "dashboard", label: "Início", icon: "bx-home" },
  { key: "receber", label: "A receber", icon: "bx-down-arrow-circle" },
  { key: "pagar", label: "A pagar", icon: "bx-up-arrow-circle" },
  { key: "agenda", label: "Agenda", icon: "bx-calendar" },
  { key: "pessoas", label: "Pessoas", icon: "bx-group" },
  { key: "categorias", label: "Categorias", icon: "bx-purchase-tag-alt" },
  { key: "consorcio", label: "Consórcio", icon: "bx-cycling" },
  { key: "historico", label: "Histórico", icon: "bx-history" },
  { key: "notas", label: "Notas", icon: "bx-note" },
];

export default function Financas() {
  const { user, ready, authFetch, logout } = useAuth();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [quickAction, setQuickAction] = useState<QuickAction>(null);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const store = useFinance(authFetch);

  useEffect(() => {
    if (user) store.load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!ready) {
    return (
      <div className="fin-empty" style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <i className="bx bx-loader-alt bx-spin" />
        <p>Verificando sessão...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginPage title="Finanças" subtitle="Acesso restrito ao controle de entradas e saídas." onSuccess={() => { }} />;
  }

  return (
    <section className="groupBlogAdmin" id="financas">
      <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" />

      <div className="blog-admin financas">
        <div className="admin-header">
          <div className="admin-header__left">
            <h2 className="titleBlogAdmin">Finanças</h2>
            {store.loading && (
              <span className="admin-badge">
                <i className="bx bx-loader-alt bx-spin" /> Carregando
              </span>
            )}
          </div>
          <div className="admin-header__right">
            <button className="btn-blog btn-blog--ghost" onClick={() => store.refresh()} disabled={store.loading} title="Atualizar">
              <i className="bx bx-refresh" />
            </button>
            <button className="btn-blog btn-blog--ghost" onClick={() => setShowChangePassword(true)} title="Trocar senha">
              <i className="bx bx-key" />
            </button>
            <Link to="/" className="btn-blog btn-blog--ghost">
              <i className="bx bx-arrow-back" />
              <span className="btn-label-desktop">Início</span>
            </Link>
            <button className="btn-blog btn-blog--ghost" onClick={logout} title="Sair">
              <i className="bx bx-log-out" />
            </button>
          </div>
        </div>

        {store.error && (
          <div className="financas-alert financas-alert--error">
            <i className="bx bx-error-circle" /> {store.error}
          </div>
        )}

        <nav className="financas-tabs">
          {TABS.map((t) => (
            <button key={t.key} className={`financas-tabs__btn${tab === t.key ? " financas-tabs__btn--active" : ""}`} onClick={() => setTab(t.key)}>
              <i className={`bx ${t.icon}`} />
              <span>{t.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-panel financas-panel">
          {tab === "dashboard" && <DashboardView store={store} />}
          {tab === "receber" && <ReceivablesView store={store} />}
          {tab === "pagar" && <PayablesView store={store} />}
          {tab === "agenda" && <AgendaView store={store} />}
          {tab === "pessoas" && <ContactsView store={store} />}
          {tab === "categorias" && <CategoriesView store={store} />}
          {tab === "consorcio" && <ConsorcioView authFetch={authFetch} />}
          {tab === "historico" && <HistoryView store={store} />}
          {tab === "notas" && <NotesView store={store} />}
        </div>
      </div>

      <button className="fin-fab" onClick={() => setShowActionMenu(true)} aria-label="Novo lançamento">
        <i className="bx bx-plus" />
      </button>

      {showActionMenu && (
        <div className="fin-modal-overlay fin-modal-overlay--sheet" onClick={(e) => e.target === e.currentTarget && setShowActionMenu(false)}>
          <div className="fin-modal fin-modal--sheet" style={{ maxWidth: 360 }}>
            <div className="fin-modal__grabber" />
            <div className="fin-modal__head">
              <h3>O que deseja cadastrar?</h3>
              <button onClick={() => setShowActionMenu(false)}><i className="bx bx-x" /></button>
            </div>
            <div className="fin-action-list">
              <button className="fin-action-item" onClick={() => { setShowActionMenu(false); setQuickAction("income"); }}>
                <i className="bx bx-up-arrow-circle" style={{ color: "#22c55e" }} /> Dinheiro a receber
              </button>
              <button className="fin-action-item" onClick={() => { setShowActionMenu(false); setQuickAction("expense"); }}>
                <i className="bx bx-down-arrow-circle" style={{ color: "#ef4444" }} /> Conta a pagar
              </button>
              <button className="fin-action-item" onClick={() => { setShowActionMenu(false); setQuickAction("contact"); }}>
                <i className="bx bx-user" /> Pessoa
              </button>
              <button className="fin-action-item" onClick={() => { setShowActionMenu(false); setQuickAction("note"); }}>
                <i className="bx bx-note" /> Nota
              </button>
            </div>
          </div>
        </div>
      )}

      {quickAction === "income" && <TransactionFormModal store={store} mode="INCOME" onClose={() => setQuickAction(null)} />}
      {quickAction === "expense" && <TransactionFormModal store={store} mode="EXPENSE" onClose={() => setQuickAction(null)} />}
      {quickAction === "contact" && <ContactFormModal store={store} contact={null} onClose={() => setQuickAction(null)} />}
      {quickAction === "note" && <NoteFormModal store={store} note={null} onClose={() => setQuickAction(null)} />}
      {showChangePassword && <ChangePasswordModal onClose={() => setShowChangePassword(false)} />}
    </section>
  );
}