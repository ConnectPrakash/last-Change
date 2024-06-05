
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const route = require('./route/index');

const app = express();
const PORT =5000;

mongoose.connect("mongodb+srv://pp3662504:Prakash%4012@cluster0.kztmo7u.mongodb.net/auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.use(cors());
app.use(bodyParser.json());

app.use('/api', route);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
