// models/URL.js
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  userId: mongoose.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;
