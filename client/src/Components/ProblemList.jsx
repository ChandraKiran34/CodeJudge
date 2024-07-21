import React, { useEffect, useState } from "react";
import ProblemCard from "./ProblemCard";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// const problems2 = [
//   {
//     id: 1,
//     title: "Indexes of Subarray Sum",
//     difficulty: "Medium",
//     tags: ["Arrays", "sliding-window", "prefix-sum"],
//     solveUrl: "https://leetcode.com/problems/indexes-of-subarray-sum/",
//     noOfPeopleSolved: "5K",
//   },
//   {
//     id: 2,
//     title: "Two Sum",
//     difficulty: "Easy",
//     tags: ["Arrays", "two-pointer"],
//     solveUrl: "https://leetcode.com/problems/two-sum/",
//     noOfPeopleSolved: "10K",
//   },
// ];

const ProblemList = () => {
  const [problems, setProblems] = useState([]);

  const fetchProblems = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/allProblems");
      const data = await response.json();
      setProblems(data.problems);
    } catch (error) {
      console.log(error.message);
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);
  return (
    <div className="flex flex-col justify-center mb-4 font-mono">
      <h2 className="text-2xl font-bold mb-4 flex justify-center items-center pt-[2rem]">
        Practice Problems
      </h2>
      {problems?.map((problem) => (
          <ProblemCard
            className="cursor-pointer"
            key={problem._id}
            id={problem._id}
            title={problem.statement}
            difficulty={problem.difficulty}
            tags={problem.tags}
            noOfPeopleSolved="5K"
            to={`/problem/${problem._id}`}
          />
      ))}
    </div>
  );
};

export default ProblemList;
