import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AdminProvider, useAdmin } from "./hooks/useAdmin";

// Pages publiques
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import QuiSommesNous from "./pages/QuiSommesNous";
import Assistance from "./pages/Assistance";
import Actualites from "./pages/Actualites";
import ArticlePage from "./pages/Actualites/ArticlePage";
import ServiceDetailPage from "./pages/ServiceDetail";

// Pages admin
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin";
import ArticlesList from "./pages/Admin/articles/ArticlesList.jsx";
import ArticleEditor from "./pages/Admin/articles/ArticleEditor.jsx";
import ServicesList from "./pages/Admin/services/ServicesList.jsx";

// ── Guard : redirige vers /admin/login si pas authentifié ──
function RequireAuth({ children }) {
  const { isAuth } = useAdmin();
  const location = useLocation();
  if (!isAuth)
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  return children;
}

// ── Layout public (avec Navbar + Footer) ──────────────────
function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-texture-sable">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/actualites/:slug" element={<ArticlePage />} />
          <Route path="/assistance" element={<Assistance />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Routes admin (sans Navbar/Footer) ── */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/articles"
            element={
              <RequireAuth>
                <ArticlesList />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/articles/new"
            element={
              <RequireAuth>
                <ArticleEditor />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/articles/:id"
            element={
              <RequireAuth>
                <ArticleEditor />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/services"
            element={
              <RequireAuth>
                <ServicesList />
              </RequireAuth>
            }
          />

          {/* ── Routes publiques ── */}
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}
