import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { getAnswerFromQuestion } from '../controllers/questionController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const result = await getAnswerFromQuestion(req);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
