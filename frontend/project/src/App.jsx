import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import FlashcardPage from './components/FlashcardPage';
import './App.css'
function App() {
  return (
   
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flashcard/:title" element={<FlashcardPage />} />
      </Routes>
    </Router>
   
  );
}

export default App;