import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/authContext';

const EmailVerification = () => {
  const navigate = useNavigate();
  const { user } = UserAuth();
  console.log(user);

  if(user?.emailVerified){
    return navigate("/login")
  }
  
  if(user && !user?.emailVerified){
    return(
      <div className='w-screen h-screen justify-center items-center flex'>
      <div className='p-10 bg-white mx-auto space-y-10 rounded-2xl text-center'>
          <h2 className='text-4xl font-bold'>Confirm Your email address</h2>
          <p>A verification link has been sent to your email address click on the verification link to activate your account</p>
          <p>Please refresh the page after verification</p>
      </div>
      </div>
    )
  }

  return (
    <></>
  );
};

export default EmailVerification;
