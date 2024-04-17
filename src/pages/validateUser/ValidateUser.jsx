import React from 'react';
import { UserAuth } from '../../context/authContext';
import Login from '../login/Login';
import Sidebar from '../../components/sidebar/Sidebar';

const ValidateUser = ({children}) => {

  const {user} = UserAuth();
  if(user){
    return (
      <div className="flex gap-5">
        <Sidebar/>
        <main className="h-screen flex-1 mx-auto py-4 ">{children}</main>
      </div>
    );
  }
 
  else{
    return (
      <Login />
    )
  }
}
  
export default ValidateUser;


  //   const {user} = UserAuth();
  //   if(!user)
  //     return <Navigate to='/login' />
  //   return children;