"use client";
import { updateAccount } from "@/app/actions";
import { toast } from "react-toastify";
export default function UpdateItemForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const notify = (formData: FormData) =>
    toast.promise(updateAccount(formData), {
      pending: "Account is being updated...",
      success: {
        render() {
          return "Account has been updated!";
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
      className="flex flex-col gap-4 text-brand"
      action={async (formData) => {
        notify(formData);
      }}
    >
      {children}
    </form>
  );
}
