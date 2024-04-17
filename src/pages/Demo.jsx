import React from "react";
import { useState, useEffect, useContext } from "react";
import MessageCard from "../components/messageCard/MessageCard";
import { FaCircleInfo } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import RecentUser from "../components/recentUser/RecentUser";
import Search from "../components/recentUser/Search";
import { UserAuth } from "../context/authContext";
import { ChatContext } from "../context/chatContext";
import {
  doc,
  onSnapshot,
  arrayUnion,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase/Firebase";

import {} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Demo = () => {
  const [showRecentUsers, setShowRecentUsers] = useState(true);
  const [selectedChat, setSelectedChat] = useState(true);
  const [showChatList, setShowChatList] = useState(true);

  const handleChatSelect = (chatId) => {
    const screenWidth = window.innerWidth;
    setSelectedChat(chatId);
    if (screenWidth <= 768) {
      setShowChatList(false);
    }
  };

  const handleBack = () => {
    setShowChatList(true);
  };
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [msgs, setMsgs] = useState([]);

  const [chats, setChats] = useState({});

  const { user } = UserAuth();
  const currentUser = user;
  const { dispatch, data } = useContext(ChatContext);
  console.log("cheking data chatid", data.chatId);
  // console.log("chatpage data",data.chatId)

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && console.log(doc.data().messages);
      doc.exists() && setMsgs(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(msgs);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        console.log(doc.data());
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    console.log("handle select");
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setShowChatList(false);
    }
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      console.log("update1");
      console.log(uuid(), text, currentUser.uid, Timestamp.now(), data?.chatId);
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      console.log("update2");
    }

    console.log("update3", currentUser.uid);
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    console.log("update5", data);
    await updateDoc(doc(db, "userChats", data.User.userId), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    console.log("update done");
    setText("");
    setImg(null);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        {showChatList && (
          <div className="w-full lg:w-1/4 md:2/4 bg-gray-200 overflow-y-auto">
            <div className="bg-gray-800 text-white p-4 h-20">
              <h1 className="text-xl text-white font-bold">Recent Chats</h1>
            </div>
            <div>
              <Search />
            </div>
            <div className="p-0  ">
              <div className="chats">
                {Object.entries(chats)
                  ?.sort((a, b) => b[1].date - a[1].date)
                  .map((chat) => (
                    <div
                      className="userChat my-2"
                      key={chat[0]}
                      onClick={() => handleSelect(chat[1].userInfo)}
                    >
                      <RecentUser
                        name={chat[1].userInfo.username}
                        msg={chat[1].lastMessage?.text}
                      />
                      {/* <img src={chat[1].userInfo.photoURL} alt="" />
                      <div className="userChatInfo">
                        <span>{chat[1].userInfo.username}</span>
                        <p>{chat[1].lastMessage?.text}</p>
                      </div> */}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        <div
          className={`w-full lg:w-3/4 md:2/4 min-h-screen  ${
            showChatList ? "md:block hidden" : "block"
          }`}
        >
          {selectedChat && (
            <>
              <div className="user-full-chat h-full flex flex-col text-color-text-primary ">
                <div className="w-full h-20 p-4 bg-white flex justify-between items-center ">
                  <div className="flex items-center ">
                    <div>
                      <button
                        className="block md:hidden  text-white p-1 mr-2"
                        onClick={handleBack}
                      >
                        <FaArrowLeft className="text-black"/>
                      </button>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-100 mr-4"></div>
                    <div>
                      <span className="text-xs sm:text-sm lg:text-lg xl:text-xl whitespace-pre">
                        {data.User.username}
                      </span>

                    </div>
                  </div>

                  <div>
                    <FaCircleInfo />
                  </div>
                </div>
                <div className="h-full overflow-y-scroll  px-5 flex flex-col ">
                  {msgs.map((m) => (
                    <div
                      key={m.id}
                      className={
                        m.senderId === currentUser.uid
                          ? `w-full flex justify-end bg-[#]`
                          : `w-full flex  `
                      }
                    >
                      <MessageCard message={m} key={m.id} />
                    </div>
                  ))}
                </div>
                <div className="w-full h-[100px] bg-white flex justify-between items-center px-4 py-2">
                  <div className="text-3xl text-color-primary">
                    <MdEmojiEmotions />
                  </div>
                  <div className="w-full mx-4">
                    <input
                      type="text"
                      className="w-[100%] px-2 py-3 bg-color-secondary-bg rounded-lg text-lg"
                      placeholder="Type here..."
                      onChange={(e) => setText(e.target.value)}
                      value={text}
                    />
                  </div>
                  <div className="w-[50px] h-[40px] bg-color-primary flex justify-center items-center text-2xl rounded-lg">
                    <button onClick={handleSend}>
                      <IoMdSend />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Demo;
