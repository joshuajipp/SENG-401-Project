"use client";

import UpdateItemForm from "@/app/components/UpdateItemForm";
import { ItemsGetListI } from "@/app/interfaces/ListItemI";
import { Button, Modal } from "flowbite-react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
const ListingDetails = dynamic(
  () => import("@/app/components/listItemFormComponents/ListingDetails"),
  {
    ssr: false,
    loading: () => (
      <p className="text-9xl">
        <Skeleton className="w-full" />
      </p>
    ),
  }
);
const ListingMedia = dynamic(
  () => import("@/app/components/listItemFormComponents/ListingMedia"),
  {
    ssr: false,
    loading: () => (
      <p className="text-9xl">
        <Skeleton className="w-full" />
      </p>
    ),
  }
);
export default function EditItemModal({ item }: { item: ItemsGetListI }) {
  const [openModal, setOpenModal] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button color="primary" onClick={() => setOpenModal(true)}>
        Edit item
      </Button>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Editing item</Modal.Header>
        <Modal.Body>
          <UpdateItemForm>
            <input
              type="text"
              className="hidden"
              name="itemID"
              value={item.itemID}
            />
            <div className="space-y-6">
              <ListingDetails item={item} />
              <ListingMedia item={item} />
            </div>
            <button ref={buttonRef} type="submit" className="hidden" />
          </UpdateItemForm>
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
    </>
  );
}
