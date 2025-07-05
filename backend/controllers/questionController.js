import Question from '../models/Question.js';
import { runLlama } from '../ai/llamaHandler.js';

export const handleQuestion = async (req, res) => {
  const { questionText } = req.body;

  try {
    const aiResponse = await runLlama(questionText);

    const saved = await Question.create({
      question: questionText,
      answer: aiResponse,
    });

    res.json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
