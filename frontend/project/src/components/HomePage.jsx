import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const [leetcodeLink, setLeetcodeLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleGenerateFlashcard = async () => {
    setIsGenerating(true);
    try {
      const response = await axios.post('http://localhost:3000/api/flashcards/generate', { leetcodeLink });
      const flashcard = response.data;
      navigate(`/flashcard/${flashcard.title}`);
    } catch (error) {
      console.error('Error generating flashcard:', error);
      alert('Failed to generate flashcard');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="homepagediv">
      <h2>
        {isGenerating ? (
          <>Generating your <span className="highlight">FlashCard ... .. .</span></>
        ) : (
          <>Paste your Leetcode link to generate the <span className="highlight">Flash card</span></>
        )}
      </h2>
      <input
        className="input"
        type="text"
        value={leetcodeLink}
        onChange={(e) => setLeetcodeLink(e.target.value)}
        placeholder="Enter Leetcode problem link"
      />
      <button onClick={handleGenerateFlashcard} className="button">Generate</button>
    </div>
  );
}

export default HomePage;
