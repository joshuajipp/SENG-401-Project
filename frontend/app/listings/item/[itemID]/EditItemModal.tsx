"use client";

import { updateListing } from "@/app/actions";
import ListingDetails from "@/app/components/listItemFormComponents/ListingDetails";
import ListingMedia from "@/app/components/listItemFormComponents/ListingMedia";
import { ItemsGetListI } from "@/app/interfaces/ListItemI";
import { Button, Modal } from "flowbite-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function EditItemModal({ item }: { item: ItemsGetListI }) {
  const [openModal, setOpenModal] = useState(false);
  const ref = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const notify = (formData: FormData) =>
    toast.promise(updateListing(formData), {
      pending: "Listing is being uploaded...",
      success: {
        render() {
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
    <>
      <Button color="primary" onClick={() => setOpenModal(true)}>
        Edit item
      </Button>
      <form
        ref={ref}
        action={async (formData) => {
          ref.current?.reset();
          notify(formData);
        }}
      >
        <input
          type="text"
          className="hidden"
          name="itemID"
          value={item.itemID}
        />
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Editing item</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <ListingDetails></ListingDetails>
              <ListingMedia></ListingMedia>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              color="primary"
              onClick={() => {
                buttonRef.current?.click();
                setOpenModal(false);
              }}
            >
              Update Item
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <button ref={buttonRef} type="submit" className="hidden" />
      </form>
    </>
  );
}
