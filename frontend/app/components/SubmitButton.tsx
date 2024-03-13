"use client";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import { functionThatReturnPromise } from "../utils/mockPromise";
import { getSession } from "next-auth/react";
function SubmitButton({ ...props }) {
  const pendingMessage = props.pending;
  const successMessage = props.success;
  const errorMessage = props.error;
  const { pending } = useFormStatus();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const fetchSession = async () => {
      // getSession needs to be defined/imported
      const session = await getSession();
      console.log(session);
      if (session) {
        setLoggedIn(true);
      }
    };

    fetchSession();
  }, []);

  const notify = () =>
    toast.promise(functionThatReturnPromise, {
      pending: pendingMessage || "Listing is being uploaded...",
      success: successMessage || "Listing has been posted",
      error: errorMessage || "Listing rejected. Please try again later.",
    });
  return (
    <Button
      color={"primary"}
      type="submit"
      {...(pending && { isProcessing: true, disabled: true })}
      className="  relative font-bold"
      aria-disabled={pending}
      onClick={notify}
      disabled={!loggedIn}
    >
      {!loggedIn
        ? "Please login to list item"
        : pending
        ? "Processing..."
        : "Post Listing"}
    </Button>
  );
}

export default SubmitButton;
