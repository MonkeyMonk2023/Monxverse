import React, { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const textRef = useRef(null);
  const sentences = [
    "2-day family-friendly trip to Hyderabad",
    "5-day adventure and outdoor activities in the Himalayas",
    "3-day educational explorations in ancient Rome",
    "5-day family-friendly beach vacation in Thailand",
    "4-day relaxing spa retreat in Bali",
    "3-day religious heritage tour in Jerusalem",
    "4-day adventure and outdoor activities in the Swiss Alps",
    "5-day educational explorations in historic Kyoto",
    "5-day family-friendly safari adventure in South Africa",
    "5-day relaxing beach getaway in the Maldives",
    "5-day religious pilgrimage to Varanasi, India",
    "5-day adventure and outdoor activities in the Amazon Rainforest",
    "4-day educational explorations in the Smithsonian museums of Washington D.C.",
    "5-day family-friendly theme park vacation in Orlando, Florida",
    "5-day relaxing yoga retreat in the foothills of the Himalayas",
    "3-day religious heritage tour of the Vatican City",
    "5-day adventure and outdoor activities in the Rocky Mountains",
    "4-day educational explorations in the British Museum, London",
    "3-day family-friendly camping trip in Yosemite National Park",
    "5-day relaxing beach holiday in Fiji",
    "5-day religious pilgrimage to Mecca, Saudi Arabia",
  ];
  let currentSentenceIndex = 0;
  let currentLetterIndex = 0;
  let intervalId;

  useLayoutEffect(() => {
    gsap.registerPlugin(TextPlugin);

    const animateText = () => {
      intervalId = setInterval(() => {
        const currentSentence = sentences[currentSentenceIndex];
        const currentText = currentSentence.slice(0, currentLetterIndex);
        gsap.to(textRef.current, {
          duration: 0.05,
          text: currentText,
          ease: "power1.in",
        });

        currentLetterIndex++;

        if (currentLetterIndex > currentSentence.length) {
          clearInterval(intervalId);
          currentLetterIndex = 0;
          currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
          setTimeout(animateText, 2000); // Delay before starting the next sentence
        }
      }, 70);
    };

    animateText();

    return () => clearInterval(intervalId); // Cleanup
  }, []);
  return (
    <>
      <div className="py-8 dark:bg-gray-900 dark:text-gray-100 min-h-screen services">
        <div className="mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center dark:text-white">
            Our Services
          </h2>
        </div>
        <div className="lg:flex lg:flex-row">
          <div className="lg:w-1/2 p-10 flex flex-col gap-8">
            <div>
              <h2 className="text-2xl sm:text-3xl xl:text-5xl tracking-wide font-extrabold leading-snug dark:text-white">
                Connect, Share, Explore Together with{" "}
                <span className="text-primary-400">MonkeyMonk!</span>
              </h2>
            </div>
            <div>
              <p>
                MonkeyMonk is your hub for connecting with like-minded
                travelers, where you can share your adventures, seek advice, and
                join fellow explorers on exciting journeys. From swapping
                stories to planning group trips, let's embark on unforgettable
                adventures together
              </p>
            </div>
            <div className="mb-8 md:mb-0">
              <p
                className="flex items-center text-lg p-5 rounded-2xl border transition duration-300 ease-in-out mb-3 bg-white shadow-md border-gray-200 hover:bg-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 hover:border-transparent"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                <div >
                  <div className="font-bold leading-snug tracking-tight mb-1"
                  >
                    Post, Join, and Let the Adventures Begin!
                  </div>
                  <div className="text-gray-600">
                    Share your travel plans, connect with fellow explorers, and
                    embark on unforgettable journeys together!
                  </div>
                </div>
                <div className="flex justify-center items-center w-8 h-8 rounded-full shadow flex-shrink-0 ml-3 dark:bg-primary-400">
                  <svg
                    className="w-3 h-3 fill-current"
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.854.146a.5.5 0 00-.525-.116l-11 4a.5.5 0 00-.015.934l4.8 1.921 1.921 4.8A.5.5 0 007.5 12h.008a.5.5 0 00.462-.329l4-11a.5.5 0 00-.116-.525z"
                      fillRule="nonzero"
                    />
                  </svg>
                </div>
              </p>
              <p
                className="flex items-center text-lg p-5 rounded-2xl border transition duration-300 ease-in-out mb-3 bg-white shadow-md border-gray-200 hover:bg-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 hover:border-transparent"
                onClick={() => {
                  navigate("/zenora");
                }}
              >
                <div>
                  <div className="font-bold leading-snug tracking-tight mb-1">
                    Try Zenora, Our free AI trip planner
                  </div>
                  <div className="text-gray-600">
                    Unlock your next adventure with our AI-powered trip planner
                    – it's free and tailored just for you!
                  </div>
                </div>
                <div className="flex justify-center items-center w-8 h-8 rounded-full shadow flex-shrink-0 ml-3 dark:bg-primary-400">
                  <svg
                    className="w-3 h-3 fill-current"
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z" />
                  </svg>
                </div>
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 p-10 flex flex-col justify-center">
            <div className="tour-content-block mx-auto">
              <div className="tour-help">
                <div className="tour-help-inner">
                  <div className="tour-help-content">
                    <div className="tour-help-title">Try out Zenora</div>
                    <div className="tour-help-title">
                      Your Personalized Trip Advisor
                    </div>
                    <div className="tour-help-text">
                      Zenora aims to simplify the trip planning process by
                      offering curated recommendations based on individual
                      preferences, making travel planning a breeze
                    </div>
                  </div>
                  <div className="absolute -bottom-10 right-0 w-3/4 min-h-[25%]  rounded-2xl shadow-2xl text-center content-center glass">
                    <h3
                      className="text-xl md:text-2xl font-bold dark:text-white text-primary-400"
                      ref={textRef}
                    ></h3>
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

export default Services;
