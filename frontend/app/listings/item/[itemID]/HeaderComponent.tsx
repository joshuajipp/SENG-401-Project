import { ItemsGetListI } from "@/app/interfaces/ListItemI";
import { FaLocationDot } from "react-icons/fa6";
import { SuperSession } from "@/app/interfaces/UserI";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import EditItemModal from "./EditItemModal";
import DeleteItemModal from "./DeleteItemModal";
export default async function HeaderComponent({
  item,
}: {
  item: ItemsGetListI;
}) {
  const user: SuperSession | null = await getServerSession(authOptions);
  const date = new Date(item.timestamp * 1000);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - date.getTime());
  return (
    <div className=" bg-white dark:bg-slate-800 dark:text-white p-4 rounded-lg flex flex-row gap-2 justify-between">
      <div className="">
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
      {user?.userData.userID === item.lenderID && (
        <div className=" flex flex-col gap-1">
          <EditItemModal item={item} />
          <DeleteItemModal item={item} />
        </div>
      )}
    </div>
  );
}
