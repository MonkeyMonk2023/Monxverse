import React from "react";

const About = () => {
  return (
    <>
      <section className="py-4 dark:bg-gray-800 dark:text-white bg-gray-100 about">
        <div className="">
          <div className="py-8 lg:py-8 px-4 mx-auto max-w-screen-md">
            <h2 className="text-4xl tracking-tight font-extrabold text-center">
              About Us
            </h2>
          </div>
          <div className="px-4 sm:px-6 lg:px-8 mb-8 lg:w-5/6 mx-auto about">
            <div className="">
              <h2 className="text-2xl sm:text-3xl xl:text-5xl text-center tracking-wider font-extrabold">
                Welcome to <span className="text-primary-400">MonkeyMonk</span>,
                where travel becomes{" "}
                <span className="text-primary-400">extraordinary.</span>
              </h2>
            </div>
            <p className="text-center mt-2 xl:my-6 text-base text-gray-500 xl:text-lg ">
              We're more than a travel website we're a vibrant community
              committed to crafting remarkable journeys. Using innovative tech
              like the metaverse, we ensure phenomenal travel experiences and
              prioritize spiritual exploration. MonkeyMonk is your trusted
              companion every step of the way.
            </p>
          </div>
        </div>
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center">Our Vision</h2>
          <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 text-center">
            <div className="rounded-2xl p-3 bg-white shadow-md border-gray-200 dark:bg-gray-600 dark:border-gray-400 min-h-64 ">
              <div className="w-full flex justify-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-200 text-primary-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-5">
                <h3 className="text-lg text-primary-400 font-extrabold">
                  Mission
                </h3>
                <p className="mt-2 text-base dark:text-white">
                  We promote cultural and religious understanding through
                  travel, fostering empathy and respect for diverse traditions
                  worldwide.
                </p>
              </div>
            </div>
            <div className="rounded-2xl p-3 bg-white shadow-md border-gray-200 dark:bg-gray-600 dark:border-gray-400 min-h-64">
              <div className="w-full flex justify-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-200 text-primary-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-lg font-extrabold text-primary-400">
                  Values
                </h3>
                <p className="mt-2 text-base dark:text-white">
                  We value inclusivity, diversity, and creating a welcoming
                  environment where everyone feels respected and valued.
                </p>
              </div>
            </div>
            <div className="rounded-2xl p-3 bg-white shadow-md border-gray-200 dark:bg-gray-600 dark:border-gray-400 min-h-64">
              <div className="w-full flex justify-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-200 text-primary-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-extrabold text-primary-400">
                  Vision
                </h3>
                <p className="mt-2 text-base dark:text-white">
                  We aim to leverage the metaverse for innovative travel
                  experiences, breaking barriers and uniting adventurers
                  globally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
