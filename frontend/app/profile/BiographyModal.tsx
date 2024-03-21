"use client";

import { Button, Label, Modal, Textarea } from "flowbite-react";
import { useRef, useState } from "react";
import UpdateBiographyForm from "./components/UpdateBiographyForm";

export default function BiographyModal({ bio }: { bio?: string }) {
  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button color={"primary"} onClick={() => setOpenModal(true)}>
        Edit
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <UpdateBiographyForm>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Edit Biography
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="bio" value="Your bio" />
                </div>
                <Textarea name="bio" id="bio" rows={12} defaultValue={bio} />
              </div>
              <div className="w-full">
                <Button
                  type="submit"
                  onClick={() => {
                    buttonRef.current?.click();
                    setOpenModal(false);
                  }}
                  color={"primary"}
                >
                  Update biography
                </Button>
              </div>
              <button ref={buttonRef} type="submit" className="hidden" />
            </div>
          </UpdateBiographyForm>
        </Modal.Body>
      </Modal>
    </>
  );
}
