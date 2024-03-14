import { TextInput } from "flowbite-react";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { searchItemsRedirect } from "../actions";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import CategorySelect from "./CategorySelect";

export default async function SearchBar() {
  const res = await getServerSession(authOptions);
  // @ts-ignore
  const location = res?.user?.location || "Loading...";
  return (
    <div className="flex dark:text-white order-2 md:order-none gap-4 place-items-center justify-center items-center">
      <form action={searchItemsRedirect} className="flex flex-row gap-2">
        <TextInput
          type="text"
          icon={FaSearch}
          name="searchValue"
          placeholder="What are you looking for?"
          addon={
            <button type="submit" className="bg-transparent hover:opacity-85">
              Search
            </button>
          }
        />
        <CategorySelect />
      </form>

      <div className="hidden sm:flex flex-row place-items-center gap-2 ">
        <div className="rounded-full opacity-80 p-2 bg-brand">
          <FaLocationDot />
        </div>
        <div className=" text-sm text-black dark:text-white">{location}</div>
      </div>
    </div>
  );
}
