import React from "react";
import dynamic from "next/dynamic";
import ListItemForm from "../components/ListItemForm";
import ListingDetails from "../components/listItemFormComponents/ListingDetails";
import ListingMedia from "../components/listItemFormComponents/ListingMedia";
import Loading from "./loading";

// Dynamically import components with Next.js dynamic
const ListingLocation = dynamic(
  () => import("../components/listItemFormComponents/ListingLocation"),
  {
    loading: () => <Loading />,
    ssr: false, // if you want to disable SSR for this component
  }
);

const ListingContactInformation = dynamic(
  () =>
    import("../components/listItemFormComponents/ListingContactInformation"),
  {
    loading: () => <Loading />,
    ssr: false,
  }
);

export default function Page() {
  return (
    <ListItemForm>
      <ListingDetails />
      <ListingMedia />
      <ListingLocation />
      <ListingContactInformation />
    </ListItemForm>
  );
}
