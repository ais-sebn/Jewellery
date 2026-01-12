const Order = require("../models/Order");

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { date, items, total, username } = req.body;

    if (!date || !items || total === undefined) {
      return res.status(400).json({ msg: "Invalid order data" });
    }

    const order = await Order.create({
      date,
      items,
      total,
      username,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
