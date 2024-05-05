import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import { UserAuth } from '../../context/authContext';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  doc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase/Firebase";

const RootLayout = ({children}) => {
  const navigate = useNavigate();
  const { user } = UserAuth();
  const currentUser = user;

  const [completeUserData , setCompleteUserData] = useState();

  useEffect(() => {
    const fetchCompleteUserDetails = async () => {
      const userDocRef = doc(db, "users", currentUser?.uid);
      try {
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const user = userDocSnap.data();
          setCompleteUserData(user);
          console.log("User data:", user);
        } else {
          console.log("User document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
        alert('error in fetching details');
        
      }
    };
    // fetchCompleteUserDetails();
  }, []);

    if(user){
      if(completeUserData?.isProfileComplete){
        console.log(completeUserData,"comp")
        return navigate("/completeProfile");
      }
      else{
      return (
        <div className="flex ">
          <Sidebar/>
          <main className="h-screen flex-1 mx-auto overflow-y-scroll ">{children}</main>
        </div>
      );
    }
    }
   
    else{
        return <Navigate to='/login' />
    }
}

export default RootLayout