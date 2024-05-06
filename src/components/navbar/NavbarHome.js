import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 z-20">
      <div className="max-w-screen-xl flex justify-between items-center mx-auto py-4 px-10">
        <p href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={logo}
            className="h-8 w-8 rounded-full bg-transparent"
            alt="MonkeyMonk Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:dark:text-white">
            MonkeyMonk
          </span>
        </p>
        <p
                className="nav-item block py-2 px-3 rounded hover:cursor-pointer dark:text-white bg-primary-400"
                onClick={() => navigate("/")}
              >
                Home
              </p>
      </div>
    </nav>
  );
};

export default Navbar;
