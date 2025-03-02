import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
});

// Use default export
const Flashcard = mongoose.model('Flashcard', flashcardSchema);

export default Flashcard;
