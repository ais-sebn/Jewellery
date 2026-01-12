import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";


export default function Cart() {
  const { cart, clearCart, removeFromCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.REACT_API_URL;

  const total = cart.reduce((sum, i) => sum + Number(i.price || 0), 0);

  const styles = {
    page: {
      minHeight: "100vh",
      padding: "28px",
      background:
        "radial-gradient(900px 500px at 20% 10%, rgba(236,72,153,0.18), transparent 55%), radial-gradient(900px 500px at 80% 20%, rgba(59,130,246,0.18), transparent 55%), linear-gradient(180deg, #0b0f19, #0f172a 60%, #0b0f19)",
      color: "#e5e7eb",
      fontFamily:
        "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
    },
    container: {
      maxWidth: "1100px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1.2fr 0.8fr",
      gap: "18px",
      alignItems: "start",
    },
    titleRow: {
      maxWidth: "1100px",
      margin: "0 auto 16px",
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: "12px",
    },
    title: {
      margin: 0,
      fontSize: "28px",
      fontWeight: 900,
      letterSpacing: "-0.5px",
      color: "#f8fafc",
    },
    sub: {
      fontSize: "14px",
      color: "#cbd5e1",
    },
    card: {
      borderRadius: "18px",
      padding: "18px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.10)",
      boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
      backdropFilter: "blur(10px)",
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "grid",
      gap: "10px",
    },
    item: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 12px",
      borderRadius: "14px",
      background: "rgba(2,6,23,0.45)",
      border: "1px solid rgba(255,255,255,0.10)",
      gap: "12px",
    },
    itemName: {
      fontSize: "14px",
      fontWeight: 700,
      color: "#f1f5f9",
      marginRight: "10px",
      lineHeight: 1.4,
      flex: 1,
    },
    itemPrice: {
      fontSize: "14px",
      fontWeight: 800,
      color: "#e2e8f0",
      whiteSpace: "nowrap",
    },
    removeBtn: {
      padding: "6px 10px",
      borderRadius: "10px",
      border: "1px solid rgba(239,68,68,0.35)",
      background: "rgba(239,68,68,0.15)",
      color: "#fecaca",
      fontWeight: 800,
      cursor: "pointer",
      fontSize: "12px",
      whiteSpace: "nowrap",
    },
    summaryBox: {
      display: "grid",
      gap: "12px",
    },
    line: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "14px",
      color: "#cbd5e1",
    },
    total: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "6px",
      paddingTop: "12px",
      borderTop: "1px solid rgba(255,255,255,0.10)",
      fontSize: "16px",
      fontWeight: 900,
      color: "#f8fafc",
    },
    pill: {
      fontSize: "12px",
      padding: "6px 10px",
      borderRadius: "999px",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      color: "#cbd5e1",
      width: "fit-content",
    },
    button: (disabled) => ({
      marginTop: "10px",
      width: "100%",
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
    empty: {
      maxWidth: "900px",
      margin: "50px auto 0",
      textAlign: "center",
      color: "#94a3b8",
      fontSize: "14px",
      borderRadius: "18px",
      padding: "22px",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
    },
  };

  const placeOrder = async () => {
  if (!cart.length) return alert("Cart empty");
  if (loading) return;

  const payload = {
    date: new Date().toLocaleString(),
    items: cart.map((i) => ({
      name: i.name,
      price: Number(i.price || 0),
    })),
    total,
    username: user?.user || "guest",
  };

  setLoading(true);
  try {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.msg || "Order failed");
    }

    clearCart();
    alert("Order placed");
  } catch (err) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={styles.page}>
      <div style={styles.titleRow}>
        <h2 style={styles.title}>Your Cart</h2>
        <div style={styles.sub}>Review items and place your order securely</div>
      </div>

      {cart.length === 0 ? (
        <div style={styles.empty}>Your cart is empty.</div>
      ) : (
        <div style={styles.container}>
          {/* Items */}
          <section style={styles.card}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <div style={styles.pill}>{cart.length} item(s)</div>
              <div style={styles.pill}>Stored locally • Checkout via API</div>
            </div>

            <ul style={styles.list}>
              {cart.map((i, idx) => (
                <li key={idx} style={styles.item}>
                  <div style={styles.itemName}>{i.name}</div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={styles.itemPrice}>₹{Number(i.price || 0)}</div>

                    <button
                      style={styles.removeBtn}
                      onClick={() => removeFromCart(idx)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Summary */}
          <aside style={{ ...styles.card, ...styles.summaryBox }}>
            <div style={styles.pill}>Order Summary</div>

            <div style={styles.line}>
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div style={styles.line}>
              <span>User</span>
              <span>{user?.user || "guest"}</span>
            </div>

            <div style={styles.total}>
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              style={styles.button(loading)}
              onClick={placeOrder}
              disabled={loading}
            >
              {loading ? "Placing order..." : "Place Order"}
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
