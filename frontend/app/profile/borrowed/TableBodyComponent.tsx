import React from "react";
import Image from "next/image";
import Link from "next/link";
import AcceptReturnModal from "./AcceptReturnModal";
import { getLenderItems } from "@/app/actions";
import { ItemsGetListI } from "@/app/interfaces/ListItemI";
import { TableBody, TableRow, TableCell } from "flowbite-react";
import { FaUserCircle } from "react-icons/fa";

export default async function TableBodyComponent() {
  const res = await getLenderItems();
  const items: ItemsGetListI[] = res.items || [];
  console.log(items);
  const LenderRowEntry: React.FC<{ item: ItemsGetListI }> = ({ item }) => {
    const startDate = item.startDate
      ? new Date(item.startDate * 1000).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "";
    const endDate = item.endDate
      ? new Date(item.endDate * 1000).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : " ";
    const lenderName = item.borrower?.name;
    const borrowedState = item.borrowerID && "Unreturned";
    const itemName = item.itemName;
    const toolImage = item.images[0] || "/missingImage.jpg";
    const profileImage = "https://via.placeholder.com/55x48";
    return (
      <TableRow className=" transition duration-300 ease-in-out transform hover:scale-[1.02] ">
        <TableCell>
          <Link
            href={`/listings/item/${item.itemID}`}
            className="flex flex-row gap-2 items-center"
          >
            <Image alt="Tool Image" src={toolImage} width={66} height={47} />
            <div>{itemName}</div>
          </Link>
        </TableCell>
        <TableCell>
          <td className="p-4">
            <Link
              href={`/listings/item/${item.itemID}`}
              className="flex flex-row gap-2 items-center "
            >
              <div className=" size-12 relative">
                {item.borrower && (
                  // <Image
                  //   alt="Profile Image"
                  //   src={profileImage}
                  //   className="rounded-full"
                  //   fill
                  // />
                  <FaUserCircle className="text-gray-500 size-full" />
                )}
              </div>
              <div>{lenderName}</div>
            </Link>
          </td>
        </TableCell>
        <TableCell>
          <div>{startDate}</div>
        </TableCell>
        <TableCell>
          <div>{endDate}</div>
        </TableCell>
        <TableCell>
          <AcceptReturnModal
            borrowerID={item.borrowerID}
            borrowedState={borrowedState}
          />
        </TableCell>
      </TableRow>
    );
  };
  return (
    <TableBody>
      {items.map((item, index) => {
        return <LenderRowEntry key={index} item={item} />;
      })}
    </TableBody>
  );
}
