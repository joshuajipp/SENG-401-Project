import React from "react";
import Skeleton from "react-loading-skeleton";

export default function page() {
  return (
    <div className="w-full">
      page
      <Skeleton count={10} />
    </div>
  );
}
