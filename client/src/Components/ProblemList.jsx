import React from 'react';
import ProblemCard from './ProblemCard';

const ProblemList = ({ problems }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {problems.map(problem => (
        <ProblemCard key={problem._id} problem={problem} />
      ))}
    </div>
  );
};

export default ProblemList;
