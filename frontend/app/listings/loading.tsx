import React from "react";
import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div className=" w-1/2 items-center">
      <div className="">Loading...</div>
      <Skeleton className="text-9xl" count={3} />
    </div>
  );
}
