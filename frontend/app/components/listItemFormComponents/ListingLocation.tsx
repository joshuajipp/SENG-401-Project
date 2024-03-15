import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import ListingMapContainer from "./ListingMapContainer";
import { Tooltip } from "flowbite-react";
import ListItemFormTemplate from "./ListItemFormTemplate";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";

export default async function ListingLocation() {
  const user = await getServerSession(authOptions);
  // @ts-ignore
  const location = user?.userData.location;
  return (
    <ListItemFormTemplate formNumber={3} formHeader={"Location"}>
      <div className="flex flex-row justify-between items-center place-items-center place-content-center ">
        <div className=" flex flex-col gap-4 text-sm">
          <div className=" p-4 bg-stone-50 rounded border border-zinc-300 items-center gap-2 flex flex-row">
            <div className="flex justify-center items-center place-items-center bg-neutral-200 size-10 rounded-full">
              <FaLocationDot className="text-black dark:text-white" size={20} />
            </div>
            <div className="text-neutral-500">
              <span className="text-xs font-normal">
                Your ad will be posted in
                <br />
              </span>
              <span className=" text-sm font-bold">{location}</span>
            </div>
          </div>
          <div className="flex flex-row place-items-center gap-2">
            <h3 className="text-brand font-medium ">
              Not the city you want to post in?
            </h3>
            <Tooltip content="You can change your default location in the 'Settings' tab">
              <div className="size-8 flex justify-center items-center place-items-center bg-neutral-200  rounded-full">
                <p className="text-black dark:text-white"> ?</p>
              </div>
            </Tooltip>
          </div>
        </div>
        <ListingMapContainer />
      </div>
      <input className="hidden" name="location" value={location} readOnly />
    </ListItemFormTemplate>
  );
}
