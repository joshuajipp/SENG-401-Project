import React, { useState, useEffect } from "react";
import { Avatar, Dropdown, DropdownItem } from "flowbite-react";
import { cancelRequest } from "../actions";
import Image from "next/image";
import Link from "next/link";

interface BorrowerDetails {
  location: string;
  rating: number | null;
  bio: string | null;
  userID: string;
  email: string;
  name: string;
  profilePicture: string;
  ratingCount: number;
}
interface NotificationProps {
  itemName: string;
  itemID: string;
  borrowerID: string;
  startDate: string;
  endDate: string;
  timestamp: number;
  handleRemove: Function;
}

const borrowItem = async (itemID: string, borrowerID: string) => {
  const response = await fetch(
    "https://kjqor37l3b7q6yymuewr7enudy0dvgef.lambda-url.ca-central-1.on.aws/",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemID: itemID,
        borrowerID: borrowerID,
      }),
    }
  );

  if (response.status !== 200) {
    const errorMessage =
      "Failed to borrow item. Status code: " + response.status;
    console.error(errorMessage);
    return errorMessage;
  }
  return response;
};

export default function Notification({
  itemName,
  itemID,
  borrowerID,
  startDate,
  endDate,
  timestamp,
  handleRemove,
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
    formattedTimeAgo = `${Math.floor(timeDifference)} seconds ago`;
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
        {borrowerDetails && (
          <Dropdown
            inline
            label={
              <Avatar
                alt="User settings"
                img={borrowerDetails.profilePicture}
                rounded
              />
            }
          >
            <Link href={`/profile/${borrowerID}`}>
              <DropdownItem>View Profile</DropdownItem>
            </Link>
          </Dropdown>
        )}
      </div>
      <div className="flex-col flex-grow pl-4 pr-4">
        {borrowerDetails && (
          <p className="text-white text-lg mb-4 pr-4">
            {borrowerDetails.name} has Requested your {itemName}!
          </p>
        )}
        <div className="flex flex-row">
          <div className="pr-8">
            <Link href={`listings/item/${itemID}`}>
              <Image
                height={80}
                width={80}
                src="/favicon.png"
                className="mr-3 rounded"
                alt="ToolShed Logo"
              />
            </Link>
          </div>
          <div>
            <p className="text-sm">
              {formattedStartDate} - {formattedEndDate}
            </p>
            <div className="flex pt-2">
              <button
                onClick={() => {
                  cancelRequest(itemID, borrowerID);
                  handleRemove(itemID, borrowerID);
                }}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md mr-2"
              >
                Decline
              </button>
              <button
                onClick={() => {
                  borrowItem(itemID, borrowerID);
                  handleRemove(itemID, borrowerID);
                }}
                className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md"
              >
                Accept
              </button>
            </div>
          </div>
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
