import fs from 'fs';
import visionClient from '../utils/visionClient.js';
import fetch from 'node-fetch'; // if using Node <18. If Node 18+, built-in global fetch.

export async function getAnswerFromQuestion(req) {
  const { gradeLevel } = req.body;
  let questionText = req.body.questionText;

  if (req.file) {
    const [result] = await visionClient.textDetection(req.file.path);
    questionText = result.textAnnotations[0]?.description.trim() || '';
    fs.unlinkSync(req.file.path);
  }

  if (!questionText) throw new Error('No question text provided.');

  const prompt = `
You are a helpful tutor for grade ${gradeLevel}.
Question: ${questionText}
Please give:
1. The direct answer.
2. A step-by-step explanation.
3. Three similar practice questions.
`;

  // Call Ollama local API (LLaMA 3)
  const res = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3',
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await res.json();

  return {
    question: questionText,
    response: data.message.content
  };
}
