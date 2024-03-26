import { getItemPage } from "@/app/actions";
import { ItemsGetListI } from "@/app/interfaces/ListItemI";
import { SearchParamsI } from "@/app/interfaces/SearchParamsI";
import SortListingsButton from "./SortListingsButton";
import ListingRow from "./ListingRow";

export default async function ListingsContainer({
  searchParams,
}: {
  searchParams: SearchParamsI;
}) {
  const res = await getItemPage({
    location: searchParams.location,
    category: searchParams.category,
    search: searchParams.search,
  });
  // @ts-ignore
  const listings: ItemsGetListI[] | undefined = res?.items;
  if (!listings) return <div>No listings found</div>;
  return (
    <ul className="flex flex-col gap-3 ">
      <div className="flex flex-row justify-between items-center">
        <div className="text-2xl">
          Results 1-{listings.length} of {listings.length}
        </div>
        <SortListingsButton />
      </div>
      <ul className="flex flex-col gap-1 ">
        {listings.map((listing, index) => (
          <ListingRow key={index} listing={listing} />
        ))}
      </ul>
    </ul>
  );
}
