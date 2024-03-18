"use client";
import React from "react";
import { requestItem } from "../actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function RequestRentalForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const notify = (formData: FormData) =>
    toast.promise(requestItem(formData), {
      pending: "Requesting item...",
      success: {
        render() {
          router.push("/");
          return "Item has been requested!";
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
      action={async (formData) => {
        notify(formData);
      }}
      className=" bg-white dark:bg-slate-800 p-8 rounded-lg gap-2 flex flex-col"
    >
      {children}
    </form>
  );
}
