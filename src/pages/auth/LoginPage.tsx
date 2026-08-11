// pages/auth/LoginPage.tsx
import { useState } from "react";
import { useAuth } from "./AuthContext";
import "./login.scss";

type Props = { title: string; subtitle: string; onSuccess: () => void };

export function LoginPage({ title, subtitle, onSuccess }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email.trim() || !password) return setError("Preencha e-mail e senha.");
    setLoading(true);
    setError(null);
    const result = await login(email.trim(), password);
    setLoading(false);
    if (result.ok) onSuccess();
    else setError(result.error || "E-mail ou senha incorretos.");
  }

  return (
    <section className="auth-login-screen">
      <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" />
      <div className="auth-login-card">
        <div className="auth-login-card__logo">
          ‹ Jeff <span className="slash">⁄</span> {title} ›
        </div>
        <h2>Área restrita</h2>
        <p>{subtitle}</p>

        <div className="auth-login-card__form">
          <div className={`auth-login-card__field${error ? " auth-login-card__field--error" : ""}`}>
            <i className="bx bx-envelope" />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null); }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              autoFocus
              autoComplete="email"
              inputMode="email"
            />
          </div>

          <div className={`auth-login-card__field${error ? " auth-login-card__field--error" : ""}`}>
            <i className="bx bx-lock" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(null); }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="auth-login-card__toggle-pass"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              tabIndex={-1}
            >
              <i className={`bx ${showPassword ? "bx-hide" : "bx-show"}`} />
            </button>
          </div>

          {error && (
            <span className="auth-login-card__error">
              <i className="bx bx-error-circle" /> {error}
            </span>
          )}

          <button className="btn-blog btn-blog--full" onClick={handleSubmit} disabled={loading}>
            <i className={`bx ${loading ? "bx-loader-alt bx-spin" : "bx-log-in"}`} />
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>
      </div>
    </section>
  );
}