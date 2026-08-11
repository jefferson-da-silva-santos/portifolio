// pages/auth/AuthContext.tsx
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { BASE_API } from "../Blog";

type User = { id: string; email: string; name: string | null };

type AuthContextValue = {
  user: User | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  authFetch: (input: string, init?: RequestInit) => Promise<Response>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const refreshPromise = useRef<Promise<string | null> | null>(null);

  const refresh = useCallback(async (): Promise<string | null> => {
    if (refreshPromise.current) return refreshPromise.current;
    refreshPromise.current = (async () => {
      try {
        const res = await fetch(`${BASE_API}/api/auth/refresh`, { method: "POST", credentials: "include" });
        if (!res.ok) {
          setAccessToken(null);
          setUser(null);
          return null;
        }
        const data = await res.json();
        setAccessToken(data.accessToken);
        return data.accessToken as string;
      } catch {
        setAccessToken(null);
        setUser(null);
        return null;
      } finally {
        refreshPromise.current = null;
      }
    })();
    return refreshPromise.current;
  }, []);

  useEffect(() => {
    refresh().finally(() => setReady(true));
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch(`${BASE_API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { ok: false, error: data.error || "Erro ao entrar." };
      setAccessToken(data.accessToken);
      setUser(data.user);
      return { ok: true };
    } catch {
      return { ok: false, error: "Não foi possível conectar ao servidor." };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch(`${BASE_API}/api/auth/logout`, { method: "POST", credentials: "include" });
    } catch { /* segue mesmo se falhar */ }
    setAccessToken(null);
    setUser(null);
  }, []);

  const authFetch = useCallback(
    async (input: string, init: RequestInit = {}): Promise<Response> => {
      const doFetch = (token: string | null) =>
        fetch(input, {
          ...init,
          credentials: "include",
          headers: { ...(init.headers || {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        });
      let res = await doFetch(accessToken);
      if (res.status === 401) {
        const newToken = await refresh();
        if (newToken) res = await doFetch(newToken);
      }
      return res;
    },
    [accessToken, refresh]
  );

  return (
    <AuthContext.Provider value={{ user, ready, login, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>.");
  return ctx;
}