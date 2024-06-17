import React from 'react';
import { useParams } from 'react-router-dom';
import ProblemDetails from '../Components/ProblemDetails';

const ProblemPage = ({ problems }) => {
  const { code } = useParams();
  const problem = problems.find(p => p.code === code);

  if (!problem) {return <div>Problem not found</div>};

  return <ProblemDetails problem={problem} />;
};

export default ProblemPage;
