import RequestRentalForm from "@/app/components/RequestRentalForm";
import ImageViewer from "../ImageViewer";
import { FaLocationDot } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { CiViewList } from "react-icons/ci";
import { getItemFromID } from "@/app/actions";
import { ItemsGetListI } from "@/app/interfaces/ListItemI";

export default async function page({ params }: { params: { itemID: string } }) {
  // const testItem = {
  //   location: "Mockba",
  //   lenderID: "037067cd-fff5-4b72-b45d-c7ae60723b18",
  //   timestamp: 1710115788.8776865,
  //   condition: "Used - Good",
  //   category: "Legendary Items",
  //   images: [
  //     "https://res.cloudinary.com/dwviwvswa/image/upload/v1710115790/dxj8ofk8dpmvbgdqklkl.jpg",
  //     "https://res.cloudinary.com/dwviwvswa/image/upload/v1710115791/oxu5jvwkfm6rnwnelzob.jpg",
  //   ],
  //   itemID: "c9562b7d-fd26-4c40-b9fe-9bd615b59605",
  //   description: "Used for the glory of the country",
  //   imageHashes: [
  //     "422826b63f9fead82167c7282152ff22645d84309849e6f9c264312e0a859aaf",
  //     "c183e27592b29bf34a869fb85ec14d585af45ab54c389d94d49d57a658334aac",
  //   ],
  //   itemName: "Hammer and Sickle",
  // };
  const res = await getItemFromID(params.itemID);
  const testItem: ItemsGetListI = res.items;
  console.log(testItem);
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
            <p>10 days ago</p>
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
            <RequestRentalForm></RequestRentalForm>
          </div>
        </div>
      </div>
    </>
  );
}
