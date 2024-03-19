import React from "react";
import ActiveListingsContainer from "./ActiveListingsContainer";

export default function page() {
  return (
    <div className="">
      <div className=" text-3xl p-4 flex justify-center">Active Listings</div>
      <ActiveListingsContainer />
    </div>
  );
}
