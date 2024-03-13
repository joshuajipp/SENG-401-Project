import React from "react";
import { Avatar, Dropdown, DropdownItem } from "flowbite-react";
import { AppProps } from 'next/app';

interface NotificationProps {
  itemName: string;
  userName: string; // user name (and picture) fix
  location: string;
  timeStamp: string;
}

export default function Notification({ itemName, userName, location, timeStamp }: NotificationProps) {
  return (
    <div className="flex bg-brand p-4 w-full mx-auto relative">
      <div className="flex">
        <Dropdown
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <DropdownItem>View Profile</DropdownItem>
        </Dropdown>
      </div>
      <div className="flex-col flex-grow ml-4">
        <p className="text-white text-lg mb-4 pr-4">
          {userName} has Requested your {itemName}!
        </p>
        <div className="flex">
          <button className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md mr-2">
            Decline
          </button>
          <button className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md">
            Accept
          </button>
        </div>
      </div>
      <div className="top-0 right-0 text-gray-300 text-sm pl-10 pt-1">
        {location} | {timeStamp} ago
      </div>
    </div>
  );
}
