import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const API_BASE = import.meta.env.REACT_API_URL;
  const SERVER_BASE = import.meta.env.REACT_API_URL;


  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch(() => alert("Failed to load products"));
  }, []);

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
    header: {
      maxWidth: "1200px",
      margin: "0 auto 18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      fontSize: "28px",
      fontWeight: 900,
      letterSpacing: "-0.5px",
      color: "#f8fafc",
    },
    subtitle: {
      fontSize: "14px",
      color: "#cbd5e1",
    },
    grid: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: "18px",
    },
    card: {
      borderRadius: "18px",
      padding: "16px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.10)",
      boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
      backdropFilter: "blur(10px)",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      transition: "transform 0.15s ease",
    },
    imageWrap: {
      width: "100%",
      height: "160px",
      borderRadius: "14px",
      overflow: "hidden",
      background: "rgba(255,255,255,0.08)",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    name: {
      fontSize: "16px",
      fontWeight: 800,
      color: "#f8fafc",
      lineHeight: 1.3,
    },
    price: {
      fontSize: "15px",
      fontWeight: 700,
      color: "#e2e8f0",
    },
    button: {
      marginTop: "auto",
      padding: "10px 12px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.12)",
      background:
        "linear-gradient(135deg, rgba(236,72,153,0.95), rgba(59,130,246,0.95))",
      color: "#ffffff",
      fontWeight: 800,
      cursor: "pointer",
      boxShadow: "0 12px 28px rgba(59,130,246,0.25)",
    },
    empty: {
      maxWidth: "1200px",
      margin: "40px auto",
      textAlign: "center",
      color: "#94a3b8",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>Our Jewellery Collection</div>
          <div style={styles.subtitle}>
            Premium designs curated for elegance and trust
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div style={styles.empty}>No products available.</div>
      ) : (
        <div style={styles.grid}>
          {products.map((p) => (
            <div
              key={p._id}
              style={styles.card}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-4px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div style={styles.imageWrap}>
                <img
  src={p.image?.startsWith("http") ? p.image : `${SERVER_BASE}${p.image}`}
  alt={p.name}
  style={styles.image}
/>

              </div>

              <div style={styles.name}>{p.name}</div>
              <div style={styles.price}>₹{p.price}</div>

              <button
                style={styles.button}
                onClick={() =>
                  addToCart({ name: p.name, price: p.price })
                }
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
