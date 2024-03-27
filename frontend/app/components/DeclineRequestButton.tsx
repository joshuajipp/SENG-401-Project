"use client";
import React, { MouseEvent } from "react";

export default function DeclineRequestButton() {
  function handleDeclineRequest(event: MouseEvent<HTMLButtonElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <button
      className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md mr-2"
      onClick={handleDeclineRequest}
    >
      Decline
    </button>
  );
}
