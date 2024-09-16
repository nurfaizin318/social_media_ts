import React from 'react';
import { HomeIcon, UserIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';

const LeftSidebar: React.FC = () => {
  return (
    <div className="bg-white p-4 space-y-4">
      <div className="flex items-center space-x-4 cursor-pointer">
        <UserIcon className="h-6 w-6 text-gray-500" />
        <span className="text-gray-800 font-medium">Profile</span>
      </div>
      <div className="flex items-center space-x-4 cursor-pointer">
        <HomeIcon className="h-6 w-6 text-gray-500" />
        <span className="text-gray-800 font-medium">Home</span>
      </div>
      <div className="flex items-center space-x-4 cursor-pointer">
        <ShoppingBagIcon className="h-6 w-6 text-gray-500" />
        <span className="text-gray-800 font-medium">Marketplace</span>
      </div>
    </div>
  );
};

export default LeftSidebar;