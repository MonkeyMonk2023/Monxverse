   import React from 'react'
   
   const RecentUser = ({name,msg}) => {
     return (
        <div className="flex justify-between mx-4 text-color-text-primary my-4 cursor-pointer hover:bg-[#666563] p-2 rounded-lg">
        <div className="flex">
          <div className="w-[40px] h-[40px] rounded-full bg-white mr-2"></div>
          <div >
            <h2>{name}</h2>
            <p>{msg}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="bg-color-primary w-[26px] h-[26px] rounded-lg flex justify-center items-center ">  5 </div>
          <div>12:30</div>
        </div>
      </div>
     )
   }
   
   export default RecentUser;