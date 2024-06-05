
const shortid = require('shortid');
const URL = require('../models/URL');

exports.shorten = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const userId = req.user.userId;

    // Generate short URL
    const shortUrl = shortid.generate();

    // Save URL mapping to database
    const url = new URL({ originalUrl, shortUrl, userId });
    await url.save();

    res.status(201).json({ shortUrl });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
