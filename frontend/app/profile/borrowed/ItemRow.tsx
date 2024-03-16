import React from "react";
import Image from "next/image";
import Link from "next/link";
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
  const lenderName = "Joseph Stalin";
  const borrowedState = "Unreturned";
  const itemName = "Wrench";
  const toolImage = "https://via.placeholder.com/66x47";
  const profileImage = "https://via.placeholder.com/55x48";
  return (
    <button className=" bg-[#DDD8E9] rounded transition duration-300 ease-in-out transform hover:scale-[1.02] shadow flex flex-row gap-16 items-center justify-evenly p-4">
      <Link href="/" className="flex flex-row gap-2 items-center">
        <Image alt="Tool Image" src={toolImage} width={66} height={47} />
        <div>{itemName}</div>
      </Link>
      <Link href="/" className="flex flex-row gap-2 items-center">
        <div className=" size-12 relative">
          <Image
            alt="Profile Image"
            src={profileImage}
            className="rounded-full"
            fill
          />
        </div>
        <div>{lenderName}</div>
      </Link>
      <div>{startDate}</div>
      <div>{endDate}</div>
      <div className=" text-red-500">{borrowedState}</div>
    </button>
  );
}
