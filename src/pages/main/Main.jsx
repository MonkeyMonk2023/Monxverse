import React from "react";

import TopNavbar from "../../components/topNavbar/TopNavbar";
import SideNavbar from "../../components/sidebar/Sidebar";
import Footer from "../../components/footer/Footer";

import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div id="app-layout" className="overflow-x-hidden flex">
      <SideNavbar page="dashboard" />
      <div
        id="app-layout-content"
        className="min-h-screen w-full min-w-[100vw] md:min-w-0 ml-[15.625rem] transition:margin_0.25s_ease-out"
      >
        <TopNavbar />
        <div className="bg-indigo-600 px-8 pt-10 lg:pt-14 pb-16 flex justify-between items-center mb-3">
          <h1 className="text-xl text-white">Project</h1>
          <Link
            to=""
            className="btn bg-white text-gray-800 border-gray-600 hover:bg-gray-100 hover:text-gray-800 hover:border-gray-200 active:bg-gray-100 active:text-gray-800 active:border-gray-200 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            Create New Project
          </Link>
        </div>
        {/* Add your project content here */}
        <Footer />
      </div>
    </div>
  );
};

export default Main;
