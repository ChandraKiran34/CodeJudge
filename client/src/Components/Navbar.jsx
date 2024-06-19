import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between ">
        <div>
          <h1 className="font-bold text-white mt-[0.6rem]">CODEJUDGE</h1>
        </div>
        <div className="text-white">
          <div className="text-white">
            <Link to="/" className="mr-4">
              Home
            </Link>
            <Link to="/problems" className="mr-4">
              Problems
            </Link>
            <Link to="/bookmarks" className="mr-4">
              Bookmarks
            </Link>
            <Link to="/profile" className="mr-4">
              Profile
            </Link>
            <Link to="/register" className="mr-4">
              Register
            </Link>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
