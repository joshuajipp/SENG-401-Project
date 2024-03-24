import React from "react";
import { Table, TableHead, TableHeadCell } from "flowbite-react";
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
          return <TableHeadCell key={index}>{header}</TableHeadCell>;
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
