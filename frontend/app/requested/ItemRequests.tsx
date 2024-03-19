"use client";

import React from "react";
import { useState, useEffect } from "react";
import Notification from "../components/Notification";
interface Item {
  location: string;
  lenderID: string;
  timestamp: number;
  condition: string;
  category: string;
  images: [];
  itemID: string;
  description: string;
  imageHashes: [];
  borrowRequests: BorrowRequest[];
  itemName: string;
}

interface BorrowRequest {
  borrowerID: string;
  endDate: string;
  startDate: string;
  timestamp: number;
}

export default function ItemRequests() {
  const [requestedItems, setRequestedItems] = useState<Item[]>([]);

  useEffect(() => {
    // Fetch user items when component mounts
    // Fix hardcoded userID: get current user from auth
    async function getLenderItems() {
      const res = await fetch(
        "https://iat6gyr54ckeyk532ukyqqqx6m0blqpr.lambda-url.ca-central-1.on.aws/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            lenderID: "663b6585-2f65-4088-a346-9fe2ec9a9000",
          }
        }
      );
      if (res.status == 200) {
        const itemObject = await res.json();
        const items = itemObject["items"];
        const filteredItems = items.filter(
          (item: Item) => item.borrowRequests && item.borrowRequests.length > 0
        );
        setRequestedItems(filteredItems);
      }
    }
    getLenderItems();
  }, []);

  return (
    <div>
      {requestedItems.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div>
          {requestedItems.map((item, index) =>
            item.borrowRequests.map((request, requestIndex) => (
              <Notification
                key={`${index}-${requestIndex}`}
                itemName={item.itemName}
                borrowerID={request.borrowerID}
                startDate={request.startDate}
                endDate={request.endDate}
                timestamp={request.timestamp}
              ></Notification>
            ))
          )}
        </div>
      )}
    </div>
  );
}
