import React from "react";
import DatepickerRentalForm from "./DatepickerRentalForm";
import { requestItem } from "../actions";
import { getServerSession } from "next-auth";
import SubmitButton from "./SubmitButton";
import Link from "next/link";
import { authOptions } from "../utils/authOptions";
export default async function RequestRentalForm({
  itemID,
}: {
  itemID: string;
}) {
  const session = await getServerSession(authOptions);
  const RequestFields = () => {
    return (
      <div className="w-full flex flex-col font-medium text-sm gap-4">
        <div className=" w-full ">
          <label htmlFor="borrow-date">Borrow Date *</label>
          <DatepickerRentalForm name="borrowDate" />
        </div>
        <div className=" w-full ">
          <label htmlFor="return-date">Return Date *</label>
          <DatepickerRentalForm name="returnDate" />
        </div>
        <div className="w-full">
          <label htmlFor="message" className="block mb-2">
            Custom Message
          </label>
          <textarea
            id="message"
            // name="message"
            rows={5}
            className="block p-2.5 w-full text-sm bg-stone-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a comment..."
          />
        </div>
      </div>
    );
  };
  return (
    <form
      action={requestItem}
      className=" bg-white dark:bg-slate-800 p-8 rounded-lg gap-2 flex flex-col"
    >
      <div className="flex flex-col gap-8">
        <input className="hidden" name="itemID" value={itemID} readOnly />
        <input
          className="hidden"
          name="borrowerID"
          // @ts-ignore
          value={session?.userData?.userID || ""}
          readOnly
        />
        <h1 className=" font-bold text-2xl ">Request Item Rental</h1>
        <RequestFields />
        <SubmitButton
          pending="Requesting item..."
          success="Request has been made successfully!"
          error="Error requesting item. Please try again later."
          title="Request Item"
        />
      </div>
      <div className="text-center text-xs">
        Toolshed is not responsible for any loss of personal property, liability
        of damage, theft, or crime. To deter and identify potential fraud, spam
        or suspicious behaviour, we anonymize your email address (as applicable)
        and reserve the right to monitor conversations. By sending the message
        you agree to our{" "}
        <Link href="/" className="underline">
          Terms of Use
        </Link>
        {" and "}
        <Link href="/" className="underline">
          Privacy Policy.
        </Link>
      </div>
    </form>
  );
}
