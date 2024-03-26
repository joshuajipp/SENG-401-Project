import React from "react";
import { Table, TableHead, TableHeadCell, Tooltip } from "flowbite-react";
import { getBorrowedItems } from "@/app/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { SuperSession } from "@/app/interfaces/UserI";
import { ItemsGetListI } from "@/app/interfaces/ListItemI";
import TableBodyComponent from "./TableBodyComponent";
export default async function BorrowedItemsContainer() {
  const session: SuperSession | null = await getServerSession(authOptions);
  const res = await getBorrowedItems(session?.userData.userID || "");
  const items: ItemsGetListI[] = res.items || [];
  const TableHeader = () => {
    const tableHeaders = [
      "Item Name",
      "Lender Name",
      "Start Date",
      "End Date",
      "Status",
    ];
    return (
      <TableHead>
        {tableHeaders.map((header, index) => {
          return (
            <TableHeadCell key={index}>
              <span className="flex flex-row items-center justify-around">
                {header}
                {header == "Status" && (
                  <Tooltip
                    placement="top"
                    className="normal-case text-center w-40 mb-28"
                    style="auto"
                    content="Already returned your item? Contact the Lender to accept the return."
                  >
                    <div className="size-8 flex justify-center items-center place-items-center bg-neutral-200 dark:bg-slate-800  rounded-full">
                      <p className="text-black dark:text-white"> ?</p>
                    </div>
                  </Tooltip>
                )}
              </span>
            </TableHeadCell>
          );
        })}
      </TableHead>
    );
  };
  return (
    <Table striped hoverable>
      <TableHeader />
      <TableBodyComponent items={items} />
    </Table>
  );
}
