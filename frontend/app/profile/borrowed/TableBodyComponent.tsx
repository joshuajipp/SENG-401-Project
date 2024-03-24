import React from "react";
import Image from "next/image";
import Link from "next/link";
import AcceptReturnModal from "./AcceptReturnModal";
import { ItemsGetListI } from "@/app/interfaces/ListItemI";
import { TableBody, TableRow, TableCell } from "flowbite-react";
import { FaUserCircle } from "react-icons/fa";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { SuperSession } from "@/app/interfaces/UserI";

export default async function TableBodyComponent({
  items,
}: {
  items: ItemsGetListI[];
}) {
  // TableRowEntry displays lender info by default.
  const session: SuperSession | null = await getServerSession(authOptions);
  const TableRowEntry: React.FC<{ item: ItemsGetListI }> = ({ item }) => {
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

    const currentDate = new Date().getTime();

    const differenceInMilliseconds = (item.endDate ?? 0) * 1000 - currentDate;

    const daysRemaining = Math.ceil(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

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
          <Link
            href={`/profile/${
              session?.userData.userID != item.borrowerID
                ? item.borrowerID
                : item.lenderID
            }`}
            className="flex flex-row gap-2 items-center "
          >
            {(item.borrower || item.lender) && (
              <div className={`size-12 relative`}>
                <FaUserCircle className="text-gray-500 size-full" />
              </div>
            )}
            <div>
              {session?.userData.userID != item.borrowerID
                ? item.borrower?.name
                : item.lender?.name}
            </div>
          </Link>
        </TableCell>
        <TableCell>
          <div>{startDate}</div>
        </TableCell>
        <TableCell>
          <div>{endDate}</div>
        </TableCell>
        <TableCell>
          {session?.userData.userID != item.borrowerID ? (
            <AcceptReturnModal
              borrowerID={item.borrowerID}
              borrowedState={borrowedState}
            />
          ) : (
            <div
              className={`flex flex-col gap-1  ${
                daysRemaining > 3 ? "text-emerald-500" : "text-red-500"
              }`}
            >
              <div className="">{borrowedState}</div>
              <div>
                {daysRemaining} day{daysRemaining != 1 && "s"} left to return!
              </div>
            </div>
          )}
        </TableCell>
      </TableRow>
    );
  };
  return (
    <TableBody>
      {items.map((item, index) => {
        return <TableRowEntry key={index} item={item} />;
      })}
    </TableBody>
  );
}
