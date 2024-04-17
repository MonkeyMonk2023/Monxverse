import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase/Firebase";
import "react-datepicker/dist/react-datepicker.css";
import {
  // doc,
  // setDoc,
  addDoc,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import PostTripCard from "../../components/postTripCard/PostTripCard";
import PostTripForm from "../../components/postTripForm/PostTripForm";
import './Dashboard.css';

import { IoPaperPlane } from "react-icons/io5";

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [searchSource, setSearchSource] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [searchDate, setSearchDate] = useState(null);

  const filterTrips = () => {
    let filteredTrips = trips.filter((trip) => {
      let sourceMatch = true;
      let destinationMatch = true;
      let dateMatch = true;

      if (searchSource !== "") {
        sourceMatch = trip.from
          .toLowerCase()
          .includes(searchSource.toLowerCase());
      }

      if (searchDestination !== "") {
        destinationMatch = trip.to
          .toLowerCase()
          .includes(searchDestination.toLowerCase());
      }

      if (searchDate !== null) {
        dateMatch =
          new Date(trip.date).toDateString() === searchDate.toDateString();
      }

      return sourceMatch && destinationMatch && dateMatch;
    });

    return filteredTrips;
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "trips"));
        const tripsData = [];
        querySnapshot.forEach((doc) => {
          tripsData.push({ id: doc.id, ...doc.data() });
        });
        setTrips(tripsData);
      } catch (error) {
        console.error("Error fetching trips: ", error);
      }
    };
    fetchTrips();
  }, []);

  // model code
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    console.log("opening modal");
    setShowModal(true);
  }

  function closeModal() {
    console.log("closing Modal");
    setShowModal(false);
  }

  return (
    <>
      <div className="w-full h-full py-2 md:px-0 px-2">
        <div className="mb-24">
        <div className="banner-img h-72 pb-20 py-2 bg-primary-300 flex flex-col justify-between px-4 rounded-xl" >
        <div className="flex justify-end w-full">
          <div className="  ">
            <div
              onClick={openModal}
              className=" bg-white cursor-pointer py-4 px-8 rounded-lg flex items-center  text-lg font-medium"
            >
               Post Trip
             <IoPaperPlane className="ml-2" size={32}/>
            </div>
            {showModal && <PostTripForm closeModal={closeModal} />}
          </div>
        </div>
          <div className=" p-3 md:p-4 bg-white  max-w-[60rem] mx-auto rounded-2xl w-full shadow-2xl shadow-slate-300 flex flex-col sm:flex-row items-center justify-center">
            <div className="w-full sm:py-2 md:mx-2 ">
              <div className="relative my-2">
                <input
                  type="text"
                  id="source"
                  name="source"
                  placeholder="source"
                  onChange={(e) => setSearchSource(e.target.value)}
                  className="flex-grow text-black dark-app:text-white relative w-full cursor-pointer rounded-xl border bg-white py-4 pl-6 leading-tight dark-app:bg-[#444444] pr-10 border-neutral-300 dark-app:border-transparent text-left transition-all focus:outline-none focus:transition-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-200"
                />
              </div>
            </div>
            <div className="w-full sm:py-2 md:mx-2">
              <div className="relative my-2">
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  placeholder="destination"
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="flex-grow text-black dark-app:text-white relative w-full cursor-pointer rounded-xl border bg-white py-4 pl-6 leading-tight dark-app:bg-[#444444] pr-10 border-neutral-300 dark-app:border-transparent text-left transition-all focus:outline-none focus:transition-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-200"
                />
              </div>
            </div>
            {/* <div className="w-full sm:py-2 mx-2">
              <div className="relative my-2">
                <input
                  type="date"
                  id="date"
                  name="date"
                  placeholder="date"
                  onChange={(date) => setSearchDate(date)}
                  className="flex-grow text-black dark-app:text-white relative w-full cursor-pointer rounded-xl border bg-white py-4 pl-6 leading-tight dark-app:bg-[#444444] pr-10 border-neutral-300 dark-app:border-transparent text-left transition-all focus:outline-none focus:transition-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-200"
                />
              </div>
            </div> */}
            <div>
              <button
                type="submit"
                onClick={() => setTrips(filterTrips())}
                className="bg-primary-400 text-white font-semibold flex justify-center items-center px-3 py-2 md:px-6 md:py-4 rounded-md focus:outline-none"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        </div>
        

        <div className="w-full flex justify-center items-center mt-[2%]">
          <div className="w-full flex flex-col justify-center items-center">
            {trips.map((trip) => (
              <div key={trip.id} className="w-full max-w-[900px]">
                <PostTripCard trip={trip} />
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </>
  );
};

export default Dashboard;
