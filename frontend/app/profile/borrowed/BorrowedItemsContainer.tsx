import React from "react";
import ItemRow from "./ItemRow";
export default function BorrowedItemsContainer() {
  const TableHeader = () => {
    return (
      <div className=" bg-[#634C9F] rounded shadow text-white flex flex-row gap-16 justify-evenly items-center p-4">
        <div>{"Item Name"}</div>
        <div>{"Lender Name"}</div>
        <div>{"Start Date"}</div>
        <div>{"End Date"}</div>
        <div>{"Status"}</div>
      </div>
    );
  };
  return (
    <div className="gap-4 flex flex-col">
      <TableHeader></TableHeader>
      <ItemRow></ItemRow>
    </div>
  );
}
