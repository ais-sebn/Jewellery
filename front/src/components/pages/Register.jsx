import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../api";

export default function Register() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
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
      maxWidth: "460px",
      borderRadius: "20px",
      padding: "26px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.10)",
      boxShadow: "0 22px 65px rgba(0,0,0,0.52)",
      backdropFilter: "blur(12px)",
    },
    topRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      marginBottom: "10px",
    },
    title: {
      margin: 0,
      fontSize: "26px",
      fontWeight: 900,
      letterSpacing: "-0.6px",
      color: "#f8fafc",
    },
    badge: {
      fontSize: "12px",
      padding: "6px 10px",
      borderRadius: "999px",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      color: "#cbd5e1",
      whiteSpace: "nowrap",
    },
    subtitle: {
      margin: "0 0 18px",
      fontSize: "14px",
      lineHeight: 1.6,
      color: "#cbd5e1",
    },
    label: {
      fontSize: "12px",
      color: "#94a3b8",
      fontWeight: 800,
      letterSpacing: "0.10em",
      textTransform: "uppercase",
      margin: "12px 0 6px",
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
    select: {
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
      fontWeight: 900,
      cursor: disabled ? "not-allowed" : "pointer",
      boxShadow: disabled ? "none" : "0 14px 34px rgba(59,130,246,0.22)",
    }),
    footer: {
      marginTop: "14px",
      fontSize: "13px",
      textAlign: "center",
      color: "#94a3b8",
    },
    link: {
      color: "#e2e8f0",
      textDecoration: "none",
      fontWeight: 800,
    },
    warning: {
      marginTop: "12px",
      fontSize: "12px",
      color: "#fca5a5",
      lineHeight: 1.5,
    },
  };

  const submit = async () => {
    if (!user || !pass) return alert("Username and password required");
    if (loading) return;

    setLoading(true);
    try {
      await axios.post(apiUrl("/api/auth/register"), { user, pass, role });
      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.msg || err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.topRow}>
          <h2 style={styles.title}>Create Account</h2>
          <span style={styles.badge}>Secure Register</span>
        </div>

        <p style={styles.subtitle}>
          Register to explore premium collections, add items to your cart, and place orders securely.
        </p>

        <div>
          <div style={styles.label}>Username</div>
          <input
            style={styles.input}
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Choose a username"
            autoComplete="username"
          />
        </div>

        <div>
          <div style={styles.label}>Password</div>
          <input
            style={styles.input}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Create a password"
            type="password"
            autoComplete="new-password"
          />
        </div>

        <div>
          <div style={styles.label}>Role</div>
          <select
            style={styles.select}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
          </select>
        </div>

        <button style={styles.btn(loading)} onClick={submit} disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>

        <div style={styles.footer}>
          Already have an account?{" "}
          <Link to="/" style={styles.link}>
            Login
          </Link>
        </div>

        <div style={styles.warning}>
          Note: In a real system, admin accounts should NOT be selectable during public registration.
        </div>
      </div>
    </div>
  );
}
