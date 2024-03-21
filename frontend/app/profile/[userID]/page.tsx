import { getUserByID } from "@/app/actions";
import PersonalDetails from "../components/PersonalDetails";
import ContactDetails from "../components/ContactDetails";
import RatingDetails from "../components/RatingDetails";
import Biography from "../components/Biography";
import { UserI } from "@/app/interfaces/UserI";

export default async function page({ params }: { params: { userID: string } }) {
  const res: UserI = await getUserByID(params.userID);
  const location = res?.location;
  const name = res?.name;
  const rating = res.rating;
  const bio = res.bio;
  const email = res.email;
  const phoneNum = res.phoneNum;

  return (
    // TODO: responsive design
    <div className="bg-white dark:bg-black w-full p-24 rounded-xl text-brand flex flex-row justify-between">
      <PersonalDetails location={location} name={name} />
      <div className=" flex flex-col gap-8">
        <ContactDetails email={email} phoneNum={phoneNum} />
        <RatingDetails rating={rating} />
      </div>
      <Biography bio={bio} />
    </div>
  );
}
