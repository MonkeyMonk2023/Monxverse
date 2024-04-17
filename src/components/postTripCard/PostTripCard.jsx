import {useState,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMessage, faPlane } from "@fortawesome/free-solid-svg-icons";
import { MdDateRange } from "react-icons/md";
import { db } from "../../firebase/Firebase";
import {
  doc,
  getDoc,
  // addDoc,
  collection,
} from "firebase/firestore";

const PostTripCard = ({ trip }) => {
  const [username, setUsername] = useState(""); 

  useEffect(() => {
    if (trip && trip.userId) {
      const fetchUsername = async () => {
        try {
          console.log(trip.userId);
          const userDoc = await getDoc(doc(collection(db, "users"), trip.userId));
          console.log("userDoc",userDoc.data())
          if (userDoc.exists()) {
            console.log(userDoc.data().username)
            setUsername(userDoc.data().username);
          } else {
            console.log("User document not found");
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
        }
      };
      fetchUsername();
    }
  }, [trip]);



  const calculateTimeDifference = () => {
    if (!trip) return null; // Return null if trip is not provided

    const currentTime = new Date();
    const timestamp = new Date(trip?.timestamp?.seconds * 1000); // Convert Firestore Timestamp to JavaScript Date object
    const timeDifference = currentTime - timestamp;
    console.log("timeDifference", timeDifference);

    if (timeDifference < 3600000) {
      // Less than 1 hour
      const minutes = Math.round(timeDifference / 60000);
      return `${minutes} minutes ago`;
    } else if (timeDifference < 86400000) {
      const hours = Math.round(timeDifference / 3600000);
      return `${hours} hours ago`;
    } else {
      // More than 1 day
      const days = Math.round(timeDifference / 86400000);
      return `${days} days ago`;
    }
  };

  return (
    <>
      <div className="flex flex-col bg-white rounded-xl p-4 shadow-2xl border-t-8 border-primary-400 sm:min-w-[200px] w-full gap-4 min-h-[300px] my-4 relative">
        <div className="flex flex-row ">
          <div className="w-10 h-10 rounded-full bg-primary-200 "></div>
          <div className="flex flex-row justify-between w-full items-center">
            <h2 className="font-extrabold mx-5 text-xl">{username}</h2>
            <p className="text-gray-500 ">
            <FontAwesomeIcon
            icon={faClock}
            className="text-primary-300 mx-2"
            size="lg"
          />
              5 mins ago</p>
          </div>
        </div>
        <div className="items-center w-full flex">
          <div>
            <h2 className="text-xl font-semibold">{trip.from}</h2>
          </div>
          <div className=" mx-5 w-full h-[1px] relative flex justify-center items-center border-dashed border border-slate-300">
            <FontAwesomeIcon
              icon={faPlane}
              className="text-primary-400"
              size="2xl"
            />
            <div className="absolute"></div>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{trip.to}</h2>
          </div>
        </div>
        <div>
          <h4 className="flex items-center text-xl font-semibold">
            <MdDateRange className="mr-2 fill-primary-400" />
            {trip.date}
          </h4>
          <h6>Estimated Days: ({trip?.estimatedDays} days)</h6>
        </div>
        <p className="">
          {trip?.tripDescription}
        </p>
        <div className="h-[1px] bg-slate-200"></div>
        <div className="flex">
          {
                trip?.tags?.map((tag)=>(<div key={trip.id} className="pill bg-gray-300 rounded-full text-xs px-4 py-1 mr-2 text-black font-bold">
                {tag}
              </div>))
              }
        </div>
        <div className="bg-primary-400 shadow-slate-500  shadow-lg w-[50px] h-[50px] flex justify-center items-center rounded-full absolute z-10 cursor-pointer bottom-3 right-3">
          <FontAwesomeIcon
            icon={faMessage}
            className="text-white"
            size="xl"
          />
        </div>

      </div>
    </>
  );
};

export default PostTripCard;
