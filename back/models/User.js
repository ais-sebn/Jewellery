const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // matches your frontend: { user, pass, role }
    user: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    pass: {
      type: String,
      required: true,
      minlength: 4,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
