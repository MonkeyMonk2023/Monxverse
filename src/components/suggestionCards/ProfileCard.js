import React, { useRef, useLayoutEffect } from "react";

import "./ProfileCard.css";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";

const ProfileCard = () => {
  const textRef = useRef(null);

  const sentences = [
    "To Travel is to Live !",
    "Travel is the Best education. You learn about Culture, History and yourself.",
    "Travel allows you to escape ordinary and embrace the extraordinary.",
    "Travel Opens your Heart, Broadens your mind, and fills your life with stories to tell.",
    "Travel is the only thing which you can spend that makes you richer.!"
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
        <div className="max-w-xs">
          <div className="bg-white shadow-xl rounded-lg py-3 px-2">
            <div className="photo-wrapper p-2">
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"
                alt="John Doe"
              />
            </div>
            <div className="p-2">
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                Joh Doe
              </h3>
              <div className="text-center text-gray-400 text-xs font-semibold">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
              <table className="text-xs my-3 w-full">
                <tbody>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold w-1/2">Phone</td>
                    <td className="px-2 py-2 w-1/2">+977 9955221114</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold w-1/2">Email</td>
                    <td className="px-2 py-2 w-1/2">john@exmaple.com</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold w-1/2">D.O.B</td>
                    <td className="px-2 py-2 w-1/2">13/08/2001</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex space-x-4 justify-center items-center">
              <div className="button facebook">
                <a href={""}><i className="fab fa-facebook-f fa-lg"></i></a>
              </div>
              <div className="button instagram">
              <a href={""}><i className="fab fa-instagram fa-lg"></i></a>
              </div>
              <div className="button twitter">
              <a href={""}><i className="fab fa-twitter fa-lg"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div className="bg w-1/2 h-screen flex justify-center items-center px-4 text-center">
        <h3
                      className="text-xl md:text-4xl font-bold text-white"
                      ref={textRef}
                    ></h3>
</div>
</>
  );
};

export default ProfileCard;
