import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../../lib/adminApi";
import "../../styles/admin.css";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/admin";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Could not sign in");
      setPassword("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-shell">
      <title>Admin Login - Queen's UX Club</title>
      <div className="admin-login">
        <form className="admin-login-card" onSubmit={handleSubmit}>
          <h1>Events Admin</h1>
          <span className="admin-muted">
            Enter the shared admin password to manage events.
          </span>

          {error && <div className="admin-alert admin-alert--error">{error}</div>}

          <div className="admin-field">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="admin-btn admin-btn--primary"
            disabled={submitting || !password}
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
