import QuestionForm from './components/QuestionForm';
import AnswerDisplay from './components/AnswerDisplay';
import { useState } from 'react';

function App() {
  const [answer, setAnswer] = useState('');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Helper </h1>
      <QuestionForm setAnswer={setAnswer} />
      <AnswerDisplay answer={answer} />
    </div>
  );
}

export default App;
