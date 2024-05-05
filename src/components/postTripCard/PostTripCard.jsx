import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMessage, faPlane } from "@fortawesome/free-solid-svg-icons";
import { MdDateRange } from "react-icons/md";
import { db } from "../../firebase/Firebase";
import {
  doc,
  getDoc,
  collection,
  setDoc,
  getDocs,
  Timestamp,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { UserAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const PostTripCard = ({ trip }) => {
  const navigate = useNavigate();
  const { user } = UserAuth();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchCompleteUserDetails = async () => {
      const userDocRef = doc(db, "users", user.uid);
      try {
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setCurrentUser(userData);
        } else {
          console.log("User document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
      }
    };
    fetchCompleteUserDetails();
  }, [user]);

  const [username, setUsername] = useState("");
  const [tripPartner, setTripPartner] = useState("");
  // console.log(trip)

  useEffect(() => {
    if (trip && trip.userId) {
      const fetchUsername = async () => {
        try {
          const userDoc = await getDoc(
            doc(collection(db, "users"), trip.userId)
          );
          if (userDoc.exists()) {
            setUsername(userDoc.data().username);
            setTripPartner(userDoc.data());
            console.log(tripPartner.username);
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

  const handleSelect = async () => {
    const user = tripPartner;
    console.log("hey", tripPartner, currentUser);
    console.log(user.userId, "userID");
    const combinedId =
      currentUser.userId > user.userId
        ? currentUser.userId + user.userId
        : user.userId + currentUser.userId;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log(res.exists());

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.userId), {
          [combinedId + ".userInfo"]: {
            userId: user.userId,
            username: user.username,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log("first");

        await updateDoc(doc(db, "userChats", user.userId), {
          [combinedId + ".userInfo"]: {
            userId: currentUser.userId,
            username: currentUser.username,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log("second");
        navigate("/chat")
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col bg-white rounded-xl p-4 shadow-2xl border-t-8 border-primary-400 sm:min-w-[200px] w-full gap-4 min-h-[300px] my-4 relative">
        <div className="flex flex-row ">
          <div className="w-10 h-10 rounded-full bg-primary-200 ">
            <img
              className="w-full h-full rounded-full"
              src={tripPartner.photoURL}
              alt="profilePhoto"
            />
          </div>
          <div className="flex flex-row justify-between w-full items-center">
            <h2 className="font-extrabold mx-5 text-xl">
              {tripPartner.username}
            </h2>
            {/* <p className="text-gray-500 ">
            <FontAwesomeIcon
            icon={faClock}
            className="text-primary-300 mx-2"
            size="lg"
          />
              5 mins ago</p> */}
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
        <p className="">{trip?.tripDescription}</p>
        <div className="h-[1px] bg-slate-200"></div>
        <div className="flex">
          {trip?.tags?.map((tag) => (
            <div
              key={trip.id}
              className="pill bg-gray-300 rounded-full text-xs px-4 py-1 mr-2 text-black font-bold"
            >
              {tag}
            </div>
          ))}
        </div>
        <div
          onClick={() => handleSelect()}
          className="bg-primary-400 shadow-slate-500  shadow-lg w-[50px] h-[50px] flex justify-center items-center rounded-full absolute z-10 cursor-pointer bottom-3 right-3"
        >
          <FontAwesomeIcon icon={faMessage} className="text-white" size="xl" />
        </div>
      </div>
    </>
  );
};

export default PostTripCard;
