import React, { Suspense } from "react";
import TableBody from "../borrowed/TableBody";

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
      <Suspense fallback={<div>Loading...</div>}>
        <TableBody></TableBody>
      </Suspense>
    </table>
  );
}
