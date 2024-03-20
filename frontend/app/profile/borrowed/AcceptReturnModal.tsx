"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export default function AcceptReturnModal({
  borrowedState,
}: {
  borrowedState: string;
}) {
  const [openModal, setOpenModal] = useState(false);
  const acceptHandler = () => {
    setOpenModal(false);
    // Add logic to accept the return of the item
  };
  return (
    <>
      <Button color="primary" onClick={() => setOpenModal(true)}>
        {borrowedState === "Unreturned" ? "Accept Return" : "Returned"}
      </Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure you want to accept the return of this item?
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              By pressing {'"'}I accept{'"'}, You are responsible for the
              condition of the item and any damages. If you are not satisfied
              with the condition of the item, please wait until the end date of
              the rental period.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={acceptHandler}>
            I accept
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
