import { Category } from "@/app/interfaces/ListItemI";
import React from "react";
export default function CategoryOptions() {
  return (
    <ul className="flex flex-col gap-1">
      {Object.values(Category).map((category) => (
        <li
          key={category}
          className="rounded-sm p-2 pr-8 bg-[#E9E6F2] shadow cursor-pointer hover:opacity-80"
        >
          <h2 className="text-2xl ">{category}</h2>
        </li>
      ))}
    </ul>
  );
}
