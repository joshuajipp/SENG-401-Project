import React, { Suspense } from "react";
import BorrowedItemsContainer from "./BorrowedItemsContainer";

export default function page() {
  return (
    <div className="">
      <Suspense fallback={<div>Loading...</div>}>
        <BorrowedItemsContainer />
      </Suspense>
    </div>
  );
}
