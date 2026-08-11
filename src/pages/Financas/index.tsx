// pages/Financas/index.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import "./financas.scss";
import { BASE_API } from "../Blog";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

type Tab = "dashboard" | "receber" | "pagar" | "agenda" | "pessoas" | "categorias" | "historico" | "notas" | "consorcio";

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "dashboard", label: "Início", icon: "bx-home" },
  { key: "receber", label: "A receber", icon: "bx-down-arrow-circle" },
  { key: "pagar", label: "A pagar", icon: "bx-up-arrow-circle" },
  { key: "agenda", label: "Agenda", icon: "bx-calendar" },
  { key: "pessoas", label: "Pessoas", icon: "bx-group" },
  { key: "categorias", label: "Categorias", icon: "bx-purchase-tag-alt" },
  { key: "historico", label: "Histórico", icon: "bx-history" },
  { key: "notas", label: "Notas", icon: "bx-note" },
  { key: "consorcio", label: "Consórcio", icon: "bx-motorcycle" },
];

export default function Financas() {
  const [authed, setAuthed] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [passError, setPassError] = useState(false);
  const [tab, setTab] = useState<Tab>("dashboard");

  const store = useFinance(ADMIN_PASSWORD);

  // pages/Financas/index.tsx — trecho a substituir

  async function handleLogin() {
    if (passInput === ADMIN_PASSWORD) {
      setAuthed(true);
      setPassError(false);
      return;
    }
    try {
      const res = await fetch(`${BASE_API}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passInput }),
      });
      if (res.ok) {
        setAuthed(true);
        setPassError(false);
      } else {
        setPassError(true);
      }
    } catch {
      setPassError(true);
    }
  }

  useEffect(() => {
    if (authed) store.load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  if (!authed) {
    return (
      <section className="groupBlogAdmin" id="financas">
        <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" />
        <div className="blog-admin">
          <div className="admin-login-wrapper">
            <div className="admin-login-card">
              <div className="admin-login-card__logo">
                ‹ Jeff <span className="slash">⁄</span> Finanças ›
              </div>
              <h2>Área financeira</h2>
              <p>Acesso restrito ao controle de entradas e saídas.</p>

              <div className="admin-login-card__form">
                <div className={`admin-login-card__field${passError ? " admin-login-card__field--error" : ""}`}>
                  <i className="bx bx-lock" />
                  <input
                    type="password"
                    placeholder="Senha de acesso"
                    value={passInput}
                    onChange={(e) => {
                      setPassInput(e.target.value);
                      setPassError(false);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    autoFocus
                  />
                </div>
                {passError && (
                  <span className="admin-login-card__error">
                    <i className="bx bx-error-circle" /> Senha incorreta.
                  </span>
                )}
                <button className="btn-blog btn-blog--full" onClick={handleLogin}>
                  <i className="bx bx-log-in" /> Entrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="groupBlogAdmin" id="financas">
      <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" />

      <div className="blog-admin financas">
        {/* Header */}
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
            <button
              className="btn-blog btn-blog--ghost"
              onClick={() => store.refresh()}
              disabled={store.loading}
              title="Atualizar"
            >
              <i className="bx bx-refresh" />
            </button>
            <Link to="/" className="btn-blog btn-blog--ghost">
              <i className="bx bx-arrow-back" /> Início
            </Link>
            <button
              className="btn-blog btn-blog--ghost"
              onClick={() => setAuthed(false)}
              title="Sair"
            >
              <i className="bx bx-log-out" />
            </button>
          </div>
        </div>

        {store.error && (
          <div className="financas-alert financas-alert--error">
            <i className="bx bx-error-circle" /> {store.error}
          </div>
        )}

        {/* Navegação por abas */}
        <nav className="financas-tabs">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`financas-tabs__btn${tab === t.key ? " financas-tabs__btn--active" : ""}`}
              onClick={() => setTab(t.key)}
            >
              <i className={`bx ${t.icon}`} />
              <span>{t.label}</span>
            </button>
          ))}
        </nav>

        {/* Conteúdo da aba ativa */}
        <div className="admin-panel financas-panel">
          {tab === "dashboard" && <DashboardView store={store} />}
          {tab === "receber" && <ReceivablesView store={store} />}
          {tab === "pagar" && <PayablesView store={store} />}
          {tab === "agenda" && <AgendaView store={store} />}
          {tab === "pessoas" && <ContactsView store={store} />}
          {tab === "categorias" && <CategoriesView store={store} />}
          {tab === "historico" && <HistoryView store={store} />}
          {tab === "notas" && <NotesView store={store} />}
          {tab === "consorcio" && <ConsorcioView />}
        </div>
      </div>
    </section>
  );
}