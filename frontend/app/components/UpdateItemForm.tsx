"use client";
import { updateListing } from "../actions";
import { useRef } from "react";
import { toast } from "react-toastify";
export default function UpdateItemForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLFormElement>(null);
  const notify = (formData: FormData) =>
    toast.promise(updateListing(formData), {
      pending: "Listing is being updated...",
      success: {
        render() {
          return "Listing has been updated!";
        },
      },
      error: {
        render({ data }) {
          return `${data}`;
        },
      },
    });

  return (
    <form
      ref={ref}
      className="flex flex-col gap-4 text-brand"
      action={async (formData) => {
        ref.current?.reset();
        notify(formData);
      }}
    >
      {children}
    </form>
  );
}
