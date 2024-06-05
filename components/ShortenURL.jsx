// components/ShortenURL.js
import React, { useState } from 'react';
import axios from 'axios';

const ShortenURL = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setLongUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic URL validation
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    if (!urlPattern.test(longUrl)) {
      setLoading(false);
      setError('Please enter a valid URL');
      return;
    }

    try {
      const response = await axios.post('https://last-change-4.onrender.com/url/shorten', { originalUrl: longUrl }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage after login
        }
      });
      console.log(response.data);
      setShortUrl(response.data.shortUrl);
      setLongUrl(''); // Clear input after successful submission
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to shorten URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Shorten URL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={longUrl}
          onChange={handleChange}
          placeholder="Enter long URL"
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Shortening...' : 'Shorten'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {shortUrl && <p>Short URL: {shortUrl}</p>}
    </div>
  );
};

export default ShortenURL;
