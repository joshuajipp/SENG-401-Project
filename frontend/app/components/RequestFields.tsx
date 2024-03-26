import React from "react";
import DatepickerRentalForm from "./DatepickerRentalForm";

export default function RequestFields() {
  const currentDate = new Date();
  // Note: 1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const oneWeekFromNow = new Date(
    currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
  );

  return (
    <div className="w-full flex flex-col font-medium text-sm gap-4">
      <div className=" w-full ">
        <label htmlFor="borrow-date">Borrow Date *</label>
        <DatepickerRentalForm name="borrowDate" />
      </div>
      <div className=" w-full ">
        <label htmlFor="return-date">Return Date *</label>
        <DatepickerRentalForm name="returnDate" date={oneWeekFromNow} />
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
}
