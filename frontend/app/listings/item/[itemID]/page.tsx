import RequestRentalForm from "@/app/components/RequestRentalForm";
import ImageViewer from "../ImageViewer";
import { FaLocationDot } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { CiViewList } from "react-icons/ci";
import { getItemFromID } from "@/app/actions";
import { ItemsGetListI } from "@/app/interfaces/ListItemI";
import Disclaimer from "@/app/components/Disclaimer";
import SubmitButton from "@/app/components/SubmitButton";
import RequestFields from "@/app/components/RequestFields";
import RentalFormHeader from "@/app/components/RentalFormHeader";

export default async function page({ params }: { params: { itemID: string } }) {
  const res = await getItemFromID(params.itemID);
  const item: ItemsGetListI = res.items;
  const ExtraInfoComponent = () => {
    return (
      <div className="flex flex-col p-4 bg-white dark:bg-slate-800 rounded-lg">
        <div className="flex flex-row justify-around ">
          <div className="flex flex-row items-center gap-2">
            <BiCategory />
            <p>Category: {item.category}</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <CiViewList />
            <p>Condition: {item.condition}</p>
          </div>
        </div>
        <br />
        <div className="flex flex-col gap-2">
          <h1 className=" text-2xl">Description</h1>
          <p className="">{item.description}</p>
        </div>
      </div>
    );
  };
  const HeaderComponent = () => {
    const date = new Date(item.timestamp * 1000);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - date.getTime());
    return (
      <div className=" bg-white dark:bg-slate-800 dark:text-white p-4 rounded-lg">
        <h1 className=" font-bold text-2xl dark:text-white">{item.itemName}</h1>
        <div className="flex flex-row items-center gap-4">
          <div className="rounded-full opacity-80 p-2 bg-brand">
            <FaLocationDot size={25} />
          </div>
          <div className="">
            <p>{Math.ceil(diffTime / (1000 * 60 * 60 * 24))} days ago</p>
            <p>Location: {item.location}</p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between gap-4">
          <div className=" w-full flex flex-col gap-4">
            <HeaderComponent />
            <ImageViewer images={item.images} />
            <ExtraInfoComponent />
          </div>
          <div className="w-1/2">
            <RequestRentalForm>
              <RentalFormHeader itemID={item.itemID} />
              <RequestFields />
              <SubmitButton
                pending="Requesting item..."
                success="Request has been made successfully!"
                error="Error requesting item. Please try again later."
                title="Request Item"
              />
              <Disclaimer></Disclaimer>
            </RequestRentalForm>
          </div>
        </div>
      </div>
    </>
  );
}
