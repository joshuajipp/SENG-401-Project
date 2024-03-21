"use client";
import { Rating, RatingStar } from "flowbite-react";
import React, { useEffect, useState } from "react";

export default function RatingForm({
  onChildData,
}: {
  onChildData: (data: number) => void;
}) {
  const [rating, setRating] = useState(Array(5).fill(false));
  useEffect(() => {
    const sendDataToParent = () => {
      onChildData(rating.filter((r) => r).length);
    };

    sendDataToParent();
  }, [rating, onChildData]);
  return (
    <div className="flex flex-col gap-4">
      <div className="">
        Give the user a rating before you accept the return of the item!
      </div>
      <Rating size="lg">
        {rating.map((filled, i) => (
          <RatingStar
            key={i}
            filled={filled}
            className=" cursor-pointer"
            onMouseEnter={() => {
              setRating((prev) => prev.map((_, j) => (j <= i ? true : false)));
            }}
          />
        ))}
        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          {rating.filter((r) => r).length} / 5
        </p>
      </Rating>
    </div>
  );
}
