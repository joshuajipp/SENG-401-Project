import React from "react";
import Image from "next/image";
import { DetailField } from "./DetailField";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { SuperSession } from "@/app/interfaces/UserI";
export default async function PersonalDetails({
  location,
  name,
  userID,
}: {
  location: string;
  name?: string | null;
  userID?: string;
}) {
  const session: SuperSession | null = await getServerSession(authOptions);

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-xl font-medium">Personal Details</h1>
      <div className="flex  flex-row gap-4">
        <div className="rounded-xl shadow-lg size-52 relative  border">
          <Image
            src={
              (userID == session?.userData.userID && session?.user?.image) ||
              "/missingImage.jpg"
            }
            alt="profileImage"
            fill
            className="object-contain  p-4"
          />
        </div>

        <div className="flex flex-col gap-4 text-black dark:text-white">
          <DetailField title={"Name"} value={name} />
          <DetailField title={"Location"} value={location} />
        </div>
      </div>
    </div>
  );
}
