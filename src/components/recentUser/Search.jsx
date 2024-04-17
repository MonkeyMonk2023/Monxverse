import { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { UserAuth } from "../../context/authContext";
import RecentUser from "./RecentUser";
import { IoSearchCircle } from "react-icons/io5";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");

  const auth = UserAuth();
  const currentUser = auth.user;

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("username", "==", username));
    try {
      console.log("Query:", q);

      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          // console.log("doc", doc.data());
          setUser(doc.data());
        });
      } else {
        // Handle case when no user is found
        setUser(null);
      }
    } catch (err) {
      setErr(err);
    }
  };

  const handleKey = (e) => {
    // console.log(e.target.value);
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    console.log("both", currentUser, user);
    const combinedId =
      currentUser.uid > user.userId
        ? currentUser.uid + user.userId
        : user.userId + currentUser.uid;
    console.log("combid", combinedId);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log(res.exists());

      if (!res.exists()) {
        console.log("hely");
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        console.log(
          currentUser.displayName,
          currentUser.uid,
          currentUser.photoURL
        );

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            userId: user.userId,
            username: user.username,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log("first");
        // console.log(user.userId,user.)

        await updateDoc(doc(db, "userChats", user.userId), {
          [combinedId + ".userInfo"]: {
            userId: currentUser.uid,
            username: currentUser.displayName,
            photoURL: "",
            // photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log("second");
      }
    } catch (err) {
      console.log(err);
    }

    setUser(null);
    setUsername("");
  };
  return (
    <div className="search ">
      <div className="searchForm">
        <div className="relative">
          <input
            type="text"
            placeholder="Find a user"
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="w-full px-2 py-3  rounded-lg text-lg pl-10"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <IoSearchCircle className="" size={30} />
          </div>
        </div>
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div onClick={handleSelect}>
          <RecentUser name={user.username} msg="" />

          {/* <div className="userChat text-6xl" onClick={handleSelect}>
            hello
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.username}</span>
          </div>
        </div> */}
        </div>
      )}
      {!user && <div>no user found</div>}
    </div>
  );
};

export default Search;
