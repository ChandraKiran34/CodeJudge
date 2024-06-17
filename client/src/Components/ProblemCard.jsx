import React from 'react';
import { Link } from 'react-router-dom';
import BookmarkButton from './BookmarkButton';

const ProblemCard = ({ problem }) => {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold">{problem.name}</h2>
      <p className="text-gray-700">{problem.difficulty}</p>
      <div className="flex justify-between items-center mt-4">
        <Link to={`/problem/${problem.code}`} className="text-blue-500 hover:underline">View Details</Link>
        <BookmarkButton problemId={problem._id} />
      </div>
    </div>
  );
};

export default ProblemCard;
