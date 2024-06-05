// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  password: String,
  isActive: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
