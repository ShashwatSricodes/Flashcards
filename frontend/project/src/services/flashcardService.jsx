import axios from 'axios';

export const handleGenerateFlashcard = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/flashcards/generate', { leetcodeLink });
    const flashcard = response.data;
    navigate(`/flashcard/${flashcard.title}`);  // Updated navigation method
  } catch (error) {
    console.error('Error generating flashcard:', error);
    alert('Failed to generate flashcard');
  }
};

export const fetchFlashcard = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/flashcards/${title}`);
      setFlashcard(response.data);
    } catch (error) {
      console.error('Error fetching flashcard:', error);
      alert('Failed to load flashcard');
    }
  };
