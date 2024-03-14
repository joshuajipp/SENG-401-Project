import RequestRentalForm from "@/app/components/RequestRentalForm";
import ImageViewer from "../ImageViewer";
import { FaLocationDot } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { CiViewList } from "react-icons/ci";
import { getItemFromID } from "@/app/actions";
import { ItemsGetListI } from "@/app/interfaces/ListItemI";

export default async function page({ params }: { params: { itemID: string } }) {
  const res = await getItemFromID(params.itemID);
  const testItem: ItemsGetListI = res.items;
  const ExtraInfoComponent = () => {
    return (
      <div className="flex flex-col p-4 bg-white dark:bg-slate-800 rounded-lg">
        <div className="flex flex-row justify-around ">
          <div className="flex flex-row items-center gap-2">
            <BiCategory />
            <p>Category: {testItem.category}</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <CiViewList />
            <p>Condition: {testItem.condition}</p>
          </div>
        </div>
        <br />
        <div className="flex flex-col gap-2">
          <h1 className=" text-2xl">Description</h1>
          <p className="">{testItem.description}</p>
        </div>
      </div>
    );
  };
  const HeaderComponent = () => {
    const date = new Date(testItem.timestamp * 1000);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - date.getTime());
    return (
      <div className=" bg-white dark:bg-slate-800 dark:text-white p-4 rounded-lg">
        <h1 className=" font-bold text-2xl dark:text-white">
          {testItem.itemName}
        </h1>
        <div className="flex flex-row items-center gap-4">
          <div className="rounded-full opacity-80 p-2 bg-brand">
            <FaLocationDot size={25} />
          </div>
          <div className="">
            <p>{Math.ceil(diffTime / (1000 * 60 * 60 * 24))} days ago</p>
            <p>Location: {testItem.location}</p>
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
            <ImageViewer />
            <ExtraInfoComponent />
          </div>
          <div className="w-1/2">
            <RequestRentalForm itemID={testItem.itemID} />
          </div>
        </div>
      </div>
    </>
  );
}
