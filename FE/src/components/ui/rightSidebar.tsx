import React from 'react';

const RightSidebar: React.FC = () => {
  return (
    <div className="bg-white p-4 space-y-4 rounded-lg">
      <h3 className="text-gray-800 font-bold">Contacts</h3>

      <div className="flex items-center space-x-4">
        <img
          src="/friend.jpg"
          alt="Friend"
          className="h-10 w-10 rounded-full"
        />
        <div>
          <h4 className="text-gray-900">Jane Doe</h4>
          <span className="text-green-500 text-sm">Online</span>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;