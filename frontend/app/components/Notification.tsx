import React from "react";

export default function Notification() {
  return (
    <div className="bg-brand p-4 w-full mx-auto">
      <p className="text-white text-lg mb-4">Joseph has Requested your Hammer!</p>
      <div className="flex">
        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md mr-4">
          Decline
        </button>
        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md">
          Accept
        </button>
      </div>
    </div>
  );
}
