import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuCode2 } from "react-icons/lu";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(()=>{
    const handleScroll = () =>{
      if(window.scrollY > 50)
      {
        setScroll(true);
      } else {
        setScroll(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return ()=>{
      window.removeEventListener('scroll', handleScroll)
    }

  },[])




  return (
    <nav className={`p-4 sticky top-0 px-3 transition-all duration-300 ${scroll ? 'bg-slate-600' : 'bg-gray-800'} ${scroll ? "bg-opacity-90 shadow-lg" : "bg-opacity-100"} font-mono`}> 
      <div className="flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="ml-[1.8rem] flex items-center">
          <Link to="/" className={`flex items-center ${scroll ? 'text-blue-300' : 'text-white'}`}>
            <LuCode2 className="text-white text-3xl mr-2" />
            <h1 className={`font-bold font-mono text-2xl ${scroll ? 'text-zinc-100' : 'text-white'}`}>CodeJudge</h1>
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
            <button className="bg-transparent border border-white hover:bg-[#1d232a] text-white font-bold font-mono py-2 px-4 rounded">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
