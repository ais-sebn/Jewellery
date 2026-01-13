import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { apiUrl } from "../api";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const styles = {
    page: {
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      padding: "24px",
      background:
        "radial-gradient(900px 500px at 15% 15%, rgba(236,72,153,0.18), transparent 55%), radial-gradient(900px 500px at 85% 25%, rgba(59,130,246,0.18), transparent 55%), linear-gradient(180deg, #0b0f19, #0f172a 60%, #0b0f19)",
      color: "#e5e7eb",
      fontFamily:
        "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
    },
    card: {
      width: "100%",
      maxWidth: "420px",
      borderRadius: "20px",
      padding: "26px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.10)",
      boxShadow: "0 20px 60px rgba(0,0,0,0.50)",
      backdropFilter: "blur(12px)",
    },
    brandRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "14px",
    },
    brand: {
      fontSize: "18px",
      fontWeight: 800,
      letterSpacing: "-0.4px",
      color: "#f8fafc",
    },
    badge: {
      fontSize: "12px",
      padding: "6px 10px",
      borderRadius: "999px",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      color: "#cbd5e1",
    },
    title: {
      fontSize: "28px",
      fontWeight: 800,
      letterSpacing: "-0.6px",
      margin: "8px 0 6px",
      color: "#f8fafc",
    },
    subtitle: {
      margin: "0 0 18px",
      fontSize: "14px",
      lineHeight: 1.6,
      color: "#cbd5e1",
    },
    fieldWrap: {
      display: "grid",
      gap: "10px",
      marginTop: "10px",
    },
    label: {
      fontSize: "12px",
      color: "#94a3b8",
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },
    input: {
      width: "100%",
      padding: "12px 12px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(2,6,23,0.45)",
      color: "#e5e7eb",
      outline: "none",
      fontSize: "14px",
    },
    btn: (disabled) => ({
      width: "100%",
      marginTop: "16px",
      padding: "12px 14px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.12)",
      background: disabled
        ? "rgba(255,255,255,0.10)"
        : "linear-gradient(135deg, rgba(236,72,153,0.95), rgba(59,130,246,0.95))",
      color: "#ffffff",
      fontWeight: 800,
      cursor: disabled ? "not-allowed" : "pointer",
      boxShadow: disabled ? "none" : "0 14px 34px rgba(59,130,246,0.22)",
      transition: "transform 0.12s ease",
    }),
    small: {
      marginTop: "14px",
      fontSize: "13px",
      color: "#94a3b8",
      textAlign: "center",
    },
    link: {
      color: "#e2e8f0",
      textDecoration: "none",
      fontWeight: 700,
    },
  };

  const submit = async () => {
    if (!user || !pass) return alert("Username and password required");
    if (loading) return;

    setLoading(true);
    try {
      const res = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, pass }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.msg || "Invalid login");
      }

      login(data);

      if (data.role === "admin") navigate("/admindashboard");
      else navigate("/dashboard");
    } catch (err) {
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brandRow}>
          <div style={styles.brand}>Elegant Jewellery</div>
          <div style={styles.badge}>Secure Access</div>
        </div>

        <h2 style={styles.title}>Welcome back</h2>
        <p style={styles.subtitle}>
          Sign in to browse premium collections, manage your cart, and place orders securely.
        </p>

        <div style={styles.fieldWrap}>
          <div>
            <div style={styles.label}>Username</div>
            <input
              style={styles.input}
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>

          <div>
            <div style={styles.label}>Password</div>
            <input
              style={styles.input}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter your password"
              type="password"
              autoComplete="current-password"
            />
          </div>
        </div>

        <button style={styles.btn(loading)} onClick={submit} disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <div style={styles.small}>
          New user?{" "}
          <Link to="/register" style={styles.link}>
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
