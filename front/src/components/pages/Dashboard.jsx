export default function Dashboard() {
  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0b0f19 0%, #0f172a 60%, #0b0f19 100%)",
      color: "#e5e7eb",
      fontFamily:
        "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
      padding: "24px",
    },
    container: {
      maxWidth: "1100px",
      margin: "0 auto",
    },
    hero: {
      display: "grid",
      gridTemplateColumns: "1.2fr 0.8fr",
      gap: "24px",
      alignItems: "center",
      padding: "28px",
      borderRadius: "20px",
      background:
        "radial-gradient(1200px 500px at 20% 10%, rgba(236, 72, 153, 0.18), transparent 50%), radial-gradient(900px 400px at 90% 30%, rgba(59, 130, 246, 0.18), transparent 45%), rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
      backdropFilter: "blur(10px)",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 12px",
      borderRadius: "999px",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.10)",
      color: "#cbd5e1",
      fontSize: "13px",
      letterSpacing: "0.2px",
      width: "fit-content",
    },
    dot: {
      width: "8px",
      height: "8px",
      borderRadius: "999px",
      background: "#22c55e",
      boxShadow: "0 0 0 4px rgba(34,197,94,0.18)",
    },
    h1: {
      fontSize: "42px",
      lineHeight: 1.1,
      margin: "14px 0 10px",
      letterSpacing: "-0.6px",
      color: "#f8fafc",
    },
    p: {
      fontSize: "16px",
      lineHeight: 1.7,
      margin: 0,
      color: "#cbd5e1",
      maxWidth: "52ch",
    },
    actionsRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      marginTop: "18px",
    },
    primaryBtn: {
      padding: "12px 16px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.12)",
      background: "linear-gradient(135deg, rgba(236,72,153,0.95), rgba(59,130,246,0.95))",
      color: "white",
      fontWeight: 600,
      cursor: "pointer",
      boxShadow: "0 12px 30px rgba(59,130,246,0.22)",
    },
    secondaryBtn: {
      padding: "12px 16px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(255,255,255,0.06)",
      color: "#e5e7eb",
      fontWeight: 600,
      cursor: "pointer",
    },
    panel: {
      borderRadius: "18px",
      padding: "18px",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
    },
    panelTitle: {
      margin: 0,
      fontSize: "14px",
      color: "#cbd5e1",
      textTransform: "uppercase",
      letterSpacing: "0.16em",
    },
    metric: {
      marginTop: "10px",
      fontSize: "28px",
      fontWeight: 700,
      color: "#f8fafc",
      letterSpacing: "-0.3px",
    },
    metricSub: {
      marginTop: "6px",
      fontSize: "13px",
      color: "#94a3b8",
      lineHeight: 1.6,
    },
    grid: {
      marginTop: "22px",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "14px",
    },
    card: {
      borderRadius: "16px",
      padding: "16px",
      background: "rgba(255,255,255,0.035)",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 10px 24px rgba(0,0,0,0.32)",
    },
    cardH: {
      margin: 0,
      fontSize: "16px",
      fontWeight: 700,
      color: "#f8fafc",
    },
    cardP: {
      marginTop: "8px",
      marginBottom: 0,
      fontSize: "13px",
      lineHeight: 1.7,
      color: "#94a3b8",
    },
    footerNote: {
      marginTop: "18px",
      fontSize: "12px",
      color: "#64748b",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <section style={styles.hero}>
          <div>
            <div style={styles.badge}>
              <span style={styles.dot} />
              Secure access • Role-based features
            </div>

            <h1 style={styles.h1}>Welcome to Elegant Jewellery</h1>
            <p style={styles.p}>
              Discover timeless designs crafted with elegance and trust. Browse collections, manage your cart,
              and place orders securely using our connected platform.
            </p>

            <div style={styles.actionsRow}>
              <button
                style={styles.primaryBtn}
                onClick={() => (window.location.href = "/products")}
              >
                Explore Collection
              </button>
              <button
                style={styles.secondaryBtn}
                onClick={() => (window.location.href = "/cart")}
              >
                View Cart
              </button>
            </div>

            <p style={styles.footerNote}>
              Tip: This demo uses a secure API backend + MongoDB Atlas for remote storage.
            </p>
          </div>

          <div style={styles.panel}>
            <p style={styles.panelTitle}>Today’s snapshot</p>
            <div style={styles.metric}>Premium Collections</div>
            <div style={styles.metricSub}>
              New products and orders update in real time from the remote database. Offline cart storage keeps
              shopping smooth even with unstable connectivity.
            </div>
          </div>
        </section>

        <section style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardH}>Premium Quality</h3>
            <p style={styles.cardP}>
              Carefully curated items with consistent pricing and clean product presentation across devices.
            </p>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardH}>Secure Checkout</h3>
            <p style={styles.cardP}>
              Orders are persisted remotely with server-side validation. Authentication controls user access.
            </p>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardH}>Admin Management</h3>
            <p style={styles.cardP}>
              Admin users can add or delete products and review order history from a restricted area.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
