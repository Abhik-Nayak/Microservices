const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  picture: { type: String },
  password: { type: String },
  googleId: { type: String },
  role: {
    type: String,
    enum: ["buyer", "seller", "admin"],
    default: "buyer", // Or choose based on form
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
