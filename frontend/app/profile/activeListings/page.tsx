import React, { Suspense } from "react";
import BorrowedItemsContainer from "../borrowed/BorrowedItemsContainer";
import ActiveListingsContainer from "./ActiveListingsContainer";

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="">
        <div className=" text-3xl p-4 flex justify-center">Active Listings</div>
        <ActiveListingsContainer />
      </div>
    </Suspense>
  );
}
