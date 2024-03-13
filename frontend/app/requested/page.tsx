"use client";

import React from "react";
import { useState, useEffect } from "react";
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
  borrowRequests: string[];
  itemName: string;
}

export default function page() {
  const [requestedItems, setRequestedItems] = useState<Item[]>([]);

  useEffect(() => {
    // Fetch user items when component mounts
    async function getLenderItems() {
      const res = await fetch(
        "https://iat6gyr54ckeyk532ukyqqqx6m0blqpr.lambda-url.ca-central-1.on.aws/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            lenderID: "663b6585-2f65-4088-a346-9fe2ec9a9000",
          },
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
        <p>Empty</p>
      ) : (
        <div>
          <p>Not Empty</p>
        </div>
      )}
    </div>
  );
}
