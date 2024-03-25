import React, { Suspense } from "react";
import BorrowedItemsContainer from "./BorrowedItemsContainer";

export default function page() {
  return (
    <div className="">
      <div className=" text-3xl p-4 flex justify-center">Borrowed Items</div>

      <BorrowedItemsContainer />
    </div>
  );
}
