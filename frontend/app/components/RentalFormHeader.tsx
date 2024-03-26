import React from "react";
import { authOptions } from "../utils/authOptions";
import { getServerSession } from "next-auth";
import { SuperSession } from "../interfaces/UserI";

export default async function RentalFormHeader({ itemID }: { itemID: string }) {
  const session: SuperSession | null = await getServerSession(authOptions);
  return (
    <div className="flex flex-col gap-8">
      <input className="hidden" name="itemID" value={itemID} readOnly />
      <input
        className="hidden"
        name="borrowerID"
        value={session?.userData?.userID || ""}
        readOnly
      />
      <h1 className=" font-bold text-2xl ">Request Item Rental</h1>
    </div>
  );
}
