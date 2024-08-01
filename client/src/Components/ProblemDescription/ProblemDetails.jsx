import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const ProblemDetails = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);

  const submissions = [
    { status: "Solved", time: "10:00 AM" },
    { status: "Time Limit Exceeded", time: "10:05 AM" },
    { status: "Wrong Answer", time: "10:10 AM" },
  ];

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/getProblem/${id}`
        );
        const data = await response.json();
        if (!problem) {
          toast.success(data.message);
        }
        setProblem(data.problem);
        // Set default code based on selected language

        // setCode(getDefaultCode(data.problem, language)); [language in dependency array]
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    };

    fetchProblem();
  }, [id]);

  return (
    <div className="bg-dark-layer-1 overflow-y-auto">
      {/* TAB */}
      <Tabs>
        <TabList className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
          <Tab className="bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-[14px] cursor-pointer">
            Description
          </Tab>
          <Tab className="bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-[14px] cursor-pointer">
            Submissions
          </Tab>
        </TabList>

        {/* h-[calc(100vh-94px)] */}
        <TabPanel className="flex px-0 py-4">
          <div className="px-5">
            {/* Problem heading */}
            <div className="w-full">
              <div className="flex space-x-4">
                <div className="flex-1 mr-2 text-lg text-white font-medium">
                  {problem?.statement}
                </div>
              </div>
              <div className="flex items-center mt-3">
                <div className="text-olive bg-olive inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize">
                  {problem?.difficulty}
                </div>
                <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
                  <BsCheck2Circle />
                </div>
                <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6">
                  <AiFillLike />
                  <span className="text-xs">120</span>
                </div>
                <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6">
                  <AiFillDislike />
                  <span className="text-xs">2</span>
                </div>
                <div className="cursor-pointer hover:bg-dark-fill-3 rounded p-[3px] ml-4 text-xl transition-colors duration-200 text-dark-gray-6">
                  <BiBookmark />
                </div>
              </div>

              {/* Problem Statement(paragraphs) */}
              <div className="text-white text-sm">
                <p className="mt-3">{problem?.problemDescription}</p>
                <p className="mt-3">

                  You may assume that each input would have{" "}
                  <strong>exactly one solution</strong>, and you may not use the
                  same element twice.
                </p>
                <p className="mt-3 mb-1">You can return the answer in any order.</p>
                <p>First take input of number of elements in array and then take input of the array and then output the length of longest increasing subsequence as a single integer.</p>
              </div>

              {/* Examples */}
              <div className="mt-4">
                {/* Example 1 */}
                {problem?.examples?.map((example, index) => (
                  <div key={index}>
                    <p className="font-medium text-white ">
                      Example {index + 1}
                    </p>
                    <div className="example-card">
                      <pre>
                        <strong className="text-white">Input: </strong>{" "}
                       { example.input}
                        <br />
                        <strong>Output:</strong> {example.output} <br />
                        {/* <strong>Explanation:</strong> Because nums[0] + nums[1] ==
                        9, we return [0, 1]. */}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div className="my-5">
                <div className="text-white text-sm font-medium">
                  Constraints:
                </div>
                <ul className="text-white ml-5 list-disc">
                  <li className="mt-2">
                    <code>2 ≤ nums.length ≤ 10</code>
                  </li>
                  <li className="mt-2">
                    <code>-10 ≤ nums[i] ≤ 10</code>
                  </li>
                  <li className="mt-2">
                    <code>-10 ≤ target ≤ 10</code>
                  </li>
                  <li className="mt-2 text-sm">
                    <strong>Only one valid answer exists.</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel className="flex px-0 py-4 overflow-y-auto">
          <div className="px-5">
            {/* Submissions */}
            <div className="w-full">
              <h2 className="text-xl font-semibold text-white mb-4">
                Submissions
              </h2>
              <div className="flex flex-col px-5 w-full">
                {submissions.map((submission, index) => (
                  <div key={index} className="m-2">
                    <p>
                      <strong>Status:</strong> {submission.status}
                      {console.log("chandra")}
                      {/* {console.log(submission)} */}
                    </p>
                    <p>
                      <strong>Time:</strong> {submission.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ProblemDetails;
