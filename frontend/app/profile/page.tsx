import PersonalDetails from "./components/PersonalDetails";
import ContactDetails from "./components/ContactDetails";
import Biography from "./components/Biography";
import RatingDetails from "./components/RatingDetails";
import { authOptions } from "../utils/authOptions";
import { getServerSession } from "next-auth";

export default async function page() {
  const session = await getServerSession(authOptions);
  const location =
    // @ts-ignore
    session?.userData?.location || "Please enable location services";
  const name = session?.user?.name;
  // @ts-ignore
  const rating = session?.userData?.rating;
  // @ts-ignore
  const bio = session?.userData?.bio;

  return (
    // TODO: responsive design
    <div className="bg-white dark:bg-black w-full p-24 rounded-xl text-brand flex flex-row justify-between">
      <PersonalDetails location={location} name={name} />
      <div className=" flex flex-col gap-8">
        <ContactDetails />
        <RatingDetails rating={rating} />
      </div>
      <Biography bio={bio} />
    </div>
  );
}
