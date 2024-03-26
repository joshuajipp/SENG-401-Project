import { getUserByID } from "@/app/actions";
import { UserI } from "@/app/interfaces/UserI";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Rating, RatingStar } from "flowbite-react";
import Link from "next/link";
import Image from "next/image";

export default async function UserInfoSnippet({ userID }: { userID: string }) {
  const lender: UserI = await getUserByID(userID);
  console.log(lender);
  const rating = lender.rating;
  return (
    <div className="flex flex-col gap-2">
      <Link
        href={`/profile/${lender.userID}`}
        className=" flex flex-row gap-2 items-center"
      >
        {lender.profilePicture ? (
          <div className=" relative size-10">
            <Image
              src={lender.profilePicture}
              alt="Profile Picture"
              fill
              className="rounded-full "
            />
          </div>
        ) : (
          <FaUserCircle size={40} />
        )}
        <div className="text-xl">{lender.name}</div>
      </Link>
      <Rating>
        {rating &&
          Array.from({ length: rating }).map((_, i) => (
            <RatingStar key={i} className="text-brand" />
          ))}
        {!rating &&
          Array.from({ length: 5 }).map((_, i) => (
            <RatingStar key={i} filled={false} />
          ))}
      </Rating>
    </div>
  );
}
