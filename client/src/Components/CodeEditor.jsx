import React from 'react';

const CodeEditor = ({ problemId, onSolve }) => {
  const handleSubmit = () => {
    // Mock submission logic
    onSolve();
  };

  return (
    <div className="mt-4">
      <textarea className="w-full h-64 border rounded p-2" placeholder="Write your code here..."></textarea>
      <button onClick={handleSubmit} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </div>
  );
};

export default CodeEditor;
