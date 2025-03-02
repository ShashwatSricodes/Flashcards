import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Flashcard from '../models/Flashcard.js';
import { ExtractTitleFromLink } from './Helper/ExtractTitleFromLink.js';
import { generateOptimizedSolution } from './Helper/Leetcode.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

const router = express.Router();

router.post('/generate', async (req, res) => {
    const { leetcodeLink } = req.body;

    const problemTitle = ExtractTitleFromLink(leetcodeLink);

    if (!problemTitle) {
        return res.status(400).json({ msg: 'Invalid Leetcode link' });
    }

    try {
        let flashcard = await Flashcard.findOne({ title: problemTitle });

        if (flashcard) {
            return res.json(flashcard);
        } else {
            const solution = await generateOptimizedSolution(problemTitle);

            if (!solution) {
                return res.status(500).json({ msg: 'Failed to generate solution' });
            }

            const newFlashcard = new Flashcard({
                title: problemTitle,
                content: solution,
            });

            await newFlashcard.save();

            res.json(newFlashcard);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/:title', async (req, res) => {
    const { title } = req.params;
  
    try {
      const flashcard = await Flashcard.findOne({ title });
  
      if (!flashcard) {
        return res.status(404).json({ msg: 'Flashcard not found' });
      }
  
      res.json(flashcard);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
});

app.use('/api/flashcards', router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
