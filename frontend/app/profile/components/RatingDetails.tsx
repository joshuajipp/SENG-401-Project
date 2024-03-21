import { authOptions } from "@/app/utils/authOptions";
import { Rating, RatingStar } from "flowbite-react";
import { getServerSession } from "next-auth";
import React from "react";

export default function RatingDetails({ rating }: { rating?: number | null }) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-medium">Rating</h1>
      <div className="flex flex-col text-black dark:text-white">
        <Rating>
          {rating &&
            Array.from({ length: rating }).map((_, i) => (
              <RatingStar key={i} className="text-brand" />
            ))}
          {!rating &&
            Array.from({ length: 5 - rating }).map((_, i) => (
              <RatingStar key={i} filled={false} />
            ))}
          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            {rating}
          </p>
        </Rating>
      </div>
    </div>
  );
}
