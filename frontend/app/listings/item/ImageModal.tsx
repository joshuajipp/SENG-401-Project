"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import Image from "next/image";
export default function ImageModal({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [openModal, setOpenModal] = useState(false);

  // TODO: Conditional to only render if there are enough images
  const SmallImageElement = () => {
    return (
      <button
        className=" size-[120px] relative hover:opacity-90 items-center justify-center flex"
        onClick={() => setOpenModal(true)}
      >
        <div className="z-30 absolute size-[120px] bg-purple-400 opacity-30 top-0" />
        <p className="z-40 items-center">View more</p>
        <Image
          alt="product image"
          src="https://via.placeholder.com/443x590"
          className="z-10 "
          fill
        />
      </button>
    );
  };
  return (
    <>
      <SmallImageElement />
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Images for item: {"itemID"}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}
