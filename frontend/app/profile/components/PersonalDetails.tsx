import React from "react";
import Image from "next/image";
import { DetailField } from "./DetailField";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
export default async function PersonalDetails({
  location,
  name,
}: {
  location: string;
  name?: string | null;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-xl font-medium">Personal Details</h1>
      <div className="flex flex-row gap-4">
        <Image
          src={session?.user?.image || "/missingImage.jpg"}
          alt="profileImage"
          width={180}
          height={200}
          className="rounded-xl object-fill shadow-lg border p-4"
        />
        <div className="flex flex-col gap-4 text-black dark:text-white">
          <DetailField title={"Name"} value={name} />
          <DetailField title={"Location"} value={location} />
        </div>
      </div>
    </div>
  );
}
