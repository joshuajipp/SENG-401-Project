// import React, { useRef } from "react";
import ListingDetails from "./listItemFormComponents/ListingDetails";
import ListingMedia from "./listItemFormComponents/ListingMedia";
import ListingLocation from "./listItemFormComponents/ListingLocation";
import ListingContactInformation from "./listItemFormComponents/ListingContactInformation";
import SubmitButton from "./SubmitButton";
import { createListing } from "../actions";
import { ListItemProvider } from "../context/ListItemContext";
export default function ListItemForm() {
  // const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      // ref={ref}
      className="flex flex-col gap-4 text-brand"
      action={createListing}
      // ref.current?.reset();
    >
      <ListItemProvider>
        <ListingDetails></ListingDetails>
        <ListingMedia></ListingMedia>
        <ListingLocation></ListingLocation>
        <ListingContactInformation></ListingContactInformation>
        <SubmitButton></SubmitButton>
      </ListItemProvider>
    </form>
  );
}
