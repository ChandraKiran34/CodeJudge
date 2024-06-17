import React from 'react';
import ProblemList from '../Components/ProblemList';

const BookmarkedPage = ({ user, problems }) => {
  const bookmarkedProblems = problems.filter(problem =>
    user.bookmarked_problems.includes(problem._id)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bookmarked Problems</h1>
      <ProblemList problems={bookmarkedProblems} />
    </div>
  );
};

export default BookmarkedPage;
