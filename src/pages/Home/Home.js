import React, { useRef, useLayoutEffect } from "react";

import "./Home.css";
import home from "../../assets/home.jpg";
import defaultUser from "../../assets/defaultuser.jpg";

import { faBus, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    gsap.registerPlugin(TextPlugin);
    gsap.to(".typewriter", {
      text: "We've got tips, hacks, and plenty of inspiration to help you make the most of your travels.",
      duration: 8,
      ease: "power1.in",
    });
  });
  return (
    <>
      <div className="min-h-screen dark:bg-gray-900">
        <div className="w-80 h-80 bg-primary-400 absolute top-0 left-0 z-0 blur-3xl opacity-30 overflow-hidden rounded-full pointer-events-none"></div>
        <div className="w-80 h-80 bg-primary-400 absolute bottom-0 right-0 z-0 blur-3xl opacity-30 overflow-hidden rounded-full pointer-events-none"></div>
        <div className="lg:flex lg:flex-row">
          <div className="lg:w-1/2 p-10 xl:p-16 flex flex-col">
            <div className="ml-auto mr-10">
              <FontAwesomeIcon icon={faBus} color="#Fcb814" size="2xl" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-4 dark:text-white">
              Travel the <span className="text-primary-400">world</span> and
              forge unforgettable{" "}
              <span className="text-primary-400">memories</span> with
              like-minded <span className="text-primary-400">companions</span>.
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 typewriter h-20"></p>
            <div className="flex flex-row">
              <button
                type="button"
                className="text-white bg-primary-400 hover:bg-gray-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-primary-400 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-600 xl:text-xl"
                onClick={()=>navigate("/login")}
              >
                Explore Now
                <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
              </button>
              <button
                type="button"
                className="text-white bg-blue-400 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-400 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-600 xl:text-xl"
                onClick={()=>navigate("/zenora")}
              >
                Try our AI
                <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 flex flex-col items-center p-10 justify-center">
            <div className="wrapper antialiased text-gray-900">
              <div>
                <div className="absolute px-2 -mt-9 mx-2">
                  <div className="bg-gray-100 dark:bg-gray-200 p-4 rounded-lg shadow-lg flex gap-4">
                    <div className="items-baseline">
                      <div id="box" className=""></div>
                    </div>
                    <div className="flex justify-center items-center">
                      <h3 className="text-xl uppercase leading-tight font-extrabold">
                        <span className="highlight-container">
                          <span className="highlight">#EXPLORE</span>
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
                <img
                  src={home}
                  alt=" random imgee"
                  className="w-full object-cover object-center rounded-lg shadow-md"
                />
                <div className="absolute px-4 -mt-12 right-0">
                  <div className="h-24 rounded-xl w-60 bg-gray-100">
                    <div className="flex flex-row items-center justify-center h-full space-x-3">
                      <div className="w-12 h-12 bg-gray-300 rounded-full object-cover">
                        <img
                          src={defaultUser}
                          style={{ width: "100%", height: "100%" }}
                          className="rounded-full"
                        />
                      </div>

                      <div className="flex flex-col space-y-3">
                        <h4 className="text-sm font-bold text-gray-800">
                          Going to Hyderabad!!!
                        </h4>
                        <div className="p-1 highlight-container text-center">
                          <span className="highlight text-sm font-extrabold">
                            #MonkeyMonk
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
