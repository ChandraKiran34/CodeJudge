import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import Timer from './Timer';
import Notes from './Notes';
import BookmarkButton from './BookmarkButton';

const ProblemDetails = ({ problem }) => {
  const [solved, setSolved] = useState(false);

  const handleSolve = () => {
    setSolved(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{problem.name}</h1>
      <p className="text-gray-700 mb-4">{problem.statement}</p>
      <div className="flex items-center mb-4">
        <BookmarkButton problemId={problem._id} />
        {solved && <span className="ml-4 text-green-500">Solved</span>}
      </div>
      <Timer />
      <CodeEditor problemId={problem._id} onSolve={handleSolve} />
      <Notes problemId={problem._id} />
    </div>
  );
};

export default ProblemDetails;
