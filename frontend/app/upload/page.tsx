import React from "react";
import ListItemForm from "../components/ListItemForm";
import ListingContactInformation from "../components/listItemFormComponents/ListingContactInformation";
import ListingLocation from "../components/listItemFormComponents/ListingLocation";
import ListingMedia from "../components/listItemFormComponents/ListingMedia";
import ListingDetails from "../components/listItemFormComponents/ListingDetails";

export default function page() {
  return (
    <div>
      <ListItemForm>
        <ListingDetails />
        <ListingMedia />
        <ListingLocation />
        <ListingContactInformation />
      </ListItemForm>
    </div>
  );
}
