import React from "react";
import { Table, TableHead, TableHeadCell } from "flowbite-react";
import TableBodyComponent from "../borrowed/TableBodyComponent";
import { getLenderItems } from "@/app/actions";
import { ItemsGetListI } from "@/app/interfaces/ListItemI";

export default async function ActiveListingsContainer() {
  const res = await getLenderItems();
  const items: ItemsGetListI[] = res.items || [];

  const TableHeader = () => {
    const tableHeaders = [
      "Item Name",
      "Borrower Name",
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
