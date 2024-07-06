import React from 'react';
import ProblemCard from './ProblemCard';
const problems = [
  {
    id: 1,
    title: "Indexes of Subarray Sum",
    difficulty: "Medium",
    tags: ["Arrays", "sliding-window","prefix-sum"],
    solveUrl: "https://leetcode.com/problems/indexes-of-subarray-sum/",
    noOfPeopleSolved : "5K"
  },
  {
    id: 2,
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Arrays", "two-pointer"],
    solveUrl: "https://leetcode.com/problems/two-sum/",
    noOfPeopleSolved : "10K"
  },
  // {
  //   id: 3,
  //   title: "Reverse Linked List",
  //   difficulty: "Hard",
  //   tags: ["Amazon", "Palantir"],
  //   solveUrl: "https://leetcode.com/problems/reverse-linked-list/",
  // },
  // ...
];


const ProblemList = () => {
  return (
    <div className="flex flex-col justify-center mb-4 font-mono">
       <h2 className="text-2xl font-bold mb-4 flex justify-center items-center pt-[2rem]">Practice Problems</h2>
      {problems.map((problem) => (
        <ProblemCard className="cursor-pointer"
          key={problem.id}
          title={problem.title}
          difficulty={problem.difficulty}
          tags={problem.tags}
          solveUrl={problem.solveUrl}
          noOfPeopleSolved={ problem.noOfPeopleSolved}
        />
      ))}
    </div>
  );
};

export default ProblemList;


