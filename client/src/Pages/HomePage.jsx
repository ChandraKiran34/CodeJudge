import React from "react";
import { Link } from "react-router-dom";
import HomePage2 from '../../assets/HomePage2.png'
const HomePage = () => {
  return (
    <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
      <div className="w-1/2 space-y-6 mb-[8rem] px-2">
        <h1 className="text-5xl font-semibold font-mono leading-[4rem]">
          A place where you can{" "}
          <span className="text-blue-500 font-bold">Code</span> and practice
        </h1>
        <p className="text-xl text-white">
          We have a large variety of coding problems designed by highly skilled
          people
        </p>
        <div className="space-x-6">
          <Link to="/problems">
            <button className="bg-blue-500 px-5 py-3 rounded-md text-lg cursor-pointer hover:bg-blue-600 transition-all ease-in-out duration-300">
              Practice
            </button>
          </Link>
          <Link to="/contact">
            <button className=" border border-blue-500 px-5 py-3 rounded-md text-lg cursor-pointer hover:bg-blue-600 transition-all ease-in-out duration-300">
              Contact Us
            </button>
          </Link>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center mb-[8rem]">
        <img src={HomePage2} alt="home page image" />
      </div>
    </div>
  );
};

export default HomePage;
