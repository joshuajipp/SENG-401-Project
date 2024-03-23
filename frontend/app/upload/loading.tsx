import React from "react";
import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div className=" w-2/3 items-center">
      <div className="">Loading...</div>
      <Skeleton className="text-9xl" count={3} />
    </div>
  );
}
