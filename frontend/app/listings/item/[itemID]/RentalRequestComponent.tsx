import Disclaimer from "@/app/components/Disclaimer";
import RentalFormHeader from "@/app/components/RentalFormHeader";
import RequestFields from "@/app/components/RequestFields";
import RequestRentalForm from "@/app/components/RequestRentalForm";
import SubmitButton from "@/app/components/SubmitButton";
import { ItemsGetListI } from "@/app/interfaces/ListItemI";
import { SuperSession } from "@/app/interfaces/UserI";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
import UserInfoSnippet from "../../components/UserInfoSnippet";

export default async function RentalRequestComponent({
  item,
}: {
  item: ItemsGetListI;
}) {
  const session: SuperSession | null = await getServerSession(authOptions);
  if (!session)
    return (
      <div className=" font-bold text-xl text-center w-1/2 bg-white dark:bg-slate-800 p-8 rounded-lg">
        Login to request item
      </div>
    );
  return (
    <>
      {session.userData.userID !== item.lenderID && (
        <div className="w-1/2 bg-white dark:bg-slate-800 p-8 rounded-lg">
          <RequestRentalForm>
            <UserInfoSnippet userID={item.lenderID} />
            <RentalFormHeader itemID={item.itemID} />
            <RequestFields />
            <SubmitButton
              pending="Requesting item..."
              success="Request has been made successfully!"
              error="Error requesting item. Please try again later."
              title="Request Item"
            />
            <Disclaimer />
          </RequestRentalForm>
        </div>
      )}
    </>
  );
}
