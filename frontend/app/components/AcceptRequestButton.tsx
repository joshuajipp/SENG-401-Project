"use client";
import React, { MouseEvent } from "react";

export default function AcceptRequestButton() {
  const borrowItem = async (itemID: string, borrowerID: string) => {
    const response = await fetch(process.env.BORROW_ITEM_URL as string, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemID: itemID,
        borrowerID: borrowerID,
      }),
    });

    if (response.status !== 200) {
      const errorMessage =
        "Failed to borrow item. Status code: " + response.status;
      console.error(errorMessage);
      return errorMessage;
    }
    return response;
  };

  return (
    <button
      className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md"
      onClick={() => borrowItem}
    >
      Accept
    </button>
  );
}
