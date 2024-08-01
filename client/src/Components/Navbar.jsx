import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuCode2 } from "react-icons/lu";
import { FaHome, FaRegUserCircle } from "react-icons/fa";
import Loading from "../Components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Slices/authSlice";
import toast from "react-hot-toast";
// import { FileReader } from 'react';

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const [avatarUrl, setAvatarUrl] = useState("");
  const role = useSelector((state) => state?.auth?.role);
  const userData = useSelector((state) => state?.auth?.data);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  // console.log(userData);

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      const response = await dispatch(logout());
      const data = await response?.payload;
      if (data) {
        Navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // useEffect(() => {
  //   if (typeof window!== 'undefined' && userData?.avatar) {
  //     const filer = new FileReader();
  //     filer.readAsDataURL(userData?.avatar?.secure_url);
  //     filer.onload = (e) => {
  //       setAvatarUrl(e.target.result);
  //     };
  //   }
  // }, [userData]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 50) {
  //       setScroll(true);
  //     } else {
  //       setScroll(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <nav
      className={`p-4 top-0 px-3 transition-all duration-300 ${
        scroll ? "bg-slate-600" : "bg-gray-800"
      } ${scroll ? "bg-opacity-90 shadow-lg" : "bg-opacity-100"} font-mono`}
    >
      <div className="flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="ml-[1.8rem] flex items-center">
          <Link
            to="/"
            className={`flex items-center ${
              scroll ? "text-blue-300" : "text-white"
            }`}
          >
            <LuCode2 className="text-white text-3xl mr-2" />
            <h1
              className={`font-bold font-mono text-2xl ${
                scroll ? "text-zinc-100" : "text-white"
              }`}
            >
              CodeJudge
            </h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center mt-4 mr-[5.5rem] md:mt-0">
          <Link to="/" className="mr-4 text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/problems" className="mr-4 text-white hover:text-gray-300">
            Practice
          </Link>
          {isLoggedIn && (
            <Link
              to="/bookmarks"
              className="mr-4 text-white hover:text-gray-300"
            >
              Bookmarks
            </Link>
          )}
          {isLoggedIn ? (
            <Link to="/profile" className="mr-4 text-white hover:text-gray-300">
              Resources
            </Link>
          ) : (
            <Link
              to="/register"
              className="mr-4 text-white hover:text-gray-300"
            >
              Register
            </Link>
          )}
        </div>

        {/* Login Button */}
        <div className="flex items-center">
          {isLoggedIn ? (
            <Link to="/logout">
              <button onClick={handleLogout}>
                {userData?.avatar ? (
                  <img
                    src={userData?.avatar?.secure_url}
                    alt="image"
                    style={{ width: 30, height: 30, borderRadius: "50%" }}
                  />
                ) : (
                  <FaRegUserCircle size={30} className="" />
                )}
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="bg-transparent border border-white hover:bg-[#1d232a] text-white font-bold font-mono py-2 px-4 rounded">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
