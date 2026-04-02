import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";

const API = import.meta.env.VITE_API_URL || "/api";

// ── Contexte global admin ─────────────────────────────────
const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("tsm_token"));
  const [user, setUser] = useState(() => {
    try {
      const t = localStorage.getItem("tsm_token");
      if (!t) return null;
      // Décoder le payload JWT (sans vérification — juste pour l'UI)
      const payload = JSON.parse(atob(t.split(".")[1]));
      return payload;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ── Login ─────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Identifiants incorrects.");

      localStorage.setItem("tsm_token", data.token);
      setToken(data.token);
      setUser(data.user);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Logout ────────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem("tsm_token");
    setToken(null);
    setUser(null);
  }, []);

  // ── Requête authentifiée (helper) ─────────────────────────
  const authFetch = useCallback(
    async (endpoint, options = {}) => {
      const res = await fetch(`${API}/${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(options.headers ?? {}),
        },
      });
      const data = await res.json();
      if (res.status === 401) {
        logout();
        throw new Error("Session expirée. Reconnectez-vous.");
      }
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      return data;
    },
    [token, logout],
  );

  const isAuth = Boolean(token && user);

  return (
    <AdminContext.Provider
      value={{ token, user, isAuth, loading, error, login, logout, authFetch }}
    >
      {children}
    </AdminContext.Provider>
  );
}

// ── Hook d'accès au contexte ──────────────────────────────
export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin doit être utilisé dans <AdminProvider>");
  return ctx;
}
