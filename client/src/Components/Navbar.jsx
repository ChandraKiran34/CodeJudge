import React from "react";
import { Link } from "react-router-dom";
import { LuCode2 } from "react-icons/lu";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center text-white">
            <LuCode2 className="text-white text-3xl mr-2" />
            <h1 className="font-bold text-white text-2xl">Code Judge</h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center mt-4 md:mt-0">
          <Link to="/" className="mr-4 text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/problems" className="mr-4 text-white hover:text-gray-300">
            Problems
          </Link>
          <Link to="/bookmarks" className="mr-4 text-white hover:text-gray-300">
            Bookmarks
          </Link>
          <Link to="/profile" className="mr-4 text-white hover:text-gray-300">
            Profile
          </Link>
          <Link to="/register" className="mr-4 text-white hover:text-gray-300">
            Register
          </Link>
        </div>

        {/* Login Button */}
        <div className="flex items-center">
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
