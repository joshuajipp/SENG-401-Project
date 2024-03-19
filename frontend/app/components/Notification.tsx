import React, { useState, useEffect } from "react";
import { Avatar, Dropdown, DropdownItem } from "flowbite-react";

interface BorrowerDetails {
  location: string;
  rating: number | null;
  bio: string | null;
  userID: string;
  email: string;
  name: string;
  ratingCount: number;
}
interface NotificationProps {
  itemName: string;
  borrowerID: string;
  startDate: string;
  endDate: string;
  timestamp: number;
}

export default function Notification({
  itemName,
  borrowerID,
  startDate,
  endDate,
  timestamp,
}: NotificationProps) {
  const [borrowerDetails, setBorrowerDetails] = useState<BorrowerDetails>();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch(
        "https://v5ezikbdjg4hadx5mqmundbaxq0zjdnj.lambda-url.ca-central-1.on.aws/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            userID: borrowerID,
          },
        }
      );
      const userData = await response.json();
      setBorrowerDetails(userData);
    };

    fetchUserDetails();
  }, [borrowerID]);

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const timeDifference = currentTimestamp - timestamp;

  let formattedTimeAgo;
  if (timeDifference < 60) {
    formattedTimeAgo = `${timeDifference} seconds ago`;
  } else if (timeDifference < 3600) {
    formattedTimeAgo = `${Math.floor(timeDifference / 60)} minutes ago`;
  } else if (timeDifference < 86400) {
    formattedTimeAgo = `${Math.floor(timeDifference / 3600)} hours ago`;
  } else {
    formattedTimeAgo = `${Math.floor(timeDifference / 86400)} days ago`;
  }

  const startDateObj = new Date(Number(startDate) * 1000);
  const endDateObj = new Date(Number(endDate) * 1000);
  const formattedStartDate = startDateObj.toISOString().split("T")[0];
  const formattedEndDate = endDateObj.toISOString().split("T")[0];

  return (
    <div className="flex bg-brand p-4 border border-gray-700 w-full mx-auto relative">
      <div className="flex p-2">
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
      <div className="flex-col flex-grow pl-4 pr-4">
        {borrowerDetails && (
          <p className="text-white text-lg mb-4 pr-4">
            {borrowerDetails.name} has Requested your {itemName}!
          </p>
        )}
        <p className="text-sm">
          {formattedStartDate} - {formattedEndDate}
        </p>
        <div className="flex pt-2">
          <button className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md mr-2">
            Decline
          </button>
          <button className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md">
            Accept
          </button>
        </div>
      </div>
      {borrowerDetails && (
        <div className="top-0 right-0 text-gray-300 text-sm pl-10 pt-1">
          {borrowerDetails.location} | {formattedTimeAgo}
        </div>
      )}
    </div>
  );
}
