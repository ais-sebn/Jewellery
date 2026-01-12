const User = require("../models/User");

// Register user
exports.register = async (req, res) => {
  try {
    const { user, pass, role } = req.body;

    if (!user || !pass || !role) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const exists = await User.findOne({ user });
    if (exists) {
      return res.status(409).json({ msg: "User already exists" });
    }

    const newUser = await User.create({ user, pass, role });
    res.status(201).json({
      user: newUser.user,
      role: newUser.role,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { user, pass } = req.body;

    const found = await User.findOne({ user, pass });
    if (!found) {
      return res.status(401).json({ msg: "Invalid login" });
    }

    res.json({
      user: found.user,
      role: found.role,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-pass"); // exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-pass");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Update user (PUT)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, pass } = req.body;

    // Build update object only with allowed fields
    const update = {};
    if (user !== undefined) update.user = String(user).trim();
    if (pass !== undefined) update.pass = String(pass);

    // Basic validation
    if (update.user === "") {
      return res.status(400).json({ msg: "Username cannot be empty" });
    }

    // Prevent duplicates if username is changing
    if (update.user) {
      const exists = await User.findOne({ user: update.user, _id: { $ne: id } });
      if (exists) return res.status(409).json({ msg: "Username already exists" });
    }

    const updated = await User.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).select("-pass");

    if (!updated) return res.status(404).json({ msg: "User not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user (DELETE)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await User.findByIdAndDelete(id).select("-pass");
    if (!deleted) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: "User deleted", id: deleted._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
