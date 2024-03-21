"use client";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { getSession } from "next-auth/react";
function SubmitButton({ ...props }) {
  const buttonTitle = props.title;
  const { pending } = useFormStatus();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setLoggedIn(!!session); // Directly set loggedIn based on session existence
    };
    fetchSession();
  }, []);

  return (
    <Button
      color={"primary"}
      type="submit"
      {...(pending && { isProcessing: true, disabled: true })}
      className="  relative font-bold"
      disabled={!loggedIn || pending}
    >
      {!loggedIn
        ? "Please login to list item"
        : pending
        ? "Processing..."
        : buttonTitle || "Post Listing"}
    </Button>
  );
}

export default SubmitButton;
