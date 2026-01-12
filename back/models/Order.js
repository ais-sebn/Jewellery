const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema(
  {
    // your cart stores { name, price }
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    // optional improvement: link to Product
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: false },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    date: { type: String, required: true }, // your frontend uses toLocaleString()
    items: { type: [OrderItemSchema], required: true },
    total: { type: Number, required: true, min: 0 },

    // recommended: link order to the logged-in user
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    username: { type: String, required: false }, // optional if you don't use JWT yet
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
