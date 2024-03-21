"use client";
import SubmitButton from "./SubmitButton";
import { createListing } from "../actions";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function ListItemForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const notify = (formData: FormData) =>
    toast.promise(createListing(formData), {
      pending: "Listing is being uploaded...",
      success: {
        render() {
          router.push("/");
          return "Listing has been posted";
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
      <SubmitButton />
    </form>
  );
}
