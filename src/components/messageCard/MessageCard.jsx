import { useEffect, useRef } from "react";
import { UserAuth } from "../../context/authContext";
// import { ChatContext } from "../../context/chatContext";

// eslint-disable-next-line react/prop-types
const Message = ({ message }) => {
  const { user } = UserAuth();
  const currentUser = user;
  // const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (

    // eslint-disable-next-line react/prop-types
    <div ref={ref} className={message.senderId == currentUser.uid ? `max-w-[75%] bg-[#FCB814] p-2 m-2 rounded-lg text-white`:` bg-[#666563] p-2 m-2 rounded-lg text-white  `}>
       <div className="messageInfo">
        {/* <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        /> */}
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {/* eslint-disable-next-line react/prop-types */}
        {message.img && <img src={message.img} alt="" />}
        <div>
          {/* <span>{message.date}</span> */}
        </div>
      </div>
    </div>
  );
};

export default Message;


