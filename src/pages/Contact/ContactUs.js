import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactUs = () => {
  const [show, setShow] = useState(false);
  const showToast = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 5000);
  };
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_emailjs_serviceID,
        process.env.REACT_APP_emailjs_templateID,
        e.target,
        process.env.REACT_APP_emailjs_userID
      )
      .then(
        (result) => {
          e.target.reset();
          showToast();
        },
        (error) => {
        }
      );
  };
  return (
    <>
      <section className="bg-white dark:bg-gray-900 contact relative">
        <div className="absolute top-0 left-0 z-10"></div>
        <div className="py-8 lg:py-8 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p className="mb-8 lg:mb-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Got a technical issue? Want to send feedback? have something to
            offer? Let us know.
          </p>
          <form action="#" className="space-y-6" onSubmit={sendEmail}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="block p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="name@email.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Let us know how we can help you"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows="6"
                name="message"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-400 sm:w-fit hover:bg-primary-600 dark:bg-primary-400 dark:hover:bg-primary-700"
            >
              Send message
            </button>
          </form>
          {show && (
          <div className="fixed right-10 bottom-10 px-5 py-4 border-r-8 border-primary-400 bg-white drop-shadow-lg flex justify-center items-center">
            <span className="mr-2 inline-block p-1 rounded-full bg-green-600 text-white font-extrabold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-white fill-current"
                viewBox="0 0 16 16"
                width="20"
                height="20"
              >
                <path
                  fill-rule="evenodd"
                  d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
                ></path>
              </svg>
            </span>
            <p className="text-sm">
              Your feedback has been shared successfully
            </p>
          </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ContactUs;
