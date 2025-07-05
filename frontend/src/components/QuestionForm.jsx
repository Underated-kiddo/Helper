import { useState } from 'react';
import { sendQuestion } from '../api/questionApi';
import OCRUpload from './OCRUpload';

const QuestionForm = ({ setAnswer }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await sendQuestion(question);
    setAnswer(data.answer);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select className="border p-2 rounded w-full">
        <option>Form 1</option>
        <option>Form 2</option>
        <option>Form 3</option>
        <option>Form 4</option>
      </select>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
        className="border p-2 w-full rounded"
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>

      <OCRUpload setAnswer={setAnswer} />
    </form>
  );
};

export default QuestionForm;
