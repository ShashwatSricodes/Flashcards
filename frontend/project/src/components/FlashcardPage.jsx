import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useParams } from 'react-router-dom';  
import FlashcardCard from './FlashcardCard';

function FlashcardPage() {
  const { title } = useParams();  
  const [flashcard, setFlashcard] = useState(null);

  useEffect(() => {
    const fetchFlashcard = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/flashcards/${title}`);
        setFlashcard(response.data);
      } catch (error) {
        console.error('Error fetching flashcard:', error);
        alert('Failed to load flashcard');
      }
    };
    fetchFlashcard();
  }, [title]);  

  if (!flashcard) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <FlashcardCard title={flashcard.title} content={flashcard.content} />
    </div>
  );
}

export default FlashcardPage;
