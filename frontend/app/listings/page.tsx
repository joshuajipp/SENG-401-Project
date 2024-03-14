import React from "react";
import ListingsContainer from "./components/ListingsContainer";
import CategoryOptions from "./components/CategoryOptions";
import { SearchParamsI } from "../interfaces/SearchParamsI";

export default function page({
  searchParams,
}: {
  searchParams: SearchParamsI;
}) {
  return (
    <div className="flex flex-row gap-4 text-brand">
      <div className="flex-col gap-4 inline-flex">
        <h1 className="text-2xl font-bold ">Category</h1>
        <CategoryOptions />
      </div>
      <ListingsContainer searchParams={searchParams} />
    </div>
  );
}
