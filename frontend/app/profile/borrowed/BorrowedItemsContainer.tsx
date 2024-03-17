import React from "react";
import ItemRow from "./ItemRow";
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
            return (
              <th
                key={index}
                // className="bg-[#634C9F] text-white p-4"
              >
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  };
  return (
    <table className="table-auto">
      <TableHeader></TableHeader>
      <ItemRow></ItemRow>
    </table>
  );
}
