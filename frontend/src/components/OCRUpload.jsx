import { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import { sendQuestion } from '../api/questionApi';

const OCRUpload = ({ setAnswer }) => {
  const [ocrText, setOcrText] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setProgress(0);
    setOcrText('');

    Tesseract.recognize(
      file,
      'eng',
      {
        logger: m => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        }
      }
    )
    .then(async ({ data: { text } }) => {
      console.log("OCR result:", text);
      setOcrText(text);

      // Automatically send to backend
      const data = await sendQuestion(text);
      setAnswer(data.answer);

      setLoading(false);
    })
    .catch(err => {
      console.error("OCR failed:", err);
      setLoading(false);
    });
  };

  return (
    <div className="my-4 space-y-2">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleButtonClick}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Upload Image for OCR
      </button>

      {loading && (
        <div className="text-blue-600">
          Processing image... {progress}%
        </div>
      )}

      {ocrText && (
        <div className="p-2 border rounded bg-gray-50">
          <h3 className="font-semibold">Extracted Text:</h3>
          <p>{ocrText}</p>
        </div>
      )}
    </div>
  );
};

export default OCRUpload;
