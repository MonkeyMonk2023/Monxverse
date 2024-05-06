import React, { useState } from 'react'
import Sidebar from './Sidebar';
import { UserAuth } from '../../context/authContext';
import { Navigate, useNavigate } from 'react-router-dom';

const RootLayout = ({children}) => {
  const navigate = useNavigate();
  const { user } = UserAuth();
  const currentUser = user;

  const [completeUserData , setCompleteUserData] = useState();

    if(user){
      if(completeUserData?.isProfileComplete){
        return navigate("/completeProfile");
      }
      else{
      return (
        <div className="flex ">
          <Sidebar/>
          <main className="h-screen flex-1 mx-auto overflow-y-scroll md:pl-2 pl-4">{children}</main>
        </div>
      );
    }
    }
   
    else{
        return <Navigate to='/login' />
    }
}

export default RootLayout