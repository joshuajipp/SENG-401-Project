import React from "react";
import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div className="">
      <div className="">Loading...</div>
      <Skeleton className="text-9xl" />
    </div>
  );
}
