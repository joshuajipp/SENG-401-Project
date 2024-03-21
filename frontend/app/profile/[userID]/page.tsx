import { getUserByID } from "@/app/actions";

export default async function page({ params }: { params: { userID: string } }) {
  const res = await getUserByID(params.userID);
  console.log(await res);
  return <div className="">Page for user: {params.userID}</div>;
}
