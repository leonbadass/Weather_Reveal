// src/App.js
import React from 'react';
import Weatherdata from './Components/Weatherdata'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Weather Reveal</h1>
      <div>
      <Weatherdata />
      </div>
      
    </div>
  );
}

export default App;
