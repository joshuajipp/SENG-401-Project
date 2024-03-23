import React, { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import { Table, TableHead, TableHeadCell } from "flowbite-react";
import TableBodyComponent from "../borrowed/TableBodyComponent";

export default function ActiveListingsContainer() {
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
      <TableBodyComponent />
    </Table>
  );
}
