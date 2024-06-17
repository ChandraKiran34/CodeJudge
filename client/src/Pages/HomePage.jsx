import React from 'react';
import ProblemList from '../Components/ProblemList';

const HomePage = ({ problems }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Code Judge</h1>
      
      {/* <ProblemList problems={problems} /> */}
    </div>
  );
};

export default HomePage;
