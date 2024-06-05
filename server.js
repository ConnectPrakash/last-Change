// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

// Body parser middleware
app.use(bodyParser.json());
app.use(cors());
// MongoDB connection
mongoose.connect('mongodb+srv://pp3662504:Prakash%4012@cluster0.kztmo7u.mongodb.net/url_shortener', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/auth', authRoutes);
app.use('/url', urlRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
