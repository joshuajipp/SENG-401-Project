"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "flowbite-react";
import { FaTimes } from "react-icons/fa";
import { ItemsGetListI } from "@/app/interfaces/ListItemI";

export default function UploadImageComponent({
  item,
}: {
  item?: ItemsGetListI;
}) {
  const [images, setImages] = useState<(File | undefined)[]>(
    Array.from({ length: 8 })
  );
  const [imageURLs, setImageURLs] = useState<string[]>(
    item?.images || Array.from({ length: 8 })
  );
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
  const handleAddImage = (newImage: File, index: number) => {
    if (index >= 8) return;
    if (newImage.size > MAX_IMAGE_SIZE) {
      alert("Image is too large. Please upload an image smaller than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        let imageString = e.target.result as string;
        let URLArray = imageString.split(",");

        // Move setImageURLs update inside here to ensure it happens after reading the file
        setImageURLs((prevURLs) => {
          const updatedURLs = [...prevURLs];
          updatedURLs[index] = URLArray[1]; // Assuming you want to store only the Base64 content without the data URL prefix
          return updatedURLs;
        });
      }
    };
    reader.readAsDataURL(newImage);

    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = newImage;
      return updatedImages;
    });
  };

  const handleRemoveImage = (index: number) => {
    if (index >= 8) return;
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = undefined;
      return updatedImages;
    });
    setImageURLs((prevURLs) => {
      const updatedURLs = [...prevURLs];
      // @ts-ignore
      updatedURLs[index] = null;
      return updatedURLs;
    });
  };
  const MediaImage = ({
    index,
    file = "/missingImage.jpg",
  }: {
    index: number;
    file: string;
  }) => {
    return (
      <div className="w-44 border rounded hover:opacity-90 cursor-pointer">
        <label
          className="h-44 flex place-content-center"
          htmlFor={`file-upload-${index}`}
        >
          <Image
            alt="upload image"
            className=" object-contain"
            src={file}
            width={176}
            height={176}
          />
          <input
            id={`file-upload-${index}`}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleAddImage(e.target.files[0], index);
              }
            }}
          />
        </label>
        <Button
          color={"primary"}
          className="w-full h-12 flex place-content-center justify-center items-center"
          onClick={() => handleRemoveImage(index)}
        >
          {file === "/missingImage.jpg" ? "" : <FaTimes />}
        </Button>
      </div>
    );
  };
  return (
    <div className="flex flex-row flex-wrap gap-2">
      <input className="hidden" name="images" readOnly value={imageURLs} />
      {images.map((image, index) => {
        return (
          <MediaImage
            key={index}
            index={index}
            file={image ? URL.createObjectURL(image) : "/missingImage.jpg"}
          />
        );
      })}
    </div>
  );
}
