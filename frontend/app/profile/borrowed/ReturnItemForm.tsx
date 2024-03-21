"use client";
import { updateRating } from "@/app/actions";
import { toast } from "react-toastify";
export default function UpdateItemForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const notify = (formData: FormData) => {
    const rating = Number(formData.get("rating"));
    const userID = String(formData.get("userID"));
    toast.promise(updateRating(rating, userID), {
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
