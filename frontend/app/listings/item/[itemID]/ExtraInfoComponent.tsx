import { ItemsGetListI } from "@/app/interfaces/ListItemI";
import { BiCategory } from "react-icons/bi";
import { CiViewList } from "react-icons/ci";
export default function ExtraInfoComponent({ item }: { item: ItemsGetListI }) {
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
}
