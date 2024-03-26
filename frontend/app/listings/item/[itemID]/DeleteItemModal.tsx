"use client";

import { deleteItem } from "@/app/actions";
import { ItemsGetListI } from "@/app/interfaces/ListItemI";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function DeleteItemModal({ item }: { item: ItemsGetListI }) {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const notify = () =>
    toast.promise(deleteItem(item.itemID), {
      pending: "Listing is being deleted...",
      success: {
        render() {
          router.push("/");
          return "Listing has been deleted!";
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
        Delete item
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        dismissible
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your listing? This action cannot
              be undone.
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  notify();
                  setOpenModal(false);
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
