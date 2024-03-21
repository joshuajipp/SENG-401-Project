"use client";

import RatingForm from "@/app/components/RatingForm";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export default function AcceptReturnModal({
  borrowedState,
}: {
  borrowedState: string;
}) {
  const [openModal, setOpenModal] = useState(false);
  const [childData, setChildData] = useState(0);
  const acceptHandler = () => {
    console.log("Accepting return" + childData);
    setOpenModal(false);
    // Add logic to accept the return of the item
  };
  const handleChildData = (data: number) => {
    setChildData(data);
  };
  return (
    <>
      <Button color="primary" onClick={() => setOpenModal(true)}>
        {borrowedState === "Unreturned" ? "Accept Return" : "Returned"}
      </Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Item return</Modal.Header>
        <Modal.Body>
          <div>
            <div className="flex flex-col gap-8">
              <RatingForm onChildData={handleChildData} />
              <p>Are you sure you want to accept the return of this item?</p>
              <p>
                By pressing {'"'}I accept{'"'}, You are responsible for the
                condition of the item and any damages. If you are not satisfied
                with the condition of the item, please wait until the end date
                of the rental period.
              </p>
            </div>
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
