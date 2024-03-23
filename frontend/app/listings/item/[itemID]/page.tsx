import ImageViewer from "../ImageViewer";
import { getItemFromID } from "@/app/actions";
import { ItemsGetListI } from "@/app/interfaces/ListItemI";
import HeaderComponent from "./HeaderComponent";
import ExtraInfoComponent from "./ExtraInfoComponent";
import RentalRequestComponent from "./RentalRequestComponent";

export default async function page({ params }: { params: { itemID: string } }) {
  const res = await getItemFromID(params.itemID);
  const item: ItemsGetListI = res.items;
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between gap-4">
          <div className=" w-full flex flex-col gap-4">
            <HeaderComponent item={item} />
            <ImageViewer images={item.images} />
            <ExtraInfoComponent item={item} />
          </div>
          <RentalRequestComponent item={item} />
        </div>
      </div>
    </>
  );
}
