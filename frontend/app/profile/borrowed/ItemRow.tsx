import React from "react";
import Image from "next/image";
export default function ItemRow() {
  const startDate = new Date("2024-02-14").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const endDate = new Date("2024-02-28").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div className=" bg-[#DDD8E9] rounded shadow flex flex-row gap-16 items-center p-4">
      <div className="flex flex-row gap-2 items-center">
        <Image
          alt="Tool Image"
          src="https://via.placeholder.com/66x47"
          width={66}
          height={47}
        />
        <div className="">Wrench</div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <div className=" size-12 relative">
          <Image
            alt="Profile Image"
            src="https://via.placeholder.com/55x48"
            className="rounded-full"
            fill
          />
        </div>
        <div className="">Joseph Stalin</div>
      </div>
      <div className="">{startDate}</div>
      <div className="">{endDate}</div>
      <div className=" text-red-500">Unreturned</div>
    </div>
  );
}
