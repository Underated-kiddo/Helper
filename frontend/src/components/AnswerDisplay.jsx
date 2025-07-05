const AnswerDisplay = ({ answer }) => {
  return (
    <div className="mt-6 p-4 border rounded bg-gray-100">
      <h2 className="font-semibold">Helper's Answer:</h2>
      <p>{answer}</p>
    </div>
  );
};

export default AnswerDisplay;
