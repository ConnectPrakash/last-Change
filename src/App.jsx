// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from '../components/Login';
import ShortenURL from '../components/ShortenURL';
import Registration from '../components/Registration';

function App() {
  return (
    <Router>
      <div>
    <Routes>
    <Route path="/" element={<Registration/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/shorten" element={<ShortenURL/>} />
      
     
    </Routes>
         
      </div>
    </Router>
  );
}

export default App;
