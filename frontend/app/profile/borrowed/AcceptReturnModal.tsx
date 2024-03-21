"use client";

import RatingForm from "@/app/components/RatingForm";
import { Button, Modal } from "flowbite-react";
import { useRef, useState } from "react";
import ReturnItemForm from "./ReturnItemForm";

export default function AcceptReturnModal({
  borrowedState,
  borrowerID,
}: {
  borrowerID?: string;
  borrowedState?: string;
}) {
  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState<boolean[]>(Array(5).fill(false));
  const acceptHandler = () => {
    console.log("Accepting return" + rating.filter((r) => r).length);
    buttonRef.current?.click();
    // updateRating(rating.filter((r) => r).length, borrowerID || "");
    setOpenModal(false);
    // Add logic to accept the return of the item
  };
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      {borrowedState === "Unreturned" && (
        <Button color="primary" onClick={() => setOpenModal(true)}>
          {"Accept Return"}
        </Button>
      )}
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Item return</Modal.Header>
        <Modal.Body>
          <ReturnItemForm>
            <input type="hidden" name="userID" value={borrowerID} />
            <input
              type="hidden"
              name="rating"
              value={rating.filter((r) => r).length}
            />
            <div className="flex flex-col gap-8">
              <RatingForm setRating={setRating} rating={rating} />
              <p>Are you sure you want to accept the return of this item?</p>
              <p>
                By pressing {'"'}I accept{'"'}, You are responsible for the
                condition of the item and any damages. If you are not satisfied
                with the condition of the item, please wait until the end date
                of the rental period.
              </p>
            </div>
            <button ref={buttonRef} type="submit" className="hidden" />
          </ReturnItemForm>
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
