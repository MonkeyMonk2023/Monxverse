import React from 'react'
import Sidebar from './Sidebar';
import { UserAuth } from '../../context/authContext';
import { Navigate } from 'react-router-dom';

const RootLayout = ({children}) => {
    const {user} = UserAuth();
    if(user){
      return (
        <div className="flex ">
          <Sidebar/>
          <main className="h-screen flex-1 mx-auto overflow-y-scroll ">{children}</main>
        </div>
      );
    }
   
    else{
        return <Navigate to='/login' />
    }
}

export default RootLayout