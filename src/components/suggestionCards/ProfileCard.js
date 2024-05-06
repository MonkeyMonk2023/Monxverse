import React, { useEffect, useState } from "react";

import "./ProfileCard.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

const ProfileCard = ({ user, id }) => {
  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => {
    const fetchCompleteUserDetails = async () => {
      console.log(user.userId);
      try {
        const userDocRef = doc(db, "users", id);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setOtherUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
      }
    };
    fetchCompleteUserDetails();
  }, [user]);
  return (
    <>
      {otherUser && (
        <div className="max-w-xs absolute z-40 top-16 ">
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
                {otherUser.username}
              </h3>
              <div className="text-center text-gray-400 text-xs font-semibold">
                <p>{otherUser.bio}</p>
              </div>
              <table className="text-xs my-3 w-full">
                <tbody>
                  {otherUser.showPhoneNumber && (
                    <tr>
                      <td className="px-2 py-2 text-gray-500 font-semibold w-1/2">
                        Phone
                      </td>
                      <td className="px-2 py-2 w-1/2">
                        {otherUser.phoneNumber}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold w-1/2">
                      Email
                    </td>
                    <td className="px-2 py-2 w-1/2">{otherUser.email}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold w-1/2">
                      D.O.B
                    </td>
                    <td className="px-2 py-2 w-1/2">13/08/2001</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex space-x-4 justify-center items-center">
              {otherUser.facebookProfile && (
                <div className="button facebook">
                  <a href={otherUser?.facebookProfile}>
                    <i className="fab fa-facebook-f fa-lg"></i>
                  </a>
                </div>
              )}
              {otherUser.instagramProfile && (
                <div className="button instagram">
                  <a href={otherUser?.instagramProfile}>
                    <i className="fab fa-instagram fa-lg"></i>
                  </a>
                </div>
              )}
              {otherUser.twitterProfile && (
                <div className="button twitter">
                  <a href={otherUser?.twitterProfile}>
                    <i className="fab fa-twitter fa-lg"></i>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard;
