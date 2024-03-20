"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "flowbite-react";
import { FaTimes } from "react-icons/fa";
import { ItemsGetListI } from "@/app/interfaces/ListItemI";

export default function UploadImageComponent({
  item,
}: {
  item?: ItemsGetListI;
}) {
  const [imageURLs, setImageURLs] = useState<string[]>(
    item?.images || Array.from({ length: 8 })
  );
  useEffect(() => console.log(imageURLs), [imageURLs]);
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
  const base64Prefix = "data:image/png;base64,";
  // const myURL =
  //   "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";
  const handleAddImage = (newImage: File, index: number) => {
    if (index >= 8) return;
    if (newImage.size > MAX_IMAGE_SIZE) {
      alert("Image is too large. Please upload an image smaller than 5MB.");
      return;
    }
    console.log(index);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        let imageString = e.target.result as string;
        let URLArray = imageString.split(",");
        console.log(URLArray[1]);
        setImageURLs((prevURLs) => {
          const updatedURLs = [...prevURLs];
          updatedURLs[index] = URLArray[1]; // Assuming you want to store only the Base64 content without the data URL prefix
          return updatedURLs;
        });
      }
    };
    reader.readAsDataURL(newImage);
  };

  const handleRemoveImage = (index: number) => {
    if (index >= 8) return;
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
            src={
              file.startsWith("https://") || file === "/missingImage.jpg"
                ? file
                : base64Prefix + file
            }
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
      {imageURLs.map((image, index) => {
        return (
          <MediaImage
            key={index}
            index={index}
            file={image ? image : "/missingImage.jpg"}
          />
        );
      })}
      <Button
        color={"primary"}
        className="w-full h-12 flex place-content-center justify-center items-center"
      >
        <label htmlFor={`newImage`}>
          Add new image
          <input
            id="newImage"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleAddImage(e.target.files[0], imageURLs.length);
              }
            }}
          />
        </label>
      </Button>
    </div>
  );
}
