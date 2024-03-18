import React from "react";
import Image from "next/image";
import Link from "next/link";
import AcceptReturnModal from "./AcceptReturnModal";
import { getLenderItems } from "@/app/actions";
import { ItemsGetListI } from "@/app/interfaces/ListItemI";
export default async function TableBody() {
  const res = await getLenderItems();
  const items: ItemsGetListI[] = res.items;
  const RowEntry = ({ item }: { item: ItemsGetListI }) => {
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
    // const startDate = new Date(item.borrowRequests[0].startDate).toLocaleDateString("en-US", {
    //   month: "long",
    //   day: "numeric",
    //   year: "numeric",
    // });
    // const endDate = new Date(item.borrowRequests[0].endDate).toLocaleDateString("en-US", {
    //   month: "long",
    //   day: "numeric",
    //   year: "numeric",
    // });
    const lenderName = "Joseph Stalin";
    const borrowedState = "Unreturned";
    const itemName = item.itemName;
    const toolImage = item.images[0] || "/missingImage.jpg";
    const profileImage = "https://via.placeholder.com/55x48";
    return (
      <tr className=" bg-[#DDD8E9] rounded transition duration-300 ease-in-out transform hover:scale-[1.02] shadow dark:text-black">
        <td className="p-4">
          <Link href="/" className="flex flex-row gap-2 items-center">
            <Image alt="Tool Image" src={toolImage} width={66} height={47} />
            <div>{itemName}</div>
          </Link>
        </td>
        <td className="p-4">
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
        </td>
        <td className="p-4">
          <div>{startDate}</div>
        </td>
        <td className="p-4">
          <div>{endDate}</div>
        </td>
        <td className="p-4">
          <AcceptReturnModal borrowedState={borrowedState}></AcceptReturnModal>
        </td>
      </tr>
    );
  };
  return (
    <tbody>
      {items.map((item, index) => {
        return <RowEntry key={index} item={item}></RowEntry>;
      })}
    </tbody>
  );
}
