import React from "react";
import { Link } from "react-router-dom";

const ProblemCard = ({ id, title, difficulty, tags, noOfPeopleSolved, to }) => {
  return (
    <div className="ml-[13rem] mt-[1.5rem] mr-[7rem] bg-transparent shadow-md rounded px-4 py-6 flex justify-between border border-[#455A64] cursor-pointer items-center">
      <div>
        <div className="text-lg font-bold text-white">{title}</div>
        <div className="flex flex-row gap-2 mb-4 mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="border border-blue-500 px-2 py-1 rounded text-sm hover:border-blue-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <Link
          to={to} // Use the id prop in the Link component
          className="border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white font-light py-2 px-4 rounded"
        >
          Solve Problem
        </Link>
        <div className="text-white flex justify-between p-2">
          <p> {difficulty} </p>
          <p>|</p>
          <p>{noOfPeopleSolved}</p>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
