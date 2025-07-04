import React, { useState } from 'react';
import axios from 'axios';

const gradeMap = {
  'Form 1': '9',
  'Form 2': '10',
  'Form 3': '11',
  'Form 4': '12',
};

const QuestionForm = () => {
  const [gradeLevel, setGradeLevel] = useState('Form 1');
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error , setError] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    if (!gradeLevel || (!question && !image)) {
      setError('Please select grade level and enter a question or upload an image.');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('gradeLevel', gradeMap[gradeLevel]);
      if (question.trim()) formData.append('question', question);
      if (image) formData.append('image', image);

      const res = await axios.post('/api/question', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data);

    } catch (err) {
      setError(err.response?.data?.error || 'Error getting answer.');
    } finally {
      setLoading(false);
    }
  };

  // Disable text if image is selected, and vice versa
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    if (e.target.files[0]) setQuestion('');
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
    if (e.target.value) setImage(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-10 px-2">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">Ask a Question</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Grade Level</label>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="border-2 border-indigo-200 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            >
              <option>Form 1</option>
              <option>Form 2</option>
              <option>Form 3</option>
              <option>Form 4</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Type Question</label>
            <textarea
              value={question}
              onChange={handleQuestionChange}
              className="border-2 border-indigo-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition resize-none"
              rows="3"
              placeholder="Or upload an image"
              disabled={!!image}
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Or Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block mt-1 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-indigo-50 file:text-indigo-700 file:font-semibold hover:file:bg-indigo-100 transition"
              disabled={!!question}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-3 rounded-lg font-bold shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </form>
        {error && <div className="mt-6 text-center text-red-600 bg-red-50 border border-red-200 rounded-lg py-2">{error}</div>}
        {loading && <div className="mt-6 text-center text-indigo-600 animate-pulse">Loading...</div>}
        {result && (
          <div className="mt-8 p-6 border border-indigo-200 rounded-2xl bg-indigo-50 shadow-sm">
            <h3 className="font-bold text-lg text-indigo-800 mb-2">Original Question:</h3>
            <p className="mb-3 text-gray-800">{result.originalQuestion}</p>
            <h3 className="font-bold text-lg text-indigo-800 mb-2">Answer:</h3>
            <div className="mb-3 whitespace-pre-wrap text-gray-700">{result.answer}</div>
            <h3 className="font-bold text-lg text-indigo-800 mb-2">Explanation:</h3>
            <div className="mb-3 whitespace-pre-wrap text-gray-700">{result.explanation}</div>
            <h3 className="font-bold text-lg text-indigo-800 mb-2">Practice Questions:</h3>
            <ol className="list-decimal ml-6 space-y-1 text-gray-700">
              {result.practiceQuestions?.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionForm;