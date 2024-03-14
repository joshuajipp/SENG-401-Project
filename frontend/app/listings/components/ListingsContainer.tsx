import { getItemPage } from "@/app/actions";
import { ItemsGetListI } from "@/app/interfaces/ListItemI";
import React from "react";
import SortListingsButton from "./SortListingsButton";
import Link from "next/link";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";

export default async function ListingsContainer({
  searchParams,
}: {
  searchParams?: string;
}) {
  const res = await getItemPage({ location: "Calgary", search: searchParams });
  const listings: ItemsGetListI[] = res.items;
  return (
    <ul className="flex flex-col gap-3 ">
      <div className="flex flex-row justify-between items-center">
        <div className="text-black text-2xl">
          Results 1-{listings.length} of {listings.length}
        </div>
        <SortListingsButton />
      </div>
      <ul className="flex flex-col gap-1 ">
        {listings.map((listing) => (
          <li
            key={listing.itemName}
            className=" shadow rounded-lg border border-brand flex flex-row gap-4 p-4"
          >
            <Link href={`/listings/item/${listing.itemID}`}>
              <Image
                width={120}
                height={120}
                src={listing.images[0] || "/missingImage.jpg"}
                alt="listing Image"
                className="rounded"
              />
            </Link>

            <div className=" flex flex-col gap-2">
              <Link href={`/listings/item/${listing.itemID}`}>
                <h1 className="text-gray-950 text-xl font-semibold">
                  {listing.itemName}
                </h1>
              </Link>

              <h2 className=" text-sm font-bold">{listing.location}</h2>
              <h3 className=" text-gray-600 text-xs font-normal">
                {listing.description}
              </h3>
            </div>
            <FaRegHeart className=" size-8 hover:scale-110 transition duration-300 ease-in-out cursor-pointer" />
          </li>
        ))}
      </ul>
    </ul>
  );
}
