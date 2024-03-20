import React from "react";
import TableBody from "./TableBody";
export default function BorrowedItemsContainer() {
  const TableHeader = () => {
    const tableHeaders = [
      "Item Name",
      "Lender Name",
      "Start Date",
      "End Date",
      "Status",
    ];
    return (
      <thead className=" bg-[#634C9F] rounded shadow text-white ">
        <tr>
          {tableHeaders.map((header, index) => {
            return <th key={index}>{header}</th>;
          })}
        </tr>
      </thead>
    );
  };
  return (
    <table className="table-auto">
      <TableHeader></TableHeader>
      <TableBody></TableBody>
    </table>
  );
}
