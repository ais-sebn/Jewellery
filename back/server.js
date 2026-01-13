const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Serve uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:3001",
  "https://6965400e10dff034a7efbc16--jewellerydomain.netlify.app/",
  "https://jewellerydomain.netlify.app/",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", require("./Routes/authRoutes"));
app.use("/api/products", require("./Routes/productRoutes"));
app.use("/api/orders", require("./Routes/orderRoutes"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// DB + Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas connected");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
