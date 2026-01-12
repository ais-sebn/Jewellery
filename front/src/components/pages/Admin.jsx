import { useEffect, useState } from "react";
import axios from "axios";
const API_BASE = import.meta.env.REACT_API_URL;

// const API_BASE = "http://localhost:3000/api";
const SERVER_BASE = "http://localhost:3000"; // serves /uploads

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // 🔧 customer edit state
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");

  const [loading, setLoading] = useState(false);

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
    subtitle: {
      fontSize: "14px",
      color: "#cbd5e1",
    },
    layout: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "0.95fr 1.05fr",
      gap: "18px",
      alignItems: "start",
    },
    card: {
      borderRadius: "18px",
      padding: "18px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.10)",
      boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
      backdropFilter: "blur(10px)",
    },
    cardTitleRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      marginBottom: "12px",
    },
    cardTitle: {
      margin: 0,
      fontSize: "16px",
      fontWeight: 900,
      color: "#f8fafc",
      letterSpacing: "-0.2px",
    },
    pill: {
      fontSize: "12px",
      padding: "6px 10px",
      borderRadius: "999px",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      color: "#cbd5e1",
      width: "fit-content",
      whiteSpace: "nowrap",
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
      boxSizing: "border-box",
    },
    inputSmall: {
      width: "100%",
      padding: "10px 10px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(2,6,23,0.45)",
      color: "#e5e7eb",
      outline: "none",
      fontSize: "13px",
      boxSizing: "border-box",
    },
    fileInput: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(2,6,23,0.45)",
      color: "#cbd5e1",
      outline: "none",
      fontSize: "14px",
      boxSizing: "border-box",
      cursor: "pointer",
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
    smallNote: {
      marginTop: "10px",
      fontSize: "12px",
      color: "#94a3b8",
      lineHeight: 1.5,
    },
    list: {
      display: "grid",
      gap: "12px",
    },
    productRow: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
      padding: "12px",
      borderRadius: "16px",
      background: "rgba(2,6,23,0.45)",
      border: "1px solid rgba(255,255,255,0.10)",
    },
    thumb: {
      width: "56px",
      height: "56px",
      borderRadius: "14px",
      objectFit: "cover",
      background: "rgba(255,255,255,0.08)",
      flex: "0 0 auto",
    },
    productInfo: {
      flex: 1,
      minWidth: 0,
    },
    productName: {
      margin: 0,
      fontSize: "14px",
      fontWeight: 900,
      color: "#f8fafc",
      lineHeight: 1.3,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    productMeta: {
      marginTop: "6px",
      fontSize: "13px",
      color: "#cbd5e1",
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    },
    dangerBtn: (disabled) => ({
      padding: "10px 12px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.12)",
      background: disabled ? "rgba(255,255,255,0.10)" : "rgba(239,68,68,0.14)",
      color: "#fecaca",
      fontWeight: 900,
      cursor: disabled ? "not-allowed" : "pointer",
      whiteSpace: "nowrap",
    }),
    neutralBtn: (disabled) => ({
      padding: "10px 12px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.12)",
      background: disabled ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)",
      color: "#e5e7eb",
      fontWeight: 900,
      cursor: disabled ? "not-allowed" : "pointer",
      whiteSpace: "nowrap",
    }),
    rightCol: {
      display: "grid",
      gap: "18px",
      alignItems: "start",
    },
    orderCard: {
      borderRadius: "16px",
      padding: "14px",
      background: "rgba(2,6,23,0.45)",
      border: "1px solid rgba(255,255,255,0.10)",
    },
    orderTitle: {
      margin: 0,
      fontSize: "14px",
      fontWeight: 900,
      color: "#f8fafc",
    },
    orderLine: {
      marginTop: "6px",
      fontSize: "13px",
      color: "#cbd5e1",
      lineHeight: 1.6,
    },
    orderList: {
      margin: "10px 0 0",
      paddingLeft: "18px",
      color: "#cbd5e1",
      fontSize: "13px",
      lineHeight: 1.6,
    },
    userRow: {
      display: "grid",
      gap: "10px",
      padding: "12px",
      borderRadius: "16px",
      background: "rgba(2,6,23,0.45)",
      border: "1px solid rgba(255,255,255,0.10)",
    },
    userTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "12px",
    },
    userLeft: {
      minWidth: 0,
      display: "grid",
      gap: "6px",
    },
    userName: {
      margin: 0,
      fontSize: "14px",
      fontWeight: 900,
      color: "#f8fafc",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      maxWidth: "320px",
    },
    userSub: {
      fontSize: "13px",
      color: "#cbd5e1",
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      alignItems: "center",
    },
    rolePill: {
      fontSize: "12px",
      padding: "6px 10px",
      borderRadius: "999px",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      color: "#cbd5e1",
      whiteSpace: "nowrap",
    },
    userActions: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      justifyContent: "flex-end",
    },
    editGrid: {
      display: "grid",
      gap: "10px",
    },
    empty: {
      color: "#94a3b8",
      fontSize: "14px",
      padding: "10px 0 0",
    },
  };

  // ✅ simple axios GETs
  const loadProducts = async () => {
    const res = await axios.get(`${API_BASE}/api/products`);
    setProducts(res.data || []);
  };

  const loadOrders = async () => {
    const res = await axios.get(`${API_BASE}/api/orders`);
    setOrders(res.data || []);
  };

  const loadUsers = async () => {
    const res = await axios.get(`${API_BASE}/api/auth/users`);
    setUsers(res.data || []);
  };

  const loadAll = async () => {
    setLoading(true);
    try {
      await loadProducts();
      await loadOrders();
      await loadUsers();
    } catch (err) {
      alert(err?.response?.data?.msg || err.message || "Admin load failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  // ✅ product upload
  const addProduct = async () => {
    if (!name.trim() || !price || !imageFile) return alert("Name, price and image are required");
    if (loading) return;

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", name.trim());
      fd.append("price", String(price));
      fd.append("image", imageFile);

      await axios.post(`${API_BASE}/api/products`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setName("");
      setPrice("");
      setImageFile(null);

      await loadProducts();
      alert("Product added");
    } catch (err) {
      alert(err?.response?.data?.msg || err.message || "Add product failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (loading) return;

    setLoading(true);
    try {
      await axios.delete(`${API_BASE}/api/products/${id}`);
      await loadProducts();
    } catch (err) {
      alert(err?.response?.data?.msg || err.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ user PUT + DELETE
  const startEditUser = (u) => {
    setEditingUserId(u._id);
    setEditUsername(u.user || "");
    setEditPassword("");
  };

  const cancelEditUser = () => {
    setEditingUserId(null);
    setEditUsername("");
    setEditPassword("");
  };

  const updateUser = async (id) => {
    if (!editUsername.trim()) return alert("Username required");
    if (loading) return;

    setLoading(true);
    try {
      const payload = { user: editUsername.trim() };
      if (editPassword) payload.pass = editPassword;

      await axios.put(`${API_BASE}/api/auth/users/${id}`, payload);
      await loadUsers();

      cancelEditUser();
      alert("User updated");
    } catch (err) {
      alert(err?.response?.data?.msg || err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (loading) return;
    const ok = window.confirm("Delete this user? This cannot be undone.");
    if (!ok) return;

    setLoading(true);
    try {
      await axios.delete(`${API_BASE}/api/auth/users/${id}`);
      await loadUsers();
      alert("User deleted");
    } catch (err) {
      alert(err?.response?.data?.msg || err.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const imgSrc = (p) => {
    const path = p?.imageUrl || p?.image;
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${SERVER_BASE}${path}`;
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>Admin Panel</h2>
        <div style={styles.subtitle}>Manage products, customers and order history</div>
      </div>

      <div style={styles.layout}>
        {/* LEFT */}
        <div style={{ display: "grid", gap: "18px" }}>
          {/* Add Product */}
          <section style={styles.card}>
            <div style={styles.cardTitleRow}>
              <h3 style={styles.cardTitle}>Add New Product</h3>
              <span style={styles.pill}>Uploads enabled</span>
            </div>

            <div>
              <div style={styles.label}>Product name</div>
              <input
                style={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Gold Ring Classic"
              />
            </div>

            <div>
              <div style={styles.label}>Price (£)</div>
              <input
                style={styles.input}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 12000"
                type="number"
              />
            </div>

            <div>
              <div style={styles.label}>Product Image (Upload)</div>
              <input
                style={styles.fileInput}
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              <div style={styles.smallNote}>Max 2MB. Allowed: jpg, png, webp.</div>
            </div>

            <button style={styles.btn(loading)} onClick={addProduct} disabled={loading}>
              {loading ? "Saving..." : "Add Product"}
            </button>
          </section>

          {/* Product Management */}
          <section style={styles.card}>
            <div style={styles.cardTitleRow}>
              <h3 style={styles.cardTitle}>Product Management</h3>
              <span style={styles.pill}>{products.length} product(s)</span>
            </div>

            {products.length === 0 ? (
              <div style={styles.empty}>No products available.</div>
            ) : (
              <div style={styles.list}>
                {products.map((p) => (
                  <div style={styles.productRow} key={p._id}>
                    <img src={imgSrc(p)} alt={p.name} style={styles.thumb} />
                    <div style={styles.productInfo}>
                      <p style={styles.productName}>{p.name}</p>
                      <div style={styles.productMeta}>
                        <span>£{Number(p.price || 0)}</span>
                        <span style={styles.pill}>ID: {String(p._id).slice(-6)}</span>
                      </div>
                    </div>
                    <button
                      style={styles.dangerBtn(loading)}
                      onClick={() => deleteProduct(p._id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* RIGHT */}
        <div style={styles.rightCol}>
          {/* Orders */}
          <section style={styles.card}>
            <div style={styles.cardTitleRow}>
              <h3 style={styles.cardTitle}>Order History</h3>
              <span style={styles.pill}>{orders.length} order(s)</span>
            </div>

            {orders.length === 0 ? (
              <div style={styles.empty}>No orders placed yet.</div>
            ) : (
              <div style={{ display: "grid", gap: "12px" }}>
                {orders.map((order) => (
                  <div style={styles.orderCard} key={order._id}>
                    <p style={styles.orderTitle}>Order</p>
                    <div style={styles.orderLine}>
                      <strong>Date:</strong> {order.date}
                    </div>
                    <div style={styles.orderLine}>
                      <strong>Total:</strong> £{Number(order.total || 0)}
                    </div>

                    <ul style={styles.orderList}>
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} – £{Number(item.price || 0)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Customers */}
          <section style={styles.card}>
            <div style={styles.cardTitleRow}>
              <h3 style={styles.cardTitle}>Customers</h3>
              <span style={styles.pill}>{users.length} user(s)</span>
            </div>

            {users.length === 0 ? (
              <div style={styles.empty}>No customers found.</div>
            ) : (
              <div style={{ display: "grid", gap: "12px" }}>
                {users.map((u) => {
                  const isEditing = editingUserId === u._id;

                  return (
                    <div style={styles.userRow} key={u._id}>
                      <div style={styles.userTop}>
                        <div style={styles.userLeft}>
                          <p style={styles.userName}>{u.user}</p>
                          <div style={styles.userSub}>
                            <span style={styles.rolePill}>Role: {u.role || "user"}</span>
                            {u.createdAt && (
                              <span style={styles.pill}>
                                Joined: {new Date(u.createdAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>

                        <span style={styles.pill}>ID: {String(u._id).slice(-6)}</span>
                      </div>

                      {isEditing ? (
                        <div style={styles.editGrid}>
                          <input
                            style={styles.inputSmall}
                            value={editUsername}
                            onChange={(e) => setEditUsername(e.target.value)}
                            placeholder="Update username"
                          />
                          <input
                            style={styles.inputSmall}
                            value={editPassword}
                            onChange={(e) => setEditPassword(e.target.value)}
                            placeholder="New password (optional)"
                            type="password"
                          />

                          <div style={styles.userActions}>
                            <button
                              style={styles.neutralBtn(loading)}
                              onClick={cancelEditUser}
                              disabled={loading}
                            >
                              Cancel
                            </button>
                            <button
                              style={styles.btn(loading)}
                              onClick={() => updateUser(u._id)}
                              disabled={loading}
                            >
                              {loading ? "Saving..." : "Save Changes"}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={styles.userActions}>
                          <button
                            style={styles.neutralBtn(loading)}
                            onClick={() => startEditUser(u)}
                            disabled={loading}
                          >
                            Edit
                          </button>
                          <button
                            style={styles.dangerBtn(loading)}
                            onClick={() => deleteUser(u._id)}
                            disabled={loading}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
