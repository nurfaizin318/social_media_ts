import React from 'react';
import {BellIcon, UserIcon, InboxIcon, FaceSmileIcon} from "@heroicons/react/24/solid"

const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-800 text-white p-4 h-16 flex">
      <div className=" justify-between flex w-full h-full  flex-1 ">
        
        {/* Logo */}
        <div className="flex flex-1 items-center ">
        <FaceSmileIcon className="h-11 w-11 cursor-pointer" />
          <span className="text-xl font-bold">MyApp</span>
          <input
            type="text"
            placeholder="Search user..."
            className="w-full mx-5 bg-gray-600 text-white rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>

        {/* Search Bar */}


        {/* Notification, Friend, Inbox Icons */}
        <div className="flex flex-1 space-x-6 justify-center items-center">
          <div className="relative">
            <BellIcon className="h-6 w-6 cursor-pointer" />
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          <UserIcon className="h-6 w-6 cursor-pointer" />
          <InboxIcon className="h-6 w-6 cursor-pointer" />
        </div>

        <div className="flex-1 mx-8">
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;