import React from "react";
import ListingsContainer from "./components/ListingsContainer";
import { SearchParamsI } from "../interfaces/SearchParamsI";

export default function page({
  searchParams,
}: {
  searchParams: SearchParamsI;
}) {
  return (
    <div className="flex flex-row gap-4 text-brand">
      <ListingsContainer searchParams={searchParams} />
    </div>
  );
}
