import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  const styles = {
    nav: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 28px",
      background:
        "linear-gradient(180deg, rgba(15,23,42,0.95), rgba(2,6,23,0.92))",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      backdropFilter: "blur(10px)",
    },
    brand: {
      fontSize: "20px",
      fontWeight: 700,
      letterSpacing: "-0.4px",
      color: "#f8fafc",
    },
    links: {
      listStyle: "none",
      display: "flex",
      alignItems: "center",
      gap: "18px",
      margin: 0,
      padding: 0,
    },
    link: (active) => ({
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: 600,
      padding: "8px 12px",
      borderRadius: "10px",
      color: active ? "#ffffff" : "#cbd5e1",
      background: active
        ? "linear-gradient(135deg, rgba(236,72,153,0.9), rgba(59,130,246,0.9))"
        : "transparent",
      boxShadow: active
        ? "0 8px 22px rgba(59,130,246,0.25)"
        : "none",
      transition: "all 0.2s ease",
    }),
    button: {
      fontSize: "14px",
      fontWeight: 600,
      padding: "8px 14px",
      borderRadius: "10px",
      border: "1px solid rgba(255,255,255,0.14)",
      background: "rgba(255,255,255,0.06)",
      color: "#e5e7eb",
      cursor: "pointer",
    },
  };

  const NavLink = ({ to, label }) => (
    <Link to={to} style={styles.link(pathname === to)}>
      {label}
    </Link>
  );

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>Elegant Jewellery</div>

      <ul style={styles.links}>
        {user ? (
          <>
            <li><NavLink to="/dashboard" label="Dashboard" /></li>
            <li><NavLink to="/products" label="Products" /></li>
            <li><NavLink to="/cart" label="Cart" /></li>
            {/* <li><NavLink to="/admin" label="Admin" /></li> */}
            <li>
              <button style={styles.button} onClick={logout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><NavLink to="/" label="Login" /></li>
            <li><NavLink to="/register" label="Register" /></li>
          </>
        )}
      </ul>
    </nav>
  );
}
