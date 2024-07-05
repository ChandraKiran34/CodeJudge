import React from "react";
const newDate = new Date();
const year = newDate.getFullYear();
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter, BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="relative left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between text-white sm:px-20 bg-gray-800">
        <section className="text-lg">
            Copyright {year} | All rights reserved
        </section>

        <section className="flex items-center justify-center gap-5 text-2xl text-white">
            <a href="#" className="hover:text-[#1ca6fb] transition-all ease-in-out">
                <BsFacebook />
            </a>
            <a href="#" className="hover:text-[#0a66c2] transition-all ease-in-out">
                <BsLinkedin />
            </a>
            <a href="#" className="hover:text-[#1ca6fb] transition-all ease-in-out">
                <BsTwitter />
            </a>
            <a href="#" className="hover:text-[#fe5287] transition-all ease-in-out">
                <BsInstagram />
            </a>
            <a href="#" className="hover:text-[#ff0000] transition-all ease-in-out">
                <BsYoutube/>
            </a>
        </section>
      </footer>
    </>
  );
};

export default Footer;
