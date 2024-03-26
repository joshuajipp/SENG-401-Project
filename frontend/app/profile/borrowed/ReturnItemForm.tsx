"use client";
import { returnItem, updateRating } from "@/app/actions";
import { toast } from "react-toastify";
export default function UpdateItemForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const notify = (formData: FormData) => {
    const rating = Number(formData.get("rating"));
    const userID = String(formData.get("userID"));
    const itemID = String(formData.get("itemID"));
    toast.promise(updateRating(rating, userID), {
      pending: "Rating the borrower...",
      success: {
        render() {
          return "Borrower has been rated!";
        },
      },
      error: "Issue rating borrower. Please try again later.",
    });
    toast.promise(returnItem(itemID), {
      pending: "Item is being returned...",
      success: {
        render() {
          return "Item has been returned!";
        },
      },
      error: "Issue returning item. Please try again later.",
    });
  };

  return (
    <form
      className="flex flex-col gap-4 text-brand"
      action={async (formData) => {
        notify(formData);
      }}
    >
      {children}
    </form>
  );
}
