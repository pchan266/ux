import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { checkAuth, logout } from "../lib/adminApi";
import "../styles/admin.css";

// The check here only decides whether to show the app or bounce to login. The
// real boundary is requireAdmin on each /api/admin/* handler.
export default function AdminLayout() {
  const [status, setStatus] = useState("checking");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let active = true;

    checkAuth()
      .then((data) => {
        if (!active) return;
        setStatus(data.authenticated ? "authenticated" : "anonymous");
      })
      .catch(() => {
        if (active) setStatus("anonymous");
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (status === "anonymous") {
      navigate("/admin/login", {
        replace: true,
        state: { from: location.pathname },
      });
    }
  }, [status, navigate, location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/admin/login", { replace: true });
    }
  };

  if (status !== "authenticated") {
    return (
      <div className="admin-shell">
        <div className="admin-loading">
          {status === "checking" ? "Checking session…" : "Redirecting to sign in…"}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <h1>
          <Link to="/admin" style={{ color: "inherit", textDecoration: "none" }}>
            Events Admin
          </Link>
        </h1>
        <div className="admin-header-actions">
          <Link to="/events" className="admin-btn admin-btn--secondary admin-btn--small">
            View site
          </Link>
          <button
            type="button"
            className="admin-btn admin-btn--secondary admin-btn--small"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </header>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
